'use client'
import {Yggdrasil } from '@/assets/yggdrasil';
import { bd } from '@/helpers/numbers';
import { getNumberFormat } from '@/components/context';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import { nguInfo } from '@/helpers/resourceInfo';
import { Stat } from '@/assets/stat';
import { parseNum, parseObj } from '@/helpers/parsers';
import bigDecimal from 'js-big-decimal';
import Content from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';
import { fruitInfoRows } from '@/helpers/pages/ygg';


export default function Page() {
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired = [
        ['totalSeedGainBonus%', 'totalYggdrasilYieldBonus%', 'totalAPBonus%', 'totalExpBonus%', 'totalPPBonus%', 'totalQuestRewardBonus%', 'totalMayoSpeed%'],
        ['blueHeart^', 'firstHarvestPerk', 'fruitOfKnowledgeSucks^', 'fruitOfKnowledgeSTILLSucks^'],
        [],
        [
            'tierFruitOfGold-2',
            'tierFruitOfPowerA-2',
            'tierFruitOfAdventure-2',
            'tierFruitOfKnowledge-2',
            'tierFruitOfPomegranate-2',
            'tierFruitOfLuck-2',
            'tierFruitOfPowerB-2',
            'tierFruitOfArbitrariness-2',
            'tierFruitOfNumbers-2',
            'tierFruitOfRage-2',
            'tierFruitOfMacguffinA-2',
            'tierFruitOfPowerD-2',
            'tierFruitOfWatermelon-2',
            'tierFruitOfMacguffinB-2',
            'tierFruitOfQuirks-2',
            'tierFruitOfAngryMayo-2',
            'tierFruitOfSadMayo-2',
            'tierFruitOfMoldyMayo-2',
            'tierFruitOfAyyMayo-2',
            'tierFruitOfCincoDeMayo-2',
            'tierFruitOfPrettyMayo-2',
        ],
        [
            'eatFruitOfGold^',
            'eatFruitOfPowerA^',
            'eatFruitOfAdventure^',
            'eatFruitOfKnowledge^',
            'eatFruitOfPomegranate^',
            'eatFruitOfLuck^',
            'eatFruitOfPowerB^',
            'eatFruitOfArbitrariness^',
            'eatFruitOfNumbers^',
            'eatFruitOfRage^',
            'eatFruitOfMacguffinA^',
            'eatFruitOfPowerD^',
            'eatFruitOfWatermelon^',
            'eatFruitOfMacguffinB^',
            'eatFruitOfQuirks^',
            'eatFruitOfAngryMayo^',
            'eatFruitOfSadMayo^',
            'eatFruitOfMoldyMayo^',
            'eatFruitOfAyyMayo^',
            'eatFruitOfCincoDeMayo^',
            'eatFruitOfPrettyMayo^',
        ],[
            'poopFruitOfGold^',
            'poopFruitOfPowerA^',
            'poopFruitOfAdventure^',
            'poopFruitOfKnowledge^',
            'poopFruitOfPomegranate^',
            'poopFruitOfLuck^',
            'poopFruitOfPowerB^',
            'poopFruitOfArbitrariness^',
            'poopFruitOfNumbers^',
            'poopFruitOfRage^',
            'poopFruitOfMacguffinA^',
            'poopFruitOfPowerD^',
            'poopFruitOfWatermelon^',
            'poopFruitOfMacguffinB^',
            'poopFruitOfQuirks^',
            'poopFruitOfAngryMayo^',
            'poopFruitOfSadMayo^',
            'poopFruitOfMoldyMayo^',
            'poopFruitOfAyyMayo^',
            'poopFruitOfCincoDeMayo^',
            'poopFruitOfPrettyMayo^',
        ],
    ]
    // Set extra required (not from playerData)
    var extraRequired = [[]]
    const playerStates = createStatesForData(extraRequired);
    
    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates)
    var extraReq = getRequiredStates(extraRequired, playerStates)

    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        return parseNum(playerStates, key)
    }

    function j(key : string) : any{
        return parseObj(playerStates, key)
    }

    function c(key : string) : boolean {
        return v(key).compareTo(bd(1)) == 0
    }

    var fruits : Yggdrasil[] = Object.values(j('yggdrasil'));
    fruits.forEach((fruit) => {
        fruit.tier = Number(v(fruit.tierKey()).getValue())
        fruit.usePoop = c(fruit.poopKey())
        fruit.eatFruit = c(fruit.eatKey())
    })

    
    var nguYgg = nguInfo(playerStates, Stat.YGGDRASIL_YIELD)
    var firstHarvest = Number(v('firstHarvestPerk').getValue())
    var blueHeart = c('blueHeart^')

    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        nguYgg: nguYgg,
        totalSeedGainBonus: v('totalSeedGainBonus%'), 
        yieldModifier: v('totalYggdrasilYieldBonus%'),
        baseToughness: parseNum(playerStates, 'baseAdventureToughness'), // Adv
        expBonus: v('totalExpBonus%'), // EXP
        fokSucksPerk: c('fruitOfKnowledgeSucks^'), // EXP
        fokStillSucksPerk: c('fruitOfKnowledgeSTILLSucks^'), // EXP
        apBonus: v('totalAPBonus%'), // AP
        ppBonus: v('totalPPBonus%'), // PP
        qpRewardBonus: v('totalQuestRewardBonus%'), // Quest
        mayoSpeed: v('totalMayoSpeed%'), // Mayo
    }
    
    var fruitInfo = fruitInfoRows(fruits, fruitYieldData, fmt)

    return (
        <Content title="Yggdrasil" infoRequired={infoReq} extraRequired={extraReq}>
            <ContentSubsection title="What will you get if you harvest/eat fruits?">
                <table>
                    <thead>
                        <tr>
                            <th className="px-2">Fruit</th>
                            <th className="px-2">Current Tier</th>
                            <th className="px-2">Poop?</th>
                            <th className="px-2">Eat / Harvest?</th>
                            <th className="px-2">Seed Gain</th>
                            <th className="px-2">Yggdrasil Yield</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fruitInfo}
                    </tbody>
                </table>
            </ContentSubsection>
        </Content>
    )
}
