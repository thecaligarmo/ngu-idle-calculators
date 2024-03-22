"use client"
import { ChoiceButton } from '@/components/buttons';
import Content from '@/components/content';
import { getPlayerData} from '@/helpers/context';
import { defaultPlayerData } from '@/helpers/defaultPlayerData';
import { setInputValue } from '@/helpers/inputUpdater';
import {bigdec_max, bigdec_min, pn, bd } from '@/helpers/numbers';
import createStatesForData from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import { useState } from 'react';


// Get the max and unit based off the ratios
function getRatMaxAndUnit(base, ratio, mainRatio, oppRatio, thirdRatio) {
  // Might accidentally divide by 0
  try{
    // Get ratio of base power with our ratio (how many units we have of the ratio desired)
    var rat = base.divide(ratio)
    // Take our units and multiply by the "opposite" ratio (see what quantity we need)
    var ratMax = rat.multiply(oppRatio).multiply(thirdRatio)
    // Take our units and devide by the "same" ratio (smaller unit)
    var ratUnit = rat.divide(mainRatio)
    return [ratMax, ratUnit]
  } catch (error) {
    return [bd(0), bd(0)]
  }
}

// Get numbers desired and for buying
function getDesiredBuy(maxItem, base, ratMax) {
  try {
    var desired = (maxItem.multiply(base).divide(ratMax)).floor()
  } catch(error) {
    var desired = bd(0);
  }
  var buy = bigdec_max(desired.subtract(base), bd(0));
  return [desired, buy]
}


export default function Page() {
  const playerData = getPlayerData();
  var defaultres3 = defaultPlayerData(playerData, "resource3Active") === 1
  const [res3Active, setRes3Active] = useState(defaultres3)


  // Set data required (from playerData)
  var infoRequired = [["baseEnergyPower", "baseEnergyCap", "baseEnergyBar"], ["baseMagicPower", "baseMagicCap", "baseMagicBar"],["baseResource3Power", "baseResource3Cap", "baseResource3Bar"]]
  var [infoReq, infoData] = createStatesForData(infoRequired)

  // Set extra required (not from playerData)
  var extraRequired = [["energyRatio", "energyPowerRatio", "energyCapRatio", "energyBarRatio"], ["magicRatio", "magicPowerRatio", "magicCapRatio", "magicBarRatio"],["resource3Ratio", "resource3PowerRatio", "resource3CapRatio", "resource3BarRatio"]]
  var [extraReq, extraData] = createStatesForData(extraRequired)

  // Helper function - Needed in every isntance (makes code easier to read too)
  function v(key) {
    if (key in infoData) {
      var x = infoData[key][0] 
    } else if (key in extraData) {
      var x = extraData[key][0]
    }
    if (x instanceof bigDecimal) {
      return x
    }
    return bd(x)
  }
  

  var [EPowerRatMax, EPowerRatUnit] = getRatMaxAndUnit(v("baseEnergyPower"), v("energyPowerRatio"), v("energyRatio"), v("magicRatio"), res3Active ? v("resource3Ratio") : bd(1));
  var [ECapRatMax, ECapRatUnit] = getRatMaxAndUnit(v("baseEnergyCap"), v("energyCapRatio"), v("energyRatio"), v("magicRatio"), res3Active ? v("resource3Ratio") : bd(1));
  var [EBarRatMax, EBarRatUnit] = getRatMaxAndUnit(v("baseEnergyBar"), v("energyBarRatio"), v("energyRatio"), v("magicRatio"), res3Active ? v("resource3Ratio") : bd(1));
  var [MPowerRatMax, MPowerRatUnit] = getRatMaxAndUnit(v("baseMagicPower"), v("magicPowerRatio"), v("magicRatio"), v("energyRatio"), res3Active ? v("resource3Ratio") : bd(1));
  var [MCapRatMax, MCapRatUnit] = getRatMaxAndUnit(v("baseMagicCap"), v("magicCapRatio"), v("magicRatio"), v("energyRatio"), res3Active ? v("resource3Ratio") : bd(1));
  var [MBarRatMax, MBarRatUnit] = getRatMaxAndUnit(v("baseMagicBar"), v("magicBarRatio"), v("magicRatio"), v("energyRatio"), res3Active ? v("resource3Ratio") : bd(1));
  if(res3Active) {
    var [RPowerRatMax, RPowerRatUnit] = getRatMaxAndUnit(v("baseResource3Power"), v("resource3PowerRatio"), v("resource3Ratio"), v("magicRatio"), v("energyRatio"));
    var [RCapRatMax, RCapRatUnit] = getRatMaxAndUnit(v("baseResource3Cap"), v("resource3CapRatio"), v("resource3Ratio"), v("magicRatio"), v("energyRatio"));
    var [RBarRatMax, RBarRatUnit] = getRatMaxAndUnit(v("baseResource3Bar"), v("resource3BarRatio"), v("resource3Ratio"), v("magicRatio"), v("energyRatio"));
  }
  // Calculate desired amount
  // The largest max is where we are trying to be. So take max of all values and
  // do everything relative to that
  var maxItem = bigdec_max(EPowerRatMax, ECapRatMax, EBarRatMax, MPowerRatMax, MCapRatMax, MBarRatMax)
  var minItem = bigdec_min(EPowerRatUnit, ECapRatUnit, EBarRatUnit, MPowerRatUnit, MCapRatUnit, MBarRatUnit)
  if (res3Active) {
    maxItem = bigdec_max(maxItem, RPowerRatMax, RCapRatMax, RBarRatMax)
    minItem = bigdec_min(minItem, RPowerRatUnit, RCapRatUnit, RBarRatUnit)
  }

  
  var [EPowerDesired, EPowerBuy] = getDesiredBuy(maxItem, v("baseEnergyPower"), EPowerRatMax)
  var [ECapDesired, ECapBuy] = getDesiredBuy(maxItem, v("baseEnergyCap"), ECapRatMax)
  var [EBarDesired, EBarBuy] = getDesiredBuy(maxItem, v("baseEnergyBar"), EBarRatMax)
  var [MPowerDesired, MPowerBuy] = getDesiredBuy(maxItem, v("baseMagicPower"), MPowerRatMax)
  var [MCapDesired, MCapBuy] = getDesiredBuy(maxItem, v("baseMagicCap"), MCapRatMax)
  var [MBarDesired, MBarBuy] = getDesiredBuy(maxItem, v("baseMagicBar"), MBarRatMax)
  if (res3Active) {
    var [RPowerDesired, RPowerBuy] = getDesiredBuy(maxItem, v("baseResource3Power"), RPowerRatMax)
    var [RCapDesired, RCapBuy] = getDesiredBuy(maxItem, v("baseResource3Cap"), RCapRatMax)
    var [RBarDesired, RBarBuy] = getDesiredBuy(maxItem, v("baseResource3Bar"), RBarRatMax)
  }


  // Cost to increase all the things
  var EExpCost = EPowerBuy.multiply(bd(15)).add(ECapBuy.multiply(bd(40)).divide(bd(10000))).add(EBarBuy.multiply(bd(80))).ceil()
  var MExpCost = MPowerBuy.multiply(bd(450)).add(MCapBuy.multiply(bd(120)).divide(bd(10000))).add(MBarBuy.multiply(bd(240))).ceil()
  var TotalExpCost = EExpCost.add(MExpCost)
  if (res3Active) {
    var RExpCost = RPowerBuy.multiply(bd(15000000)).add(RCapBuy.multiply(bd(400))).add(RBarBuy.multiply(bd(8000000))).ceil()
    TotalExpCost = TotalExpCost.add(RExpCost)
  }
  

  var suggestedBuy = ""
  switch(minItem) {
    case EPowerRatUnit:
      suggestedBuy = "Energy Power"
      break;
    case ECapRatUnit:
      suggestedBuy = "Energy Cap"
      break;
    case EBarRatUnit:
      suggestedBuy = "Energy Bar"
      break;
    case RPowerRatUnit:
      suggestedBuy = "Resource 3 Power"
      break;
    case RCapRatUnit:
      suggestedBuy = "Resource 3 Cap"
      break;
    case RBarRatUnit:
      suggestedBuy = "Resource 3 Bar"
      break;
    case MPowerRatUnit:
      suggestedBuy = "Magic Power"
      break;
    case MCapRatUnit:
      suggestedBuy = "Magic Cap"
      break;
    case MBarRatUnit:
      suggestedBuy = "Magic Bar"
      break;
  }
  
  if (!res3Active) {
    infoReq.pop()
    extraReq.pop()
  }

  var extraChildren = (
    <>
      <ChoiceButton
        text={res3Active ? "Hide R3" : "Show R3"}
        onClick={() => setRes3Active(!res3Active)}
        />
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
        <div className="inline-block align-top mb-2 w-1/2 ">
        <select defaultValue='' className='text-black' onChange={(e) => {
          if (e.target.value){
            var [power, cap, bar] = e.target.value.split(":")
            setInputValue(document.getElementById('energyPowerRatio'), power)
            setInputValue(document.getElementById('energyCapRatio'), cap)
            setInputValue(document.getElementById('energyBarRatio'), bar)
          }
        }}>
          <option value=''>Energy Ratio quick select</option>
          <option value="1:37500:1">1:37500:1</option>
          <option value="5:160000:4">5:160000:4</option>
        </select>
        </div>
        <div className="inline-block align-top mb-2 w-1/2 ">
        <select defaultValue='' className='text-black' onChange={(e) => {
          if (e.target.value){
            var [power, cap, bar] = e.target.value.split(":")
            setInputValue(document.getElementById('magicPowerRatio'), power)
            setInputValue(document.getElementById('magicCapRatio'), cap)
            setInputValue(document.getElementById('magicBarRatio'), bar)
          }
        }}>
          <option value=''>Magic Ratio quick select</option>
          <option value="1:37500:1">1:37500:1</option>
          <option value="5:160000:4">5:160000:4</option>
        </select>
        </div>
      </div>
    </>
  )

  var prechildren = (
    <>
      <p>Calculate how much Energy/Magic/Resource 3 you need in order to have the proper ratios.</p>
    </>
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
                <td className="text-center px-2">{pn(EPowerDesired)}</td>
                <td className="text-center px-2">{pn(MPowerDesired)}</td>
                {res3Active ? <td className="text-center px-2">{pn(RPowerDesired)}</td> : null}
              </tr>
              <tr>
                <td className="text-right pr-2"><strong>Cap</strong></td>
                <td className="text-center px-2">{pn(ECapDesired)}</td>
                <td className="text-center px-2">{pn(MCapDesired)}</td>
                {res3Active ? <td className="text-center px-2">{pn(RCapDesired)}</td> : null }
              </tr>
              <tr>
                <td className="text-right pr-2"><strong>Bar</strong></td>
                <td className="text-center px-2">{pn(EBarDesired)}</td>
                <td className="text-center px-2">{pn(MBarDesired)}</td>
                {res3Active ? <td className="text-center px-2">{pn(RBarDesired)}</td>: null}
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
                <td className="text-center px-2">{pn(EPowerBuy)}</td>
                <td className="text-center px-2">{pn(MPowerBuy)}</td>
                {res3Active ? <td className="text-center px-2">{pn(RPowerBuy)}</td> : null}
              </tr>
              <tr>
                <td className="text-right pr-2"><strong>Cap</strong></td>
                <td className="text-center px-2">{pn(ECapBuy)}</td>
                <td className="text-center px-2">{pn(MCapBuy)}</td>
                {res3Active ? <td className="text-center px-2">{pn(RCapBuy)}</td> : null }
              </tr>
              <tr>
                <td className="text-right pr-2"><strong>Bar</strong></td>
                <td className="text-center px-2">{pn(EBarBuy)}</td>
                <td className="text-center px-2">{pn(MBarBuy)}</td>
                {res3Active ? <td className="text-center px-2">{pn(RBarBuy)}</td>: null}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h4 className="text-xl mt-5">How much EXP do I need to achieve ratio?</h4>
      <ul>
        <li key="energy"><strong>Energy:</strong> {pn(EExpCost)} exp</li>
        <li key="magic"><strong>Magic:</strong> {pn(MExpCost)} exp</li>
        {res3Active ? <li key="resource"><strong>Resource 3:</strong> {pn(RExpCost)} exp</li> : null}
        <li key="total">
          <span className="border-t-2 border-white border-solid"><strong>Total Amount:</strong> {pn(TotalExpCost)} exp</span>
          </li>
      </ul>
      <p><strong>Suggested next thing to buy:</strong> {suggestedBuy}</p>
    </Content>
  )
}

