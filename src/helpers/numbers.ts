import bigDecimal from "js-big-decimal";
import { getLargeSuffix } from "./largeNumbers";
import _ from "lodash";

export function bigdec_max(...args : bigDecimal[]) : bigDecimal {
    if (args.length < 1){ 
        throw 'Max of empty list';
    }
    var m = args[0];
    args.forEach( a => {
        if (m.compareTo(a) < 0) {
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
        if (m.compareTo(a) > 0) {
            m = a
        }
    });
    return m;
}

// print/pretty number
export function pn(num : bigDecimal, numberFormat : string = 'scientific', precision : number = 0) : string {
    // Get the floor of the number for processing
    var n = num.floor().getValue();
    var nl = n.length // number length

    // We should only start for billions as until then it's pretty human readable
    if (nl < 10) {
        if (nl < 3 && precision == 0) {
            precision = 2
        }
        return Number(num.round(precision).getValue()).toLocaleString() //.toFixed(precision).toLocaleString()
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

// date number
export function dn(num : bigDecimal) : string{
    if ( _.isUndefined(num) || num.compareTo(bd(0)) == -1) {
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
    if (h.compareTo(bd(0)) == 1 || d.compareTo(bd(0)) == 1) {
        str = hString + str
    }
    if (d.compareTo(bd(0)) == 1) {
        str = dString + str
        if(d.compareTo(bd(365)) == 1) {
            return '∞'
        }
    }
    return str
}


