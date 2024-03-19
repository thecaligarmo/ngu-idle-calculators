"use client"
import Content from '@/components/content';
import { getPlayerData} from '@/helpers/context';
import { defaultPlayerData } from '@/helpers/defaultPlayerData';
import {bigdec_max, bigdec_min, pn } from '@/helpers/numbers';
import createStatesForData from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import { Rock_3D } from 'next/font/google';


export default function Page() {
  const playerData = getPlayerData();
  const res3Active = defaultPlayerData(playerData, "resource3Active") === 1


  // Set data required (from playerData)
  var infoRequired = [["baseEnergyPower", "baseEnergyCap", "baseEnergyBar"], ["baseMagicPower", "baseMagicCap", "baseMagicBar"]]
  if (res3Active) {
    infoRequired.push(["baseResource3Power", "baseResource3Cap", "baseResource3Bar"])
  }
  var [infoReq, infoData] = createStatesForData(infoRequired)

  // Set extra required (not from playerData)
  var extraRequired = [["energyRatio", "energyPowerRatio", "energyCapRatio", "energyBarRatio"], ["magicRatio", "magicPowerRatio", "magicCapRatio", "magicBarRatio"]]
  if (res3Active) {
    extraRequired.push(["resource3Ratio", "resource3PowerRatio", "resource3CapRatio", "resource3BarRatio"])
  }
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
    return new bigDecimal(x["value"])
  }






  // Get ratio of base power with our ratio (how many units we have of the ratio desired)
  try{
    var EPowerRat = v("baseEnergyPower").divide(v("energyPowerRatio"))
    var ECapRat = v("baseEnergyCap").divide(v("energyCapRatio"))
    var EBarRat = v("baseEnergyBar").divide(v("energyBarRatio"))
    var MPowerRat = v("baseMagicPower").divide(v("magicPowerRatio"))
    var MCapRat = v("baseMagicCap").divide(v("magicCapRatio"))
    var MBarRat = v("baseMagicBar").divide(v("magicBarRatio"))
  } catch (error) {
    var EPowerRat = new bigDecimal(0);
    var ECapRat = new bigDecimal(0);
    var EBarRat = new bigDecimal(0);
    var MPowerRat = new bigDecimal(0);
    var MCapRat = new bigDecimal(0);
    var MBarRat = new bigDecimal(0);
  }

  // Take our units and multiply by the "opposite" ratio (see what quantity we need)
  var EPowerRatMax = EPowerRat.multiply(v("magicRatio"))
  var ECapRatMax = ECapRat.multiply(v("magicRatio"))
  var EBarRatMax = EBarRat.multiply(v("magicRatio"))
  var MPowerRatMax = MPowerRat.multiply(v("energyRatio"))
  var MCapRatMax = MCapRat.multiply(v("energyRatio"))
  var MBarRatMax = MBarRat.multiply(v("energyRatio"))

  // Take our units and devide by the "same" ratio (smaller unit)
  try {
    var EPowerRatUnit = EPowerRat.divide(v("energyRatio"))
    var ECapRatUnit = ECapRat.divide(v("energyRatio"))
    var EBarRatUnit = EBarRat.divide(v("energyRatio"))
    var MPowerRatUnit = MPowerRat.divide(v("magicRatio"))
    var MCapRatUnit = MCapRat.divide(v("magicRatio"))
    var MBarRatUnit = MBarRat.divide(v("magicRatio"))
  } catch (error) {
    var EPowerRatUnit = new bigDecimal(0)
    var ECapRatUnit = new bigDecimal(0)
    var EBarRatUnit = new bigDecimal(0)
    var MPowerRatUnit = new bigDecimal(0)
    var MCapRatUnit = new bigDecimal(0)
    var MBarRatUnit = new bigDecimal(0)
  }


  // Similar logic as above, but with resource 3 added into the mix
  if(res3Active) {
    var RPowerRat = v("baseResource3Power").divide(v("resource3PowerRatio"))
    var RCapRat = v("baseResource3Cap").divide(v("resource3CapRatio"))
    var RBarRat = v("baseResource3Bar").divide(v("resource3BarRatio"))

    var RPowerRatMax = RPowerRat.multiply(v("magicRatio")).multiply(v("energyRatio"))
    var RCapRatMax = RCapRat.multiply(v("magicRatio")).multiply(v("energyRatio"))
    var RBarRatMax = RBarRat.multiply(v("magicRatio")).multiply(v("energyRatio"))

    var RPowerRatUnit = RPowerRat.divide(v("resource3Ratio"))
    var RCapRatUnit = RCapRat.divide(v("resource3Ratio"))
    var RBarRatUnit = RBarRat.divide(v("resource3Ratio"))

    // Fix other ones
    EPowerRatMax = EPowerRatMax.multiply(v("resource3Ratio"))
    ECapRatMax = ECapRatMax.multiply(v("resource3Ratio"))
    EBarRatMax = EBarRatMax.multiply(v("resource3Ratio"))
    MPowerRatMax = MPowerRatMax.multiply(v("resource3Ratio"))
    MCapRatMax = MCapRatMax.multiply(v("resource3Ratio"))
    MBarRatMax = MBarRatMax.multiply(v("resource3Ratio"))
  }
  


  // Calculate desired amount
  // The largest max is where we are trying to be. So take max of all values and
  // do everything relative to that
  var maxItem = bigdec_max(EPowerRatMax, ECapRatMax, EBarRatMax, MPowerRatMax, MCapRatMax, MBarRatMax)
  var minItem = bigdec_min(EPowerRatUnit, ECapRatUnit, EBarRatUnit, MPowerRatUnit, MCapRatUnit, MBarRatUnit)
  if (res3Active) {
    maxItem = bigdec_max(maxItem, RPowerRatMax, RCapRatMax, RBarRatMax)
    mingItem = bigdec_min(minItem, RPowerRatUnit, RCapRatUnit, RBarRatUnit)
  }

  try {
    var EPowerDesired = (maxItem.multiply(v("baseEnergyPower")).divide(EPowerRatMax)).floor()
    var ECapDesired = (maxItem.multiply(v("baseEnergyCap")).divide(ECapRatMax)).floor()
    var EBarDesired = (maxItem.multiply(v("baseEnergyBar")).divide(EBarRatMax)).floor()
    var MPowerDesired = (maxItem.multiply(v("baseMagicPower")).divide(MPowerRatMax)).floor()
    var MCapDesired = (maxItem.multiply(v("baseMagicCap")).divide(MCapRatMax)).floor()
    var MBarDesired = (maxItem.multiply(v("baseMagicBar")).divide(MBarRatMax)).floor()
    if (res3Active) {
      var RPowerDesired = (maxItem.multiply(v("baseResource3Power")).divide(RPowerRatMax)).floor()
      var RCapDesired = (maxItem.multiply(v("baseResource3Cap")).divide(RCapRatMax)).floor()
      var RBarDesired = (maxItem.multiply(v("baseResource3Bar")).divide(RBarRatMax)).floor()
    }
  } catch (error) {
    var EPowerDesired = new bigDecimal(0);
    var ECapDesired = new bigDecimal(0);
    var EBarDesired = new bigDecimal(0);
    var MPowerDesired = new bigDecimal(0);
    var MCapDesired = new bigDecimal(0);
    var MBarDesired = new bigDecimal(0);
    if (res3Active) {
      var RPowerDesired = new bigDecimal(0);
      var RCapDesired = new bigDecimal(0);
      var RBarDesired = new bigDecimal(0);
    }
  }

  // Calculate amount to buy to get to desired amount
  var EPowerBuy = EPowerDesired.subtract(v("baseEnergyPower"))
  var ECapBuy = ECapDesired.subtract(v("baseEnergyCap"))
  var EBarBuy = EBarDesired.subtract(v("baseEnergyBar"))
  var MPowerBuy = MPowerDesired.subtract(v("baseMagicPower"))
  var MCapBuy = MCapDesired.subtract(v("baseMagicCap"))
  var MBarBuy = MBarDesired.subtract(v("baseMagicBar"))

  if (res3Active) {
    var RPowerBuy = RPowerDesired.subtract(v("baseResource3Power"))
    var RCapBuy = RCapDesired.subtract(v("baseResource3Cap"))
    var RBarBuy = RBarDesired.subtract(v("baseResource3Bar"))
  }

  // Cost to increase all the things
  try {
  var EExpCost = EPowerBuy.multiply(150).add(ECapBuy.multiply(40).divide(10000)).add(EBarBuy.multiply(80))
  var MExpCost = MPowerBuy.multiply(450).add(MCapBuy.multiply(120).divide(10000)).add(MBarBuy.multiply(240))
  var TotalExpCost = EExpCost.add(MExpCost)
  if (res3Active) {
    var RExpCost = RPowerBuy.multiply(15000000).add(RCapBuy.multiply(400)).add(RBarBuy.multiply(8000000))
    TotalExpCost = TotalExpCost.add(RExpCost)
  }
  } catch (error) {
    var EExpCost = new bigDecimal(0);
    var MExpCost = new bigDecimal(0);
    var TotalExpCost = new bigDecimal(0);
    var RExpCost = new bigDecimal(0);
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
  


  return (
    <>
      <Content title="Ratio Calculator" infoRequired={infoReq} extraRequired={extraReq}>
        <h4 className="text-xl">What it should be:</h4>
        <table className="table-auto mt-2">
          <thead>
            <tr>
              <th className="w-32"></th>
              <th>Energy</th>
              <th>Magic</th>
              {res3Active ? <th>Resource 3</th> :null}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-right pr-2">Power</td>
              <td className="text-center px-2">{pn(EPowerDesired)}</td>
              <td className="text-center px-2">{pn(MPowerDesired)}</td>
              {res3Active ? <td className="text-center px-2">{pn(RPowerDesired)}</td> : null}
            </tr>
            <tr>
              <td className="text-right pr-2">Cap</td>
              <td className="text-center px-2">{pn(ECapDesired)}</td>
              <td className="text-center px-2">{pn(MCapDesired)}</td>
              {res3Active ? <td className="text-center px-2">{pn(RCapDesired)}</td> : null }
            </tr>
            <tr>
              <td className="text-right pr-2">Bar</td>
              <td className="text-center px-2">{pn(EBarDesired)}</td>
              <td className="text-center px-2">{pn(MBarDesired)}</td>
              {res3Active ? <td className="text-center px-2">{pn(RBarDesired)}</td>: null}
            </tr>
          </tbody>
        </table>

        <h4 className="text-xl mt-5">What you need to buy:</h4>
        <table className="table-auto mt-2">
          <thead>
            <tr>
              <th className="w-32"></th>
              <th>Energy</th>
              <th>Magic</th>
              {res3Active ? <th>Resource 3</th> :null}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-right pr-2">Power</td>
              <td className="text-center px-2">{pn(EPowerBuy)}</td>
              <td className="text-center px-2">{pn(MPowerBuy)}</td>
              {res3Active ? <td className="text-center px-2">{pn(RPowerBuy)}</td> : null}
            </tr>
            <tr>
              <td className="text-right pr-2">Cap</td>
              <td className="text-center px-2">{pn(ECapBuy)}</td>
              <td className="text-center px-2">{pn(MCapBuy)}</td>
              {res3Active ? <td className="text-center px-2">{pn(RCapBuy)}</td> : null }
            </tr>
            <tr>
              <td className="text-right pr-2">Bar</td>
              <td className="text-center px-2">{pn(EBarBuy)}</td>
              <td className="text-center px-2">{pn(MBarBuy)}</td>
              {res3Active ? <td className="text-center px-2">{pn(RBarBuy)}</td>: null}
            </tr>
          </tbody>
        </table>

        <h4 className="text-xl mt-5">How much EXP do I need?</h4>
        <ul>
          <li key="energy"><strong>Energy:</strong> {pn(EExpCost)}</li>
          <li key="magic"><strong>Magic:</strong> {pn(MExpCost)}</li>
          {res3Active ? <li key="resource"><strong>Resource 3:</strong> {pn(RExpCost)}</li> : null}
          <li key="total"><strong>Total:</strong> {pn(TotalExpCost)}</li>
        </ul>
        <p><strong>Suggested next thing to buy:</strong> {suggestedBuy}</p>
      </Content>
    </>
  )
}

