import { Stat } from "./stat"
import Resource, { ResourceContainer } from "./resource"

export class AdvTraining extends Resource{
    updateStats() {
        for (var prop of Object.keys(this.base)) {
            if (this.key == 'adventureToughness' || this.key == 'adventurePower') {
                this[prop] = this.level ** 0.4 * 10
            } else if (this.key =='blockDamage') {
                this[prop] = Math.floor( (this.level + 50) / (this.level + 100))
            } else {
                this[prop] = this.level * this.base[prop]
            }
        }
    }
}


export const ADVTRAININGLIST = [
    new AdvTraining(0, 'adventureToughness', 'The Fu Manchu', 0, [[Stat.TOUGHNESS, 1]]),
    new AdvTraining(1, 'adventurePower', 'The Neckbeard', 0, [[Stat.POWER, 1]]),
    new AdvTraining(2, 'blockDamage', 'The Revese Hitler', 0, []),
    new AdvTraining(3, 'wandoosEnergyDump', 'The Beard Cage', 0, [[Stat.WANDOOS_SPEED, 1]]),
    new AdvTraining(4, 'wandoosMagicDump', 'The LadyBeard', 0, [[Stat.WANDOOS_SPEED, 1]]),
]

export var ADVTRAININGS = new ResourceContainer(ADVTRAININGLIST);