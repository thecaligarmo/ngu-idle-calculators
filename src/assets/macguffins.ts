import { Stat } from "./stat"
import Resource, { ResourceContainer, prop } from "./resource"

export class MacGuffin extends Resource {
    constructor(id: number, key: string, name: string, level: number, props: prop) {
        super(id, key, name, level, props)
        this.active = false
    }
    updateStats() {
        // Don't do anything
    }
    importStats(data : any) : void{
        for (var prop of Object.keys(this.base)) {
            this[prop] = data[this.id]
        }
    }
}


export const MACGUFFINLIST = [
    new MacGuffin(0, 'energyPowerMacGuffin', 'Energy Power MacGuffin', 0, [[Stat.ENERGY_POWER, 1]]),
    new MacGuffin(1, 'magicPowerMacGuffin', 'Magic Power MacGuffin', 0, [[Stat.MAGIC_POWER, 1]]),
    new MacGuffin(2, 'energyCapMacGuffin', 'Energy Cap MacGuffin', 0, [[Stat.ENERGY_CAP, 1]]),
    new MacGuffin(3, 'magicCapMacGuffin', 'Magic Cap MacGuffin', 0, [[Stat.MAGIC_CAP, 1]]),
    new MacGuffin(4, 'energyNGUMacGuffin', 'Energy NGU MacGuffin', 0, [[Stat.ENERGY_NGU_SPEED, 1]]),
    new MacGuffin(5, 'magicNGUMacGuffin', 'Magic NGU MacGuffin', 0, [[Stat.MAGIC_NGU_SPEED, 1]]),
    new MacGuffin(6, 'energyBarMacGuffin', 'Energy Bar MacGuffin', 0, [[Stat.ENERGY_BARS, 1]]),
    new MacGuffin(7, 'magicBarMacGuffin', 'Magic Bar MacGuffin', 0, [[Stat.MAGIC_BARS, 1]]),
    new MacGuffin(8, 'sEXYMacGuffin', 'SEXY MacGuffin', 0, []),
    new MacGuffin(9, 'sMARTMacGuffin', 'SMART MacGuffin', 0, []),

    new MacGuffin(10, 'dropChanceMacGuffin', 'Drop Chance MacGuffin', 0, [[Stat.DROP_CHANCE, 1]]),
    new MacGuffin(11, 'goldenMacGuffin', 'Golden MacGuffin', 0, [[Stat.GOLD_DROP, 1]]),
    new MacGuffin(12, 'augmentMacGuffin', 'Augment MacGuffin', 0, [[Stat.AUGMENT_SPEED, 1]]),
    new MacGuffin(13, 'statMacGuffin', 'Stat MacGuffin', 0, [[Stat.ATTACK, 1], [Stat.DEFENSE, 1]]),
    new MacGuffin(14, 'energyWandoosMacGuffin', 'Energy Wandoos MacGuffin', 0, [[Stat.ENERGY_WANDOOS_SPEED, 1]]),
    new MacGuffin(15, 'magicWandoosMacGuffin', 'Magic Wandoos MacGuffin', 0, [[Stat.MAGIC_WANDOOS_SPEED, 1]]),
    new MacGuffin(16, 'adventureMacGuffin', 'Adventure MacGuffin', 0, [[Stat.POWER, 1], [Stat.TOUGHNESS, 1]]),
    new MacGuffin(17, 'numberMacGuffin', 'Number MacGuffin', 0, [[Stat.NUMBER, 1]]),
    new MacGuffin(18, 'bloodMacGuffin', 'Blood MacGuffin', 0, [[Stat.BLOOD, 1]]),
    new MacGuffin(19, 'resource3PowerMacGuffin', 'Resource 3 Power MacGuffin', 0, [[Stat.RES3_POWER, 1]]),

    new MacGuffin(20, 'resource3CapMacGuffin', 'Resource 3 Cap MacGuffin', 0, [[Stat.RES3_CAP, 1]]),
    new MacGuffin(21, 'resource3BarMacGuffin', 'Resource 3 Bar MacGuffin', 0, [[Stat.RES3_BARS, 1]]),

]

export var MACGUFFINS = new ResourceContainer(MACGUFFINLIST);