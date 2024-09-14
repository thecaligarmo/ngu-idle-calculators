import { MouseEventHandler, ReactNode } from "react";

export type StandardTableRowType = {[key:string]: (string|ReactNode[])}

export function StandardTable({headers, rows, fullWidth = true} : {headers: (string|ReactNode)[], rows: StandardTableRowType, fullWidth ?: boolean}) {
    var headRow : ReactNode[] = []
    for(let head of headers) {
        headRow.push((
            <th className="px-2">{head}</th>
        ))
    }

    var contentRows : ReactNode[] = []
    let i = 0
    for(let key in rows) {
        i += 1
        let contentData : ReactNode[] = []
        for(let val of rows[key]) {
            contentData.push((
                <td className="px-2">
                    {val}
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
                <tr className="text-left border-b-1 border border-t-0 border-x-0">
                    {headRow}
                </tr>
            </thead>
            <tbody>
                {contentRows}
            </tbody>
        </table>
    )

}
