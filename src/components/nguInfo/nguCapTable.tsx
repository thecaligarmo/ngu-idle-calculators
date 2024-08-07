'use client'

import { NGU } from "@/assets/ngus";
import { pn } from "@/helpers/numbers";
import bigDecimal from "js-big-decimal";
import { ReactElement, ReactNode } from "react";

interface NGUProps {
    children ?: ReactNode;
    type: string;
    NGUs : NGU[];
    targets: bigDecimal[];
    speedFactor: bigDecimal;
    fmt : string
}

export default function NGUCapTable({children, type, NGUs, targets, speedFactor, fmt} : NGUProps) : ReactElement{

    var capToMaxTargetsRow = NGUs.map(function(ngu, index) {
        var cap = ngu.capToReachMaxTarget(speedFactor)
        
        var targetLvl = targets[index];
        return (
            <tr key={ngu.key} className={index %2 == 0 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                <td className="px-2">{ngu.name}</td>
                <td className="px-2"><span className="text-red-500">{pn(cap, fmt)}</span></td>
                <td className="px-2"><span className="text-blue-500">{pn(targetLvl, fmt)}</span></td>
            </tr>
        )
    })

    return (
        <table className="inline-block w-full md:w-1/2 align-top mb-2">
        <thead>
            <tr className="text-left border-b-1 border border-t-0 border-x-0">
                <th className="px-2">{type} NGU</th>
                <th className="px-2">Cap</th>
                <th className="px-2">Target</th>
            </tr>
        </thead>
        <tbody>
            {capToMaxTargetsRow}
        </tbody>
    </table>
    )
}

