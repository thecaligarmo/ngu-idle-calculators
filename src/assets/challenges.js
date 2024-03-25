import { Stat } from "./stat"
import Resource, { ResourceContainer } from "./resource"

export class Challenge extends Resource{
    constructor(id, name, level, props = [], extraProps=[]) {
        super(id, name, level, props)
        this.extraProps = extraProps
        this.updateStats()
    }
    updateStats() {
        for (var prop of this.statnames) {
            this[prop] = this.level * this.base[prop]
        }
        if (this.extraProps) {
            for (var prop of this.extraProps) {
                if (this.level >= prop[2]) {
                    if (this.statnames.includes(prop[0])) {
                        this[prop[0]] += prop[1]
                    } else {
                        this[prop[0]] = prop[1]
                    }
                }
            }
        }
    }
    importStats(data) {
        this.level = data.curCompletions
        this.updateStats()
    }
}

export const CHALLENGELIST = [
    new Challenge(0, 'Basic Challenge', 0, [[Stat.POWER, 5], [Stat.TOUGHNESS, 5]], [[Stat.POWER, 10, 1], [Stat.TOUGHNESS, 10, 1]]),
    new Challenge(1, 'No Augmentations Challenge', 0, [[Stat.AUGMENT_SPEED, 25]], [[Stat.AUGMENT_SPEED, 10, 1]]),
    new Challenge(2, '24 Hour Challenge', 0, [], []),
    new Challenge(3, '100 Levels Challenge', 0, [[Stat.WANDOOS_SPEED, 20],], []),
    new Challenge(4, 'No Equipment Challenge', 0, [], []),
    new Challenge(5, 'Troll Challenge', 0, [], []),
    new Challenge(6, 'No Rebirth Challenge', 0, [], []),
    new Challenge(7, 'Laser Sword Challenge', 0, [], []),
    new Challenge(8, 'Blind Challenge', 0, [[Stat.DAYCARE_SPEED, 1]], [[Stat.DAYCARE_SPEED, 5, 1]]),
    new Challenge(9, 'No NGU Challenge', 0, [[Stat.ENERGY_NGU_SPEED, 5], [Stat.MAGIC_NGU_SPEED, 5]], []),
    new Challenge(10, 'No Time Machine Challenge', 0, [[Stat.TIME_MACHINE, 100]], []),
    
]

export var CHALLENGES = new ResourceContainer(CHALLENGELIST.map((challenge) => {
    return [challenge.id, challenge];
}));