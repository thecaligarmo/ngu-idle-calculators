"use client"
import { ChoiceButton } from '@/components/buttons';
import Content from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';
import { getNumberFormat, getPlayerData } from '@/components/context';
import { disableItem } from '@/components/dataListColumns';
import { defaultPlayerData } from '@/helpers/defaultPlayerData';
import { setInputValue } from '@/helpers/inputUpdater';
import { pn } from '@/helpers/numbers';
import { getRatioInfo } from '@/helpers/pages/ratios';
import { parseNum } from '@/helpers/parsers';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import _ from 'lodash';
import { useState } from 'react';



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
        extraReq = disableItem(extraReq, ["res3Ratio", "res3PowerRatio", "res3CapRatio", "res3BarRatio"])
        infoReq = disableItem(infoReq, ["baseRes3Power", "baseRes3Cap", "baseRes3Bar"])
    }

    // Children of the extra information
    var extraChildren = (
        <ChoiceButton
            text={res3Active ? "Hide R3" : "Show R3"}
            onClick={() => setRes3Active(!res3Active)}
            />
    )

    // Children of the extra inputs
    var selectBoxCSS = "inline-block align-top my-2 "
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
                <div className={selectBoxCSS}>
                <select defaultValue='' className='text-black' id="emRatio" onChange={(e) => {
                    if (e.target.value){
                        var [energy, magic] = e.target.value.split(":")

                        var erRatio : HTMLSelectElement | null = document.querySelector('select#erRatio')
                        var [energyRes, res3] = (!_.isNull(erRatio) && erRatio.value)
                                                ? erRatio.value.split(":")
                                                : [0, 0]

                        if(Number(energyRes) > 0) {
                            setInputValue(document.getElementById('res3Ratio'), res3)
                            setInputValue(document.getElementById('energyRatio'), energyRes)
                            setInputValue(document.getElementById('magicRatio'), Math.floor(Number(magic) * Number(energyRes) / Number(energy)))

                        } else {
                            setInputValue(document.getElementById('energyRatio'), energy)
                            setInputValue(document.getElementById('magicRatio'), magic)
                        }
                    }
                    }}>
                    <option value=''>Energy to Magic Ratio</option>
                    <option value="10:1">10:1</option>
                    <option value="5:1">5:1</option>
                    <option value="3:1">3:1</option>
                    <option value="2:1">2:1</option>
                </select>
                </div>
                <div className={selectBoxCSS}></div>
                {res3Active
                ? 
                <div className={selectBoxCSS}>
                    <select defaultValue='' className='text-black' id='erRatio' onChange={(e) => {
                    if (e.target.value){
                        var [energy, res3] = e.target.value.split(":")
                        var emRatio : HTMLSelectElement | null = document.querySelector('select#emRatio')
                        var [energyMagic, magic] = (!_.isNull(emRatio) && emRatio.value)
                                                ? emRatio.value.split(":")
                                                : [0, 0]
                        
                        setInputValue(document.getElementById('res3Ratio'), res3)
                        setInputValue(document.getElementById('energyRatio'), energy)
                        if(Number(energyMagic) > 0) {
                            setInputValue(document.getElementById('magicRatio'), Math.round(Number(magic) * Number(energy) / Number(energyMagic)))
                        }
                    }
                    }}>
                        <option value=''>Energy to Resource 3 Ratio</option>
                        <option value="100000:1">100,000:1</option>
                        <option value="200000:1">200,000:1</option>
                        <option value="500000:1">500,000:1</option>
                        <option value="1000000:1">1,000,000:1</option>
                    </select>
                    </div>
                : null
                }
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
        <p>Calculate how much Energy/Magic{res3Active ? "/Resource 3" : null} you need in order to have the proper ratios.</p>
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

        <ContentSubsection title="How much EXP do I need to achieve ratio?">
            <ul>
                <li key="energy"><strong>Energy:</strong> {pn(cost['energy'], fmt)} exp</li>
                <li key="magic"><strong>Magic:</strong> {pn(cost['magic'], fmt)} exp</li>
                {res3Active ? <li key="resource"><strong>Resource 3:</strong> {pn(cost['res3'], fmt)} exp</li> : null}
                <li key="total">
                <span className="border-t-2 border-white border-solid"><strong>Total Amount:</strong> {pn(cost['total'], fmt)} exp</span>
                </li>
            </ul>
            <p><strong>Suggested next thing to buy:</strong> {suggestedBuy}</p>
        </ContentSubsection>
        </Content>
    )
}

