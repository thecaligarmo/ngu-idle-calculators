"use client"
import { Zones } from '@/assets/zones';
import Content from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';
import { getNumberFormat} from '@/components/context';
import { pn, bd, bigdec_max } from '@/helpers/numbers';
import { parseNum } from '@/helpers/parsers';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import _ from 'lodash';
import { useState } from 'react';



export default function Page() {
  const [optZoneChosen, setOptZoneChosen] = useState('training')
  var fmt = getNumberFormat();
  
  // Set data required (from playerData)
  var infoRequired = [['totalPower', 'totalDropChance%', 'totalRespawnTime', 'boostRecyclying%'], ['redLiquidBonus^', 'spoopySetBonus^']]
  // Set extra required (not from playerData)
  var extraRequired = [[]]
  const playerStates = createStatesForData(extraRequired);
  
  // Get required data
  var infoReq = getRequiredStates(infoRequired, playerStates)
  var extraReq = getRequiredStates(extraRequired, playerStates)

  // Helper function - Needed in every isntance (makes code easier to read too)
  function v(key : string) : bigDecimal{
    return parseNum(playerStates, key)
  }

  
  // idle attack cooldown
  var idleAttackCooldown = v('redLiquidBonus^').compareTo(bd(1)) == 0 ? bd(0.8) : bd(1)

  // Sadistic NECs?
  var sadisticNEC = bd(0)
  // if sadistic NEC == 5 then we double it

  var idleAttackModifier = (v('spoopySetBonus^').multiply(bd(0.3)).add(bd(1.2))).multiply(
    bd(1).add(sadisticNEC)
  )

  
  var optimalITOPODFloor = Math.max(0, Math.floor(Math.log(Number(v('totalPower').divide(bd(765)).multiply(idleAttackModifier).getValue())) / Math.log(1.05)))

  var itopodZone = Zones.ITOPOD;
  itopodZone.setLevel(optimalITOPODFloor)
  
  
  var optimalZoneExpValue = bd(itopodZone.exp[0] * itopodZone.exp[1]);
  var optimalZone = {key: itopodZone.key, name: itopodZone.name + " (floor: " + optimalITOPODFloor + ")", val: optimalZoneExpValue};
  var zoneExpInfo : any[] = [optimalZone];

    // Non-optimal ITOPOD
    var nonOptItopodZone = Zones.ITOPOD;
    nonOptItopodZone.setLevel( Math.ceil(optimalITOPODFloor / 50) * 50)
    var nonOptExpVal = bd(nonOptItopodZone.exp[0] * nonOptItopodZone.exp[1]);
    var nonOptItopodZoneInfo = {key: nonOptItopodZone.key + "NO", name: nonOptItopodZone.name + " Non-optimal" + " (floor: " + nonOptItopodZone.level + ")", val: nonOptExpVal}
    zoneExpInfo.push(nonOptItopodZoneInfo)
    if(optimalZoneExpValue.compareTo(nonOptExpVal) == -1) {
      optimalZoneExpValue = nonOptExpVal
      optimalZone = nonOptItopodZoneInfo
    }

  if (v('totalPower').compareTo(bd(0)) != 0) {
    for(let zone of Object.values(Zones)) {
      if(zone.hardestEnemy()){
        
        var oneHitPower = zone.hardestEnemy().oneHitPower(idleAttackModifier);
        var paralyzer = zone.paralyzeEnemies();
        var expChance = zone.expChance(v('totalDropChance%'))
        var exp = zone.exp[0]

        // Needs ot be at least one
        var powerRat = bigdec_max((oneHitPower.divide(v('totalPower'))).ceil(), bd(1))

        var expValZone = (v('totalRespawnTime').add(idleAttackCooldown))
            .divide(
              v('totalRespawnTime').add(
                    idleAttackCooldown.multiply(powerRat)
                ).add(
                    idleAttackCooldown.multiply(powerRat).compareTo(bd(3.5)) == 1 ? bd(2).multiply(paralyzer) : bd(0)
                )
            )
            .multiply(expChance)
            .multiply(bd(exp))

          var zoneInfo = {key: zone.key, name: zone.name, val: expValZone}
          zoneExpInfo.push(zoneInfo);
          if(optimalZoneExpValue.compareTo(expValZone) == -1) {
              optimalZoneExpValue = expValZone
              optimalZone = zoneInfo
          }
          
      }
    }
  }

  var zoneList = zoneExpInfo.map(function(zone) {
    return (
      <option key={zone.key} value={zone.key}>{zone.name}</option>
    )
  }) 
  var zoneBoonList = zoneExpInfo.map(function(zone) {
    var eV = optimalZoneExpValue.compareTo(bd(0)) == 0 ? bd(1) : optimalZoneExpValue
    return (
      <li key={zone.key} className={optZoneChosen == zone.key ? "" : "hidden"}>
        {zone.name} is <span className="text-red-500">{pn(zone.val.divide(eV).multiply(bd(100)), fmt, 2)}%</span> as efficient with a exp value of <span className="text-blue-500">{pn(zone.val, fmt)}.</span>
      </li>
    )
  })

  
  return (
    <Content title="Experience" infoRequired={infoReq} extraRequired={extraReq}>
      <ContentSubsection title="What is the optimal zone for getting experience?">
          <p>
              The optimal zone for getting experience is <span className="text-red-500">{optimalZone.name}</span> which will give you an average exp value of <span className="text-blue-500">{pn(optimalZoneExpValue, fmt, 2)}</span>.
          </p>
          <br />
          <p>
            Compare the optimal zone with:
            <select
              className='ml-2 text-black'
              onChange={(e) => {
                setOptZoneChosen(e.target.value)
              }}
              value={optZoneChosen}
            >
              {zoneList}
            </select>
          </p>
          <ul>
            {zoneBoonList}
          </ul>
      </ContentSubsection>
    </Content>
  )
}