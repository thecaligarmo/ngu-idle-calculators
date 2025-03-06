import { Challenge, ChallengeKeys } from "@/assets/challenges";
import { Titan } from "@/assets/enemy";
import { GameMode } from "@/assets/mode";
import Player from "@/assets/player";
import { ItemSets } from "@/assets/sets";
import { Stat } from "@/assets/stat";
import bigDecimal from "js-big-decimal";
import _ from "lodash";
import { getGameMode } from "./gameMode";
import { bd, bigdec_max, bigdec_min, greaterThan, greaterThanOrEqual, isZero, toNum } from "./numbers";
import {
    achievementAPBonus,
    activeBeards,
    advTrainingInfo,
    apItemInfo,
    beardInfoPerm,
    beardInfoTemp,
    cardInfo,
    challengeInfo,
    cookingInfo,
    diggerInfo,
    equipmentWithCubeInfo,
    hackInfo,
    isCompletedChallenge,
    isMaxxedItemSet,
    macguffinInfo,
    maxxedItemSetNum,
    nguInfo,
    perkInfo,
    quirkInfo,
    wandoosOSLevel,
    wishInfo,
} from "./resourceInfo";

// General Calc - gives a percentage
function calcAll(player: Player, stat: string): bigDecimal {
    const base = bd(100);

    if (isInitilizing(player)) {
        return bd(0);
    }

    // For easy testing when things go down
    // eslint-disable-next-line
    if (false) {
        if (Stat.AUGMENT_SPEED == stat) {
            console.log("----------------------------------------");
            console.log("advTraining", advTrainingInfo(player, stat).getValue());
            console.log("ap", apItemInfo(player, stat).getValue());
            console.log("beard", beardInfoTemp(player, stat).getValue());
            console.log("beard", beardInfoPerm(player, stat).getValue());
            console.log("challenge", challengeInfo(player, stat).getValue());
            console.log("digger", diggerInfo(player, stat).getValue());
            console.log("equipment", equipmentWithCubeInfo(player, stat).getValue());
            console.log("hack", hackInfo(player, stat).getValue());
            console.log("ngu", nguInfo(player, stat).getValue());
            console.log("macguffin", macguffinInfo(player, stat).getValue());
            console.log("perk", perkInfo(player, stat).getValue());
            console.log("quirk", quirkInfo(player, stat).getValue());
            console.log("wish", wishInfo(player, stat).getValue());
        }
    }

    return bd(1)
        .multiply(advTrainingInfo(player, stat).divide(base))
        .multiply(apItemInfo(player, stat).divide(base))
        .multiply(beardInfoTemp(player, stat).divide(base))
        .multiply(beardInfoPerm(player, stat).divide(base))
        .multiply(cardInfo(player, stat).divide(base))
        .multiply(challengeInfo(player, stat))
        .multiply(diggerInfo(player, stat).divide(base))
        .multiply(equipmentWithCubeInfo(player, stat).divide(base))
        .multiply(hackInfo(player, stat).divide(base))
        .multiply(nguInfo(player, stat).divide(base))
        .multiply(macguffinInfo(player, stat).divide(base))
        .multiply(perkInfo(player, stat).divide(base))
        .multiply(quirkInfo(player, stat).divide(base))
        .multiply(wishInfo(player, stat).divide(base))
        .multiply(cookingInfo(player, stat)); // Already divided
}

export function isInitilizing(player: Player): boolean {
    // We want to return 0 if we don't have data yet
    const basePower = player.get("baseAdventurePower");
    return isZero(basePower);
}

export function boostRecyclying(player: Player): bigDecimal {
    let boostRecyclying: bigDecimal = player.get("boostRecyclyingPurchase").multiply(bd(100));
    const challenges: Challenge[] = player.get("challenges");
    if (challenges && !_.isUndefined(challenges[0])) {
        boostRecyclying = boostRecyclying.add(bd(challenges[0].level * 10)); // 10 % each level
    }
    return boostRecyclying;
}

/** Energy */
export function totalEnergyPower(player: Player, nude: boolean = false): bigDecimal {
    let epower = player.get("baseEnergyPower").multiply(calcAll(player, Stat.ENERGY_POWER)).divide(bd(100));

    if (nude) {
        epower = epower
            .multiply(bd(100 * 100))
            .divide(equipmentWithCubeInfo(player, Stat.ENERGY_POWER).multiply(apItemInfo(player, Stat.ENERGY_POWER)));
    }
    return bigdec_min(bd(1e18).multiply(apItemInfo(player, Stat.ENERGY_POWER)), epower);
}

export function totalEnergyBar(player: Player, nude: boolean = false): bigDecimal {
    let ebar = player.get("baseEnergyBar").multiply(calcAll(player, Stat.ENERGY_BARS)).divide(bd(100));
    if (nude) {
        ebar = ebar
            .multiply(bd(100 * 100))
            .divide(equipmentWithCubeInfo(player, Stat.ENERGY_BARS).multiply(apItemInfo(player, Stat.ENERGY_BARS)));
    }
    return bigdec_min(bd(1e18).multiply(apItemInfo(player, Stat.ENERGY_BARS)), ebar);
}

export function totalEnergyCap(player: Player, nude: boolean = false): bigDecimal {
    let ecap = player.get("baseEnergyCap").multiply(calcAll(player, Stat.ENERGY_CAP)).divide(bd(100));
    if (nude) {
        ecap = ecap
            .multiply(bd(100 * 100))
            .divide(equipmentWithCubeInfo(player, Stat.ENERGY_CAP).multiply(apItemInfo(player, Stat.ENERGY_CAP)));
    }
    return bigdec_min(bd(9e18), ecap);
}

/** Magic */

export function totalMagicPower(player: Player, nude: boolean = false): bigDecimal {
    let mpower = player.get("baseMagicPower").multiply(calcAll(player, Stat.MAGIC_POWER)).divide(bd(100));
    if (nude) {
        mpower = mpower
            .multiply(bd(100 * 100))
            .divide(equipmentWithCubeInfo(player, Stat.MAGIC_POWER).multiply(apItemInfo(player, Stat.MAGIC_POWER)));
    }
    return bigdec_min(bd(1e18).multiply(apItemInfo(player, Stat.MAGIC_POWER)), mpower);
}

export function totalMagicBar(player: Player, nude: boolean = false): bigDecimal {
    let mbar = player.get("baseMagicBar").multiply(calcAll(player, Stat.MAGIC_BARS)).divide(bd(100));
    if (nude) {
        mbar = mbar
            .multiply(bd(100 * 100))
            .divide(equipmentWithCubeInfo(player, Stat.MAGIC_BARS).multiply(apItemInfo(player, Stat.MAGIC_BARS)));
    }
    return bigdec_min(bd(1e18).multiply(apItemInfo(player, Stat.MAGIC_BARS)), mbar);
}

export function totalMagicCap(player: Player, nude: boolean = false): bigDecimal {
    let mcap = player.get("baseMagicCap").multiply(calcAll(player, Stat.MAGIC_CAP)).divide(bd(100));
    if (nude) {
        mcap = mcap
            .multiply(bd(100 * 100))
            .divide(equipmentWithCubeInfo(player, Stat.MAGIC_CAP).multiply(apItemInfo(player, Stat.MAGIC_CAP)));
    }
    return bigdec_min(bd(9e18), mcap);
}

/** Resource 3 */

export function totalRes3Power(player: Player, nude: boolean = false): bigDecimal {
    let rpower = player.get("baseRes3Power").multiply(calcAll(player, Stat.RES3_POWER)).divide(bd(100));

    if (nude) {
        rpower = rpower
            .multiply(bd(100 * 100))
            .divide(equipmentWithCubeInfo(player, Stat.RES3_POWER).multiply(apItemInfo(player, Stat.RES3_POWER)));
    }
    return bigdec_min(bd(1e18), rpower);
}

export function totalRes3Bar(player: Player, nude: boolean = false): bigDecimal {
    let rbar = player.get("baseRes3Bar").multiply(calcAll(player, Stat.RES3_BARS)).divide(bd(100));
    if (nude) {
        rbar = rbar
            .multiply(bd(100 * 100))
            .divide(equipmentWithCubeInfo(player, Stat.RES3_BARS).multiply(apItemInfo(player, Stat.RES3_BARS)));
    }

    return bigdec_min(bd(1e18), rbar.floor());
}

export function totalRes3Cap(player: Player, nude: boolean = false): bigDecimal {
    let rcap = player.get("baseRes3Cap").multiply(calcAll(player, Stat.RES3_CAP)).divide(bd(100));

    if (nude) {
        rcap = rcap
            .multiply(bd(100 * 100))
            .divide(equipmentWithCubeInfo(player, Stat.RES3_CAP).multiply(apItemInfo(player, Stat.RES3_CAP)));
    }

    return bigdec_min(bd(9e18), rcap);
}

/** Augments */
export function totalAugmentSpeed(player: Player): bigDecimal {
    const gen: bigDecimal = calcAll(player, Stat.AUGMENT_SPEED);

    return gen.multiply(totalEnergyPower(player));
}

/** NGU */
export function totalEnergyNGUSpeedFactor(player: Player): bigDecimal {
    const aNumberSetModifier: bigDecimal = isMaxxedItemSet(player, ItemSets.NUMBER) ? bd(1.1) : bd(1);
    const metaSetModifier: bigDecimal = isMaxxedItemSet(player, ItemSets.META) ? bd(1.2) : bd(1);
    const schoolSetModifier: bigDecimal = isMaxxedItemSet(player, ItemSets.BACKTOSCHOOL) ? bd(1.15) : bd(1);
    const gen: bigDecimal = calcAll(player, Stat.ENERGY_NGU_SPEED);
    const tcNum: bigDecimal = isCompletedChallenge(player, ChallengeKeys.TROLL, GameMode.SADISTIC, 1) ? bd(3) : bd(1);

    return gen
        .multiply(totalEnergyPower(player))
        .multiply(aNumberSetModifier)
        .multiply(metaSetModifier)
        .multiply(schoolSetModifier)
        .multiply(tcNum);
}

export function totalMagicNGUSpeedFactor(player: Player): bigDecimal {
    const aNumberSetModifier: bigDecimal = isMaxxedItemSet(player, ItemSets.NUMBER) ? bd(1.1) : bd(1);
    const metaSetModifier: bigDecimal = isMaxxedItemSet(player, ItemSets.META) ? bd(1.2) : bd(1);
    const schoolSetModifier: bigDecimal = isMaxxedItemSet(player, ItemSets.BACKTOSCHOOL) ? bd(1.15) : bd(1);
    const gen: bigDecimal = calcAll(player, Stat.MAGIC_NGU_SPEED);

    const tcNum: bigDecimal = isCompletedChallenge(player, ChallengeKeys.TROLL, GameMode.NORMAL, 1) ? bd(3) : bd(1);

    return bd(1)
        .multiply(gen)
        .multiply(totalMagicPower(player))
        .multiply(aNumberSetModifier)
        .multiply(metaSetModifier)
        .multiply(schoolSetModifier)
        .multiply(tcNum);
}

/** Exp, AP, PP */
export function totalExpBonus(player: Player): bigDecimal {
    const redHeartBonus: bigDecimal = isMaxxedItemSet(player, ItemSets.RED_HEART) ? bd(1.1) : bd(1);
    const gen: bigDecimal = calcAll(player, Stat.EXPERIENCE);

    return gen.multiply(redHeartBonus);
}

export function totalAPBonus(player: Player): bigDecimal {
    const gen: bigDecimal = calcAll(player, Stat.AP);
    const yellowHeartBonus: bigDecimal = isMaxxedItemSet(player, ItemSets.YELLOW_HEART) ? bd(1.2) : bd(1);
    const achievBonus = achievementAPBonus(player);

    if (isInitilizing(player)) {
        return bd(0);
    }

    return bd(1).multiply(gen).multiply(yellowHeartBonus).multiply(achievBonus).divide(bd(100));
}

export function totalPPBonus(player: Player): bigDecimal {
    const greenHeartBonus: bigDecimal = isMaxxedItemSet(player, ItemSets.GREEN_HEART) ? bd(1.2) : bd(1);
    const pissedOffKeyBonus: bigDecimal = isMaxxedItemSet(player, ItemSets.PISSED_OFF_KEY) ? bd(1.1) : bd(1);
    const halloweenBonus: bigDecimal = isMaxxedItemSet(player, ItemSets.HALLOWEEN) ? bd(1.45) : bd(1);
    const PPPSetBonus: bigDecimal = isMaxxedItemSet(player, ItemSets.PRETTY) ? bd(1.1) : bd(1);
    const gen: bigDecimal = calcAll(player, Stat.PP);

    return bd(1)
        .multiply(gen)
        .multiply(greenHeartBonus)
        .multiply(pissedOffKeyBonus)
        .multiply(PPPSetBonus)
        .multiply(halloweenBonus);
}

/** Misc. */
export function totalDaycareSpeed(player: Player): bigDecimal {
    return calcAll(player, Stat.DAYCARE_SPEED);
}

export function totalHackSpeed(player: Player): bigDecimal {
    const gen: bigDecimal = calcAll(player, Stat.HACK_SPEED);
    const greyHearthBonus: bigDecimal = isMaxxedItemSet(player, ItemSets.GREY_HEART) ? bd(1.25) : bd(1);
    const tcNum: bigDecimal = isCompletedChallenge(player, ChallengeKeys.TROLL, GameMode.EVIL, 5) ? bd(1.25) : bd(1);

    return gen.multiply(greyHearthBonus).multiply(tcNum);
}

export function totalWishSpeed(player: Player): bigDecimal {
    const gen: bigDecimal = calcAll(player, Stat.WISH_SPEED);
    const severedHeadBonus: bigDecimal = isMaxxedItemSet(player, ItemSets.SEVERED_HEAD) ? bd(1.1337) : bd(1);
    const typoSetBonus: bigDecimal = isMaxxedItemSet(player, ItemSets.TYPO) ? bd(1.2) : bd(1);

    return gen.multiply(severedHeadBonus).multiply(typoSetBonus);
}

/** Adventure Stats */
export function totalPower(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.POWER);
    const equipPower = equipmentWithCubeInfo(player, Stat.POWER);
    const basePower: bigDecimal = player.get("baseAdventurePower");

    // Want to add equipPower instead of multiply
    const subtotal = basePower.add(equipPower);

    // Beast multiplier
    const beast = player.get("beastMode")
        ? isMaxxedItemSet(player, ItemSets.MYSTERIOUS_PURPLE_LIQUID)
            ? bd(1.5)
            : bd(1.4)
        : bd(1);

    // Evil Accessories
    const adventureSetModifier = isMaxxedItemSet(player, ItemSets.EVIL_ACC) ? bd(1.2) : bd(1);

    return bigdec_min(
        bd(1000e33),
        subtotal
            .multiply(gen) //.divide(bd(100))
            .divide(greaterThan(equipPower, bd(0)) ? equipPower : bd(1))
            .multiply(beast)
            .multiply(adventureSetModifier)
        //.multiply(bd(100)) % not a percentage
    );
}

export function totalToughness(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.TOUGHNESS);
    const equipPower = equipmentWithCubeInfo(player, Stat.TOUGHNESS);
    const basePower: bigDecimal = player.get("baseAdventureToughness");

    // Want to add equipPower instead of multiply
    const subtotal = basePower.add(equipPower);

    // Evil Accessories
    const adventureSetModifier = isMaxxedItemSet(player, ItemSets.EVIL_ACC) ? bd(1.2) : bd(1);

    return bigdec_min(
        bd(1000e33),
        subtotal
            .multiply(gen) //.divide(bd(100))
            .divide(greaterThan(equipPower, bd(0)) ? equipPower : bd(1)) // adding Instead
            .multiply(adventureSetModifier)
    );
}

export function totalHealth(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.HEALTH);
    const equipHealth = equipmentWithCubeInfo(player, Stat.HEALTH);
    const baseHealth: bigDecimal = player.get("baseAdventureHealth");

    // Want to add equipHealth instead of multiply
    const subtotal = baseHealth.add(equipHealth);

    // Evil Accessories
    const adventureSetModifier = isMaxxedItemSet(player, ItemSets.EVIL_ACC) ? bd(1.2) : bd(1);

    return subtotal
        .multiply(gen) //.divide(bd(100))
        .divide(greaterThan(equipHealth, bd(0)) ? equipHealth : bd(1))
        .multiply(adventureSetModifier);
}

export function totalRegen(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.REGEN);
    const equipRegen = equipmentWithCubeInfo(player, Stat.REGEN);
    const baseRegen: bigDecimal = player.get("baseAdventureRegen");

    // Want to add equipRegen instead of multiply
    const subtotal = baseRegen.add(equipRegen);

    // Evil Accessories
    const adventureSetModifier = isMaxxedItemSet(player, ItemSets.EVIL_ACC) ? bd(1.2) : bd(1);

    return subtotal
        .multiply(gen) //.divide(bd(100))
        .divide(greaterThan(equipRegen, bd(0)) ? equipRegen : bd(1)) // adding Instead
        .multiply(adventureSetModifier);
}

/** Misc Adventure */
export function totalGoldDrop(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.GOLD_DROP);

    return bd(1).multiply(gen);
}

export function totalRespawnRate(player: Player): bigDecimal {
    if (isInitilizing(player)) {
        return bd(0);
    }
    const clockSetModifier = isMaxxedItemSet(player, ItemSets.CLOCK) ? bd(0.95) : bd(1);

    // Can't use Gen because of the equipment
    return bd(1)
        .multiply(bd(200).subtract(equipmentWithCubeInfo(player, Stat.RESPAWN)))
        .divide(bd(100))
        .multiply(nguInfo(player, Stat.RESPAWN).divide(bd(100)))
        .multiply(clockSetModifier)
        .multiply(perkInfo(player, Stat.RESPAWN).divide(bd(100)))
        .multiply(wishInfo(player, Stat.RESPAWN).divide(bd(100)))
        .multiply(bd(100));
}

export function totalDropChance(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.DROP_CHANCE);
    const twoDSetModifier = isMaxxedItemSet(player, ItemSets.TWO_D) ? bd(1.0743) : bd(1);
    const dropChanceSetModifier = isMaxxedItemSet(player, ItemSets.NORMAL_ACC) ? bd(1.25) : bd(1);
    const bloodModifier: bigDecimal = player.get("bloodMagicDropChance").add(bd(100)).divide(bd(100));
    const yggdrasilModifier: bigDecimal = player.get("yggdrasilDropChance").divide(bd(100));

    return bd(1)
        .multiply(gen)
        .multiply(twoDSetModifier)
        .multiply(bloodModifier)
        .multiply(yggdrasilModifier)
        .multiply(dropChanceSetModifier);
}

/** Beards */
export function totalEnergyBeardSpeed(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.ENERGY_BEARD_SPEED);
    const eBar = totalEnergyBar(player).floor();
    const ePower = bd(Math.sqrt(toNum(totalEnergyPower(player))));
    const armpitSet = isMaxxedItemSet(player, ItemSets.UUG) ? bd(1.1) : bd(1);
    const beardSet = isMaxxedItemSet(player, ItemSets.BEARDVERSE) ? bd(0.9) : bd(1);
    const abeards = bigdec_max(activeBeards(player, "energy").multiply(beardSet), bd(1));
    return gen.multiply(eBar).multiply(ePower).multiply(armpitSet).divide(bd(abeards));
}

export function totalMagicBeardSpeed(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.MAGIC_BEARD_SPEED);
    const mBar = totalMagicBar(player).floor();
    const mPower = bd(Math.sqrt(toNum(totalMagicPower(player))));
    const armpitSet = isMaxxedItemSet(player, ItemSets.UUG) ? bd(1.1) : bd(1);
    const beardSet = isMaxxedItemSet(player, ItemSets.BEARDVERSE) ? bd(0.9) : bd(1);
    const abeards = bigdec_max(activeBeards(player, "magic").multiply(beardSet), bd(1));
    return gen.multiply(mBar).multiply(mPower).multiply(armpitSet).divide(bd(abeards));
}

/** Wandoos */
export function totalEnergyWandoosSpeed(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.ENERGY_WANDOOS_SPEED);
    const osLevel = wandoosOSLevel(player).add(bd(1)).multiply(bd(0.04));
    const bootup = isMaxxedItemSet(player, ItemSets.WANDOOS) ? bd(1.1) : bd(1);
    const gm = getGameMode(player);
    const div = gm == GameMode.SADISTIC ? bd(1e12) : bd(1);

    // OS Level
    // Bootup
    return gen.multiply(osLevel).multiply(bootup).divide(div);
}

export function totalMagicWandoosSpeed(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.MAGIC_WANDOOS_SPEED);
    const osLevel = wandoosOSLevel(player).add(bd(1)).multiply(bd(0.04));
    const bootup = isMaxxedItemSet(player, ItemSets.WANDOOS) ? bd(1.1) : bd(1);
    const gm = getGameMode(player);
    const div = gm == GameMode.SADISTIC ? bd(1e12) : bd(1);

    // OS Level
    // Bootup
    return gen.multiply(osLevel).multiply(bootup).divide(div);
}

/** Other */
export function totalSeedGainBonus(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.SEED_GAIN);
    return gen;
}

export function totalYggdrasilYieldBonus(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.YGGDRASIL_YIELD);
    return gen;
}

export function totalQuestRewardBonus(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.QUEST_REWARD);
    const questSet = bd(1.02 ** maxxedItemSetNum(player, ItemSets.QUESTS));
    const mobsterSet = isMaxxedItemSet(player, ItemSets.MOBSTER) ? bd(1.15) : bd(1);
    const orangeHeart = isMaxxedItemSet(player, ItemSets.ORANGE_HEART) ? bd(1.2) : bd(1);

    return gen.multiply(questSet).multiply(mobsterSet).multiply(orangeHeart);
}

export function totalQuestDropBonus(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.QUEST_DROP);
    const sigilSet = isMaxxedItemSet(player, ItemSets.SIGIL) ? bd(1.1) : bd(1);

    return gen.multiply(sigilSet);
}

export function totalMayoSpeed(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.MAYO_SPEED);
    const generators = totalMayoGeneration(player).subtract(bd(1)).multiply(bd(2)).add(bd(100));
    const tcNum: bigDecimal = isCompletedChallenge(player, ChallengeKeys.TROLL, GameMode.SADISTIC, 6) ? bd(1.1) : bd(1);
    const rainbowHeartBonus: bigDecimal = isMaxxedItemSet(player, ItemSets.RAINBOW_HEART) ? bd(1.1) : bd(1);
    const duckSet: bigDecimal = isMaxxedItemSet(player, ItemSets.DUCK) ? bd(1.06) : bd(1);

    return gen.multiply(generators).divide(bd(100)).multiply(tcNum).multiply(rainbowHeartBonus).multiply(duckSet);
}

export function totalCardSpeed(player: Player): bigDecimal {
    const gen = calcAll(player, Stat.CARD_SPEED);
    const tcNum: bigDecimal = isCompletedChallenge(player, ChallengeKeys.TROLL, GameMode.SADISTIC, 5) ? bd(1.1) : bd(1);
    const rainbowHeartBonus: bigDecimal = isMaxxedItemSet(player, ItemSets.RAINBOW_HEART) ? bd(1.1) : bd(1);
    const duckSet: bigDecimal = isMaxxedItemSet(player, ItemSets.DUCK) ? bd(1.06) : bd(1);
    return gen.multiply(tcNum).multiply(rainbowHeartBonus).multiply(duckSet);
}

export function totalMayoGeneration(player: Player): bigDecimal {
    return bd(1)
        .add(apItemInfo(player, Stat.MAYO_GENERATOR))
        .add(perkInfo(player, Stat.MAYO_GENERATOR))
        .add(quirkInfo(player, Stat.MAYO_GENERATOR))
        .add(wishInfo(player, Stat.MAYO_GENERATOR))
        .subtract(bd(400));
}

export function totalTagEffect(player: Player): bigDecimal {
    const beatingHeartbonus: bigDecimal = isMaxxedItemSet(player, ItemSets.BEATING_HEART) ? bd(1) : bd(0);
    if (isInitilizing(player)) {
        return bd(0);
    }
    return bd(10)
        .add(beatingHeartbonus)
        .add(perkInfo(player, Stat.TAG_EFFECT))
        .add(quirkInfo(player, Stat.TAG_EFFECT))
        .add(wishInfo(player, Stat.TAG_EFFECT))
        .subtract(bd(300));
}

export function getIdleAttackModifier(spoopySetBonus: boolean, sadNEC: bigDecimal): bigDecimal {
    return (spoopySetBonus ? bd(1.5) : bd(1.2)).multiply(
        bd(1)
            .add(sadNEC.multiply(bd(0.02)))
            .add(greaterThanOrEqual(sadNEC, bd(5)) ? bd(0.1) : bd(0))
    );
}

export function getHighestKilledTitanId(titans: Titan[]): number {
    let highestTitan: number = 0;
    Object.values(titans).forEach((titan) => {
        if (titan.hasKilled(0)) {
            highestTitan = titan.id;
        }
    });
    return highestTitan;
}
