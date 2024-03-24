import { defaultPlayerData, getPlayerOptions } from "./defaultPlayerData";
import { getPlayerData, isPlayerDataUpdated } from "./context";
import { useLocalStorageNumber } from "./localStorage";

export function createStatesForData(extraRequired) {
    const playerData = getPlayerData();
    var playerOptions = getPlayerOptions();
    for (var col of extraRequired) {
        for (var key of col) {
            playerOptions.push(key)
        }
    }
    var dataObj = {}
    for (var key of playerOptions) {
        var defaultVal = defaultPlayerData(playerData, key)
        var dataState = useLocalStorageNumber(key, defaultVal)
        if (isPlayerDataUpdated() && dataState[0] != defaultVal) {
            // dataState[1]({"value": defaultVal})
            dataState[1](defaultVal)
        }

        dataObj[key] = dataState
    }
    return dataObj;
}

export function getRequiredStates(data, states) {
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
