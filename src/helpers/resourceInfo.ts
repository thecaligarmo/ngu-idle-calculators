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
import Player from "@/assets/player";
import { Quirk } from "@/assets/quirks";
import { ItemSet, ItemSets } from "@/assets/sets";
import { Stat } from "@/assets/stat";
import { Wandoos } from "@/assets/wandoos";
import { Wish } from "@/assets/wish";
import bigDecimal from "js-big-decimal";
import _ from "lodash";
import { getGameMode } from "./gameMode";
import { bd, lessThan, toNum } from "./numbers";

export function achievementAPBonus(player: Player) : bigDecimal {
    const achievements = player.get('achievements')
    
    let sum = 0
    for (let i = 0; i < achievements.length; i++) {
        if(achievements[i] == 1) {
            // There are 16 of the first 6, so we can collapse as they
            // have identical points
            const j = (i < 96) ? i % 16 : i
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

export function advTrainingInfo(player: Player, key: string) : bigDecimal {
    const advTrainings : AdvTraining[] = player.get('advTrainings')
    let stat : number = 100
    if (Object.values(Stat).includes(key)) {
        if (advTrainings.length > 0) {
            advTrainings.forEach((g) => {
                stat += g.getStatValue(key)
            })
        }
    }
    return bd(stat)
}

export function apItemInfo(player: Player, key: string) : bigDecimal {
    const apItems : APItem[] = player.get('apItems')
    let stat : number = 100;
    const blueHeart = isMaxxedItemSet(player, ItemSets.BLUE_HEART)
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

export function beardInfoTemp(player: Player, key: string, pretendOn : boolean = false) : bigDecimal{
    const beards : Beard[] = player.get('beards')
    let stat : number = 100
    if (Object.values(Stat).includes(key)) {
        if ( beards.length > 0) {
            beards.forEach((g) => {
                stat += g.getTempStatValue(key, pretendOn)
            })
        }
    }
    return bd(stat)
}

export function beardInfoPerm(player: Player, key: string) : bigDecimal{
    const beards : Beard[] = player.get('beards')
    let stat : number = 100
    if (Object.values(Stat).includes(key)) {
        if ( beards.length > 0) {
            beards.forEach((g) => {
                stat += g.getPermStatValue(key)
            })
        }
    }
    return bd(stat)
}

export function cardInfo(player: Player, key: string) :bigDecimal {
    const cards : Card[] = player.get('cards')
    let stat : number = 100
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

export function activeBeards(player: Player, type : string = '') : bigDecimal {
    const beards : Beard[] = player.get('beards')
    let activeBeards = 0
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

export function challengeInfo(player: Player, key : string, gameMode : number = GameMode.ALL) : bigDecimal{
    const challenges : {[key:number] : Challenge[]} = player.get('challenges')
    let stat : number = 1
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

export function cookingInfo(player: Player, key : string) : bigDecimal {
    if (key == Stat.EXPERIENCE) {
        return player.get('cookingExp')
    }
    return bd(1)
}

function cubeInfo(player: Player, key : string, capAmount : bigDecimal = bd(-1)) : bigDecimal {
    let power = player.get('cubePower')
    let toughness = player.get('cubeToughness')
    const total = power.add(toughness)
    const digits = total.floor().getValue().length
    let extraPow : number;
    let extraTough : number;
    switch(key) {
        case Stat.POWER:
            extraPow = 0
            if( lessThan(capAmount, power)) {
                extraPow = Math.sqrt(toNum(power.subtract(capAmount)))
                power = capAmount
            }
            return power.add(bd(extraPow))
        case Stat.TOUGHNESS:
            extraTough = 0
            if( lessThan(capAmount, toughness)) {
                extraTough = Math.sqrt(toNum(toughness.subtract(capAmount)))
                toughness = capAmount
            }
            return toughness.add(bd(extraTough))
        case Stat.HEALTH:
            extraPow = 0
            if( lessThan(capAmount, power)) {
                extraPow = Math.sqrt(toNum(power.subtract(capAmount)))
                power = capAmount
            }
            return power.multiply(bd(3))
        case Stat.REGEN:
            extraTough = 0
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

function globalDiggerBonus(player: Player ) : number{
    const diggers : Digger[] = player.get('diggers')
    let totalLevel : number = 0
    if (diggers.length){
        totalLevel = Object.values(diggers).reduce((curVal: number, d : Digger) => {return d.maxLevel + curVal}, 0)
    }
    const challenges : Challenge[] = player.get('challenges')
    const challengeBonus : number = (!_.isUndefined(challenges[GameMode.NORMAL]) && !_.isUndefined(challenges[GameMode.NORMAL][10]) && challenges[GameMode.NORMAL][10].level > 0) ? 5 : 0;

    const partySetBonus : number = isMaxxedItemSet(player, ItemSets.PARTY) ? 5 : 0;

    if (totalLevel <= 500) {
        return 100 + 0.05 * totalLevel + challengeBonus + partySetBonus
    }
    return 100 + 25 + 0.05 * ((totalLevel-500) ** 0.7) + challengeBonus + partySetBonus

}

export function diggerInfo(player: Player, key: string) : bigDecimal{
    const diggers : Digger[] = player.get('diggers')
    let stat : number = 0
    if (Object.values(Stat).includes(key)) {
        if ( diggers.length > 0) {
            diggers.forEach((g) => {
                if (g.active) {
                    stat += g.getStatValue(key)
                }
            })
        }
    }
    stat *= (globalDiggerBonus(player) / 100)
    if (stat === 0) {
        return bd(100)
    } 
    return bd(stat)
}

export function equipmentInfo(player: Player, key: string) : bigDecimal {
    const gear : (Item | null)[] = [
        player.get('equipmentHead'),
        player.get('equipmentChest'),
        player.get('equipmentLegs'),
        player.get('equipmentBoots'),
        player.get('equipmentWeapon'),
        player.get('equipmentWeaponTwo'),
    ]
    const accs : Item[] = player.get('equipmentAccesories')
    let stat : number = (key == Stat.POWER || key == Stat.TOUGHNESS || key == Stat.HEALTH || key == Stat.REGEN) ? 0 : 100;
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
        if (isMaxxedItemSet(player, ItemSets.RED_HEART)) {
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


export function equipmentWithCubeInfo(player: Player, key: string) : bigDecimal {
    const stat = equipmentInfo(player, key)
    
    let capAmount = bd(-1)
    if(key == Stat.POWER) {
        capAmount = player.get('baseAdventurePower').add(bd(stat))
    }
    if(key == Stat.TOUGHNESS) {
        capAmount = player.get('baseAdventureToughness').add(bd(stat))
    }
    if(key == Stat.HEALTH) {
        capAmount = player.get('baseAdventurePower').add(equipmentInfo(player, Stat.POWER))
    }
    if(key == Stat.REGEN) {
        capAmount = player.get('baseAdventureToughness').add(equipmentInfo(player, Stat.TOUGHNESS))
    }

    const cube = cubeInfo(player, key, capAmount)

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

export function hackInfo(player: Player, key : string) : bigDecimal{
    const hacks : Hack[] = player.get('hacks')
    let stat : number = 100
    const gameMode : number = getGameMode(player)
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

export function macguffinInfo(player: Player, key : string) : bigDecimal {
    const macguffins : MacGuffin[] = player.get('macguffins')
    let stat : number = 100
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

export function nguInfo(player: Player, key : string) : bigDecimal{
    const engus : NGU[] = player.get('energyNGUs')
    const mngus : NGU[] = player.get('magicNGUs')
    const gameMode : number = getGameMode(player)
    let stat : number = 1
    if (Object.values(Stat).includes(key)) {
        if ( engus.length > 0) {
            engus.forEach((g) => {
                if(g.appliesToGameMode(gameMode)){
                    stat *= g.getStatValue(key) / 100
                }
            })
        }
        
        // let x = 1
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

export function perkInfo(player: Player, key : string) : bigDecimal{
    const perks : Perk[] = player.get('perks')
    let stat : number = 100
    const gameMode : number = getGameMode(player)
    
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


export function perkLevel(player: Player, key : string) : number {
    const perks : Perk[] = player.get('perks')
    
    if(perks.length > 0) {
        for(const p of perks) {
            if(p.key == key) {
                return p.level
            }
        }
    }
    return 0
}

export function quirkInfo(player: Player, key : string) : bigDecimal{
    const quirks : Quirk[] = player.get('quirks')
    let stat : number = 100
    const gameMode : number = getGameMode(player)

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

export function wandoosOSLevel(player: Player) : bigDecimal {
    const wandoos : Wandoos[] = player.get('wandoos')
    if(!_.isUndefined(wandoos[0])){
        return bd(wandoos[0].osLevel)
    }
    return bd(0)
}

export function wishInfo(player: Player, key : string) : bigDecimal{
    const wishes : Wish[] = player.get('wishes')
    let stat : number = 100
    const gameMode : number = getGameMode(player)

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

// export function isMaxxedItem(player: Player, itemId : number) : boolean {
//     let itemList = player.get('maxxedItems')
//     if(_.isArray(itemList)){
//         return player.get('maxxedItems').includes(itemId)
//     }
//     return false
// }

export function isMaxxedItemSet(player: Player, itemSet : ItemSet) : boolean {
    const itemSets = player.get('itemSets')
    return (itemSet.key in itemSets) ? itemSets[itemSet.key].isMaxxed : false;
}

export function maxxedItemSetNum(player: Player, itemSet : ItemSet) : number {
    const itemSets = player.get('itemSets')
    return (itemSet.key in itemSets) ? itemSets[itemSet.key].numMaxxed : 0;
}

export function isCompletedChallenge(player: Player, key : string, mode : number, level : number) : boolean {
    if (mode == GameMode.NORMAL) {
        key = 'normal' + key
    } else if (mode == GameMode.EVIL) {
        key = 'evil' + key
    } else if (mode == GameMode.SADISTIC) {
        key = 'sadistic' + key
    }
    const challenges = player.get('challenges')
    const challenge = CHALLENGES.getByKey(key)
    const chosenChallenge = (!_.isUndefined(challenges[mode]) && !_.isUndefined(challenge) && challenges[mode][challenge.id % 100])
    return (!_.isUndefined(chosenChallenge) && chosenChallenge.level >= level)
}