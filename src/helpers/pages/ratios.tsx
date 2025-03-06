import Player from "@/assets/player";
import bigDecimal from "js-big-decimal";
import _ from "lodash";
import { bd, bigdec_max, bigdec_min } from "../numbers";
import { gensBDType, gensType, resKeyType } from "../types";

const basicGens: gensType = {
    energy: { power: bd(0), cap: bd(0), bar: bd(0) },
    magic: { power: bd(0), cap: bd(0), bar: bd(0) },
    res3: { power: bd(0), cap: bd(0), bar: bd(0) },
};

// Get the max based off the ratios
function getRatMax(base: bigDecimal, ratio: bigDecimal, oppRatio: bigDecimal, thirdRatio: bigDecimal): bigDecimal {
    // Might accidentally divide by 0
    try {
        // Get ratio of base power with our ratio (how many units we have of the ratio desired)
        const rat = base.round().divide(ratio, 20);
        // Take our units and multiply by the "opposite" ratio (see what quantity we need)
        return rat.multiply(oppRatio).multiply(thirdRatio);
    } catch {
        return bd(0);
    }
}

// Get the unit based off the ratios
function getRatUnit(base: bigDecimal, ratio: bigDecimal, mainRatio: bigDecimal): bigDecimal {
    // Might accidentally divide by 0
    try {
        // Get ratio of base power with our ratio (how many units we have of the ratio desired)
        const rat = base.round().divide(ratio);
        // Take our units and devide by the "same" ratio (smaller unit)
        return rat.divide(mainRatio);
    } catch {
        return bd(0);
    }
}
// Get numbers desired
function getDesired(maxItem: bigDecimal, base: bigDecimal, ratMax: bigDecimal): bigDecimal {
    try {
        return maxItem.multiply(base.round()).divide(ratMax).floor(); //.round(0, bigDecimal.RoundingModes.HALF_DOWN)
    } catch {
        return bd(0);
    }
}

// Get numbers desired and for buying
function getBuy(desired: bigDecimal, base: bigDecimal): bigDecimal {
    return bigdec_max(desired.subtract(base.round()), bd(0));
}

function toStr(ty: string, elt: string, upperFirst: boolean = false) {
    let str = "";
    if (upperFirst) {
        str += ty.charAt(0).toUpperCase() + ty.slice(1);
    } else {
        str += ty;
    }
    str += elt.charAt(0).toUpperCase() + elt.slice(1);
    return str;
}

export function getRatioInfo(player: Player): [gensType, gensType, gensBDType, string] {
    const ratMax: gensType = _.cloneDeep(basicGens);
    const ratUnit: gensType = _.cloneDeep(basicGens);
    const desired: gensType = _.cloneDeep(basicGens);
    const buy: gensType = _.cloneDeep(basicGens);
    const res3Active = player.get("res3Active");

    let ty: keyof typeof ratMax;
    let elt: resKeyType;
    for (ty in basicGens) {
        if (ty == "res3" && !res3Active) {
            for (elt in basicGens[ty as keyof gensType]) {
                ratMax[ty][elt] = bd(0);
                ratUnit[ty][elt] = bd(0);
            }
        } else {
            for (elt in basicGens[ty as keyof gensType]) {
                const base = player.get("base" + toStr(ty, elt, true));
                const ratio = player.get(toStr(ty, elt) + "Ratio");
                const otherRatio = player.get(ty == "energy" ? "magicRatio" : "energyRatio");
                const thirdRatio = player.get(ty == "res3" ? "magicRatio" : "res3Ratio");
                ratMax[ty][elt] = getRatMax(base, ratio, otherRatio, res3Active ? thirdRatio : bd(1));
                ratUnit[ty][elt] = getRatUnit(base, ratio, player.get(ty + "Ratio"));
            }
        }
    }

    // Calculate desired amount
    // The largest max is where we are trying to be. So take max of all values and
    // do everything relative to that
    let maxItem = bigdec_max(
        ratMax["energy"]["power"],
        ratMax["energy"]["cap"],
        ratMax["energy"]["bar"],
        ratMax["magic"]["power"],
        ratMax["magic"]["cap"],
        ratMax["magic"]["bar"]
    );
    let minItem = bigdec_min(
        ratUnit["energy"]["power"],
        ratUnit["energy"]["cap"],
        ratUnit["energy"]["bar"],
        ratUnit["magic"]["power"],
        ratUnit["magic"]["cap"],
        ratUnit["magic"]["bar"]
    );

    if (player.get("res3Active")) {
        maxItem = bigdec_max(maxItem, ratMax["res3"]["power"], ratMax["res3"]["cap"], ratMax["res3"]["bar"]);
        minItem = bigdec_min(minItem, ratUnit["res3"]["power"], ratUnit["res3"]["cap"], ratUnit["res3"]["bar"]);
    }

    // See how much of each resource we want and how much exp it takes ot buy them
    for (ty in basicGens) {
        if (ty == "res3" && !res3Active) {
            for (elt in basicGens[ty as keyof gensType]) {
                desired[ty][elt] = bd(0);
                ratUnit[ty][elt] = bd(0);
            }
        } else {
            for (elt in basicGens[ty as keyof gensType]) {
                const base = player.get("base" + toStr(ty, elt, true));
                desired[ty][elt] = getDesired(maxItem, base, ratMax[ty][elt]);
                buy[ty][elt] = getBuy(desired[ty][elt], base);
            }
        }
    }

    // Cost to increase all the things
    const cost: gensBDType = { energy: bd(0), magic: bd(0), res3: bd(0), total: bd(0) };
    cost["energy"] = buy["energy"]["power"]
        .multiply(bd(150))
        .add(buy["energy"]["cap"].multiply(bd(40)).divide(bd(10000)))
        .add(buy["energy"]["bar"].multiply(bd(80)))
        .ceil();
    cost["magic"] = buy["magic"]["power"]
        .multiply(bd(450))
        .add(buy["magic"]["cap"].multiply(bd(120)).divide(bd(10000)))
        .add(buy["magic"]["bar"].multiply(bd(240)))
        .ceil();
    cost["total"] = cost["energy"].add(cost["magic"]);
    if (res3Active) {
        cost["res3"] = buy["res3"]["power"]
            .multiply(bd(15000000))
            .add(buy["res3"]["cap"].multiply(bd(400)))
            .add(buy["res3"]["bar"].multiply(bd(8000000)))
            .ceil();
        cost["total"] = cost["total"].add(cost["res3"]);
    }

    // Text for what to buy
    let suggestedBuy = "";
    switch (minItem) {
        case ratUnit["energy"]["power"]:
            suggestedBuy = "Energy Power";
            break;
        case ratUnit["energy"]["cap"]:
            suggestedBuy = "Energy Cap";
            break;
        case ratUnit["energy"]["bar"]:
            suggestedBuy = "Energy Bar";
            break;
        case ratUnit["res3"]["power"]:
            suggestedBuy = "Resource 3 Power";
            break;
        case ratUnit["res3"]["cap"]:
            suggestedBuy = "Resource 3 Cap";
            break;
        case ratUnit["res3"]["bar"]:
            suggestedBuy = "Resource 3 Bar";
            break;
        case ratUnit["magic"]["power"]:
            suggestedBuy = "Magic Power";
            break;
        case ratUnit["magic"]["cap"]:
            suggestedBuy = "Magic Cap";
            break;
        case ratUnit["magic"]["bar"]:
            suggestedBuy = "Magic Bar";
            break;
    }

    return [desired, buy, cost, suggestedBuy];
}
