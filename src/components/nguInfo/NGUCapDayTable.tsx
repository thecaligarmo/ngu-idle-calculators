import { NGU } from "@/assets/ngus";
import { pn } from "@/helpers/numbers";
import { bigDecimal } from "js-big-decimal";
import { ReactElement } from "react";
import { StandardTable, StandardTableRowType } from "../StandardTable";

interface NGUProps {
    type: string;
    NGUs: NGU[];
    speedFactor: bigDecimal;
    fmt: string;
}

export default function NGUCapDayTable({ type, NGUs, speedFactor, fmt }: NGUProps): ReactElement {
    const order = ["type", "cap"];
    const header = {
        type: <span>{type} NGU</span>,
        cap: "Cap",
    };
    const dataRows: StandardTableRowType = {};
    for (const index in NGUs) {
        const ngu = NGUs[index];
        dataRows[ngu.key] = {
            type: ngu.name,
            cap: <span className="text-red-500">{pn(ngu.capToReachMaxInDay(speedFactor), fmt)}</span>,
        };
    }

    return <StandardTable order={order} header={header} rows={dataRows} fullWidth={false} />;
}
