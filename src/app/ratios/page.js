"use client"
import Content from '@/components/content';
import { getPlayerData} from '@/helpers/context';
import { defaultPlayerData } from '@/helpers/defaultPlayerData';
import createStatesForData from '@/helpers/stateForData';


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



  // Get ratio of base power with our ratio (how many units we have of the ratio desired)
  var EPowerRat = infoData["baseEnergyPower"][0] / extraData["energyPowerRatio"][0]
  var ECapRat = infoData["baseEnergyCap"][0] / extraData["energyCapRatio"][0]
  var EBarRat = infoData["baseEnergyBar"][0] / extraData["energyBarRatio"][0]
  var MPowerRat = infoData["baseMagicPower"][0] / extraData["magicPowerRatio"][0]
  var MCapRat = infoData["baseMagicCap"][0] / extraData["magicCapRatio"][0]
  var MBarRat = infoData["baseMagicBar"][0] / extraData["magicBarRatio"][0]

  // Take our units and multiply by the "opposite" ratio (see what quantity we need)
  var EPowerRatMax = EPowerRat * extraData["magicRatio"][0]
  var ECapRatMax = ECapRat * extraData["magicRatio"][0]
  var EBarRatMax = EBarRat * extraData["magicRatio"][0]
  var MPowerRatMax = MPowerRat * extraData["energyRatio"][0]
  var MCapRatMax = MCapRat * extraData["energyRatio"][0]
  var MBarRatMax = MBarRat * extraData["energyRatio"][0]

  // Take our units and devide by the "same" ratio (smaller unit)
  var EPowerRatUnit = EPowerRat / extraData["energyRatio"][0]
  var ECapRatUnit = ECapRat / extraData["energyRatio"][0]
  var EBarRatUnit = EBarRat / extraData["energyRatio"][0]
  var MPowerRatUnit = MPowerRat / extraData["magicRatio"][0]
  var MCapRatUnit = MCapRat / extraData["magicRatio"][0]
  var MBarRatUnit = MBarRat / extraData["magicRatio"][0]


  // Similar logic as above, but with resource 3 added into the mix
  if(res3Active) {
    var RPowerRat = infoData["baseResource3Power"][0] / extraData["resource3PowerRatio"][0]
    var RCapRat = infoData["baseResource3Cap"][0] / extraData["resource3CapRatio"][0]
    var RBarRat = infoData["baseResource3Bar"][0] / extraData["resource3BarRatio"][0]

    var RPowerRatMax = RPowerRat * extraData["magicRatio"][0] * extraData["energyRatio"][0]
    var RCapRatMax = RCapRat * extraData["magicRatio"][0] * extraData["energyRatio"][0]
    var RBarRatMax = RBarRat * extraData["magicRatio"][0] * extraData["energyRatio"][0]

    var RPowerRatUnit = RPowerRat / extraData["resource3Ratio"][0]
    var RCapRatUnit = RCapRat / extraData["resource3Ratio"][0]
    var RBarRatUnit = RBarRat / extraData["resource3Ratio"][0]

    // Fix other ones
    EPowerRatMax *= extraData["resource3Ratio"][0]
    ECapRatMax *= extraData["resource3Ratio"][0]
    EBarRatMax *= extraData["resource3Ratio"][0]
    MPowerRatMax *= extraData["resource3Ratio"][0]
    MCapRatMax *= extraData["resource3Ratio"][0]
    MBarRatMax *= extraData["resource3Ratio"][0]
  }

  // Calculate desired amount
  // The largest max is where we are trying to be. So take max of all values and
  // do everything relative to that
  var maxItem = Math.max(EPowerRatMax, ECapRatMax, EBarRatMax, MPowerRatMax, MCapRatMax, MBarRatMax)
  var minItem = Math.min(EPowerRatUnit, ECapRatUnit, EBarRatUnit, MPowerRatUnit, MCapRatUnit, MBarRatUnit)
  if (res3Active) {
    maxItem = Math.max(maxItem, RPowerRatMax, RCapRatMax, RBarRatMax)
    mingItem = Math.ming(minItem, RPowerRatUnit, RCapRatUnit, RBarRatUnit)
  }
  var EPowerDesired = Math.floor(maxItem * infoData["baseEnergyPower"][0] / EPowerRatMax)
  var ECapDesired = Math.floor(maxItem * infoData["baseEnergyCap"][0] / ECapRatMax)
  var EBarDesired = Math.floor(maxItem * infoData["baseEnergyBar"][0] / EBarRatMax)
  var MPowerDesired = Math.floor(maxItem * infoData["baseMagicPower"][0] / MPowerRatMax)
  var MCapDesired = Math.floor(maxItem * infoData["baseMagicCap"][0] / MCapRatMax)
  var MBarDesired = Math.floor(maxItem * infoData["baseMagicBar"][0] / MBarRatMax)

  if (res3Active) {
    var RPowerDesired = Math.floor(maxItem * infoData["baseResource3Power"][0] / RPowerRatMax)
    var RCapDesired = Math.floor(maxItem * infoData["baseResource3Cap"][0] / RCapRatMax)
    var RBarDesired = Math.floor(maxItem * infoData["baseResource3Bar"][0] / RBarRatMax)
  }

  // Calculate amount to buy to get to desired amount
  var EPowerBuy = EPowerDesired - infoData["baseEnergyPower"][0]
  var ECapBuy = ECapDesired - infoData["baseEnergyCap"][0]
  var EBarBuy = EBarDesired - infoData["baseEnergyBar"][0]
  var MPowerBuy = MPowerDesired - infoData["baseMagicPower"][0]
  var MCapBuy = MCapDesired - infoData["baseMagicCap"][0]
  var MBarBuy = MBarDesired - infoData["baseMagicBar"][0]

  if (res3Active) {
    var RPowerBuy = RPowerDesired - infoData["baseResource3Power"][0]
    var RCapBuy = RCapDesired - infoData["baseResource3Cap"][0]
    var RBarBuy = RBarDesired - infoData["baseResource3Bar"][0]
  }

  // Cost to increase all the things
  var EExpCost = EPowerBuy * 150 + ECapBuy * 40/10000 + EBarBuy * 80
  var MExpCost = MPowerBuy * 450 + MCapBuy * 120/10000 + MBarBuy * 240
  var TotalExpCost = EExpCost + MExpCost
  if (res3Active) {
    var RExpCost = RPowerBuy * 15000000 + RCapBuy * 400 + RBarBuy * 8000000
    TotalExpCost += RExpCost
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
              <td className="text-center px-2">{EPowerDesired.toLocaleString()}</td>
              <td className="text-center px-2">{MPowerDesired.toLocaleString()}</td>
              {res3Active ? <td className="text-center px-2">{RPowerDesired.toLocaleString()}</td> : null}
            </tr>
            <tr>
              <td className="text-right pr-2">Cap</td>
              <td className="text-center px-2">{ECapDesired.toLocaleString()}</td>
              <td className="text-center px-2">{MCapDesired.toLocaleString()}</td>
              {res3Active ? <td className="text-center px-2">{RCapDesired.toLocaleString()}</td> : null }
            </tr>
            <tr>
              <td className="text-right pr-2">Bar</td>
              <td className="text-center px-2">{EBarDesired.toLocaleString()}</td>
              <td className="text-center px-2">{MBarDesired.toLocaleString()}</td>
              {res3Active ? <td className="text-center px-2">{RBarDesired.toLocaleString()}</td>: null}
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
              <td className="text-center px-2">{EPowerBuy.toLocaleString()}</td>
              <td className="text-center px-2">{MPowerBuy.toLocaleString()}</td>
              {res3Active ? <td className="text-center px-2">{RPowerBuy.toLocaleString()}</td> : null}
            </tr>
            <tr>
              <td className="text-right pr-2">Cap</td>
              <td className="text-center px-2">{ECapBuy.toLocaleString()}</td>
              <td className="text-center px-2">{MCapBuy.toLocaleString()}</td>
              {res3Active ? <td className="text-center px-2">{RCapBuy.toLocaleString()}</td> : null }
            </tr>
            <tr>
              <td className="text-right pr-2">Bar</td>
              <td className="text-center px-2">{EBarBuy.toLocaleString()}</td>
              <td className="text-center px-2">{MBarBuy.toLocaleString()}</td>
              {res3Active ? <td className="text-center px-2">{RBarBuy.toLocaleString()}</td>: null}
            </tr>
          </tbody>
        </table>

        <h4 className="text-xl mt-5">How much EXP do I need?</h4>
        <ul>
          <li key="energy"><strong>Energy:</strong> {EExpCost.toLocaleString()}</li>
          <li key="magic"><strong>Magic:</strong> {MExpCost.toLocaleString()}</li>
          {res3Active ? <li key="resource"><strong>Resource 3:</strong> {RExpCost.toLocaleString()}</li> : null}
          <li key="total"><strong>Total:</strong> {TotalExpCost.toLocaleString()}</li>
        </ul>
        <p><strong>Suggested next thing to buy:</strong> {suggestedBuy}</p>
      </Content>
    </>
  )
}

