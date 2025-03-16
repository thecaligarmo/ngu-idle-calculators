import { Card, CardRarity } from "@/assets/cards";
import { FruitOfMayo, Yggdrasil } from "@/assets/yggdrasil";
import { bd, toNum } from "@/helpers/numbers";
import { toObjectMap } from "@/helpers/objects";
import {
    getCardsPerDay,
    getCardsRecycled,
    getChonksPerDay,
    getChonksRecycled,
    getMayoFromFruit,
    getMayoFromInfusers,
    getMayoFromRecycling,
} from "@/helpers/pages/cards";
import { expectClose } from "../../../helpers/testHelperFunctions";

import Player from "@/assets/player";
import bigDecimal from "js-big-decimal";
import earlySad from "@/__data__/earlySad1";
import lateEvil from "@/__data__/lateEvil1";

const lateEvilPlayer = new Player(false, true);
lateEvilPlayer.importPlayerData(lateEvil);

const earlySadPlayer = new Player(false, true);
earlySadPlayer.importPlayerData(earlySad);

describe("Cards Page Helper", () => {
    describe("Cards Info", () => {
        const cases: [Player, any, any][] = [
             
            [
                lateEvilPlayer,
                {
                    cardChonkedEnergyNGU: 0,
                    cardChonkedMagicNGU: 0,
                    cardChonkedWandoos: 0,
                    cardChonkedAugments: 0,
                    cardChonkedTimeMachine: 0,
                    cardChonkedHack: 0,
                    cardChonkedWish: 0,
                    cardChonkedStat: 0,
                    cardChonkedAdventure: 0,
                    cardChonkedDropChance: 0,
                    cardChonkedGoldDrop: 0,
                    cardChonkedDaycare: 0,
                    cardChonkedPP: 0,
                    cardChonkedQP: 0,
                    cardRarityEnergyNGU: CardRarity.YEET,
                    cardRarityMagicNGU: CardRarity.YEET,
                    cardRarityWandoos: CardRarity.YEET,
                    cardRarityAugments: CardRarity.YEET,
                    cardRarityTimeMachine: CardRarity.YEET,
                    cardRarityHack: CardRarity.MEH,
                    cardRarityWish: CardRarity.MEH,
                    cardRarityStat: CardRarity.YEET,
                    cardRarityAdventure: CardRarity.MEH,
                    cardRarityDropChance: CardRarity.YEET,
                    cardRarityGoldDrop: CardRarity.YEET,
                    cardRarityDaycare: CardRarity.YEET,
                    cardRarityPP: CardRarity.YEET,
                    cardRarityQP: CardRarity.YEET,
                },
                { cards: 26.4, chonks: 0.366, recycleCard: 0, recycleChonk: 0 },
            ],
            [
                earlySadPlayer,
                {
                    cardChonkedEnergyNGU: 0,
                    cardChonkedMagicNGU: 0,
                    cardChonkedWandoos: 0,
                    cardChonkedAugments: 0,
                    cardChonkedTimeMachine: 0,
                    cardChonkedHack: 1,
                    cardChonkedWish: 1,
                    cardChonkedStat: 0,
                    cardChonkedAdventure: 1,
                    cardChonkedDropChance: 0,
                    cardChonkedGoldDrop: 0,
                    cardChonkedDaycare: 0,
                    cardChonkedPP: 0,
                    cardChonkedQP: 0,
                    cardRarityEnergyNGU: CardRarity.YEET,
                    cardRarityMagicNGU: CardRarity.YEET,
                    cardRarityWandoos: CardRarity.YEET,
                    cardRarityAugments: CardRarity.YEET,
                    cardRarityTimeMachine: CardRarity.YEET,
                    cardRarityHack: CardRarity.MEH,
                    cardRarityWish: CardRarity.MEH,
                    cardRarityStat: CardRarity.YEET,
                    cardRarityAdventure: CardRarity.MEH,
                    cardRarityDropChance: CardRarity.YEET,
                    cardRarityGoldDrop: CardRarity.YEET,
                    cardRarityDaycare: CardRarity.YEET,
                    cardRarityPP: CardRarity.YEET,
                    cardRarityQP: CardRarity.YEET,
                },
                { cards: 28.61, chonks: 0.42, recycleCard: 2.21, recycleChonk: 0.055 },
            ],
        ];
        test.each(cases)("Case %#", (player, extraInfo, expectedValue) => {
            const cardSpeed = player.get("totalCardSpeed");
            const seventiesSet = player.get("70sSet");
            const tagEffect = player.get("totalTagEffect").divide(bd(100));
            const cards: Card[] = player.get("cards");
            let numTagged = 0;
            cards.forEach((card) => {
                card.tier = player.get(card.tierKey());
                card.isTagged = player.get(card.taggedKey());
                card.isChonked = extraInfo[card.chonkKey()] == 1;
                card.minCastRarity = extraInfo[card.rarityKey()];
                if (card.isTagged) {
                    numTagged += 1;
                }
            });

            const cardTypeRarityRates: { [k: string]: bigDecimal } = toObjectMap(
                cards,
                (card) => card.key,
                (card) => card.rarityRate(seventiesSet, tagEffect, numTagged)
            );

            // sum H_i / cardsPerDay
            const recycleCard: bigDecimal = Object.values(cardTypeRarityRates).reduce(
                (rateSum: bigDecimal, rate: bigDecimal) => {
                    return rateSum.add(rate);
                },
                bd(0)
            );

            let cardsPerDay = getCardsPerDay(cardSpeed, recycleCard);
            let cardsRecycled = getCardsRecycled(recycleCard, cardsPerDay);
            if (!player.get("cardRecyclingCard")) {
                cardsPerDay = cardsPerDay.subtract(cardsRecycled);
                cardsRecycled = bd(0);
            }

            // J_i / cardSpeed
            const chonkTags: { [k: string]: bigDecimal } = toObjectMap(
                cards,
                (card) => card.key,
                (card) => (extraInfo[card.chonkKey()] ? card.tagFormula(tagEffect, numTagged) : bd(0))
            );
            const recycleChonk = Object.values(chonkTags).reduce((tagSum, tag) => {
                return tagSum.add(tag);
            }, bd(0));

            const chonksPerDay = getChonksPerDay(cardSpeed, recycleChonk, player.get("cardRecyclingCard"));
            const chonksRecycled = player.get("cardRecyclingCard")
                ? getChonksRecycled(recycleChonk, chonksPerDay)
                : bd(0);

            expectClose(cardsPerDay, expectedValue["cards"], null, 2);
            expectClose(chonksPerDay, expectedValue["chonks"], null, 2);
            expectClose(cardsRecycled, expectedValue["recycleCard"], null, 2);
            expectClose(chonksRecycled, expectedValue["recycleChonk"], null, 2);
        });
    });

    describe("Mayo Info", () => {
        const cases: [Player, { [k: string]: number }, { [k: string]: number }][] = [
            [
                lateEvilPlayer,
                {
                    includeFruit: 0,
                    includeLeftovers: 0,
                    poopAllLeftovers: 0,
                    infusersEveryXDays: 0,
                    twoFruitPerInfuser: 0,
                    recycleCard: 0,
                    recycleChonk: 0,
                },
                {
                    fruit: 0,
                    leftover: 0,
                    recycling: 0,
                    infusers: 0,
                    perDay: 26.4,
                },
            ], // fruit, leftover, recycling, infusers, perDay\
            [
                earlySadPlayer,
                {
                    includeFruit: 1,
                    includeLeftovers: 0,
                    poopAllLeftovers: 0,
                    infusersEveryXDays: 0,
                    twoFruitPerInfuser: 0,
                    cardsRecycled: 2.21, // From Above
                    chonksRecylced: 0.055,
                },
                {
                    fruit: 3.52,
                    leftover: 0,
                    recycling: 4.46,
                    infusers: 0,
                    perDay: 35.57,
                },
            ], // fruit, leftover, recycling, infusers, perDay
        ];
        test.each(cases)("Case %#", (player, extraInfo, expectedValue) => {
            const mayoSpeed = player.get("totalMayoSpeed");
            const cardsRecycled = bd(extraInfo["cardsRecycled"]);
            const chonksRecylced = bd(extraInfo["chonksRecylced"]);

            const fruitYieldData = {
                blueHeart: player.get("blueHeart"),
                mayoSpeed: mayoSpeed, // Mayo
            };

            const fruits: Yggdrasil[] = player.get("yggdrasil");
            fruits.forEach((fruit) => {
                if (fruit instanceof FruitOfMayo) {
                    fruit.tier = toNum(player.get(fruit.tierKey()));
                    fruit.usePoop = player.get(fruit.poopKey());
                    fruit.eatFruit = true;
                }
            });

            const [mayoFromFruit, mayoFromFruitLeftovers] =
                extraInfo["includeFruit"] == 1
                    ? getMayoFromFruit(
                          extraInfo["includeLeftovers"] == 1,
                          fruits,
                          fruitYieldData,
                          extraInfo["poopAllLeftovers"] == 1
                      )
                    : [bd(0), bd(0)];

            const mayoFromRecycling = player.get("cardRecyclingMayo")
                ? getMayoFromRecycling(cardsRecycled, chonksRecylced)
                : bd(0);
            const mayoFromInfusers =
                extraInfo["infusersEveryXDays"] < 1
                    ? bd(0)
                    : getMayoFromInfusers(
                          mayoSpeed,
                          bd(extraInfo["infusersEveryXDays"]),
                          extraInfo["twoFruitPerInfuser"] == 1,
                          mayoFromFruit,
                          mayoFromFruitLeftovers
                      );

            const mayoPerDay = bd(24)
                .multiply(mayoSpeed.divide(bd(100)))
                .add(mayoFromFruit)
                .add(mayoFromFruitLeftovers)
                .add(mayoFromRecycling)
                .add(mayoFromInfusers);

            expectClose(mayoFromFruit, expectedValue["fruit"]);
            expectClose(mayoFromFruitLeftovers, expectedValue["leftover"]);
            expectClose(mayoFromRecycling, expectedValue["recycling"]);
            expectClose(mayoFromInfusers, expectedValue["infusers"]);
            expectClose(mayoPerDay, expectedValue["perDay"]);
        });
    });
});
