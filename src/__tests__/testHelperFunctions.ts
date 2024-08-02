
import {getPlayerNumberOptions, getPlayerOptions, getCalculatedOptions, defaultPlayerData} from '@/helpers/defaultPlayerData'

export function expectClose(value : number , expect : number, range : number) : number[]{
    var v = value / (10 ** range)
    var e = expect / (10 ** range)
    return [v, e]
}


export function toDataObj(playerData : any, extraRequired=[]) : {[key:string] : any}{
    var playerNumberOptions = getPlayerNumberOptions();
    var playerOptions = getPlayerOptions();
    var calculatedOptions  = getCalculatedOptions();
    for (var col of extraRequired) {
        for (var k of col) {
            playerNumberOptions.push(k)
        }
    }
    var dataObj : {[key :string] : any}= {}
    for (var key of playerNumberOptions) {
        var defaultVal = defaultPlayerData(playerData, key)
        dataObj[key] = [defaultVal]
    }
    for (var key of playerOptions) {
        var defaultVal = defaultPlayerData(playerData, key)
        dataObj[key] = [defaultVal]
    }

    for (var key of calculatedOptions) {
        var defaultVal = defaultPlayerData(dataObj, key).getValue()
        dataObj[key] = [defaultVal]
    }

    return dataObj;
}
