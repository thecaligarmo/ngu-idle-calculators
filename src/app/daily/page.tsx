'use client'

import { Challenge } from "@/assets/challenges";
import { AttackStat, Titan, Titans } from "@/assets/enemy";
import { GameMode } from "@/assets/mode";
import { Stat } from "@/assets/stat";
import { Wish } from "@/assets/wish";
import { FruitOfQuirks, FruitOfRage, FRUITS, Yggdrasil } from "@/assets/yggdrasil";
import Zone, { Zones } from "@/assets/zones";
import Content from "@/components/content";
import ContentSubsection from "@/components/contentSubsection";
import { getNumberFormat } from "@/components/context";
import { bd, pn} from "@/helpers/numbers";
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
        ['gameMode'],
        ['numRebirthChallenges', 'questMinorQP', 'questMajorQP', 'questIdleDivider', 'wishTitansHadBetterRewards'],
        
        ['totalRespawnTime', 'totalPPBonus%', 'totalQuestRewardBonus%', 'totalQuestDropBonus%', 'totalYggdrasilYieldBonus%', 'totalPower'],
        [ 'blueHeart^', 'redLiquidBonus^','spoopySetBonus^', 'fadLandsSetBonus^', 'fibQuestRNG^', 'fasterQuesting^'],
    ]

    // Set extra required (not from playerData)
    var extraRequired : (string | [string, number])[][] = [
        [['hoursPerDay', 24], 'hoursOfflinePerDay'],
        ['itopodFloor', 'bluePill^'],
        ['beastButter^', 'includeMajorQuests^', 'idleMajorQuests^']
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
    

    var hoursPerDay = v('hoursPerDay')//.compareTo(bd(0)) == 0 ? bd(24) : v('hoursPerDay')
    


    /* ITOPOD */
    var itopodFloor = 0
    if (v('itopodFloor').compareTo(bd(0)) == 0) {
        var sadisticNEC = bd(0)
        var idleAttackModifier = (v('spoopySetBonus^').multiply(bd(0.3)).add(bd(1.2))).multiply(
            bd(1).add(sadisticNEC)
        )
        
        // optimal
        itopodFloor = Math.max(0, Math.floor(Math.log(Number(v('totalPower').divide(bd(765)).multiply(idleAttackModifier).getValue())) / Math.log(1.05)))
    } else {
        itopodFloor = Number(v('itopodFloor').getValue())
    }
    var itopodZone = Zones.ITOPOD;
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
    var respawnTime = v('totalRespawnTime').round(2, bigDecimal.RoundingModes.FLOOR)
    var killsPerDay = bd(60 * 60).multiply(hoursPerDay).divide( respawnTime.add(idleAttackCooldown))



    /* Quest info */
    // TODO - Allow for manualling (major?), also, minor # looks wrong for QP w/ idle Majors
    var itemsPerQuest = bd(c('fibQuestRNG^') ? 50 : 54.5)
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

    var beastButterMultiplier = c('beastButter^')
        ? (c('blueHeart^') ? bd(2.2) : bd(2))
        : bd(1)

    var QPPerMajor = v('questMajorQP')
        .multiply(v('totalQuestRewardBonus%').divide(bd(100)))
        .multiply(beastButterMultiplier)
        .multiply(c('idleMajorQuests^') ? bd(1) : bd(2))
        .floor()

    var QPFromMajors = QPPerMajor.multiply(majorsPerDay).floor()
    var QPFromMinors = QPPerMinor.multiply(minorsPerDay).floor()







    /* Titan Info */
    // TODO - Add Titan QP
    var rbChallenges : bigDecimal = v('numRebirthChallenges')

    // Need to look up current tier for Titan
    var hourlyTitanPP : bigDecimal = bd(0);
    var hourlyTitanQP : bigDecimal = bd(0);
    // var titanKills = j('titanKills');
    var wishLevel : number = Number(v('wishTitansHadBetterRewards').getValue());
    var playerAttack = new AttackStat(1, v('totalPower'), v('totalToughness'), v('totalRegen'), v('totalHealth'))

    var maxTitan : [Titan, number] = [Titans.GORDON_RAMSEY, 1]
    if(optMaxTitan == 'current') {
        Object.values(Titans).forEach((titan) => {
            if (titan.id < 13) {
                for(var i = 0; i < titan.versions; i++) {
                    if(titan.canAutoKill(playerAttack, i)) {
                        maxTitan = [titan, i]
                    }
                }
            }
        })
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
            var titanPP = titan.getPP(v('totalPPBonus%'))
            if(titan.id < maxTitan[0].id) {
                if(titan.versions == 4) {
                    if(wishLevel == 3) {
                        titanPP = titanPP.multiply(bd(1.3))
                    } else if (wishLevel == 2) {
                        titanPP = titanPP.multiply(bd(1.2))
                    } else if (wishLevel == 1) {
                        titanPP = titanPP.multiply(bd(1.1))
                    }
                }
            } else {
                if(maxTitan[1] == 3 && wishLevel == 3) {
                    titanPP = titanPP.multiply(bd(1.3))
                } else if (maxTitan[1] >= 2 && wishLevel >= 2) {
                    titanPP = titanPP.multiply(bd(1.2))
                } else if (maxTitan[1] >= 1 && wishLevel >= 1) {
                    titanPP = titanPP.multiply(bd(1.1))
                }
            }
            
            var titanRespawn = titan.getRespawnTime(rbChallenges)
            hourlyTitanPP = hourlyTitanPP.add(titanPP.divide(titanRespawn))
        }
    })
    var totalTitanPP = hourlyTitanPP.multiply(hoursPerDay)
    var totalTitanQP = hourlyTitanQP.multiply(hoursPerDay)

    var titanList = Object.values(Titans).map((titan) => {
        if (titan.id < 13) {
            var rows = []
            if (titan.versions != 4) {
                rows.push(<option key={titan.key} value={titan.id + '-' + 0}>
                    {titan.name}
                </option>)
            } else {
                for(var i = 0; i < titan.versions; i++) {
                    rows.push(<option key={titan.key + "v" + i} value={titan.id +'-' + i}>
                        {titan.name} v{i+1}
                    </option>)
                }
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
        ppBonus: v('totalPPBonus%'),
        qpRewardBonus: v('totalQuestRewardBonus%'),
    }

    
    var fruitOfRage : FruitOfRage = new FruitOfRage();
    var fruitOfQuirks : FruitOfQuirks = new FruitOfQuirks();
    var fruits : Yggdrasil[] = Object.values(j('yggdrasil'));
    for (var fruit of fruits) {
        if(fruit.key == FRUITS.RAGE.key) {
            fruitOfRage = fruit
        } else if(fruit.key == FRUITS.QUIRKS.key) {
            fruitOfQuirks = fruit
        }
    }


    // @ts-ignore
    var fruitPPYield = fruitOfRage.fruitYield(fruitYieldData).divide(bd(24)).multiply(hoursPerDay)
    var fruitQPYield = fruitOfQuirks.fruitYield(fruitYieldData).divide(bd(24)).multiply(hoursPerDay)

    




    var totalPPPerDay = totalTitanPP.add(fruitPPYield).add(killsPerDay.multiply(pppPerKill))
    var totalQPPerDay = QPFromMajors.add(QPFromMinors).add(fruitQPYield)

    return (
        <Content title="Daily Gains" infoRequired={infoReq} extraRequired={extraReq}>
            <ContentSubsection title={"How many PP do I get in " + pn(hoursPerDay, fmt) + " hours?"}>
                <strong className="text-green-500">Titans:</strong> <span className="text-red-500">{pn(totalTitanPP.divide(bd(1000000)), fmt, 2)}</span> <strong>PP per {pn(hoursPerDay, fmt)} hours</strong>
                - Max Titan:<select
                    className="ml-2 text-black"
                    onChange={(e) =>{
                        setOptMaxTitan(e.target.value)
                    }}
                    value={optMaxTitan}
                >
                    <option key="current" value="current">Highest Titan by Autokill</option>
                    {titanList}
                </select>
                <br />
                <strong className="text-green-500">Yggdrasil:</strong> <span className="text-red-500">{pn(fruitPPYield.divide(bd(1000000)), fmt, 2)}</span> <strong>PP per {pn(hoursPerDay, fmt)} hours</strong><br />
                <strong className="text-green-500">Tower:</strong> <span className="text-red-500">{pn(killsPerDay.multiply(pppPerKill).divide(bd(1000000)), fmt, 2)}</span> <strong>PP per {pn(hoursPerDay, fmt)} hours</strong>
                <ul className="ml-10">
                    <li key="pppPerKill">{pn(pppPerKill, fmt)} ppp / kill on floor {pn(bd(itopodFloor), fmt)}</li>
                    <li key="killsPerDay">{pn(killsPerDay, fmt)} kills /  {pn(hoursPerDay, fmt)} hours (assuming 1-hit per kill)</li>
                </ul>
                <p className="mt-2 border-white border-t-2 border-solid">
                    <strong>Total:</strong> <span className="text-red-500">{pn(totalPPPerDay.divide(bd(1000000)), fmt)}</span> <strong>PP per {pn(hoursPerDay, fmt)} hours</strong>
                </p>
                
            </ContentSubsection>
            <ContentSubsection title={"How many QP do I get in " + pn(hoursPerDay, fmt) + " hours?"}>
                <strong className="text-green-500">Titans:</strong> <span className="text-red-500">{pn(totalTitanQP, fmt, 2)}</span> <strong>QP per {pn(hoursPerDay, fmt)} hours</strong>
                - Max Titan:<select
                    className="ml-2 text-black"
                    onChange={(e) =>{
                        setOptMaxTitan(e.target.value)
                    }}
                    value={optMaxTitan}
                >
                    <option key="current" value="current">Highest Titan by Autokill</option>
                    {titanList}
                </select> <i>(Not yet added)</i>
                <br />
                <strong className="text-green-500">Yggdrasil:</strong> <span className="text-red-500">{pn(fruitQPYield, fmt, 2)}</span> <strong>QP per {pn(hoursPerDay, fmt)} hours</strong><br />                
                <strong className="text-green-500">Quests:</strong> <ul className="ml-10">
                    <li key="major"><strong>Major:</strong> <span className="text-red-500">{pn(QPFromMajors, fmt, 2)}</span> QP ({pn(QPPerMajor, fmt)} QP per major)</li>
                    <li key="minor"><strong>Minor:</strong> <span className="text-red-500">{pn(QPFromMinors, fmt, 2)}</span> QP ({pn(QPPerMinor, fmt)} QP per major)</li>
                    </ul>
                <p className="mt-2 border-white border-t-2 border-solid">
                    <strong>Total:</strong> <span className="text-red-500">{pn(totalQPPerDay, fmt)}</span> <strong>QP per {pn(hoursPerDay, fmt)} hours</strong>
                </p>
            </ContentSubsection>
        </Content>
    )
}

