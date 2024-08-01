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
                <label className="inline-block text-black dark:text-white mt-2 mb-1 mr-2">
                    {/* htmlFor={d.id} */}
                    {d.name}:
                </label>
                <ChoiceButton
                    text="Yes"
                    
                    active={checked}
                    onClick={(e) => {
                        setPlayerDataUpdated(false);
                        d.value[1]('1')
                    }}
                    />
                <ChoiceButton
                    text="No"
                    active={!checked}
                    onClick={() => {
                        setPlayerDataUpdated(false);
                        d.value[1]('0')
                    }}
                    />
            </li>)
        }
        // Game mode is weird
        if (d.key == 'gameMode') {
            return (<li key={'in-'+d.key} id={'in-'+d.id} className={disabled}>
                <label className="inline-block text-black dark:text-white mt-2 mb-1 mr-2">
                    {/* htmlFor={d.id} */}
                    {d.name}:
                </label>
                <ChoiceButton
                    text="Normal"
                    active={val.getValue() == '0'}
                    onClick={(e) => {
                        setPlayerDataUpdated(false);
                        d.value[1]('0')
                    }}
                    />
                <ChoiceButton
                    text="Evil"
                    active={val.getValue() == '1'}
                    onClick={() => {
                        setPlayerDataUpdated(false);
                        d.value[1]('1')
                    }}
                    />
                <ChoiceButton
                    text="Sadistic"
                    active={val.getValue() == '2'}
                    onClick={() => {
                        setPlayerDataUpdated(false);
                        d.value[1]('2')
                    }}
                    />
            </li>)
        
        }
        var inputClass = "text-black font-normal rounded border border-black dark:border-white"
        if(d.pre == '') {
            inputClass += " w-32"
        } else {
            inputClass += " w-16"
        }

        return (<li key={'in-'+d.key} id={'in-'+d.id} className={disabled}>
            <label className="inline-block text-black dark:text-white mt-2 mb-1 mr-2" htmlFor={d.id}>
                {d.name}:
            </label>
            {d.pre}<input
                className={inputClass}
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
        if (d.key == 'gameMode') {
            if(d.value[0] == '0') {
                dVal = 'Normal'
            }
            if(d.value[0] == '1') {
                dVal = 'Evil'
            }
            if(d.value[0] == '2') {
                dVal = 'Sadistic'
            }
        }
        return (<li key={d.key} className={disabled}>
                {d.name}: {d.pre}{dVal}
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
            case 8:
            case 10:
                cc += 'w-1/2 '
                break;
            case 3:
            case 6:
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