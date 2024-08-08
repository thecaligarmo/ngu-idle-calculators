import { Challenge } from "@/assets/challenges";
import { GameMode } from "@/assets/mode";
import { ItemSets } from "@/assets/sets";
import bigDecimal from "js-big-decimal";
import _ from "lodash";
import { Stat } from "../assets/stat";
import { bd, bigdec_max } from "./numbers";
import { parseNum, parseObj } from "./parsers";
import { achievementAPBonus, activeBeards, advTrainingInfo, apItemInfo, beardInfoPerm, beardInfoTemp, challengeInfo, diggerInfo, equipmentInfo, hackInfo, isMaxxedItemSet, macguffinInfo, maxxedItemSetNum, nguInfo, perkInfo, quirkInfo, wandoosOSLevel, wishInfo } from "./resourceInfo";


// General Calc - gives a percentage
function calcAll(data : any, stat : string) : bigDecimal{
    var base = bd(100)

    if (isInitilizing(data)) {
        return bd(0)
    }

    if(false) {
        if(Stat.ENERGY_WANDOOS_SPEED == stat) {
            console.log('----------------------------------------')
            console.log('advTraining', advTrainingInfo(data, stat).getValue())
            console.log('ap', apItemInfo(data, stat).getValue())    
            console.log('beard', beardInfoTemp(data, stat).getValue())
            console.log('beard', beardInfoPerm(data, stat).getValue())
            console.log('challenge', challengeInfo(data, stat).getValue())
            console.log('digger', diggerInfo(data, stat).getValue())
            console.log('equipment', equipmentInfo(data, stat).getValue())
            console.log('hack', hackInfo(data, stat).getValue())
            console.log('ngu', nguInfo(data, stat).getValue())
            console.log('macguffin', macguffinInfo(data, stat).getValue())
            console.log('perk', perkInfo(data, stat).getValue())
            console.log('quirk', quirkInfo(data, stat).getValue())
            console.log('wish', wishInfo(data, stat).getValue())
        }
    }

    return bd(1)
        .multiply(advTrainingInfo(data, stat).divide(base))    
        .multiply(apItemInfo(data, stat).divide(base))    
        .multiply(beardInfoTemp(data, stat).divide(base))
        .multiply(beardInfoPerm(data, stat).divide(base))
        .multiply(challengeInfo(data, stat))
        .multiply(diggerInfo(data, stat).divide(base))
        .multiply(equipmentInfo(data, stat).divide(base))
        .multiply(hackInfo(data, stat).divide(base))
        .multiply(nguInfo(data, stat).divide(base))
        .multiply(macguffinInfo(data, stat).divide(base))
        .multiply(perkInfo(data, stat).divide(base))
        .multiply(quirkInfo(data, stat).divide(base))
        .multiply(wishInfo(data, stat).divide(base))
        
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


/** Resource 3 */

export function totalRes3Power(data : any) : bigDecimal {
    return parseNum(data, 'baseRes3Power')
        .multiply(calcAll(data, Stat.RES3_POWER)).divide(bd(100));
}

export function totalRes3Bar(data : any) : bigDecimal {
    return parseNum(data, 'baseRes3Bar')
        .multiply(calcAll(data, Stat.RES3_BARS)).divide(bd(100))
        .floor();
}

export function totalRes3Cap(data : any) : bigDecimal {
    return parseNum(data, 'baseRes3Cap')
        .multiply(calcAll(data, Stat.RES3_CAP)).divide(bd(100));
}

/** Augments */
export function totalAugmentSpeed(data : any) : bigDecimal {
    var gen : bigDecimal = calcAll(data, Stat.AUGMENT_SPEED)

    return gen
        .multiply(totalEnergyPower(data))
}


/** NGU */
export function totalEnergyNGUSpeedFactor(data : any) : bigDecimal {
    var aNumberSetModifier : bigDecimal= isMaxxedItemSet(data, ItemSets.NUMBER) ? bd(1.1) : bd(1);
    var metaSetModifier : bigDecimal= isMaxxedItemSet(data, ItemSets.META) ? bd(1.2) : bd(1);
    var gen : bigDecimal = calcAll(data, Stat.ENERGY_NGU_SPEED)
    
    return gen
        .multiply(totalEnergyPower(data))
        .multiply(aNumberSetModifier)
        .multiply(metaSetModifier)
}

export function totalMagicNGUSpeedFactor(data : any) : bigDecimal {
    var aNumberSetModifier : bigDecimal = isMaxxedItemSet(data, ItemSets.NUMBER) ? bd(1.1) : bd(1);
    var metaSetModifier : bigDecimal= isMaxxedItemSet(data, ItemSets.META) ? bd(1.2) : bd(1);
    var gen : bigDecimal = calcAll(data, Stat.MAGIC_NGU_SPEED)

    var challenges : Challenge[] = parseObj(data, 'challenges')
    var trollChallenge = (!_.isUndefined(challenges[GameMode.NORMAL]) && challenges[GameMode.NORMAL][5])
    var tcNum : bigDecimal = (!_.isUndefined(trollChallenge) && trollChallenge.level > 0) ? bd(3) : bd(1);
    
    
    return bd(1)
        .multiply(gen)
        .multiply(totalMagicPower(data))
        .multiply(aNumberSetModifier)
        .multiply(metaSetModifier)
        .multiply(tcNum)
}

/** Exp, AP, PP */
export function totalExpBonus(data : any) : bigDecimal {
    var redHeartBonus : bigDecimal = isMaxxedItemSet(data, ItemSets.RED_HEART) ? bd(1.1) : bd(1)
    var gen : bigDecimal = calcAll(data, Stat.EXPERIENCE)

    return gen
        .multiply(redHeartBonus)
}

export function totalAPBonus(data: any) : bigDecimal {
    var gen : bigDecimal = calcAll(data, Stat.AP)
    var yellowHeartBonus : bigDecimal = isMaxxedItemSet(data, ItemSets.YELLOW_HEART) ? bd(1.2) : bd(1)
    var achievBonus = achievementAPBonus(data)

    if (isInitilizing(data)) {
        return bd(0)
    }

    return bd(1)
        .multiply(gen)
        .multiply(yellowHeartBonus)
        .multiply(achievBonus).divide(bd(100))
}


export function totalPPBonus(data: any) : bigDecimal {
    var greenHeartBonus : bigDecimal = isMaxxedItemSet(data, ItemSets.GREEN_HEART) ? bd(1.2) : bd(1)
    var pissedOffKeyBonus : bigDecimal = isMaxxedItemSet(data, ItemSets.PISSED_OFF_KEY) ? bd(1.1) : bd(1)
    var PPPSetBonus : bigDecimal = isMaxxedItemSet(data, ItemSets.PRETTY) ? bd(1.1) : bd(1)
    var gen : bigDecimal = calcAll(data, Stat.PP)
    

    return bd(1)
        .multiply(gen)
        .multiply(greenHeartBonus)
        .multiply(pissedOffKeyBonus)
        .multiply(PPPSetBonus)
}


/** Misc. */
export function totalDaycareSpeed(data : any) :bigDecimal {
    var gen : bigDecimal = calcAll(data, Stat.DAYCARE_SPEED)

    return gen
}

export function totalHackSpeed(data : any) :bigDecimal {
    var gen : bigDecimal = calcAll(data, Stat.HACK_SPEED)
    var greyHearthBonus : bigDecimal = isMaxxedItemSet(data, ItemSets.GREY_HEART) ? bd(1.25) : bd(1)

    return gen
        .multiply(greyHearthBonus)
}


export function totalWishSpeed(data : any) :bigDecimal {
    var gen : bigDecimal = calcAll(data, Stat.WISH_SPEED)
    var severedHeadBonus : bigDecimal = isMaxxedItemSet(data, ItemSets.SEVERED_HEAD) ? bd(1.1337) : bd(1)
    var typoSetCBonus : bigDecimal = isMaxxedItemSet(data, ItemSets.TYPO) ? bd(1.2) : bd(1)



    return gen
        .multiply(severedHeadBonus)
        .multiply(typoSetCBonus)
}

/** Adventure Stats */
export function totalPower(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.POWER)
    var equipPower = equipmentInfo(data, Stat.POWER)
    var basePower = parseNum(data, 'baseAdventurePower')

    // Want to add equipPower instead of multiply
    var subtotal = basePower.add(equipPower)

    // Beast multiplier
    var beast = (parseNum(data, 'beastMode').compareTo(bd(1)) == 0)
                ? ( (isMaxxedItemSet(data, ItemSets.MYSTERIOUS_PURPLE_LIQUID)) ? bd(1.5) : bd(1.4))
                : bd(1)
    
    return subtotal
        .multiply(gen) //.divide(bd(100))
        .divide((equipPower.compareTo(bd(0)) > 0) ? equipPower : bd(1))
        .multiply(beast)
        //.multiply(bd(100)) % not a percentage
}

export function totalToughness(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.TOUGHNESS)
    var equipPower = equipmentInfo(data, Stat.TOUGHNESS)
    var basePower = parseNum(data, 'baseAdventureToughness')

    // Want to add equipPower instead of multiply
    var subtotal = basePower.add(equipPower)
    
    return subtotal
        .multiply(gen) //.divide(bd(100))
        .divide((equipPower.compareTo(bd(0)) > 0) ? equipPower : bd(1)) // adding Instead
}

export function totalHealth(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.HEALTH)
    var equipHealth = equipmentInfo(data, Stat.HEALTH)
    var baseHealth = parseNum(data, 'baseAdventureHealth')

    // Want to add equipHealth instead of multiply
    var subtotal = baseHealth.add(equipHealth)

    return subtotal
        .multiply(gen) //.divide(bd(100))
        .divide((equipHealth.compareTo(bd(0)) > 0) ? equipHealth : bd(1))
}

export function totalRegen(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.REGEN)
    var equipRegen = equipmentInfo(data, Stat.REGEN)
    var baseRegen = parseNum(data, 'baseAdventureRegen')

    // Want to add equipRegen instead of multiply
    var subtotal = baseRegen.add(equipRegen)
    
    return subtotal
        .multiply(gen) //.divide(bd(100))
        .divide((equipRegen.compareTo(bd(0)) > 0) ? equipRegen : bd(1)) // adding Instead
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
    var dropChanceSetModifier = isMaxxedItemSet(data, ItemSets.NORMAL_ACC) ? bd(1.25) : bd(1)
    var bloodModifier = (parseNum(data, 'bloodMagicDropChance').add(bd(100))).divide(bd(100))
    var yggdrasilModifier = parseNum(data, 'yggdrasilDropChance').divide(bd(100))

    return bd(1)
        .multiply(gen)
        .multiply(twoDSetModifier)
        .multiply(bloodModifier)
        .multiply(yggdrasilModifier)
        .multiply(dropChanceSetModifier)
    
}

/** Beards */
export function totalEnergyBeardSpeed(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.ENERGY_BEARD_SPEED)
    var eBar = totalEnergyBar(data).floor();
    var ePower = bd(Math.sqrt(Number(totalEnergyPower(data).getValue())))
    var armpitSet = isMaxxedItemSet(data, ItemSets.UUG) ? bd(1.1) : bd(1);
    var beardSet = isMaxxedItemSet(data, ItemSets.BEARDVERSE) ? bd(0.9) : bd(1)
    var abeards = bigdec_max(activeBeards(data, 'energy').multiply(beardSet), bd(1))
    return gen
        .multiply(eBar)
        .multiply(ePower)
        .multiply(armpitSet)
        .divide(bd(abeards))
}

export function totalMagicBeardSpeed(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.MAGIC_BEARD_SPEED)
    var mBar = totalMagicBar(data).floor();
    var mPower = bd(Math.sqrt(Number(totalMagicPower(data).getValue())))
    var armpitSet = isMaxxedItemSet(data, ItemSets.UUG) ? bd(1.1) : bd(1);
    var beardSet = isMaxxedItemSet(data, ItemSets.BEARDVERSE) ? bd(0.9) : bd(1)
    var abeards = bigdec_max(activeBeards(data, 'magic').multiply(beardSet), bd(1))
    return gen
        .multiply(mBar)
        .multiply(mPower)
        .multiply(armpitSet)
        .divide(bd(abeards))
}


/** Wandoos */
export function totalEnergyWandoosSpeed(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.ENERGY_WANDOOS_SPEED)
    var osLevel = (wandoosOSLevel(data).add(bd(1))).multiply(bd(0.04))
    var bootup = isMaxxedItemSet(data, ItemSets.WANDOOS) ? bd(1.1) : bd(1)
    
    // OS Level
    // Bootup
    return gen
        .multiply(osLevel)
        .multiply(bootup)
}

export function totalMagicWandoosSpeed(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.MAGIC_WANDOOS_SPEED)
    var osLevel = (wandoosOSLevel(data).add(bd(1))).multiply(bd(0.04))
    var bootup = isMaxxedItemSet(data, ItemSets.WANDOOS) ? bd(1.1) : bd(1)
    
    // OS Level
    // Bootup
    return gen
        .multiply(osLevel)
        .multiply(bootup)
}


/** Other */
export function totalSeedGainBonus(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.SEED_GAIN)
    return gen
}

export function totalYggdrasilYieldBonus(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.YGGDRASIL_YIELD)
    return gen
}

export function totalQuestRewardBonus(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.QUEST_REWARD)
    var questSet =  bd(1.02 ** maxxedItemSetNum(data, ItemSets.QUESTS))
    var mobsterSet = isMaxxedItemSet(data, ItemSets.MOBSTER) ? bd(1.15) : bd(1)
    var orangeHeart = isMaxxedItemSet(data, ItemSets.ORANGE_HEART) ? bd(1.2) : bd(1)
    
    return gen
        .multiply(questSet)
        .multiply(mobsterSet)
        .multiply(orangeHeart)
}


export function totalQuestDropBonus(data : any) : bigDecimal {
    var gen = calcAll(data, Stat.QUEST_DROP)
    var sigilSet = isMaxxedItemSet(data, ItemSets.SIGIL) ? bd(1.1) : bd(1)
    
    return gen
        .multiply(sigilSet)
}

export function totalMayoSpeed(data : any) :bigDecimal {
    var gen = calcAll(data, Stat.MAYO_SPEED)
    return gen
}


export function getIdleAttackModifier(spoopySetBonus : boolean, sadNEC : bigDecimal) : bigDecimal {
    return (spoopySetBonus ? bd(1.5) : bd(1.2))
        .multiply(
            bd(1)
            .add(sadNEC.multiply(bd(0.02)))
            .add((sadNEC.compareTo(bd(5)) >= 0) ? bd(0.1) : bd(0))
        )
}