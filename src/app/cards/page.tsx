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
import { cardExtraNameChanges, cardReqChonkers, cardReqFruit, cardReqNameChanges, getCardsPerDay, getChonksPerDay, getMayoFromFruit, getMayoFromInfusers, getMayoFromRecycling } from "@/helpers/pages/cards";
import { parseNum, parseObj } from "@/helpers/parsers";
import { createStatesForData, getRequiredStates } from "@/helpers/stateForData";
import { camelToTitle } from "@/helpers/strings";
import bigDecimal from "js-big-decimal";


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

    const playerStates = createStatesForData(extraRequired);

    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates, cardReqNameChanges)
    var extraReq = getRequiredStates(extraRequired, playerStates, cardExtraNameChanges)
    extraReq.unshift({'colWidths':['w-full', 'w-3/4', 'w-1/4']})

    if (!c('includeFruit^')) {
        extraReq = disableItem(extraReq, cardReqFruit);
        infoReq = disableItem(infoReq, cardReqFruit);
    }

    if (!c('cardChonkers^')) {
        extraReq = disableItem(extraReq, cardReqChonkers);
        infoReq = disableItem(infoReq, cardReqChonkers);
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
    let cardTypeRarityRates : bigDecimalObj = toObjectMap(
        cards,
        (card) => card.key,
        (card) => card.rarityRate(seventiesSet, tagEffect, numTagged)
    )

    // sum H_i / cardsPerDay
    let recycleCard = Object.values(cardTypeRarityRates).reduce((rateSum : bigDecimal, rate : bigDecimal) => {
        return rateSum.add(rate)
    }, bd(0))
    
    let cardsPerDay = getCardsPerDay(cardSpeed, recycleCard)
    let cardsRecycled = (recycleCard.subtract(bd(1.01)).multiply(cardsPerDay)).divide(bd(-10))
    if (!c('cardRecyclingCard^')) {
        cardsPerDay = cardsPerDay.subtract(cardsRecycled)
        cardsRecycled = bd(0)
    }






    // Chonk info
    // J_i / cardSpeed
    let chonkTags : bigDecimalObj = toObjectMap(
        cards,
        (card) => card.key,
        (card) => c(card.chonkKey()) ? card.tagFormula(tagEffect, numTagged) : bd(0)
    )
    let recycleChonk = Object.values(chonkTags).reduce((tagSum : bigDecimal, tag: bigDecimal) => {
        return tagSum.add(tag)
    }, bd(0))

    let chonksPerDay = getChonksPerDay(cardSpeed, recycleChonk, c('cardRecyclingCard^'))






    // Mayo

    // Grab Mayo generation from fruits
    let fruits : Yggdrasil[] = Object.values(j('yggdrasil'));
    fruits.forEach((fruit) => {
        if(fruit instanceof FruitOfMayo) {
            fruit.tier = Number(v(fruit.tierKey()).getValue())
            fruit.usePoop = c(fruit.poopKey())
            fruit.eatFruit = true
        }
    })

    let [mayoFromFruit, mayoFromFruitLeftovers] = c('includeFruit^')
        ? getMayoFromFruit(c('includeLeftovers^'), fruits, fruitYieldData, c('poopAllLeftovers^'))
        : [bd(0), bd(0)]
    
    let mayoFromRecycling = c('cardRecyclingMayo^') 
                ? getMayoFromRecycling(cardsPerDay, chonksPerDay, recycleCard, recycleChonk)
                : bd(0);
    let mayoFromInfusers = v('infusersEveryXDays-2').compareTo(bd(1)) < 0 
                    ? bd(0) 
                    : getMayoFromInfusers(mayoSpeed, v('infusersEveryXDays-2'), c('twoFruitPerInfuser^'), mayoFromFruit, mayoFromFruitLeftovers)
    let mayoPerDay = (bd(24).multiply(mayoSpeed.divide(bd(100))))
                        .add(mayoFromFruit)
                        .add(mayoFromFruitLeftovers)
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
    
    
    var perTypeOrder = [
        "key",
        "bpd",
        "cpd",
        "bpc",
        "mpd",
        "bpm"
    ]
    if(c('cardChonkers^')) {
        perTypeOrder = [
            "key",
            "bpd",
            "cpd",
            "bpc",
            "chpd",
            "bpch",
            "mpd",
            "bpm"
        ]
    }

    var perTypeHeader = {
        "key": "",
        "bpd": "Bonus per day",
        "cpd": "Cards per day",
        "bpc": "Bonus per card",
        "chpd": "Chonks per day",
        "bpch": "Bonus per chonk",
        "mpd": "Mayo needed per day",
        "bpm": "Bonus per mayo",
    }
    

    var perTypeRows : StandardTableRowType = {}
    for(let k of Object.keys(infoByType)) {
        perTypeRows[k] = {
            'key': camelToTitle(k),
            'cpd': <span className="text-red-500">{pn(infoByType[k]['cardsPerDay'], fmt)}</span>,
            'chpd': <span className="text-red-500">{pn(infoByType[k]['chonksPerDay'], fmt, 3)}</span>,
            'bpm': pn(infoByType[k]['bonusPerMayo%'], fmt, 3) + "%",
            'bpc': pn(infoByType[k]['bonusPerCard%'], fmt, 3) + "%",
            'bpch': pn(infoByType[k]['bonusPerChonk%'], fmt, 3) + "%",
            'bpd': <span className="text-green-500">{pn(infoByType[k]['bonusPerDay%'], fmt, 3) + "%"}</span>,
            'mpd': <span className="text-blue-500">{pn(infoByType[k]['mayoNeeded'], fmt, 2)}</span>,
        }
    }


    var dailyOrder = ["main", "amt", "extra"]
    var dailyHeader = {
        "main": "",
        "amt": "Amount",
        "extra": "Extra Info"
    }
    var dailyData : StandardTableRowType = {
        "mayo": {
            "main": "Mayo",
            "amt": <span className="text-red-500">{pn(mayoPerDay, fmt)}</span>,
            "extra": <ul key="mayoInfo">
                <li key="fruit"><strong>Fruit:</strong> {pn(mayoFromFruit, fmt)}</li>
                <li key="leftover"><strong>Fruit Leftovers:</strong> {pn(mayoFromFruitLeftovers, fmt)}</li>
                <li key="recycle"><strong>Card Recycling:</strong> {pn(mayoFromRecycling, fmt)}</li>
                <li key="infusers"><strong>Infusers:</strong> {pn(mayoFromInfusers, fmt)}</li>
            </ul>
        },
        "cards": {
            "main": "Cards",
            "amt": <span className="text-red-500">{pn(cardsPerDay, fmt)}</span>,
            "extra": <ul key="cardInfo">
                <li key="recycle"><strong>Card Recycling:</strong> {pn(cardsRecycled, fmt)}</li>
            </ul>
        }
    }
    if (c('cardChonkers^')) {
        dailyData['chonks'] = {
            "main": "Chonkers",
            "amt": <span className="text-red-500">{pn(chonksPerDay, fmt)}</span>,
            "extra": ""
        }
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
                    <StandardTable order={dailyOrder} header={dailyHeader} rows={dailyData}/>

                    <p>With the above stats, you will have <span className={mayoLeftover.compareTo(bd(0)) < 0 ? "text-red-500" : "text-green-500"}>{pn(mayoLeftover, fmt)}</span> Mayo spare at the end of each day.</p>
                    <p>The chance of getting a tagged card is: {pn(chanceOfTagged.multiply(bd(100)), fmt, 2)}%</p>
                    <p>The chance of getting a castable card is: {pn(chanceCastable.multiply(bd(100)), fmt, 2)}%</p>
                </>
            </ContentSubsection>
            <ContentSubsection title={"What do I get per card type?"}>
                <>
                    <StandardTable order={perTypeOrder} header={perTypeHeader} rows={perTypeRows} />
                    <p>Due to the nature of cards, the above are averages and are not guaranteed.</p>
                </>
            </ContentSubsection>
        </Content>
    )
}

