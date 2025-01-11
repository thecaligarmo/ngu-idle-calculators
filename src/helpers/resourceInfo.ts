import { AdvTraining } from "@/assets/advTraining";
import { APItem } from "@/assets/apItems";
import { Beard } from "@/assets/beards";
import { Card } from "@/assets/cards";
import { Challenge, CHALLENGES } from "@/assets/challenges";
import { Digger } from "@/assets/diggers";
import { Hack } from "@/assets/hacks";
import { Item } from "@/assets/items";
import { MacGuffin } from "@/assets/macguffins";
import { ALL_GAME_MODES, GameMode } from "@/assets/mode";
import { NGU } from "@/assets/ngus";
import { Perk } from "@/assets/perks";
import { Quirk } from "@/assets/quirks";
import { ItemSet, ItemSets } from "@/assets/sets";
import { Stat } from "@/assets/stat";
import { Wandoos } from "@/assets/wandoos";
import { Wish } from "@/assets/wish";
import bigDecimal from "js-big-decimal";
import _ from "lodash";
import { getGameMode } from "./gameMode";
import { bd, lessThan, toNum } from "./numbers";
import { parseNum, parseObj } from "./parsers";

export function achievementAPBonus(data : any) : bigDecimal {
    var achievements = parseObj(data, 'achievements')
    
    var sum = 0
    for (var i = 0; i < achievements.length; i++) {
        if(achievements[i] == 1) {
            // There are 16 of the first 6, so we can collapse as they
            // have identical points
            var j = (i < 96) ? i % 16 : i
            switch(j) {
                case 0:
                case 96:
                case 135:
                    sum += 5
                    break
                case 1:
                case 97:
                case 136:
                    sum += 10
                    break
                case 2:
                case 98:
                case 137:
                    sum += 15
                    break
                case 3:
                case 99:
                case 138:
                case 147:
                    sum += 20
                    break
                case 4:
                case 100:
                case 101:
                case 139:
                case 148:
                case 149:
                case 150:
                case 151:
                case 152 :
                    sum += 25
                    break
                case 5:
                case 102:
                case 103:
                case 126:
                case 127:
                case 140:
                    sum += 30
                    break
                case 6:
                case 7:
                case 104:
                case 105:
                case 106:
                    sum += 35
                    break
                case 8:
                case 9:
                case 10:
                case 107:
                case 108:
                case 109:
                case 141:
                    sum += 40
                    break
                case 11:
                case 12:
                case 13:
                case 110:
                case 111:
                case 112:
                case 113:
                    sum += 45
                    break
                case 14:
                case 15:
                case 114:
                case 115:
                case 116:
                case 117:
                case 142:
                    sum += 50
                    break
                case 118:
                case 119:
                case 120:
                case 121:
                    sum += 55
                    break
                case 122:
                case 123:
                case 124:
                case 125:
                case 143:
                case 144:
                    sum += 60
                    break
                case 128:
                case 129:
                case 130:
                case 131:
                case 132:
                case 133:
                case 134:
                case 145:
                case 146:
                    sum += 100
                    break

            }
        }
    }
    
    return bd(sum / 100 + 100)
}

export function advTrainingInfo(data: any, key: string) : bigDecimal {
    var advTrainings : AdvTraining[] = parseObj(data, 'advTrainings')
    var stat : number = 100
    if (Object.values(Stat).includes(key)) {
        if (advTrainings.length > 0) {
            advTrainings.forEach((g) => {
                stat += g.getStatValue(key)
            })
        }
    }
    return bd(stat)
}

export function apItemInfo(data: any, key: string) : bigDecimal {
    var apItems : APItem[] = parseObj(data, 'apItems')
    var stat : number = 100;
    var blueHeart = isMaxxedItemSet(data, ItemSets.BLUE_HEART)
    if (Object.values(Stat).includes(key)) {
        if(apItems.length > 0) {
            apItems.forEach((g) => {
                if (!_.isUndefined(g[key])) {
                    let statAmt = (100 + g[key]) / 100
                    // Mayo
                    if(g.id == 56) {
                        statAmt = (100 + g[key] * g.level) / 100
                    } 
                    stat *= blueHeart && g.id < 19 ? statAmt * 1.1 : statAmt
                }
            })
        }
    }

    return bd(stat > 0 ? stat : 100)
}

export function beardInfoTemp(data: any, key: string, pretendOn : boolean = false) : bigDecimal{
    var beards : Beard[] = parseObj(data, 'beards')
    var stat : number = 100
    if (Object.values(Stat).includes(key)) {
        if ( beards.length > 0) {
            beards.forEach((g) => {
                stat += g.getTempStatValue(key, pretendOn)
            })
        }
    }
    return bd(stat)
}

export function beardInfoPerm(data: any, key: string) : bigDecimal{
    var beards : Beard[] = parseObj(data, 'beards')
    var stat : number = 100
    if (Object.values(Stat).includes(key)) {
        if ( beards.length > 0) {
            beards.forEach((g) => {
                stat += g.getPermStatValue(key)
            })
        }
    }
    return bd(stat)
}

export function cardInfo(data : any, key: string) :bigDecimal {
    var cards : Card[] = parseObj(data, 'cards')
    var stat : number = 100
    if (Object.values(Stat).includes(key)) {
        if(cards.length > 0) {
            cards.forEach((g) => {
                if (!_.isUndefined(g[key])) {
                    stat *= g[key]
                }
            })
        }
    }
    
    return bd(stat)
}

export function activeBeards(data : any, type : string = '') : bigDecimal {
    var beards : Beard[] = parseObj(data, 'beards')
    var activeBeards = 0
    if ( beards.length > 0) {
        beards.forEach((g) => {
            if(g.active) {
                if(type == '') {
                    activeBeards += 1
                } else {
                    activeBeards += (g.type == type) ? 1 : 0
                }
            }
        })
    }
    return bd(activeBeards);
}

export function challengeInfo(data : any, key : string, gameMode : number = GameMode.ALL) : bigDecimal{
    var challenges : {[key:number] : Challenge[]} = parseObj(data, 'challenges')
    var stat : number = 1
    if (Object.values(Stat).includes(key)) {
        if(gameMode === GameMode.ALL) {
            ALL_GAME_MODES.forEach((mode) => {
                if(!_.isUndefined(challenges[mode]) && challenges[mode].length > 0) {
                    challenges[mode].forEach((g) => {
                        stat *= ((100 + g.getStatValue(key)) / 100)
                    })
                }
            })
        } else {
            if(!_.isUndefined(challenges[gameMode]) && challenges[gameMode].length > 0) {
                challenges[gameMode].forEach((g) => {
                    stat *= ((100 + g.getStatValue(key)) / 100)
                })
            }
        }
    }
    return bd(stat * 100)
}

export function cookingInfo(data : any, key : string) : bigDecimal {
    if (key == Stat.EXPERIENCE) {
        return parseNum(data, 'cookingExp')
    }
    return bd(1)
}

function cubeInfo(data : any, key : string, capAmount : bigDecimal = bd(-1)) : bigDecimal {
    var power = parseNum(data, 'cubePower')
    var toughness = parseNum(data, 'cubeToughness')
    var total = power.add(toughness)
    var digits = total.floor().getValue().length
    switch(key) {
        case Stat.POWER:
            var extraPow = 0
            if( lessThan(capAmount, power)) {
                extraPow = Math.sqrt(toNum(power.subtract(capAmount)))
                power = capAmount
            }
            return power.add(bd(extraPow))
        case Stat.TOUGHNESS:
            var extraTough = 0
            if( lessThan(capAmount, toughness)) {
                extraTough = Math.sqrt(toNum(toughness.subtract(capAmount)))
                toughness = capAmount
            }
            return toughness.add(bd(extraTough))
        case Stat.HEALTH:
            var extraPow = 0
            if( lessThan(capAmount, power)) {
                extraPow = Math.sqrt(toNum(power.subtract(capAmount)))
                power = capAmount
            }
            return power.multiply(bd(3))
        case Stat.REGEN:
            var extraTough = 0
            if( lessThan(capAmount, toughness)) {
                extraTough = Math.sqrt(toNum(toughness.subtract(capAmount)))
                toughness = capAmount
            }
            return toughness.multiply(bd(3/100))
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
    var challenges : Challenge[] = parseObj(data, 'challenges')
    var challengeBonus : number = (!_.isUndefined(challenges[GameMode.NORMAL]) && !_.isUndefined(challenges[GameMode.NORMAL][10]) && challenges[GameMode.NORMAL][10].level > 0) ? 5 : 0;

    var partySetBonus : number = isMaxxedItemSet(data, ItemSets.PARTY) ? 5 : 0;

    if (totalLevel <= 500) {
        return 100 + 0.05 * totalLevel + challengeBonus + partySetBonus
    }
    return 100 + 25 + 0.05 * ((totalLevel-500) ** 0.7) + challengeBonus + partySetBonus

}

export function diggerInfo(data: any, key: string) : bigDecimal{
    var diggers : Digger[] = parseObj(data, 'diggers')
    var stat : number = 0
    if (Object.values(Stat).includes(key)) {
        if ( diggers.length > 0) {
            diggers.forEach((g) => {
                if (g.active) {
                    stat += g.getStatValue(key)
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
    var gear : (Item | null)[] = [
        parseObj(data, 'equipmentHead'),
        parseObj(data, 'equipmentChest'),
        parseObj(data, 'equipmentLegs'),
        parseObj(data, 'equipmentBoots'),
        parseObj(data, 'equipmentWeapon'),
        parseObj(data, 'equipmentWeaponTwo'),
    ]
    var accs : Item[] = parseObj(data, 'equipmentAccesories')
    var stat : number = (key == Stat.POWER || key == Stat.TOUGHNESS || key == Stat.HEALTH || key == Stat.REGEN) ? 0 : 100;
    if (Object.values(Stat).includes(key)) {
            gear.forEach((g) => {
                if(g instanceof Item) {
                    stat += g.getStatValue(key)
                }
            })
            if ( accs.length > 0) {
                accs.forEach((g) => {
                    stat += g.getStatValue(key)
                })
            }

    }
    if (key == Stat.EXPERIENCE) {
        if (isMaxxedItemSet(data, ItemSets.RED_HEART)) {
            if ( accs.length > 0) {
                accs.forEach((g) => {
                    if(g.id == 119) {
                        stat -= g.getStatValue(key)
                    }
                })
            }
        }
    }
    return bd(stat)
}


export function equipmentWithCubeInfo(data: any, key: string) : bigDecimal {
    var stat = equipmentInfo(data, key)
    
    let capAmount = bd(-1)
    if(key == Stat.POWER) {
        capAmount = parseNum(data, 'baseAdventurePower').add(bd(stat))
    }
    if(key == Stat.TOUGHNESS) {
        capAmount = parseNum(data, 'baseAdventureToughness').add(bd(stat))
    }
    if(key == Stat.HEALTH) {
        capAmount = parseNum(data, 'baseAdventurePower').add(equipmentInfo(data, Stat.POWER))
    }
    if(key == Stat.REGEN) {
        capAmount = parseNum(data, 'baseAdventureToughness').add(equipmentInfo(data, Stat.TOUGHNESS))
    }

    var cube = cubeInfo(data, key, capAmount)

    switch(key) {
        case Stat.POWER:
        case Stat.TOUGHNESS:
        case Stat.HEALTH:
        case Stat.REGEN:
            return bd(stat).round(0, bigDecimal.RoundingModes.FLOOR).add(cube)
        case Stat.ENERGY_POWER:
        case Stat.MAGIC_POWER:
        case Stat.ENERGY_BARS:
        case Stat.MAGIC_BARS:
            return bd(stat).add(cube).round(1, bigDecimal.RoundingModes.FLOOR)
    }
    
    return bd(stat).add(cube)//.round(0, bigDecimal.RoundingModes.DOWN)
}

export function hackInfo(data : any, key : string) : bigDecimal{
    var hacks : Hack[] = parseObj(data, 'hacks')
    var stat : number = 100
    var gameMode : number = getGameMode(data)
    if (Object.values(Stat).includes(key)) {
        if ( hacks.length > 0) {
            hacks.forEach((g) => {
                if(g.appliesToGameMode(gameMode)) {
                    stat *= g.getStatValue(key) / 100
                }
            })
        }
    }

    return bd(stat)
}

export function macguffinInfo(data : any, key : string) : bigDecimal {
    var macguffins : MacGuffin[] = parseObj(data, 'macguffins')
    var stat : number = 100
    if (Object.values(Stat).includes(key)) {
        if ( macguffins.length > 0) {
            macguffins.forEach((g) => {
                if (!_.isUndefined(g[key])) {
                    stat = 100 * g[key]
                }
            })
        }
    }
    return bd(stat)
}

export function nguInfo(data : any, key : string) : bigDecimal{
    var engus : NGU[] = parseObj(data, 'energyNGUs')
    var mngus : NGU[] = parseObj(data, 'magicNGUs')
    var gameMode : number = getGameMode(data)
    var stat : number = 1
    if (Object.values(Stat).includes(key)) {
        if ( engus.length > 0) {
            engus.forEach((g) => {
                if(g.appliesToGameMode(gameMode)){
                    stat *= g.getStatValue(key) / 100
                }
            })
        }
        
        // var x = 1
        if ( mngus.length > 0) {
            mngus.forEach((g) => {
                if(g.appliesToGameMode(gameMode)) {
                    stat *= g.getStatValue(key) / 100
                }
            })
        }
        
    }

    return bd( stat == 1 ? 100 : stat * 100)
}

export function perkInfo(data : any, key : string) : bigDecimal{
    var perks : Perk[] = parseObj(data, 'perks')
    var stat : number = 100
    var gameMode : number = getGameMode(data)
    
    if (Object.values(Stat).includes(key)) {
        if ( perks.length > 0) {
            perks.forEach((g) => {
                if(g.getStatValue(key) != 0 && g.appliesToGameMode(gameMode)) {
                    stat *= (100 + g.getStatValue(key)) / 100.0
                }
            })
        }
    }
    return bd(stat)
}


export function perkLevel(data : any, key : string) : number {
    var perks : Perk[] = parseObj(data, 'perks')
    
    if(perks.length > 0) {
        for(var p of perks) {
            if(p.key == key) {
                return p.level
            }
        }
    }
    return 0
}

export function quirkInfo(data : any, key : string) : bigDecimal{
    var quirks : Quirk[] = parseObj(data, 'quirks')
    var stat : number = 100
    var gameMode : number = getGameMode(data)

    if (Object.values(Stat).includes(key)) {
        if ( quirks.length > 0) {
            quirks.forEach((g) => {
                if(g.appliesToGameMode(gameMode)) {
                    stat *= ((g.getStatValue(key) + 100) / 100)
                }
            })
        }
    }

    return bd(stat)
}

export function wandoosOSLevel(data : any) : bigDecimal {
    var wandoos : Wandoos[] = parseObj(data, 'wandoos')
    if(!_.isUndefined(wandoos[0])){
        return bd(wandoos[0].osLevel)
    }
    return bd(0)
}

export function wishInfo(data : any, key : string) : bigDecimal{
    var wishes : Wish[] = parseObj(data, 'wishes')
    var stat : number = 100
    var gameMode : number = getGameMode(data)

    if (Object.values(Stat).includes(key)) {
        if ( wishes.length > 0) {
            wishes.forEach((g) => {
                if(g.appliesToGameMode(gameMode)) {
                    stat *= ((g.getStatValue(key) + 100) / 100)
                }
            })
        }
    }

    return bd(stat)
}

// export function isMaxxedItem(data : any, itemId : number) : boolean {
//     var itemList = parseObj(data, 'maxxedItems')
//     if(_.isArray(itemList)){
//         return parseObj(data, 'maxxedItems').includes(itemId)
//     }
//     return false
// }

export function isMaxxedItemSet(data : any, itemSet : ItemSet) : boolean {
    var itemSets = parseObj(data, 'itemSets')
    return (itemSet.key in itemSets) ? itemSets[itemSet.key].isMaxxed : false;
}

export function maxxedItemSetNum(data : any, itemSet : ItemSet) : number {
    var itemSets = parseObj(data, 'itemSets')
    return (itemSet.key in itemSets) ? itemSets[itemSet.key].numMaxxed : 0;
}

export function isCompletedChallenge(data : any, key : string, mode : number, level : number) : boolean {
    if (mode == GameMode.NORMAL) {
        key = 'normal' + key
    } else if (mode == GameMode.EVIL) {
        key = 'evil' + key
    } else if (mode == GameMode.SADISTIC) {
        key = 'sadistic' + key
    }
    var challenges = parseObj(data, 'challenges')
    var challenge = CHALLENGES.getByKey(key)
    var chosenChallenge = (!_.isUndefined(challenges[mode]) && !_.isUndefined(challenge) && challenges[mode][challenge.id % 100])
    return (!_.isUndefined(chosenChallenge) && chosenChallenge.level >= level)
}