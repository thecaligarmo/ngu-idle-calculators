import { defaultPlayerData, getPlayerOptions } from "./defaultPlayerData";
import { getPlayerData, isPlayerDataUpdated } from "./context";
import { useLocalStorageNumber } from "./localStorage";

export default function createStatesForData(data) {
    const playerData = getPlayerData();
    var playerOptions = getPlayerOptions();
    var receivedKeys = []

    var ir = []
    var dataObj = {}
    for (var col of data) {
        let colDr = []
        for (var k of col) {
            receivedKeys.push(k)
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
    playerOptions.map((opt) => {
        if (!(opt in receivedKeys)) {
            useLocalStorageNumber(opt, 0)
        }
    })
    return [ir, dataObj]
}
