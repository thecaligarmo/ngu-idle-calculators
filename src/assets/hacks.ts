import { bd, bigdec_equals, isOne, lessThan } from "@/helpers/numbers"
import bigDecimal from "js-big-decimal"
import _, { isEqual } from "lodash"
import { GameMode } from "./mode"
import Resource, { ResourceContainer, prop } from "./resource"
import { Stat } from "./stat"

const HackKeys : {[key: string]: string} = {
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
        for (var prop of Object.keys(this.base)) {
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
            return (100 + this[prop]) * this.getMilestoneBonus(level)
        }
        return 100
    }

    levelsPerMilestone() : number {
        return this.baseMilestone - this.milestoneReduction
    }

    getMilestoneBonus(level : number = -1) : number {
        if(level == -1) {
            level = this.level
        }
        var numMilestones = Math.floor(level / (this.levelsPerMilestone()))
        return this.milestoneBonus ** numMilestones
    }

    getMilestoneName() : string {
        // Milestone reduction is dependent on key
        switch(this.key) {
            case HackKeys.STAT:
                return 'hackMilestoneStat'
            case HackKeys.ADVENTURE :
                return 'hackMilestoneAdventure'
            case HackKeys.TIME_MACHINE :
                return 'hackMilestoneTimeMachine'
            case HackKeys.DROP_CHANCE :
                return 'hackMilestoneDropChance'
            case HackKeys.AUGMENT_SPEED:
                return 'hackMilestoneAugment'
            case HackKeys.ENERGY_NGU :
                return 'hackMilestoneENGU'
            case HackKeys.MAGIC_NGU :
                return 'hackMilestoneMNGU'
            case HackKeys.BLOOD:
                return 'hackMilestoneBlood'
            case HackKeys.QUEST:
                return 'hackMilestoneQP'
            case HackKeys.DAYCARE:
                return 'hackMilestoneDaycare'
            case HackKeys.EXP:
                return 'hackMilestoneExp'
            case HackKeys.NUMBER:
                return 'hackMilestoneNumber'
            case HackKeys.PP:
                return 'hackMilestonePP'
            case HackKeys.HACK:
                return 'hackMilestoneHack'
            case HackKeys.WISH:
                return 'hackMilestoneWish'
        }
        return '' 
    }

    getLevelFromVal(value : number) : number {
        var prop = Object.keys(this.base)[0]
        var level = Math.log(value / (100 + this[prop])) / Math.log(this.milestoneBonus)  * (this.levelsPerMilestone())
        return Math.round(level)
    }

    getSpeed(res3cap : bigDecimal, res3pow : bigDecimal, hackSpeed : bigDecimal, level : number = -1) : bigDecimal {
        if(level == -1) {
            level = this.level
        }
        try {
            return bd(this.baseSpeedDivider)
                    .multiply(bd(1.0078**level))
                    .multiply(bd(level + 1))
                    .divide(res3cap)
                    .divide(res3pow)
                    .divide(hackSpeed).multiply(bd(100))
                    .divide(bd(50)) // 50 ticks per seconds
        } catch {
            return bd(1)
        }
    }

    getTimeBetweenLevels(res3cap : bigDecimal, res3pow : bigDecimal, hackSpeed : bigDecimal, targetLevel :number, level : number = -1) : bigDecimal {
        if(level == -1) {
            level = this.level
        }

        var tl = this.getFullSum(targetLevel)
        var tl1 = this.getFullSum(targetLevel - 1)
        var ll = this.getFullSum(level)
        if(this.id == 0) {
            console.log(this.id, tl.subtract(tl1), tl1.subtract(ll))
            console.log(tl.subtract(tl1).add(tl1.subtract(ll)), tl.subtract(ll))
            console.log(bigdec_equals(tl.subtract(tl1).add(tl1.subtract(ll)), tl.subtract(ll)))
            console.log(this.getSpeed(res3cap, res3pow, hackSpeed, targetLevel - 1), this.getSpeed(res3cap, res3pow, hackSpeed, level))

        }

        try {
            return (this.getFullSum(targetLevel).subtract(this.getFullSum(level)))
                .multiply(bd(this.baseSpeedDivider))
                .divide(res3cap, 500)
                .divide(res3pow, 500)
                .divide(hackSpeed, 500).multiply(bd(100))
                .divide(bd(50), 500) // 50 ticks per seconds
        } catch {
            return bd(1)
        }
    }

    getFullSum(level: number = -1) : bigDecimal{
        if(level == -1) {
            level = this.level
        }
        return bd(1 - ( (level + 1) * 1.0078**(level)))
                .divide(bd(1-1.0078), 50)
                .add(
                    bd(1.0078 - 1.0078**(level + 1)).divide(bd((1 - 1.0078)**2), 50)
                )
    }

    getMaxLevelHackDay(res3cap : bigDecimal, res3pow : bigDecimal, hackSpeed : bigDecimal) : number {
        var levelsPerMilestone = this.levelsPerMilestone()
        var level = this.level + levelsPerMilestone
        var maxTime = bd(this.getMaxTimeHackDay())
        var t = this.getTimeBetweenLevels(res3cap, res3pow, hackSpeed, level)
        if(isOne(t)) {
            return level - levelsPerMilestone
        }
        while (lessThan(t, maxTime)) { 
            level = level + levelsPerMilestone
            t = this.getTimeBetweenLevels(res3cap, res3pow, hackSpeed, level)
        }
        
        return level - levelsPerMilestone
    }

    getMaxTimeHackDay() : number {
        // Milestone reduction is dependent on key
        switch(this.key) {
            case HackKeys.STAT:
                return 15 * 60
            case HackKeys.ADVENTURE :
                return 12 * 60 * 60
            case HackKeys.TIME_MACHINE :
                return 30 * 60
            case HackKeys.DROP_CHANCE :
                return 30 * 60
            case HackKeys.AUGMENT_SPEED:
                return 15 * 60
            case HackKeys.ENERGY_NGU :
                return 60 * 60
            case HackKeys.MAGIC_NGU :
                return 60 * 60
            case HackKeys.BLOOD:
                return 30 * 60
            case HackKeys.QUEST:
                return 6 * 60 * 60
            case HackKeys.DAYCARE:
                return 30 * 60
            case HackKeys.EXP:
                return 6 * 60 * 60
            case HackKeys.NUMBER:
                return 15 * 60
            case HackKeys.PP:
                return 6 * 60 * 60
            case HackKeys.HACK:
                return 0
            case HackKeys.WISH:
                return 60 * 60
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