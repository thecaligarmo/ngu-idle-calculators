
import {getPlayerNumberOptions, getPlayerOptions, getCalculatedOptions, defaultPlayerData} from '@/helpers/defaultPlayerData'

export function expectClose(value, expect, range) {
    var v = value / (10 ** range)
    var e = expect / (10 ** range)
    return [v, e]
}


export function toDataObj(playerData, extraRequired=[]){
    var playerNumberOptions = getPlayerNumberOptions();
    var playerOptions = getPlayerOptions();
    var calculatedOptions  = getCalculatedOptions();
    for (var col of extraRequired) {
        for (var key of col) {
            playerNumberOptions.push(key)
        }
    }
    var dataObj = {}
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
