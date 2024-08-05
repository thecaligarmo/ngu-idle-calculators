
import {getPlayerNumberOptions, getPlayerOptions, getCalculatedOptions, defaultPlayerData} from '@/helpers/defaultPlayerData'
import bigDecimal from 'js-big-decimal'

export function expectClose(value : number | bigDecimal , expect : number | bigDecimal, range ?: number) : number[]{
    if (value instanceof bigDecimal) {
        value = Number(value.getValue())
    }
    if (expect instanceof bigDecimal) {
        expect = Number(expect.getValue())
    }
    
    if (range == null) {
        range = Math.floor(expect).toString().length - 3
    }

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
