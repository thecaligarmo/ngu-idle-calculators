import { bd, bigdec_max, bigdec_min } from "@/helpers/numbers"
import Resource, { ResourceContainer, prop } from "./resource"
import { Stat } from "./stat"
import bigDecimal from "js-big-decimal"
import _ from "lodash"
import { GameMode } from "./mode"

const NGUKeys : {[key: string]: string} = {
    AUGMENTS: 'NGUAugments',
    WANDOOS : 'NGUWandoos',
    RESPAWN : 'NGURespawn',
    GOLD : 'NGUGold',
    ADVENTURE_A : 'NGUAdventureA',
    POWER_A : 'NGUPowerA',
    DROP_CHANCE : 'NGUDropChance',
    MAGIC_NGU : 'NGUMagicNGU',
    PP : 'NGUPP',
    YGGDRASIL : 'NGUYggdrasil',
    EXP: 'NGUExp',
    POWER_B : 'NGUPowerB',
    NUMBER : 'NGUNumber',
    TIME_MACHINE : 'NGUTimeMachine',
    ENERGY_NGU : 'NGUEnergyNGU',
    ADVENTURE_B : 'NGUAdventureB',
} as const satisfies {[key: string]: string};


export class NGU extends Resource {
    resource: string // 'energy' or 'magic'
    target: number
    diminishingReturnLevel: number
    baseCost: bigDecimal
    constructor (
        id: number, key: string, name: string, mode : number, props: prop,
        resource: string,
        diminishingReturnLevel: number,
        baseCost : bigDecimal,
    ) {
        // level always 0
        super(id, key, name, mode, 0, props)
        this.resource = resource
        this.target = 0
        this.diminishingReturnLevel = diminishingReturnLevel
        this.baseCost = baseCost
    }
    isRespawn() : boolean {
        return (this.key === NGUKeys.RESPAWN)
    }
    importStats(data: any) : void {
        if(this.id >= 20) {
            this.level = data.sadisticLevel.low
            this.target = data.sadisticTarget.low
        } else if(this.id >= 10) {
            this.level = data.evilLevel.low
            this.target = data.evilTarget.low
        } else{
            this.level = data.level.low
            this.target = data.target.low
        }
        this.updateStats()
    }
    updateStats() : void {
        for (var prop of Object.keys(this.base)) {
            this[prop] = this.getStatValueInternal(this.level, prop)
        }
    }
    getStatValue(prop: string, level : number = -1) : number {
        if(level == -1) {
            level = this.level
        }
        if(!_.isUndefined(this[prop])) {
            if(this.isRespawn()) {
                return 200 - this.getStatValueInternal(level, prop)
            }
            return this.getStatValueInternal(level, prop)
        }
        return 100
    }
    // Internal value is different for calc value (for respawn in particular)
    getStatValueInternal(level: number, prop: string) : number {
        var base = this.base[prop]
        var diminishing : boolean = false
        if (level > this.diminishingReturnLevel) {
            diminishing = true
        }
        // MaxLevel = 1 billion
        if(level > 1000000000) {
            level = 1000000000
        }
        if (this.diminishingReturnLevel === 0 || !diminishing) {
            return  level * base + 100
        }
        // Handle non-diminishing return ones
        if(this.mode == GameMode.NORMAL) {
            switch (this.key) {
                case NGUKeys.RESPAWN: 
                    return ((level) / (level * 5 + 200000) + 0.2) * 100 + 100
                case NGUKeys.ADVENTURE_A:
                case NGUKeys.DROP_CHANCE:
                    return (level)**0.5 * 3.17 + 100
                case NGUKeys.MAGIC_NGU:
                    return (level)**0.3 * 12.59 + 100
                case NGUKeys.PP: 
                    return (level)**0.3 * 6.295 + 100
                case NGUKeys.YGGDRASIL:
                    return (level) ** 0.33 * 5.54  + 100
                case NGUKeys.EXP:
                    return (level) ** 0.4 * 0.9566 + 100
                case NGUKeys.NUMBER:
                    return (level) ** 0.5 * 31.7 + 100
                case NGUKeys.TIME_MACHINE:
                    return (level) ** 0.8 * 0.7962 + 100
                case NGUKeys.ENERGY_NGU:
                    return (level) ** 0.3 * 12.59 + 100
                case NGUKeys.ADVENTURE_B:
                    return (level) ** 0.4 * 1.894 + 100
            }
        } else if(this.mode == GameMode.EVIL) {
            switch (this.key) {
                case NGUKeys.WANDOOS:
                    return (level) ** 0.25 * 17.79 + 100
                case NGUKeys.RESPAWN: 
                    return ((level) / (level * 20 + 200000) + 0.05) * 100 + 100
                case NGUKeys.ADVENTURE_A:
                    return (level)**0.25 * 8.8945 + 100
                case NGUKeys.DROP_CHANCE:
                case NGUKeys.MAGIC_NGU:
                    return (level)**0.3 * 6.295 + 100
                case NGUKeys.PP: 
                    return (level)**0.2 * 5.024 + 100
                case NGUKeys.YGGDRASIL:
                    return (level) ** 0.1 * 10.9854  + 100
                case NGUKeys.EXP:
                    return (level) ** 0.2 * 2.1867 + 100
                case NGUKeys.NUMBER:
                    return (level) ** 0.3 * 62.95 + 100
                case NGUKeys.TIME_MACHINE:
                    return (level) ** 0.8 * 0.3981 + 100
                case NGUKeys.ENERGY_NGU:
                    return (level) ** 0.2 * 12.56 + 100
                case NGUKeys.ADVENTURE_B:
                    return (level) ** 0.25 * 2.6675 + 100
            }
        } else if(this.mode == GameMode.SADISTIC) {
            switch (this.key) {
                case NGUKeys.WANDOOS:
                    return (level) ** 0.15 * 21.2886 + 100
                case NGUKeys.RESPAWN: 
                    return ((level) / (level * 20 + 200000) + 0.05) * 100 + 100
                case NGUKeys.GOLD:
                    return (level) ** 0.5 * 15.815 + 100
                case NGUKeys.ADVENTURE_A:
                    return (level)**0.2 * 10.0476 + 100
                case NGUKeys.DROP_CHANCE:
                    return level ** 0.2 * 10.048 + 100
                case NGUKeys.MAGIC_NGU:
                    return (level)**0.2 * 20.0476 + 100
                case NGUKeys.PP: 
                    return (level)**0.1 * 8.01936 + 100
                case NGUKeys.YGGDRASIL:
                    return (level) ** 0.08 * 9.9076  + 100
                case NGUKeys.EXP:
                    return (level) ** 0.15 * 3.1978 + 100
                case NGUKeys.NUMBER:
                    return (level) ** 0.2 * 125.6 + 100
                case NGUKeys.TIME_MACHINE:
                    return (level) ** 0.8 * 0.3981 + 100
                case NGUKeys.ENERGY_NGU:
                    return (level) ** 0.15 * 17.741 + 100
                case NGUKeys.ADVENTURE_B:
                    return (level) ** 0.12 * 6.54795 + 100
            }
        }
        return 0
    }
    // The above formula's inverses
    getLevelFromVal(value: number, prop: string, forceDiminished : boolean = false, forceNotDiminished : boolean = false) : number{
        var base = this.base[prop]
        if (this.isRespawn() && (value > 100)) {
            return 0
        }
        value = value - 100
        var diminishing = (forceDiminished || this.level > this.diminishingReturnLevel)
        if (this.diminishingReturnLevel === 0 || !diminishing || forceNotDiminished) {
            return  value / base
            
        }
        // Handle non-diminishing return ones
        if(this.mode == GameMode.NORMAL) {
            switch (this.key) {
                case NGUKeys.RESPAWN:
                    value = value + 100
                    if(value == 40){
                        return 1000000000
                    }
                    return -40000 * (value - 20) / (value - 40)
                case NGUKeys.ADVENTURE_A:
                case NGUKeys.DROP_CHANCE:
                    return (value / 3.17) ** 2 
                case NGUKeys.MAGIC_NGU:
                    return (value / 12.59) ** (10/3) 
                case NGUKeys.PP: 
                    return (value / 6.295) ** (10/3)
                case NGUKeys.YGGDRASIL:
                    return (value / 5.54) ** 3
                case NGUKeys.EXP:
                    return (value / 0.9566) ** (2.5)
                case NGUKeys.NUMBER:
                    return (value / 31.7) ** 2
                case NGUKeys.TIME_MACHINE:
                    return (value / 0.7962) ** (10/8)
                case NGUKeys.ENERGY_NGU:
                    return (value / 12.59) ** (10/3)
                case NGUKeys.ADVENTURE_B:
                    return (value / 1.894) ** (2.5)
            }
        } else if(this.mode == GameMode.EVIL) {
            switch (this.key) {
                case NGUKeys.WANDOOS:
                    return (value / 17.79) ** 4
                case NGUKeys.RESPAWN: 
                    value = value + 100
                    if(value == 10){
                        return 1000000000
                    }
                    return -10000 * (value - 5) / (value - 10)
                case NGUKeys.ADVENTURE_A:
                    return (value / 8.8945)**4
                case NGUKeys.DROP_CHANCE:
                case NGUKeys.MAGIC_NGU:
                    return (value / 6.295)**(10/3)
                case NGUKeys.PP: 
                    return (value / 5.024)**5
                case NGUKeys.YGGDRASIL:
                    return (value / 10.9854) ** 10
                case NGUKeys.EXP:
                    return (value / 2.1867) ** 5
                case NGUKeys.NUMBER:
                    return (value / 62.95) ** (10/3)
                case NGUKeys.TIME_MACHINE:
                    return (value / 0.3981) ** (5/4)
                case NGUKeys.ENERGY_NGU:
                    return (value / 12.56) ** 5
                case NGUKeys.ADVENTURE_B:
                    return (value / 2.6675) ** 4
            }
        } else if(this.mode == GameMode.SADISTIC) {
            switch (this.key) {
                case NGUKeys.WANDOOS:
                    return (value / 21.2886) ** (20/3)
                case NGUKeys.RESPAWN: 
                    value = value + 100
                    if(value == 10){
                        return 1000000000
                    }
                    return -10000 * (value - 5) / (value - 10)
                case NGUKeys.GOLD:
                    return (value / 15.815) ** 2
                case NGUKeys.ADVENTURE_A:
                    return (value / 10.0476)**5
                case NGUKeys.DROP_CHANCE:
                    return value / 10.048 ** 5
                case NGUKeys.MAGIC_NGU:
                    return (value / 20.0476)**5
                case NGUKeys.PP: 
                    return (value / 8.01936)**10
                case NGUKeys.YGGDRASIL:
                    return (value / 9.9076) ** (25/2)
                case NGUKeys.EXP:
                    return (value / 3.1978) ** (20/3)
                case NGUKeys.NUMBER:
                    return (value / 125.6) ** 5
                case NGUKeys.TIME_MACHINE:
                    return (value / 0.3981) ** (5/4)
                case NGUKeys.ENERGY_NGU:
                    return (value / 17.741) ** (20/3)
                case NGUKeys.ADVENTURE_B:
                    return (value / 6.54795) ** (25/3)
            }
        }
        
        return 0
    }

    // Gets target for a percentage increase of value
    percentIncrease(percent: bigDecimal | number) : bigDecimal{
        if (percent instanceof bigDecimal) {
            percent = Number(percent.getValue())
        }
        var prop = this.statnames[0]
        
        if (this.isRespawn()) { // Respawn has weird scaling so we need to fix it.
            var curVal = this.getStatValueInternal(this.level, prop) - 100 // Make it < 0
            percent = ((curVal * (100 + percent) / 100)) > 39.999 ? ((40 - curVal) / curVal) : (percent / 100)
            var desiredVal = (curVal) * (percent + 1)
        } else {
            var curVal = this.getStatValueInternal(this.level, prop)
            var desiredVal = curVal * (percent/100 + 1)
        }

        return (this.valueIncrease(desiredVal))
    }

    // Gets target for a set increase of value
    valueIncrease(desiredVal: bigDecimal | number) : bigDecimal {
        if (desiredVal instanceof bigDecimal) {
            desiredVal = Number(desiredVal.getValue())
        }
        var prop = this.statnames[0]
        
        var desiredLevel = this.getLevelFromVal(desiredVal, prop)

        if (desiredLevel > this.diminishingReturnLevel && this.level <= this.diminishingReturnLevel && this.diminishingReturnLevel > 0) {
            desiredLevel = this.getLevelFromVal(desiredVal, prop, true)
        } else if (this.level >= this.diminishingReturnLevel && (desiredLevel < this.diminishingReturnLevel || this.diminishingReturnLevel == 0)) {
            desiredLevel = this.getLevelFromVal(desiredVal, prop, false, true)
        }
        var maxLvl = Math.min(Math.max(0, desiredLevel), 1000000000)
        return bd(maxLvl).ceil()
    }

    calcSecondsToTarget(cap : bigDecimal, speedFactor : bigDecimal, target : bigDecimal = bd(-1)) : bigDecimal {
        var level = bd(this.level)
        if (target.compareTo(bd(-1)) === 0 ) {
            target = bd(this.target)
        }

        // Grab base amount of time things will take
        var baseCost = this.baseCost
        var baseFactor = bd(1)
        var i = 0
        try {            
            var baseTimePerLevel = baseCost.multiply(bd(100)).divide(cap).divide(speedFactor)
            while(level.compareTo(target) != 0 && baseTimePerLevel.floor().compareTo(bd(0)) == 0) {
                i += 1
                baseFactor = baseFactor.multiply(bd(1000000000))
                baseTimePerLevel = baseCost.multiply(bd(100)).multiply(baseFactor).divide(cap).divide(speedFactor)
            }
        } catch (error) {
            var baseTimePerLevel = bd(0)
        }
        
        // Grab the starting time and the ending time
        var startingSpeed = baseTimePerLevel.multiply(level.add(bd(1))).divide(baseFactor).round(2, bigDecimal.RoundingModes.CEILING)
        var endingSpeed = baseTimePerLevel.multiply(target).divide(baseFactor).round(2, bigDecimal.RoundingModes.CEILING)

        // We can never go faster than 50 levels/second
        startingSpeed = startingSpeed.compareTo(bd(0.02)) <= 0 ? bd(0.02) : startingSpeed
        endingSpeed = endingSpeed.compareTo(bd(0.02)) <= 0 ? bd(0.02) : endingSpeed

        
        // Grab the number of levels that will be calculated with starting, middle (average) and end times
        try {
            var startingSpeedLevels = bigdec_max(
                bigdec_min(startingSpeed.multiply(baseFactor).divide(baseTimePerLevel), target).subtract(level).floor(),
                bd(0)
            )

            var x = endingSpeed.subtract(bd(0.02)).multiply(baseFactor).divide(baseTimePerLevel).subtract(level).subtract(startingSpeedLevels).floor()
            var middleSpeedLevels = x.compareTo(bd(0)) == 1 ? x : bd(0);

            x = bigdec_min(endingSpeed.multiply(baseFactor).divide(baseTimePerLevel), target).subtract(level).subtract(startingSpeedLevels).subtract(middleSpeedLevels).floor()
            var endingSpeedLevels = x.compareTo(bd(0)) == 1 ? x : bd(0);
        } catch(error) {
            var startingSpeedLevels = bd(0);
            var middleSpeedLevels = bd(0);
            var endingSpeedLevels = bd(0);
        }

        var seconds = startingSpeedLevels.multiply(startingSpeed)
                .add(endingSpeed.multiply(endingSpeedLevels))
                .add((endingSpeed.add(startingSpeed)).divide(bd(2)).multiply(middleSpeedLevels))

        return seconds
    
    }

    capAtTarget(speedFactor : bigDecimal, level : bigDecimal) : bigDecimal {
        var baseCost = this.baseCost

        if (level.compareTo(bd(0)) == -1) {
            return bd(0)
        }
        try {
            var baseTimePerLevel = baseCost.divide(speedFactor)
        } catch (error) {
            var baseTimePerLevel = bd(0)
        }
        return level.multiply(baseTimePerLevel).divide(bd(0.0002))
    }

    capToReachMaxTarget(speedFactor : bigDecimal, target : (bigDecimal | null) = null ) : bigDecimal {
        if (_.isNull(target)) {
            target = bd(this.target)
        }
        return this.capAtTarget(speedFactor, target)
    }

    capToReachMaxInDay(speedFactor : bigDecimal) : bigDecimal {
        var level = bd(this.level)
        var targetLvl = level.add(bd(60 * 60 * 24 * 50)) // 50 ticks per second * seconds
        return this.capToReachMaxTarget(speedFactor, targetLvl)
    }
}




export const ENGULIST = [
    new NGU(0, NGUKeys.AUGMENTS, 'NGU Augments', GameMode.NORMAL, [[Stat.AUGMENT_SPEED, 1]], 'energy', 0, bd('2e11')),
    new NGU(1, NGUKeys.WANDOOS, 'NGU Wandoos', GameMode.NORMAL, [[Stat.ENERGY_WANDOOS_SPEED, 0.1], [Stat.MAGIC_WANDOOS_SPEED, 0.1]], 'energy', 0, bd('2e11')),
    new NGU(2, NGUKeys.RESPAWN, 'NGU Respawn', GameMode.NORMAL, [[Stat.RESPAWN, 0.05]], 'energy', 400, bd('2e11')),
    new NGU(3, NGUKeys.GOLD, 'NGU Gold', GameMode.NORMAL, [[Stat.GOLD_DROP, 1]], 'energy', 0, bd('2e11')),
    new NGU(4, NGUKeys.ADVENTURE_A, 'NGU Adventure α', GameMode.NORMAL, [[Stat.POWER, 0.1], [Stat.TOUGHNESS, 0.1]], 'energy', 1000, bd('2e11')),
    new NGU(5, NGUKeys.POWER_A, 'NGU Power α', GameMode.NORMAL, [[Stat.ATTACK, 5], [Stat.DEFENSE, 5]], 'energy', 0, bd('2e11')),
    new NGU(6, NGUKeys.DROP_CHANCE, 'NGU Drop Chance', GameMode.NORMAL, [[Stat.DROP_CHANCE, 0.1],], 'energy', 1000, bd('2e13')),
    new NGU(7, NGUKeys.MAGIC_NGU, 'NGU Magic NGU', GameMode.NORMAL, [[Stat.MAGIC_NGU_SPEED, 0.1]], 'energy', 1000, bd('4e14')),
    new NGU(8, NGUKeys.PP, 'NGU PP', GameMode.NORMAL, [[Stat.PP, 0.05]], 'energy', 1000, bd('1e16')),

    new NGU(10, NGUKeys.AUGMENTS, 'NGU Augments', GameMode.EVIL, [[Stat.AUGMENT_SPEED, 0.5]], 'energy', 0, bd('2e20')),
    new NGU(11, NGUKeys.WANDOOS, 'NGU Wandoos', GameMode.EVIL, [[Stat.ENERGY_WANDOOS_SPEED, 0.1], [Stat.MAGIC_WANDOOS_SPEED, 0.1]], 'energy', 1000, bd('2e20')),
    new NGU(12, NGUKeys.RESPAWN, 'NGU Respawn', GameMode.EVIL, [[Stat.RESPAWN, 0.0005]], 'energy', 10000, bd('2e20')),
    new NGU(13, NGUKeys.GOLD, 'NGU Gold', GameMode.EVIL, [[Stat.GOLD_DROP, 0.5]], 'energy', 0, bd('2e21')),
    new NGU(14, NGUKeys.ADVENTURE_A, 'NGU Adventure α', GameMode.EVIL, [[Stat.POWER, 0.05], [Stat.TOUGHNESS, 0.05]], 'energy', 1000, bd('2e22')),
    new NGU(15, NGUKeys.POWER_A, 'NGU Power α', GameMode.EVIL, [[Stat.ATTACK, 2], [Stat.DEFENSE, 2]], 'energy', 0, bd('2e23')),
    new NGU(16, NGUKeys.DROP_CHANCE, 'NGU Drop Chance', GameMode.EVIL, [[Stat.DROP_CHANCE, 0.05],], 'energy', 1000, bd('2e24')),
    new NGU(17, NGUKeys.MAGIC_NGU, 'NGU Magic NGU', GameMode.EVIL, [[Stat.MAGIC_NGU_SPEED, 0.05]], 'energy', 1000, bd('2e25')),
    new NGU(18, NGUKeys.PP, 'NGU PP', GameMode.EVIL, [[Stat.PP, 0.02]], 'energy', 1000, bd('2e26')),

    new NGU(20, NGUKeys.AUGMENTS, 'NGU Augments', GameMode.SADISTIC, [[Stat.AUGMENT_SPEED, 0.4]], 'energy', 0, bd('1e40')),
    new NGU(21, NGUKeys.WANDOOS, 'NGU Wandoos', GameMode.SADISTIC, [[Stat.ENERGY_WANDOOS_SPEED, 0.06], [Stat.MAGIC_WANDOOS_SPEED, 0.1]], 'energy', 1000, bd('1e40')),
    new NGU(22, NGUKeys.RESPAWN, 'NGU Respawn', GameMode.SADISTIC, [[Stat.RESPAWN, 0.0005]], 'energy', 10000, bd('1e40')),
    new NGU(23, NGUKeys.GOLD, 'NGU Gold', GameMode.SADISTIC, [[Stat.GOLD_DROP, 0.5]], 'energy', 1000, bd('1e40')),
    new NGU(24, NGUKeys.ADVENTURE_A, 'NGU Adventure α', GameMode.SADISTIC, [[Stat.POWER, 0.04], [Stat.TOUGHNESS, 0.04]], 'energy', 1000, bd('1e41')),
    new NGU(25, NGUKeys.POWER_A, 'NGU Power α', GameMode.SADISTIC, [[Stat.ATTACK, 1.6], [Stat.DEFENSE, 1.6]], 'energy', 0, bd('1e42')),
    new NGU(26, NGUKeys.DROP_CHANCE, 'NGU Drop Chance', GameMode.SADISTIC, [[Stat.DROP_CHANCE, 0.04],], 'energy', 1000, bd('1e43')),
    new NGU(27, NGUKeys.MAGIC_NGU, 'NGU Magic NGU', GameMode.SADISTIC, [[Stat.MAGIC_NGU_SPEED, 0.04]], 'energy', 1000, bd('1e44')),
    new NGU(28, NGUKeys.PP, 'NGU PP', GameMode.SADISTIC, [[Stat.PP, 0.016]], 'energy', 1000, bd('1e45')),
]

export const MNGULIST = [
    new NGU(0, NGUKeys.YGGDRASIL, 'NGU Yggdrasil', GameMode.NORMAL, [[Stat.YGGDRASIL_YIELD, 0.1]], 'magic', 400, bd('4e11')),
    new NGU(1, NGUKeys.EXP, 'NGU Exp', GameMode.NORMAL, [[Stat.EXPERIENCE, 0.01]], 'magic', 2000, bd('1.2e12')),
    new NGU(2, NGUKeys.POWER_B, 'NGU Power β', GameMode.NORMAL, [[Stat.ATTACK, 1], [Stat.DEFENSE, 1]], 'magic', 0,bd('4e12')),
    new NGU(3, NGUKeys.NUMBER, 'NGU Number', GameMode.NORMAL, [[Stat.NUMBER, 1]], 'magic', 1000, bd('1.2e13')),
    new NGU(4, NGUKeys.TIME_MACHINE, 'NGU Time Machine', GameMode.NORMAL, [[Stat.TIME_MACHINE, 0.2]], 'magic', 1000, bd('1e14')),
    new NGU(5, NGUKeys.ENERGY_NGU, 'NGU Energy NGU', GameMode.NORMAL, [[Stat.ENERGY_NGU_SPEED, 0.1]], 'magic', 1000, bd('1e15')),
    new NGU(6, NGUKeys.ADVENTURE_B, 'NGU Adventure β', GameMode.NORMAL, [[Stat.POWER, 0.03], [Stat.TOUGHNESS, 0.03]], 'magic', 1000, bd('1e16')),

    new NGU(10, NGUKeys.YGGDRASIL, 'NGU Yggdrasil', GameMode.EVIL, [[Stat.YGGDRASIL_YIELD, 0.05]], 'magic', 400, bd('2e20')),
    new NGU(11, NGUKeys.EXP, 'NGU Exp', GameMode.EVIL, [[Stat.EXPERIENCE, 0.005]], 'magic', 2000, bd('2e21')),
    new NGU(12, NGUKeys.POWER_B, 'NGU Power β', GameMode.EVIL, [[Stat.ATTACK, 0.5], [Stat.DEFENSE, 0.5]], 'magic', 0, bd('2e22')),
    new NGU(13, NGUKeys.NUMBER, 'NGU Number', GameMode.EVIL, [[Stat.NUMBER, 0.5]], 'magic', 1000, bd('2e23')),
    new NGU(14, NGUKeys.TIME_MACHINE, 'NGU Time Machine', GameMode.EVIL, [[Stat.TIME_MACHINE, 0.1]], 'magic', 1000, bd('2e24')),
    new NGU(15, NGUKeys.ENERGY_NGU, 'NGU Energy NGU', GameMode.EVIL, [[Stat.ENERGY_NGU_SPEED, 0.05]], 'magic', 1000, bd('2e25')),
    new NGU(16, NGUKeys.ADVENTURE_B, 'NGU Adventure β', GameMode.EVIL, [[Stat.POWER, 0.015], [Stat.TOUGHNESS, 0.015]], 'magic', 1000, bd('2e26')),

    new NGU(20, NGUKeys.YGGDRASIL, 'NGU Yggdrasil', GameMode.SADISTIC, [[Stat.YGGDRASIL_YIELD, 0.04]], 'magic', 400, bd('1e40')),
    new NGU(21, NGUKeys.EXP, 'NGU Exp', GameMode.SADISTIC, [[Stat.EXPERIENCE, 0.005]], 'magic', 2000, bd('1e40')),
    new NGU(22, NGUKeys.POWER_B, 'NGU Power β', GameMode.SADISTIC, [[Stat.ATTACK, 0.5], [Stat.DEFENSE, 0.5]], 'magic', 0, bd('1e41')),
    new NGU(23, NGUKeys.NUMBER, 'NGU Number', GameMode.SADISTIC, [[Stat.NUMBER, 0.5]], 'magic', 1000, bd('1e42')),
    new NGU(24, NGUKeys.TIME_MACHINE, 'NGU Time Machine', GameMode.SADISTIC, [[Stat.TIME_MACHINE, 0.1]], 'magic', 1000, bd('1e43')),
    new NGU(25, NGUKeys.ENERGY_NGU, 'NGU Energy NGU', GameMode.SADISTIC, [[Stat.ENERGY_NGU_SPEED, 0.05]], 'magic', 1000, bd('1e44')),
    new NGU(26, NGUKeys.ADVENTURE_B, 'NGU Adventure β', GameMode.SADISTIC, [[Stat.POWER, 0.015], [Stat.TOUGHNESS, 0.015]], 'magic', 1000, bd('1e45')),
]

export var ENERGY_NGUS = new ResourceContainer(ENGULIST);
export var MAGIC_NGUS = new ResourceContainer(MNGULIST);