import { getNumberFormat, useSavedDataContext } from "@/components/context";
import bigDecimal from "js-big-decimal";
import { bd, pn } from "@/helpers/numbers";
import { camelToTitle } from "@/helpers/strings";
import { ReactNode } from "react";
import { ChoiceButton } from "./buttons";

export function disableItem(reqs: any, itemToRemove: string[]) : string[][] {
    
    for(var i = 0; i < reqs.length; i++) {
        for(var j = 0; j< reqs[i].length; j++) {
            if(itemToRemove.includes(reqs[i][j].key)) {
                reqs[i][j].key = reqs[i][j].key + "DISABLED"
            }
        }
    }
    return reqs
}

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
    var disabled = ""
    if(d.disabled) {
        disabled += "hidden"
    }

    if (input) {
        // For some reason a checkbox isn't working... so we'll do this instead.
        if (d.type == 'checkbox') {
            var checked = val.getValue() == '1'
            return (<li key={'in-'+d.key} id={'in-'+d.id} className={disabled}>
                <label className="inline-block text-black dark:text-white mt-2 mb-1 mr-2" htmlFor={d.id}>
                    {d.name}:
                </label>
                <ChoiceButton
                    text="Yes"
                    active={checked}
                    onClick={(e) => {
                        console.log('Yes', d.value)
                        setPlayerDataUpdated(false);
                        d.value[1]('1')
                    }}
                    />
                <ChoiceButton
                    text="No"
                    active={!checked}
                    onClick={() => {
                        console.log('no')
                        setPlayerDataUpdated(false);
                        d.value[1]('0')
                    }}
                    />
            </li>)
        }

        return (<li key={'in-'+d.key} id={'in-'+d.id} className={disabled}>
            <label className="inline-block text-black dark:text-white mt-2 mb-1 mr-2" htmlFor={d.id}>
                {d.name}:
            </label>
            <input
                className="text-black font-normal rounded border border-black dark:border-white w-32"
                type="number"
                name={d.id}
                id={d.id}
                value={val.getValue() === '0' ? '' : val.getValue()}
                onChange={e => {
                    setPlayerDataUpdated(false);
                    d.value[1](e.target.value)
                }}
                />
        </li>)
    } else {
        var dVal = pn(val, fmt)
        if (d.type == 'checkbox') {
            dVal = (d.value[0] == '1') ? 'Yes' : 'No'
        }
        return (<li key={d.key} className={disabled}>
                {d.name}: {dVal}
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
            if(d.key.includes('DISABLED')) {
                d.key = d.key.replace('DISABLED', '')
                d.disabled = true
            }
            colKey += d.key
        }
        var cc = 'inline-block align-top mb-5 '
        // We can't do dynamic classnames for tailwind =(
        switch (dr.length) {
            case 1:
                cc += ''
                break;
            case 2:
            case 4:
            case 6:
            case 8:
            case 10:
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