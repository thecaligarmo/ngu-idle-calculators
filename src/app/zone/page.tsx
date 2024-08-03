"use client"
import { Zones } from '@/assets/zones';
import Content from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';
import { getNumberFormat} from '@/components/context';
import { pn, bd, bigdec_max } from '@/helpers/numbers';
import { getOptimalBoostZone, getOptimalExpZone, getZoneInfo } from '@/helpers/pages/zone';
import { parseNum, parseObj } from '@/helpers/parsers';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import _ from 'lodash';
import { useState } from 'react';



export default function Page() {
    const [optZoneChosen, setOptZoneChosen] = useState('training')
    var fmt = getNumberFormat();
    
    // Set data required (from playerData)
    var infoRequired = [
        ['totalPower', 'totalDropChance%', 'totalRespawnTime', 'boostRecyclying%', 'sadisticNoEquipmentChallenges'],
        ['redLiquidBonus^', 'spoopySetBonus^']]
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

    function j(key : string) : any{
        return parseObj(playerStates, key)
    }

    function c(key : string) : boolean {
        return v(key).compareTo(bd(1)) == 0
    }

    var data = {
        boostRecyclying: v('boostRecyclying%'),
        redLiquidBonus : c('redLiquidBonus^'),
        sadisticNoEquipmentChallenges: v('sadisticNoEquipmentChallenges'),
        spoopySetBonus: c('spoopySetBonus^'),
        totalDropChance: v('totalDropChance%'),
        totalPower: v('totalPower'),
        totalRespawnTime: v('totalRespawnTime'),
    }
    var zoneInfo = getZoneInfo(data)
    var optimalBoostZone = getOptimalBoostZone(zoneInfo);
    var optimalExpZone = getOptimalExpZone(zoneInfo);
    console.log(zoneInfo);

    var zoneList = zoneInfo.map(function(zone) {
        return (
        <option key={zone.key} value={zone.key}>{zone.name}</option>
        )
    })

    var zoneBoonList = zoneInfo.map(function(zone) {
        var bV = optimalBoostZone['boost'].compareTo(bd(0)) == 0 ? bd(1) : optimalBoostZone['boost']
        return (
        <li key={zone.key} className={optZoneChosen == zone.key ? "" : "hidden"}>
            {zone.name} is <span className="text-red-500">{pn(zone.boost.divide(bV).multiply(bd(100)), fmt, 2)}%</span> as efficient with a boost value of <span className="text-blue-500">{pn(zone.boost, fmt)}.</span>
        </li>
        )
    })
    
    
    return (
        <Content title="Optimal Zones" infoRequired={infoReq} extraRequired={extraReq}>
            <ContentSubsection title="What is the optimal zone for getting boosts?">
                <p>
                    The optimal zone for getting boosts is <span className="text-red-500">{optimalBoostZone.name}</span> which will give you an average boost value of <span className="text-blue-500">{pn(optimalBoostZone['boost'], fmt, 2)}</span>.
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
            <ContentSubsection title="What is the optimal zone for getting experience?">
                <p>
                    The optimal zone for getting experience is <span className="text-red-500">{optimalExpZone.name}</span> which will give you an average exp value of <span className="text-blue-500">{pn(optimalExpZone['exp'], fmt, 2)}</span>.
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