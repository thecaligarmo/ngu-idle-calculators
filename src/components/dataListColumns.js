import { useSavedDataContext } from "@/helpers/context";
import bigDecimal from "js-big-decimal";
import { pn } from "@/helpers/numbers";
import { camelToTitle } from "@/helpers/strings";

/*
 Returns the <li> needed for `dataToCols`
*/
function dataToList(d, input=false){
    const {playerDataUpdated, setPlayerDataUpdated} = useSavedDataContext();
    var val = d.value[0]
    if (!(val instanceof bigDecimal)) {
        val = new bigDecimal(val)
    }
    if (input) {
        return (<li key={'in-'+d.key} id={'in-'+d.key}>
            <label className="block text-white text-sm mt-2 mb-1" htmlFor={d.key}>
                {camelToTitle(d.key)}
            </label>
            <input
                className="text-black font-normal"
                type="text"
                name={d.key}
                id={d.key}
                value={val.getValue()}
                onChange={e => {
                    setPlayerDataUpdated(false);
                    d.value[1](e.target.value)
                }}
                />
        </li>)
    } else {
        return (<li key={d.key}>
                {camelToTitle(d.key)}: {pn(val)}
        </li>)
    }
}

/*
 Takes our data and returns many <ul> depending on data
*/
export function dataToCols(dr, input=false) {
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
            {col.map((d) => {
                return dataToList(d, input)
            })}
        </ul>)
    }
    return cols
}