import { FruitOfMayo, Yggdrasil } from "@/assets/yggdrasil";
import bigDecimal from "js-big-decimal";
import { bd, isOne } from "../numbers";

export const cardReqFruit = [
    "twoFruitPerInfuser",
    "includeLeftovers",
    "poopAllLeftovers",
    "tierFruitOfAngryMayo",
    "tierFruitOfSadMayo",
    "tierFruitOfMoldyMayo",
    "tierFruitOfAyyMayo",
    "tierFruitOfCincoDeMayo",
    "tierFruitOfPrettyMayo",
    "poopFruitOfAngryMayo",
    "poopFruitOfSadMayo",
    "poopFruitOfMoldyMayo",
    "poopFruitOfAyyMayo",
    "poopFruitOfCincoDeMayo",
    "poopFruitOfPrettyMayo",
];

export const cardReqChonkers = [
    "cardChonkedEnergyNGU",
    "cardChonkedMagicNGU",
    "cardChonkedWandoos",
    "cardChonkedAugments",
    "cardChonkedTimeMachine",
    "cardChonkedHack",
    "cardChonkedWish",
    "cardChonkedStat",
    "cardChonkedAdventure",
    "cardChonkedDropChance",
    "cardChonkedGoldDrop",
    "cardChonkedDaycare",
    "cardChonkedPP",
    "cardChonkedQP",
    "chonkChonkier",
    "chonkLessNotChonkier",
];

export function getCardsPerDay(cardSpeed: bigDecimal, recycleCard: bigDecimal): bigDecimal {
    return bd(24)
        .multiply(cardSpeed.divide(bd(100)))
        .divide(bd(1).add(recycleCard.subtract(bd(1.01)).divide(bd(10))));
}

export function getChonksPerDay(cardSpeed: bigDecimal, recycleChonk: bigDecimal, withRecycleCard: boolean): bigDecimal {
    let chonksPerDay = cardSpeed.divide(bd(300));
    if (withRecycleCard) {
        chonksPerDay = chonksPerDay.divide(bd(1).subtract(bd(1).subtract(recycleChonk).divide(bd(4))));
    }
    return chonksPerDay;
}

export function getCardsRecycled(recycleCard: bigDecimal, cardsPerDay: bigDecimal): bigDecimal {
    return recycleCard.subtract(bd(1.01)).multiply(cardsPerDay).divide(bd(-10));
}

export function getChonksRecycled(recycleChonk: bigDecimal, chonksPerDay: bigDecimal): bigDecimal {
    return recycleChonk.subtract(bd(1)).multiply(chonksPerDay).divide(bd(-4));
}

export function getMayoFromFruit(
    withLeftovers: boolean,
    fruits: Yggdrasil[],
    fruitYieldData: any, // eslint-disable-line
    poopLeftovers: boolean
): [bigDecimal, bigDecimal] {
    let mayoFromFruit = bd(0);
    let leftoverFromFruit = bd(0);
    fruits.forEach((fruit) => {
        if (fruit instanceof FruitOfMayo) {
            mayoFromFruit = mayoFromFruit.add(fruit.fruitYield(fruitYieldData));
            leftoverFromFruit = leftoverFromFruit.add(fruit.leftovers(fruitYieldData, poopLeftovers));
        }
    });
    const mayoFromFruitLeftovers = withLeftovers ? leftoverFromFruit : bd(0);
    return [mayoFromFruit, mayoFromFruitLeftovers];
}

export function getMayoFromRecycling(cardsRecycled: bigDecimal, chonksRecycled: bigDecimal): bigDecimal {
    return bd(0.2).multiply(
        cardsRecycled.multiply(bd(10)).add(chonksRecycled.multiply(bd(4)))
        // cardsPerDay.multiply(bd(1.01))
        //     .subtract(recycleCard.multiply(cardsPerDay))
        //     .add(chonksPerDay)
        //     .subtract(recycleChonk.multiply(cardsPerDay))
    );
    // =(Q32*0.2*(cardsRecyled * 10 + chonksRecyled * 4))
}

export function getMayoFromInfusers(
    mayoSpeed: bigDecimal,
    numInfusers: bigDecimal,
    twoFruitPerInf: boolean,
    mayoFromFruit: bigDecimal,
    mayoFromFruitLeftovers: bigDecimal
): bigDecimal {
    return bd(24 * 1.2)
        .multiply(mayoSpeed.divide(bd(100)))
        .add(
            mayoFromFruit
                .add(mayoFromFruitLeftovers)
                .multiply(bd(1.2))
                .multiply(bd(1).add(!isOne(numInfusers) && twoFruitPerInf ? bd(1) : bd(0)))
        )
        .divide(numInfusers);
}
