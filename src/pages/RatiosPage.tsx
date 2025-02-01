import _ from "lodash";
import { ChoiceButton } from "../components/buttons/ChoiceButton";
import Content, { requiredDataType } from "../components/Content";
import ContentSubsection from "../components/ContentSubsection";
import { getNumberFormat, getPlayer } from "../components/Context";
import { disableItem } from "../components/dataListColumns";
import { setInputValue } from "@/helpers/inputUpdater";
import { pn } from "@/helpers/numbers";
import { getRatioInfo } from "@/helpers/pages/ratios";
import { getPlayerDataInfo } from "@/helpers/playerInfo";

export default function RatiosPage() {
    const player = getPlayer();
    var fmt = getNumberFormat();
    var res3Active = player.get("res3Active")
    
    // Set data required (from playerData)
    var infoRequired : requiredDataType = [
        ["baseEnergyPower", "baseEnergyCap", "baseEnergyBar"],
        ["baseMagicPower", "baseMagicCap", "baseMagicBar"],
        ["baseRes3Power", "baseRes3Cap", "baseRes3Bar"]
    ]
    // Set extra required (not from playerData)
    var extraRequired : requiredDataType = [
        ["energyRatio", "energyPowerRatio", "energyCapRatio", "energyBarRatio"],
        ["magicRatio", "magicPowerRatio", "magicCapRatio", "magicBarRatio"],
        ["res3Ratio", "res3PowerRatio", "res3CapRatio", "res3BarRatio"]
    ]
    var goRequired : requiredDataType = [[]]
    

    // Get required data
    var infoReq = getPlayerDataInfo(infoRequired)
    var extraReq = getPlayerDataInfo(extraRequired)
    var goReq = getPlayerDataInfo(goRequired)

    var [desired, buy, cost, suggestedBuy] = getRatioInfo(player)


    if (!res3Active) {
        extraReq = disableItem(extraReq, ["res3Ratio", "res3PowerRatio", "res3CapRatio", "res3BarRatio"])
        infoReq = disableItem(infoReq, ["baseRes3Power", "baseRes3Cap", "baseRes3Bar"])
    }

    // Children of the extra information
    var extraChildren = (
        <ChoiceButton
            text={res3Active ? "Hide R3" : "Show R3"}
            onClick={() => player.set('res3Active', !res3Active)}
            />
    )

    // Children of the extra inputs
    var selectBoxCSS = "inline-block align-top my-2 "
    selectBoxCSS += res3Active ? 'w-1/3' : 'w-1/2'
    var ratioOptions = (
        <>
            <option key="131" value="1:37500:1">1:37500:1</option>
            <option key="514" value="5:160000:4">5:160000:4</option>
            <option key="411" value="4:150000:1">4:150000:1</option>
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
                    <option key="1" value=''>Energy to Magic Ratio</option>
                    <option key="10" value="10:1">10:1</option>
                    <option key="5" value="5:1">5:1</option>
                    <option key="3" value="3:1">3:1</option>
                    <option key="2" value="2:1">2:1</option>
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
                        <option key="0" value=''>Energy to Resource 3 Ratio</option>
                        <option key="100" value="100000:1">100,000:1</option>
                        <option key="200" value="200000:1">200,000:1</option>
                        <option key="250" value="250000:1">250,000:1</option>
                        <option key="300" value="300000:1">300,000:1</option>
                        <option key="400" value="400000:1">400,000:1</option>
                        <option key="500" value="500000:1">500,000:1</option>
                        <option key="600" value="600000:1">600,000:1</option>
                        <option key="750" value="750000:1">750,000:1</option>
                        <option key="1000" value="1000000:1">1,000,000:1</option>
                    </select>
                    </div>
                : null
                }
                <div className={selectBoxCSS}>
                    <select defaultValue='' className='text-black' id="eratio" onChange={(e) => {
                    if (e.target.value){
                        var [power, cap, bar] = e.target.value.split(":")
                        setInputValue(document.getElementById('energyPowerRatio'), power)
                        setInputValue(document.getElementById('energyCapRatio'), cap)
                        setInputValue(document.getElementById('energyBarRatio'), bar)
                    }
                    }}>
                        <option key="00" value=''>Energy Ratio quick select</option>
                        {ratioOptions}
                    </select>
                </div>
                <div className={selectBoxCSS}>
                    <select defaultValue='' className='text-black' id="mratio" onChange={(e) => {
                    if (e.target.value){
                        var [power, cap, bar] = e.target.value.split(":")
                        setInputValue(document.getElementById('magicPowerRatio'), power)
                        setInputValue(document.getElementById('magicCapRatio'), cap)
                        setInputValue(document.getElementById('magicBarRatio'), bar)
                    }
                    }}>
                        <option key="00" value=''>Magic Ratio quick select</option>
                        {ratioOptions}
                    </select>
                </div>
                {res3Active
                ? 
                <div className={selectBoxCSS}>
                    <select defaultValue='' className='text-black' id="rratio" onChange={(e) => {
                    if (e.target.value){
                        var [power, cap, bar] = e.target.value.split(":")
                        setInputValue(document.getElementById('res3PowerRatio'), power)
                        setInputValue(document.getElementById('res3CapRatio'), cap)
                        setInputValue(document.getElementById('res3BarRatio'), bar)
                    }
                    }}>
                    <option key="00" value=''>Resource 3 Ratio quick select</option>
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
        <Content prechildren={prechildren} title="Ratio Calculator" infoRequired={infoReq} extraRequired={extraReq} extraChildren={extraChildren} extraInputChildren={extraInputChildren} goRequired={goReq}>
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

