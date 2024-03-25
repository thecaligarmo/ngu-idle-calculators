import { Stat } from "../assets/stat";
import { bd } from "./numbers";
import bigDecimal from "js-big-decimal";

// Parsing Stuff
function parseObj(state, key) {
    var x = state[key][0]
    if (typeof x === 'string') {
        x = JSON.parse(x)
    }
    if (typeof x === 'number') {
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


// Information Stuff
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

// General Calc
function calcAll(data, stat){
    return bd(1)
        .multiply(equipmentInfo(data, stat)).divide(bd(100))
        .multiply(perkInfo(data, stat)).divide(bd(100))
        .multiply(quirkInfo(data, stat)).divide(bd(100))
        .multiply(nguInfo(data, stat).divide(bd(100)))
        .multiply(beardInfoTemp(data, stat).divide(bd(100)))
        .multiply(beardInfoPerm(data, stat).divide(bd(100)))
        .multiply(diggerInfo(data, stat).divide(bd(100)))
        .multiply(challengeInfo(data, stat))
}


export function totalEnergyPower(data) {
    return parseNum(data, 'baseEnergyPower')
        .multiply(calcAll(data, Stat.ENERGY_POWER)).divide(bd(100));
}

export function totalEnergyBar(data) {
    return parseNum(data, 'baseEnergyBar')
        .multiply(calcAll(data, Stat.ENERGY_BARS)).divide(bd(100));
}

export function totalEnergyCap(data) {
    return parseNum(data, 'baseEnergyCap')
        .multiply(calcAll(data, Stat.ENERGY_CAP)).divide(bd(100));
}

export function totalMagicPower(data) {
    return parseNum(data, 'baseMagicPower')
        .multiply(calcAll(data, Stat.MAGIC_POWER)).divide(bd(100));
}

export function totalMagicBar(data) {
    return parseNum(data, 'baseMagicBar')
        .multiply(calcAll(data, Stat.MAGIC_BARS)).divide(bd(100));
}

export function totalMagicCap(data) {
    return parseNum(data, 'baseMagicCap')
        .multiply(calcAll(data, Stat.MAGIC_CAP)).divide(bd(100));
}

export function totalEnergyNGUSpeedFactor(data) {
    var aNumberSetModifier = isMaxxedItem(data, 102) ? bd(1.1) : bd(1);
    var gen = calcAll(data, Stat.ENERGY_NGU_SPEED)
    
    return bd(1)
        .multiply(gen)
        .multiply(totalEnergyPower(data))
        .multiply(aNumberSetModifier)
}

export function totalMagicNGUSpeedFactor(data) {
    var aNumberSetModifier = isMaxxedItem(data, 102) ? bd(1.1) : bd(1);
    var gen = calcAll(data, Stat.MAGIC_NGU_SPEED)
    var trollChallenge = parseObj(data, 'challenges')[5]
    var tcNum = (!_.isUndefined(trollChallenge) && trollChallenge.level > 0) ? bd(3) : bd(1);
    
    return bd(1)
        .multiply(gen)
        .multiply(totalMagicPower(data))
        .multiply(aNumberSetModifier)
        .multiply(tcNum)
}