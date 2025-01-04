import _ from "lodash";
import { getPlayerData, isPlayerDataUpdated } from "../components/context";
import { defaultPlayerData, getCalculatedOptions, getGOOptions, getPlayerNumberOptions, getPlayerOptions } from "./defaultPlayerData";
import { useLocalStorage, useLocalStorageNumber } from "./localStorage";
import { camelToTitle } from "./strings";
import { requiredDataType } from "@/components/content";

export function createStatesForData(extraRequired: requiredDataType = [], goRequired: requiredDataType = [], filter : (string | [string, number])[] | boolean = false, filterKey : string = '') : any{
    const playerData = getPlayerData();
    var playerNumberOptions : (string | [string, number])[] = getPlayerNumberOptions();
    var playerOptions : string[] = getPlayerOptions();
    var calculatedOptions : string[] = getCalculatedOptions();
    var goOptions : string[] = getGOOptions();
    var dataObj : {[key: string] : any}= {}
    var isUpdated = isPlayerDataUpdated()
    for (var col of extraRequired) {
        for (var erKey of col) {
            // playerNumberOptions.push(key)
            var erKeyString : string = filterKey + (_.isArray(erKey) ? erKey[0] : erKey)
            var defaultVal = defaultPlayerData(playerData, erKey)
            var dataStateNum = useLocalStorageNumber(erKeyString, defaultVal)
            dataObj[erKeyString] = dataStateNum
        }
    }
    // If we have a filter, filter out unecessary things
    if (_.isArray(filter)) {
        playerNumberOptions = playerNumberOptions.filter(item => filter.includes(item))
        playerOptions = playerOptions.filter(item => filter.includes(item))
        goOptions = goOptions.filter(item => filter.includes(item))
        calculatedOptions = calculatedOptions.filter(item => filter.includes(item))
    }
    
    for (var pnKey of playerNumberOptions) {
        var pnKeyString : string = filterKey + (_.isArray(pnKey) ? pnKey[0] : pnKey)
        var defaultVal = defaultPlayerData(playerData, pnKey)
        var dataStateNum = useLocalStorageNumber(pnKeyString, defaultVal)
        if (isUpdated && dataStateNum[0] != defaultVal) {
            dataStateNum[1](defaultVal)
        }
        dataObj[pnKeyString] = dataStateNum
    }

    for (var poKey of playerOptions) {
        var poKeyString : string = filterKey + poKey
        var defaultVal = defaultPlayerData(playerData, poKey)
        var dataState = useLocalStorage(poKeyString, defaultVal);
        if (isUpdated && ! _.isEqual(dataState[0], defaultVal)) {
            dataState[1](defaultVal)
        }
        dataObj[poKeyString] = dataState
    }
    
    for (var goKey of goOptions) {
        var goKeyString : string = filterKey + goKey
        var defaultVal = defaultPlayerData(playerData, goKey)
        var dataState = useLocalStorage(goKeyString, defaultVal);
        dataObj[goKeyString] = dataState
    }

    for (var coKey of calculatedOptions) {
        var coKeyString : string = filterKey + coKey
        var defaultVal = defaultPlayerData(dataObj, coKey).getValue()
        var dataStateNum = useLocalStorageNumber(coKeyString, defaultVal, true);
        if (isUpdated && dataStateNum[0] != defaultVal) {
            dataStateNum[1](defaultVal)
        }
        dataObj[coKeyString] = dataStateNum
    }

    return dataObj;
}

export function getRequiredStates(data : requiredDataType, states : any, nameMap : any = {} ) : any{
    var ir = []
    for (var col of data) {
        let colDr = []
        for (var k of col) {
            var kName : string = _.isArray(k) ? k[0] : k;
            var dataState = states[kName]
            var ty = 'number'
            var name = camelToTitle(kName)
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

            name = (kName in nameMap) ? nameMap[kName] : name
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
