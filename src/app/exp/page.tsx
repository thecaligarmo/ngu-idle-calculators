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
  var optimalZoneExpValue = bd(optimalZone.exp[0] * optimalZone.exp[1]);

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

        if(optimalZoneExpValue.compareTo(expValZone) == -1) {
            optimalZoneExpValue = expValZone
            optimalZone = zone
        }
    }
  }

  
  return (
    <Content title="Experience" infoRequired={infoReq} extraRequired={extraReq}>
      <ContentSubsection title="What is the optimal zone for getting experience?">
          <p>
              The optimal zone for getting experience is <span className="text-red-500">{optimalZone.name}</span> which will give you an average exp value of <span className="text-blue-500">{pn(optimalZoneExpValue, fmt, 2)}</span>.
          </p>
      </ContentSubsection>
    </Content>
  )
}