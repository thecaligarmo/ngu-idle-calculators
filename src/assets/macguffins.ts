import { Stat } from "./stat"
import Resource, { ResourceContainer, prop } from "./resource"
import { GameMode } from "./mode"

export class MacGuffin extends Resource {
    constructor(id: number, key: string, name: string, props: prop) {
        super(id, key, name, GameMode.ALL, 0, props)
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
    new MacGuffin(0, 'energyPowerMacGuffin', 'Energy Power MacGuffin', [[Stat.ENERGY_POWER, 1]]),
    new MacGuffin(1, 'energyCapMacGuffin', 'Energy Cap MacGuffin', [[Stat.ENERGY_CAP, 1]]),
    new MacGuffin(2, 'magicPowerMacGuffin', 'Magic Power MacGuffin', [[Stat.MAGIC_POWER, 1]]),
    new MacGuffin(3, 'magicCapMacGuffin', 'Magic Cap MacGuffin', [[Stat.MAGIC_CAP, 1]]),
    new MacGuffin(4, 'energyNGUMacGuffin', 'Energy NGU MacGuffin', [[Stat.ENERGY_NGU_SPEED, 1]]),
    new MacGuffin(5, 'magicNGUMacGuffin', 'Magic NGU MacGuffin', [[Stat.MAGIC_NGU_SPEED, 1]]),
    new MacGuffin(6, 'energyBarMacGuffin', 'Energy Bar MacGuffin', [[Stat.ENERGY_BARS, 1]]),
    new MacGuffin(7, 'magicBarMacGuffin', 'Magic Bar MacGuffin', [[Stat.MAGIC_BARS, 1]]),
    new MacGuffin(8, 'sEXYMacGuffin', 'SEXY MacGuffin', []),
    new MacGuffin(9, 'sMARTMacGuffin', 'SMART MacGuffin', []),

    new MacGuffin(10, 'dropChanceMacGuffin', 'Drop Chance MacGuffin', [[Stat.DROP_CHANCE, 1]]),
    new MacGuffin(11, 'goldenMacGuffin', 'Golden MacGuffin', [[Stat.GOLD_DROP, 1]]),
    new MacGuffin(12, 'augmentMacGuffin', 'Augment MacGuffin', [[Stat.AUGMENT_SPEED, 1]]),
    new MacGuffin(13, 'energyWandoosMacGuffin', 'Energy Wandoos MacGuffin', [[Stat.ENERGY_WANDOOS_SPEED, 1]]),

    // Numbers after this aren't necessarily correct
    new MacGuffin(14, 'magicWandoosMacGuffin', 'Magic Wandoos MacGuffin', [[Stat.MAGIC_WANDOOS_SPEED, 1]]),
    new MacGuffin(15, 'numberMacGuffin', 'Number MacGuffin', [[Stat.NUMBER, 1]]),
    new MacGuffin(16, 'bloodMacGuffin', 'Blood MacGuffin', [[Stat.BLOOD, 1]]),
    new MacGuffin(17, 'adventureMacGuffin', 'Adventure MacGuffin', [[Stat.POWER, 1], [Stat.TOUGHNESS, 1]]),
    new MacGuffin(18, 'statMacGuffin', 'Stat MacGuffin', [[Stat.ATTACK, 1], [Stat.DEFENSE, 1]]),
    new MacGuffin(19, 'resource3PowerMacGuffin', 'Resource 3 Power MacGuffin', [[Stat.RES3_POWER, 1]]),
    new MacGuffin(20, 'resource3CapMacGuffin', 'Resource 3 Cap MacGuffin', [[Stat.RES3_CAP, 1]]),
    new MacGuffin(21, 'resource3BarMacGuffin', 'Resource 3 Bar MacGuffin', [[Stat.RES3_BARS, 1]]),
]

export var MACGUFFINS = new ResourceContainer(MACGUFFINLIST);