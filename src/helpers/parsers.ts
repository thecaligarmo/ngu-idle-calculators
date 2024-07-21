import bigDecimal from "js-big-decimal"
import { bd } from "./numbers"
import { GameMode } from "@/assets/mode"


// Parse an object to get something back properly
export function parseObj(state: any, key: string) {
    var x : any = state[key][0]
    if (typeof x === 'string') {
        x = JSON.parse(x)
    }
    if (typeof x === 'number') {
        return {}
    }
    return x
}


// Parse a number to get back a bigDecimal
export function parseNum(state: any, key: string) : bigDecimal{
    var x : any = state[key][0]
    if (x instanceof bigDecimal) {
        return x
    }
    return bd(x)
}
