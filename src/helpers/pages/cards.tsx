import bigDecimal from "js-big-decimal"
import { bd} from "../numbers"


export var cardReqNameChanges = {
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


export var cardExtraNameChanges = {
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


export var cardReqFruit = [
    'twoFruitPerInfuser^',
    'includeLeftovers^',
    'poopAllLeftovers^',
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
]

export var cardReqChonkers = [
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
    'chonkChonkier-1',
    'chonkLessNotChonkier-1'
]



export function getCardsPerDay(cardSpeed: bigDecimal, recycleCard:bigDecimal) :bigDecimal{
    return bd(24).multiply(cardSpeed.divide(bd(100)))
    .divide(
        bd(1).add(
            (recycleCard.subtract(bd(1.01))).divide(bd(10))
        )
    )
}

export function getChonksPerDay(cardSpeed: bigDecimal, recycleChonk:bigDecimal, withRecycleCard: boolean) : bigDecimal{
    let chonksPerDay = cardSpeed.divide(bd(300))
    if (withRecycleCard) {
        chonksPerDay = chonksPerDay.divide(
            bd(1).subtract(
                (
                    bd(1).subtract(recycleChonk)
                ).divide(bd(4))
            ) 
        )
    }
    return chonksPerDay
}



export function getMayoFromRecycling(cardsPerDay:bigDecimal, chonksPerDay:bigDecimal, recycleCard: bigDecimal, recycleChonk:bigDecimal) : bigDecimal{
    return bd(0.2).multiply(
            cardsPerDay.multiply(bd(1.01))
                .subtract(recycleCard.multiply(cardsPerDay))
                .add(chonksPerDay)
                .subtract(recycleChonk.multiply(cardsPerDay))
        )
}

export function getMayoFromInfusers(mayoSpeed : bigDecimal, numInfusers : bigDecimal, twoFruitPerInf : boolean, mayoFromFruit : bigDecimal, mayoFromFruitLeftovers : bigDecimal) : bigDecimal {
    return (
        (bd(24 * 1.2).multiply(mayoSpeed.divide(bd(100))))
        .add(
            (mayoFromFruit.add(mayoFromFruitLeftovers))
                .multiply(bd(1.2))
                .multiply(
                    bd(1).add(
                        numInfusers.compareTo(bd(1)) != 0 && twoFruitPerInf
                            ? bd(1)
                            : bd(0)
                    )
                )
        )
    ).divide(numInfusers)
}