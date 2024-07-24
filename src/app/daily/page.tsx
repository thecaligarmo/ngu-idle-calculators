'use client'

import { Challenge } from "@/assets/challenges";
import { AttackStat, Titan, Titans } from "@/assets/enemy";
import { GameMode } from "@/assets/mode";
import { Stat } from "@/assets/stat";
import { Wish } from "@/assets/wish";
import { FruitOfArbitrariness, FruitOfKnowledge, FruitOfQuirks, FruitOfRage, FRUITS, Yggdrasil } from "@/assets/yggdrasil";
import Zone, { Zones } from "@/assets/zones";
import Content from "@/components/content";
import ContentSubsection from "@/components/contentSubsection";
import { getNumberFormat } from "@/components/context";
import { bd, bigdec_max, bigdec_min, pn} from "@/helpers/numbers";
import { parseNum, parseObj } from "@/helpers/parsers";
import { nguInfo } from "@/helpers/resourceInfo";
import { createStatesForData, getRequiredStates } from "@/helpers/stateForData";
import bigDecimal from "js-big-decimal";
import _ from "lodash";
import { useState } from "react";


export default function Page() {
    var [optMaxTitan, setOptMaxTitan] = useState("current")
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired = [
        ['gameMode', 'numRebirthChallenges', 'twentyFourHourChallenge', 'twentyFourHourEvilChallenge', 'twentyFourHourSadisticChallenge'],
        ['questMinorQP', 'questMajorQP', 'questIdleDivider', 'activeQuestWishI', 'activeQuestWishII'],
        
        ['totalRespawnTime', 'totalAPBonus%', 'totalExpBonus%', 'totalPPBonus%', 'totalQuestRewardBonus%', 'totalQuestDropBonus%', 'totalYggdrasilYieldBonus%', 'totalPower'],
        [ 'blueHeart^', 'redLiquidBonus^','spoopySetBonus^', 'fadLandsSetBonus^', 'fibQuestRNG^', 'fasterQuesting^', 'fruitOfKnowledgeSucks^','fruitOfKnowledgeSTILLSucks^',],

        [ 'bonusTitanEXPPerk', 'wishTitansHadBetterRewards', ],
        []
    ]

    // Set extra required (not from playerData)
    var extraRequired : (string | [string, number])[][] = [
        [['hoursPerDay', 24], 'hoursOfflinePerDay', 'itopodFloor',],
        [ 'bluePill^','beastButter^', 'includeMajorQuests^', 'idleMajorQuests^'],
        ['dailySpinTier', 'includeDailySpinJackpots^', 'includeValueOfConsumables^',  'moneyPitGoldToss?1e', 'moneyPitTossesPerDay',],
        
    ]
    const playerStates = createStatesForData(extraRequired);

    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates)
    var extraReq = getRequiredStates(extraRequired, playerStates)

    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        return parseNum(playerStates, key)
    }

    function c(key : string) : boolean {
        return v(key).compareTo(bd(1)) == 0
    }

    function j(key : string) : any{
        return parseObj(playerStates, key)
    }
    

    // Variables we use a lot
    var hoursPerDay = v('hoursPerDay')//.compareTo(bd(0)) == 0 ? bd(24) : v('hoursPerDay')
    var totalAPBonus = v('totalAPBonus%')
    






    /* ITOPOD */
    var itopodZone = Zones.ITOPOD;
    var itopodFloor = 0
    if (v('itopodFloor').compareTo(bd(0)) == 0) {
        var sadisticNEC = bd(0)
        var idleAttackModifier = (v('spoopySetBonus^').multiply(bd(0.3)).add(bd(1.2))).multiply(
            bd(1).add(sadisticNEC)
        )
        
        // optimal
        itopodFloor = itopodZone.getOptimalFloor(v('totalPower'), idleAttackModifier)
    } else {
        itopodFloor = Number(v('itopodFloor').getValue())
    }
    itopodZone.setLevel(itopodFloor)

    var bluePillMultiplier = c('bluePill^')
                                ? (c('blueHeart^') ? bd(2.2) : bd(2))
                                : bd(1)

    var floorAdd = 200
    if(v('gameMode').compareTo(bd(GameMode.EVIL)) == 0) {
        floorAdd = 700
    } else if(v('gameMode').compareTo(bd(GameMode.SADISTIC)) == 0) {
        floorAdd = 2000
    }

    var pppPerKill = v('totalPPBonus%')
                        .divide(bd(100))
                        .multiply(bluePillMultiplier)
                        .multiply(bd(itopodFloor + floorAdd))
                        .floor()



    // Kills Per Day
    var idleAttackCooldown = c('redLiquidBonus^') ? bd(0.8) : bd(1)
    var respawnTime = v('totalRespawnTime').round(2, bigDecimal.RoundingModes.CEILING)
    var killsPerDay = bd(60 * 60).multiply(hoursPerDay).divide( respawnTime.add(idleAttackCooldown))

    var PPFromTower = killsPerDay.multiply(pppPerKill)
    var APFromTower = killsPerDay.divide(
            itopodZone.cycleLength()
            )
    var EXPFromTower = killsPerDay.divide(
            itopodZone.cycleLength()
        ).multiply(
            bd(itopodZone.exp[0])
        ).multiply(v('totalExpBonus%')).divide(bd(100))










    /* Quest info */
    var itemsPerQuest = bd(c('fibQuestRNG^') ? 50 : 54.5)
    var beastButterMultiplier = c('beastButter^')
        ? (c('blueHeart^') ? bd(2.2) : bd(2))
        : bd(1)


    var secondsPerIdleQuestItemDrop = bd(60)
        .multiply(idleAttackCooldown.add(respawnTime))
        .multiply(bd(50))
        .multiply(v('questIdleDivider'))
        .divide(v('totalQuestDropBonus%').compareTo(bd(0)) > 0 ? v('totalQuestDropBonus%').divide(bd(100)) : bd(1)) // Quest Drop (Idle)
        .divide(bd(3))
        .round(0)
        .divide(bd(50))
    var secondsPerManualQuestItemDrop = bd(60)
        .multiply(idleAttackCooldown.add(respawnTime))
        .multiply(bd(50))
        .divide(v('totalQuestDropBonus%').compareTo(bd(0)) > 0 ? v('totalQuestDropBonus%').divide(bd(100)) : bd(1)) // Quest Drop (Idle)
        .divide(bd(3))
        .round(0)
        .divide(bd(50))

    
    
    var secondsPerIdleQuest = secondsPerIdleQuestItemDrop
        .multiply(
            v('hoursOfflinePerDay').compareTo(bd(0)) > 0 
            ?   (
                    v('hoursOfflinePerDay').multiply(bd(60))
                    .add(
                        (hoursPerDay.subtract(v('hoursOfflinePerDay'))).multiply(itemsPerQuest)
                    )
                ).divide(hoursPerDay)
            : itemsPerQuest
        )


    var majorsPerDay = bd(0)
    var totalSecondsMajorQuest = bd(0)
    if (c('includeMajorQuests^')) {
        majorsPerDay = bd(60)
            .multiply(hoursPerDay)
            .divide(bd(470))
            .divide(c('fasterQuesting^') ? bd(0.8) : bd(1))
            .divide(c('fadLandsSetBonus^') ? bd(0.9) : bd(1))

        if(c('idleMajorQuests^')) {
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

    var QPPerMinor = v('questMinorQP')
        .multiply(v('totalQuestRewardBonus%').divide(bd(100)))
        .floor()
    
    var APPerMinor = bigdec_min(bd(12), v('questMinorQP'))
        .multiply(totalAPBonus).divide(bd(100))
        .floor()

    var QPPerMajor = v('questMajorQP')
        .multiply(v('totalQuestRewardBonus%').divide(bd(100)))
        .multiply(beastButterMultiplier)
        .floor()
    var APPerMajor = bd(50).multiply(totalAPBonus).divide(bd(100)).floor()

    // If we are manualling, make the amounts active
    if(!c('idleMajorQuests^')) {
        QPPerMajor = QPPerMajor
            .multiply(bd(2))
            .multiply(
                bd(1).add(v('activeQuestWishI').multiply(bd(0.02)))
            ).multiply(
                bd(1).add(v('activeQuestWishII').multiply(bd(0.01)))
            )
        APPerMajor = (bd(100)
                .multiply(
                    bd(1).add(v('activeQuestWishI').multiply(bd(0.02)))
                ).multiply(
                    bd(1).add(v('activeQuestWishII').multiply(bd(0.01)))
                ).floor()
            ).multiply(totalAPBonus).divide(bd(100)).floor()
    }

    var QPFromMajors = QPPerMajor.multiply(majorsPerDay).floor()
    var QPFromMinors = QPPerMinor.multiply(minorsPerDay).floor()
    var APFromMajors = APPerMajor.multiply(majorsPerDay).floor()
    var APFromMinors = APPerMinor.multiply(minorsPerDay).floor()






    /* Titan Info */
    var rbChallenges : bigDecimal = v('numRebirthChallenges')

    // Need to look up current tier for Titan
    var hourlyTitanAP : bigDecimal = bd(0);
    var hourlyTitanEXP : bigDecimal = bd(0);
    var hourlyTitanPP : bigDecimal = bd(0);
    var hourlyTitanQP : bigDecimal = bd(0);
    // var titanKills = j('titanKills');
    var wishLevel : number = Number(v('wishTitansHadBetterRewards').getValue());
    var playerAttack = new AttackStat(1, v('totalPower'), v('totalToughness'), v('totalRegen'), v('totalHealth'))

    var maxTitan : [Titan, number] = [Titans.GORDON_RAMSEY, 1]
    var maxTitanByAK : [Titan, number] = maxTitan
    Object.values(Titans).forEach((titan) => {
        if (titan.id < 13) {
            for(var i = 0; i < titan.versions; i++) {
                if(titan.canAutoKill(playerAttack, i)) {
                    maxTitanByAK = [titan, i]
                }
            }
        }
    })
    if(optMaxTitan == 'current') {
        maxTitan = maxTitanByAK
    } else {
        var tt = optMaxTitan.split('-')
        Object.values(Titans).forEach((titan) => {
            if (titan.id == Number(tt[0])) {
                maxTitan = [titan, Number(tt[1])]
            }
        })
    }
    
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
            
            hourlyTitanAP = hourlyTitanAP.add(titan.getAP(totalAPBonus).divide(titanRespawn).floor())
            hourlyTitanEXP = hourlyTitanEXP.add(titan.getEXP(v('totalExpBonus%'), v('twentyFourHourChallenge'), v('twentyFourHourEvilChallenge'), v('twentyFourHourSadisticChallenge')).multiply(titanMultiplier).divide(titanRespawn).floor())
            hourlyTitanPP = hourlyTitanPP.add(titan.getPP(v('totalPPBonus%')).multiply(titanMultiplier).divide(titanRespawn))
            hourlyTitanQP = hourlyTitanQP.add(titan.getQP(j('wishes'), v('totalQuestRewardBonus%').multiply(titanMultiplier).divide(titanRespawn)).floor())
        }
    })
    
    var totalTitanAP = hourlyTitanAP.multiply(hoursPerDay)
    var totalTitanEXP = hourlyTitanEXP.multiply(hoursPerDay).multiply(v('bonusTitanEXPPerk').compareTo(bd(0)) > 0 ? bd(1.5) : bd(1))
    var totalTitanPP = hourlyTitanPP.multiply(hoursPerDay)
    var totalTitanQP = hourlyTitanQP.multiply(hoursPerDay)

    // =hourlyTitanEXP * hoursPerDay * IF(titanExpPerkLvl > 0, hoursPerDay, 0) * 0.5)
    

    var titanList = Object.values(Titans).map((titan) => {
        if (titan.id < 13) {
            var rows = []
            for(var i = 0; i < titan.versions; i++) {
                if(titan.id == 5 && i > 0) {
                    continue
                }
                rows.push(<option key={titan.getFullKey(i)} value={titan.id +'-' + i}>
                    {titan.getFullName(i)}
                </option>)
                
            }
            return rows
        }
    })




    /* Ygg Info */
    var nguYgg = nguInfo(playerStates, Stat.YGGDRASIL_YIELD)
    var firstHarvest = Number(v('firstHarvestPerk').getValue())
    var blueHeart = c('blueHeart^')
    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        yieldModifier: v('totalYggdrasilYieldBonus%'),
        noNGUYieldModifier: v('totalYggdrasilYieldBonus%').divide(nguYgg).multiply(bd(100)),
        apBonus: totalAPBonus,
        ppBonus: v('totalPPBonus%'),
        qpRewardBonus: v('totalQuestRewardBonus%'),
        expBonus: v('totalExpBonus%'),
        fokSucksPerk: Number(v('fruitOfKnowledgeSucks^').getValue()),
        fokStillSucksPerk: Number(v('fruitOfKnowledgeSTILLSucks^').getValue()),
    }

    
    var fruitOfKnowledge : FruitOfKnowledge = new FruitOfKnowledge();
    var fruitOfRage : FruitOfRage = new FruitOfRage();
    var fruitOfQuirks : FruitOfQuirks = new FruitOfQuirks();
    var fruitOfArbitrariness : FruitOfArbitrariness = new FruitOfArbitrariness();
    var fruits : Yggdrasil[] = Object.values(j('yggdrasil'));
    for (var fruit of fruits) {
        if(fruit.key == FRUITS.RAGE.key) {
            fruitOfRage = fruit
        } else if(fruit.key == FRUITS.QUIRKS.key) {
            fruitOfQuirks = fruit
        } else if(fruit.key == FRUITS.ARBITRARINESS.key) {
            fruitOfArbitrariness = fruit
        }
        else if(fruit.key == FRUITS.KNOWLEDGE.key) {
            fruitOfKnowledge = fruit
        }
    }


    // @ts-ignore
    var fruitAPYield = fruitOfArbitrariness.fruitYield(fruitYieldData).divide(bd(24)).multiply(hoursPerDay)
    var fruitEXPYield = fruitOfKnowledge.fruitYield(fruitYieldData).divide(bd(24)).multiply(hoursPerDay)
    var fruitPPYield = fruitOfRage.fruitYield(fruitYieldData).divide(bd(24)).multiply(hoursPerDay)
    var fruitQPYield = fruitOfQuirks.fruitYield(fruitYieldData).divide(bd(24)).multiply(hoursPerDay)
    



    // AP Stuff
    var apRebirth = (hoursPerDay.multiply(bd(60 * 60)).subtract(bd(3600)))
        .divide(bd(500))
        .multiply(totalAPBonus)
        .divide(bd(100))
    if(v('moneyPitGoldToss?1e').compareTo(bd(0)) > 0) {
        var apMoneyPit = v('moneyPitGoldToss?1e')
            .multiply(totalAPBonus)
            .divide(bd(100))
            .multiply(v('moneyPitTossesPerDay'))
    } else {
        var apMoneyPit = bd(0)
    }
    var apDailySave = (bd(200).multiply(totalAPBonus).divide(bd(100))).floor()
        .multiply(hoursPerDay)
        .divide(bd(24))


    var dailySpinTier = Number(v('dailySpinTier').getValue())
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
            if(c('includeValueOfConsumables^')) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(100))
            }
            break;
        case 2:
            avgAPFromDailySpin = avgAPFromDailySpin
                    .add(bd(200 * 0.53).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(400*0.3).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(2000*0.1).multiply(totalAPBonus).divide(bd(100)).floor())
            if(c('includeValueOfConsumables^')) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(550))
            }
            break;
        case 3:
            avgAPFromDailySpin = avgAPFromDailySpin
                    .add(bd(300 * 0.37).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(600*0.25).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(2000*0.1).multiply(totalAPBonus).divide(bd(100)).floor())
            if(c('includeValueOfConsumables^')) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(900))
            }
            if(c('includeDailySpinJackpots^')) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(50000 * 0.005).multiply(totalAPBonus).divide(bd(100)).floor())
                if(c('includeValueOfConsumables^')) {
                    avgAPFromDailySpin = avgAPFromDailySpin.add(bd(275))
                }
            }
            break;
        case 4:
            avgAPFromDailySpin = avgAPFromDailySpin
                    .add(bd(500 * 0.5).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(1000*0.25).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(5000*0.1).multiply(totalAPBonus).divide(bd(100)).floor())
            if(c('includeValueOfConsumables^')) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(1550))
            }
            if(c('includeDailySpinJackpots^')) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(75000 * 0.005).multiply(totalAPBonus).divide(bd(100)).floor())
                if(c('includeValueOfConsumables^')) {
                    avgAPFromDailySpin = avgAPFromDailySpin.add(bd(1536.25))
                }
            }
            break;
        case 5:
            avgAPFromDailySpin = avgAPFromDailySpin
                    .add(bd(800 * 0.36).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(1600*0.25).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(8000*0.1).multiply(totalAPBonus).divide(bd(100)).floor())
            if(c('includeValueOfConsumables^')) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(1900))
            }
            if(c('includeDailySpinJackpots^')) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(100000 * 0.005).multiply(totalAPBonus).divide(bd(100)).floor())
                if(c('includeValueOfConsumables^')) {
                    avgAPFromDailySpin = avgAPFromDailySpin.add(bd(2112.5))
                }
            }
            break;
        case 6:
            avgAPFromDailySpin = avgAPFromDailySpin
                    .add(bd(1200 * 0.35).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(2400*0.25).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(12000*0.1).multiply(totalAPBonus).divide(bd(100)).floor())
            if(c('includeValueOfConsumables^')) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(3800))
            }
            if(c('includeDailySpinJackpots^')) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(150000 * 0.005).multiply(totalAPBonus).divide(bd(100)).floor())
                if(c('includeValueOfConsumables^')) {
                    avgAPFromDailySpin = avgAPFromDailySpin.add(bd(3788.75))
                }
            }
            break;
        case 7:
            avgAPFromDailySpin = avgAPFromDailySpin
                    .add(bd(1500 * 0.35).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(3000*0.25).multiply(totalAPBonus).divide(bd(100)).floor())
                    .add(bd(15000*0.1).multiply(totalAPBonus).divide(bd(100)).floor())
            if(c('includeValueOfConsumables^')) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(3800))
            }
            if(c('includeDailySpinJackpots^')) {
                avgAPFromDailySpin = avgAPFromDailySpin.add(bd(175000 * 0.005).multiply(totalAPBonus).divide(bd(100)).floor())
                if(c('includeValueOfConsumables^')) {
                    avgAPFromDailySpin = avgAPFromDailySpin.add(bd(5501.25))
                }
            }
            break;
    }
    var apDailySpin = avgAPFromDailySpin.floor()
        .multiply(hoursPerDay)
        .divide(bd(24))

    




    var totalAPPerDay = apDailySave.add(apDailySpin).add(APFromTower).add(apMoneyPit).add(apRebirth).add(fruitAPYield).add(APFromMajors).add(APFromMinors).add(totalTitanAP)
    var totalEXPPerDay = totalTitanEXP.add(fruitEXPYield).add(EXPFromTower)
    var totalPPPerDay = totalTitanPP.add(fruitPPYield).add(PPFromTower)
    var totalQPPerDay = QPFromMajors.add(QPFromMinors).add(fruitQPYield).add(totalTitanQP)


    var extraChildren = (
        <>
            <strong>Max titan:</strong> <select
                className="ml-2 text-black"
                onChange={(e) =>{
                    setOptMaxTitan(e.target.value)
                }}
                value={optMaxTitan}
            >
                <option key="current" value="current">Highest Titan by Autokill - {maxTitanByAK[0].getFullName(maxTitanByAK[1])}</option>
                {titanList}
            </select>
        </>
    )

    // TODO - Allow for non-high tier pulling of Yggdrasil
    // TODO - Allow for asking if they want poop/harvest in Yggdrasil
    return (
        <Content title="Daily Gains" infoRequired={infoReq} extraRequired={extraReq} extraChildren={extraChildren}>
            <div>
                <strong>Assumptions:</strong>
                <ul>
                    <li key="fruit">We assume that fruit are always harvested at max tier with poop/harvest as in your file.</li>
                    <li key="titanPerk">We assume if you have the Titan EXP Perk, then the bug always applies (as in, every boss gets the 50% boosted exp)</li>
                </ul>
                
            </div>
            <ContentSubsection title={"How many AP do I get in " + pn(hoursPerDay, fmt) + " hours?"}>
                <strong className="text-green-500">Daily Save:</strong> <span className="text-red-500">{pn(apDailySave, fmt, 2)}</span> <strong>AP per {pn(hoursPerDay, fmt)} hours</strong><br />
                <strong className="text-green-500">Daily Spin:</strong> <span className="text-red-500">{pn(apDailySpin, fmt, 2)}</span> <strong>AP per {pn(hoursPerDay, fmt)} hours</strong><br />
                <strong className="text-green-500">ITOPOD Tower:</strong> <span className="text-red-500">{pn(APFromTower, fmt)}</span> <strong>AP per {pn(hoursPerDay, fmt)} hours</strong><br />
                <strong className="text-green-500">Money Pit:</strong> <span className="text-red-500">{pn(apMoneyPit, fmt)}</span> <strong>AP per {pn(hoursPerDay, fmt)} hours</strong><br />
                <strong className="text-green-500">Quests:</strong> <ul className="ml-10">
                    <li key="major"><strong>Major:</strong> <span className="text-red-500">{pn(APFromMajors, fmt)}</span> AP ({pn(APPerMajor, fmt)} AP per major)</li>
                    <li key="minor"><strong>Minor:</strong> <span className="text-red-500">{pn(APFromMinors, fmt)}</span> AP ({pn(APPerMinor, fmt)} AP per major)</li>
                    </ul><br />
                <strong className="text-green-500">Rebirth:</strong> <span className="text-red-500">{pn(apRebirth, fmt)}</span> <strong>AP per {pn(hoursPerDay, fmt)} hours</strong><br />
                <strong className="text-green-500">Titans:</strong> <span className="text-red-500">{pn(totalTitanAP, fmt, 2)}</span> <strong>AP per {pn(hoursPerDay, fmt)} hours</strong> - Up to {maxTitan[0].getFullName(maxTitan[1])}<br />
                <strong className="text-green-500">Yggdrasil:</strong> <span className="text-red-500">{pn(fruitAPYield, fmt)}</span> <strong>AP per {pn(hoursPerDay, fmt)} hours</strong><br />
                <p className="mt-2 border-white border-t-2 border-solid">
                    <strong>Total:</strong> <span className="text-red-500">{pn(totalAPPerDay, fmt)}</span> <strong>AP per {pn(hoursPerDay, fmt)} hours</strong>
                </p>
            </ContentSubsection>
            <ContentSubsection title={"How many EXP do I get in " + pn(hoursPerDay, fmt) + " hours?"}>
                <strong className="text-green-500">ITOPOD Tower:</strong> <span className="text-red-500">{pn(EXPFromTower, fmt)}</span> <strong>EXP per {pn(hoursPerDay, fmt)} hours</strong><br />
                <strong className="text-green-500">Titans:</strong> <span className="text-red-500">{pn(totalTitanEXP, fmt)}</span> <strong>EXP per {pn(hoursPerDay, fmt)} hours</strong> - Up to {maxTitan[0].getFullName(maxTitan[1])}<br />
                <strong className="text-green-500">Yggdrasil:</strong> <span className="text-red-500">{pn(fruitEXPYield, fmt)}</span> <strong>EXP per {pn(hoursPerDay, fmt)} hours</strong><br />
                <p className="mt-2 border-white border-t-2 border-solid">
                    <strong>Total:</strong> <span className="text-red-500">{pn(totalEXPPerDay, fmt)}</span> <strong>EXP per {pn(hoursPerDay, fmt)} hours</strong>
                </p>
            </ContentSubsection>
            <ContentSubsection title={"How many PP do I get in " + pn(hoursPerDay, fmt) + " hours?"}>
                <strong className="text-green-500">Titans:</strong> <span className="text-red-500">{pn(totalTitanPP.divide(bd(1000000)), fmt, 2)}</span> <strong>PP per {pn(hoursPerDay, fmt)} hours</strong> - Up to {maxTitan[0].getFullName(maxTitan[1])}<br />
                <strong className="text-green-500">Tower:</strong> <span className="text-red-500">{pn(PPFromTower.divide(bd(1000000)), fmt, 2)}</span> <strong>PP per {pn(hoursPerDay, fmt)} hours</strong>
                <ul className="ml-10">
                    <li key="pppPerKill">{pn(pppPerKill, fmt)} ppp / kill on floor {pn(bd(itopodFloor), fmt)}</li>
                    <li key="killsPerDay">{pn(killsPerDay, fmt)} kills /  {pn(hoursPerDay, fmt)} hours (assuming 1-hit per kill)</li>
                </ul><br />
                <strong className="text-green-500">Yggdrasil:</strong> <span className="text-red-500">{pn(fruitPPYield.divide(bd(1000000)), fmt, 2)}</span> <strong>PP per {pn(hoursPerDay, fmt)} hours</strong>
                <p className="mt-2 border-white border-t-2 border-solid">
                    <strong>Total:</strong> <span className="text-red-500">{pn(totalPPPerDay.divide(bd(1000000)), fmt)}</span> <strong>PP per {pn(hoursPerDay, fmt)} hours</strong>
                </p>
            </ContentSubsection>
            <ContentSubsection title={"How many QP do I get in " + pn(hoursPerDay, fmt) + " hours?"}>
                <strong className="text-green-500">Quests:</strong> <ul className="ml-10">
                    <li key="major"><strong>Major:</strong> <span className="text-red-500">{pn(QPFromMajors, fmt, 2)}</span> QP ({pn(QPPerMajor, fmt)} QP per major)</li>
                    <li key="minor"><strong>Minor:</strong> <span className="text-red-500">{pn(QPFromMinors, fmt, 2)}</span> QP ({pn(QPPerMinor, fmt)} QP per major)</li>
                    </ul><br />
                <strong className="text-green-500">Titans:</strong> <span className="text-red-500">{pn(totalTitanQP, fmt, 2)}</span> <strong>QP per {pn(hoursPerDay, fmt)} hours</strong> - Up to {maxTitan[0].getFullName(maxTitan[1])}<br />
                <strong className="text-green-500">Yggdrasil:</strong> <span className="text-red-500">{pn(fruitQPYield, fmt, 2)}</span> <strong>QP per {pn(hoursPerDay, fmt)} hours</strong>
                <p className="mt-2 border-white border-t-2 border-solid">
                    <strong>Total:</strong> <span className="text-red-500">{pn(totalQPPerDay, fmt)}</span> <strong>QP per {pn(hoursPerDay, fmt)} hours</strong>
                </p>
            </ContentSubsection>
        </Content>
    )
}

