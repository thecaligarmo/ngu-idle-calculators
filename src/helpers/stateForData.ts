import { getCalculatedOptions, getPlayerNumberOptions, getPlayerOptions } from "./defaultPlayerData";
import { getPlayerData } from "../components/context";
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

    return dataObj;
}
