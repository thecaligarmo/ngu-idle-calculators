import { defaultPlayerData, getCalculatedOptions, getPlayerNumberOptions, getPlayerOptions } from "./defaultPlayerData";
import { getPlayerData, isPlayerDataUpdated } from "../components/context";
import { useLocalStorage, useLocalStorageNumber } from "./localStorage";
import _ from "lodash";
import { camelToTitle } from "./strings";

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
    for (var key of playerNumberOptions) {
        var defaultVal = defaultPlayerData(playerData, key)
        var dataStateNum = useLocalStorageNumber(key, defaultVal)
        if (isPlayerDataUpdated() && dataStateNum[0] != defaultVal) {
            // dataState[1]({"value": defaultVal})
            dataStateNum[1](defaultVal)
        }
        dataObj[key] = dataStateNum
    }
    for (var key of playerOptions) {
        var defaultVal = defaultPlayerData(playerData, key)
        var dataState = useLocalStorage(key, defaultVal);
        if (isPlayerDataUpdated() && ! _.isEqual(dataState[0], defaultVal)) {
            dataState[1](defaultVal)
        }
        dataObj[key] = dataState
    }

    for (var key of calculatedOptions) {
        var defaultVal = defaultPlayerData(dataObj, key).getValue()
        var dataStateNum = useLocalStorageNumber(key, defaultVal, true);
        if (isPlayerDataUpdated() && dataStateNum[0] != defaultVal) {
            dataStateNum[1](defaultVal)
        }
        dataObj[key] = dataStateNum
    }

    return dataObj;
}

export function getRequiredStates(data : any, states : any, nameMap : any = {} ) : any{
    var ir = []
    for (var col of data) {
        let colDr = []
        for (var k of col) {
            var dataState = states[k]
            colDr.push({
                key: k,
                value: dataState,
                disabled: false,
                name: (k in nameMap) ? nameMap[k] : camelToTitle(k)
            })
        }
        ir.push(colDr)
    }

    return ir
}
