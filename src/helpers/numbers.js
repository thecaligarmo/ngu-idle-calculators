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