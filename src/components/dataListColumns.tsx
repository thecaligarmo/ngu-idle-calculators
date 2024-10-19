import { getNumberFormat, useSavedDataContext } from "@/components/context";
import { bd, pn } from "@/helpers/numbers";
import bigDecimal from "js-big-decimal";
import { ReactNode } from "react";
import { ChoiceButton } from "./buttons";
import {  CardRarityText } from "@/assets/cards";
import _ from "lodash";

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
    var valBD = bd(val)

    var disabled = ""
    if(d.disabled) {
        disabled += "hidden"
    }

    if (input) {
        // For some reason a checkbox isn't working... so we'll do this instead.
        if (d.type == 'checkbox') {
            var checked = valBD.getValue() == '1'
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
                    active={valBD.getValue() == '0'}
                    onClick={(e) => {
                        setPlayerDataUpdated(false);
                        d.value[1]('0')
                    }}
                    />
                <ChoiceButton
                    text="Evil"
                    active={valBD.getValue() == '1'}
                    onClick={() => {
                        setPlayerDataUpdated(false);
                        d.value[1]('1')
                    }}
                    />
                <ChoiceButton
                    text="Sadistic"
                    active={valBD.getValue() == '2'}
                    onClick={() => {
                        setPlayerDataUpdated(false);
                        d.value[1]('2')
                    }}
                    />
            </li>)
        }
        if (d.key.startsWith('cardRarity')) {
            let rarityOptions : ReactNode[] = []
            for(let k in Object.keys(CardRarityText)) {
                let v = k.toString()
                rarityOptions.push(
                    (<ChoiceButton
                        text={CardRarityText[k]}
                        active={valBD.getValue() == k}
                        key={'cardRarity-' + CardRarityText[k]}
                        onClick={(e) => {
                            setPlayerDataUpdated(false);
                            d.value[1](k)
                        }}
                    />)
                )
            }
            return (<li key={'in-'+d.key} id={'in-'+d.id} className={disabled}>
                <label className="inline-block text-black dark:text-white mt-2 mb-1 mr-2">
                    {/* htmlFor={d.id} */}
                    {d.name}:
                </label>
                {rarityOptions}
            </li>)
        }

        var inputClass = "text-black font-normal rounded border border-black dark:border-white"
        if(d.pre == '') {
            inputClass += " w-32"
        } else {
            inputClass += " w-16"
        }
        // Giving an input length overrides old one
        if (d.inputLength > 0) {
            inputClass = inputClass.replace(' w-32', '').replace(' w-16', '')
            switch(d.inputLength) {
                case 1:
                    inputClass += ' w-8'
                    break
                case 2:
                    inputClass += ' w-12'
                    break
                case 3:
                    inputClass += ' w-14'
                    break
                case 4:
                    inputClass += ' w-16'
                    break
                case 5:
                case 6:
                    inputClass += ' w-20'
                    break
                case 7:
                case 8:
                    inputClass += ' w-28'
                    break
            }
            // inputClass += " w-" + d.inputLength
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
                value={valBD.getValue() === '0' ? '' : val}
                onChange={e => {
                    setPlayerDataUpdated(false);
                    d.value[1](e.target.value)
                }}
                />
        </li>)
    } else {
        var dVal = pn(valBD, fmt)
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
        if (d.key.startsWith('cardRarity')) {
            dVal = CardRarityText[Number(d.value[0])]
        }

        return (<li key={d.key} className={disabled}>
                {d.name}: {d.pre}{dVal}
        </li>)
    }
}

/*
 Takes our data and returns many <ul> depending on data
*/
export function dataToCols(dr : any[], input : boolean = false) : ReactNode{
    const cols = []
    let params : {[k:string] : any} = {}

    dr = _.cloneDeep(dr)
    if (!_.isArray(dr[0])) {
        let extraParams = dr.shift()
        params = {...params, ...extraParams}
    }
    
    for (var colNum in dr) {
        var col = dr[colNum]
        var colKey = ''
        for (var d of col) {
            if(d.key.includes('DISABLED')) {
                d.key = d.key.replace('DISABLED', '')
                d.disabled = true
            }
            colKey += d.key
        }
        // Handle empty colKeys
        if(colKey == ''){
            colKey = colNum.toString()
        }
        var cc = 'inline-block align-top mb-5 '
        if('colWidths' in params) {
            cc += params['colWidths'][colNum]
        } else {
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
        }
        
        cols.push (<ul className={cc} key={colKey}>
            {col.map((d : any) => {
                return dataToList(d, input)
            })}
        </ul>)
    }
    return cols
}