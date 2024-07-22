import { bd} from "@/helpers/numbers"
import Resource, { ResourceContainer, prop } from "./resource"
import { Stat } from "./stat"
import bigDecimal from "js-big-decimal"
import _ from "lodash"
import { GameMode } from "./mode"

const HackKeys : {[key: string]: string} = {
    POWER: 'PowerHack',
    ADVENTURE : 'AdventureHack',
    TIME_MACHINE : 'TimeMachineHack',
    DROP_CHANCE : 'DropChanceHack',
    AUGMENT_SPEED: 'AugmentSpeedHack',
    ENERGY_NGU : 'EnergyNGUHack',
    MAGIC_NGU : 'MagicNGUHack',
    BLOOD: 'BloodHack',
    QUEST: 'QuestHack',
    DAYCARE: 'DaycareHack',
    EXP: 'ExperienceHack',
    NUMBER: 'NumberHack',
    PP: 'PPHack',
    HACK: 'HackHack',
    WISH: 'WishHack',
} as const satisfies {[key: string]: string};


export class Hack extends Resource {
    target: number
    baseMilestone: number
    milestoneBonus: number
    baseSpeedDivider: bigDecimal
    hardCap: number
    constructor (
        id: number, key: string, name: string, mode : number, props: prop,
        baseMilestone: number,
        milestoneBonus: number,
        baseSpeedDivider: bigDecimal,
        hardCap: number
    ) {
        // level always 0
        super(id, key, name, mode, 0, props)
        this.target = 0
        this.baseMilestone = baseMilestone
        this.milestoneBonus = milestoneBonus
        this.baseSpeedDivider = baseSpeedDivider
        this.hardCap = hardCap
    }
    importStats(data: any) : void {
        this.level = data.level
        this.target = data.target
        this.updateStats()
    }
    updateStats() : void {
        for (var prop of Object.keys(this.base)) {
            this[prop] = this.base[prop] * this.level
        }
    }

    getStatValue(prop: string, level : number = -1, milestoneReduction : number = 0) : number {
        if(level == -1) {
            level = this.level
        }
        if(!_.isUndefined(this[prop])) {
            return (100 + this[prop]) * this.getMilestoneBonus(milestoneReduction)
        }
        return 100
    }

    getMilestoneBonus(milestoneReduction : number = 0) {
        var numMilestones = Math.floor(this.level / (this.baseMilestone - milestoneReduction))
        return this.milestoneBonus ** numMilestones
    }
    


    // // The above formula's inverses
    // getLevelFromVal(value: number, prop: string, forceDiminished : boolean = false, forceNotDiminished : boolean = false) : number{
    //     var base = this.base[prop]

    //     value = value - 100
    //     var diminishing = (forceDiminished || this.level > this.diminishingReturnLevel)
    //     if (this.diminishingReturnLevel === 0 || !diminishing || forceNotDiminished) {
    //         return  value / base
            
    //     }
    //     // Handle non-diminishing return ones
    //     switch (this.key) {
    //         case NGUKeys.RESPAWN:
    //             value = value + 100
    //             if(value == 40){
    //                 return 1000000000
    //             }
    //             return -40000 * (value - 20) / (value - 40)
    //         case NGUKeys.ADVENTURE_A:
    //         case NGUKeys.DROP_CHANCE:
    //             return (value / 3.17) ** 2 
    //         case NGUKeys.MAGIC_NGU:
    //             return (value / 12.59) ** (10/3) 
    //         case NGUKeys.PP: 
    //             return (value / 6.295) ** (10/3)
    //         case NGUKeys.YGGDRASIL:
    //             return (value / 5.54) ** 3
    //         case NGUKeys.EXP:
    //             return (value / 0.9566) ** (2.5)
    //         case NGUKeys.NUMBER:
    //             return (value / 31.7) ** 2
    //         case NGUKeys.TIME_MACHINE:
    //             return (value / 0.7962) ** (10/8)
    //         case NGUKeys.ENERGY_NGU:
    //             return (value / 12.59) ** (10/3)
    //         case NGUKeys.ADVENTURE_B:
    //             return (value / 1.894) ** (2.5)
    //     }
        
    //     return 0
    // }

    // // Gets target for a percentage increase of value
    // percentIncrease(percent: bigDecimal | number) : bigDecimal{
    //     if (percent instanceof bigDecimal) {
    //         percent = Number(percent.getValue())
    //     }
    //     var prop = this.statnames[0]
        
    //     if (this.isRespawn()) { // Respawn has weird scaling so we need to fix it.
    //         var curVal = this.getStatValueInternal(this.level, prop) - 100 // Make it < 0
    //         percent = ((curVal * (100 + percent) / 100)) > 39.999 ? ((40 - curVal) / curVal) : (percent / 100)
    //         var desiredVal = (curVal) * (percent + 1)
    //     } else {
    //         var curVal = this.getStatValueInternal(this.level, prop)
    //         var desiredVal = curVal * (percent/100 + 1)
    //     }

    //     return (this.valueIncrease(desiredVal))
    // }

    // // Gets target for a set increase of value
    // valueIncrease(desiredVal: bigDecimal | number) : bigDecimal {
    //     if (desiredVal instanceof bigDecimal) {
    //         desiredVal = Number(desiredVal.getValue())
    //     }
    //     var prop = this.statnames[0]
        
    //     var desiredLevel = this.getLevelFromVal(desiredVal, prop)

    //     if (desiredLevel > this.diminishingReturnLevel && this.level <= this.diminishingReturnLevel && this.diminishingReturnLevel > 0) {
    //         desiredLevel = this.getLevelFromVal(desiredVal, prop, true)
    //     } else if (this.level >= this.diminishingReturnLevel && (desiredLevel < this.diminishingReturnLevel || this.diminishingReturnLevel == 0)) {
    //         desiredLevel = this.getLevelFromVal(desiredVal, prop, false, true)
    //     }
    //     var maxLvl = Math.min(Math.max(0, desiredLevel), 1000000000)
    //     return bd(maxLvl).ceil()
    // }

    // calcSecondsToTarget(cap : bigDecimal, speedFactor : bigDecimal, target : bigDecimal = bd(-1)) : bigDecimal {
    //     var level = bd(this.level)
    //     if (target.compareTo(bd(-1)) === 0 ) {
    //         target = bd(this.target)
    //     }

    //     // Grab base amount of time things will take
    //     var baseCost = this.baseCost
    //     var baseFactor = bd(1)
    //     var i = 0
    //     try {            
    //         var baseTimePerLevel = baseCost.multiply(bd(100)).divide(cap).divide(speedFactor)
    //         while(level.compareTo(target) != 0 && baseTimePerLevel.floor().compareTo(bd(0)) == 0) {
    //             i += 1
    //             baseFactor = baseFactor.multiply(bd(1000000000))
    //             baseTimePerLevel = baseCost.multiply(bd(100)).multiply(baseFactor).divide(cap).divide(speedFactor)
    //         }
    //     } catch (error) {
    //         var baseTimePerLevel = bd(0)
    //     }
        
    //     // Grab the starting time and the ending time
    //     var startingSpeed = baseTimePerLevel.multiply(level.add(bd(1))).divide(baseFactor).round(2, bigDecimal.RoundingModes.CEILING)
    //     var endingSpeed = baseTimePerLevel.multiply(target).divide(baseFactor).round(2, bigDecimal.RoundingModes.CEILING)

    //     // We can never go faster than 50 levels/second
    //     startingSpeed = startingSpeed.compareTo(bd(0.02)) <= 0 ? bd(0.02) : startingSpeed
    //     endingSpeed = endingSpeed.compareTo(bd(0.02)) <= 0 ? bd(0.02) : endingSpeed

        
    //     // Grab the number of levels that will be calculated with starting, middle (average) and end times
    //     try {
    //         var startingSpeedLevels = bigdec_max(
    //             bigdec_min(startingSpeed.multiply(baseFactor).divide(baseTimePerLevel), target).subtract(level).floor(),
    //             bd(0)
    //         )

    //         var x = endingSpeed.subtract(bd(0.02)).multiply(baseFactor).divide(baseTimePerLevel).subtract(level).subtract(startingSpeedLevels).floor()
    //         var middleSpeedLevels = x.compareTo(bd(0)) == 1 ? x : bd(0);

    //         x = bigdec_min(endingSpeed.multiply(baseFactor).divide(baseTimePerLevel), target).subtract(level).subtract(startingSpeedLevels).subtract(middleSpeedLevels).floor()
    //         var endingSpeedLevels = x.compareTo(bd(0)) == 1 ? x : bd(0);
    //     } catch(error) {
    //         var startingSpeedLevels = bd(0);
    //         var middleSpeedLevels = bd(0);
    //         var endingSpeedLevels = bd(0);
    //     }

    //     var seconds = startingSpeedLevels.multiply(startingSpeed)
    //             .add(endingSpeed.multiply(endingSpeedLevels))
    //             .add((endingSpeed.add(startingSpeed)).divide(bd(2)).multiply(middleSpeedLevels))

    //     return seconds
    
    // }

    // capAtTarget(speedFactor : bigDecimal, level : bigDecimal) : bigDecimal {
    //     var baseCost = this.baseCost

    //     if (level.compareTo(bd(0)) == -1) {
    //         return bd(0)
    //     }
    //     try {
    //         var baseTimePerLevel = baseCost.divide(speedFactor)
    //     } catch (error) {
    //         var baseTimePerLevel = bd(0)
    //     }
    //     return level.multiply(baseTimePerLevel).divide(bd(0.0002))
    // }

    // capToReachMaxTarget(speedFactor : bigDecimal, target : (bigDecimal | null) = null ) : bigDecimal {
    //     if (_.isNull(target)) {
    //         target = bd(this.target)
    //     }
    //     return this.capAtTarget(speedFactor, target)
    // }

    // capToReachMaxInDay(speedFactor : bigDecimal) : bigDecimal {
    //     var level = bd(this.level)
    //     var targetLvl = level.add(bd(60 * 60 * 24 * 50)) // 50 ticks per second * seconds
    //     return this.capToReachMaxTarget(speedFactor, targetLvl)
    // }
}




export const HACKLIST = [
    new Hack(0, HackKeys.POWER, 'Attack/Defense Hack', GameMode.EVIL, [[Stat.ATTACK, 2.5], [Stat.DEFENSE, 2.5]], 10, 1.025, bd('1e8'), 7720),
    new Hack(1, HackKeys.ADVENTURE, 'Adventure Stats Hack', GameMode.EVIL, [[Stat.POWER, 0.1], [Stat.TOUGHNESS, 0.1], [Stat.HEALTH, 0.1], [Stat.REGEN, 0.1]], 50, 1.02, bd('2e8'), 7632),
    new Hack(2, HackKeys.TIME_MACHINE, 'Time Machine Speed Hack', GameMode.EVIL, [[Stat.TIME_MACHINE_SPEED, 0.2]], 50, 1.02, bd('4e8'), 7544),
    new Hack(3, HackKeys.DROP_CHANCE, 'Drop Chance Hack', GameMode.EVIL, [[Stat.DROP_CHANCE, 0.25]], 40, 1.03, bd('4e8'), 7544),
    new Hack(4, HackKeys.AUGMENT_SPEED, 'Augment Speed Hack', GameMode.EVIL, [[Stat.AUGMENT_SPEED, 0.2]], 20, 1.01, bd('8e8'), 7456),
    new Hack(5, HackKeys.ENERGY_NGU, 'Energy NGU Speed Hack', GameMode.EVIL, [[Stat.ENERGY_NGU_SPEED, 0.1]], 30, 1.015, bd('2e9'), 7340),
    new Hack(6, HackKeys.MAGIC_NGU, 'Magic NGU Speed Hack', GameMode.EVIL, [[Stat.MAGIC_NGU_SPEED, 0.1]], 30, 1.015, bd('2e9'), 7340),
    new Hack(7, HackKeys.BLOOD, 'Blood Gain Hack', GameMode.EVIL, [[Stat.BLOOD, 0.1]], 50, 1.04, bd('4e9'), 7252),
    new Hack(8, HackKeys.QUEST, 'QP Gain Hack', GameMode.EVIL, [[Stat.QUEST_REWARD, 0.05]], 50, 1.008, bd('8e9'), 7164),
    new Hack(9, HackKeys.DAYCARE, 'Daycare Hack', GameMode.EVIL, [[Stat.DAYCARE_SPEED, 0.02]], 45, 1.005, bd('2e10'), 7048),
    new Hack(10, HackKeys.EXP, 'EXP Hack', GameMode.EVIL, [[Stat.EXPERIENCE, 0.025]], 75, 1.01, bd('4e10'), 6960),
    new Hack(11, HackKeys.NUMBER, 'Number Hack', GameMode.EVIL, [[Stat.NUMBER, 5]], 40, 1.04, bd('8e10'), 6873),
    new Hack(12, HackKeys.PP, 'PP Hack', GameMode.EVIL, [[Stat.PP, 0.05]], 25, 1.005, bd('2e11'), 6757),
    new Hack(13, HackKeys.HACK, 'Hack Hack', GameMode.EVIL, [[Stat.HACK_SPEED, 0.05]], 100, 1.10, bd('2e11'), 6757),
    new Hack(14, HackKeys.WISH, 'Wish Hack', GameMode.EVIL, [[Stat.WISH_SPEED, 0.01]], 50, 1.005, bd('1e13'), 6262),
]

export var HACKS = new ResourceContainer(HACKLIST);