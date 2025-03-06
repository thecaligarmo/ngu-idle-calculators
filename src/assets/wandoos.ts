import { bd, toNum } from "@/helpers/numbers";
import bigDecimal from "js-big-decimal";
import _ from "lodash";
import { GameMode } from "./mode";
import Resource, { ResourceContainer } from "./resource";
import { playerImportType, propType } from "@/helpers/types";
import { Stat } from "./stat";

export const WANDOOS_OS: { [key: string]: number } = {
    NINETY_EIGHT: 0,
    MEH: 1,
    XL: 2,
} as const satisfies { [key: string]: number };

// Wandoos is different as it is combining Energy and Magic into one object
export class Wandoos extends Resource {
    osLevel: number;
    os: number;
    energyLevel: number;
    magicLevel: number;
    energyAllocated: bigDecimal;
    magicAllocated: bigDecimal;

    constructor(id: number, key: string, name: string, mode: number, props: propType) {
        super(id, key, name, mode, 0, props);
        this.osLevel = 0;
        this.os = WANDOOS_OS.NINETY_EIGHT;

        this.energyAllocated = bd(0);
        this.magicAllocated = bd(0);
        this.energyLevel = 0;
        this.magicLevel = 0;

        this.updateStats();
    }

    importStats(data: playerImportType): void {
        const wandoosOSLevel = data.wandoos98.OSlevel + data.wandoos98.pitOSLevels + data.wandoos98.XLLevels + data.adventure.itopod.perkLevel[22] * 2;
        this.osLevel = wandoosOSLevel;
        this.os = data.wandoos98.os.value__;
        this.energyAllocated = bd(data.wandoos98.wandoosEnergy);
        this.magicAllocated = bd(data.wandoos98.wandoosMagic);
        this.energyLevel = data.wandoos98.energyLevel;
        this.magicLevel = data.wandoos98.magicLevel;

        this.updateStats();
    }

    getStatByLevel(energyLevel?: number | bigDecimal, magicLevel?: number | bigDecimal, os?: number | bigDecimal): bigDecimal {
        if (_.isUndefined(energyLevel)) {
            energyLevel = this.energyLevel;
        }
        if (_.isUndefined(magicLevel)) {
            magicLevel = this.magicLevel;
        }
        if (_.isUndefined(os)) {
            os = this.os;
        }
        energyLevel = toNum(energyLevel);
        magicLevel = toNum(magicLevel);
        os = toNum(os);

        let energyMult = 0.01;
        let magicMult = 0.04;
        let exponent = 0.8;
        if (os == WANDOOS_OS.MEH) {
            energyMult = 0.2;
            magicMult = 2;
            exponent = 1;
        } else if (os == WANDOOS_OS.XL) {
            energyMult = 6;
            magicMult = 40;
            exponent = 1.05;
        }

        return bd(((1 + energyLevel * energyMult) * (1 + magicLevel * magicMult)) ** exponent);
    }

    updateStats() {
        for (const prop of this.statnames) {
            this[prop] = this.getStatByLevel();
        }
    }
}

export const WANDOOSLIST = [
    new Wandoos(0, "wandoos", "Wandoos Dump", GameMode.NORMAL, [
        [Stat.ATTACK, 1],
        [Stat.DEFENSE, 1],
    ]),
];

export const WANDOOSS = new ResourceContainer(WANDOOSLIST);
