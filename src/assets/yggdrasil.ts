import { bd, toNum } from "@/helpers/numbers"
import bigDecimal from "js-big-decimal"


export type fruitYieldType = {
    apBonus: bigDecimal, // AP
    baseToughness: bigDecimal, // Adv
    blueHeart: boolean,
    expBonus: bigDecimal, // EXP
    firstHarvest: number,
    fokSucksPerk: boolean, // EXP
    fokStillSucksPerk: boolean, // EXP
    mayoSpeed: bigDecimal, // Mayo
    nguYgg: bigDecimal, 
    ppBonus: bigDecimal, // PP
    qpRewardBonus: bigDecimal, // Quest
    totalSeedGainBonus: bigDecimal, 
    yieldModifier: bigDecimal,
}

export class Yggdrasil {
    id: number
    key: string
    name: string
    tier: number
    baseSeedFactor: number
    alwaysHarvest: boolean
    usePoop: boolean
    eatFruit: boolean
    constructor(id: number, key: string, name: string) {
        this.id = id
        this.key = key
        this.name = name
        this.tier = 0
        this.baseSeedFactor = 1
        this.alwaysHarvest = false

        this.usePoop = false
        this.eatFruit = false
    }

    importStats(data : any) {
        // Different for Power B and Numbers
        this.tier = data.maxTier
        this.usePoop = data.usePoop
        this.eatFruit = data.eatFruit
    }
    
    seedYield(seedModifier: bigDecimal, firstHarvest : number = 0, blueHeart : boolean = false) : bigDecimal {
        return seedModifier.multiply(bd(
                Math.ceil(this.tier ** 1.5)
                * (1 + firstHarvest / 10.0)
                * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                * (!this.eatFruit || this.alwaysHarvest ? 2 : 1)
                * this.baseSeedFactor
                )
            ).divide(bd(100)).ceil()
    }

    fruitYield({} : {}) : bigDecimal {
        return bd(0)
    }

    // If our level is not the max level, then left over is how many extra times
    // We can run yggdrasil that day
    leftovers(data : {}, poopLeftovers: boolean) : bigDecimal {
        let maxTier = 24
        maxTier -= this.tier
        let leftover = bd(0)
        let tmpTier = this.tier
        let tmpPoop = this.usePoop
        while(maxTier > 0) {
            let nTier = (maxTier > this.tier) ? this.tier : maxTier
            this.tier = nTier
            this.usePoop = poopLeftovers
            leftover = leftover.add(this.fruitYield({...data, 'firstHarvest': 0}))
            maxTier -= this.tier
        }
        this.tier = tmpTier
        this.usePoop = tmpPoop
        return leftover
    }

    poopKey() : string {
        return 'poop' + this.key.charAt(0).toUpperCase() + this.key.slice(1)
    }

    tierKey() : string {
        return 'tier' + this.key.charAt(0).toUpperCase() + this.key.slice(1)
    }

    eatKey() : string {
        return 'eat' + this.key.charAt(0).toUpperCase() + this.key.slice(1)
    }

    upgradeCost() : number {
        if (this .tier > 23) {
            return 0
        }
        return this.upgradeToTierCost(this.tier + 1)
    }
    // @ts-ignore
    upgradeToTierCost(tier : number) : number {
        return 0
    }
    totalUpgradeCost() : number {
        let t : number = this.tier
        let cost : number = 0
        while (t <24) {
            t += 1
            cost += this.upgradeToTierCost(t)
        }
        return cost
    }
}

// TODO - Gold is given "per minute" but we should really multiply this by the "gross gold production" (from the Time Machine)
export class FruitOfGold extends Yggdrasil {
    constructor() {
        super(0, 'fruitOfGold', 'Fruit of Gold')
    }
    fruitYield({firstHarvest = 0, blueHeart = false} : {firstHarvest ?: number, blueHeart ?: boolean}) : bigDecimal {
        if(!this.eatFruit) {
            return bd(0)
        }
        return bd(
            Math.ceil(
                Math.ceil(this.tier ** 1.5)
                * 30
                * (1 + firstHarvest / 10)
                * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
            )
        )
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2
    }
}

export class FruitOfPowerA extends Yggdrasil {
    constructor() {
        super(1, 'fruitOfPowerA', 'Fruit of Power α')
    }
    fruitYield({yieldModifier, firstHarvest = 0, blueHeart = false} : {yieldModifier: bigDecimal, firstHarvest ?: number, blueHeart ?: boolean}) : bigDecimal {
        if(!this.eatFruit) {
            return bd(0)
        }
        return bd(
            Math.ceil(
                Math.ceil(this.tier ** 1.5)
                * (1 + firstHarvest / 10)
                * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                * toNum(yieldModifier.divide(bd(100)))
            ) ** 1.5
        )
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 10
    }
}

export class FruitOfAdventure extends Yggdrasil {
    constructor() {
        super(2, 'fruitOfAdventure', 'Fruit of Adventure')
    }
    // Only returns power/toughness. For HP and HP Regen, multiply by 3 and 0.03 respectively.
    fruitYield({yieldModifier, baseToughness, firstHarvest = 0, blueHeart = false} : {yieldModifier: bigDecimal, baseToughness : bigDecimal,  firstHarvest ?: number, blueHeart ?: boolean}) : bigDecimal {
        if(!this.eatFruit) {
            return bd(0)
        }
        return bd(
            Math.floor(
                Math.ceil(this.tier ** 1.5)
                * (1 + firstHarvest / 10)
                * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                * toNum(yieldModifier.divide(bd(100)))
                * (toNum(baseToughness) ** 0.2)
            )
        )
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 25
    }
}

export class FruitOfKnowledge extends Yggdrasil {
    constructor() {
        super(3, 'fruitOfKnowledge', 'Fruit of Knowledge')
    }
    fruitYield({yieldModifier, expBonus = bd(1), fokSucksPerk = 0, fokStillSucksPerk = 0, firstHarvest = 0, blueHeart = false} : {yieldModifier: bigDecimal, expBonus ?: bigDecimal, fokSucksPerk ?: number, fokStillSucksPerk ?: number,  firstHarvest ?: number, blueHeart ?: boolean}) : bigDecimal {
        if(!this.eatFruit) {
            return bd(0)
        }
        return bd(
            Math.floor(
            Math.ceil(
                Math.ceil(this.tier ** 1.5)
                * (1 + firstHarvest / 10)
                * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                * toNum(yieldModifier.divide(bd(100)))
                * 5
            )
            * (fokSucksPerk ? 3 : 1)
            * (fokStillSucksPerk ? 3 : 1)
            * toNum(expBonus.divide(bd(100)))
            )
        )
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 40
    }
}

export class FruitOfPomegranate extends Yggdrasil {
    constructor() {
        super(4, 'fruitOfPomegranate', 'Fruit of Pomegranate')
        this.baseSeedFactor = 5
        this.alwaysHarvest = true
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 60
    }
}

export class FruitOfLuck extends Yggdrasil {
    constructor() {
        super(5, 'fruitOfLuck', 'Fruit of Luck')
    }
    fruitYield({yieldModifier, firstHarvest = 0, blueHeart = false} : {yieldModifier: bigDecimal,  firstHarvest ?: number, blueHeart ?: boolean}) : bigDecimal {
        if(!this.eatFruit) {
            return bd(0)
        }
        return bd(
            Math.ceil(
                Math.ceil(this.tier ** 1.5)
                * (1 + firstHarvest / 10)
                * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                * toNum(yieldModifier.divide(bd(100)))
                * 0.7
            ) * 0.05
        )
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 100
    }
}

export class FruitOfPowerB extends Yggdrasil {
    level : number
    constructor() {
        super(6, 'fruitOfPowerB', 'Fruit of Power β')
        this.level = 0
    }
    importStats(data : any) {
        this.tier = data.maxTier
        this.usePoop = data.usePoop
        this.eatFruit = data.eatFruit
        this.level = data.totalPermStatBonus
    }
    levelToNum(level : number) : bigDecimal {
        return bd(level ** 2 * 0.05)
    }
    fruitYield({yieldModifier, firstHarvest = 0, blueHeart = false} : {yieldModifier: bigDecimal,  firstHarvest ?: number, blueHeart ?: boolean}) : bigDecimal {
        if(!this.eatFruit) {
            return bd(0)
        }
        
        var levelInc = Math.ceil(
                Math.ceil(this.tier ** 1.5)
                * (1 + firstHarvest / 10)
                * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                * toNum(yieldModifier.divide(bd(100)))
            )
        return this.levelToNum(this.level + levelInc).subtract(this.levelToNum(this.level))
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 150
    }
}

export class FruitOfArbitrariness extends Yggdrasil {
    constructor() {
        super(7, 'fruitOfArbitrariness', 'Fruit of Arbitrariness')
        this.baseSeedFactor = 3
    }
    fruitYield({apBonus = bd(1), firstHarvest = 0, blueHeart = false} : {apBonus ?: bigDecimal,  firstHarvest ?: number, blueHeart ?: boolean}) : bigDecimal {
        if(!this.eatFruit) {
            return bd(0)
        }
        return bd(
                Math.ceil(
                    Math.ceil(this.tier ** 1.5)
                    * (1 + firstHarvest / 10)
                    * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                    * 15
                )
            ).multiply(apBonus).divide(bd(100)).floor()
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 170
    }
}

export class FruitOfNumbers extends Yggdrasil {
    level: number
    constructor() {
        super(8, 'fruitOfNumbers', 'Fruit of Numbers')
        this.baseSeedFactor = 3
        this.level = 0
    }

    importStats(data : any) {
        this.tier = data.maxTier
        this.usePoop = data.usePoop
        this.eatFruit = data.eatFruit
        this.level = data.totalPermNumberBonus
    }

    levelToNum(level : number) : bigDecimal {
        return bd(level ** 1.3 * 0.05)
    }
    fruitYield({yieldModifier, firstHarvest = 0, blueHeart = false} : {yieldModifier: bigDecimal,  firstHarvest ?: number, blueHeart ?: boolean}) : bigDecimal {
        if(!this.eatFruit) {
            return bd(0)
        }

        var levelInc = Math.ceil(
            Math.ceil(this.tier ** 1.5)
            * (1 + firstHarvest / 10)
            * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
            * toNum(yieldModifier.divide(bd(100)))
            * this.baseSeedFactor
        )
        return this.levelToNum(this.level + levelInc).subtract(this.levelToNum(this.level))
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 200
    }
}

export class FruitOfRage extends Yggdrasil {
    constructor() {
        super(9, 'fruitOfRage', 'Fruit of Rage')
        this.baseSeedFactor = 5
    }
    fruitYield({yieldModifier, nguYgg, ppBonus = bd(1), firstHarvest = 0, blueHeart = false} : {yieldModifier:bigDecimal, nguYgg: bigDecimal, ppBonus ?: bigDecimal,  firstHarvest ?: number, blueHeart ?: boolean}) : bigDecimal {
        if(!this.eatFruit) {
            return bd(0)
        }
        var noNGUYieldModifier = yieldModifier.divide(nguYgg)
        return bd(
                Math.ceil(
                    Math.ceil(this.tier ** 1.5)
                    * (1 + firstHarvest / 10)
                    * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                    * toNum(noNGUYieldModifier)
                    * 60000
                    * toNum(ppBonus.divide(bd(100)))
                )
            )
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 2000
    }
}

export class FruitOfMacguffinA extends Yggdrasil {
    constructor() {
        super(10, 'fruitOfMacguffinA', 'Fruit of Macguffin α')
        this.baseSeedFactor = 6
    }
    fruitYield({yieldModifier, nguYgg, firstHarvest = 0, blueHeart = false} : {yieldModifier: bigDecimal,  nguYgg : bigDecimal, firstHarvest ?: number, blueHeart ?: boolean}) : bigDecimal {
        if(!this.eatFruit) {
            return bd(0)
        }
        var noNGUYieldModifier = yieldModifier.divide(nguYgg)
        return bd(
                Math.ceil(
                    Math.ceil(this.tier ** 1.5)
                    * (1 + firstHarvest / 10)
                    * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                    * toNum(noNGUYieldModifier)
                    * 0.5
                )
            )
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 15000
    }
}

export class FruitOfPowerD extends Yggdrasil {
    level: number
    constructor() {
        super(11, 'fruitOfPowerD', 'Fruit of Power δ')
        this.baseSeedFactor = 7
        this.level = 0
    }
    importStats(data : any) {
        this.tier = data.maxTier
        this.usePoop = data.usePoop
        this.eatFruit = data.eatFruit
        this.level = data.totalPermStatBonus2
    }
    levelToNum(level : number) : bigDecimal {
        return bd(level ** 1.3 * 0.0001)
    }
    fruitYield({yieldModifier, firstHarvest = 0, blueHeart = false} : {yieldModifier: bigDecimal,  firstHarvest ?: number, blueHeart ?: boolean}) : bigDecimal {
        if(!this.eatFruit) {
            return bd(0)
        }
        var levelInc = Math.ceil(
                    Math.ceil(this.tier ** 1.5)
                    * (1 + firstHarvest / 10)
                    * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                    * toNum(yieldModifier.divide(bd(100))) 
                    * this.baseSeedFactor
                )
        return this.levelToNum(this.level + levelInc).subtract(this.levelToNum(this.level))
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 30000
    }
}

export class FruitOfWatermelon extends Yggdrasil {
    constructor() {
        super(12, 'fruitOfWatermelon', 'Fruit of Watermelon')
        this.baseSeedFactor = 30
        this.alwaysHarvest = true
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 50000
    }
}

export class FruitOfMacguffinB extends Yggdrasil {
    constructor() {
        super(13, 'fruitOfMacguffinB', 'Fruit of Macguffin β')
        this.baseSeedFactor = 8
    }
    fruitYield({yieldModifier, nguYgg, firstHarvest = 0, blueHeart = false} : {yieldModifier: bigDecimal,  nguYgg : bigDecimal, firstHarvest ?: number, blueHeart ?: boolean}) : bigDecimal {
        if(!this.eatFruit) {
            return bd(0)
        }
        var noNGUYieldModifier = yieldModifier.divide(nguYgg)
        return bd(
                Math.ceil(
                    Math.ceil(this.tier ** 1.5)
                    * (1 + firstHarvest / 10)
                    * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                    * toNum(noNGUYieldModifier)
                    * 0.1
                )
            )
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 100000
    }
}

export class FruitOfQuirks extends Yggdrasil {
    constructor() {
        super(14, 'fruitOfQuirks', 'Fruit of Quirks')
        this.baseSeedFactor = 7
    }
    fruitYield({yieldModifier, nguYgg, qpRewardBonus = bd(1), firstHarvest = 0, blueHeart = false} : {yieldModifier : bigDecimal, nguYgg: bigDecimal, qpRewardBonus ?: bigDecimal, firstHarvest ?: number, blueHeart ?: boolean}) : bigDecimal {
        if(!this.eatFruit) {
            return bd(0)
        }
        var noNGUYieldModifier = yieldModifier.divide(nguYgg)
        return bd(
                Math.ceil(
                    this.tier
                    * (1 + firstHarvest / 10)
                    * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                    * toNum(noNGUYieldModifier)
                    * toNum(qpRewardBonus.divide(bd(100))) 
                    * 3
                )
            )
    }

    seedYield(seedModifier: bigDecimal, firstHarvest : number = 0, blueHeart : boolean = false) : bigDecimal {
        return seedModifier.multiply(bd(
                (this.eatFruit ? this.baseSeedFactor * this.tier: Math.ceil(this.tier ** 1.5) * 2 * this.baseSeedFactor)
                * (1 + firstHarvest / 10.0)
                * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                * (!this.eatFruit || this.alwaysHarvest ? 2 : 1)
                )
            ).divide(bd(100)).ceil()
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 25000
    }
}

export class FruitOfMayo extends Yggdrasil {
    constructor(id: number, key: string, name: string) {
        super(id, key, name)
        this.baseSeedFactor = 10
    }
    fruitYield({mayoSpeed = bd(1), blueHeart = false} : {mayoSpeed ?: bigDecimal, blueHeart ?: boolean}) : bigDecimal {
        if(!this.eatFruit) {
            return bd(0)
        }
        return bd(
                    this.tier ** 1.1
                    * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                    * toNum(mayoSpeed.divide(bd(100)))
                    * 0.025
            )
    }
    // I'm not sure about the formula for seed, but seems like:
    //      tier + floor( (tier - 1) / 3 )
    // 3 -> 3 ?
    // 4 -> 5 ?
    // 5 -> 6 ?
    // 6 -> 7 ?
    // 7 -> 9 ?
    // 8 -> 10 ?
    // 9 -> 11 ?
    // 10 -> 13 ?
    // 11 -> 14 ?
    // 12 -> 15 ?
    // 13 -> 17 ?
    // 14 -> 18 ?
    // 15 -> 19
    // 16 -> 21
    // 17 -> 22 ? 
    // 18 -> 23 ?
    // 19 -> 25
    // 20 -> 26
    seedYield(seedModifier: bigDecimal, firstHarvest : number = 0, blueHeart : boolean = false) : bigDecimal {
        return seedModifier.multiply(bd(
                (this.eatFruit ? this.baseSeedFactor * (this.tier + Math.floor((this.tier - 1) / 3)): Math.ceil(this.tier ** 1.5) * 2 * this.baseSeedFactor)
                * (1 + firstHarvest / 10.0)
                * (this.usePoop ? (blueHeart ? 1.65 : 1.5) : 1)
                * (!this.eatFruit || this.alwaysHarvest ? 2 : 1)
                )
            ).divide(bd(100)).ceil()
    }
    upgradeToTierCost(tier : number) : number {
        return tier ** 2 * 250000
    }
}


export const FRUITS : {[key: string]: Yggdrasil} = {
    GOLD: new FruitOfGold(), // 0
    POWER_A: new FruitOfPowerA(), // 1
    ADVENTURE: new FruitOfAdventure(), // 2
    KNOWLEDGE: new FruitOfKnowledge(), // 3
    POMEGRANATE: new FruitOfPomegranate(), // 4
    LUCK: new FruitOfLuck(), // 5
    POWER_B: new FruitOfPowerB(), // 6
    ARBITRARINESS: new FruitOfArbitrariness(), // 7
    NUMBERS: new FruitOfNumbers(), // 8
    RAGE: new FruitOfRage(), // 9
    MACGUFFIN_A: new FruitOfMacguffinA(),
    POWER_D: new FruitOfPowerD(),
    WATERMELON: new FruitOfWatermelon(),
    MACGUFFIN_B: new FruitOfMacguffinB(),
    QUIRKS: new FruitOfQuirks(),
    ANGRY_MAYO: new FruitOfMayo(15, 'fruitOfAngryMayo', 'Fruit of Angry Mayo'),
    SAD_MAYO: new FruitOfMayo(16, 'fruitOfSadMayo', 'Fruit of Sad Mayo'),
    MOLDY_MAYO: new FruitOfMayo(17, 'fruitOfMoldyMayo', 'Fruit of Moldy Mayo'),
    AYY_MAYO: new FruitOfMayo(18, 'fruitOfAyyMayo', 'Fruit of Ayy Mayo'),
    CINCO_DE_MAYO: new FruitOfMayo(19, 'fruitOfCincoDeMayo', 'Fruit of Cinco de Mayo'),
    PRETTY_MAYO: new FruitOfMayo(20, 'fruitOfPrettyMayo', 'Fruit of Pretty Mayo'),
} as const satisfies {[key: string]: Yggdrasil};