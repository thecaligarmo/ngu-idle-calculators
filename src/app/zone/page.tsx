"use client"
import Content, { requiredDataType } from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';
import { getNumberFormat } from '@/components/context';
import { bd, isOne, isZero, pn } from '@/helpers/numbers';
import { getOptimalBoostZone, getOptimalExpZone, getZoneInfo } from '@/helpers/pages/zone';
import { parseNum, parseObj } from '@/helpers/parsers';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import { useState } from 'react';



export default function Page() {
    const [optZoneChosen, setOptZoneChosen] = useState('training')
    var fmt = getNumberFormat();
    
    // Set data required (from playerData)
    var infoRequired : requiredDataType = [
        ['totalDropChance%', 'totalPower', 'totalRespawnTime', 'boostRecyclying%'],
        ['sadisticNoEquipmentChallenges-2', 'redLiquidBonus^', 'spoopySetBonus^']]
    // Set extra required (not from playerData)
    var extraRequired : requiredDataType = [[]]
    var goRequired : requiredDataType = [['goDropChance%', 'goPower%', 'goRespawn%']]
    const playerStates = createStatesForData(extraRequired, goRequired);
    
    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates)
    var extraReq = getRequiredStates(extraRequired, playerStates)
    var goReq = getRequiredStates(goRequired, playerStates)


    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        return parseNum(playerStates, key)
    }

    function j(key : string) : any{
        return parseObj(playerStates, key)
    }

    function c(key : string) : boolean {
        return isOne(v(key))
    }

    var data = {
        boostRecyclying: v('boostRecyclying%'),
        redLiquidBonus : c('redLiquidBonus^'),
        sadisticNoEquipmentChallenges: v('sadisticNoEquipmentChallenges-2'),
        spoopySetBonus: c('spoopySetBonus^'),
        totalDropChance: v('totalDropChance%'),
        totalPower: v('totalPower'),
        totalRespawnTime: v('totalRespawnTime'),
    }
    var zoneInfo = getZoneInfo(data)
    var optimalBoostZone = getOptimalBoostZone(zoneInfo);
    var optimalExpZone = getOptimalExpZone(zoneInfo);

    var zoneList = zoneInfo.map(function(zone) {
        return (
        <option key={zone.key} value={zone.key}>{zone.name}</option>
        )
    })

    var zoneBoonList = zoneInfo.map(function(zone) {
        var bV = isZero(optimalBoostZone['boost']) ? bd(1) : optimalBoostZone['boost']
        return (
        <li key={zone.key} className={optZoneChosen == zone.key ? "" : "hidden"}>
            {zone.name} is <span className="text-red-500">{pn(zone.boost.divide(bV).multiply(bd(100)), fmt, 2)}%</span> as efficient with a boost value of <span className="text-blue-500">{pn(zone.boost, fmt)}.</span>
        </li>
        )
    })

    var zoneExpList = zoneInfo.map(function(zone) {
        var eV = isZero(optimalExpZone['exp']) ? bd(1) : optimalExpZone['exp']
        return (
        <li key={zone.key} className={optZoneChosen == zone.key ? "" : "hidden"}>
            {zone.name} is <span className="text-red-500">{pn(zone.exp.divide(eV).multiply(bd(100)), fmt, 2)}%</span> as efficient with a exp value of <span className="text-blue-500">{pn(zone.exp, fmt)}.</span>
        </li>
        )
    })
    
    
    return (
        <Content title="Optimal Zones" infoRequired={infoReq} extraRequired={extraReq} goRequired={goReq}>
            <ContentSubsection title="What is the optimal zone for getting boosts?">
                <p>
                    The optimal zone for getting boosts is <span className="text-red-500">{optimalBoostZone.name}</span> which will give you an average boost value of <span className="text-blue-500">{pn(optimalBoostZone['boost'], fmt, 2)}</span>.
                </p>
                <br />
                <div className="pl-10">
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
                </div>
            </ContentSubsection>
            <ContentSubsection title="What is the optimal zone for getting experience?">
                <p>
                    The optimal zone for getting experience is <span className="text-red-500">{optimalExpZone.name}</span> which will give you an average exp value of <span className="text-blue-500">{pn(optimalExpZone['exp'], fmt, 2)}</span>.
                </p>
                <br />
                <div className="pl-10">
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
                        {zoneExpList}
                    </ul>
                </div>
            </ContentSubsection>
        </Content>
    )
}