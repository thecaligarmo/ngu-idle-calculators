import bigDecimal from "js-big-decimal";
import { ReactElement } from "react";
import { NGU } from "../../assets/ngus";
import { pn } from "../../helpers/numbers";
import { StandardTable, StandardTableRowType } from "../StandardTable";


interface NGUProps {
    type: string;
    NGUs : NGU[];
    targets: bigDecimal[];
    speedFactor: bigDecimal;
    fmt : string
}

export default function NGUCapTable({type, NGUs, targets, speedFactor, fmt} : NGUProps) : ReactElement {

    var order = ["type", "cap", "target"]
    var header = {
        "type": <span>{type} NGU</span>,
        "cap": "Cap",
        "target": "Target"
    }
    var dataRows : StandardTableRowType = {}
    for (let index in NGUs) {
        let ngu = NGUs[index]
        dataRows[ngu.key] = {
            "type": ngu.name,
            "cap": <span className="text-red-500">{pn(ngu.capToReachMaxTarget(speedFactor), fmt)}</span>,
            "target":<span className="text-blue-500">{pn(targets[index], fmt)}</span>
        }
    }

    return <StandardTable order={order} header={header} rows={dataRows} fullWidth={false} />
}

