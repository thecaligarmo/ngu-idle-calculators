'use client'
import Container from '@/components/container';
import ContentSection from '@/components/contentSection';
import { FRUITS, Yggdrasil } from '@/assets/yggdrasil';
import { bd, pn } from '@/helpers/numbers';
import { getNumberFormat, getPlayerData } from '@/components/context';
import { totalSeedGainBonus, totalYggdrasilYieldBonus } from '@/helpers/calculators';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import { nguInfo } from '@/helpers/resourceInfo';
import { Stat } from '@/assets/stat';
import { parseNum, parseObj } from '@/helpers/parsers';
import bigDecimal from 'js-big-decimal';
import Content from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';

export default function Page() {
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired = [
        ['totalSeedGainBonus%', 'totalYggdrasilYieldBonus%', 'totalAPBonus%', 'totalExpBonus%', 'totalPPBonus%', 'totalQuestRewardBonus%', 'totalMayoSpeed%'], ['blueHeart^', 'firstHarvestPerk', 'fruitOfKnowledgeSucks^', 'fruitOfKnowledgeSTILLSucks^'],
        [
            'tierFruitOfGold',
            'tierFruitOfPowerA',
            'tierFruitOfAdventure',
            'tierFruitOfKnowledge',
            'tierFruitOfPomegranate',
            'tierFruitOfLuck',
            'tierFruitOfPowerB',
            'tierFruitOfArbitrariness',
            'tierFruitOfNumbers',
            'tierFruitOfRage',
            'tierFruitOfMacguffinA',
            'tierFruitOfPowerD',
            'tierFruitOfWatermelon',
            'tierFruitOfMacguffinB',
            'tierFruitOfQuirks',
            'tierFruitOfAngryMayo',
            'tierFruitOfSadMayo',
            'tierFruitOfMoldyMayo',
            'tierFruitOfAyyMayo',
            'tierFruitOfCincoDeMayo',
            'tierFruitOfPrettyMayo',
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
        ], []
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
        fruit.usePoop = c(fruit.poopKey())
        fruit.eatFruit = c(fruit.eatKey())
    })

    
    var nguYgg = nguInfo(playerStates, Stat.YGGDRASIL_YIELD)
    var firstHarvest = Number(v('firstHarvestPerk').getValue())
    var blueHeart = c('blueHeart^')

    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        yieldModifier: v('totalYggdrasilYieldBonus%'),
        noNGUYieldModifier: v('totalYggdrasilYieldBonus%').divide(nguYgg).multiply(bd(100)),
        baseToughness: parseNum(playerStates, 'baseAdventureToughness'), // Adv
        expBonus: v('totalExpBonus%'), // EXP
        fokSucksPerk: c('fruitOfKnowledgeSucks^'), // EXP
        fokStillSucksPerk: c('fruitOfKnowledgeSTILLSucks^'), // EXP
        apBonus: v('totalAPBonus%'), // AP
        ppBonus: v('totalPPBonus%'), // PP
        qpRewardBonus: v('totalQuestRewardBonus%'), // Quest
        mayoSpeed: v('totalMayoSpeed%'), // Mayo
    }
    
    var fruitInfo = fruits.map((fruit) => {
        return (
            <tr key={fruit.key}>
                <td>{fruit.name}</td>
                <td>{fruit.tier}</td>
                <td>{fruit.usePoop ? 'Yes' : 'No'}</td>
                <td>{fruit.eatFruit ? 'Eat' : 'Harvest'}</td>
                <td>{pn(fruit.seedYield(v('totalSeedGainBonus%'), firstHarvest, blueHeart), fmt)}</td>
                <td>{pn(fruit.fruitYield(fruitYieldData), fmt)}</td>
            </tr>
        )
    })
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
