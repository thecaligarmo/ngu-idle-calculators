'use client'

import { AttackStat, Titan, Titans } from "@/assets/enemy";
import { Stat } from "@/assets/stat";
import { Wish } from "@/assets/wish";
import { FruitOfArbitrariness, FruitOfKnowledge, FruitOfQuirks, FruitOfRage, FRUITS, Yggdrasil } from "@/assets/yggdrasil";
import { Zones } from "@/assets/zones";
import Content, { requiredDataType } from "@/components/content";
import ContentSubsection from "@/components/contentSubsection";
import { getNumberFormat } from "@/components/context";
import { disableItem } from "@/components/dataListColumns";
import { StandardTable } from "@/components/standardTable";
import { getIdleAttackModifier } from "@/helpers/calculators";
import { getGameMode, isEvilMode, isNormalMode, questsUnlocked, titanKilled, wishesUnlocked, yggUnlocked } from "@/helpers/gameMode";
import { bd, isOne, pn, toNum } from "@/helpers/numbers";
import { getDailySaveAP, getDailySpinAP, getMaxTitanByAK, getMoneyPitAP, getQuestInfo, getRebirthAP, getTitanHourlyInfo, getTitanList } from "@/helpers/pages/daily";
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
    var infoRequired : requiredDataType = [
        ['gameMode', 'itopodFloor-5', 'bonusPP-4', 'numRebirthChallenges-2', 'twentyFourHourChallenge-2', 'twentyFourHourEvilChallenge-2', 'twentyFourHourSadisticChallenge-2'],
        ['questMinorQP-2', 'questMajorQP-2', 'questIdleDivider-1', 'activeQuestWishI-2', 'activeQuestWishII-2'],
        
        ['totalRespawnTime', 'totalAPBonus%', 'totalExpBonus%', 'totalPPBonus%', 'totalQuestRewardBonus%', 'totalQuestDropBonus%', 'totalYggdrasilYieldBonus%', 'totalPower'],
        [ 'blueHeart^', 'redLiquidBonus^', 'fadLandsSetBonus^', 'fibQuestRNG^', 'fasterQuesting^', 'fruitOfKnowledgeSucks^','fruitOfKnowledgeSTILLSucks^',],

        [ 'bonusTitanEXPPerk-2', 'wishTitansHadBetterRewards-2', 'wishBeastDropQP^', 'wishNerdDropQP^', 'wishGodmotherDropQP^', 'wishExileDropQP^', 'wishTitan10DropQP^', 'wishTitan11DropQP^', 'wishTitan12DropQP^'],
        []
    ]

    // Set extra required (not from playerData)
    var extraRequired : requiredDataType = [
        [['hoursPerDay-2', 24], 'hoursOfflinePerDay-2',],
        [ 'bluePill^','beastButter^', 'includeMajorQuests^', 'idleMajorQuests^'],
        ['dailySpinTier-1', 'includeDailySpinJackpots^', 'includeValueOfConsumables^',  'moneyPitGoldToss?1e', 'moneyPitTossesPerDay-2',],
        
    ]

    var goRequired : requiredDataType = [['goAP%', 'goExperience%', 'goPower%', 'goQuestDrop%', 'goRespawn%', 'goYggdrasilYield%']];
    const playerStates = createStatesForData(extraRequired, goRequired);
    var gameMode = getGameMode(playerStates)
    var curTitan = v('highestTitanKilledId-2')

    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates)
    var extraReq = getRequiredStates(extraRequired, playerStates)
    var goReq = getRequiredStates(goRequired, playerStates)

    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        return parseNum(playerStates, key)
    }

    function c(key : string) : boolean {
        return isOne(v(key))
    }

    function j(key : string) : any{
        return parseObj(playerStates, key)
    }

    // Hide unecessary stuff
    if(!questsUnlocked(curTitan)) {
        infoReq = disableItem(infoReq, ['questMinorQP-2', 'questMajorQP-2', 'questIdleDivider-1', 'activeQuestWishI-2', 'activeQuestWishII-2', 'totalQuestRewardBonus%', 'totalQuestDropBonus%','fibQuestRNG^', 'fasterQuesting^',])
        extraReq = disableItem(extraReq, [ 'includeMajorQuests^', 'idleMajorQuests^'])
    }
    if(!yggUnlocked(curTitan)) {
        infoReq = disableItem(infoReq, ['fruitOfKnowledgeSucks^','fruitOfKnowledgeSTILLSucks^','totalYggdrasilYieldBonus%',])
    }
    if(!wishesUnlocked(curTitan)) {
        infoReq = disableItem(infoReq, [ 'wishTitansHadBetterRewards-2', 'wishBeastDropQP^', 'wishNerdDropQP^', 'wishGodmotherDropQP^', 'wishExileDropQP^', 'wishTitan10DropQP^', 'wishTitan11DropQP^', 'wishTitan12DropQP^'])
    }
    if (!titanKilled(curTitan, Titans.BEAST)) {
        infoReq = disableItem(infoReq, ['wishBeastDropQP^'])
    }
    if (!titanKilled(curTitan, Titans.NERD)) {
        infoReq = disableItem(infoReq, ['wishNerdDropQP^'])
    }
    if (!titanKilled(curTitan, Titans.GODMOTHER)) {
        infoReq = disableItem(infoReq, ['wishGodmotherDropQP^'])
    }
    if (!titanKilled(curTitan, Titans.EXILE)) {
        infoReq = disableItem(infoReq, ['wishExileDropQP^'])
    }
    if (!titanKilled(curTitan, Titans.IT_HUNGERS)) {
        infoReq = disableItem(infoReq, ['wishTitan10DropQP^'])
    }
    if (!titanKilled(curTitan, Titans.ROCK_LOBSTER)) {
        infoReq = disableItem(infoReq, ['wishTitan11DropQP^'])
    }
    if (!titanKilled(curTitan, Titans.AMALGAMATE)) {
        infoReq = disableItem(infoReq, ['wishTitan12DropQP^'])
    }
    if(isNormalMode(gameMode)) {
        infoReq = disableItem(infoReq, ['twentyFourHourEvilChallenge-2', 'twentyFourHourSadisticChallenge-2'])
    }
    if(isEvilMode(gameMode)) {
        infoReq = disableItem(infoReq, ['twentyFourHourSadisticChallenge-2'])
    }
    

    // Variables we use a lot
    var hoursPerDay = v('hoursPerDay-2')//.compareTo(bd(0)) == 0 ? bd(24) : v('hoursPerDay-2')
    var totalAPBonus = v('totalAPBonus%')
    var totalExpBonus = v('totalExpBonus%')
    var totalPPBonus = v('totalPPBonus%')
    var totalQPBonus = v('totalQuestRewardBonus%')
    var wishes : Wish[] = j('wishes')
    var titans : Titan[] = j('titans')

    // Update wishes with info above.
    if(!_.isUndefined(wishes[Titans.BEAST.getQPWishNum()])) {
        wishes[Titans.BEAST.getQPWishNum()].level = c('wishBeastDropQP^') ? 1 : 0
        wishes[Titans.NERD.getQPWishNum()].level = c('wishNerdDropQP^') ? 1 : 0
        wishes[Titans.GODMOTHER.getQPWishNum()].level = c('wishGodmotherDropQP^') ? 1 : 0
        wishes[Titans.EXILE.getQPWishNum()].level = c('wishExileDropQP^') ? 1 : 0
        wishes[Titans.IT_HUNGERS.getQPWishNum()].level = c('wishTitan10DropQP^') ? 1 : 0
        wishes[Titans.ROCK_LOBSTER.getQPWishNum()].level = c('wishTitan11DropQP^') ? 1 : 0
        wishes[Titans.AMALGAMATE.getQPWishNum()].level = c('wishTitan12DropQP^') ? 1 : 0
    }

    


    /* ITOPOD */
    var itopodZone = Zones.ITOPOD;
    itopodZone.setLevel(v('itopodFloor-5'))

    var pppPerKill = itopodZone.getPPPPerKill(v('gameMode'), totalPPBonus, c('bluePill^'), c('blueHeart^'), v('bonusPP-4'));
    var killsPerDay = itopodZone.getKillsPerHour(v('totalPower'), getIdleAttackModifier(c('spoopySetBonus^'), v('sadisticNoEquipmentChallenges-2')), c('redLiquidBonus^'), v('totalRespawnTime')).multiply(hoursPerDay)

    var PPPFromTower = killsPerDay.multiply(pppPerKill)
    var APFromTower = killsPerDay.divide(
            itopodZone.cycleLength()
            )
    var EXPFromTower = killsPerDay.divide(
            itopodZone.cycleLength()
        ).multiply(
            bd(itopodZone.exp[0])
        ).multiply(totalExpBonus).divide(bd(100))


    

    /* Quest info */
    var questData = {
        activeQuestWishI : v('activeQuestWishI-2'),
        activeQuestWishII : v('activeQuestWishII-2'),
        beastButter : c('beastButter^'),
        blueHeart: c('blueHeart^'),
        fadLandsSetBonus : c('fadLandsSetBonus^'),
        fasterQuesting : c('fasterQuesting^'),
        fibQuestRNG : c('fibQuestRNG^'),
        hoursOfflinePerDay : v('hoursOfflinePerDay-2'),
        hoursPerDay : hoursPerDay,
        idleMajorQuests : c('idleMajorQuests^'),
        includeMajorQuests: c('includeMajorQuests^'),
        redLiquidBonus: c('redLiquidBonus^'),
        questIdleDivider : v('questIdleDivider-1'),
        questMinorQP: v('questMinorQP-2'),
        questMajorQP : v('questMajorQP-2'),
        totalQuestDropBonus: v('totalQuestDropBonus%'),
        totalAPBonus: totalAPBonus,
        totalQPBonus: totalQPBonus,
        totalRespawnTime: v('totalRespawnTime'),

    }
    
    var questInfo = getQuestInfo(questData);
    var QPFromMajors = questInfo['qp']['major']
    var QPFromMinors = questInfo['qp']['minor']
    var QPPerMajor = questInfo['qp']['perMajor']
    var QPPerMinor = questInfo['qp']['perMinor']
    var APFromMajors = questInfo['ap']['major']
    var APFromMinors = questInfo['ap']['minor']
    var APPerMajor = questInfo['ap']['perMajor']
    var APPerMinor = questInfo['ap']['perMinor']
    


    /* Titan Info */
    var titanData = {
        bonusTitanEXPPerk : v('bonusTitanEXPPerk-2'),
        numRebirthChallenges: v('numRebirthChallenges-2'),
        twentyFourHourChallenge: v('twentyFourHourChallenge-2'),
        twentyFourHourEvilChallenge: v('twentyFourHourEvilChallenge-2'),
        twentyFourHourSadisticChallenge: v('twentyFourHourSadisticChallenge-2'),
        totalAPBonus: totalAPBonus,
        totalExpBonus: totalExpBonus,
        totalPPBonus : totalPPBonus,
        totalQPBonus: totalQPBonus,
        wishTitansHadBetterRewards: v('wishTitansHadBetterRewards-2'),
        wishes : j('wishes'),
    }
    var playerAttack = new AttackStat(1, v('totalPower'), v('totalToughness'), v('totalRegen'), v('totalHealth'))
    
    var maxTitanByAK : [Titan, number] = getMaxTitanByAK(titans, playerAttack);
    var maxTitan : [Titan, number] = maxTitanByAK

    // Update titan if user wants a different one.
    if(optMaxTitan != 'current') {
        var tt = optMaxTitan.split('-')
        Object.values(Titans).forEach((titan) => {
            if (titan.id == Number(tt[0])) {
                maxTitan = [titan, Number(tt[1])]
            }
        })
    }
    var titanHourInfo = getTitanHourlyInfo(maxTitan, titanData);
    var totalTitanAP = titanHourInfo['ap'].multiply(hoursPerDay)
    var totalTitanEXP = titanHourInfo['exp'].multiply(hoursPerDay)
    var totalTitanPP = titanHourInfo['ppp'].multiply(hoursPerDay).divide(bd(1000000))
    var totalTitanQP = titanHourInfo['qp'].multiply(hoursPerDay)
    var titanList = getTitanList();


    /* Ygg Info */
    var firstHarvest = toNum(v('firstHarvestPerk'))
    var blueHeart = c('blueHeart^')
    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        nguYgg: nguInfo(playerStates, Stat.YGGDRASIL_YIELD),
        yieldModifier: v('totalYggdrasilYieldBonus%'),
        apBonus: totalAPBonus,
        ppBonus: totalPPBonus,
        qpRewardBonus: totalQPBonus,
        expBonus: totalExpBonus,
        fokSucksPerk: toNum(v('fruitOfKnowledgeSucks^')),
        fokStillSucksPerk: toNum(v('fruitOfKnowledgeSTILLSucks^')),
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

    
    var apYggdrasil = fruitOfArbitrariness.fruitYield(fruitYieldData).divide(bd(24)).multiply(hoursPerDay)
    var expYggdrasil = fruitOfKnowledge.fruitYield(fruitYieldData).divide(bd(24)).multiply(hoursPerDay)
    var pppYggdrasil = fruitOfRage.fruitYield(fruitYieldData).divide(bd(24)).multiply(hoursPerDay)
    var qpYggdrasil = fruitOfQuirks.fruitYield(fruitYieldData).divide(bd(24)).multiply(hoursPerDay)


    // AP Stuff
    var apRebirth = getRebirthAP(totalAPBonus, hoursPerDay)
    var apMoneyPit = getMoneyPitAP(v('moneyPitGoldToss?1e'), v('moneyPitTossesPerDay-2'), totalAPBonus);
    var apDailySave = getDailySaveAP(totalAPBonus, hoursPerDay);
    var apDailySpin = getDailySpinAP(v('dailySpinTier-1'), totalAPBonus, hoursPerDay, c('includeValueOfConsumables^'), c('includeDailySpinJackpots^'));


    var totalAPPerDay = apDailySave.add(apDailySpin).add(APFromTower).add(apMoneyPit).add(apRebirth).add(apYggdrasil).add(APFromMajors).add(APFromMinors).add(totalTitanAP)
    var totalEXPPerDay = totalTitanEXP.add(expYggdrasil).add(EXPFromTower)
    var totalPPPerDay = totalTitanPP.add(pppYggdrasil.divide(bd(1000000))).add(PPPFromTower.divide(bd(1000000)))
    var totalQPPerDay = QPFromMajors.add(QPFromMinors).add(qpYggdrasil).add(totalTitanQP)


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

    let tableOrder = ["key", "amt", "extra"]
    let apTableHeader = {
        "key": "AP",
        "amt": "Amount",
    }
    var expTableHeader = {
        'key': "EXP",
        "amt": "Amount",
    }
    var ppTableHeader = {
        'key': "PP",
        "amt": "Amount",
    }
    var qpTableHeader = {
        'key': "QP",
        "amt": "Amount",
    }
    let apTableDataRows = {
        "dailySave" : {
            "key" : "Daily Save",
            "amt" : <span className="text-red-500">{pn(apDailySave, fmt)}</span>,
        },
        "dailySpin" : {
            "key" : "Daily Spin",
            "amt" : <span className="text-red-500">{pn(apDailySpin, fmt)}</span>,
        },
        "itopod" : {
            "key" : "ITOPOD Tower",
            "amt" : <span className="text-red-500">{pn(APFromTower, fmt)}</span>,
            "extra" : <span>Floor {pn(v('itopodFloor-5'), fmt)}</span>,
        },
        "moneyPit" : {
            "key" : "Money Pit",
            "amt" : <span className="text-red-500">{pn(apMoneyPit, fmt)}</span>,
        },
        "questMajor" : {
            "key" : "Major Quests",
            "amt" : <span className="text-red-500">{pn(APFromMajors, fmt)}</span>,
            "extra" : <span>{pn(APPerMajor, fmt)} AP per major</span>,
        },
        "questMinor" : {
            "key" : "Minor Quests",
            "amt" : <span className="text-red-500">{pn(APFromMinors, fmt)}</span>,
            "extra" : <span>{pn(APPerMinor, fmt)} AP per minor</span>,
        },
        "rebirth" : {
            "key" : "Rebirth",
            "amt" : <span className="text-red-500">{pn(apRebirth, fmt)}</span>,
        },
        "titans" : {
            "key" : "Titans",
            "amt" : <span className="text-red-500">{pn(totalTitanAP, fmt)}</span>,
            "extra" : <span>Up to {maxTitan[0].getFullName(maxTitan[1])}</span>,
        },
        "yggdrasil" : {
            "key" : "Yggdrasil",
            "amt" : <span className="text-red-500">{pn(apYggdrasil, fmt)}</span>,
        },
        "total" : {
            "key" : "Total:",
            "amt": <span className="text-red-500">{pn(totalAPPerDay, fmt)} AP</span>,
            "isTotal" : true,
        },
    }
    var expTableDataRows = {
        "itopod" : {
            "key": "ITOPOD Tower",
            "amt": <span className="text-red-500">{pn(EXPFromTower, fmt)}</span>,
            "extra": <span>Floor {pn(v('itopodFloor-5'), fmt)}</span>,
        },
        "titans" : {
            "key": "Titans",
            "amt": <span className="text-red-500">{pn(totalTitanEXP, fmt)}</span>,
            "extra": <span>Up to {maxTitan[0].getFullName(maxTitan[1])}</span>,
        },
        "yggdrasil" : {
            "key": "Yggdrasil",
            "amt": <span className="text-red-500">{pn(expYggdrasil, fmt)}</span>,
        },
        "total" : {
            "key" : "Total:",
            "amt" : <span className="text-red-500">{pn(totalEXPPerDay, fmt)} EXP</span>,
            "isTotal": true
        },
    }
    var ppTableDataRows = {
       "itopod" : {
            "key": "ITOPOD Tower",
            "amt": <span className="text-red-500">{pn(PPPFromTower.divide(bd(1000000)), fmt)}</span>,
            "extra": (<ul>
                        <li key="floor">Floor {pn(v('itopodFloor-5'), fmt)}</li>
                        <li key="pppPerKill">{pn(pppPerKill, fmt)} ppp per kill</li>
                        <li key="killsPerDay">{pn(killsPerDay, fmt)} kills per  {pn(hoursPerDay, fmt)} hours</li>
                        <li key="descrip">* We assume 1-hit per kill</li>
                    </ul>),
        },
        "titans" : {
            "key": "Titans",
            "amt": <span className="text-red-500">{pn(totalTitanPP, fmt)}</span>,
            "extra": <span>Up to {maxTitan[0].getFullName(maxTitan[1])}</span>,
        },
        "yggdrasil" : {
            "key": "Yggdrasil",
            "amt": <span className="text-red-500">{pn(pppYggdrasil.divide(bd(1000000)), fmt)}</span>,
        },
        "total" : {
            "key" : "Total:",
            "amt" : <span className="text-red-500">{pn(totalPPPerDay, fmt)} PP</span>,
            "isTotal": true
        },
    }
    var qpTableDataRows = {
        "questMajor" : {
            "key": "Major Quests",
            "amt": <span className="text-red-500">{pn(QPFromMajors, fmt)}</span>,
            "extra": <span>{pn(QPPerMajor, fmt)} QP per major</span>,
        },
        "questMinor" : {
            "key": "Minor Quests",
            "amt": <span className="text-red-500">{pn(QPFromMinors, fmt)}</span>,
            "extra": <span>{pn(QPPerMinor, fmt)} QP per minor</span>,
        },
        "titans" : {
            "key": "Titans",
            "amt": <span className="text-red-500">{pn(totalTitanQP, fmt)}</span>,
            "extra": <span>Up to {maxTitan[0].getFullName(maxTitan[1])}</span>,
        },
        "yggdrasil" : {
            "key": "Yggdrasil",
            "amt": <span className="text-red-500">{pn(qpYggdrasil, fmt)}</span>,
        },
        "total" : {
            "key" : "Total:",
            "amt" : <span className="text-red-500">{pn(totalQPPerDay, fmt)} QP</span>,
            "isTotal": true
        },
    }




    // TODO - Allow for non-high tier pulling of Yggdrasil
    // TODO - Allow for asking if they want poop/harvest in Yggdrasil
    return (
        <Content title="Daily Gains" infoRequired={infoReq} extraRequired={extraReq} extraChildren={extraChildren} goRequired={goReq}>
            <div>
                <strong>Assumptions:</strong>
                <ul>
                    <li key="fruit">We assume that fruit are always harvested at max tier with poop/harvest as in your file.</li>
                    <li key="titanPerk">We assume if you have the Titan EXP Perk, then the bug always applies (as in, every boss gets the 50% boosted exp)</li>
                </ul>
                
            </div>
            <ContentSubsection title={"How many AP do I get in " + pn(hoursPerDay, fmt) + " hours?"}>
                <StandardTable order={tableOrder} header={apTableHeader} rows={apTableDataRows} />
            </ContentSubsection>
            <ContentSubsection title={"How many EXP do I get in " + pn(hoursPerDay, fmt) + " hours?"}>
                <StandardTable order={tableOrder} header={expTableHeader} rows={expTableDataRows} />
            </ContentSubsection>
            <ContentSubsection title={"How many PP do I get in " + pn(hoursPerDay, fmt) + " hours?"}>
                <StandardTable order={tableOrder} header={ppTableHeader} rows={ppTableDataRows} />
            </ContentSubsection>
            { questsUnlocked(curTitan)  // Must have beaten the Beast
                ? <ContentSubsection title={"How many QP do I get in " + pn(hoursPerDay, fmt) + " hours?"}>
                        <StandardTable order={tableOrder} header={qpTableHeader} rows={qpTableDataRows} />
                    </ContentSubsection>
                : null
            }
        </Content>
    )
}

