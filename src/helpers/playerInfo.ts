import _ from "lodash";
import { playerDataInfo } from "@/assets/playerData";
import { requiredDataType } from "../components/Content";
import { camelToTitle } from "./strings";

// getRequiredStates
export function getPlayerDataInfo(data : requiredDataType) : any{
    let ir = []
    for (let col of data) {
        let colDr = []
        for (let k of col) {
            let kName : string = _.isArray(k) ? k[0] : k;
            if (_.isUndefined(playerDataInfo[kName])) {
                console.log('Player Data missing: ', kName)
            } 
            let pi = playerDataInfo[kName];

            let name = camelToTitle(kName);
            if(!_.isUndefined(pi['percent']) && pi['percent']){
                name = camelToTitle(kName + '%')
            }

            colDr.push({
                length: 0, // Default comes before expansion
                name: name,
                ...pi,
                key: kName,
                disabled: false,
                id: kName.replace(/[?%^-]/g, ''),
            })
        }
        ir.push(colDr)
    }

    return ir
}
