'use client'

import { NGU } from "@/assets/ngus";
import { bd, dn, pn} from "@/helpers/numbers";
import bigDecimal from "js-big-decimal";
import { ReactNode } from "react";

interface NGUProps {
    children ?: ReactNode;
    type: string;
    NGUs : NGU[];
    targets:  bigDecimal[];
    seconds:  bigDecimal[];
    totalSeconds: bigDecimal;
    fmt: string;
}

export default function NGUTargetTable({children, type, NGUs, targets, seconds, totalSeconds, fmt} : NGUProps) : ReactNode{
    
    var infoRow = NGUs.map(function(ngu, index) {
        var targetLvl = targets[index]
        var secs = seconds[index]
        var val = bd(ngu.getStatValue(ngu.statnames[0], Number(targetLvl.getValue())))
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

        return (
            <tr key={ngu.key} className={index % 2 == 0 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                <td className="px-2">{ngu.name}</td>
                <td className="px-2 text-right"><span className="text-red-500">{dn(secs)}</span></td>
                <td className="px-2"><span className="text-blue-500">{pn(targetLvl, fmt)}</span></td>
                <td className="px-2">{pn(curVal, fmt, precision)}%</td>
                <td className="px-2 text-green-500">{targetLvl.compareTo(bd(0)) <= 0 ? '-' : " x " + pn(val.divide(curVal), fmt, 2 ) + " = "}</td>
                <td className="px-2">{targetLvl.compareTo(bd(0)) <= 0 ? '-' : pn(val, fmt, precision) + "%"}</td>
            </tr>
        )
    })
    
        

    return (
        <table className="inline-block w-full align-top mb-2">
            <thead>
                <tr className="text-left border-b-1 border border-t-0 border-x-0">
                    <th className="px-2">{type} NGU</th>
                    <th className="px-2">Time</th>
                    <th className="px-2">Target</th>
                    <th className="px-2">Current Value</th>
                    <th className="px-2">Increase Amount</th>
                    <th className="px-2">Value at target</th>
                </tr>
            </thead>
            <tbody>
                {infoRow}
                <tr key="total" className="text-left border-t-1 border border-b-0 border-x-0">
                    <th className="px-2">Total:</th>
                    <th className="px-2"><span className="text-red-500">{dn(totalSeconds)}</span></th>
                    <th className="px-2"></th>
                    <th className="px-2"></th>
                    <th className="px-2"></th>
                    <th className="px-2"></th>
                </tr>
            </tbody>
        </table>
    )
}

