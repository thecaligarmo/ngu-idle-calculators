import { Stat } from "../assets/stat";
import { bd } from "./numbers";
import bigDecimal from "js-big-decimal";

function parseObj(state, key) {
    var x = state[key][0]
    if (typeof x === 'string') {
        return JSON.parse(x)
    } else if (typeof x === 'number') {
        return {}
    }
    return x
}

function parseNum(state, key) {
    var x = state[key][0]
    if (x instanceof bigDecimal) {
    return x
    }
    return bd(x)
}

export function beardInfoTemp(data, key) {
    var beards = parseObj(data, 'beards')
    var stat = 100
    if (Object.values(Stat).includes(key)) {
        if ( beards.length > 0) {
            beards.forEach(g => {
                if (!_.isUndefined(g[key])) {
                    stat += g[key]['temp']
                }
            })
        }
    }
    return bd(stat)
}

export function beardInfoPerm(data, key) {
    var beards = parseObj(data, 'beards')
    var stat = 100
    if (Object.values(Stat).includes(key)) {
        if ( beards.length > 0) {
            beards.forEach(g => {
                if (!_.isUndefined(g[key])) {
                    
                    stat += g[key]['perm']
                }
            })
        }
    }
    return bd(stat)
}

export function challengeInfo(data, key) {
    var challenges = parseObj(data, 'challenges')
    var stat = 100
    if (Object.values(Stat).includes(key)) {
        if ( challenges.length > 0) {
            challenges.forEach(g => {
                if (!_.isUndefined(g[key])) {
                    stat += g[key]
                }
            })
        }
    }
    return bd(stat)
}

function globalDiggerBonus(data) {
    var diggers = parseObj(data, 'diggers')
    var totalLevel = 0
    if (diggers.length){
        totalLevel = Object.keys(diggers).reduce((curVal, d) => {return diggers[d].maxLevel + curVal}, 0)
    }
    var challenges = parseObj(data, 'challenges')
    var challengeBonus = (!_.isUndefined(challenges[10]) && challenges[10].level > 0) ? 5 : 0;
    return 0.05 * totalLevel + challengeBonus + 100

}

export function diggerInfo(data, key) {
    var diggers = parseObj(data, 'diggers')
    var stat = 0
    if (Object.values(Stat).includes(key)) {
        if ( diggers.length > 0) {
            diggers.forEach(g => {
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

export function equipmentInfo(data, key) {
    var gear = [
        parseObj(data, 'equipmentHead'),
        parseObj(data, 'equipmentChest'),
        parseObj(data, 'equipmentLegs'),
        parseObj(data, 'equipmentBoots'),
        parseObj(data, 'equipmentWeapon'),
    ]
    var accs = parseObj(data, 'equipmentAccesories')
    var stat = 100
    if (Object.values(Stat).includes(key)) {
            gear.forEach(g => {
                if (!_.isUndefined(g[key])) {
                    stat += g[key]
                }
            })
            if ( accs.length > 0) {
                accs.forEach(g => {
                    if (!_.isUndefined(g[key])) {
                        stat += g[key]
                    }
                })
            }
    }
    return bd(stat)
}

export function nguInfo(data, key) {
    var engus = parseObj(data, 'energyNGUs')
    var mngus = parseObj(data, 'magicNGUs')
    var stat = 100
    if (Object.values(Stat).includes(key)) {
        if ( engus.length > 0) {
            engus.forEach(g => {
                if (!_.isUndefined(g[key])) {
                    stat += g[key]
                }
            })
        }
        if ( mngus.length > 0) {
            mngus.forEach(g => {
                if (!_.isUndefined(g[key])) {
                    stat += g[key]
                }
            })
        }
    }

    return bd(stat)
}

export function perkInfo(data, key) {
    var perks = parseObj(data, 'perks')
    var stat = 100
    if (Object.values(Stat).includes(key)) {
        if ( perks.length > 0) {
            perks.forEach(g => {
                if (!_.isUndefined(g[key])) {
                    stat += g[key]
                }
            })
        }
    }
    return bd(stat)
}

export function quirkInfo(data, key) {
    var quirks = parseObj(data, 'quirks')
    var stat = 100
    if (Object.values(Stat).includes(key)) {
        if ( quirks.length > 0) {
            quirks.forEach(g => {
                if (!_.isUndefined(g[key])) {
                    stat += g[key]
                }
            })
        }
    }
    return bd(stat)
}

export function isMaxxedItem(data, itemId) {
    return itemId in parseObj(data, 'maxxedItems')
}

export function totalEnergyPower(data) {
    return generalPCB(data, 'baseEnergyPower', Stat.ENERGY_POWER);
}

export function totalEnergyBar(data) {
    return generalPCB(data, 'baseEnergyBar', Stat.ENERGY_BARS);
}

export function totalEnergyCap(data) {
    return generalPCB(data, 'baseEnergyCap', Stat.ENERGY_CAP);
}

export function totalMagicPower(data) {
    return generalPCB(data, 'baseMagicPower', Stat.MAGIC_POWER);
}

export function totalMagicBar(data) {
    return generalPCB(data, 'baseMagicBar', Stat.MAGIC_BARS);
}

export function totalMagicCap(data) {
    return generalPCB(data, 'baseMagicCap', Stat.MAGIC_CAP);
}


function generalPCB(data, key, stat){
    return parseNum(data, key)
        .multiply(equipmentInfo(data, stat)).divide(bd(100))
        .multiply(perkInfo(data, stat)).divide(bd(100))
        .multiply(quirkInfo(data, stat)).divide(bd(100))
}

export function totalEnergyNGUSpeedFactor(data) {
    var aNumberSetModifier = isMaxxedItem(data, 102) ? bd(1.1) : bd(1);
    
    return bd(1)
        .multiply(totalEnergyPower(data))
        .multiply(equipmentInfo(data, Stat.ENERGY_NGU_SPEED).divide(bd(100)))
        .multiply(aNumberSetModifier)
        .multiply(nguInfo(data, Stat.ENERGY_NGU_SPEED).divide(bd(100)))
        .multiply(beardInfoTemp(data, Stat.ENERGY_NGU_SPEED).divide(bd(100)))
        .multiply(beardInfoPerm(data, Stat.ENERGY_NGU_SPEED).divide(bd(100)))
        .multiply(diggerInfo(data, Stat.ENERGY_NGU_SPEED).divide(bd(100)))
        .multiply(perkInfo(data, Stat.ENERGY_NGU_SPEED).divide(bd(100)))
        .multiply(challengeInfo(data, Stat.ENERGY_NGU_SPEED))
        
        
}