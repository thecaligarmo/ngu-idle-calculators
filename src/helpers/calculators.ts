/**
 * This file eventually needs to be split up
 */
import _ from "lodash";
import { Stat } from "../assets/stat";
import { bd } from "./numbers";
import bigDecimal from "js-big-decimal";
import { parseObj, parseNum } from "./parsers";
import { achievementAPBonus, advTrainingInfo, apItemInfo, beardInfoPerm, beardInfoTemp, challengeInfo, diggerInfo, equipmentInfo, isMaxxedItem, isMaxxedItemSet, macguffinInfo, nguInfo, perkInfo, quirkInfo } from "./resourceInfo";
import { ItemSets } from "@/assets/sets";


// General Calc - gives a percentage
function calcAll(data : any, stat : string) : bigDecimal{
    var base = bd(100)

    if (isInitilizing(data)) {
        return bd(0)
    }

    return bd(1)
        .multiply(equipmentInfo(data, stat)).divide(base)
        .multiply(perkInfo(data, stat)).divide(base)
        .multiply(quirkInfo(data, stat)).divide(base)
        .multiply(nguInfo(data, stat).divide(base))
        .multiply(beardInfoTemp(data, stat).divide(base))
        .multiply(beardInfoPerm(data, stat).divide(base))
        .multiply(diggerInfo(data, stat).divide(base))
        .multiply(challengeInfo(data, stat))
        .multiply(apItemInfo(data, stat).divide(base))
        .multiply(macguffinInfo(data, stat).divide(base))
}

function isInitilizing(data : any ) : boolean {
    // We want to return 0 if we don't have data yet
    var basePower = parseNum(data, 'baseAdventurePower')
    return (basePower.compareTo(bd(0)) == 0)
}

export function boostRecyclying(data : any) : bigDecimal {
    var boostRecyclying = parseNum(data, 'boostRecyclyingPurchase').multiply(bd(100))
    var challenges = parseObj(data, 'challenges')
    if(challenges && !_.isUndefined(challenges[0])) {
        boostRecyclying = boostRecyclying.add(bd(challenges[0].level * 10)) // 10 % each level
    }
    return boostRecyclying
}


/** Energy */
export function totalEnergyPower(data : any) : bigDecimal {
    return parseNum(data, 'baseEnergyPower')
        .multiply(calcAll(data, Stat.ENERGY_POWER)).divide(bd(100))
}

export function totalEnergyBar(data : any) : bigDecimal {
    return parseNum(data, 'baseEnergyBar')
        .multiply(calcAll(data, Stat.ENERGY_BARS)).divide(bd(100));
}

export function totalEnergyCap(data : any) : bigDecimal {
    return parseNum(data, 'baseEnergyCap')
        .multiply(calcAll(data, Stat.ENERGY_CAP)).divide(bd(100));
}

/** Magic */

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


/** NGU */
export function totalEnergyNGUSpeedFactor(data : any) : bigDecimal {
    var aNumberSetModifier : bigDecimal= isMaxxedItemSet(data, ItemSets.NUMBER) ? bd(1.1) : bd(1);
    var gen : bigDecimal = calcAll(data, Stat.ENERGY_NGU_SPEED)
    
    return bd(1)
        .multiply(gen)
        .multiply(totalEnergyPower(data))
        .multiply(aNumberSetModifier)
}

export function totalMagicNGUSpeedFactor(data : any) : bigDecimal {
    var aNumberSetModifier : bigDecimal = isMaxxedItemSet(data, ItemSets.NUMBER) ? bd(1.1) : bd(1);
    var gen : bigDecimal = calcAll(data, Stat.MAGIC_NGU_SPEED)
    var trollChallenge : any = parseObj(data, 'challenges')[5]
    var tcNum : bigDecimal = (!_.isUndefined(trollChallenge) && trollChallenge.level > 0) ? bd(3) : bd(1);
    
    return bd(1)
        .multiply(gen)
        .multiply(totalMagicPower(data))
        .multiply(aNumberSetModifier)
        .multiply(tcNum)
}

/** Exp, AP, PP */
export function totalExpBonus(data : any) : bigDecimal {
    var redHeartBonus : bigDecimal = isMaxxedItem(data, 119) ? bd(1.1) : bd(1)
    var gen : bigDecimal = calcAll(data, Stat.EXPERIENCE)

    return bd(1)
        .multiply(gen)
        .multiply(redHeartBonus)
}

export function totalAPBonus(data: any) : bigDecimal {
    var yellowHeartBonus : bigDecimal = isMaxxedItem(data, 129) ? bd(1.2) : bd(1)
    var achievBonus = achievementAPBonus(data)

    if (isInitilizing(data)) {
        return bd(0)
    }

    return bd(100)
        .multiply(yellowHeartBonus)
        .multiply(achievBonus).divide(bd(100))
}

export function totalPPBonus(data: any) : bigDecimal {
    var greenHeartBonus : bigDecimal = isMaxxedItem(data, 171) ? bd(1.2) : bd(1)
    var pissedOffKeyBonus : bigDecimal = isMaxxedItem(data, 172) ? bd(1.1) : bd(1)
    var gen : bigDecimal = calcAll(data, Stat.PP)
    

    return bd(1)
        .multiply(gen)
        .multiply(greenHeartBonus)
        .multiply(pissedOffKeyBonus)
}

/** Adventure Stats */
export function totalPower(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.POWER)
    var equipPower = equipmentInfo(data, Stat.POWER)
    var advTraining = advTrainingInfo(data, Stat.POWER)
    var basePower = parseNum(data, 'baseAdventurePower')

    // Want to add equipPower instead of multiply
    var subtotal = basePower.add(equipPower)

    // Beast multiplier
    var beast = parseNum(data, 'beastMode').compareTo(bd(1)) == 0 ? bd(1.4) : bd(1)
    
    return subtotal
        .multiply(gen).divide(bd(100))
        .multiply(advTraining)// .divide(bd(100))
        .divide((equipPower.compareTo(bd(0)) > 0) ? equipPower : bd(1))
        .multiply(beast)
        //.multiply(bd(100)) % not a percentage
}

export function totalToughness(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.TOUGHNESS)
    var equipPower = equipmentInfo(data, Stat.TOUGHNESS)
    var advTraining = advTrainingInfo(data, Stat.TOUGHNESS)
    var basePower = parseNum(data, 'baseAdventureToughness')

    // Want to add equipPower instead of multiply
    var subtotal = basePower.add(equipPower)
    
    return subtotal
        .multiply(gen).divide(bd(100))
        .multiply(advTraining)
        .divide((equipPower.compareTo(bd(0)) > 0) ? equipPower : bd(1)) // adding Instead
}

/** Misc Adventure */
export function totalGoldDrop(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.GOLD_DROP);

    return bd(1)
        .multiply(gen)
}

export function totalRespawnRate(data : any) : bigDecimal {
    var clockSetModifier = isMaxxedItemSet(data, ItemSets.NUMBER) ? bd(0.95) : bd(1);

    if (isInitilizing(data)) {
        return bd(0)
    }

    return bd(1)
        .multiply(bd(200).subtract(equipmentInfo(data, Stat.RESPAWN))).divide(bd(100))
        .multiply(nguInfo(data, Stat.RESPAWN).divide(bd(100)))
        .multiply(clockSetModifier)
        .multiply(bd(100))
}

export function totalDropChance(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.DROP_CHANCE)
    var twoDSetModifier = isMaxxedItemSet(data, ItemSets.TWO_D) ? bd(1.0743) : bd(1)
    var bloodModifier = (parseNum(data, 'bloodMagicDropChance').add(bd(100))).divide(bd(100))
    var yggdrasilModifier = parseNum(data, 'yggdrasilDropChance').divide(bd(100))

    return bd(1)
        .multiply(gen)
        .multiply(twoDSetModifier)
        .multiply(bloodModifier)
        .multiply(yggdrasilModifier)
    
}