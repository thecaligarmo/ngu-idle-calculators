/**
 * This file eventually needs to be split up
 */
import _ from "lodash";
import { Stat } from "../assets/stat";
import { bd } from "./numbers";
import bigDecimal from "js-big-decimal";
import { parseObj, parseNum } from "./parsers";
import { advTraininginInfo, apItemInfo, beardInfoPerm, beardInfoTemp, challengeInfo, diggerInfo, equipmentInfo, isMaxxedItemSet, nguInfo, perkInfo, quirkInfo } from "./resourceInfo";
import { ItemSets } from "@/assets/sets";


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


/** Energy */
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

/** Adventure Stats */
export function totalPower(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.POWER)
    var equipPower = equipmentInfo(data, Stat.POWER)
    var advTraining = advTraininginInfo(data, Stat.POWER)
    var basePower = parseNum(data, 'baseAdventurePower')    

    // Want to add equipPower instead of multiply
    var subtotal = basePower.add(equipPower)
    
    return subtotal
        .multiply(gen)
        .multiply(advTraining)
        .divide(equipPower) // adding instead
        
}

export function totalToughness(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.TOUGHNESS)
    var equipPower = equipmentInfo(data, Stat.TOUGHNESS)
    var advTraining = advTraininginInfo(data, Stat.TOUGHNESS)
    var basePower = parseNum(data, 'baseAdventureToughness')    

    // Want to add equipPower instead of multiply
    var subtotal = basePower.add(equipPower)
    
    return subtotal
        .multiply(gen)
        .multiply(advTraining)
        .divide(equipPower) // adding instead
        
}

/** Misc Adventure */
export function totalGoldDrop(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.GOLD_DROP);
    return bd(1)
        .multiply(gen)
}

export function totalRespawnRate(data : any) : bigDecimal {
    var clockSetModifier = isMaxxedItemSet(data, ItemSets.NUMBER) ? bd(0.95) : bd(1);

    return bd(1)
        .multiply(bd(200).subtract(equipmentInfo(data, Stat.RESPAWN))).divide(bd(100))
        .multiply(nguInfo(data, Stat.RESPAWN).divide(bd(100)))
        .multiply(clockSetModifier)
        .multiply(bd(100))
}