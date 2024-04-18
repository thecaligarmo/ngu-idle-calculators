"use client"
import { ItemSet, ItemSets } from '@/assets/sets';
import Zone, { Zones } from '@/assets/zones';
import { ChoiceButton } from '@/components/buttons';
import Content from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';
import { getNumberFormat, getPlayerData} from '@/components/context';
import { totalDropChance, totalRespawnRate } from '@/helpers/calculators';
import { defaultPlayerData } from '@/helpers/defaultPlayerData';
import { setInputValue } from '@/helpers/inputUpdater';
import {bigdec_max, bigdec_min, pn, bd } from '@/helpers/numbers';
import { parseNum, parseObj } from '@/helpers/parsers';
import { isMaxxedItem, isMaxxedItemSet } from '@/helpers/resourceInfo';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import _ from 'lodash';
import { useState } from 'react';



export default function Page() {
  
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
  
  var optimalZone = itopodZone;
  var boostedVal = optimalZone.boostChances(v('totalDropChance%'))[0].multiply(optimalZone.boostedValue(v('boostRecyclying%'))[0]);

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

      var boostedValZone = (v('totalRespawnTime').add(idleAttackCooldown))
          .divide(
            v('totalRespawnTime').add(
                  idleAttackCooldown.multiply(oneHitPower.divide(v('totalPower')).ceil())
              ).add(
                  idleAttackCooldown.multiply((oneHitPower.divide(v('totalPower'))).ceil()).compareTo(bd(3.5)) == 1 ? bd(2).multiply(paralyzer) : bd(0)
              )
          )
          .multiply(normalEnemyPercent)
          .multiply(recycledValues)
      if(boostedVal.compareTo(boostedValZone) == -1) {
        boostedVal = boostedValZone
        optimalZone = zone
      }
    }
  }

  
  return (
    <Content title="Boosts" infoRequired={infoReq} extraRequired={extraReq}>
      <ContentSubsection title="What is the optimal zone for getting boosts?">
          <p>
              The optimal zone for getting boosts is <span className="text-red-500">{optimalZone.name}</span> which will give you an average boost value of <span className="text-blue-500">{pn(boostedVal, fmt, 2)}</span>.
          </p>
      </ContentSubsection>
    </Content>
  )
}