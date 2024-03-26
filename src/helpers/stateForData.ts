import { defaultPlayerData, getCalculatedOptions, getPlayerNumberOptions, getPlayerOptions } from "./defaultPlayerData";
import { getPlayerData, isPlayerDataUpdated } from "./context";
import { useLocalStorage, useLocalStorageNumber } from "./localStorage";
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
    for (var key of playerNumberOptions) {
        var defaultVal = defaultPlayerData(playerData, key)
        var dataState = useLocalStorageNumber(key, defaultVal)
        if (isPlayerDataUpdated() && dataState[0] != defaultVal) {
            // dataState[1]({"value": defaultVal})
            dataState[1](defaultVal)
        }
        dataObj[key] = dataState
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
        var defaultVal = defaultPlayerData(dataObj, key).round().getValue()
        var dataState = useLocalStorageNumber(key, defaultVal, true);
        if (isPlayerDataUpdated() && dataState[0] != defaultVal) {
            dataState[1](defaultVal)
        }
        dataObj[key] = dataState
    }

    return dataObj;
}

function nonzero(val : string) : boolean {
    return !(val === "0")
}

export function getRequiredStates(data : any, states : any) : any{
    var ir = []
    for (var col of data) {
        let colDr = []
        for (var k of col) {
            var dataState = states[k]
            colDr.push({
                key: k,
                value: dataState
            })
        }
        ir.push(colDr)
    }

    return ir
}
