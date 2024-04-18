import { Stat } from "./stat"
import Resource, { ResourceContainer, prop } from "./resource"

export class Challenge extends Resource {
    extraProps: any[]

    constructor(id: number, key: string, name: string, level: number, props: prop, extraProps: prop = []) {
        super(id, key, name, level, props)
        this.extraProps = extraProps
        this.updateStats()
    }

    updateStats() {
        for (var prop of this.statnames) {
            this[prop] = this.level * this.base[prop]
        }
        if (this.extraProps) {
            for (var eprop of this.extraProps) {
                if (this.level >= eprop[2]) {
                    if (this.statnames.includes(eprop[0])) {
                        this[eprop[0]] += eprop[1]
                    } else {
                        this[eprop[0]] = eprop[1]
                    }
                }
            }
        }
    }
    importStats(data: any) {
        this.level = data.curCompletions
        this.updateStats()
    }
}

export const CHALLENGELIST = [
    new Challenge(0, 'basicChallenge', 'Basic Challenge',  0, [[Stat.POWER, 5], [Stat.TOUGHNESS, 5]], [[Stat.POWER, 10, 1], [Stat.TOUGHNESS, 10, 1]]),
    new Challenge(1, 'noAugmentationsChallenge', 'No Augmentations Challenge',  0, [[Stat.AUGMENT_SPEED, 25]], [[Stat.AUGMENT_SPEED, 10, 1]]),
    new Challenge(2, '24HourChallenge', '24 Hour Challenge',  0, [], []),
    new Challenge(3, '100LevelsChallenge', '100 Levels Challenge',  0, [[Stat.ENERGY_WANDOOS_SPEED, 20],[Stat.MAGIC_WANDOOS_SPEED, 20]], []),
    new Challenge(4, 'noEquipmentChallenge', 'No Equipment Challenge',  0, [], []),
    new Challenge(5, 'trollChallenge', 'Troll Challenge',  0, [], []),
    new Challenge(6, 'noRebirthChallenge', 'No Rebirth Challenge',  0, [], []),
    new Challenge(7, 'laserSwordChallenge', 'Laser Sword Challenge',  0, [], []),
    new Challenge(8, 'blindChallenge', 'Blind Challenge',  0, [[Stat.DAYCARE_SPEED, 1]], [[Stat.DAYCARE_SPEED, 5, 1]]),
    new Challenge(9, 'noNGUChallenge', 'No NGU Challenge',  0, [[Stat.ENERGY_NGU_SPEED, 5], [Stat.MAGIC_NGU_SPEED, 5]], []),
    new Challenge(10, 'noTimeMachineChallenge', 'No Time Machine Challenge',  0, [[Stat.TIME_MACHINE, 100]], []),
    
]

export var CHALLENGES = new ResourceContainer(CHALLENGELIST);