import { ReactNode } from "react";

export type StandardTableRowType = {[key:string]: {[k:string] : string|ReactNode}}

export function StandardTable({order, header, rows, fullWidth = true} : {order: string[], header: {[key:string]:(string|ReactNode)}, rows: StandardTableRowType, fullWidth ?: boolean}) {
    var headRow : ReactNode[] = []
    for(let it of order) {
        headRow.push((
            <th key={it} className="px-2">
                {header[it]}
            </th>
        ))
    }

    var contentRows : ReactNode[] = []
    let i = 0
    for(let key in rows) {
        i += 1
        let contentData : ReactNode[] = []
        for(let it of order) {
            contentData.push((
                <td key={it} className="px-2">
                    {rows[key][it]}
                </td>
            ))
        }

        contentRows.push((
            <tr key={key} className={i % 2 == 1 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                {contentData}
            </tr>
        ))
    }
    let tableClass = "inline-block w-full align-top mb-2"
    if (!fullWidth) {
        tableClass += "md:w-1/2"
    }
    return (
        <table className={tableClass}>
            <thead>
                <tr key="header" className="text-left border-b-1 border border-t-0 border-x-0">
                    {headRow}
                </tr>
            </thead>
            <tbody>
                {contentRows}
            </tbody>
        </table>
    )

}
