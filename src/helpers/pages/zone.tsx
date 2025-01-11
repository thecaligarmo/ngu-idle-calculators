import Zone, { Zones } from "@/assets/zones";
import bigDecimal from "js-big-decimal";
import { getIdleAttackModifier } from "../calculators";
import { bd, bigdec_equals, bigdec_max, bigdec_power, factorial, greaterThan, isZero, Polynomial, toNum } from "../numbers";
import { ItemSet, ItemSets } from "@/assets/sets";


type zoneType = {
    key: string,
    name: string,
    boost: bigDecimal,
    exp: bigDecimal,
    hitsToKill: number,
    killsPerHour: bigDecimal,
}

export function getZoneInfo(v : any) : zoneType[]{
    
    // idle attack cooldown
    var idleAttackCooldown = v['redLiquidBonus'] ? bd(0.8) : bd(1)
    var idleAttackModifier = getIdleAttackModifier(v['spoopySetBonus'], v['sadisticNoEquipmentChallenges'])

    
    // get the optimal itopod zone
    var itopodZone = Zones.ITOPOD;
    var optimalITOPODFloor = itopodZone.getOptimalFloor(v['totalPower'], idleAttackModifier)
    itopodZone.setLevel(optimalITOPODFloor)
    var itopodExpValue = bd(itopodZone.exp[0] * itopodZone.exp[1]);
    var itopodBoostChance = itopodZone.boostChances(v['totalDropChance'])[0] 
    var itopodBoostedVal = itopodBoostChance.multiply(itopodZone.boostedValue(v['boostRecyclying'])[0]);
    var optExpectedHits = itopodZone.getHitsPerKill(v['totalPower'], idleAttackModifier)

    // Let the optimal itopod be the optimal zone for now
    var ito : zoneType = {
        key: itopodZone.key,
        name: itopodZone.name + " (floor: " + optimalITOPODFloor + ")",
        boost: itopodBoostedVal,
        exp: itopodExpValue,
        hitsToKill: optExpectedHits,
        killsPerHour: itopodZone.getKillsPerHour(v['totalPower'], idleAttackModifier, v['redLiquidBonus'], v['totalRespawnTime']),
    };

    // Keep track of all the boost information
    var zoneBoostInfo : zoneType[] = [ito];


    // Non-optimal ITOPOD (non-optimal is the next itopod floor set (by 50))
    var nonOptItopodZone = Zones.ITOPOD;
    var nonOptFloor = Math.ceil(optimalITOPODFloor / 50) * 50
    nonOptItopodZone.setLevel( nonOptFloor)
    var nonOptExpVal = bd(nonOptItopodZone.exp[0] * nonOptItopodZone.exp[1]);
    var nonOptBoostChance = nonOptItopodZone.boostChances(v['totalDropChance'])[0] 
    var nonOptBoostedVal = nonOptBoostChance.multiply(nonOptItopodZone.boostedValue(v['boostRecyclying'])[0]);
    var nonOptExpectedHits = nonOptItopodZone.getHitsPerKill(v['totalPower'], idleAttackModifier)

    var nonOptHitRatio : bigDecimal = (v['totalRespawnTime'].add(idleAttackCooldown)).divide(v['totalRespawnTime'].add(idleAttackCooldown.multiply(bd(nonOptExpectedHits))))
    var nonOptItopod : zoneType = {
        key: nonOptItopodZone.key + "NO",
        name: nonOptItopodZone.name + " Non-optimal" + " (floor: " + nonOptItopodZone.level + ")",
        boost: nonOptBoostedVal.multiply(nonOptHitRatio),
        exp: nonOptExpVal.multiply(nonOptHitRatio),
        hitsToKill: nonOptExpectedHits,
        killsPerHour: nonOptItopodZone.getKillsPerHour(v['totalPower'], idleAttackModifier, v['redLiquidBonus'], v['totalRespawnTime']),
    }
    zoneBoostInfo.push(nonOptItopod)


    if (!isZero(v['totalPower'])) {
        for(let zone of Object.values(Zones)) {
            if(zone.hardestEnemy()){
                var oneHitPower = zone.hardestEnemy().oneHitPower(idleAttackModifier);
                var paralyzer = zone.paralyzeEnemies();
                var normalEnemyPercent = bd(1).subtract(zone.bossChance());
                var exp = zone.exp[0]
                var expChance = zone.expChance(v['totalDropChance'])
                var boostChances = zone.boostChances(v['totalDropChance'])
                var recycledValues = zone.boostedValue(v['boostRecyclying']).reduce((sum, boost, index) => {
                    var boostValueChance = boost.multiply(boostChances[index])
                    return sum.add(boostValueChance)
                }, bd(0));

                var powerRat = zone.hardestEnemy().numHitsToKill(v['totalPower'], idleAttackModifier)
                var expValZone = (v['totalRespawnTime'].add(idleAttackCooldown))
                    .divide(
                    v['totalRespawnTime'].add(
                            idleAttackCooldown.multiply(powerRat)
                        ).add(
                            greaterThan(idleAttackCooldown.multiply(powerRat), bd(3.5)) ? bd(2).multiply(paralyzer) : bd(0)
                        )
                    )
                    .multiply(expChance)
                    .multiply(bd(exp))
                    
                var zoneBoostedVal = (v['totalRespawnTime'].add(idleAttackCooldown))
                    .divide(
                    v['totalRespawnTime'].add(
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
                    hitsToKill: zone.getHitsPerKill(v['totalPower'], idleAttackModifier),
                    killsPerHour: zone.getKillsPerHour(v['totalPower'], idleAttackModifier, v['redLiquidBonus'], v['totalRespawnTime']),
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

export function itemSetInfo(v: any) {
    var itemSets: ItemSet[] = Object.values(v['itemSets'])
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

export function itemSetDropChance(v : any) : bigDecimal | string{
    var idleAttackModifier = getIdleAttackModifier(v['spoopySetBonus'], v['sadisticNoEquipmentChallenges'])
    return ItemSets.HALLOWEEN.secsToCompletion(v['totalDropChance'], v['totalPower'], idleAttackModifier, v['redLiquidBonus'], v['totalRespawnTime'])
}