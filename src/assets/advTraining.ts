import { GameMode } from "./mode";
import Resource, { ResourceContainer } from "./resource";
import { Stat } from "./stat";

export class AdvTraining extends Resource {
    updateStats() {
        for (const prop of Object.keys(this.base)) {
            if (this.key == "adventureToughness" || this.key == "adventurePower") {
                this[prop] = this.level ** 0.4 * 10;
            } else if (this.key == "blockDamage") {
                this[prop] = Math.floor((this.level + 50) / (this.level + 100));
            } else {
                this[prop] = this.level * this.base[prop];
            }
        }
    }
}

export const ADVTRAININGLIST = [
    new AdvTraining(0, "adventureToughness", "The Fu Manchu", GameMode.ALL, 0, [
        [Stat.TOUGHNESS, 1],
        [Stat.REGEN, 1],
    ]),
    new AdvTraining(1, "adventurePower", "The Neckbeard", GameMode.ALL, 0, [
        [Stat.POWER, 1],
        [Stat.HEALTH, 1],
    ]),
    new AdvTraining(2, "blockDamage", "The Revese Hitler", GameMode.ALL, 0, []),
    new AdvTraining(3, "wandoosEnergyDump", "The Beard Cage", GameMode.ALL, 0, [[Stat.ENERGY_WANDOOS_SPEED, 1]]),
    new AdvTraining(4, "wandoosMagicDump", "The LadyBeard", GameMode.ALL, 0, [[Stat.MAGIC_WANDOOS_SPEED, 1]]),
];

export const ADVTRAININGS = new ResourceContainer(ADVTRAININGLIST);
