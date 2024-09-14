import bigDecimal from "js-big-decimal";

export type bigDecimalObj = {[key: string] : bigDecimal}

interface Dictionary<T> {
    [key: string]: T;
}

function objectMap<TValue>(obj : Dictionary<TValue>, fn: (v:any) => {}){
    return Object.fromEntries(
        Object.entries(obj).map(
            ([k, v]) => [k, fn(v)]
        )
    )
}

export function toObjectMap(arr : any[], keyFn: (k:any) => {}, valueFn: (v:any) => {}){
    return Object.fromEntries(
        arr.map(
            (v) => [keyFn(v), valueFn(v)]
        )
    )
}