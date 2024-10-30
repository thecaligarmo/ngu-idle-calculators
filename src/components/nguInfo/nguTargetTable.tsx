'use client'

import { NGU } from "@/assets/ngus";
import { bd, dn, lessThanOrEqual, pn, toNum } from "@/helpers/numbers";
import bigDecimal from "js-big-decimal";
import { ReactNode } from "react";
import { StandardTable, StandardTableRowType } from "../standardTable";

interface NGUProps {
    type: string;
    NGUs : NGU[];
    targets:  bigDecimal[];
    seconds:  bigDecimal[];
    totalSeconds: bigDecimal;
    fmt: string;
}

export default function NGUTargetTable({type, NGUs, targets, seconds, totalSeconds, fmt} : NGUProps) : ReactNode{
    var order = ["type", "time", "target", "curVal", "incAmt", "tarVal"]
    
    var header = {
        "type": <span>{type} NGU</span>,
        "time": "Time",
        "target": "Target",
        "curVal": "Current Value",
        "incAmt": "Increase Amount",
        "tarVal": "Value at Target",
    }
    var dataRows : StandardTableRowType = {}
    
    for (let index in NGUs) {
        let ngu = NGUs[index]

        var targetLvl = targets[index]
        var secs = seconds[index]
        
        var val = bd(ngu.getStatValue(ngu.statnames[0], toNum(targetLvl)))
        var curVal = bd(ngu.getStatValue(ngu.statnames[0]))

        var precision = 0;
        if (ngu.key == 'NGUWandoos' || ngu.key == 'NGUAdventureA' || ngu.key == 'NGUDropChance' || ngu.key == 'NGUMagicNGU'
            || ngu.key == 'NGUYggdrasil' || ngu.key == 'NGUTimeMachine' || ngu.key == 'NGUEnergyNGU'
        ) {
            precision = 1;
        }
        if (ngu.key == 'NGURespawn' || ngu.key == 'NGUPP'
            || ngu.key == 'NGUExp' || ngu.key == 'NGUAdventureB'
        ) {
            precision = 2;
        }

        dataRows[ngu.key] = {
            "type": ngu.name,
            "time": dn(secs),
            "target": pn(targetLvl, fmt),
            "curVal": <span>{pn(curVal, fmt, precision)}%</span>,
            "incAmt": lessThanOrEqual(targetLvl, bd(0)) ? '-' : " x " + pn(val.divide(curVal), fmt, 2 ) + " = ",
            "tarVal": lessThanOrEqual(targetLvl, bd(0)) ? '-' : pn(val, fmt, precision) + "%",
        }
    }
    dataRows["total"] = {
        "type": "Total",
        "isTotal": true,
        "time" : dn(totalSeconds),
    }

    var extraClasses = {
        "time": "text-right text-red-500",
        "target": "text-blue-500",
        "incAmt": "text-green-500"
    }

    return <StandardTable order={order} header={header} rows={dataRows} extraRowClasses={extraClasses} />
}

