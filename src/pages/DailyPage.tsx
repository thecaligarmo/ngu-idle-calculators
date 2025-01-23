import _ from "lodash";
import { useState } from "react";
import { AttackStat, Titan, Titans } from "../assets/enemy";
import { Stat } from "../assets/stat";
import { Wish } from "../assets/wish";
import { FruitOfArbitrariness, FruitOfKnowledge, FruitOfQuirks, FruitOfRage, FRUITS, Yggdrasil } from "../assets/yggdrasil";
import { Zones } from "../assets/zones";
import Content, { requiredDataType } from "../components/Content";
import ContentSubsection from "../components/ContentSubsection";
import { getNumberFormat, getPlayer } from "../components/Context";
import { disableItem } from "../components/dataListColumns";
import { StandardTable } from "../components/StandardTable";
import { getIdleAttackModifier } from "../helpers/calculators";
import { getGameMode, isEvilMode, isNormalMode, questsUnlocked, titanKilled, wishesUnlocked, yggUnlocked } from "../helpers/gameMode";
import { bd, pn, toNum } from "../helpers/numbers";
import { getDailySaveAP, getDailySpinAP, getMaxTitanByAK, getMoneyPitAP, getQuestInfo, getRebirthAP, getTitanHourlyInfo, getTitanList } from "../helpers/pages/daily";
import { getPlayerDataInfo } from "../helpers/playerInfo";
import { nguInfo } from "../helpers/resourceInfo";


export default function Page() {
    var [optMaxTitan, setOptMaxTitan] = useState("current")
    const player = getPlayer();
    const fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired : requiredDataType = [
        ['gameMode', 'itopodFloor', 'bonusPP', 'numRebirthChallenges', 'twentyFourHourChallenge', 'twentyFourHourEvilChallenge', 'twentyFourHourSadisticChallenge'],
        ['questMinorQP', 'questMajorQP', 'questIdleDivider', 'activeQuestWishI', 'activeQuestWishII'],
        
        ['totalRespawnTime', 'totalAPBonus', 'totalExpBonus', 'totalPPBonus', 'totalQuestRewardBonus', 'totalQuestDropBonus', 'totalYggdrasilYieldBonus', 'totalPower'],
        [ 'blueHeart', 'redLiquidBonus', 'fadLandsSetBonus', 'fibQuestRNG', 'fasterQuesting', 'fruitOfKnowledgeSucks','fruitOfKnowledgeSTILLSucks',],

        [ 'bonusTitanEXPPerk', 'wishTitansHadBetterRewards', 'wishBeastDropQP', 'wishNerdDropQP', 'wishGodmotherDropQP', 'wishExileDropQP', 'wishTitan10DropQP', 'wishTitan11DropQP', 'wishTitan12DropQP'],
        []
    ]

    // Set extra required (not from playerData)
    var extraRequired : requiredDataType = [
        ['hoursPerDay', 'hoursOfflinePerDay',],
        [ 'bluePill','beastButter', 'includeMajorQuests', 'idleMajorQuests'],
        ['dailySpinTier', 'includeDailySpinJackpots', 'includeValueOfConsumables',  'moneyPitGoldToss', 'moneyPitTossesPerDay',],
        
    ]

    var goRequired : requiredDataType = [['goAP', 'goExperience', 'goPower', 'goQuestDrop', 'goRespawn', 'goYggdrasilYield']];
    
    var gameMode = getGameMode(player)
    var curTitan = player.get('highestTitanKilledId')

    // Get required data
    var infoReq = getPlayerDataInfo(infoRequired)
    var extraReq = getPlayerDataInfo(extraRequired)
    var goReq = getPlayerDataInfo(goRequired)


    // Hide unecessary stuff
    if(!questsUnlocked(curTitan)) {
        infoReq = disableItem(infoReq, ['questMinorQP', 'questMajorQP', 'questIdleDivider', 'activeQuestWishI', 'activeQuestWishII', 'totalQuestRewardBonus', 'totalQuestDropBonus','fibQuestRNG', 'fasterQuesting',])
        extraReq = disableItem(extraReq, [ 'includeMajorQuests', 'idleMajorQuests'])
    }
    if(!yggUnlocked(curTitan)) {
        infoReq = disableItem(infoReq, ['fruitOfKnowledgeSucks','fruitOfKnowledgeSTILLSucks','totalYggdrasilYieldBonus',])
    }
    if(!wishesUnlocked(curTitan)) {
        infoReq = disableItem(infoReq, [ 'wishTitansHadBetterRewards', 'wishBeastDropQP', 'wishNerdDropQP', 'wishGodmotherDropQP', 'wishExileDropQP', 'wishTitan10DropQP', 'wishTitan11DropQP', 'wishTitan12DropQP'])
    }
    if (!titanKilled(curTitan, Titans.BEAST)) {
        infoReq = disableItem(infoReq, ['wishBeastDropQP'])
    }
    if (!titanKilled(curTitan, Titans.NERD)) {
        infoReq = disableItem(infoReq, ['wishNerdDropQP'])
    }
    if (!titanKilled(curTitan, Titans.GODMOTHER)) {
        infoReq = disableItem(infoReq, ['wishGodmotherDropQP'])
    }
    if (!titanKilled(curTitan, Titans.EXILE)) {
        infoReq = disableItem(infoReq, ['wishExileDropQP'])
    }
    if (!titanKilled(curTitan, Titans.IT_HUNGERS)) {
        infoReq = disableItem(infoReq, ['wishTitan10DropQP'])
    }
    if (!titanKilled(curTitan, Titans.ROCK_LOBSTER)) {
        infoReq = disableItem(infoReq, ['wishTitan11DropQP'])
    }
    if (!titanKilled(curTitan, Titans.AMALGAMATE)) {
        infoReq = disableItem(infoReq, ['wishTitan12DropQP'])
    }
    if(isNormalMode(gameMode)) {
        infoReq = disableItem(infoReq, ['twentyFourHourEvilChallenge', 'twentyFourHourSadisticChallenge'])
    }
    if(isEvilMode(gameMode)) {
        infoReq = disableItem(infoReq, ['twentyFourHourSadisticChallenge'])
    }
    

    // Variables we use a lot
    var hoursPerDay = player.get('hoursPerDay')//.compareTo(bd(0)) == 0 ? bd(24) : player.get('hoursPerDay')
    var totalAPBonus = player.get('totalAPBonus')
    var totalExpBonus = player.get('totalExpBonus')
    var totalPPBonus = player.get('totalPPBonus')
    var totalQPBonus = player.get('totalQuestRewardBonus')
    var wishes : Wish[] = player.get('wishes')
    var titans : Titan[] = player.get('titans')

    // Update wishes with info above.
    if(!_.isUndefined(wishes[Titans.BEAST.getQPWishNum()])) {
        wishes[Titans.BEAST.getQPWishNum()].level = player.get('wishBeastDropQP') ? 1 : 0
        wishes[Titans.NERD.getQPWishNum()].level = player.get('wishNerdDropQP') ? 1 : 0
        wishes[Titans.GODMOTHER.getQPWishNum()].level = player.get('wishGodmotherDropQP') ? 1 : 0
        wishes[Titans.EXILE.getQPWishNum()].level = player.get('wishExileDropQP') ? 1 : 0
        wishes[Titans.IT_HUNGERS.getQPWishNum()].level = player.get('wishTitan10DropQP') ? 1 : 0
        wishes[Titans.ROCK_LOBSTER.getQPWishNum()].level = player.get('wishTitan11DropQP') ? 1 : 0
        wishes[Titans.AMALGAMATE.getQPWishNum()].level = player.get('wishTitan12DropQP') ? 1 : 0
    }

    


    /* ITOPOD */
    var itopodZone = Zones.ITOPOD;
    itopodZone.setLevel(player.get('itopodFloor'))

    var pppPerKill = itopodZone.getPPPPerKill(player.get('gameMode'), totalPPBonus, player.get('bluePill'), player.get('blueHeart'), player.get('bonusPP'));
    var killsPerDay = itopodZone.getKillsPerHour(player.get('totalPower'), getIdleAttackModifier(player.get('spoopySetBonus'), player.get('sadisticNoEquipmentChallenges')), player.get('redLiquidBonus'), player.get('totalRespawnTime')).multiply(hoursPerDay)

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
        activeQuestWishI : player.get('activeQuestWishI'),
        activeQuestWishII : player.get('activeQuestWishII'),
        beastButter : player.get('beastButter'),
        blueHeart: player.get('blueHeart'),
        fadLandsSetBonus : player.get('fadLandsSetBonus'),
        fasterQuesting : player.get('fasterQuesting'),
        fibQuestRNG : player.get('fibQuestRNG'),
        hoursOfflinePerDay : player.get('hoursOfflinePerDay'),
        hoursPerDay : hoursPerDay,
        idleMajorQuests : player.get('idleMajorQuests'),
        includeMajorQuests: player.get('includeMajorQuests'),
        redLiquidBonus: player.get('redLiquidBonus'),
        questIdleDivider : player.get('questIdleDivider'),
        questMinorQP: player.get('questMinorQP'),
        questMajorQP : player.get('questMajorQP'),
        totalQuestDropBonus: player.get('totalQuestDropBonus'),
        totalAPBonus: totalAPBonus,
        totalQPBonus: totalQPBonus,
        totalRespawnTime: player.get('totalRespawnTime'),

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
        bonusTitanEXPPerk : player.get('bonusTitanEXPPerk'),
        numRebirthChallenges: player.get('numRebirthChallenges'),
        twentyFourHourChallenge: player.get('twentyFourHourChallenge'),
        twentyFourHourEvilChallenge: player.get('twentyFourHourEvilChallenge'),
        twentyFourHourSadisticChallenge: player.get('twentyFourHourSadisticChallenge'),
        totalAPBonus: totalAPBonus,
        totalExpBonus: totalExpBonus,
        totalPPBonus : totalPPBonus,
        totalQPBonus: totalQPBonus,
        wishTitansHadBetterRewards: player.get('wishTitansHadBetterRewards'),
        wishes : player.get('wishes'),
    }
    var playerAttack = new AttackStat(1, player.get('totalPower'), player.get('totalToughness'), player.get('totalRegen'), player.get('totalHealth'))
    
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
    var firstHarvest = toNum(player.get('firstHarvestPerk'))
    var blueHeart = player.get('blueHeart')
    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        nguYgg: nguInfo(player, Stat.YGGDRASIL_YIELD),
        yieldModifier: player.get('totalYggdrasilYieldBonus'),
        apBonus: totalAPBonus,
        ppBonus: totalPPBonus,
        qpRewardBonus: totalQPBonus,
        expBonus: totalExpBonus,
        fokSucksPerk: toNum(player.get('fruitOfKnowledgeSucks')),
        fokStillSucksPerk: toNum(player.get('fruitOfKnowledgeSTILLSucks')),
    }
    
    var fruitOfKnowledge : FruitOfKnowledge = new FruitOfKnowledge();
    var fruitOfRage : FruitOfRage = new FruitOfRage();
    var fruitOfQuirks : FruitOfQuirks = new FruitOfQuirks();
    var fruitOfArbitrariness : FruitOfArbitrariness = new FruitOfArbitrariness();
    var fruits : Yggdrasil[] = Object.values(player.get('yggdrasil'));
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
    var apMoneyPit = getMoneyPitAP(player.get('moneyPitGoldToss'), player.get('moneyPitTossesPerDay'), totalAPBonus);
    var apDailySave = getDailySaveAP(totalAPBonus, hoursPerDay);
    var apDailySpin = getDailySpinAP(player.get('dailySpinTier'), totalAPBonus, hoursPerDay, player.get('includeValueOfConsumables'), player.get('includeDailySpinJackpots'));


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
            "extra" : <span>Floor {pn(player.get('itopodFloor'), fmt)}</span>,
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
            "extra": <span>Floor {pn(player.get('itopodFloor'), fmt)}</span>,
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
                        <li key="floor">Floor {pn(player.get('itopodFloor'), fmt)}</li>
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

