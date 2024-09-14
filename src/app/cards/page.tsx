'use client'

import { Card, CardRarity, cardRarityRange } from "@/assets/cards";
import { FruitOfMayo, Yggdrasil } from "@/assets/yggdrasil";
import Content from "@/components/content";
import ContentSubsection from "@/components/contentSubsection";
import { getNumberFormat } from "@/components/context";
import { disableItem } from "@/components/dataListColumns";
import { StandardTable, StandardTableRowType } from "@/components/standardTable";
import { bd, pn } from "@/helpers/numbers";
import { bigDecimalObj, toObjectMap } from "@/helpers/objects";
import { parseNum, parseObj } from "@/helpers/parsers";
import { createStatesForData, getRequiredStates } from "@/helpers/stateForData";
import { camelToTitle } from "@/helpers/strings";
import bigDecimal from "js-big-decimal";
import { ReactNode, useState } from "react";

function tableOfElts(elts : bigDecimalObj, fmt : string) {
    var headerRow : ReactNode[] = []
    for (let e in elts) {
        headerRow.push((<th>{camelToTitle(e)}</th>))
    }
    var row : ReactNode[] = []
    for (let f of Object.values(elts)) {
        row.push((<td>{pn(f, fmt, 6)}</td>))
    }
    return (
        <table>
            <thead>
                <tr>{headerRow}</tr>
            </thead>
            <tbody>
                <tr>{row}</tr>
            </tbody>
        </table>
    )

}


export default function Page() {
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired = [
        [
            'cardChonkers^',
            'totalMayoSpeed%',
            'totalCardSpeed%',
            'totalTagEffect%',
            '70sSet^',
            'blueHeart^',
        ],
        [
            'cardTierEnergyNGU-2',
            'cardTierMagicNGU-2',
            'cardTierWandoos-2',
            'cardTierAugments-2',
            'cardTierTimeMachine-2',
            'cardTierHack-2',
            'cardTierWish-2',
            'cardTierStat-2',
            'cardTierAdventure-2',
            'cardTierDropChance-2',
            'cardTierGoldDrop-2',
            'cardTierDaycare-2',
            'cardTierPP-2',
            'cardTierQP-2',
        ],
        [
            'cardTaggedEnergyNGU^',
            'cardTaggedMagicNGU^',
            'cardTaggedWandoos^',
            'cardTaggedAugments^',
            'cardTaggedTimeMachine^',
            'cardTaggedHack^',
            'cardTaggedWish^',
            'cardTaggedStat^',
            'cardTaggedAdventure^',
            'cardTaggedDropChance^',
            'cardTaggedGoldDrop^',
            'cardTaggedDaycare^',
            'cardTaggedPP^',
            'cardTaggedQP^',
        ],
        [
            'cardRecyclingCard^',
            'cardRecyclingMayo^',
            'wimpyWish-1',
            'beefyWish-1',
            'chonkChonkier-1',
            'chonkLessNotChonkier-1'
        ],
        [
            'tierFruitOfAngryMayo-2',
            'tierFruitOfSadMayo-2',
            'tierFruitOfMoldyMayo-2',
            'tierFruitOfAyyMayo-2',
            'tierFruitOfCincoDeMayo-2',
            'tierFruitOfPrettyMayo-2',
        ], 
        [
            'poopFruitOfAngryMayo^',
            'poopFruitOfSadMayo^', 
            'poopFruitOfMoldyMayo^',
            'poopFruitOfAyyMayo^',
            'poopFruitOfCincoDeMayo^',
            'poopFruitOfPrettyMayo^',
        ]

    ]
    /*
    
    Tag effect

    yggdrasil - 6 fruits (tiers) - Poop

    */

    // Set extra required (not from playerData)
    var extraRequired : (string | [string, number])[][] = [
        [
            ['includeFruit^', 1],
            'blackPen^',
            'infusersEveryXDays-2',
            'twoFruitPerInfuser^',
            'includeLeftovers^',
            'poopAllLeftovers^',
        ],
        [
            'cardRarityEnergyNGU',
            'cardRarityMagicNGU',
            'cardRarityWandoos',
            'cardRarityAugments',
            'cardRarityTimeMachine',
            'cardRarityHack',
            'cardRarityWish',
            'cardRarityStat',
            'cardRarityAdventure',
            'cardRarityDropChance',
            'cardRarityGoldDrop',
            'cardRarityDaycare',
            'cardRarityPP',
            'cardRarityQP',
        ],
        [
            'cardChonkedEnergyNGU^',
            'cardChonkedMagicNGU^',
            'cardChonkedWandoos^',
            'cardChonkedAugments^',
            'cardChonkedTimeMachine^',
            'cardChonkedHack^',
            'cardChonkedWish^',
            'cardChonkedStat^',
            'cardChonkedAdventure^',
            'cardChonkedDropChance^',
            'cardChonkedGoldDrop^',
            'cardChonkedDaycare^',
            'cardChonkedPP^',
            'cardChonkedQP^',
        ],
    ]
    /*
    
    Include Left-overs?
     - Poop
    

    Infusers
    */
    const playerStates = createStatesForData(extraRequired);

    var cardExtraNameChanges = {
        'cardChonkedEnergyNGU^': 'Chonk Energy NGU',
        'cardChonkedMagicNGU^': 'Chonk Magic NGU',
        'cardChonkedWandoos^': 'Chonk Wandoos',
        'cardChonkedAugments^': 'Chonk Augments',
        'cardChonkedTimeMachine^': 'Chonk Time Machine',
        'cardChonkedHack^': 'Chonk Hack',
        'cardChonkedWish^': 'Chonk Wish',
        'cardChonkedStat^': 'Chonk Stat',
        'cardChonkedAdventure^': 'Chonk Adventure',
        'cardChonkedDropChance^': 'Chonk Drop Chance',
        'cardChonkedGoldDrop^': 'Chonk Gold Drop',
        'cardChonkedDaycare^': 'Chonk Daycare',
        'cardChonkedPP^': 'Chonk PP',
        'cardChonkedQP^': 'Chonk QP',
        'cardRarityEnergyNGU': 'Energy NGU Rarity',
        'cardRarityMagicNGU': 'Magic NGU Rarity',
        'cardRarityWandoos': 'Wandoos Rarity',
        'cardRarityAugments': 'Augments Rarity',
        'cardRarityTimeMachine': 'Time Machine Rarity',
        'cardRarityHack': 'Hack Rarity',
        'cardRarityWish': 'Wish Rarity',
        'cardRarityStat': 'Stat Rarity',
        'cardRarityAdventure': 'Adventure Rarity',
        'cardRarityDropChance': 'Drop Chance Rarity',
        'cardRarityGoldDrop': 'Gold Drop Rarity',
        'cardRarityDaycare': 'Daycare Rarity',
        'cardRarityPP': 'PP Rarity',
        'cardRarityQP': 'QP Rarity',
    }

    var cardReqNameChanges = {
            'cardTierEnergyNGU-2': 'Energy NGU Tier',
            'cardTierMagicNGU-2': 'Magic NGU Tier',
            'cardTierWandoos-2': 'Wandoos Tier',
            'cardTierAugments-2': 'Augments Tier',
            'cardTierTimeMachine-2': 'Time Machine Tier',
            'cardTierHack-2': 'Hack Tier',
            'cardTierWish-2': 'Wish Tier',
            'cardTierStat-2': 'Stat Tier',
            'cardTierAdventure-2': 'Adventure Tier',
            'cardTierDropChance-2': 'Drop Chance Tier',
            'cardTierGoldDrop-2': 'Gold Drop Tier',
            'cardTierDaycare-2': 'Daycare Tier',
            'cardTierPP-2': 'PP Tier',
            'cardTierQP-2': 'QP Tier',
            'cardTaggedEnergyNGU^': 'Energy NGU Tagged',
            'cardTaggedMagicNGU^': 'Magic NGU Tagged',
            'cardTaggedWandoos^': 'Wandoos Tagged',
            'cardTaggedAugments^': 'Augments Tagged',
            'cardTaggedTimeMachine^': 'Time Machine Tagged',
            'cardTaggedHack^': 'Hack Tagged',
            'cardTaggedWish^': 'Wish Tagged',
            'cardTaggedStat^': 'Stat Tagged',
            'cardTaggedAdventure^': 'Adventure Tagged',
            'cardTaggedDropChance^': 'Drop Chance Tagged',
            'cardTaggedGoldDrop^': 'Gold Drop Tagged',
            'cardTaggedDaycare^': 'Daycare Tagged',
            'cardTaggedPP^': 'PP Tagged',
            'cardTaggedQP^': 'QP Tagged',
    }

    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates, cardReqNameChanges)
    var extraReq = getRequiredStates(extraRequired, playerStates, cardExtraNameChanges)
    extraReq.unshift({'colWidths':['w-full', 'w-3/4', 'w-1/4']})

    if (!c('includeFruit^')) {
        extraReq = disableItem(extraReq, [
            'twoFruitPerInfuser^',
            'includeLeftovers^',
            'poopAllLeftovers^',
        ]);
        infoReq = disableItem(infoReq, [
            'tierFruitOfAngryMayo-2',
            'tierFruitOfSadMayo-2',
            'tierFruitOfMoldyMayo-2',
            'tierFruitOfAyyMayo-2',
            'tierFruitOfCincoDeMayo-2',
            'tierFruitOfPrettyMayo-2',
            'poopFruitOfAngryMayo^',
            'poopFruitOfSadMayo^', 
            'poopFruitOfMoldyMayo^',
            'poopFruitOfAyyMayo^',
            'poopFruitOfCincoDeMayo^',
            'poopFruitOfPrettyMayo^',
        ]);
    }

    if (!c('cardChonkers^')) {
        extraReq = disableItem(extraReq, [
            'cardChonkedEnergyNGU^',
            'cardChonkedMagicNGU^',
            'cardChonkedWandoos^',
            'cardChonkedAugments^',
            'cardChonkedTimeMachine^',
            'cardChonkedHack^',
            'cardChonkedWish^',
            'cardChonkedStat^',
            'cardChonkedAdventure^',
            'cardChonkedDropChance^',
            'cardChonkedGoldDrop^',
            'cardChonkedDaycare^',
            'cardChonkedPP^',
            'cardChonkedQP^',
        ]);
        infoReq = disableItem(infoReq, [
            'chonkChonkier-1',
            'chonkLessNotChonkier-1'
        ]);

    }

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

    

    

    let seventiesSet = c('70sSet^')
    let blackPen = c('blackPen^')
    let tagEffect =  v('totalTagEffect%').divide(bd(100))
    let cardSpeed = v('totalCardSpeed%')
    let mayoSpeed = v('totalMayoSpeed%')
    var fruitYieldData = {
        blueHeart: c('blueHeart^'),
        mayoSpeed: mayoSpeed, // Mayo
    }



    // Grab card info
    let cards : Card[] = Object.values(j('cards'));
    let numTagged = 0
    cards.forEach((card) => {
        card.tier = Number(v(card.tierKey()).getValue())
        card.isTagged = c(card.taggedKey())
        card.isChonked = c(card.chonkKey())
        card.minCastRarity = Number(v(card.rarityKey()).getValue())
        if (card.isTagged) {
            numTagged += 1
        }
    })


    // H_i / cardsPeraDay
    let cardTypeRarityRates : bigDecimalObj = toObjectMap(cards,
                                                        (card) => card.key,
                                                        (card) => card.rarityRate(seventiesSet, tagEffect, numTagged)
                                                    )

    // sum H_i / cardsPerDay
    let recycleCard = Object.values(cardTypeRarityRates).reduce((rateSum : bigDecimal, rate : bigDecimal) => {
        return rateSum.add(rate)
    }, bd(0))
    
    let cardsPerDay = bd(24).multiply(cardSpeed.divide(bd(100)))
        .divide(
            bd(1).add(
                (recycleCard.subtract(bd(1.01))).divide(bd(10))
            )
        )

    let cardsRecycled = (recycleCard.subtract(bd(1.01)).multiply(cardsPerDay)).divide(bd(-10))
    if (!c('cardRecyclingCard^')) {
        cardsPerDay = cardsPerDay.subtract(cardsRecycled)
        cardsRecycled = bd(0)
    }






    // Chonk info
    let chonksPerDay = cardSpeed.divide(bd(300))

    // J_i / cardSpeed
    let chonkTags : bigDecimalObj = toObjectMap(cards,
        (card) => card.key,
        (card) => c(card.chonkKey()) ? card.tagFormula(tagEffect, numTagged) : bd(0)
    )
    let recycleChonk = Object.values(chonkTags).reduce((tagSum : bigDecimal, tag: bigDecimal) => {
        return tagSum.add(tag)
    }, bd(0))

    if (c('cardRecyclingCard^')) {
        chonksPerDay = chonksPerDay.divide(
            bd(1).subtract(
                (
                    bd(1).subtract(recycleChonk)
                ).divide(bd(4))
            ) 
        )
    }






    // Mayo

    // Grab Mayo generation from fruits
    let mayoFromFruit = bd(0)
    let leftoverFromFruit = bd(0)
    let fruits : Yggdrasil[] = Object.values(j('yggdrasil'));
    fruits.forEach((fruit) => {
        if(fruit instanceof FruitOfMayo) {
            fruit.tier = Number(v(fruit.tierKey()).getValue())
            fruit.usePoop = c(fruit.poopKey())
            fruit.eatFruit = true
            mayoFromFruit = mayoFromFruit.add(fruit.fruitYield(fruitYieldData))
            leftoverFromFruit = leftoverFromFruit.add(fruit.leftovers(fruitYieldData, c('poopAllLeftovers^')))
        }
    })    
    let mayoFromFruitLeftovers = c('includeLeftovers^') ? leftoverFromFruit : bd(0)

    let mayoFromRecycling = c('cardRecyclingMayo^') 
                ? bd(0.2).multiply(
                    cardsPerDay.multiply(bd(1.01))
                        .subtract(recycleCard.multiply(cardsPerDay))
                        .add(chonksPerDay)
                        .subtract(recycleChonk.multiply(cardsPerDay))
                )
                : bd(0);
    let mayoFromInfusers = v('infusersEveryXDays-2').compareTo(bd(1)) < 0 
                    ? bd(0) 
                    : (
                        (bd(24 * 1.2).multiply(mayoSpeed.divide(bd(100))))
                        .add(
                            (mayoFromFruit.add(mayoFromFruitLeftovers))
                                .multiply(bd(1.2))
                                .multiply(
                                    bd(1).add(
                                        v('infusersEveryXDays-2').compareTo(bd(1)) != 0 && c('twoFruitPerInfuser^')
                                            ? bd(1)
                                            : bd(0)
                                    )
                                )
                        )
                    ).divide(v('infusersEveryXDays-2'))
    let mayoPerDay = (bd(24).multiply(mayoSpeed.divide(bd(100))))
                        .add(c('includeFruit^') ? mayoFromFruit : bd(0))
                        .add(c('includeFruit^') ? mayoFromFruitLeftovers : bd(0))
                        .add(mayoFromRecycling)
                        .add(mayoFromInfusers)



    // Grab min/max cord cost for normal cards and chonkers
    let minCardCost = bd(1).add(v('wimpyWish-1'));
    let maxCardCost = bd(9).add(v('beefyWish-1'));
    let averageCardCost = (minCardCost.add(maxCardCost)).divide(bd(2))

    let minChonkCardCost = bd(1).add(v('chonkLessNotChonkier-1'))
    let maxChonkCardCost = bd(9).add(v('chonkChonkier-1'))
    let averageChonkCardCost = bd(20).add((minChonkCardCost.add(maxChonkCardCost)).divide(bd(2)))


    // By Type Calculations
    let infoByType = toObjectMap(cards,
        (card) => card.key,
        (card) => {
            let cardsPDay = cardsPerDay.multiply(card.tagFormula(tagEffect, numTagged))
            let chonkPDay = chonksPerDay.multiply(card.tagFormula(tagEffect, numTagged))
            let bonusPerMayo = card.bonusPerMayo((cardRarityRange(card.minCastRarity, seventiesSet)[0] + 1.2)/2, blackPen)
            let bonusPerCard = bonusPerMayo.multiply(averageCardCost)
            let bonusPerChonk = card.bonusPerMayo(cardRarityRange(CardRarity.CHONKER)[0], blackPen)
                                    .multiply(averageChonkCardCost)

            let Hi = (cardTypeRarityRates[card.key]).multiply(cardsPerDay)
            let Ji = cardsPerDay.compareTo(bd(0)) != 0 ? cardsPDay.divide(cardsPerDay).multiply(chonksPerDay) : bd(0)
            let bonusPerDay = bonusPerCard.multiply(Hi)
                                    .add(
                                        bonusPerChonk
                                            .multiply(Ji)
                                            .multiply(c(card.chonkKey()) ? bd(1) : bd(0))
                                    )

            // Ki
            let mayoNeeded = Hi.multiply(averageCardCost).add(
                Ji.multiply(averageChonkCardCost).multiply(c(card.chonkKey()) ? bd(1) : bd(0))
            )

            return {
                'cardsPerDay': cardsPDay,
                'chonksPerDay': chonkPDay,
                'bonusPerMayo%': bonusPerMayo.multiply(bd(100)),
                'bonusPerCard%': bonusPerCard.multiply(bd(100)),
                'bonusPerChonk%': bonusPerChonk.multiply(bd(100)),
                'bonusPerDay%' : bonusPerDay.multiply(bd(100)),
                'mayoNeeded' : mayoNeeded,
                'Hi' : Hi,
            }
        }
    )

    // Total Mayo Needed
    let totalMayoNeeded = Object.keys(infoByType).reduce((mayoSum : bigDecimal, k : any) => {
        return mayoSum.add(infoByType[k]['mayoNeeded'])
    }, bd(0))
    let mayoLeftover = mayoPerDay.subtract(totalMayoNeeded)
    

    var perTypeHeader = [
        "",
        "Cards per day",
        "Bonus per mayo",
        "Bonus per card",
        "Bonus per day",
        "Mayo needed per day"
    ]
    if(c('cardChonkers^')) {
        perTypeHeader = [
            "",
            "Cards per day",
            "Chonks per day",
            "Bonus per mayo",
            "Bonus per card",
            "Bonus per chonk",
            "Bonus per day",
            "Mayo needed per day"
        ]
    }

    var perTypeData : StandardTableRowType = {}
    for(let k of Object.keys(infoByType)) {
        let tmpDict = {
            'key': camelToTitle(k),
            'cpd': <span className="text-red-500">{pn(infoByType[k]['cardsPerDay'], fmt)}</span>,
            'chpd': pn(infoByType[k]['chonksPerDay'], fmt, 3),
            'bpm': pn(infoByType[k]['bonusPerMayo%'], fmt, 3) + "%",
            'bpc': pn(infoByType[k]['bonusPerCard%'], fmt, 3) + "%",
            'bpch': pn(infoByType[k]['bonusPerChonk%'], fmt, 3) + "%",
            'bpd': <span className="text-green-500">{pn(infoByType[k]['bonusPerDay%'], fmt, 3) + "%"}</span>,
            'mn': <span className="text-blue-500">{pn(infoByType[k]['mayoNeeded'], fmt, 2)}</span>,
        }
        perTypeData[k] = [
            tmpDict['key'],
            tmpDict['cpd'],
            tmpDict['bpm'],
            tmpDict['bpc'],
            tmpDict['bpd'],
            tmpDict['mn'],
        ]
        if(c('cardChonkers^')) {
            perTypeData[k] = [
                tmpDict['key'],
                tmpDict['cpd'],
                tmpDict['chpd'],
                tmpDict['bpm'],
                tmpDict['bpc'],
                tmpDict['bpch'],
                tmpDict['bpd'],
                tmpDict['mn'],
            ]
        }
    }

    var dailyHeader = [
        "",
        "Amount",
        "Extra Info"
    ]
    var dailyData : StandardTableRowType = {
        "mayo": [
            "Mayo",
            <span className="text-red-500">{pn(mayoPerDay, fmt)}</span>,
            <ul>
                <li><strong>Fruit:</strong> {pn(mayoFromFruit, fmt)}</li>
                <li><strong>Fruit Leftovers:</strong> {pn(leftoverFromFruit, fmt)}</li>
                <li><strong>Card Recycling:</strong> {pn(mayoFromRecycling, fmt)}</li>
                <li><strong>Infusers:</strong> {pn(mayoFromInfusers, fmt)}</li>
            </ul>
        ],
        "cards": [
            "Cards",
            <span className="text-red-500">{pn(cardsPerDay, fmt)}</span>,
            <ul>
                <li><strong>Card Recycling:</strong> {pn(cardsRecycled, fmt)}</li>
            </ul>
        ]
    }
    if (c('cardChonkers^')) {
        dailyData['chonks'] = [
            "Chonkers",
            <span className="text-red-500">{pn(chonksPerDay, fmt)}</span>,
            ""
        ]
    }

    
    let chanceOfTagged = bd(numTagged).multiply(tagEffect).add(
        (bd(1).subtract(bd(numTagged).multiply(tagEffect))).multiply(bd(numTagged / 14))
    )
    let chanceCastable = (Object.keys(infoByType).reduce((cards : bigDecimal, k : any) => {
        return cards.add(infoByType[k]['Hi'])
    }, bd(0)))
    if (cardsPerDay.compareTo(bd(0)) > 0) {
        chanceCastable = chanceCastable.divide(cardsPerDay)
    }

    
    return (
        <Content title="Cards" infoRequired={infoReq} extraRequired={extraReq}>
            <ContentSubsection title={"How much mayo, cards, chonks will I get per day?"}>
                <>
                    <p>The below let's you know how much mayo, cards and chonks you will get per day.</p>
                    <StandardTable headers={dailyHeader} rows={dailyData} />

                    <p>With the above stats, you will have <span className={mayoLeftover.compareTo(bd(0)) < 0 ? "text-red-500" : "text-green-500"}>{pn(mayoLeftover, fmt)}</span> Mayo spare at the end of each day.</p>
                    <p>The chance of getting a tagged card is: {pn(chanceOfTagged.multiply(bd(100)), fmt, 2)}%</p>
                    <p>The chance of getting a castable card is: {pn(chanceCastable.multiply(bd(100)), fmt, 2)}%</p>
                </>
            </ContentSubsection>
            <ContentSubsection title={"What do I get per card type?"}>
                <>
                    <StandardTable rows={perTypeData} headers={perTypeHeader} />
                    <p>Due to the nature of cards, the above are averages and are not guaranteed.</p>
                </>
            </ContentSubsection>
        </Content>
    )
}

