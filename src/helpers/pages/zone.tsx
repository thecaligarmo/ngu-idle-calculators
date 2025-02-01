import bigDecimal from "js-big-decimal";
import Player from "@/assets/player";
import { getIdleAttackModifier } from "../calculators";
import { bd, greaterThan, isZero } from "../numbers";
import Zone, { Zones } from "@/assets/zones";
import { ItemSet, ItemSets } from "@/assets/sets";

type zoneType = {
    key: string,
    name: string,
    boost: bigDecimal,
    exp: bigDecimal,
    hitsToKill: number,
    killsPerHour: bigDecimal,
}

export function getZoneInfo(player : Player) : zoneType[]{
    
    // idle attack cooldown
    const idleAttackCooldown = player.get('redLiquidBonus') ? bd(0.8) : bd(1)
    const idleAttackModifier = getIdleAttackModifier(player.get('spoopySetBonus'), player.get('sadisticNoEquipmentChallenges'))

    
    // get the optimal itopod zone
    const itopodZone = Zones.ITOPOD;
    const optimalITOPODFloor = itopodZone.getOptimalFloor(player.get('totalPower'), idleAttackModifier)
    itopodZone.setLevel(optimalITOPODFloor)
    const itopodExpValue = bd(itopodZone.exp[0] * itopodZone.exp[1]);
    const itopodBoostChance = itopodZone.boostChances(player.get('totalDropChance'))[0] 
    const itopodBoostedVal = itopodBoostChance.multiply(itopodZone.boostedValue(player.get('boostRecyclying'))[0]);
    const optExpectedHits = itopodZone.getHitsPerKill(player.get('totalPower'), idleAttackModifier)

    // Let the optimal itopod be the optimal zone for now
    let ito : zoneType = {
        key: itopodZone.key,
        name: itopodZone.name + " (floor: " + optimalITOPODFloor + ")",
        boost: itopodBoostedVal,
        exp: itopodExpValue,
        hitsToKill: optExpectedHits,
        killsPerHour: itopodZone.getKillsPerHour(player.get('totalPower'), idleAttackModifier, player.get('redLiquidBonus'), player.get('totalRespawnTime')),
    };

    // Keep track of all the boost information
    let zoneBoostInfo : zoneType[] = [ito];


    // Non-optimal ITOPOD (non-optimal is the next itopod floor set (by 50))
    const nonOptItopodZone = Zones.ITOPOD;
    const nonOptFloor = Math.ceil(optimalITOPODFloor / 50) * 50
    nonOptItopodZone.setLevel( nonOptFloor)
    const nonOptExpVal = bd(nonOptItopodZone.exp[0] * nonOptItopodZone.exp[1]);
    const nonOptBoostChance = nonOptItopodZone.boostChances(player.get('totalDropChance'))[0] 
    const nonOptBoostedVal = nonOptBoostChance.multiply(nonOptItopodZone.boostedValue(player.get('boostRecyclying'))[0]);
    const nonOptExpectedHits = nonOptItopodZone.getHitsPerKill(player.get('totalPower'), idleAttackModifier)

    const nonOptHitRatio : bigDecimal = (player.get('totalRespawnTime').add(idleAttackCooldown)).divide(player.get('totalRespawnTime').add(idleAttackCooldown.multiply(bd(nonOptExpectedHits))))
    const nonOptItopod : zoneType = {
        key: nonOptItopodZone.key + "NO",
        name: nonOptItopodZone.name + " Non-optimal" + " (floor: " + nonOptItopodZone.level + ")",
        boost: nonOptBoostedVal.multiply(nonOptHitRatio),
        exp: nonOptExpVal.multiply(nonOptHitRatio),
        hitsToKill: nonOptExpectedHits,
        killsPerHour: nonOptItopodZone.getKillsPerHour(player.get('totalPower'), idleAttackModifier, player.get('redLiquidBonus'), player.get('totalRespawnTime')),
    }
    zoneBoostInfo.push(nonOptItopod)


    if (!isZero(player.get('totalPower'))) {
        for(let zone of Object.values(Zones)) {
            if(zone.hardestEnemy()){
                // var oneHitPower = zone.hardestEnemy().oneHitPower(idleAttackModifier);
                let paralyzer = zone.paralyzeEnemies();
                let normalEnemyPercent = bd(1).subtract(zone.bossChance());
                let exp = zone.exp[0]
                let expChance = zone.expChance(player.get('totalDropChance'))
                let boostChances = zone.boostChances(player.get('totalDropChance'))
                let recycledValues = zone.boostedValue(player.get('boostRecyclying')).reduce((sum, boost, index) => {
                    let boostValueChance = boost.multiply(boostChances[index])
                    return sum.add(boostValueChance)
                }, bd(0));

                let powerRat = zone.hardestEnemy().numHitsToKill(player.get('totalPower'), idleAttackModifier)
                let expValZone = (player.get('totalRespawnTime').add(idleAttackCooldown))
                    .divide(
                    player.get('totalRespawnTime').add(
                            idleAttackCooldown.multiply(powerRat)
                        ).add(
                            greaterThan(idleAttackCooldown.multiply(powerRat), bd(3.5)) ? bd(2).multiply(paralyzer) : bd(0)
                        )
                    )
                    .multiply(expChance)
                    .multiply(bd(exp))
                    
                let zoneBoostedVal = (player.get('totalRespawnTime').add(idleAttackCooldown))
                    .divide(
                    player.get('totalRespawnTime').add(
                            idleAttackCooldown.multiply(powerRat)
                        ).add(
                            greaterThan(idleAttackCooldown.multiply(powerRat), bd(3.5)) ? bd(2).multiply(paralyzer) : bd(0)
                        )
                    )
                    .multiply(normalEnemyPercent)
                    .multiply(recycledValues)
                
                let zoneInfo : zoneType = {
                    key: zone.key,
                    name: zone.name,
                    boost: zoneBoostedVal,
                    exp: expValZone,
                    hitsToKill: zone.getHitsPerKill(player.get('totalPower'), idleAttackModifier),
                    killsPerHour: zone.getKillsPerHour(player.get('totalPower'), idleAttackModifier, player.get('redLiquidBonus'), player.get('totalRespawnTime')),
                }
                zoneBoostInfo.push(zoneInfo);                
            }
        }
    }

    return zoneBoostInfo
}

export function getOptimalBoostZone(zoneBoostInfo : zoneType[]) : zoneType{
    let optimalZone = zoneBoostInfo[0]
    for (let zone of zoneBoostInfo){
        if(greaterThan(zone['boost'], optimalZone['boost'])) {
            optimalZone = zone
        }
    }
    return optimalZone
}

export function getOptimalExpZone(zoneBoostInfo : zoneType[]) : zoneType{
    let optimalZone = zoneBoostInfo[0]
    for (let zone of zoneBoostInfo){
        if(greaterThan(zone['exp'], optimalZone['exp'])) {
            optimalZone = zone
        }
    }
    return optimalZone
}

export function itemSetInfo(player: Player) {
    let itemSets: ItemSet[] = Object.values(player.get('itemSets'))
    let notMaxed = itemSets.filter((itSet : ItemSet) => !itSet.isMaxxed && itSet.isZoneSet())
    let ret : any = {}
    for(let itSet of notMaxed) {
        // Since it's a zone set, we know `getZones()` only has one zone
        let zone : Zone = itSet.getZones()[0]
        ret[itSet.key] = {
            'zone' : zone,
            'set': itSet
        }
    }
    return ret
}

export function itemSetDropChance(player : Player) : bigDecimal | string{
    const idleAttackModifier = getIdleAttackModifier(player.get('spoopySetBonus'), player.get('sadisticNoEquipmentChallenges'))
    return ItemSets.HALLOWEEN.secsToCompletion(player.get('totalDropChance'), player.get('totalPower'), idleAttackModifier, player.get('redLiquidBonus'), player.get('totalRespawnTime'))
}