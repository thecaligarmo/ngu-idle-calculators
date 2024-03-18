import { useSavedDataContext } from "@/helpers/context";

function camelToTitle(text) {
    const result = text.replace(/([A-Z0-9])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

/*
 Returns the <li> needed for `dataToCols`
*/
function dataToList(d, input=false){
    const {playerDataUpdated, setPlayerDataUpdated} = useSavedDataContext();
    if (input) {
        return (<li key={'in-'+d.key} id={'in-'+d.key}>
            <label className="block text-white text-sm mt-2 mb-1" htmlFor={d.key}>
                {camelToTitle(d.key)}
            </label>
            <input
                className="text-black font-normal"
                type="number"
                name={d.key}
                id={d.key}
                value={d.value[0]}
                onChange={e => {
                    setPlayerDataUpdated(false);
                    d.value[1](Number(e.target.value))
                }}
                />
        </li>)
    } else {
        return (<li key={d.key}>
                {camelToTitle(d.key)}: {d.value[0].toLocaleString()}
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