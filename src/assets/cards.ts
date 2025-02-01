import bigDecimal from "js-big-decimal";
import { GameMode } from "./mode";
import Resource, { ResourceContainer, prop } from "./resource";
import { Stat } from "./stat";
import { bd } from "@/helpers/numbers";

export const CardKeys : {[key: string]: string} = {
    ENERGY_NGU : 'cardEnergyNGU',
    MAGIC_NGU: 'cardMagicNGU',
    WANDOOS: 'cardWandoos',
    AUGMENT : 'cardAugments',
    TIME_MACHINE : 'cardTimeMachine',
    HACK_SPEED : 'cardHack',
    WISH_SPEED : 'cardWish',
    STAT : 'cardStat',
    ADVENTURE : 'cardAdventure',
    DROP_CHANCE : 'cardDropChance',
    GOLD_DROP : 'cardGoldDrop',
    DAYCARE_SPEED : 'cardDaycare',
    PP: 'cardPP',
    QP: 'cardQP',
} as const satisfies {[key: string]: string};

export const CardRarity : {[key: string]: number} = {
    NONE: 0,
    CRAPPY: 1,
    BAD: 2,
    MEH: 3,
    OKAY: 4,
    GOOD: 5,
    GREAT: 6,
    HOT_DAMN: 7,
    CHONKER: 8,
} as const satisfies {[key: string]: number};

export const CardRarityText : {[key: number]: string} = {
    0: 'Yeet',
    1: 'Crappy',
    2: 'Bad',
    3: 'Meh',
    4: 'Okay',
    5: 'Good',
    6: 'Great',
    7: 'Hot Damn',
    8: 'Chonker',
} as const satisfies {[key: number]: string};

export function cardRarityRange(rarity: number, seventiesSet : boolean = false) : [number, number] {
    switch(rarity) {
        case CardRarity.CRAPPY:
            return [seventiesSet ? 0.85 : 0.8, 0.9]
        case CardRarity.BAD:
            return [0.9, 1]
        case CardRarity.MEH:
            return [1, 1.08]
        case CardRarity.OKAY:
            return [1.08, 1.14]
        case CardRarity.GOOD:
            return [1.14, 1.17]
        case CardRarity.GREAT:
            return [1.17, 1.19]
        case CardRarity.HOT_DAMN:
            return [1.19, 1.2]
        case CardRarity.CHONKER:
            return [1.2, 1.2]
    }
    return [1.2, 1.2]
}

export class Card extends Resource {
    tier: number
    isTagged: boolean
    isChonked: boolean
    minCastRarity: number
    constants: number[]
    constructor(id: number, key: string, name: string, props: prop, constants : number[]) {
        super(id, key, name, GameMode.ALL, 0, props)
        this.tier = 1
        this.isTagged = false
        this.isChonked = false
        this.minCastRarity = 0
        this.constants = constants
    }
    //eslint-disable-next-line
    importStats(data : any) {
        this.setLevel(data[this.id])
    }
    updateStats() {
        for (const prop of this.statnames) {
            this[prop] = this.base[prop] * this.level
        }
    }
    
    tierKey() : string {
        return this.key.replace('card', 'cardTier')
    }

    taggedKey() : string {
        return this.key.replace('card', 'cardTagged')
    }

    rarityKey() : string {
        return this.key.replace('card', 'cardRarity')
    }

    chonkKey() : string {
        return this.key.replace('card', 'cardChonked')
    }

    tagFormula(tagEffect: bigDecimal, numberOfTags: number) : bigDecimal{
        // (1 - SUM(n_i) * tagEffect)/14 + tagEffect * n_i
        let baseEffect = (bd(1).subtract(bd(numberOfTags).multiply(tagEffect))).divide(bd(14))
        if(this.isTagged) {
            baseEffect = baseEffect.add(tagEffect)
        }
        return baseEffect
    }

    rarityRate(seventiesSet : boolean, tagEffect: bigDecimal, numberOfTags: number) : bigDecimal {
        const maxRate = cardRarityRange(CardRarity.CHONKER)[0]
        const minRate = cardRarityRange(CardRarity.CRAPPY, seventiesSet)[0]
        const setRate = cardRarityRange(this.minCastRarity, seventiesSet)[0]
        const rate = bd(
            (maxRate - setRate) / (maxRate - minRate)
        )
        return rate.multiply(this.tagFormula(tagEffect, numberOfTags))
    }

    bonusPerMayo(rarity : number, pen: boolean) : bigDecimal{
        // (con1 + con2 * rarity * tier^TierCon1 * tierCon2^tier) * Mayo / 100
        const tier = pen ? this.tier + 2 : this.tier
        return (
                bd(this.constants[0])
                .add(
                    bd(this.constants[1])
                        .multiply(bd(rarity))
                        .multiply(bd(tier**this.constants[2]))
                        .multiply(bd(this.constants[3]**tier))
                )
            ).divide(bd(100), 20)
        
    }
}


export const CARDLIST = [
    new Card(1, CardKeys.ENERGY_NGU, 'Energy NGU Card', [[Stat.ENERGY_NGU_SPEED, 1],], [0.03, 0.1, 1.2, 1.03]),
    new Card(2, CardKeys.MAGIC_NGU, 'Magic NGU Card', [[Stat.MAGIC_NGU_SPEED, 1],], [0.02, 0.1, 0.8, 1.08]),
    new Card(3, CardKeys.WANDOOS, 'Wandoos Card', [[Stat.ENERGY_WANDOOS_SPEED, 1],[Stat.MAGIC_WANDOOS_SPEED, 1]], [0.02, 0.1, 0.8, 1.1]),
    new Card(4, CardKeys.AUGMENT, 'Augment Card', [[Stat.AUGMENT_SPEED, 1],], [0.02, 0.1, 0.8, 1.1]),
    
    new Card(5, CardKeys.TIME_MACHINE, 'Time Machine Speed Card', [[Stat.TIME_MACHINE, 1],], [0.02, 0.1, 0.8, 1.15]),
    new Card(6, CardKeys.HACK_SPEED, 'Hack Speed Card', [[Stat.HACK_SPEED, 1],], [0.02, 0.1, 0.4, 1.05]),
    new Card(7, CardKeys.WISH_SPEED, 'Wish Speed Card', [[Stat.WISH_SPEED, 1],], [0.02, 0.1, 0.5, 1.05]),
    new Card(8, CardKeys.STAT, 'Stat Card', [[Stat.ATTACK, 1],[ Stat.DEFENSE, 1]], [5, 1, 1.5, 2]),

    new Card(9, CardKeys.ADVENTURE, 'Adventure Card', [[Stat.POWER, 1], [Stat.TOUGHNESS, 1], [Stat.HEALTH, 1], [Stat.REGEN, 1]], [0.05, 0.1, 0.4, 1.07]),
    new Card(10, CardKeys.DROP_CHANCE, 'Drop Chance Card', [[Stat.DROP_CHANCE, 1],], [0.02, 0.1, 1, 1.15]),
    new Card(11, CardKeys.GOLD_DROP, 'Gold Drop Card', [[Stat.GOLD_DROP, 1],], [0.1, 0.5, 0.8, 1.15]),
    new Card(12, CardKeys.DAYCARE_SPEED, 'Daycare Speed Card', [[Stat.DAYCARE_SPEED, 1],], [0.005, 0.002, 0.4, 1.04]),

    new Card(13, CardKeys.PP, 'PP Card', [[Stat.PP, 1],], [0.01, 0.02, 0.6, 1.11]),
    new Card(14, CardKeys.QP, 'QP Card', [[Stat.QUEST_REWARD, 1],], [0.01, 0.02, 0.6, 1.08]),
]

export const CARDS = new ResourceContainer(CARDLIST);
