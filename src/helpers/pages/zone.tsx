import { Zones } from "@/assets/zones";
import { bd, bigdec_max } from "../numbers";
import bigDecimal from "js-big-decimal";
import { getIdleAttackModifier } from "../calculators";


type zoneType = {
    key: string,
    name: string,
    boost: bigDecimal,
    exp: bigDecimal,
}

export function getZoneInfo(v : any) : zoneType[]{
    
    // idle attack cooldown
    var idleAttackCooldown = v['redLiquidBonus'] ? bd(0.8) : bd(1)
    var idleAttackModifier = getIdleAttackModifier(v['spoopySetBonus'], v['sadisticNoEquipmentChallenges-2'])

    
    // get the optimal itopod zone
    var itopodZone = Zones.ITOPOD;
    var optimalITOPODFloor = itopodZone.getOptimalFloor(v['totalPower'], idleAttackModifier)
    itopodZone.setLevel(optimalITOPODFloor)
    var itopodExpValue = bd(itopodZone.exp[0] * itopodZone.exp[1]);
    var itopodBoostChance = itopodZone.boostChances(v['totalDropChance'])[0] 
    var itopodBoostedVal = itopodBoostChance.multiply(itopodZone.boostedValue(v['boostRecyclying'])[0]);

    // Let the optimal itopod be the optimal zone for now
    var ito : zoneType = {
        key: itopodZone.key,
        name: itopodZone.name + " (floor: " + optimalITOPODFloor + ")",
        boost: itopodBoostedVal,
        exp: itopodExpValue,
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

    // =MAX ( 1.05 ^ ( G51 - MAX(0,LOG(B2/765 * B10, 1.05))) ,1)
    var nonOptExpectedHits = Math.max(
        1.05 ** (
                    nonOptFloor - Math.max(
                                    0,
                                    Math.log(Number(v['totalPower'].multiply(idleAttackModifier).divide(bd(765)).getValue())) / Math.log(1.05)
                                )
                ),
        1
    )

    var nonOptHitRatio : bigDecimal = (v['totalRespawnTime'].add(idleAttackCooldown)).divide(v['totalRespawnTime'].add(idleAttackCooldown.multiply(bd(nonOptExpectedHits))))
    var nonOptItopod : zoneType = {
        key: nonOptItopodZone.key + "NO",
        name: nonOptItopodZone.name + " Non-optimal" + " (floor: " + nonOptItopodZone.level + ")",
        boost: nonOptBoostedVal.multiply(nonOptHitRatio),
        exp: nonOptExpVal.multiply(nonOptHitRatio),
    }
    zoneBoostInfo.push(nonOptItopod)


    if (v['totalPower'].compareTo(bd(0)) != 0) {
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

                var powerRat = bigdec_max((oneHitPower.divide(v['totalPower'])).ceil(), bd(1))
                var expValZone = (v['totalRespawnTime'].add(idleAttackCooldown))
                    .divide(
                    v['totalRespawnTime'].add(
                            idleAttackCooldown.multiply(powerRat)
                        ).add(
                            idleAttackCooldown.multiply(powerRat).compareTo(bd(3.5)) == 1 ? bd(2).multiply(paralyzer) : bd(0)
                        )
                    )
                    .multiply(expChance)
                    .multiply(bd(exp))
                    
                var zoneBoostedVal = (v['totalRespawnTime'].add(idleAttackCooldown))
                    .divide(
                    v['totalRespawnTime'].add(
                            idleAttackCooldown.multiply(powerRat)
                        ).add(
                            idleAttackCooldown.multiply(powerRat).compareTo(bd(3.5)) == 1 ? bd(2).multiply(paralyzer) : bd(0)
                        )
                    )
                    .multiply(normalEnemyPercent)
                    .multiply(recycledValues)
                
                var zoneInfo : zoneType = {
                    key: zone.key,
                    name: zone.name,
                    boost: zoneBoostedVal,
                    exp: expValZone,
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
        if(zone['boost'].compareTo(optimalZone['boost']) > 0) {
            optimalZone = zone
        }
    }
    return optimalZone
}

export function getOptimalExpZone(zoneBoostInfo : zoneType[]) : zoneType{
    var optimalZone = zoneBoostInfo[0]
    for (var zone of zoneBoostInfo){
        if(zone['exp'].compareTo(optimalZone['exp']) > 0) {
            optimalZone = zone
        }
    }
    return optimalZone
}

// infoReq
// extraReq
//optimalZone
//optZoneChosen
//zoneList -> zoneBoostInfo
//zoneBoonList -> zoneBoostInfo




/*
Missing Options:
Sadistic NECs (max 5)
*/