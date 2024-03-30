import { bd, bigdec_min, dn } from "@/helpers/numbers"
import Resource, { ResourceContainer, prop } from "./resource"
import { Stat } from "./stat"
import bigDecimal from "js-big-decimal"
import _ from "lodash"
import { Mode } from "./mode"



export class NGU extends Resource {
    res: string
    target: number
    evilLevel: number
    evilTarget: number
    sadisticLevel: number
    sadisticTarget: number
    diminishingReturnLevel: number
    maxValue: number
    constructor (id: number, key: string, name: string, level: number, props: prop, res: string, diminishingReturnLevel: number, maxValue: number) {
        super(id, key, name, level, props)
        this.res = res
        this.target = 0
        this.evilLevel = 0
        this.evilTarget = 0
        this.sadisticLevel = 0
        this.sadisticTarget = 0
        this.diminishingReturnLevel = diminishingReturnLevel
        this.maxValue = maxValue
    }
    isRespawn() : boolean {
        return (this.id ===2 && this.res === 'energy')
    }
    importStats(data: any) : void {
        this.level = data.level.low
        this.evilLevel = data.evilLevel.low
        this.sadisticLevel = data.sadisticLevel.low
        this.target = data.target.low
        this.evilTarget = data.evilTarget.low
        this.sadisticTarget = data.sadisticTarget.low
        this.updateStats()
    }
    updateStats() : void {
        for (var prop of Object.keys(this.base)) {
            this[prop] = this.getStatValue(this.level, prop)
            if (this[prop] > this.maxValue) {
                this[prop] = this.maxValue
            }
        }
        
    }
    getStatValue(level: number, prop: string) : number {
        var base = this.base[prop]
        var diminishing : boolean = false
        if (level > this.diminishingReturnLevel) {
            diminishing = true
        }
        if (this.diminishingReturnLevel === 0 || !diminishing) {
            if (this.isRespawn()) {
                return -level * base + 100
            } else {
                return  level * base + 100
            }
        } else if (this.res == 'energy') {
            switch (this.id) {
                case 2: // respawn
                    return (-(level) / (level * 5 + 200000) - 0.2) * 100 + 100
                case 4: // Adv A
                case 6: // DC
                    return (level)**0.5 * 3.17 + 100
                case 7: // M NGU
                    return (level)**0.3 * 12.59 + 100
                case 8: // PP
                    return (level)**0.3 * 6.295 + 100
            } 
            
        } 
        // Else Magic
        switch (this.id) {
            case 0: // ygg
                return (level) ** 0.33 * 5.54  + 100
            case 1: // exp
                return (level) ** 0.4 * 0.9566 + 100
            case 3: // number
                return (level) ** 0.5 * 31.7 + 100
            case 4: // tm
                return (level) ** 0.3 * 0.7962 + 100
            case 5: // energy ngu
                return (level) ** 0.3 * 12.59 + 100
            case 6: // adv B
                return (level) ** 0.4 * 1.894 + 100

        }
        return 0
    }
    // The above formula's inverses
    getLevelFromVal(value: number, prop: string, forseDiminished : boolean = false) : number{
        var base = this.base[prop]
        var diminishing = (forseDiminished || this.level > this.diminishingReturnLevel)
        if (this.diminishingReturnLevel === 0 || !diminishing) {
            if (this.isRespawn()) {
                return - value / base
            } else {
                return  value / base
            }
        } else if (this.res == 'energy') {
            switch (this.id) {
                case 2: // respawn
                    return -40000 * (value + 20) / (value + 40)
                    // return 40000 * ( value + 80) / (60 - value)
                case 4: // Adv A
                case 6: // DC
                    return (value / 3.17) ** 2 
                case 7: // M NGU
                    return (value / 12.59) ** (10/3) 
                case 8: // PP
                    return (value / 6.295) ** (10/3)
            } 
            
        } 
        // Else Magic
        switch (this.id) {
            case 0: // ygg
                return (value / 5.54) ** 3
            case 1: // exp
                return (value / 0.9566) ** (2.5)
            case 3: // number
                return (value / 31.7) ** 2
            case 4: // tm
                return (value / 0.7962) ** (10/3)
            case 5: // energy ngu
                return (value / 12.59) ** (10/3)
            case 6: // adv B
                return (value / 1.894) ** (2.5)

        }
        return 0
    }

    percentIncrease(percent: bigDecimal | number) : bigDecimal{
        var maxLvl = 0
        percent = Number(percent)
        for (var prop of Object.keys(this.base)) {
            if (this.isRespawn()) { // Respawn has weird scaling so we need to fix it.
                var curVal = this.getStatValue(this.level, prop) - 100
                percent = (curVal * (100 + percent) / 100) < -39.99 ? (-39.99 - curVal) / curVal : percent / 100
                var desiredVal = (curVal) * (percent + 1)
            } else {
                var curVal = this.getStatValue(this.level, prop)
                var desiredVal = curVal * (percent/100 + 1) - 100
            }
            var desiredLevel = this.getLevelFromVal(desiredVal, prop)
            if (desiredLevel > this.diminishingReturnLevel && this.level <= this.diminishingReturnLevel && this.diminishingReturnLevel > 0) {
                desiredLevel = this.getLevelFromVal(desiredVal, prop, true)
            }
            maxLvl = Math.max(maxLvl, desiredLevel)
        }
        return bd(maxLvl).ceil()
    }
    calcSecondsToTarget(cap : bigDecimal, speedFactor : bigDecimal) : bigDecimal {
        // Grab base amount of time things will take
        var baseSpeed = this.getBaseSpeed();
        try {
            var baseTime = baseSpeed.multiply(bd(100)).divide(cap).divide(speedFactor)
        } catch (error) {
            var baseTime = bd(0)
        }
        var level = bd(this.level)
        var target = bd(this.target)


        
        
        // Grab the starting time and the ending time
        var startingSpeed = baseTime.multiply(level.add(bd(1))).round(2)
        var endingSpeed = baseTime.multiply(target).round(2)

        // Grab the number of levels that will be calculated with starting, middle (average) and end times
        try {
            var startingSpeedLevels = bigdec_min(startingSpeed.divide(baseTime), target).subtract(level).floor()
            var x = endingSpeed.subtract(bd(0.01)).divide(baseTime).subtract(level).subtract(startingSpeedLevels).floor()
            var middleSpeedLevels = x.compareTo(bd(0)) == -1 ? bd(0) : x;
            x = bigdec_min(endingSpeed.divide(baseTime), target).subtract(level).subtract(startingSpeedLevels).subtract(middleSpeedLevels).floor()
            var endingSpeedLevels = x.compareTo(bd(0)) == -1 ? bd(0) : x;
        } catch(error) {
            var startingSpeedLevels = bd(0);
            var middleSpeedLevels = bd(0);
            var endingSpeedLevels = bd(0);
        }

        if (this.id === 4 && this.res === 'energy') {
            console.log(baseSpeed, baseTime, level, target, startingSpeed, endingSpeed, startingSpeedLevels, middleSpeedLevels, endingSpeedLevels)
        }
    
        return startingSpeedLevels.multiply(startingSpeed)
                .add(endingSpeed.multiply(endingSpeedLevels))
                .add(endingSpeed.add(startingSpeed).divide(bd(2)).multiply(middleSpeedLevels))
    
    }

    capToReachMaxTarget(speedFactor : bigDecimal, target : (bigDecimal | null) = null ) : bigDecimal {
        var base = this.getBaseSpeed();
        if (_.isNull(target)) {
            target = bd(this.target)
        } 

        if (target.compareTo(bd(0)) == -1) {
            return bd(0)
        }
        try {
            var baseTimePerLevel = base.divide(speedFactor)
        } catch (error) {
            var baseTimePerLevel = bd(0)
        }
        return target.multiply(baseTimePerLevel).divide(bd(0.0002))
    }

    capToReachMaxInDay(speedFactor : bigDecimal) : bigDecimal {
        var level = bd(this.level)
        var targetLvl = level.add(bd(60 * 60 * 24 * 50)) // 50 ticks per second * seconds
        return this.capToReachMaxTarget(speedFactor, targetLvl)
    }

    getBaseSpeed(mode : number = Mode.NORMAL) : bigDecimal{
        if (mode === Mode.NORMAL) {
            if (this.res == 'energy') {
                switch(this.id) {
                    case 0: // augments
                    case 1: // wandoos
                    case 2: // respawn
                    case 3: // gold
                    case 4: //adventure
                    case 5: //power a
                        return bd("2e11")
                    case 6: // drop chance
                        return bd("2e13")
                    case 7: // magic NGU
                        return bd("4e14")
                    case 8: // pp
                        return bd("1e16")
                }
            }
            //agic
            switch(this.id) {
                case 0: // Yggradasil
                    return bd("4e11")
                case 1: // Exp
                    return bd("1.2e12")
                case 2: // Power B
                    return bd("4e12")
                case 3: // Number
                    return bd("1.2e13")
                case 4: // Time Machine
                    return bd("1e14")
                case 5: // Energy NGU
                    return bd("1e15")
                case 6: // Adv B
                    return bd("1e16")
            }
        } else if (mode === Mode.EVIL) {
            if (this.res == 'energy') {
                switch(this.id) {
                    case 0: // augments
                    case 1: // wandoos
                    case 2: // respawn
                        return bd("2e20")
                    case 3: // gold
                        return bd("2e21")
                    case 4: //adventure
                        return bd("2e22")
                    case 5: //power a
                        return bd("2e23")
                    case 6: // drop chance
                        return bd("2e24")
                    case 7: // magic NGU
                        return bd("2e25")
                    case 8: // pp
                        return bd("2e26")
                }
            }
            //agic
            switch(this.id) {
                case 0: // Yggradasil
                    return bd("2e20")
                case 1: // Exp
                    return bd("2e21")
                case 2: // Power B
                    return bd("2e22")
                case 3: // Number
                    return bd("2e23")
                case 4: // Time Machine
                    return bd("2e24")
                case 5: // Energy NGU
                    return bd("2e25")
                case 6: // Adv B
                    return bd("2e26")
            }
        }
        return bd(0);
    }
}


export const ENGULIST = [
    new NGU(0, 'NGUAugments', 'NGU AUGMENTS',  0, [[Stat.AUGMENT_SPEED, 1]], 'energy',   0, 1000000000),
    new NGU(1, 'NGUWandoos', 'NGU WANDOOS',  0, [[Stat.WANDOOS_SPEED, 0.1]], 'energy',   0, 100000000),
    new NGU(2, 'NGURespawn', 'NGU RESPAWN',  0, [[Stat.RESPAWN, 0.05]], 'energy',   400, 60),
    new NGU(3, 'NGUGold', 'NGU GOLD',  0, [[Stat.GOLD_DROP, 1]], 'energy',   0, 1000000000),
    new NGU(4, 'NGUAdventureA', 'NGU ADVENTURE A',  0, [[Stat.POWER, 0.1], [Stat.TOUGHNESS, 0.1]], 'energy',   1000, 100244.2),
    new NGU(5, 'NGUPowerA', 'NGU POWER A',  0, [[Stat.ATTACK, 5], [Stat.DEFENSE, 5]], 'energy',   0, 5000000000),
    new NGU(6, 'NGUDropChance', 'NGU DROP CHANCE',  0, [[Stat.DROP_CHANCE, 0.1],], 'energy',   1000, 100244.2),
    new NGU(7, 'NGUMagicNGU', 'NGU MAGIC NGU',  0, [[Stat.MAGIC_NGU_SPEED, 0.1]], 'energy',   1000, 6309.95),
    new NGU(8, 'NGUPP', 'NGU PP',  0, [[Stat.PP, 0.05]], 'energy',   1000, 3154.97),
]

export const MNGULIST = [
    new NGU(0, 'NGUYggrdrasil', 'NGU YGGDRASIL',  0, [[Stat.YGGDRASIL_YIELD, 0.1]], 'magic',   400, 5170.23),
    new NGU(1, 'NGUExperience', 'NGU EXP',  0, [[Stat.EXPERIENCE, 0.01]], 'magic',   2000, 3808.29),
    new NGU(2, 'NGUPowerB', 'NGU POWER B',  0, [[Stat.ATTACK, 1], [Stat.DEFENSE, 1]], 'magic',   0, 1000000000),
    new NGU(3, 'NGUNumber', 'NGU NUMBER',  0, [[Stat.NUMBER, 1]], 'magic',   1000, 1002000),
    new NGU(4, 'NGUTimeMachine', 'NGU TIME MACHINE',  0, [[Stat.TIME_MACHINE, 0.2]], 'magic',   1000, 12619000),
    new NGU(5, 'NGUEnergyNGU', 'NGU ENERGY NGU',  0, [[Stat.ENERGY_NGU_SPEED, 0.1]], 'magic',   1000, 6309.95),
    new NGU(6, 'NGUAdventureB', 'NGU ADVENTURE B',  0, [[Stat.POWER, 0.03], [Stat.TOUGHNESS, 0.03]], 'magic', 1000, 7539.75),
]

export var ENERGY_NGUS = new ResourceContainer(ENGULIST);

export var MAGIC_NGUS = new ResourceContainer(MNGULIST);