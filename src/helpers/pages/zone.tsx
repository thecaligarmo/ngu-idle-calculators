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
    var idleAttackCooldown = player.get('redLiquidBonus') ? bd(0.8) : bd(1)
    var idleAttackModifier = getIdleAttackModifier(player.get('spoopySetBonus'), player.get('sadisticNoEquipmentChallenges'))

    
    // get the optimal itopod zone
    var itopodZone = Zones.ITOPOD;
    var optimalITOPODFloor = itopodZone.getOptimalFloor(player.get('totalPower'), idleAttackModifier)
    itopodZone.setLevel(optimalITOPODFloor)
    var itopodExpValue = bd(itopodZone.exp[0] * itopodZone.exp[1]);
    var itopodBoostChance = itopodZone.boostChances(player.get('totalDropChance'))[0] 
    var itopodBoostedVal = itopodBoostChance.multiply(itopodZone.boostedValue(player.get('boostRecyclying'))[0]);
    var optExpectedHits = itopodZone.getHitsPerKill(player.get('totalPower'), idleAttackModifier)

    // Let the optimal itopod be the optimal zone for now
    var ito : zoneType = {
        key: itopodZone.key,
        name: itopodZone.name + " (floor: " + optimalITOPODFloor + ")",
        boost: itopodBoostedVal,
        exp: itopodExpValue,
        hitsToKill: optExpectedHits,
        killsPerHour: itopodZone.getKillsPerHour(player.get('totalPower'), idleAttackModifier, player.get('redLiquidBonus'), player.get('totalRespawnTime')),
    };

    // Keep track of all the boost information
    var zoneBoostInfo : zoneType[] = [ito];


    // Non-optimal ITOPOD (non-optimal is the next itopod floor set (by 50))
    var nonOptItopodZone = Zones.ITOPOD;
    var nonOptFloor = Math.ceil(optimalITOPODFloor / 50) * 50
    nonOptItopodZone.setLevel( nonOptFloor)
    var nonOptExpVal = bd(nonOptItopodZone.exp[0] * nonOptItopodZone.exp[1]);
    var nonOptBoostChance = nonOptItopodZone.boostChances(player.get('totalDropChance'))[0] 
    var nonOptBoostedVal = nonOptBoostChance.multiply(nonOptItopodZone.boostedValue(player.get('boostRecyclying'))[0]);
    var nonOptExpectedHits = nonOptItopodZone.getHitsPerKill(player.get('totalPower'), idleAttackModifier)

    var nonOptHitRatio : bigDecimal = (player.get('totalRespawnTime').add(idleAttackCooldown)).divide(player.get('totalRespawnTime').add(idleAttackCooldown.multiply(bd(nonOptExpectedHits))))
    var nonOptItopod : zoneType = {
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
                var paralyzer = zone.paralyzeEnemies();
                var normalEnemyPercent = bd(1).subtract(zone.bossChance());
                var exp = zone.exp[0]
                var expChance = zone.expChance(player.get('totalDropChance'))
                var boostChances = zone.boostChances(player.get('totalDropChance'))
                var recycledValues = zone.boostedValue(player.get('boostRecyclying')).reduce((sum, boost, index) => {
                    var boostValueChance = boost.multiply(boostChances[index])
                    return sum.add(boostValueChance)
                }, bd(0));

                var powerRat = zone.hardestEnemy().numHitsToKill(player.get('totalPower'), idleAttackModifier)
                var expValZone = (player.get('totalRespawnTime').add(idleAttackCooldown))
                    .divide(
                    player.get('totalRespawnTime').add(
                            idleAttackCooldown.multiply(powerRat)
                        ).add(
                            greaterThan(idleAttackCooldown.multiply(powerRat), bd(3.5)) ? bd(2).multiply(paralyzer) : bd(0)
                        )
                    )
                    .multiply(expChance)
                    .multiply(bd(exp))
                    
                var zoneBoostedVal = (player.get('totalRespawnTime').add(idleAttackCooldown))
                    .divide(
                    player.get('totalRespawnTime').add(
                            idleAttackCooldown.multiply(powerRat)
                        ).add(
                            greaterThan(idleAttackCooldown.multiply(powerRat), bd(3.5)) ? bd(2).multiply(paralyzer) : bd(0)
                        )
                    )
                    .multiply(normalEnemyPercent)
                    .multiply(recycledValues)
                
                var zoneInfo : zoneType = {
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
    var optimalZone = zoneBoostInfo[0]
    for (var zone of zoneBoostInfo){
        if(greaterThan(zone['boost'], optimalZone['boost'])) {
            optimalZone = zone
        }
    }
    return optimalZone
}

export function getOptimalExpZone(zoneBoostInfo : zoneType[]) : zoneType{
    var optimalZone = zoneBoostInfo[0]
    for (var zone of zoneBoostInfo){
        if(greaterThan(zone['exp'], optimalZone['exp'])) {
            optimalZone = zone
        }
    }
    return optimalZone
}

export function itemSetInfo(player: Player) {
    var itemSets: ItemSet[] = Object.values(player.get('itemSets'))
    var notMaxed = itemSets.filter((itSet : ItemSet) => !itSet.isMaxxed && itSet.isZoneSet())
    var ret : any = {}
    for(let itSet of notMaxed) {
        // Since it's a zone set, we know `getZones()` only has one zone
        var zone : Zone = itSet.getZones()[0]
        ret[itSet.key] = {
            'zone' : zone,
            'set': itSet
        }
    }
    return ret
}

export function itemSetDropChance(player : Player) : bigDecimal | string{
    var idleAttackModifier = getIdleAttackModifier(player.get('spoopySetBonus'), player.get('sadisticNoEquipmentChallenges'))
    return ItemSets.HALLOWEEN.secsToCompletion(player.get('totalDropChance'), player.get('totalPower'), idleAttackModifier, player.get('redLiquidBonus'), player.get('totalRespawnTime'))
}