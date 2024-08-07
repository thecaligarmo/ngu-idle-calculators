import { AttackStat, Titan, Titans } from "@/assets/enemy";
import { Wish } from "@/assets/wish";
import bigDecimal from "js-big-decimal";
import { ReactElement } from "react";
import { bd, bigdec_min } from "../numbers";



export function getQuestInfo(
    {
        totalAPBonus,
        totalQPBonus,
        activeQuestWishI = bd(0),
        activeQuestWishII = bd(0),
        beastButter = false,
        blueHeart = false,
        fadLandsSetBonus = false,
        fasterQuesting = false,
        fibQuestRNG = false,
        hoursOfflinePerDay = bd(0),
        hoursPerDay = bd(24),
        idleMajorQuests = false,
        includeMajorQuests = false,
        redLiquidBonus = false,
        questIdleDivider = bd(8),
        questMinorQP = bd(10),
        questMajorQP = bd(50),
        totalQuestDropBonus = bd(1),
        totalRespawnTime = bd(4),
    } : {
        totalAPBonus: bigDecimal,
        totalQPBonus: bigDecimal,
        activeQuestWishI ?: bigDecimal,
        activeQuestWishII ?: bigDecimal,
        beastButter ?: boolean,
        blueHeart ?: boolean,
        fadLandsSetBonus ?: boolean,
        fasterQuesting ?: boolean, 
        fibQuestRNG ?: boolean,
        hoursOfflinePerDay ?: bigDecimal,
        hoursPerDay ?: bigDecimal,
        idleMajorQuests ?: boolean,
        includeMajorQuests ?: boolean,
        redLiquidBonus ?: boolean,
        questIdleDivider ?: bigDecimal,
        questMinorQP ?: bigDecimal,
        questMajorQP ?: bigDecimal,
        totalQuestDropBonus ?: bigDecimal,
        totalRespawnTime ?: bigDecimal,

    }
): {
    'ap' : {'major' : bigDecimal, 'minor': bigDecimal, 'perMajor' : bigDecimal, 'perMinor' : bigDecimal},
    'qp' : {'major' : bigDecimal, 'minor': bigDecimal, 'perMajor' : bigDecimal, 'perMinor' : bigDecimal},
} {

    var itemsPerQuest = bd(fibQuestRNG ? 50 : 54.5)
    var beastButterMultiplier = beastButter
        ? (blueHeart ? bd(2.2) : bd(2))
        : bd(1)
    var idleAttackCooldown = redLiquidBonus ? bd(0.8) : bd(1)
    var respawnTime = totalRespawnTime.round(2, bigDecimal.RoundingModes.CEILING)


    var secondsPerIdleQuestItemDrop = (bd(60)
                .multiply(idleAttackCooldown.add(respawnTime))
                .multiply(bd(50))
                .multiply(questIdleDivider)
                .divide(totalQuestDropBonus.compareTo(bd(0)) > 0 ? totalQuestDropBonus.divide(bd(100)) : bd(1)) // Quest Drop (Idle)
                .divide(bd(3))
        )
        .round(0)
        .divide(bd(50))

    // =ROUND( 60 * ( IF(B10,0.8,1)+B11 ) / (3 * B19) * B18 * 50  ,0) / 50

    var secondsPerManualQuestItemDrop = bd(60)
        .multiply(idleAttackCooldown.add(respawnTime))
        .multiply(bd(50))
        .divide(totalQuestDropBonus.compareTo(bd(0)) > 0 ? totalQuestDropBonus.divide(bd(100)) : bd(1)) // Quest Drop (Idle)
        .divide(bd(3))
        .round(0)
        .divide(bd(50))




    
    
    var secondsPerIdleQuest = secondsPerIdleQuestItemDrop
        .multiply(
            hoursOfflinePerDay.compareTo(bd(0)) > 0 
            ?   (
                    hoursOfflinePerDay.multiply(bd(60))
                    .add(
                        (hoursPerDay.subtract(hoursOfflinePerDay)).multiply(itemsPerQuest)
                    )
                ).divide(hoursPerDay)
            : itemsPerQuest
        )

    

    var majorsPerDay = bd(0)
    var totalSecondsMajorQuest = bd(0)
    if (includeMajorQuests) {

        // =60*B15/(470 * (1-0.1*D29) * (1-0.2*D28))
        majorsPerDay = bd(60)
            .multiply(hoursPerDay)
            .divide(bd(470))
            .divide(fasterQuesting ? bd(0.8) : bd(1))
            .divide(fadLandsSetBonus ? bd(0.9) : bd(1))

        if(idleMajorQuests) {
            totalSecondsMajorQuest = secondsPerIdleQuest.multiply(majorsPerDay)
        } else {
            var secondsPerManualQuest = itemsPerQuest
                .multiply(secondsPerManualQuestItemDrop)
            totalSecondsMajorQuest = secondsPerManualQuest.multiply(majorsPerDay)
        }   
    }

    try{
        var minorsPerDay = (bd(60 * 60)
                .multiply(hoursPerDay)
                .subtract(totalSecondsMajorQuest)
            )
            .divide(secondsPerIdleQuest)

    } catch(exception) {
        var minorsPerDay = bd(1)
    }

    var QPPerMinor = questMinorQP
        .multiply(totalQPBonus.divide(bd(100)))
        .floor()
    
    var APPerMinor = bigdec_min(bd(12), questMinorQP)
        .multiply(totalAPBonus).divide(bd(100))
        .floor()

    var QPPerMajor = questMajorQP
        .multiply(totalQPBonus.divide(bd(100)))
        .multiply(beastButterMultiplier)
        .floor()
    
    var APPerMajor = bd(50).multiply(totalAPBonus).divide(bd(100)).floor()

    // If we are manualling, make the amounts active
    if(!idleMajorQuests) {
        QPPerMajor = QPPerMajor
            .multiply(bd(2))
            .multiply(
                bd(1).add(activeQuestWishI.multiply(bd(0.02)))
            ).multiply(
                bd(1).add(activeQuestWishII.multiply(bd(0.01)))
            )
        APPerMajor = (bd(100)
                .multiply(
                    bd(1).add(activeQuestWishI.multiply(bd(0.02)))
                ).multiply(
                    bd(1).add(activeQuestWishII.multiply(bd(0.01)))
                ).floor()
            ).multiply(totalAPBonus).divide(bd(100)).floor()
    }

    var QPFromMajors = QPPerMajor.multiply(majorsPerDay).floor()
    var QPFromMinors = QPPerMinor.multiply(minorsPerDay).floor()
    var APFromMajors = APPerMajor.multiply(majorsPerDay).floor()
    var APFromMinors = APPerMinor.multiply(minorsPerDay).floor()

    return {
        'ap' : {'major': APFromMajors, 'minor' : APFromMinors, 'perMajor' : APPerMajor, 'perMinor' : APPerMinor},
        'qp' : {'major' : QPFromMajors, 'minor' : QPFromMinors, 'perMajor' : QPPerMajor, 'perMinor' : QPPerMinor},
    }

}



export function getTitanList() : ReactElement[]{
    var titanOptions : ReactElement[] = []
    for (var titan of Object.values(Titans)) {
        if(titan.id < 13) {
            for(var i = 0; i < titan.versions; i++) {
                if(titan.id == 5 && i > 0) {
                    continue
                }
                titanOptions.push(<option key={titan.getFullKey(i)} value={titan.id +'-' + i}>
                    {titan.getFullName(i)}
                </option>)
                
            }
        }
    }
    return titanOptions;
}



export function getMaxTitanByAK(playerAttack : AttackStat) : [Titan, number]{
    var maxTitanByAK : [Titan, number] = [Titans.NONE, 0]
    Object.values(Titans).forEach((titan) => {
        if (titan.id < 13) {
            for(var i = 0; i < titan.versions; i++) {
                if(titan.canAutoKill(playerAttack, i)) {
                    maxTitanByAK = [titan, i]
                }
            }
        }
    })
    return maxTitanByAK;
}


export function getTitanHourlyInfo(maxTitan : [Titan, number], {
    bonusTitanEXPPerk = bd(0),
    numRebirthChallenges = bd(0),
    twentyFourHourChallenge = bd(0),
    twentyFourHourEvilChallenge = bd(0),
    twentyFourHourSadisticChallenge = bd(0),
    totalAPBonus,
    totalExpBonus,
    totalPPBonus,
    totalQPBonus,
    wishTitansHadBetterRewards = bd(0),
    wishes,
} : {
    bonusTitanEXPPerk ?: bigDecimal,
    numRebirthChallenges?: bigDecimal,
    twentyFourHourChallenge?: bigDecimal,
    twentyFourHourEvilChallenge?: bigDecimal,
    twentyFourHourSadisticChallenge?: bigDecimal,
    totalAPBonus: bigDecimal,
    totalExpBonus: bigDecimal,
    totalPPBonus : bigDecimal,
    totalQPBonus: bigDecimal,
    wishTitansHadBetterRewards ?: bigDecimal,
    wishes : Wish[],
}) : {
    'ap' : bigDecimal,
    'exp' : bigDecimal,
    'ppp' : bigDecimal,
    'qp' : bigDecimal,
} {
    // Need to look up current tier for Titan
    var hourlyTitanAP : bigDecimal = bd(0);
    var hourlyTitanEXP : bigDecimal = bd(0);
    var hourlyTitanPP : bigDecimal = bd(0);
    var hourlyTitanQP : bigDecimal = bd(0);

    var wishLevel = Number(wishTitansHadBetterRewards.getValue());
    var rbChallenges : bigDecimal = numRebirthChallenges
    var bonusExpPerk = bonusTitanEXPPerk.compareTo(bd(0)) > 0 ? bd(1.5) : bd(1)

    Object.values(Titans).forEach((titan) => {
        if(titan.id <= maxTitan[0].id) {
            var titanMultiplier = bd(1)
            if(titan.id < maxTitan[0].id) {
                if(titan.versions == 4) {
                    if(wishLevel == 3) {
                        titanMultiplier = titanMultiplier.multiply(bd(1.3))
                    } else if (wishLevel == 2) {
                        titanMultiplier = titanMultiplier.multiply(bd(1.2))
                    } else if (wishLevel == 1) {
                        titanMultiplier = titanMultiplier.multiply(bd(1.1))
                    }
                }
            } else {
                if(maxTitan[1] == 3 && wishLevel == 3) {
                    titanMultiplier = titanMultiplier.multiply(bd(1.3))
                } else if (maxTitan[1] >= 2 && wishLevel >= 2) {
                    titanMultiplier = titanMultiplier.multiply(bd(1.2))
                } else if (maxTitan[1] >= 1 && wishLevel >= 1) {
                    titanMultiplier = titanMultiplier.multiply(bd(1.1))
                }
            }
            
            var titanRespawn = titan.getRespawnTime(rbChallenges)

            var titanAP = titan.getAP(totalAPBonus).floor().divide(titanRespawn)
            var titanEXP = titan.getEXP(totalExpBonus, twentyFourHourChallenge, twentyFourHourEvilChallenge, twentyFourHourSadisticChallenge).multiply(titanMultiplier).floor().divide(titanRespawn)
            var titanPP = (titan.getPP(totalPPBonus).multiply(titanMultiplier).floor()).divide(titanRespawn)
            var titanQP = titan.getQP(wishes, totalQPBonus).multiply(titanMultiplier).floor().divide(titanRespawn)

            hourlyTitanAP = hourlyTitanAP.add(titanAP)
            hourlyTitanEXP = hourlyTitanEXP.add(titanEXP)
            hourlyTitanPP = hourlyTitanPP.add(titanPP)
            hourlyTitanQP = hourlyTitanQP.add(titanQP)
        }
    })
    hourlyTitanEXP = hourlyTitanEXP.multiply(bonusExpPerk)
    return {
        'ap' : hourlyTitanAP,
        'exp' : hourlyTitanEXP,
        'ppp' : hourlyTitanPP,
        'qp' : hourlyTitanQP,
    }
}


export function getRebirthAP(totalAPBonus : bigDecimal, hoursPerDay : bigDecimal) : bigDecimal {
    return (hoursPerDay.multiply(bd(60 * 60)).subtract(bd(3600)))
        .divide(bd(500))
        .multiply(totalAPBonus)
        .divide(bd(100))
        .floor()
}


export function getMoneyPitAP(goldToss: bigDecimal, numTosses: bigDecimal, totalAPBonus : bigDecimal) : bigDecimal {
    if(goldToss.compareTo(bd(0)) > 0) {
        return (goldToss
                .multiply(totalAPBonus)
                .divide(bd(100))
            ).floor()
            .multiply(numTosses)
    }
    return bd(0)
}


export function getDailySaveAP(totalAPBonus : bigDecimal, hoursPerDay : bigDecimal) : bigDecimal {
    return (bd(200).multiply(totalAPBonus).divide(bd(100))).floor()
                .multiply(hoursPerDay)
                .divide(bd(24))
}


export function getDailySpinAP(dailySpinTier : number | bigDecimal, totalAPBonus : bigDecimal, hoursPerDay : bigDecimal, incConsumables : boolean = false, incJackpot : boolean = false) : bigDecimal{
    if (dailySpinTier instanceof bigDecimal) {
        dailySpinTier = Number(dailySpinTier.getValue())
    }
    var avgAPFromDailySpin = bd(0)
    switch(dailySpinTier) {
        case 0:
            avgAPFromDailySpin = avgAPFromDailySpin
                    .add(bd(50 * 0.7).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(100*0.3).multiply(totalAPBonus).divide(bd(100)).floor())
            break;
        case 1:
            avgAPFromDailySpin = avgAPFromDailySpin
                    .add(bd(100 * 0.53).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(200*0.35).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(1000*0.1).multiply(totalAPBonus).divide(bd(100)).floor())
            if(incConsumables) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(100))
            }
            break;
        case 2:
            avgAPFromDailySpin = avgAPFromDailySpin
                    .add(bd(200 * 0.53).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(400*0.3).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(2000*0.1).multiply(totalAPBonus).divide(bd(100)).floor())
            if(incConsumables) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(550))
            }
            break;
        case 3:
            avgAPFromDailySpin = avgAPFromDailySpin
                    .add(bd(300 * 0.37).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(600*0.25).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(2000*0.1).multiply(totalAPBonus).divide(bd(100)).floor())
            if(incConsumables) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(900))
            }
            if(incJackpot) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(50000 * 0.005).multiply(totalAPBonus).divide(bd(100)).floor())
                if(incConsumables) {
                    avgAPFromDailySpin = avgAPFromDailySpin.add(bd(275))
                }
            }
            break;
        case 4:
            avgAPFromDailySpin = avgAPFromDailySpin
                    .add(bd(500 * 0.5).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(1000*0.25).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(5000*0.1).multiply(totalAPBonus).divide(bd(100)).floor())
            if(incConsumables) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(1550))
            }
            if(incJackpot) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(75000 * 0.005).multiply(totalAPBonus).divide(bd(100)).floor())
                if(incConsumables) {
                    avgAPFromDailySpin = avgAPFromDailySpin.add(bd(1536.25))
                }
            }
            break;
        case 5:
            avgAPFromDailySpin = avgAPFromDailySpin
                    .add(bd(800 * 0.36).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(1600*0.25).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(8000*0.1).multiply(totalAPBonus).divide(bd(100)).floor())
            if(incConsumables) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(1900))
            }
            if(incJackpot) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(100000 * 0.005).multiply(totalAPBonus).divide(bd(100)).floor())
                if(incConsumables) {
                    avgAPFromDailySpin = avgAPFromDailySpin.add(bd(2112.5))
                }
            }
            break;
        case 6:
            avgAPFromDailySpin = avgAPFromDailySpin
                    .add(bd(1200 * 0.35).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(2400*0.25).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(12000*0.1).multiply(totalAPBonus).divide(bd(100)).floor())
            if(incConsumables) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(3800))
            }
            if(incJackpot) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(150000 * 0.005).multiply(totalAPBonus).divide(bd(100)).floor())
                if(incConsumables) {
                    avgAPFromDailySpin = avgAPFromDailySpin.add(bd(3788.75))
                }
            }
            break;
        case 7:
            avgAPFromDailySpin = avgAPFromDailySpin
                    .add(bd(1500 * 0.35).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(3000*0.25).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(15000*0.1).multiply(totalAPBonus).divide(bd(100)).floor())
            if(incConsumables) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(3800))
            }
            if(incJackpot) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(175000 * 0.005).multiply(totalAPBonus).divide(bd(100)).floor())
                if(incConsumables) {
                    avgAPFromDailySpin = avgAPFromDailySpin.add(bd(5501.25))
                }
            }
            break;
    }
    return avgAPFromDailySpin.floor()
        .multiply(hoursPerDay)
        .divide(bd(24))
}