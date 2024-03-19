import { defaultPlayerData } from "./defaultPlayerData";
import { getPlayerData, isPlayerDataUpdated } from "./context";
import { useLocalStorageNumber } from "./localStorage";

export default function createStatesForData(data) {
    const playerData = getPlayerData();

    var ir = []
    var dataObj = {}
    for (var col of data) {
        let colDr = []
        for (var k of col) {
            var defaultVal = defaultPlayerData(playerData, k)
            var dataState = useLocalStorageNumber(k, defaultVal)
            if (isPlayerDataUpdated() && dataState[0] != defaultVal) {
                // dataState[1]({"value": defaultVal})
                dataState[1](defaultVal)
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
