import { expectClose, toDataObj } from '@/__tests__/testHelperFunctions';
import { Stat } from '@/assets/stat';
import { defaultPlayerData } from '@/helpers/defaultPlayerData';
import { bd } from '@/helpers/numbers';
import { Card, CardRarity, cardRarityRange } from "@/assets/cards";
import { bigDecimalObj, toObjectMap } from "@/helpers/objects";
import { cardExtraNameChanges, cardReqChonkers, cardReqFruit, cardReqNameChanges, getCardsPerDay, getChonksPerDay, getMayoFromFruit, getMayoFromInfusers, getMayoFromRecycling } from "@/helpers/pages/cards";
import { FruitOfMayo, Yggdrasil } from "@/assets/yggdrasil";

import lateEvil from '@/__tests__/__data__/lateEvil1';
import earlyEvil from '../../__data__/earlyEvil1';

var lateEvilData = toDataObj(lateEvil);



describe("Cards page - Cards Info", () => {
    var cases = [
        [lateEvilData, {
            'cardChonkedEnergyNGU^' :0,
            'cardChonkedMagicNGU^':0,
            'cardChonkedWandoos^':0,
            'cardChonkedAugments^':0,
            'cardChonkedTimeMachine^':0,
            'cardChonkedHack^':0,
            'cardChonkedWish^':0,
            'cardChonkedStat^':0,
            'cardChonkedAdventure^':0,
            'cardChonkedDropChance^':0,
            'cardChonkedGoldDrop^':0,
            'cardChonkedDaycare^':0,
            'cardChonkedPP^':0,
            'cardChonkedQP^':0,
            'cardRarityEnergyNGU': CardRarity.YEET,
            'cardRarityMagicNGU': CardRarity.YEET,
            'cardRarityWandoos': CardRarity.YEET,
            'cardRarityAugments': CardRarity.YEET,
            'cardRarityTimeMachine': CardRarity.YEET,
            'cardRarityHack': CardRarity.MEH,
            'cardRarityWish': CardRarity.MEH,
            'cardRarityStat': CardRarity.YEET,
            'cardRarityAdventure': CardRarity.MEH,
            'cardRarityDropChance': CardRarity.YEET,
            'cardRarityGoldDrop': CardRarity.YEET,
            'cardRarityDaycare': CardRarity.YEET,
            'cardRarityPP': CardRarity.YEET,
            'cardRarityQP': CardRarity.YEET,
        }, 26.4 ],
    ]
    test.each(cases)(
        "Cards Page - Cards Info - Case %#",
        (data, extraInfo, expectedValue) => {
            var cardSpeed = bd(data['totalCardSpeed%'][0]);
            var seventiesSet = data['70sSet^'][0] == 1;
            let tagEffect =  bd(data['totalTagEffect%'][0]).divide(bd(100))
            let cards = data['cards'][0];
            let numTagged = 0
            cards.forEach((card) => {
                card.tier = data[card.tierKey()][0]
                card.isTagged = data[card.taggedKey()][0] == 1
                card.isChonked = extraInfo[card.chonkKey()] == 1
                card.minCastRarity = extraInfo[card.rarityKey()]
                if (card.isTagged) {
                    numTagged += 1
                }
            })

            let cardTypeRarityRates = toObjectMap(
                cards,
                (card) => card.key,
                (card) => card.rarityRate(seventiesSet, tagEffect, numTagged)
            )
        
            // sum H_i / cardsPerDay
            let recycleCard = Object.values(cardTypeRarityRates).reduce((rateSum, rate) => {
                return rateSum.add(rate)
            }, bd(0))

            let cardsPerDay = getCardsPerDay(cardSpeed, recycleCard)
            let cardsRecycled = (recycleCard.subtract(bd(1.01)).multiply(cardsPerDay)).divide(bd(-10))
            if (data['cardRecyclingCard^'][0] == 0) {
                cardsPerDay = cardsPerDay.subtract(cardsRecycled)
                cardsRecycled = bd(0)
            }
            
            var ec = expectClose(cardsPerDay, expectedValue)
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})



describe("Cards page - Mayo Info", () => {
    var cases = [
        [lateEvilData, {
            'includeFruit^': 0,
            'includeLeftovers^': 0,
            'poopAllLeftovers^': 0,
            'infusersEveryXDays-2': 0,
            'twoFruitPerInfuser^': 0,
        }, {
            'fruit': 0,
            'leftover' : 0,
            'recycling': 0,
            'infusers': 0,
            'perDay': 26.4,
        } ], // fruit, leftover, recycling, infusers, perDay
    ]
    test.each(cases)(
        "Cards Page - Cards Info - Case %#",
        (data, extraInfo, expectedValue) => {

            let mayoSpeed = bd(data['totalMayoSpeed%'][0])

            var fruitYieldData = {
                blueHeart: data['blueHeart^'][0] == 1,
                mayoSpeed: mayoSpeed, // Mayo
            }

            let fruits = data['yggdrasil'][0];
            fruits.forEach((fruit) => {
                if(fruit instanceof FruitOfMayo) {
                    fruit.tier = data[fruit.tierKey()][0]
                    fruit.usePoop = data[fruit.poopKey()][0] == 1
                    fruit.eatFruit = true
                }
            })

            let [mayoFromFruit, mayoFromFruitLeftovers] = (extraInfo['includeFruit^'] == 1)
                ? getMayoFromFruit(data['includeLeftovers^'] == 0, fruits, fruitYieldData, extraInfo['poopAllLeftovers^'] == 1)
                : [bd(0), bd(0)]
            
            let mayoFromRecycling = data['cardRecyclingMayo^'][0] == 1
                ? getMayoFromRecycling(cardsPerDay, chonksPerDay, recycleCard, recycleChonk)
                : bd(0);
            let mayoFromInfusers = extraInfo['infusersEveryXDays-2'] < 1
                ? bd(0) 
                : getMayoFromInfusers(mayoSpeed, bd(extraInfo['infusersEveryXDays-2']), extraInfo['twoFruitPerInfuser^'] == 1, mayoFromFruit, mayoFromFruitLeftovers)

            let mayoPerDay = (bd(24).multiply(mayoSpeed.divide(bd(100))))
                    .add(mayoFromFruit)
                    .add(mayoFromFruitLeftovers)
                    .add(mayoFromRecycling)
                    .add(mayoFromInfusers)

            var ec = expectClose(mayoFromFruit, expectedValue['fruit'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(mayoFromFruitLeftovers, expectedValue['leftover'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(mayoFromRecycling, expectedValue['recycling'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(mayoFromInfusers, expectedValue['infusers'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(mayoPerDay, expectedValue['perDay'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})
