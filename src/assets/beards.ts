import { Stat } from "./stat"
import _ from "lodash"
import Resource, { ResourceContainer, prop } from "./resource"
import { GameMode } from "./mode"

export class Beard extends Resource{
    permLevel: number
    constructor(id: number, key: string, name: string, props: prop) {
        // level and perm level always start at 0
        super(id, key, name, GameMode.ALL, 0, props)
        this.permLevel = 0
    }
    setPermLevel(permLevel: number) {
        this.permLevel = permLevel
        this.updateStats()
    }
    getTempStatValue(prop: string) : number {
        if(!_.isUndefined(this[prop])) {
            return this[prop]['temp']
        }
        return 0
    }
    getPermStatValue(prop: string) : number {
        if(!_.isUndefined(this[prop])) {
            return this[prop]['perm']
        }
        return 0
    }
    updateStats() {
        for (var prop of this.statnames) {
            this[prop] = {}
            switch(this.id) {
                case 0: // Fu Mancu
                    this[prop]['temp'] = this.level * 5
                    this[prop]['perm'] = this.permLevel * 1
                    break;
                case 1: // Neckbeard
                    if(this.level <= 1000) {
                        this[prop]['temp'] = this.level * 0.05
                    } else {
                        this[prop]['temp'] = this.level ** 0.3 * 125.9 * 0.05
                    }
                    if(this.permLevel <= 1000) {
                        this[prop]['perm'] = this.permLevel * 0.05
                    } else {
                        this[prop]['perm'] = this.permLevel ** 0.33 * 102.4 * 0.05
                    }
                    break;
                case 2: // Reverse Hitler
                    if(this.level <= 1000) {
                        this[prop]['temp'] = this.level * 1
                    } else {
                        this[prop]['temp'] = this.level ** 0.5 * 31.7 * 1
                    }
                    if(this.permLevel <= 1000) {
                        this[prop]['perm'] = this.permLevel * 0.1
                    } else {
                        this[prop]['perm'] = this.permLevel ** 0.5 * 31.7 * 0.1
                    }
                    break;
                case 3: // Beard cage
                    if(this.level <= 1000) {
                        this[prop]['temp'] = this.level * 0.01
                    } else {
                        this[prop]['temp'] = this.level ** 0.3 * 125.9 * 0.01
                    }
                    if(this.permLevel <= 1000) {
                        this[prop]['perm'] = this.permLevel * 0.02
                    } else {
                        this[prop]['perm'] = this.permLevel ** 0.3 * 125.9 * 0.02
                    }
                    break;
                case 4: // LadyBeard
                    if(this.level <= 1000) {
                        this[prop]['temp'] = this.level * 0.1
                    } else {
                        this[prop]['temp'] = this.level ** 0.5 * 31.7 * 0.1
                    }
                    if(this.permLevel <= 1000) {
                        this[prop]['perm'] = this.permLevel * 0.2
                    } else {
                        this[prop]['perm'] = this.permLevel ** 0.5 * 31.7 * 0.2
                    }
                    break;
                case 5: // BEARd
                    if(this.level <= 1000) {
                        this[prop]['temp'] = this.level * 0.1
                    } else {
                        this[prop]['temp'] = this.level ** 0.3 * 125.9 * 0.1
                    }
                    if(this.permLevel <= 1000) {
                        this[prop]['perm'] = this.permLevel * 0.05
                    } else {
                        this[prop]['perm'] = this.permLevel ** 0.5 * 31.7 * 0.05
                    }
                    break;
                case 6: // Golden
                    if(this.level <= 1000) {
                        this[prop]['temp'] = this.level * 0.2
                    } else {
                        this[prop]['temp'] = this.level ** 0.5 * 31.7 * 0.2
                    }
                    if(this.permLevel <= 1000) {
                        this[prop]['perm'] = this.permLevel * 0.5
                    } else {
                        this[prop]['perm'] = this.permLevel ** 0.5 * 31.7 * 0.5
                    }
                    break;
                
            }
        }
    }
}


export const BEARDLIST = [
    new Beard(0, 'fuManchu', 'The Fu Manchu', [[Stat.ATTACK, 1], [Stat.DEFENSE, 1]]),
    new Beard(1, 'neckbeard', 'The Neckbeard', [[Stat.DROP_CHANCE, 1]]),
    new Beard(2, 'reverseHitler', 'The Revese Hitler', [[Stat.NUMBER, 1]]),
    new Beard(3, 'beardCage', 'The Beard Cage', [[Stat.ENERGY_NGU_SPEED, 1], [Stat.MAGIC_NGU_SPEED, 1]]),
    new Beard(4, 'ladybeard', 'The LadyBeard', [[Stat.ENERGY_WANDOOS_SPEED, 1], [Stat.MAGIC_WANDOOS_SPEED, 1]]),
    new Beard(5, 'BEARd', 'The BEARd', [[Stat.POWER, 1], [Stat. TOUGHNESS, 1]]),
    new Beard(6, 'goldenBeard', 'The Golden Beard', [[Stat.TIME_MACHINE, 1]]),    
]

export var BEARDS = new ResourceContainer(BEARDLIST);
