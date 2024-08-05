'use client'

import { AttackStat, Titan, Titans } from "@/assets/enemy";
import { Stat } from "@/assets/stat";
import { FruitOfArbitrariness, FruitOfKnowledge, FruitOfQuirks, FruitOfRage, FRUITS, Yggdrasil } from "@/assets/yggdrasil";
import  { Zones } from "@/assets/zones";
import Content from "@/components/content";
import ContentSubsection from "@/components/contentSubsection";
import { getNumberFormat } from "@/components/context";
import { getIdleAttackModifier } from "@/helpers/calculators";
import { bd, pn} from "@/helpers/numbers";
import { getDailySaveAP, getDailySpinAP, getMaxTitanByAK, getMoneyPitAP, getQuestInfo, getRebirthAP, getTitanHourlyInfo, getTitanList } from "@/helpers/pages/daily";
import { parseNum, parseObj } from "@/helpers/parsers";
import { nguInfo } from "@/helpers/resourceInfo";
import { createStatesForData, getRequiredStates } from "@/helpers/stateForData";
import bigDecimal from "js-big-decimal";
import _ from "lodash";
import { ReactElement, useState } from "react";


function itemText(elt : bigDecimal, fmt : string, type : string, extra : ReactElement | null = null) : ReactElement {

    return (<><span className="text-red-500">{pn(elt, fmt)}</span> {type} {extra}</>)
    
}

function itemLine(name : string, elt : bigDecimal, fmt : string, type : string, extra : ReactElement | null = null) : ReactElement {
    return (
        <>
            <strong className="text-green-500">{name}:</strong> {itemText(elt, fmt, type, extra)}{extra ? null : <br />}
        </>
    )
}



function itemUL(name : string, elt : {[key: string] : {'elt' : bigDecimal, 'name': string, 'extra' ?: ReactElement}}, fmt : string, type : string, extra : {[key : string] : ReactElement} | null = null) : ReactElement {
    return (
        <>
            <strong className="text-green-500">{name}:</strong>  <ul className="ml-10">
                {Object.keys(elt).map((e, index) => {
                    return (
                        <li key={e}><strong>{elt[e]['name']}:</strong> {itemText(elt[e]['elt'], fmt, type, elt[e]['extra'])}</li>
                    )
                })}
            </ul> {extra}
        </>
    )
}


export default function Page() {
    var [optMaxTitan, setOptMaxTitan] = useState("current")
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired = [
        ['gameMode', 'numRebirthChallenges-2', 'twentyFourHourChallenge-2', 'twentyFourHourEvilChallenge-2', 'twentyFourHourSadisticChallenge-2', 'sadisticNoEquipmentChallenges-2'],
        ['questMinorQP-2', 'questMajorQP-2', 'questIdleDivider-1', 'activeQuestWishI-2', 'activeQuestWishII-2'],
        
        ['totalRespawnTime', 'totalAPBonus%', 'totalExpBonus%', 'totalPPBonus%', 'totalQuestRewardBonus%', 'totalQuestDropBonus%', 'totalYggdrasilYieldBonus%', 'totalPower'],
        [ 'blueHeart^', 'redLiquidBonus^','spoopySetBonus^', 'fadLandsSetBonus^', 'fibQuestRNG^', 'fasterQuesting^', 'fruitOfKnowledgeSucks^','fruitOfKnowledgeSTILLSucks^',],

        [ 'bonusTitanEXPPerk-2', 'wishTitansHadBetterRewards-2', ],
        []
    ]

    // Set extra required (not from playerData)
    var extraRequired : (string | [string, number])[][] = [
        [['hoursPerDay-2', 24], 'hoursOfflinePerDay-2', 'itopodFloor-5',],
        [ 'bluePill^','beastButter^', 'includeMajorQuests^', 'idleMajorQuests^'],
        ['dailySpinTier-1', 'includeDailySpinJackpots^', 'includeValueOfConsumables^',  'moneyPitGoldToss?1e', 'moneyPitTossesPerDay-2',],
        
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
    var hoursPerDay = v('hoursPerDay-2')//.compareTo(bd(0)) == 0 ? bd(24) : v('hoursPerDay-2')
    var totalAPBonus = v('totalAPBonus%')
    var totalExpBonus = v('totalExpBonus%')
    var totalPPBonus = v('totalPPBonus%')
    var totalQPBonus = v('totalQuestRewardBonus%')
    






    /* ITOPOD */
    var itopodZone = Zones.ITOPOD;
    var itopodFloor = 0
    if (v('itopodFloor-5').compareTo(bd(0)) == 0) {
        var idleAttackModifier = getIdleAttackModifier(c('spoopySetBonus^'), v('sadisticNoEquipmentChallenges-2'));
        itopodFloor = itopodZone.getOptimalFloor(v('totalPower'), idleAttackModifier)
    } else {
        itopodFloor = Number(v('itopodFloor-5').getValue())
    }
    itopodZone.setLevel(itopodFloor)

    var pppPerKill = itopodZone.getPPPPerKill(v('gameMode'), totalPPBonus, c('bluePill^'), c('blueHeart^'));
    var killsPerDay = itopodZone.getKillsPerHour(c('redLiquidBonus^'), v('totalRespawnTime')).multiply(hoursPerDay)

    var PPFromTower = killsPerDay.multiply(pppPerKill)
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
    
    var maxTitanByAK : [Titan, number] = getMaxTitanByAK(playerAttack);
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
    var titanHourlInfo = getTitanHourlyInfo(maxTitan, titanData);
    var totalTitanAP = titanHourlInfo['ap'].multiply(hoursPerDay)
    var totalTitanEXP = titanHourlInfo['exp'].multiply(hoursPerDay)
    var totalTitanPP = titanHourlInfo['pp'].multiply(hoursPerDay)
    var totalTitanQP = titanHourlInfo['qp'].multiply(hoursPerDay)
    var titanList = getTitanList();




    /* Ygg Info */
    var firstHarvest = Number(v('firstHarvestPerk').getValue())
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

    
    var apYggdrasil = fruitOfArbitrariness.fruitYield(fruitYieldData).divide(bd(24)).multiply(hoursPerDay)
    var expYggdrasil = fruitOfKnowledge.fruitYield(fruitYieldData).divide(bd(24)).multiply(hoursPerDay)
    var ppYggdrasil = fruitOfRage.fruitYield(fruitYieldData).divide(bd(24)).multiply(hoursPerDay)
    var qpYggdrasil = fruitOfQuirks.fruitYield(fruitYieldData).divide(bd(24)).multiply(hoursPerDay)
    



    // AP Stuff
    var apRebirth = getRebirthAP(totalAPBonus, hoursPerDay)
    var apMoneyPit = getMoneyPitAP(v('moneyPitGoldToss?1e'), v('moneyPitTossesPerDay-2'), totalAPBonus);
    var apDailySave = getDailySaveAP(totalAPBonus, hoursPerDay);
    var apDailySpin = getDailySpinAP(v('dailySpinTier-1'), totalAPBonus, hoursPerDay, c('includeValueOfConsumables^'), c('includeDailySpinJackpots^'));

    



    var totalAPPerDay = apDailySave.add(apDailySpin).add(APFromTower).add(apMoneyPit).add(apRebirth).add(apYggdrasil).add(APFromMajors).add(APFromMinors).add(totalTitanAP)
    var totalEXPPerDay = totalTitanEXP.add(expYggdrasil).add(EXPFromTower)
    var totalPPPerDay = totalTitanPP.add(ppYggdrasil).add(PPFromTower)
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
                <div className="pl-10">
                    {itemLine("Daily Save", apDailySave, fmt, "AP")}
                    {itemLine("Daily Spin", apDailySpin, fmt, "AP")}
                    {itemLine("ITOPOD Tower", APFromTower, fmt, "AP")}
                    {itemLine("Money Pit", apMoneyPit, fmt, "AP")}
                    {itemUL("Quests", {
                                        'major' : {'elt':APFromMajors, 'name':"Major", 'extra': (<> ({pn(APPerMajor, fmt)} AP per major)</>)},
                                        'minor': {'elt': APFromMinors, 'name': 'Minor', 'extra': (<> ({pn(APPerMinor, fmt)} AP per minor)</>)},
                                        },
                                        fmt, "AP")}
                    {itemLine("Rebirth", apRebirth, fmt, "AP")}
                    {itemLine("Titans", totalTitanAP, fmt, "AP", (<> - Up to {maxTitan[0].getFullName(maxTitan[1])}</>))}
                    {itemLine("Yggdrasil", apYggdrasil, fmt, "AP")}
                    <p className="mt-2 border-white border-t-2 border-solid">
                        <strong className="text-blue-500">Total:</strong> <span className="text-red-500">{pn(totalAPPerDay, fmt)}</span> <strong>AP</strong>
                    </p>
                </div>
            </ContentSubsection>
            <ContentSubsection title={"How many EXP do I get in " + pn(hoursPerDay, fmt) + " hours?"}>
                <div className="pl-10">
                    {itemLine("ITOPOD Tower", EXPFromTower, fmt, "EXP")}
                    {itemLine("Titans", totalTitanEXP, fmt, "EXP", (<> - Up to {maxTitan[0].getFullName(maxTitan[1])}</>))}
                    {itemLine("Yggdrasil", expYggdrasil, fmt, "EXP")}
                    <p className="mt-2 border-white border-t-2 border-solid">
                        <strong className="text-blue-500">Total:</strong> <span className="text-red-500">{pn(totalEXPPerDay, fmt)}</span> <strong>EXP</strong>
                    </p>
                </div>
            </ContentSubsection>
            <ContentSubsection title={"How many PP do I get in " + pn(hoursPerDay, fmt) + " hours?"}>
                <div className="pl-10">
                    {itemLine("ITOPOD Tower", PPFromTower.divide(bd(1000000)), fmt, "PP", (
                            <>
                                <ul className="ml-10">
                                    <li key="pppPerKill">{pn(pppPerKill, fmt)} ppp / kill on floor {pn(bd(itopodFloor), fmt)}</li>
                                    <li key="killsPerDay">{pn(killsPerDay, fmt)} kills /  {pn(hoursPerDay, fmt)} hours (assuming 1-hit per kill)</li>
                                </ul>
                            </>
                        ))}
                    {itemLine("Titans", totalTitanPP.divide(bd(1000000)), fmt, "PP", (<> - Up to {maxTitan[0].getFullName(maxTitan[1])}</>))}
                    {itemLine("Yggdrasil", ppYggdrasil.divide(bd(1000000)), fmt, "PP")}
                    <p className="mt-2 border-white border-t-2 border-solid">
                        <strong className="text-blue-500">Total:</strong> <span className="text-red-500">{pn(totalPPPerDay.divide(bd(1000000)), fmt)}</span> <strong>PP</strong>
                    </p>
                </div>
            </ContentSubsection>
            <ContentSubsection title={"How many QP do I get in " + pn(hoursPerDay, fmt) + " hours?"}>
                <div className="pl-10">
                    {itemUL("Quests", {
                                        'major' : {'elt':QPFromMajors, 'name':"Major", 'extra': (<> ({pn(QPPerMajor, fmt)} QP per major)</>)},
                                        'minor': {'elt': QPFromMinors, 'name': 'Minor', 'extra': (<> ({pn(QPPerMinor, fmt)} QP per minor)</>)},
                                        },
                                        fmt, "QP")}
                    {itemLine("Titans", totalTitanQP, fmt, "QP", (<> - Up to {maxTitan[0].getFullName(maxTitan[1])}</>))}
                    {itemLine("Yggdrasil", qpYggdrasil, fmt, "QP")}
                    <p className="mt-2 border-white border-t-2 border-solid">
                        <strong className="text-blue-500">Total:</strong> <span className="text-red-500">{pn(totalQPPerDay, fmt)}</span> <strong>QP</strong>
                    </p>
                </div>
            </ContentSubsection>
        </Content>
    )
}

