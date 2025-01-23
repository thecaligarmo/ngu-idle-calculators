import { Stat } from "../assets/stat";
import { Yggdrasil } from "../assets/yggdrasil";
import Content, { requiredDataType } from "../components/Content";
import ContentSubsection from "../components/ContentSubsection";
import { getNumberFormat, getPlayer } from "../components/Context";
import { StandardTable, StandardTableRowType } from "../components/StandardTable";
import { pn, toNum } from "../helpers/numbers";
import { getPlayerDataInfo } from "../helpers/playerInfo";
import { nguInfo } from "../helpers/resourceInfo";


export default function YggPage() {
    const player = getPlayer();
    const fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired : requiredDataType = [
        ['totalSeedGainBonus', 'totalYggdrasilYieldBonus'],
        ['totalAPBonus', 'totalExpBonus', 'totalPPBonus', 'totalQuestRewardBonus', 'totalMayoSpeed'],
        ['blueHeart', 'firstHarvestPerk', 'fruitOfKnowledgeSucks', 'fruitOfKnowledgeSTILLSucks'],
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
            'eatFruitOfGold',
            'eatFruitOfPowerA',
            'eatFruitOfAdventure',
            'eatFruitOfKnowledge',
            'eatFruitOfPomegranate',
            'eatFruitOfLuck',
            'eatFruitOfPowerB',
            'eatFruitOfArbitrariness',
            'eatFruitOfNumbers',
            'eatFruitOfRage',
            'eatFruitOfMacguffinA',
            'eatFruitOfPowerD',
            'eatFruitOfWatermelon',
            'eatFruitOfMacguffinB',
            'eatFruitOfQuirks',
            'eatFruitOfAngryMayo',
            'eatFruitOfSadMayo',
            'eatFruitOfMoldyMayo',
            'eatFruitOfAyyMayo',
            'eatFruitOfCincoDeMayo',
            'eatFruitOfPrettyMayo',
        ],[
            'poopFruitOfGold',
            'poopFruitOfPowerA',
            'poopFruitOfAdventure',
            'poopFruitOfKnowledge',
            'poopFruitOfPomegranate',
            'poopFruitOfLuck',
            'poopFruitOfPowerB',
            'poopFruitOfArbitrariness',
            'poopFruitOfNumbers',
            'poopFruitOfRage',
            'poopFruitOfMacguffinA',
            'poopFruitOfPowerD',
            'poopFruitOfWatermelon',
            'poopFruitOfMacguffinB',
            'poopFruitOfQuirks',
            'poopFruitOfAngryMayo',
            'poopFruitOfSadMayo',
            'poopFruitOfMoldyMayo',
            'poopFruitOfAyyMayo',
            'poopFruitOfCincoDeMayo',
            'poopFruitOfPrettyMayo',
        ],
    ]
    // Set extra required (not from playerData)
    var extraRequired : requiredDataType = [[]]
    var goRequired : requiredDataType = [['goSeedGain', 'goYggdrasilYield'], ['goAP', 'goExperience'], []]
    
    // Get required data
    var infoReq = getPlayerDataInfo(infoRequired)
    var extraReq = getPlayerDataInfo(extraRequired)
    var goReq = getPlayerDataInfo(goRequired)


    var fruits : Yggdrasil[] = Object.values(player.get('yggdrasil'));
    fruits.forEach((fruit) => {
        fruit.tier = toNum(player.get(fruit.tierKey()))
        fruit.usePoop = player.get(fruit.poopKey())
        fruit.eatFruit = player.get(fruit.eatKey())
    })

    
    var nguYgg = nguInfo(player, Stat.YGGDRASIL_YIELD)
    var firstHarvest = toNum(player.get('firstHarvestPerk'))
    var blueHeart = player.get('blueHeart')

    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        nguYgg: nguYgg,
        totalSeedGainBonus: player.get('totalSeedGainBonus'), 
        yieldModifier: player.get('totalYggdrasilYieldBonus'),
        baseToughness: player.get('baseAdventureToughness'), // Adv
        expBonus: player.get('totalExpBonus'), // EXP
        fokSucksPerk: player.get('fruitOfKnowledgeSucks'), // EXP
        fokStillSucksPerk: player.get('fruitOfKnowledgeSTILLSucks'), // EXP
        apBonus: player.get('totalAPBonus'), // AP
        ppBonus: player.get('totalPPBonus'), // PP
        qpRewardBonus: player.get('totalQuestRewardBonus'), // Quest
        mayoSpeed: player.get('totalMayoSpeed'), // Mayo
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
        <Content title="Yggdrasil" infoRequired={infoReq} extraRequired={extraReq} goRequired={goReq}>
            <ContentSubsection title="What will you get if you harvest/eat fruits?">
                <StandardTable order={order} header={header} rows={dataRows} />
            </ContentSubsection>
        </Content>
    )
}
