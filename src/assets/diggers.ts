import { Stat } from "./stat"
import Resource, { ResourceContainer, prop } from "./resource"

export class Digger extends Resource {
    constructor(id: number, key: string, name: string, level: number, props: prop) {
        super(id, key, name, level, props)
        this.active = false
        this.maxLevel = level
    }
    setMaxLevel(maxLevel: number) {
        this.maxLevel = maxLevel
    }
    updateStats() {
        for (var prop of this.statnames) {
            switch(this.id) {
                case 0: // DC
                case 1: // Wandoos
                case 10: // Blood
                    this[prop] = 150 + this.level
                    break;
                case 2: // Stat
                    this[prop] = 200 + this.level ** 3
                    break;
                case 3: // Adventure
                    this[prop] = 110 + this.level / 2
                    break;
                case 4: // Energy NGU
                case 5: // Magic NGU
                case 6: // Energy Beard
                case 7: // Magic Beard
                    this[prop] = 120 + this.level
                    break;
                case 8: // PP
                    this[prop] = 110 + this.level
                    break;
                case 9: // Daycare
                    this[prop] = 105 + 0.1 * this.level
                    break;
                case 11: // Exp
                    this[prop] = 105 + 0.5 * this.level
                    break;
                
            }
        }
    }
}


export const DIGGERLIST = [
    new Digger(0, 'dropChanceDigger', 'Drop Chance Digger',  0, [[Stat.DROP_CHANCE, 1],]),
    new Digger(1, 'wandoosDigger', 'Wandoos Digger',  0, [[Stat.WANDOOS_SPEED, 1],]),
    new Digger(2, 'statDigger', 'Stat Digger',  0, [[Stat.ATTACK, 1],[ Stat.DEFENSE, 1]]),
    new Digger(3, 'adventureDigger', 'Adventure Digger',  0, [[Stat.POWER, 1], [Stat.TOUGHNESS, 1]]),

    new Digger(4, 'energyNGUDigger', 'Energy NGU Digger',  0, [[Stat.ENERGY_NGU_SPEED, 1],]),
    new Digger(5, 'magicNGUDigger', 'Magic NGU Digger',  0, [[Stat.MAGIC_NGU_SPEED, 1],]),
    new Digger(6, 'energyBeardDigger', 'Energy Beard Digger',  0, [[Stat.ENERGY_BEARD_SPEED, 1],]),
    new Digger(7, 'magicBeardDigger', 'Magic Beard Digger',  0, [[Stat.MAGIC_BEARD_SPEED, 1],]),

    new Digger(8, 'PPDigger', 'PP Digger',  0, [[Stat.PP, 1],]),
    new Digger(9, 'daycareDigger', 'Daycare Digger',  0, [[Stat.DAYCARE_SPEED, 1],]),
    new Digger(10, 'bloodDigger', 'Blood Digger',  0, [[Stat.BLOOD, 1],]),
    new Digger(11, 'experienceDigger', 'EXP Digger',  0, [[Stat.EXPERIENCE, 1],]),
]

export var DIGGERS = new ResourceContainer(DIGGERLIST);