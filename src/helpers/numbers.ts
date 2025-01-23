import bigDecimal from "js-big-decimal";
import _ from "lodash";
import { getLargeSuffix } from "./largeNumbers";

export function bigdec_max(...args : bigDecimal[]) : bigDecimal {
    if (args.length < 1){ 
        throw 'Max of empty list';
    }
    var m = args[0];
    args.forEach( a => {
        if (lessThan(m, a)) {
            m = a
        }
    });
    return m;
}

export function bigdec_min(...args : bigDecimal[]) : bigDecimal {
    if (args.length < 1){ 
        throw 'Min of empty list';
    }
    var m = args[0];
    args.forEach( a => {
        if (greaterThan(m, a)) {
            m = a
        }
    });
    return m;
}

export function bigdec_round(num: bigDecimal, precision : bigDecimal) : bigDecimal{
    return precision.multiply( (num.divide(precision)).round(0, bigDecimal.RoundingModes.HALF_UP) )
}


export function bigdec_equals(left : bigDecimal, right : bigDecimal) : boolean {
    return left.compareTo(right) == 0
}

export function bigdec_power(num : bigDecimal | number, exponent : bigDecimal | number) :bigDecimal {
    num = bd(num)
    exponent = toNum(exponent)
    if (Math.round(exponent) != exponent) {
        throw new Error("Exponent must be integer: " + exponent.toString())
    }
    if (exponent < 0) {
        throw new Error("Exponent must be positive: " + exponent.toString())
    }
    let newNum = bd(1)
    for(let i = 0; i < exponent; i++) {
        newNum = newNum.multiply(num)
    }
    return newNum
}

export function isZero(number: bigDecimal) : boolean{
    return bigdec_equals(number, bd(0))
}

export function isOne(number: bigDecimal) : boolean{
    return bigdec_equals(number, bd(1))
}


export function greaterThan(left : bigDecimal, right : bigDecimal) : boolean {
    return left.compareTo(right) > 0
}

export function greaterThanOrEqual(left : bigDecimal, right : bigDecimal) : boolean {
    return left.compareTo(right) >= 0
}

export function lessThan(left : bigDecimal, right : bigDecimal) : boolean {
    return left.compareTo(right) < 0
}

export function lessThanOrEqual(left : bigDecimal, right : bigDecimal) : boolean {
    return left.compareTo(right) <= 0
}


// print/pretty number
export function pn(num : bigDecimal | number, numberFormat : string = 'scientific', precision : number = 0) : string {
    if (typeof num == 'number') {
        num = bd(num)
    }
    // Get the floor of the number for processing
    var n = num.floor().getValue();
    var nl = n.length // number length

    // We should only start for billions as until then it's pretty human readable
    if (nl < 10) {
        if (nl <= 3 && precision == 0) {
            precision = 2
        }
        return toNum(num.round(precision)).toLocaleString(undefined, { maximumFractionDigits: precision }) //.toFixed(precision).toLocaleString()
    }
    
    // If we're in scientific format, we only want the first 4 digits
    if (numberFormat == 'scientific') {
        var e = nl - 1
        var firstFour = n.slice(0,4);
        return (Number(firstFour) / 1000).toFixed(3).toLocaleString() + "E+" + e
    }

    // Number of digits in front
    var nmod = nl % 3
    // Number of 3 numbers
    var e = (nmod == 0) ? Math.floor(nl / 3) - 1 : Math.floor(nl / 3);
    var firstNum = (nmod == 0) ? n.slice(0, 6) : n.slice(0, nmod + 3);
    if (numberFormat == 'engineering') {
        return (Number(firstNum) / 1000).toFixed(3).toLocaleString() + "E+" + (e * 3)
    }
    var suffix = getLargeSuffix(e-1)
    return (Number(firstNum) / 1000).toFixed(3).toLocaleString() + " " + suffix
}


export function bd(num : any) : bigDecimal {
    if(num instanceof bigDecimal) {
        return num
    }
    return new bigDecimal(num)
}

export function toNum(bigDec: bigDecimal | number) : number {
    if(bigDec instanceof bigDecimal){
        return Number(bigDec.getValue())
    }
    return bigDec
}

// date number
export function dn(num : bigDecimal) : string{
    if ( _.isUndefined(num) || lessThan(num, bd(0))) {
        return '00:00'
    }
    var day = bd(3600 * 24)
    var hour = bd(3600)
    var minute = bd(60)
    var num = num.floor()
    var d = num.divide(day).floor();
    var h = num.modulus(day).divide(hour).floor();
    var m = num.modulus(hour).divide(minute).floor();
    var s = num.modulus(minute).floor();

    var dString = d.getValue() + ":"
    var hString = h.getValue().padStart(2, '0') + ":"
    var mString = m.getValue().padStart(2, '0') + ":"
    var sString = s.getValue().padStart(2, '0')

    var str = mString + sString
    if (greaterThan(h, bd(0))  || greaterThan(d, bd(0))) {
        str = hString + str
    }
    if (greaterThan(d, bd(0))) {
        str = dString + str
        if(greaterThan(d, bd(365))) {
            return '∞'
        }
    }
    return str
}

export function factorial(n: number) : number{
    let x = 1
    for(let i = 1; i <= n; i++) {
        x *= i
    }
    return x
}


export class Polynomial {
    coefficients : bigDecimal[]
    constructor(coefficients: (number | bigDecimal)[]){
        this.coefficients = coefficients.map((e) => bd(e))
    }
    length() {
        return this.coefficients.length
    }
    coefficient(i: number) : bigDecimal{
        if(i < this.length()){
            return this.coefficients[i]
        }
        return bd(0)
    }
    round(r: number) {
        this.coefficients = this.coefficients.map((c) => c.round(r))
    }

    isZero() {
        return this.length() == 0
    }
    add(other: Polynomial) : Polynomial{
        let n = Math.max(this.length(), other.length())
        let coefficients : bigDecimal[] = []
        for(let i = 0; i < n; i++) {
            coefficients.push(this.coefficient(i).add(other.coefficient(i)))
        }
        return new Polynomial(coefficients)
    }
    multiply(other: Polynomial) : Polynomial {
        let tl = this.length()
        let ol = other.length()
        let coefficients : bigDecimal[] = Array(tl + ol - 1).fill(bd(0))
        
        for(let i = 0; i < tl; i++) {
            for(let j = 0; j < ol; j++) {
                let c = this.coefficient(i).multiply(other.coefficient(j))
                coefficients[i+j] = coefficients[i+j].add(c)
            }
        }

        return new Polynomial(coefficients)
    }
}