import { useSavedDataContext } from "@/helpers/context";
import bigDecimal from "js-big-decimal";
import { pn } from "@/helpers/numbers";

function camelToTitle(text) {
    const result = text.replace(/([A-Z0-9])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

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
        var cc = ''
        // We can't do dynamic classnames for tailwind =(
        switch (dr.length) {
            case 1:
                cc = 'inline-block'
                break;
            case 2:
                cc = 'inline-block w-1/2'
                break;
            case 3:
                cc = 'inline-block w-1/3'
        }
        
        cols.push (<ul className={cc} key={colKey}>
            {col.map((d) => {
                return dataToList(d, input)
            })}
        </ul>)
    }
    return cols
}