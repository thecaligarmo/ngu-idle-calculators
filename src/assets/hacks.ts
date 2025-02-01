import { bd, lessThan } from "@/helpers/numbers"
import bigDecimal from "js-big-decimal"
import _ from "lodash"
import { GameMode } from "./mode"
import Resource, { ResourceContainer, prop } from "./resource"
import { Stat } from "./stat"

export const HackKeys : {[key: string]: string} = {
    STAT: 'StatHack',
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
    milestoneReduction: number
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
        this.milestoneReduction = 0
    }
    importStats(data: any, playerData : any) : void {
        this.level = data.level
        this.target = data.target
        // Milestone reduction is dependent on key
        switch(this.key) {
            case HackKeys.STAT:
                this.milestoneReduction = playerData.beastQuest.quirkLevel[57]
                break;
            case HackKeys.ADVENTURE :
                this.milestoneReduction = playerData.adventure.itopod.perkLevel[113]
                break;
            case HackKeys.TIME_MACHINE :
                this.milestoneReduction = playerData.beastQuest.quirkLevel[175]
                break;
            case HackKeys.DROP_CHANCE :
                this.milestoneReduction = playerData.adventure.itopod.perkLevel[217]
                break;
            case HackKeys.AUGMENT_SPEED:
                this.milestoneReduction = playerData.adventure.itopod.perkLevel[218]
                break;
            case HackKeys.ENERGY_NGU :
                this.milestoneReduction = playerData.beastQuest.quirkLevel[174]
                break;
            case HackKeys.MAGIC_NGU :
                this.milestoneReduction = playerData.adventure.itopod.perkLevel[219]
                break;
            case HackKeys.BLOOD:
                this.milestoneReduction = playerData.adventure.itopod.perkLevel[114]
                break;
            case HackKeys.QUEST:
                this.milestoneReduction = playerData.wishes.wishes[76].level
                break;
            case HackKeys.DAYCARE:
                this.milestoneReduction = playerData.adventure.itopod.perkLevel[115]
                break;
            case HackKeys.EXP:
                this.milestoneReduction = playerData.beastQuest.quirkLevel[59]
                break;
            case HackKeys.NUMBER:
                this.milestoneReduction = playerData.wishes.wishes[77].level
                break;
            case HackKeys.PP:
                this.milestoneReduction = playerData.beastQuest.quirkLevel[58]
                break;
            case HackKeys.HACK:
                this.milestoneReduction = playerData.wishes.wishes[78].level
                break;
            case HackKeys.WISH:
                this.milestoneReduction = playerData.beastQuest.quirkLevel[60]
                break;
        }
        this.updateStats()
    }
    updateStats() : void {
        for (let prop of Object.keys(this.base)) {
            this[prop] = this.base[prop] * this.level
        }
    }

    getStatValue(prop: string = '', level : number = -1) : number {
        if(level == -1) {
            level = this.level
        }
        if (prop == '') {
            prop = Object.keys(this.base)[0]
        }
        if(!_.isUndefined(this[prop])) {
            return (100 + (this.base[prop] * level)) * this.getMilestoneBonus(level)
        }
        return 100
    }

    getStatAtMilestone(milestone : number) : number {
        const level = this.levelsPerMilestone() * milestone
        return this.getStatValue('', level)
    }

    levelsPerMilestone() : number {
        return this.baseMilestone - this.milestoneReduction
    }

    getMilestone(level : number = -1) : number {
        if(level == -1) {
            level = this.level
        }
        return Math.floor(level / (this.levelsPerMilestone()))
    }

    getMilestoneBonus(level : number = -1) : number {
        if(level == -1) {
            level = this.level
        }
        const numMilestones = this.getMilestone(level)
        return this.milestoneBonus ** numMilestones
    }
    
    getMilestoneLevel(milestone : number = -1) {
        if (milestone == -1) {
            milestone = this.getMilestone()
        }
        return milestone * this.levelsPerMilestone()
    }
    getMilestoneReductionName() : string {
        // Milestone reduction is dependent on key
        switch(this.key) {
            case HackKeys.STAT:
                return 'hackMilestoneReductionStat'
            case HackKeys.ADVENTURE :
                return 'hackMilestoneReductionAdventure'
            case HackKeys.TIME_MACHINE :
                return 'hackMilestoneReductionTimeMachine'
            case HackKeys.DROP_CHANCE :
                return 'hackMilestoneReductionDropChance'
            case HackKeys.AUGMENT_SPEED:
                return 'hackMilestoneReductionAugment'
            case HackKeys.ENERGY_NGU :
                return 'hackMilestoneReductionENGU'
            case HackKeys.MAGIC_NGU :
                return 'hackMilestoneReductionMNGU'
            case HackKeys.BLOOD:
                return 'hackMilestoneReductionBlood'
            case HackKeys.QUEST:
                return 'hackMilestoneReductionQP'
            case HackKeys.DAYCARE:
                return 'hackMilestoneReductionDaycare'
            case HackKeys.EXP:
                return 'hackMilestoneReductionExp'
            case HackKeys.NUMBER:
                return 'hackMilestoneReductionNumber'
            case HackKeys.PP:
                return 'hackMilestoneReductionPP'
            case HackKeys.HACK:
                return 'hackMilestoneReductionHack'
            case HackKeys.WISH:
                return 'hackMilestoneReductionWish'
        }
        return '' 
    }

    getMilestoneExtraName() : string {
        // Milestone extra is dependent on key
        switch(this.key) {
            case HackKeys.STAT:
                return 'hackMilestoneExtraStat'
            case HackKeys.ADVENTURE :
                return 'hackMilestoneExtraAdventure'
            case HackKeys.TIME_MACHINE :
                return 'hackMilestoneExtraTimeMachine'
            case HackKeys.DROP_CHANCE :
                return 'hackMilestoneExtraDropChance'
            case HackKeys.AUGMENT_SPEED:
                return 'hackMilestoneExtraAugment'
            case HackKeys.ENERGY_NGU :
                return 'hackMilestoneExtraENGU'
            case HackKeys.MAGIC_NGU :
                return 'hackMilestoneExtraMNGU'
            case HackKeys.BLOOD:
                return 'hackMilestoneExtraBlood'
            case HackKeys.QUEST:
                return 'hackMilestoneExtraQP'
            case HackKeys.DAYCARE:
                return 'hackMilestoneExtraDaycare'
            case HackKeys.EXP:
                return 'hackMilestoneExtraExp'
            case HackKeys.NUMBER:
                return 'hackMilestoneExtraNumber'
            case HackKeys.PP:
                return 'hackMilestoneExtraPP'
            case HackKeys.HACK:
                return 'hackMilestoneExtraHack'
            case HackKeys.WISH:
                return 'hackMilestoneExtraWish'
        }
        return '' 
    }
    getTargetName() : string {
        // Milestone reduction is dependent on key
        switch(this.key) {
            case HackKeys.STAT:
                return 'hackStatTarget'
            case HackKeys.ADVENTURE :
                return 'hackAdventureTarget'
            case HackKeys.TIME_MACHINE :
                return 'hackTimeMachineTarget'
            case HackKeys.DROP_CHANCE :
                return 'hackDropChanceTarget'
            case HackKeys.AUGMENT_SPEED:
                return 'hackAugmentTarget'
            case HackKeys.ENERGY_NGU :
                return 'hackENGUTarget'
            case HackKeys.MAGIC_NGU :
                return 'hackMNGUTarget'
            case HackKeys.BLOOD:
                return 'hackBloodTarget'
            case HackKeys.QUEST:
                return 'hackQPTarget'
            case HackKeys.DAYCARE:
                return 'hackDaycareTarget'
            case HackKeys.EXP:
                return 'hackExpTarget'
            case HackKeys.NUMBER:
                return 'hackNumberTarget'
            case HackKeys.PP:
                return 'hackPPTarget'
            case HackKeys.HACK:
                return 'hackHackTarget'
            case HackKeys.WISH:
                return 'hackWishTarget'
        }
        return '' 
    }

    getLevelFromVal(value : number) : number {
        // Due to the milestones, there's no "nice" way to do this other than looping.
        let prop = Object.keys(this.base)[0]
        let level = this.level
        let val = this.getStatValue(prop)
        // First go down
        while(val > value) {
            level = level - 1
            val = this.getStatValue(prop, level)
        }
        // Then go up
        while(val < value){
            level = level + 1
            val = this.getStatValue(prop, level)
        }

        return level
    }

    getSpeed(res3cap : bigDecimal, res3pow : bigDecimal, hackSpeed : bigDecimal, level : number = -1) : bigDecimal {
        if(level == -1) {
            level = this.level
        }
        try {
            let denominator = res3cap.multiply(res3pow).multiply(hackSpeed)
            return bd(this.baseSpeedDivider)
                    .multiply(bd(1.0078**level))
                    .multiply(bd(level + 1))
                    .multiply(bd(100/50)) // 50 ticks per seconds
                    .divide(denominator)
                    
        } catch {
            return bd(1)
        }
    }

    getTimeBetweenLevels(res3cap : bigDecimal, res3pow : bigDecimal, hackSpeed : bigDecimal, targetLevel :number, level : number = -1, withSpeedChange : boolean = false) : bigDecimal {
        if(level == -1) {
            level = this.level
        }

        try {
            // If we're doing with a speed change, we go one at a time
            if (this.key == HackKeys.HACK && withSpeedChange) {
                let X = bd(this.baseSpeedDivider)
                        .multiply(bd(100))
                        .divide(
                            res3cap.multiply(res3pow)
                        )
                let time = bd(0)
                let a = 1.0078
                let bonusHackSpeed = hackSpeed.divide(bd(this.getStatValue(Stat.HACK_SPEED)))
                for(let i = level; i < targetLevel; i++) {
                    time = time.add(X.multiply(bd(a**i * (i+1)).divide(bonusHackSpeed.multiply(bd(this.getStatValue('', i)))))).ceil()
                }
                return time.divide(bd(50))
            }

            let denominator = res3cap.multiply(res3pow).multiply(hackSpeed)
        
            return (this.getFullSum(targetLevel).subtract(this.getFullSum(level)))
                .multiply(bd(this.baseSpeedDivider))
                .multiply(bd(100 / 50)) // 50 ticks per seconds
                .divide(denominator)
        } catch {
            return bd(1)
        }
    }

    getFullSum(level: number = -1) : bigDecimal{
        if(level == -1) {
            level = this.level
        }

        const a = 1.0078
        return bd( 1 + (a * level + a - level - 2) * a**(level + 1))
                .divide(bd((1 - a)**2))
        
    }

    getNextMilestone(level : number = -1) : number {
        if(level == -1) {
            level = this.level
        }

        const levelsPerMilestone = this.levelsPerMilestone()
        const milestones = this.getMilestone(level)
        return (milestones + 1) * levelsPerMilestone
    }

    getPreviousMilestone(level : number = -1) : number {
        if(level == -1) {
            level = this.level
        }

        const levelsPerMilestone = this.levelsPerMilestone()
        const milestones = this.getMilestone(level)
        const lvl = milestones * levelsPerMilestone
        if (lvl == level) {
            return (milestones - 1) * levelsPerMilestone
        }
        return lvl
    }

    getMaxLevelHackDay(res3cap : bigDecimal, res3pow : bigDecimal, hackSpeed : bigDecimal) : number {
        let level = this.getNextMilestone()

        const maxTime = bd(this.getMaxTimeHackDay())

        // var t = this.getTimeBetweenLevels(res3cap, res3pow, hackSpeed, level)
        // if(isOne(t)) {
        //     return level - levelsPerMilestone
        // }
        // while (lessThan(t, maxTime)) { 
        //     level = level + levelsPerMilestone
        //     t = this.getTimeBetweenLevels(res3cap, res3pow, hackSpeed, level)
        // }
        
        // return level - levelsPerMilestone

        // We use math to find a smaller equation.
        const a = 1.0078
        const sigfig = 12
        const gt = maxTime
                    .multiply(res3cap)
                    .multiply(res3pow)
                    .multiply(hackSpeed)
                    .multiply(bd(50/100))
                    .multiply(bd((1 - a)**2))
                    .divide(bd(this.baseSpeedDivider), sigfig)
                .add(
                    bd((a * this.level - this.level - 1) * a**(this.level))
                )

        // var level = this.level + levelsPerMilestone
        let t = bd((a * level - 1 - level) * a**(level))
        while (lessThan(t, gt)) { 
            level = this.getNextMilestone(level)
            t = bd((a * level - 1 - level) * a**(level))
        }

        return this.getPreviousMilestone(level)
        
    }

    getMaxTimeHackDay() : number {
        // Milestone reduction is dependent on key
        // We go a little bit over as it's easier to go down than to go up
        switch(this.key) {
            case HackKeys.STAT:
                return 15 * 60 * 1.1
            case HackKeys.ADVENTURE :
                return 12 * 60 * 60
            case HackKeys.TIME_MACHINE :
                return 30 * 60 * 1.3
            case HackKeys.DROP_CHANCE :
                return 30 * 60 * 1.3
            case HackKeys.AUGMENT_SPEED:
                return 15 * 60 * 1.1
            case HackKeys.ENERGY_NGU :
                return 60 * 60 * 1.2
            case HackKeys.MAGIC_NGU :
                return 60 * 60 * 1.2
            case HackKeys.BLOOD:
                return 30 * 60 * 1.3
            case HackKeys.QUEST:
                return 6 * 60 * 60 * 1.05
            case HackKeys.DAYCARE:
                return 30 * 60 * 1.3
            case HackKeys.EXP:
                return 6 * 60 * 60 * 1.05
            case HackKeys.NUMBER:
                return 15 * 60 * 1.1
            case HackKeys.PP:
                return 6 * 60 * 60 * 1.05
            case HackKeys.HACK:
                return 0
            case HackKeys.WISH:
                return 60 * 60 * 1.1
        }
        return 0
    }
}




export const HACKLIST = [
    new Hack(0, HackKeys.STAT, 'Attack/Defense Hack', GameMode.EVIL, [[Stat.ATTACK, 2.5], [Stat.DEFENSE, 2.5]], 10, 1.025, bd('1e8'), 7720),
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