import { GameMode } from "./mode"
import Resource, { prop, ResourceContainer } from "./resource"
import { Stat } from "./stat"

const WANDOOS_OS : {[key: string]: number } = {
    NINETY_EIGHT : 0,
    MEH : 1,
    XL : 1
} as const satisfies {[key: string]: number};

export class Wandoos extends Resource{
    osLevel : number
    os : number

    constructor(id: number, key: string, name: string, mode : number, osLevel: number, props: prop) {
        super(id, key, name, mode, 0, props)
        this.osLevel = osLevel
        this.os = WANDOOS_OS.NINETY_EIGHT
        this.updateStats()
    }

    importStats(data: any) : void {
        let wandoosOSLevel = data.wandoos98.OSlevel
                            + data.wandoos98.pitOSLevels
                            + data.wandoos98.XLLevels
                            + (data.adventure.itopod.perkLevel[22] * 2)
        this.osLevel = wandoosOSLevel
        this.os = data.wandoos98.os.value__
        this.level = (this.id == 0) ? data.wandoos98.energyLevel : data.wandoos98.magicNGUExpLevel
        this.updateStats()
    }
}


export const WANDOOSLIST = [
    new Wandoos(0, 'energyWandoos', 'Wandoos Energy Dump', GameMode.ALL, 0, [[Stat.ATTACK, 1], [Stat.DEFENSE, 1]]),
    new Wandoos(1, 'magicWandoos', 'Wandoos Magic Dump', GameMode.ALL, 0, [[Stat.ATTACK, 1], [Stat.DEFENSE, 1]]),
]

export var WANDOOSS = new ResourceContainer(WANDOOSLIST);

/*
wandoos98.energyLevel
wandoos98.magicLevel
wandoos98.os.value__

wandoos98.OSlevel
wandoos98.pitOSLevels
wandoos98.XLLevels
.. Levels from perks
= level

wandoosSet -> adds 10% to bootup modifier

osLevelModifier = (level + 1) * 4%
*/