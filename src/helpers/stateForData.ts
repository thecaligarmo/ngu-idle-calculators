import _ from "lodash";
import { getPlayerData, isPlayerDataUpdated } from "../components/context";
import { defaultPlayerData, getCalculatedOptions, getPlayerNumberOptions, getPlayerOptions } from "./defaultPlayerData";
import { useLocalStorage, useLocalStorageNumber } from "./localStorage";
import { camelToTitle } from "./strings";

export function createStatesForData(extraRequired: (string | [string, number])[][] = []) : any{
    const playerData = getPlayerData();
    var playerNumberOptions : (string | [string, number])[] = getPlayerNumberOptions();
    var playerOptions : string[] = getPlayerOptions();
    var calculatedOptions : string[] = getCalculatedOptions();
    for (var col of extraRequired) {
        for (var key of col) {
            playerNumberOptions.push(key)
        }
    }
    var dataObj : {[key: string] : any}= {}
    for (var pnKey of playerNumberOptions) {
        var pnKeyString : string = _.isArray(pnKey) ? pnKey[0] : pnKey
        var defaultVal = defaultPlayerData(playerData, pnKey)
        var dataStateNum = useLocalStorageNumber(pnKeyString, defaultVal)
        if (isPlayerDataUpdated() && dataStateNum[0] != defaultVal) {
            // dataState[1]({"value": defaultVal})
            dataStateNum[1](defaultVal)
        }
        dataObj[pnKeyString] = dataStateNum
    }
    for (var poKey of playerOptions) {
        var defaultVal = defaultPlayerData(playerData, poKey)
        var dataState = useLocalStorage(poKey, defaultVal);
        if (isPlayerDataUpdated() && ! _.isEqual(dataState[0], defaultVal)) {
            dataState[1](defaultVal)
        }
        dataObj[poKey] = dataState
    }

    for (var coKey of calculatedOptions) {
        var defaultVal = defaultPlayerData(dataObj, coKey).getValue()
        var dataStateNum = useLocalStorageNumber(coKey, defaultVal, true);
        if (isPlayerDataUpdated() && dataStateNum[0] != defaultVal) {
            dataStateNum[1](defaultVal)
        }
        dataObj[coKey] = dataStateNum
    }

    return dataObj;
}

export function getRequiredStates(data : any, states : any, nameMap : any = {} ) : any{
    var ir = []
    for (var col of data) {
        let colDr = []
        for (var k of col) {
            var kName : string = _.isArray(k) ? k[0] : k;
            var dataState = states[kName]
            var ty = 'number'
            var name = (kName in nameMap) ? nameMap[kName] : camelToTitle(kName)
            var pre = ''
            var inputLength = 0
            if (kName.slice(-1) == '%') {
                ty = 'percent'
            } else if (kName.slice(-1) == '^') {
                ty = 'checkbox'
                name = camelToTitle(kName.slice(0, -1))
            } else if (kName.includes('?')) {
                var sp = kName.split('?')
                name = camelToTitle(sp[0])
                pre = camelToTitle(sp[1])
            } else if(kName.includes('-')) {
                var sp = kName.split('-')
                name = camelToTitle(sp[0])
                inputLength = Number(sp[1])
            }
            var id = kName.replace('^', '').replace('%', '')
            colDr.push({
                key: kName,
                value: dataState,
                disabled: false,
                name: name,
                type: ty,
                id: id,
                pre: pre,
                inputLength: inputLength,
            })
        }
        ir.push(colDr)
    }

    return ir
}
