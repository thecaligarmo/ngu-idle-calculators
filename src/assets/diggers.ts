import { Stat } from "./stat"
import Resource, { ResourceContainer, prop } from "./resource"
import { GameMode } from "./mode"

const DiggerKeys : {[key: string]: string} = {
    DROP_CHANCE : 'dropChanceDigger',
    WANDOOS: 'wandoosDigger',
    STAT: 'statDigger',
    ADVENTURE : 'adventureDigger',
    ENERGY_NGU : 'energyNGUDigger',
    MAGIC_NGU : 'magicNGUDigger',
    ENERGY_BEARD : 'energyBeardDigger',
    MAGIC_BEARD : 'magicBeardDigger',
    PP : 'PPDigger',
    DAYCARE : 'daycareDigger',
    BLOOD : 'bloodDigger',
    EXPERIENCE : 'experienceDigger',
} as const satisfies {[key: string]: string};

export class Digger extends Resource {
    constructor(id: number, key: string, name: string, props: prop) {
        super(id, key, name, GameMode.ALL, 0, props)
        this.active = false
        this.maxLevel = 0
    }
    setMaxLevel(maxLevel: number) {
        this.maxLevel = maxLevel
    }
    updateStats() {
        for (var prop of this.statnames) {
            switch(this.key) {
                case DiggerKeys.DROP_CHANCE:
                case DiggerKeys.WANDOOS:
                case DiggerKeys.BLOOD:
                    this[prop] = 150 + this.level
                    break;
                case DiggerKeys.STAT:
                    this[prop] = 200 + this.level ** 3
                    break;
                case DiggerKeys.ADVENTURE:
                    this[prop] = 110 + this.level / 2
                    break;
                case DiggerKeys.ENERGY_NGU:
                case DiggerKeys.MAGIC_NGU:
                case DiggerKeys.ENERGY_BEARD:
                case DiggerKeys.MAGIC_BEARD:
                    this[prop] = 120 + this.level
                    break;
                case DiggerKeys.PP:
                    this[prop] = 110 + this.level
                    break;
                case DiggerKeys.DAYCARE:
                    this[prop] = 105 + 0.1 * this.level
                    break;
                case DiggerKeys.EXPERIENCE:
                    this[prop] = 105 + 0.5 * this.level
                    break;
                
            }
        }
    }
}


export const DIGGERLIST = [
    new Digger(0, DiggerKeys.DROP_CHANCE, 'Drop Chance Digger', [[Stat.DROP_CHANCE, 1],]),
    new Digger(1, DiggerKeys.WANDOOS, 'Wandoos Digger', [[Stat.ENERGY_WANDOOS_SPEED, 1],[Stat.MAGIC_WANDOOS_SPEED, 1]]),
    new Digger(2, DiggerKeys.STAT, 'Stat Digger', [[Stat.ATTACK, 1],[ Stat.DEFENSE, 1]]),
    new Digger(3, DiggerKeys.ADVENTURE, 'Adventure Digger', [[Stat.POWER, 1], [Stat.TOUGHNESS, 1]]),

    new Digger(4, DiggerKeys.ENERGY_NGU, 'Energy NGU Digger', [[Stat.ENERGY_NGU_SPEED, 1],]),
    new Digger(5, DiggerKeys.MAGIC_NGU, 'Magic NGU Digger', [[Stat.MAGIC_NGU_SPEED, 1],]),
    new Digger(6, DiggerKeys.ENERGY_BEARD, 'Energy Beard Digger', [[Stat.ENERGY_BEARD_SPEED, 1],]),
    new Digger(7, DiggerKeys.MAGIC_BEARD, 'Magic Beard Digger', [[Stat.MAGIC_BEARD_SPEED, 1],]),

    new Digger(8, DiggerKeys.PP, 'PP Digger', [[Stat.PP, 1],]),
    new Digger(9, DiggerKeys.DAYCARE, 'Daycare Digger', [[Stat.DAYCARE_SPEED, 1],]),
    new Digger(10, DiggerKeys.BLOOD, 'Blood Digger', [[Stat.BLOOD, 1],]),
    new Digger(11, DiggerKeys.EXPERIENCE, 'EXP Digger', [[Stat.EXPERIENCE, 1],]),
]

export var DIGGERS = new ResourceContainer(DIGGERLIST);
