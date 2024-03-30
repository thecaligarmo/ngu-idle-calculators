import _ from "lodash";
import { Stat } from "../assets/stat";
import { bd } from "./numbers";
import bigDecimal from "js-big-decimal";
import { ENERGY_NGUS } from "@/assets/ngus";
import { APItem } from "@/assets/apItems";

// Parsing Stuff
function parseObj(state: any, key: string) {
    var x : any = state[key][0]
    if (typeof x === 'string') {
        x = JSON.parse(x)
    }
    if (typeof x === 'number') {
        return {}
    }
    return x
}

function parseNum(state: any, key: string) : bigDecimal{
    var x : any = state[key][0]
    if (x instanceof bigDecimal) {
        return x
    }
    return bd(x)
}


// Information Stuff
export function apItemInfo(data: any, key: string) : bigDecimal {
    var apItems : APItem[] = parseObj(data, 'apItems')
    var stat : number = 100;
    if (Object.values(Stat).includes(key)) {
        if(apItems.length > 0) {
            apItems.forEach((g: APItem) => {
                stat *= g[key] / 100
            })
        }
    }
    return bd(stat > 0 ? stat : 100)
}

export function beardInfoTemp(data: any, key: string) : bigDecimal{
    var beards : any = parseObj(data, 'beards')
    var stat : number = 100
    if (Object.values(Stat).includes(key)) {
        if ( beards.length > 0) {
            beards.forEach((g : any) => {
                if (!_.isUndefined(g[key])) {
                    stat += g[key]['temp']
                }
            })
        }
    }
    return bd(stat)
}

export function beardInfoPerm(data: any, key: string) : bigDecimal{
    var beards : any = parseObj(data, 'beards')
    var stat : number = 100
    if (Object.values(Stat).includes(key)) {
        if ( beards.length > 0) {
            beards.forEach((g : any) => {
                if (!_.isUndefined(g[key])) {
                    
                    stat += g[key]['perm']
                }
            })
        }
    }
    return bd(stat)
}

export function challengeInfo(data : any, key : string) : bigDecimal{
    var challenges : any = parseObj(data, 'challenges')
    var stat : number = 100
    if (Object.values(Stat).includes(key)) {
        if ( challenges.length > 0) {
            challenges.forEach((g : any) => {
                if (!_.isUndefined(g[key])) {
                    stat += g[key]
                }
            })
        }
    }
    return bd(stat)
}

function globalDiggerBonus(data: any ) : number{
    var diggers : any = parseObj(data, 'diggers')
    var totalLevel : number = 0
    if (diggers.length){
        totalLevel = Object.keys(diggers).reduce((curVal: number, d : string) => {return diggers[d].maxLevel + curVal}, 0)
    }
    var challenges : any = parseObj(data, 'challenges')
    var challengeBonus : number = (!_.isUndefined(challenges[10]) && challenges[10].level > 0) ? 5 : 0;
    return 0.05 * totalLevel + challengeBonus + 100

}

export function diggerInfo(data: any, key: string) : bigDecimal{
    var diggers : any = parseObj(data, 'diggers')
    var stat : number = 0
    if (Object.values(Stat).includes(key)) {
        if ( diggers.length > 0) {
            diggers.forEach((g : any) => {
                if (!_.isUndefined(g[key]) && g.active) {
                    stat += g[key]
                }
            })
        }
    }
    stat *= (globalDiggerBonus(data) / 100)
    if (stat === 0) {
        return bd(100)
    } 
    return bd(stat)
}

export function equipmentInfo(data: any, key: string) : bigDecimal {
    var gear : any[] = [
        parseObj(data, 'equipmentHead'),
        parseObj(data, 'equipmentChest'),
        parseObj(data, 'equipmentLegs'),
        parseObj(data, 'equipmentBoots'),
        parseObj(data, 'equipmentWeapon'),
    ]
    var accs : any = parseObj(data, 'equipmentAccesories')
    var stat : number = 100
    if (Object.values(Stat).includes(key)) {
            gear.forEach((g : any) => {
                if (!_.isUndefined(g[key])) {
                    stat += g[key]
                }
            })
            if ( accs.length > 0) {
                accs.forEach((g : any) => {
                    if (!_.isUndefined(g[key])) {
                        stat += g[key]
                    }
                })
            }
    }
    return bd(stat)
}

export function nguInfo(data : any, key : string) : bigDecimal{
    var engus : any = parseObj(data, 'energyNGUs')
    var mngus : any = parseObj(data, 'magicNGUs')
    var stat : number = 0
    if (Object.values(Stat).includes(key)) {
        if ( engus.length > 0) {
            engus.forEach((g : any) => {
                if (!_.isUndefined(g[key])) {
                    stat += g[key]
                }
            })
        }
        if ( mngus.length > 0) {
            mngus.forEach((g : any) => {
                if (!_.isUndefined(g[key])) {
                    stat += g[key]
                }
            })
        }
    }

    return bd( stat == 0 ? 100 : stat)
}

export function perkInfo(data : any, key : string) : bigDecimal{
    var perks : any = parseObj(data, 'perks')
    var stat : number = 100
    if (Object.values(Stat).includes(key)) {
        if ( perks.length > 0) {
            perks.forEach((g : any) => {
                if (!_.isUndefined(g[key])) {
                    stat += g[key]
                }
            })
        }
    }
    return bd(stat)
}

export function quirkInfo(data : any, key : string) : bigDecimal{
    var quirks : any = parseObj(data, 'quirks')
    var stat : number = 100
    if (Object.values(Stat).includes(key)) {
        if ( quirks.length > 0) {
            quirks.forEach((g : any) => {
                if (!_.isUndefined(g[key])) {
                    stat += g[key]
                }
            })
        }
    }
    return bd(stat)
}

export function isMaxxedItem(data : any, itemId : number) : boolean {
    return itemId in parseObj(data, 'maxxedItems')
}

// General Calc
function calcAll(data : any, stat : string) : bigDecimal{
    return bd(1)
        .multiply(equipmentInfo(data, stat)).divide(bd(100))
        .multiply(perkInfo(data, stat)).divide(bd(100))
        .multiply(quirkInfo(data, stat)).divide(bd(100))
        .multiply(nguInfo(data, stat).divide(bd(100)))
        .multiply(beardInfoTemp(data, stat).divide(bd(100)))
        .multiply(beardInfoPerm(data, stat).divide(bd(100)))
        .multiply(diggerInfo(data, stat).divide(bd(100)))
        .multiply(challengeInfo(data, stat))
        .multiply(apItemInfo(data, stat).divide(bd(100)))
}


export function totalEnergyPower(data : any) : bigDecimal {
    return parseNum(data, 'baseEnergyPower')
        .multiply(calcAll(data, Stat.ENERGY_POWER)).divide(bd(100));
}

export function totalEnergyBar(data : any) : bigDecimal {
    return parseNum(data, 'baseEnergyBar')
        .multiply(calcAll(data, Stat.ENERGY_BARS)).divide(bd(100));
}

export function totalEnergyCap(data : any) : bigDecimal {
    return parseNum(data, 'baseEnergyCap')
        .multiply(calcAll(data, Stat.ENERGY_CAP)).divide(bd(100));
}

export function totalMagicPower(data : any) : bigDecimal {
    return parseNum(data, 'baseMagicPower')
        .multiply(calcAll(data, Stat.MAGIC_POWER)).divide(bd(100));
}

export function totalMagicBar(data : any) : bigDecimal {
    return parseNum(data, 'baseMagicBar')
        .multiply(calcAll(data, Stat.MAGIC_BARS)).divide(bd(100));
}

export function totalMagicCap(data : any) : bigDecimal {
    return parseNum(data, 'baseMagicCap')
        .multiply(calcAll(data, Stat.MAGIC_CAP)).divide(bd(100));
}

export function totalEnergyNGUSpeedFactor(data : any) : bigDecimal {
    var aNumberSetModifier : bigDecimal= isMaxxedItem(data, 102) ? bd(1.1) : bd(1);
    var gen : bigDecimal = calcAll(data, Stat.ENERGY_NGU_SPEED)
    
    return bd(1)
        .multiply(gen)
        .multiply(totalEnergyPower(data))
        .multiply(aNumberSetModifier)
}

export function totalMagicNGUSpeedFactor(data : any) : bigDecimal {
    var aNumberSetModifier : bigDecimal = isMaxxedItem(data, 102) ? bd(1.1) : bd(1);
    var gen : bigDecimal = calcAll(data, Stat.MAGIC_NGU_SPEED)
    var trollChallenge : any = parseObj(data, 'challenges')[5]
    var tcNum : bigDecimal = (!_.isUndefined(trollChallenge) && trollChallenge.level > 0) ? bd(3) : bd(1);
    
    return bd(1)
        .multiply(gen)
        .multiply(totalMagicPower(data))
        .multiply(aNumberSetModifier)
        .multiply(tcNum)
}