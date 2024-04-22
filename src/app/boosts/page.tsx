"use client"
import { ItemSets } from '@/assets/sets';
import { Zones } from '@/assets/zones';
import Content from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';
import { getNumberFormat} from '@/components/context';
import { pn, bd, bigdec_max } from '@/helpers/numbers';
import { parseNum } from '@/helpers/parsers';
import { isMaxxedItem, isMaxxedItemSet } from '@/helpers/resourceInfo';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import _ from 'lodash';
import { useState } from 'react';



export default function Page() {
  const [optZoneChosen, setOptZoneChosen] = useState('training')
  var fmt = getNumberFormat();
  
  // Set data required (from playerData)
  var infoRequired = [['totalPower', 'totalDropChance%', 'totalRespawnTime', 'boostRecyclying%']]
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
  
  // Idle Attack Multiplier
  var spoopySetBonus = isMaxxedItemSet(playerStates, ItemSets.SPOOPY) ? bd(1) : bd(0)

  // idle attack cooldown
  // - Mysterious Red Liquid // 93
  var idleAttackCooldown = isMaxxedItem(playerStates, 93) ? bd(0.8) : bd(1)

  // Sadistic NECs?
  var sadisticNEC = bd(0)
  // if sadistic NEC == 5 then we double it

  var idleAttackModifier = (spoopySetBonus.multiply(bd(0.3)).add(bd(1.2))).multiply(
    bd(1).add(sadisticNEC)
  )

  
  var optimalITOPODFloor = Math.max(0, Math.floor(Math.log(Number(v('totalPower').divide(bd(765)).multiply(idleAttackModifier).getValue())) / Math.log(1.05)))

  var itopodZone = Zones.ITOPOD;
  itopodZone.setLevel(optimalITOPODFloor)
  
  
  var boostedVal = itopodZone.boostChances(v('totalDropChance%'))[0].multiply(itopodZone.boostedValue(v('boostRecyclying%'))[0]);
  var optimalZone = {key: itopodZone.key, name: itopodZone.name + " (floor: " + optimalITOPODFloor + ")", val: boostedVal};
  var zoneBoostInfo : any[] = [optimalZone];


  // Non-optimal ITOPOD
  var nonOptItopodZone = Zones.ITOPOD;
  nonOptItopodZone.setLevel( Math.ceil(optimalITOPODFloor / 50) * 50)
  var nonOptBoostedVal = nonOptItopodZone.boostChances(v('totalDropChance%'))[0].multiply(nonOptItopodZone.boostedValue(v('boostRecyclying%'))[0]);
  var nonOptItopod = {key: nonOptItopodZone.key + "NO", name: nonOptItopodZone.name + " Non-optimal" + " (floor: " + nonOptItopodZone.level + ")", val: nonOptBoostedVal}
  zoneBoostInfo.push(nonOptItopod)
  if(boostedVal.compareTo(nonOptBoostedVal) == -1) {
    boostedVal = nonOptBoostedVal
    optimalZone = nonOptItopod
  }

  if (v('totalPower').compareTo(bd(0)) != 0) {
    for(let zone of Object.values(Zones)) {
      if(zone.hardestEnemy()){
        
        var oneHitPower = zone.hardestEnemy().oneHitPower(idleAttackModifier);
        var paralyzer = zone.paralyzeEnemies();
        var normalEnemyPercent = bd(1).subtract(zone.bossChance());
        var boostChances = zone.boostChances(v('totalDropChance%'))
        var recycledValues = zone.boostedValue(v('boostRecyclying%')).reduce((sum, boost, index) => {
          var boostValueChance = boost.multiply(boostChances[index])
          return sum.add(boostValueChance)

        }, bd(0));

        var powerRat = bigdec_max((oneHitPower.divide(v('totalPower'))).ceil(), bd(1))

        var boostedValZone = (v('totalRespawnTime').add(idleAttackCooldown))
            .divide(
              v('totalRespawnTime').add(
                    idleAttackCooldown.multiply(powerRat)
                ).add(
                    idleAttackCooldown.multiply(powerRat).compareTo(bd(3.5)) == 1 ? bd(2).multiply(paralyzer) : bd(0)
                )
            )
            .multiply(normalEnemyPercent)
            .multiply(recycledValues)
        var zoneInfo = {key: zone.key, name: zone.name, val: boostedValZone}
        zoneBoostInfo.push();
        if(boostedVal.compareTo(boostedValZone) == -1) {
          boostedVal = boostedValZone
          optimalZone = zoneInfo
        }
        
      }
    }
  }

  
  var zoneList = zoneBoostInfo.map(function(zone) {
    return (
      <option key={zone.key} value={zone.key}>{zone.name}</option>
    )
  }) 
  var zoneBoonList = zoneBoostInfo.map(function(zone) {
    var bV = boostedVal.compareTo(bd(0)) == 0 ? bd(1) : boostedVal
    return (
      <li key={zone.key} className={optZoneChosen == zone.key ? "" : "hidden"}>
        {zone.name} is <span className="text-red-500">{pn(zone.val.divide(bV).multiply(bd(100)), fmt, 2)}%</span> as efficient with a boost value of <span className="text-blue-500">{pn(zone.val, fmt)}.</span>
      </li>
    )
  })
  
  
  return (
    <Content title="Boosts" infoRequired={infoReq} extraRequired={extraReq}>
      <ContentSubsection title="What is the optimal zone for getting boosts?">
          <p>
              The optimal zone for getting boosts is <span className="text-red-500">{optimalZone.name}</span> which will give you an average boost value of <span className="text-blue-500">{pn(boostedVal, fmt, 2)}</span>.
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