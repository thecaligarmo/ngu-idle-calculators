import { APItem } from "@/assets/apItems";
import { parseNum, parseObj } from "./parsers";
import { Stat } from "@/assets/stat";
import bigDecimal from "js-big-decimal";
import { bd } from "./numbers";
import { ItemSet, ItemSets } from "@/assets/sets";
import _ from "lodash";


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

function cubeInfo(data : any, key : string) : bigDecimal {
    var power = parseNum(data, 'cubePower')
    var toughness = parseNum(data, 'cubeToughness')
    var total = power.add(toughness)
    var digits = total.floor().getValue().length
    switch(key) {
        case Stat.POWER:
            return power
        case Stat.TOUGHNESS:
            return toughness
        case Stat.DROP_CHANCE:
            if (digits < 3) {
                return bd(0)
            } 
            return bd(50 + 20 * (digits - 3))
        case Stat.GOLD_DROP:
            switch(digits) {
                case 4:
                    return bd(50)
                case 5:
                    return bd(123.11)
                case 6:
                    return bd(208.56)
                case 7:
                    return bd(303.14)
                case 8:
                    return bd(405.16)
                case 9:
                    return bd(513.53)
                case 10:
                    return bd(627.48)
                case 11:
                    return bd(746.43)
                case 12:
                    return bd(869.93)
            }
            return bd(0)
        case Stat.HACK_SPEED:
            if (digits < 10) {
                return bd(0)
            }
            return bd(10 + 5 * (digits - 10))
        case Stat.WISH_SPEED:
            if (digits < 11) {
                return bd(0)
            }
            return bd(10 * (digits - 10))
    }
    return bd(0)
}

function globalDiggerBonus(data: any ) : number{
    var diggers : any = parseObj(data, 'diggers')
    var totalLevel : number = 0
    if (diggers.length){
        totalLevel = Object.keys(diggers).reduce((curVal: number, d : string) => {return diggers[d].maxLevel + curVal}, 0)
    }
    var challenges : any = parseObj(data, 'challenges')
    var challengeBonus : number = (!_.isUndefined(challenges[10]) && challenges[10].level > 0) ? 5 : 0;

    var partySetBonus : number = isMaxxedItemSet(data, ItemSets.PARTY) ? 5 : 0;

    if (totalLevel <= 500) {
        return 100 + 0.05 * totalLevel + challengeBonus + partySetBonus
    }
    return 100 + 25 + 0.05 * ((totalLevel-500) ** 0.7) + challengeBonus + partySetBonus

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

    var cube = cubeInfo(data, key)
    return bd(stat).add(cube)
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
                    stat *= ((g[key] + 100) / 100)
                }
            })
        }
    }

    return bd(stat)
}

export function isMaxxedItem(data : any, itemId : number) : boolean {
    return itemId in parseObj(data, 'maxxedItems')
}

export function isMaxxedItemSet(data : any, itemSet : ItemSet) : boolean {
    var itemSets = parseObj(data, 'itemSets')
    return (itemSet.key in itemSets) ? itemSets[itemSet.key].isMaxxed : false;
}