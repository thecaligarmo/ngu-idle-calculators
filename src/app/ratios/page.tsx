"use client"
import { ChoiceButton } from '@/components/buttons';
import Content from '@/components/content';
import { getNumberFormat, getPlayerData} from '@/components/context';
import { defaultPlayerData } from '@/helpers/defaultPlayerData';
import { setInputValue } from '@/helpers/inputUpdater';
import {bigdec_max, bigdec_min, pn, bd } from '@/helpers/numbers';
import { parseNum } from '@/helpers/parsers';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import _ from 'lodash';
import { useState } from 'react';

type gensType = {
    energy : {
        power : bigDecimal,
        cap : bigDecimal,
        bar : bigDecimal,
    },
    magic : {
        power : bigDecimal,
        cap : bigDecimal,
        bar : bigDecimal,
    },
    res3 : {
        power : bigDecimal,
        cap : bigDecimal,
        bar : bigDecimal,
    }
}

type gensBDType = {energy : bigDecimal, magic : bigDecimal, res3 : bigDecimal, total : bigDecimal}

var basicGens : gensType = {
    'energy' : {'power' : bd(0), 'cap' : bd(0), 'bar' : bd(0)},
    'magic' : {'power' : bd(0), 'cap' : bd(0), 'bar' : bd(0)},
    'res3' : {'power' : bd(0), 'cap' : bd(0), 'bar' : bd(0)},
}


// Get the max based off the ratios
function getRatMax(base : bigDecimal, ratio : bigDecimal, oppRatio : bigDecimal, thirdRatio : bigDecimal) : bigDecimal {
    // Might accidentally divide by 0
    try{
        // Get ratio of base power with our ratio (how many units we have of the ratio desired)
        var rat = base.round().divide(ratio, 20)
        // Take our units and multiply by the "opposite" ratio (see what quantity we need)
        return rat.multiply(oppRatio).multiply(thirdRatio)
    } catch (error) {
        return bd(0);
    }
}

// Get the unit based off the ratios
function getRatUnit(base : bigDecimal, ratio : bigDecimal, mainRatio : bigDecimal) : bigDecimal {
    // Might accidentally divide by 0
    try{
        // Get ratio of base power with our ratio (how many units we have of the ratio desired)
        var rat = base.round().divide(ratio)
        // Take our units and devide by the "same" ratio (smaller unit)
        return rat.divide(mainRatio)
    } catch (error) {
        return bd(0)
    }
}
// Get numbers desired
function getDesired(maxItem : bigDecimal, base : bigDecimal, ratMax : bigDecimal) : bigDecimal {
    try {
        return (maxItem.multiply(base.round()).divide(ratMax)).floor()//.round(0, bigDecimal.RoundingModes.HALF_DOWN)
    } catch(error) {
        return bd(0);
    }
}

// Get numbers desired and for buying
function getBuy(desired : bigDecimal, base : bigDecimal) : bigDecimal {
    return bigdec_max(desired.subtract(base.round()), bd(0));
}


function toStr(ty : string, elt : string, upperFirst : boolean = false) {
    var str = '';
    if (upperFirst) {
        str += ty.charAt(0).toUpperCase() + ty.slice(1);
    } else {
        str += ty
    }
    str += elt.charAt(0).toUpperCase() + elt.slice(1);
    return str
}




export function getRatioInfo(v : {[key: string] : bigDecimal}, res3Active : boolean = false) : [gensType, gensType, gensBDType, string] {
    var ratMax : gensType = _.cloneDeep(basicGens)
    var ratUnit : gensType = _.cloneDeep(basicGens)
    var desired : gensType = _.cloneDeep(basicGens)
    var buy : gensType = _.cloneDeep(basicGens)

    var ty: keyof typeof ratMax
    for (ty in basicGens) {
        var elt: keyof (typeof ratMax)[keyof typeof ratMax]
        if (ty == 'res3' && !res3Active) {
            for (elt in basicGens[ty as keyof gensType]) {
                ratMax[ty][elt] = bd(0);
                ratUnit[ty][elt] = bd(0);
            }
        } else {
            for (elt in basicGens[ty as keyof gensType]) {
                let baseName = 'base' + toStr(ty, elt, true)
                let ratName = toStr(ty, elt) + 'Ratio'
                let otherRatName = (ty == 'energy') ? 'magicRatio' : 'energyRatio'
                let thirdRatio = (ty == 'res3') ? 'magicRatio' : 'res3Ratio'
                ratMax[ty][elt] = getRatMax(v[baseName], v[ratName], v[otherRatName], res3Active ? v[thirdRatio] : bd(1));
                ratUnit[ty][elt] = getRatUnit(v[baseName], v[ratName], v[ty + 'Ratio'])
            }
        }
    }

    // Calculate desired amount
    // The largest max is where we are trying to be. So take max of all values and
    // do everything relative to that
    var maxItem = bigdec_max(
            ratMax['energy']['power'],ratMax['energy']['cap'],ratMax['energy']['bar'],
            ratMax['magic']['power'],ratMax['magic']['cap'],ratMax['magic']['bar']
        )
    var minItem = bigdec_min(
            ratUnit['energy']['power'],ratUnit['energy']['cap'],ratUnit['energy']['bar'],
            ratUnit['magic']['power'],ratUnit['magic']['cap'],ratUnit['magic']['bar']
    )

    if (res3Active) {
        maxItem = bigdec_max(maxItem, ratMax['res3']['power'],ratMax['res3']['cap'],ratMax['res3']['bar'])
        minItem = bigdec_min(minItem, ratUnit['res3']['power'],ratUnit['res3']['cap'],ratUnit['res3']['bar'])
    }

    // See how much of each resource we want and how much exp it takes ot buy them
    for (ty in basicGens) {
        if (ty == 'res3' && !res3Active) {
            for (elt in basicGens[ty as keyof gensType]) {
                desired[ty][elt] = bd(0);
                ratUnit[ty][elt] = bd(0);
            }
        } else {
            for (elt in basicGens[ty as keyof gensType]) {
                let baseName = 'base' + toStr(ty, elt, true)
                desired[ty][elt] = getDesired(maxItem, v[baseName], ratMax[ty][elt])
                buy[ty][elt] = getBuy(desired[ty][elt], v[baseName])
            }
        }
    }

    // Cost to increase all the things
    var cost : gensBDType = {'energy' : bd(0), 'magic' : bd(0), 'res3' : bd(0), 'total' : bd(0)}
    cost['energy'] = buy['energy']['power'].multiply(bd(150))
                    .add(buy['energy']['cap'].multiply(bd(40)).divide(bd(10000)))
                    .add(buy['energy']['bar'].multiply(bd(80))).ceil();
    cost['magic'] = buy['magic']['power'].multiply(bd(450))
                    .add(buy['magic']['cap'].multiply(bd(120)).divide(bd(10000)))
                    .add(buy['magic']['bar'].multiply(bd(240))).ceil();
    cost['total'] = cost['energy'].add(cost['magic']);
    if (res3Active) {
        cost['res3'] = buy['res3']['power'].multiply(bd(15000000))
                        .add(buy['res3']['cap'].multiply(bd(400)))
                        .add(buy['res3']['bar'].multiply(bd(8000000))).ceil();
        cost['total'] = cost['total'].add(cost['res3']);
    }
    
    // Text for what to buy
    var suggestedBuy = ""
    switch(minItem) {
        case ratUnit['energy']['power']:
            suggestedBuy = "Energy Power"
            break;
        case ratUnit['energy']['cap']:
            suggestedBuy = "Energy Cap"
            break;
        case ratUnit['energy']['bar']:
            suggestedBuy = "Energy Bar"
            break;
        case ratUnit['res3']['power']:
            suggestedBuy = "Resource 3 Power"
            break;
        case ratUnit['res3']['cap']:
            suggestedBuy = "Resource 3 Cap"
            break;
        case ratUnit['res3']['bar']:
            suggestedBuy = "Resource 3 Bar"
            break;
        case ratUnit['res3']['power']:
            suggestedBuy = "Magic Power"
            break;
        case ratUnit['res3']['cap']:
            suggestedBuy = "Magic Cap"
            break;
        case ratUnit['res3']['bar']:
            suggestedBuy = "Magic Bar"
            break;
    }

    return [desired, buy, cost, suggestedBuy]
}


export default function Page() {
    const playerData = getPlayerData();
    var fmt = getNumberFormat();
    var defaultres3 = defaultPlayerData(playerData, "res3Active") === 1
    const [res3Active, setRes3Active] = useState(defaultres3)
    // force res3active if it's present
    if(defaultres3 && !res3Active) {
        setRes3Active(true);
    }
    // Set data required (from playerData)
    var infoRequired = [
        ["baseEnergyPower", "baseEnergyCap", "baseEnergyBar"],
        ["baseMagicPower", "baseMagicCap", "baseMagicBar"],
        ["baseRes3Power", "baseRes3Cap", "baseRes3Bar"]
    ]
    // Set extra required (not from playerData)
    var extraRequired = [
        ["energyRatio", "energyPowerRatio", "energyCapRatio", "energyBarRatio"],
        ["magicRatio", "magicPowerRatio", "magicCapRatio", "magicBarRatio"],
        ["res3Ratio", "res3PowerRatio", "res3CapRatio", "res3BarRatio"]
    ]
    const playerStates = createStatesForData(extraRequired);

    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates)
    var extraReq = getRequiredStates(extraRequired, playerStates)

    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        return parseNum(playerStates, key)
    }

    var data = {
        baseEnergyPower : v('baseEnergyPower'),
        baseEnergyCap : v('baseEnergyCap'),
        baseEnergyBar : v('baseEnergyBar'),
        baseMagicPower : v('baseMagicPower'),
        baseMagicCap : v('baseMagicCap'),
        baseMagicBar : v('baseMagicBar'),
        baseRes3Power : v('baseRes3Power'),
        baseRes3Cap : v('baseRes3Cap'),
        baseRes3Bar : v('baseRes3Bar'),
        energyRatio : v('energyRatio'),
        energyPowerRatio : v('energyPowerRatio'),
        energyCapRatio : v('energyCapRatio'),
        energyBarRatio : v('energyBarRatio'),
        magicRatio : v('magicRatio'),
        magicPowerRatio : v('magicPowerRatio'),
        magicCapRatio : v('magicCapRatio'),
        magicBarRatio : v('magicBarRatio'),
        res3Ratio : v('res3Ratio'),
        res3PowerRatio : v('res3PowerRatio'),
        res3CapRatio : v('res3CapRatio'),
        res3BarRatio : v('res3BarRatio'),
    }

    var [desired, buy, cost, suggestedBuy] = getRatioInfo(data, res3Active)


    if (!res3Active) {
        infoReq.pop()
        extraReq.pop()
    }

    // Children of the extra information
    var extraChildren = (
        <ChoiceButton
            text={res3Active ? "Hide R3" : "Show R3"}
            onClick={() => setRes3Active(!res3Active)}
            />
    )

    // Children of the extra inputs
    var selectBoxCSS = "inline-block align-top mb-2 "
    selectBoxCSS += res3Active ? 'w-1/3' : 'w-1/2'
    var ratioOptions = (
        <>
            <option value="1:37500:1">1:37500:1</option>
            <option value="5:160000:4">5:160000:4</option>
            <option value="4:150000:1">4:150000:1</option>
        </>
    )

    var extraInputChildren = (
        <>
        <div className="mt-2">
            <p>Quick Selectors:</p>
            <select defaultValue='' className='text-black' onChange={(e) => {
            if (e.target.value){
                var [energy, magic] = e.target.value.split(":")            
                setInputValue(document.getElementById('energyRatio'), energy)
                setInputValue(document.getElementById('magicRatio'), magic)

            }
            }}>
            <option value=''>Energy to Magic Ratio</option>
            <option value="10:1">10:1</option>
            <option value="5:1">5:1</option>
            <option value="3:1">3:1</option>
            <option value="2:1">2:1</option>
            </select>
            <br />
            <div className={selectBoxCSS}>
            <select defaultValue='' className='text-black' onChange={(e) => {
            if (e.target.value){
                var [power, cap, bar] = e.target.value.split(":")
                setInputValue(document.getElementById('energyPowerRatio'), power)
                setInputValue(document.getElementById('energyCapRatio'), cap)
                setInputValue(document.getElementById('energyBarRatio'), bar)
            }
            }}>
            <option value=''>Energy Ratio quick select</option>
            {ratioOptions}
            </select>
            </div>
            <div className={selectBoxCSS}>
            <select defaultValue='' className='text-black' onChange={(e) => {
            if (e.target.value){
                var [power, cap, bar] = e.target.value.split(":")
                setInputValue(document.getElementById('magicPowerRatio'), power)
                setInputValue(document.getElementById('magicCapRatio'), cap)
                setInputValue(document.getElementById('magicBarRatio'), bar)
            }
            }}>
            <option value=''>Magic Ratio quick select</option>
            {ratioOptions}
            </select>
            </div>
            {res3Active
            ? 
            <div className={selectBoxCSS}>
                <select defaultValue='' className='text-black' onChange={(e) => {
                if (e.target.value){
                    var [power, cap, bar] = e.target.value.split(":")
                    setInputValue(document.getElementById('res3PowerRatio'), power)
                    setInputValue(document.getElementById('res3CapRatio'), cap)
                    setInputValue(document.getElementById('res3BarRatio'), bar)
                }
                }}>
                <option value=''>Resource 3 Ratio quick select</option>
                {ratioOptions}
                </select>
                </div>
            : null
            }
        </div>
        </>
    )

    // Children that comes before the containers
    var prechildren = (
        <p>Calculate how much Energy/Magic/Resource 3 you need in order to have the proper ratios.</p>
    )

    return (
        <Content prechildren={prechildren} title="Ratio Calculator" infoRequired={infoReq} extraRequired={extraReq} extraChildren={extraChildren} extraInputChildren={extraInputChildren}>
        <div className="flex">
            <div className="mr-10">
            <h4 className="text-xl">What base amounts should be</h4>
            <table className="table-auto mt-2 bg-red-500/50">
                <thead>
                <tr>
                    <th className="w-24"></th>
                    <th className="px-2">Energy</th>
                    <th className="px-2">Magic</th>
                    {res3Active ? <th className="px-2">Resource 3</th> :null}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="text-right pr-2"><strong>Power</strong></td>
                    <td className="text-center px-2">{pn(desired['energy']['power'], fmt)}</td>
                    <td className="text-center px-2">{pn(desired['magic']['power'], fmt)}</td>
                    {res3Active ? <td className="text-center px-2">{pn(desired['res3']['power'], fmt)}</td> : null}
                </tr>
                <tr>
                    <td className="text-right pr-2"><strong>Cap</strong></td>
                    <td className="text-center px-2">{pn(desired['energy']['cap'], fmt)}</td>
                    <td className="text-center px-2">{pn(desired['magic']['cap'], fmt)}</td>
                    {res3Active ? <td className="text-center px-2">{pn(desired['res3']['cap'], fmt)}</td> : null }
                </tr>
                <tr>
                    <td className="text-right pr-2"><strong>Bar</strong></td>
                    <td className="text-center px-2">{pn(desired['energy']['bar'], fmt)}</td>
                    <td className="text-center px-2">{pn(desired['magic']['bar'], fmt)}</td>
                    {res3Active ? <td className="text-center px-2">{pn(desired['res3']['bar'], fmt)}</td>: null}
                </tr>
                </tbody>
            </table>
            </div>
            <div className="ml-10">
            <h4 className="text-xl">What to buy to achieve ratio</h4>
            <table className="table-auto mt-2 bg-blue-500/50">
                <thead>
                <tr>
                    <th className="w-24"></th>
                    <th className="px-2">Energy</th>
                    <th className="px-2">Magic</th>
                    {res3Active ? <th className="px-2">Resource 3</th> :null}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="text-right pr-2"><strong>Power</strong></td>
                    <td className="text-center px-2">{pn(buy['energy']['power'], fmt)}</td>
                    <td className="text-center px-2">{pn(buy['magic']['power'], fmt)}</td>
                    {res3Active ? <td className="text-center px-2">{pn(buy['res3']['power'], fmt)}</td> : null}
                </tr>
                <tr>
                    <td className="text-right pr-2"><strong>Cap</strong></td>
                    <td className="text-center px-2">{pn(buy['energy']['cap'], fmt)}</td>
                    <td className="text-center px-2">{pn(buy['magic']['cap'], fmt)}</td>
                    {res3Active ? <td className="text-center px-2">{pn(buy['res3']['cap'], fmt)}</td> : null }
                </tr>
                <tr>
                    <td className="text-right pr-2"><strong>Bar</strong></td>
                    <td className="text-center px-2">{pn(buy['energy']['bar'], fmt)}</td>
                    <td className="text-center px-2">{pn(buy['magic']['bar'], fmt)}</td>
                    {res3Active ? <td className="text-center px-2">{pn(buy['res3']['bar'], fmt)}</td>: null}
                </tr>
                </tbody>
            </table>
            </div>
        </div>

        <h4 className="text-xl mt-5">How much EXP do I need to achieve ratio?</h4>
        <ul>
            <li key="energy"><strong>Energy:</strong> {pn(cost['energy'], fmt)} exp</li>
            <li key="magic"><strong>Magic:</strong> {pn(cost['magic'], fmt)} exp</li>
            {res3Active ? <li key="resource"><strong>Resource 3:</strong> {pn(cost['res3'], fmt)} exp</li> : null}
            <li key="total">
            <span className="border-t-2 border-white border-solid"><strong>Total Amount:</strong> {pn(cost['total'], fmt)} exp</span>
            </li>
        </ul>
        <p><strong>Suggested next thing to buy:</strong> {suggestedBuy}</p>
        </Content>
    )
}

