import { GameMode } from "./mode";
import Resource, { ResourceContainer, prop } from "./resource";
import { Stat } from "./stat";

export const ChallengeKeys : {[key: string]: string} = {
    BASIC: 'BasicChallenge',
    NO_AUG : 'NoAugmentationsChallenge',
    TWENTY_FOUR : '24HourChallenge',
    ONE_HUNDRED : '100LevelsChallenge',
    NO_EQUIP : 'NoEquipmentChallenge',
    TROLL : 'TrollChallenge',
    NO_RB : 'NoRebirthChallenge',
    LASER_SWORD : 'LaserSwordChallenge',
    BLIND : 'BlindChallenge',
    NO_NGU : 'NoNGUChallenge',
    NO_TM: 'NoTimeMachineChallenge',
} as const satisfies {[key: string]: string};

function getModeKey(key: string , mode: number) {
    if (mode == GameMode.NORMAL) {
        key = 'normal' + key
    } else if (mode == GameMode.EVIL) {
        key = 'evil' + key
    } else if (mode == GameMode.SADISTIC) {
        key = 'sadistic' + key
    }
    return key
}

export class Challenge extends Resource {
    extraProps: any[]

    constructor(id: number, key: string, name: string, mode : number, props: prop, extraProps: prop = []) {

        super(id, getModeKey(key, mode), name, mode, 0, props)
        this.extraProps = extraProps
        this.updateStats()
    }

    updateStats() {
        for (const prop of this.statnames) {
            this[prop] = this.level * this.base[prop]
        }
        if (this.extraProps) {
            for (const eprop of this.extraProps) {
                if (this.level >= eprop[2]) {
                    if (this.statnames.includes(eprop[0])) {
                        if(eprop[0] == Stat.AUGMENT_SPEED) {
                            this[eprop[0]] = ((this[eprop[0]] + 100) * (eprop[1] + 100) / 100) - 100
                        } else {
                            this[eprop[0]] += eprop[1]
                        }
                    } else {
                        this[eprop[0]] = eprop[1]
                    }
                }
            }
        }
    }
    importStats(data: any) {
        if(this.mode == GameMode.NORMAL) {
            if(this.key == getModeKey(ChallengeKeys.BASIC, GameMode.NORMAL)) {
                this.level = data.curCompletions - data.curEvilCompletions - data.curSadisticCompletions
            } else {
                this.level = data.curCompletions
            }
        } else if (this.mode == GameMode.EVIL) {
            this.level = data.curEvilCompletions
        } else if (this.mode == GameMode.SADISTIC) {
            this.level = data.curSadisticCompletions
        }
        this.updateStats()
    }
}

export const CHALLENGELIST = [
    new Challenge(0, ChallengeKeys.BASIC, 'Normal Basic Challenge', GameMode.NORMAL, [[Stat.POWER, 5], [Stat.TOUGHNESS, 5], [Stat.HEALTH, 5], [Stat.REGEN, 5]], [[Stat.POWER, 10, 1], [Stat.TOUGHNESS, 10, 1], [Stat.HEALTH, 10, 1], [Stat.REGEN, 10, 1]]),
    new Challenge(1, ChallengeKeys.NO_AUG, 'Normal No Augmentations Challenge',  GameMode.NORMAL, [], [[Stat.AUGMENT_SPEED, 10, 1]]),
    new Challenge(2, ChallengeKeys.TWENTY_FOUR, 'Normal 24 Hour Challenge',  GameMode.NORMAL, [], []),
    new Challenge(3, ChallengeKeys.ONE_HUNDRED, 'Normal 100 Levels Challenge',  GameMode.NORMAL, [[Stat.ENERGY_WANDOOS_SPEED, 20],[Stat.MAGIC_WANDOOS_SPEED, 20]], []),
    new Challenge(4, ChallengeKeys.NO_EQUIP, 'Normal No Equipment Challenge',  GameMode.NORMAL, [], []),
    new Challenge(5, ChallengeKeys.TROLL, 'Normal Troll Challenge',  GameMode.NORMAL, [], []),
    new Challenge(6, ChallengeKeys.NO_RB, 'Normal No Rebirth Challenge',  GameMode.NORMAL, [], []),
    new Challenge(7, ChallengeKeys.LASER_SWORD, 'Normal Laser Sword Challenge',  GameMode.NORMAL, [], []),
    new Challenge(8, ChallengeKeys.BLIND, 'Normal Blind Challenge',  GameMode.NORMAL, [[Stat.DAYCARE_TIME, 1]], [[Stat.DAYCARE_TIME, 5, 1]]),
    new Challenge(9, ChallengeKeys.NO_NGU, 'Normal No NGU Challenge',  GameMode.NORMAL, [[Stat.ENERGY_NGU_SPEED, 5], [Stat.MAGIC_NGU_SPEED, 5]], []),
    new Challenge(10, ChallengeKeys.NO_TM, 'Normal No Time Machine Challenge',  GameMode.NORMAL, [[Stat.TIME_MACHINE, 100]], []),

    //id: number, key: string, name: string, mode : number, level: number, props: prop, extraProps: prop = []
    new Challenge(100, ChallengeKeys.BASIC, 'Evil Basic Challenge', GameMode.EVIL, [[Stat.POWER, 10], [Stat.TOUGHNESS, 10], [Stat.HEALTH, 10], [Stat.REGEN, 10]], []),
    new Challenge(101, ChallengeKeys.NO_AUG, 'Evil No Augmentations Challenge',  GameMode.EVIL, [[Stat.AUGMENT_SPEED, 5]], [[Stat.AUGMENT_SPEED, 25, 5]]),
    new Challenge(102, ChallengeKeys.TWENTY_FOUR, 'Evil 24 Hour Challenge',  GameMode.EVIL, [], []),
    new Challenge(103, ChallengeKeys.ONE_HUNDRED, 'Evil 100 Levels Challenge',  GameMode.EVIL, [], []),
    new Challenge(104, ChallengeKeys.NO_EQUIP, 'Evil No Equipment Challenge',  GameMode.EVIL, [], []),
    new Challenge(105, ChallengeKeys.TROLL, 'Evil Troll Challenge',  GameMode.EVIL, [], []),
    new Challenge(106, ChallengeKeys.NO_RB, 'Evil No Rebirth Challenge',  GameMode.EVIL, [], []),
    new Challenge(107, ChallengeKeys.LASER_SWORD, 'Evil Laser Sword Challenge',  GameMode.EVIL, [], []),
    new Challenge(108, ChallengeKeys.BLIND, 'Evil Blind Challenge',  GameMode.EVIL, [[Stat.DAYCARE_SPEED, 2]], []),
    new Challenge(109, ChallengeKeys.NO_NGU, 'Evil No NGU Challenge',  GameMode.EVIL, [[Stat.HACK_SPEED, 20]], []),
    new Challenge(110, ChallengeKeys.NO_TM, 'Evil No Time Machine Challenge',  GameMode.EVIL, [], [[Stat.GOLD_DROP, 100, 1]]),

    //id: number, key: string, name: string, mode : number, level: number, props: prop, extraProps: prop = []
    new Challenge(200, ChallengeKeys.BASIC, 'Sadistic Basic Challenge', GameMode.SADISTIC, [], []),
    new Challenge(201, ChallengeKeys.NO_AUG, 'Sadistic No Augmentations Challenge',  GameMode.SADISTIC, [], []),
    new Challenge(202, ChallengeKeys.TWENTY_FOUR, 'Sadistic 24 Hour Challenge',  GameMode.SADISTIC, [], []),
    new Challenge(203, ChallengeKeys.ONE_HUNDRED, 'Sadistic 100 Levels Challenge',  GameMode.SADISTIC, [], []),
    new Challenge(204, ChallengeKeys.NO_EQUIP, 'Sadistic No Equipment Challenge',  GameMode.SADISTIC, [], []),
    new Challenge(205, ChallengeKeys.TROLL, 'Sadistic Troll Challenge',  GameMode.SADISTIC, [], []),
    new Challenge(206, ChallengeKeys.NO_RB, 'Sadistic No Rebirth Challenge',  GameMode.SADISTIC, [], []),
    new Challenge(207, ChallengeKeys.LASER_SWORD, 'Sadistic Laser Sword Challenge',  GameMode.SADISTIC, [], []),
    new Challenge(208, ChallengeKeys.BLIND, 'Sadistic Blind Challenge',  GameMode.SADISTIC, [[Stat.DAYCARE_SPEED, 1]], []),
    new Challenge(209, ChallengeKeys.NO_NGU, 'Sadistic No NGU Challenge',  GameMode.SADISTIC, [], []),
    new Challenge(210, ChallengeKeys.NO_TM, 'Sadistic No Time Machine Challenge',  GameMode.SADISTIC, [], []),
]

export var CHALLENGES = new ResourceContainer(CHALLENGELIST);