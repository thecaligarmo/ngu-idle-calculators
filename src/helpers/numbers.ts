import bigDecimal from "js-big-decimal";
import _ from "lodash";
import { getLargeSuffix } from "./largeNumbers";

export function bigdec_max(...args: bigDecimal[]): bigDecimal {
    if (args.length < 1) {
        throw "Max of empty list";
    }
    let m = args[0];
    args.forEach((a) => {
        if (lessThan(m, a)) {
            m = a;
        }
    });
    return m;
}

export function bigdec_min(...args: bigDecimal[]): bigDecimal {
    if (args.length < 1) {
        throw "Min of empty list";
    }
    let m = args[0];
    args.forEach((a) => {
        if (greaterThan(m, a)) {
            m = a;
        }
    });
    return m;
}

export function bigdec_round(num: bigDecimal, precision: bigDecimal): bigDecimal {
    return precision.multiply(num.divide(precision).round(0, bigDecimal.RoundingModes.HALF_UP));
}

export function bigdec_equals(left: bigDecimal, right: bigDecimal): boolean {
    return left.compareTo(right) == 0;
}

export function bigdec_power(num: bigDecimal | number, exponent: bigDecimal | number): bigDecimal {
    num = bd(num);
    exponent = toNum(exponent);
    if (Math.round(exponent) != exponent) {
        throw new Error("Exponent must be integer: " + exponent.toString());
    }
    if (exponent < 0) {
        throw new Error("Exponent must be positive: " + exponent.toString());
    }
    let newNum = bd(1);
    for (let i = 0; i < exponent; i++) {
        newNum = newNum.multiply(num);
    }
    return newNum;
}

export function isZero(number: bigDecimal): boolean {
    return bigdec_equals(number, bd(0));
}

export function isOne(number: bigDecimal): boolean {
    return bigdec_equals(number, bd(1));
}

export function greaterThan(left: bigDecimal, right: bigDecimal): boolean {
    return left.compareTo(right) > 0;
}

export function greaterThanOrEqual(left: bigDecimal, right: bigDecimal): boolean {
    return left.compareTo(right) >= 0;
}

export function lessThan(left: bigDecimal, right: bigDecimal): boolean {
    return left.compareTo(right) < 0;
}

export function lessThanOrEqual(left: bigDecimal, right: bigDecimal): boolean {
    return left.compareTo(right) <= 0;
}

// print/pretty number
export function pn(num: bigDecimal | number, numberFormat: string = "scientific", precision: number = 0): string {
    num = bd(num);
    // Get the floor of the number for processing
    const n = num.floor().getValue();
    const nl = n.length; // number length

    // We should only start for billions as until then it's pretty human readable
    if (nl < 10) {
        if (nl <= 3 && precision == 0) {
            precision = 2;
        }
        return toNum(num.round(precision)).toLocaleString(undefined, { maximumFractionDigits: precision }); //.toFixed(precision).toLocaleString()
    }

    // If we're in scientific format, we only want the first 4 digits
    if (numberFormat == "scientific") {
        const e = nl - 1;
        const firstFour = n.slice(0, 4);
        return (Number(firstFour) / 1000).toFixed(3).toLocaleString() + "E+" + e;
    }

    // Number of digits in front
    const nmod = nl % 3;
    // Number of 3 numbers
    const e = nmod == 0 ? Math.floor(nl / 3) - 1 : Math.floor(nl / 3);
    const firstNum = nmod == 0 ? n.slice(0, 6) : n.slice(0, nmod + 3);
    if (numberFormat == "engineering") {
        return (Number(firstNum) / 1000).toFixed(3).toLocaleString() + "E+" + e * 3;
    }
    const suffix = getLargeSuffix(e - 1);
    return (Number(firstNum) / 1000).toFixed(3).toLocaleString() + " " + suffix;
}

export function bd(num: number | bigDecimal | string): bigDecimal {
    if (num instanceof bigDecimal) {
        return num;
    }
    return new bigDecimal(num);
}

export function toNum(bigDec: bigDecimal | number | string): number {
    if (bigDec instanceof bigDecimal) {
        return Number(bigDec.getValue());
    }
    if (typeof bigDec == "string") {
        return Number(bigDec);
    }
    return bigDec;
}

// date number
export function dn(num: bigDecimal | number): string {
    num = bd(num);
    if (_.isUndefined(num) || lessThan(num, bd(0))) {
        return "00:00";
    }
    const day = bd(3600 * 24);
    const hour = bd(3600);
    const minute = bd(60);
    num = num.floor();
    const d = num.divide(day).floor();
    const h = num.modulus(day).divide(hour).floor();
    const m = num.modulus(hour).divide(minute).floor();
    const s = num.modulus(minute).floor();

    const dString = d.getValue() + ":";
    const hString = h.getValue().padStart(2, "0") + ":";
    const mString = m.getValue().padStart(2, "0") + ":";
    const sString = s.getValue().padStart(2, "0");

    let str = mString + sString;
    if (greaterThan(h, bd(0)) || greaterThan(d, bd(0))) {
        str = hString + str;
    }
    if (greaterThan(d, bd(0))) {
        str = dString + str;
        if (greaterThan(d, bd(365))) {
            return "∞";
        }
    }
    return str;
}
