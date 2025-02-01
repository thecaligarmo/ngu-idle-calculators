
import { bd, toNum } from '@/helpers/numbers'
import bigDecimal from 'js-big-decimal'

export interface infoObjType {
    'ap' ?: number,
    'attack' ?: number,
    'bar' ?: number,
    'blood' ?: number,
    'boosts' ?: number,
    'cap' ?: number,
    'cardSpeed' ?: number,
    'daycare' ?: number,
    'dc' ?: number,
    'energy' ?: number,
    'ecap' ?: number,
    'engu' ?: number,
    'epower' ?: number,
    'exp' ?: number,
    'gold' ?: number,
    'hack' ?: number,
    'magic' ?: number,
    'mayoGen' ?: number,
    'mayoSpeed' ?: number,
    'mcap' ?: number,
    'mngu' ?: number,
    'mwandoos' ?: number,
    'power' ?: number,
    'pp' ?: number,
    'qp' ?: number,
    'respawn' ?: number,
    'reward' ?: number,
    'rpower' ?: number,
    'tagEffect' ?: number,
    'toughness' ?: number,
    'wish' ?: number,
    'ygg' ?: number,
}

export function expectClose(value : number | bigDecimal , expect : number | bigDecimal, range ?: number) : number[]{
    value = toNum(value)
    expect = toNum(expect)
    
    if (range == null) {
        range = Math.max(bd(expect).floor().getValue().length - 3, 0)
    }

    const v = value / (10 ** range)
    const e = expect / (10 ** range)
    return [v, e]
}


// export function toDataObj(playerData : any, extraRequired : any[] = []) : {[key:string] : any}{
//     var playerNumberOptions = getPlayerNumberOptions();
//     var playerOptions = getPlayerOptions();
//     var calculatedOptions  = getCalculatedOptions();
//     for (var col of extraRequired) {
//         for (var k of col) {
//             playerNumberOptions.push(k)
//         }
//     }
//     var dataObj : {[key :string] : any}= {}
//     for (var key of playerNumberOptions) {
//         var defaultVal = defaultPlayerData(playerData, key)
//         dataObj[key] = [defaultVal]
//     }
//     for (var key of playerOptions) {
//         var defaultVal = defaultPlayerData(playerData, key)
//         dataObj[key] = [defaultVal]
//     }

//     for (var key of calculatedOptions) {
//         var defaultVal = defaultPlayerData(dataObj, key).getValue()
//         dataObj[key] = [defaultVal]
//     }

//     return dataObj;
// }