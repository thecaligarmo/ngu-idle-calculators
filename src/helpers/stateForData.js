import { useState } from "react";
import { defaultPlayerData } from "./defaultPlayerData";
import { getPlayerData, isPlayerDataUpdated } from "./context";
import { useLocalStorage } from "./localStorage";

export default function createStatesForData(data) {
    const playerData = getPlayerData();

    

    var ir = []
    var dataObj = {}
    for (var col of data) {
        let colDr = []
        for (var k of col) {
            var defaultVal = defaultPlayerData(playerData, k)
            var dataState = useLocalStorage(k, defaultVal)
            if (isPlayerDataUpdated() && dataState[0] != defaultVal) {
                dataState[1](defaultPlayerData(playerData, k))
            }
            colDr.push({
                key: k,
                value: dataState
            })
            dataObj[k] = dataState
        }
        ir.push(colDr)
    }
    return [ir, dataObj]
}
