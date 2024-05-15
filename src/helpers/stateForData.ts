import { getCalculatedOptions, getPlayerNumberOptions, getPlayerOptions } from "./defaultPlayerData";
import { getPlayerData } from "../components/context";
import _ from "lodash";

export function createStatesForData(extraRequired: string[][] = []) : any{
    const playerData = getPlayerData();
    var playerNumberOptions : string[] = getPlayerNumberOptions();
    var playerOptions : string[]= getPlayerOptions();
    var calculatedOptions : string[] = getCalculatedOptions();
    for (var col of extraRequired) {
        for (var key of col) {
            playerNumberOptions.push(key)
        }
    }
    var dataObj : {[key: string] : any}= {}

    return dataObj;
}

// export function getRequiredStates(data : any, states : any, nameMap : any = {} ) : any{
//     var ir = []
//     for (var col of data) {
//         let colDr = []
//         for (var k of col) {
//             var dataState = states[k]
//             var ty = 'number'
//             var name = (k in nameMap) ? nameMap[k] : camelToTitle(k)
//             if (k.slice(-1) == '%') {
//                 ty = 'percent'
//             } else if (k.slice(-1) == '^') {
//                 ty = 'checkbox'
//                 name = camelToTitle(k.slice(0, -1))
//             }
//             var id = k.replace('^', '').replace('%', '')
//             colDr.push({
//                 key: k,
//                 value: dataState,
//                 disabled: false,
//                 name: name,
//                 type: ty,
//                 id: id,
//             })
//         }
//         ir.push(colDr)
//     }

//     return ir
// }
