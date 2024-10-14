'use client'
import { Stat } from '@/assets/stat';
import { Yggdrasil } from '@/assets/yggdrasil';
import Content from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';
import { getNumberFormat } from '@/components/context';
import { StandardTable, StandardTableRowType } from '@/components/standardTable';
import { bd, isOne, pn } from '@/helpers/numbers';
import { parseNum, parseObj } from '@/helpers/parsers';
import { nguInfo } from '@/helpers/resourceInfo';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';


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
        return isOne(v(key))
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

    let order = [
        "fruit",
        "tier",
        "poop",
        "eatHarvest",
        "seedGain",
        "yield",
        "cost",
        "24Cost"
    ]

    let header = {
        "fruit": "Fruit",
        "tier": "Current Tier",
        "poop": "Poop?",
        "eatHarvest": "Eat / Harvest?",
        "seedGain" : "Seed Gain",
        "yield": "Yggdrasil Yield",
        "cost": "Upgrade Cost",
        "24Cost": "Cost to upgrade to tier 24",
    }
    var dataRows : StandardTableRowType = {}
    for(let index in fruits) {
        let fruit = fruits[index]
        dataRows[fruit.key] = {
            "fruit": fruit.name,
            "tier": fruit.tier,
            "poop": fruit.usePoop ? 'Yes' : 'No',
            "eatHarvest": fruit.eatFruit ? 'Eat' : 'Harvest',
            "seedGain" : <span className="text-green-500">{pn(fruit.seedYield(fruitYieldData.totalSeedGainBonus, fruitYieldData.firstHarvest, fruitYieldData.blueHeart), fmt)}</span>,
            "yield": <span className="text-red-500">{pn(fruit.fruitYield(fruitYieldData), fmt)}</span>,
            "cost": <span className="text-blue-500">{pn(fruit.upgradeCost(), fmt)}</span>,
            "24Cost": <span>{pn(fruit.totalUpgradeCost(), fmt)}</span>,
        }
    }

    return (
        <Content title="Yggdrasil" infoRequired={infoReq} extraRequired={extraReq}>
            <ContentSubsection title="What will you get if you harvest/eat fruits?">
                <StandardTable order={order} header={header} rows={dataRows} />
            </ContentSubsection>
        </Content>
    )
}
