import { GameMode } from "./mode";
import Resource, { ResourceContainer, prop } from "./resource";
import { Stat } from "./stat";

const CardKeys : {[key: string]: string} = {
    ENERGY_NGU : 'energyNGUCard',
    MAGIC_NGU: 'magicNGUCard',
    WANDOOS: 'wandoosCard',
    AUGMENT : 'augmentCard',
    TIME_MACHINE : 'timeMachineCard',
    HACK_SPEED : 'hackSpeedCard',
    WISH_SPEED : 'wishSpeedCard',
    STAT : 'attackDefenseCard',
    ADVENTURE : 'adventureCard',
    DROP_CHANCE : 'dropChanceCard',
    GOLD_DROP : 'goldDropCard',
    DAYCARE_SPEED : 'daycareSpeedCard',
    PP: 'pPCard',
    QP: 'qPCard',
} as const satisfies {[key: string]: string};


export class Card extends Resource {
    tier: number
    constructor(id: number, key: string, name: string, props: prop) {
        super(id, key, name, GameMode.ALL, 0, props)
        this.tier = 1
    }
    importStats(data : any) {
        this.setLevel(data[this.id])
    }
    updateStats() {
        for (var prop of this.statnames) {
            this[prop] = this.base[prop] * this.level
        }
    }
}


export const CARDLIST = [

    new Card(1, CardKeys.ENERGY_NGU, 'Energy NGU Card', [[Stat.ENERGY_NGU_SPEED, 1],]),
    new Card(2, CardKeys.MAGIC_NGU, 'Magic NGU Card', [[Stat.MAGIC_NGU_SPEED, 1],]),
    new Card(3, CardKeys.WANDOOS, 'Wandoos Card', [[Stat.ENERGY_WANDOOS_SPEED, 1],[Stat.MAGIC_WANDOOS_SPEED, 1]]),
    new Card(4, CardKeys.AUGMENT, 'Augment Card', [[Stat.AUGMENT_SPEED, 1],]),
    

    new Card(5, CardKeys.TIME_MACHINE, 'Time Machine Speed Card', [[Stat.TIME_MACHINE, 1],]),
    new Card(6, CardKeys.HACK_SPEED, 'Hack Speed Card', [[Stat.HACK_SPEED, 1],]),
    new Card(7, CardKeys.WISH_SPEED, 'Wish Speed Card', [[Stat.WISH_SPEED, 1],]),
    new Card(8, CardKeys.STAT, 'Stat Card', [[Stat.ATTACK, 1],[ Stat.DEFENSE, 1]]),

    new Card(9, CardKeys.ADVENTURE, 'Adventure Card', [[Stat.POWER, 1], [Stat.TOUGHNESS, 1], [Stat.HEALTH, 1], [Stat.REGEN, 1]]),
    new Card(10, CardKeys.DROP_CHANCE, 'Drop Chance Card', [[Stat.DROP_CHANCE, 1],]),
    new Card(11, CardKeys.GOLD_DROP, 'Gold Drop Card', [[Stat.GOLD_DROP, 1],]),
    new Card(12, CardKeys.DAYCARE_SPEED, 'Daycare Speed Card', [[Stat.DAYCARE_SPEED, 1],]),

    new Card(13, CardKeys.PP, 'PP Card', [[Stat.PP, 1],]),
    new Card(14, CardKeys.QP, 'QP Card', [[Stat.QUEST_REWARD, 1],]),
]

export var CARDS = new ResourceContainer(CARDLIST);
