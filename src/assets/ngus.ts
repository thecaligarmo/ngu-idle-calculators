import Resource, { ResourceContainer, prop } from "./resource"
import { Stat } from "./stat"

export class NGU extends Resource {
    res: string
    target: number
    evilLevel: number
    evilTarget: number
    sadisticLevel: number
    sadisticTarget: number
    diminishingReturnLevel: number
    maxValue: number
    baseSpeed: number
    constructor (id: number, name: string, level: number, props: prop, res: string, diminishingReturnLevel: number, maxValue: number, baseSpeed: number) {
        super(id, name, level, props)
        this.res = res
        this.target = 0
        this.evilLevel = 0
        this.evilTarget = 0
        this.sadisticLevel = 0
        this.sadisticTarget = 0
        this.diminishingReturnLevel = diminishingReturnLevel
        this.maxValue = maxValue
        this.baseSpeed = baseSpeed
    }
    importStats(data: any) {
        this.level = data.level.low
        this.evilLevel = data.evilLevel.low
        this.sadisticLevel = data.sadisticLevel.low
        this.target = data.target.low
        this.evilTarget = data.evilTarget.low
        this.sadisticTarget = data.sadisticTarget.low
        this.updateStats()
    }
    updateStats() {
        var diminishing : boolean = false
        if (this.level > this.diminishingReturnLevel) {
            diminishing = true
        }
        for (var prop of Object.keys(this.base)) {
            if (this.diminishingReturnLevel === 0 || !diminishing) {
                if (this.id === 2 && this.res == 'energy') {
                    this[prop] = - this.level * this.base[prop]
                } else {
                    this[prop] =  this.level * this.base[prop]
                }
            } else if (this.res == 'energy') {
                 if (this.id === 2) {
                    // respawn
                    this[prop] = - (this.level * 100) / (this.level * 5 + 200000) + 20 
                } else if (this.id === 4 || this.id === 6) {
                    // Adv A, DC
                    this[prop] = (this.level)**0.5 * 3.17 
                } else if (this.id === 7) {
                    // M NGU
                    this[prop] = (this.level)**0.3 * 12.59
                } else if (this.id === 8) {
                    // PP
                    this[prop] = (this.level)**0.3 * 6.295
                } 
            } else if (this.res == 'magic') {
                switch (this.id) {
                    case 0:
                        this[prop] = (this.level) ** 0.33 * 5.54 
                        break
                    case 1:
                        this[prop] = (this.level) ** 0.4 * 0.9566
                        break
                    case 3:
                        this[prop] = (this.level) ** 0.5 * 31.7
                        break
                    case 4:
                        this[prop] = (this.level) ** 0.3 * 0.7962
                        break
                    case 5:
                        this[prop] = (this.level) ** 0.3 * 12.59
                        break
                    case 6:
                        this[prop] = (this.level) ** 0.4 * 1.894
                        break

                }
            }
            if (this[prop] > this.maxValue) {
                this[prop] = this.maxValue
            }
        }
        
    }
}


export const ENGULIST = [
    new NGU(0, 'NGU AUGMENTS', 0, [[Stat.AUGMENT_SPEED, 1]], 'energy',  0, 1000000000, 200000000000),
    new NGU(1, 'NGU WANDOOS', 0, [[Stat.WANDOOS_SPEED, 0.1]], 'energy',  0, 100000000, 200000000000),
    new NGU(2, 'NGU RESPAWN', 0, [[Stat.RESPAWN, 0.05]], 'energy',  400, 60, 200000000000),
    new NGU(3, 'NGU GOLD', 0, [[Stat.GOLD_DROP, 1]], 'energy',  0, 1000000000, 200000000000),
    new NGU(4, 'NGU ADVENTURE A', 0, [[Stat.POWER, 0.1], [Stat.TOUGHNESS, 0.1]], 'energy',  1000, 100244.2, 200000000000),
    new NGU(5, 'NGU POWER A', 0, [[Stat.ATTACK, 5], [Stat.DEFENSE, 5]], 'energy',  0, 5000000000, 200000000000),
    new NGU(6, 'NGU DROP CHANCE', 0, [[Stat.DROP_CHANCE, 0.1],], 'energy',  1000, 100244.2, 20000000000000),
    new NGU(7, 'NGU MAGIC NGU', 0, [[Stat.MAGIC_NGU_SPEED, 0.1]], 'energy',  1000, 6309.95, 400000000000000),
    new NGU(8, 'NGU PP', 0, [[Stat.PP, 0.05]], 'energy',  1000, 3154.97, 10000000000000000),
]

export const MNGULIST = [
    new NGU(0, 'NGU YGGDRASIL', 0, [[Stat.YGGDRASIL_YIELD, 0.1]], 'magic',  400, 5170.23, 400000000000),
    new NGU(1, 'NGU EXP', 0, [[Stat.EXPERIENCE, 0.01]], 'magic',  2000, 3808.29, 1200000000000),
    new NGU(2, 'NGU POWER B', 0, [[Stat.ATTACK, 1], [Stat.DEFENSE, 1]], 'magic',  0, 1000000000, 4000000000000),
    new NGU(3, 'NGU NUMBER', 0, [[Stat.NUMBER, 1]], 'magic',  1000, 1002000, 12000000000000),
    new NGU(4, 'NGU TIME MACHINE', 0, [[Stat.TIME_MACHINE, 0.2]], 'magic',  1000, 12619000, 100000000000000),
    new NGU(5, 'NGU ENERGY NGU', 0, [[Stat.ENERGY_NGU_SPEED, 0.1]], 'magic',  1000, 6309.95, 1000000000000000),
    new NGU(6, 'NGU ADVENTURE B', 0, [[Stat.POWER, 0.03], [Stat.TOUGHNESS, 0.03]], 'magic',  1000, 7539.75, 10000000000000000),
]

export var ENERGY_NGUS = new ResourceContainer(ENGULIST.map((ngu) => {
    return [ngu.id, ngu];
}));

export var MAGIC_NGUS = new ResourceContainer(MNGULIST.map((ngu) => {
    return [ngu.id, ngu];
}));