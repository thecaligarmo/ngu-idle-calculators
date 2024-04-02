import { getNumberFormat, useSavedDataContext } from "@/components/context";
import bigDecimal from "js-big-decimal";
import { pn } from "@/helpers/numbers";
import { camelToTitle } from "@/helpers/strings";
import { ReactNode } from "react";

/*
 Returns the <li> or <input> needed for `dataToCols`
*/
function dataToList(d : any, input : boolean = false) : ReactNode{
    const {playerDataUpdated, setPlayerDataUpdated} = useSavedDataContext();
    var fmt = getNumberFormat();
    var val = d.value[0]
    if (!(val instanceof bigDecimal)) {
        val = new bigDecimal(val)
    }
    if (input) {
        return (<li key={'in-'+d.key} id={'in-'+d.key}>
            <label className="block text-black dark:text-white text-sm mt-2 mb-1" htmlFor={d.key}>
                {camelToTitle(d.key)}
            </label>
            <input
                className="text-black font-normal rounded border border-black dark:border-white"
                type="number"
                name={d.key}
                id={d.key}
                value={val.getValue() === '0' ? '' : val.getValue()}
                onChange={e => {
                    setPlayerDataUpdated(false);
                    d.value[1](e.target.value)
                }}
                />
        </li>)
    } else {
        return (<li key={d.key}>
                {camelToTitle(d.key)}: {pn(val, fmt)}
        </li>)
    }
}

/*
 Takes our data and returns many <ul> depending on data
*/
export function dataToCols(dr : any, input : boolean = false) : ReactNode{
    const cols = []
    for (var col of dr) {
        var colKey = ''
        for (var d of col) {
            colKey += d.key
        }
        var cc = 'inline-block align-top mb-2 '
        // We can't do dynamic classnames for tailwind =(
        switch (dr.length) {
            case 1:
                cc += ''
                break;
            case 2:
            case 4:
            case 6:
                cc += 'w-1/2 '
                break;
            case 3:
                cc += 'w-1/3 '
        }
        
        cols.push (<ul className={cc} key={colKey}>
            {col.map((d : any) => {
                return dataToList(d, input)
            })}
        </ul>)
    }
    return cols
}