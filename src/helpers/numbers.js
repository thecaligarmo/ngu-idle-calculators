import bigDecimal from "js-big-decimal";

export function bigdec_max(...args){
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

export function bigdec_min(...args){
    if (args.length < 1){ 
        throw 'Max of empty list';
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
export function pn(num) {
    return num.getPrettyValue()
}

export function bd(num) {
    return new bigDecimal(num)
}

// date number
export function dn(num){
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
    
    // var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    // var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    // var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    // var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    var str = mString + sString
    if (h.compareTo(bd(0)) == 1) {
        str = hString + str
    }
    if (d.compareTo(bd(0)) == 1) {
        str = dString + str
    }
    return str
}