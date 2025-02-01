import { useState } from "react";
import { getNumberFormat, getPlayer } from "../components/Context";
import Content, { requiredDataType } from "../components/Content";
import { getPlayerDataInfo } from "@/helpers/playerInfo";
import { getOptimalBoostZone, getOptimalExpZone, getZoneInfo } from "@/helpers/pages/zone";
import { bd, isZero, pn } from "@/helpers/numbers";
import ContentSubsection from "../components/ContentSubsection";

export default function ZonePage() {
    const [optZoneChosen, setOptZoneChosen] = useState('training')
    const player = getPlayer();
    const fmt = getNumberFormat();
    
    // Set data required (from playerData)
    const infoRequired : requiredDataType = [
        ['totalDropChance', 'totalPower', 'totalRespawnTime', 'boostRecyclying'],
        ['sadisticNoEquipmentChallenges', 'redLiquidBonus', 'spoopySetBonus']]
    // Set extra required (not from playerData)
    const extraRequired : requiredDataType = [[]]
    const goRequired : requiredDataType = [['goDropChance', 'goPower', 'goRespawn']]
    
    // Get required data
    const infoReq = getPlayerDataInfo(infoRequired)
    const extraReq = getPlayerDataInfo(extraRequired)
    const goReq = getPlayerDataInfo(goRequired)


    const zoneInfo = getZoneInfo(player)
    const optimalBoostZone = getOptimalBoostZone(zoneInfo);
    const optimalExpZone = getOptimalExpZone(zoneInfo);

    const zoneList = zoneInfo.map(function(zone) {
        return (
        <option key={zone.key} value={zone.key}>{zone.name}</option>
        )
    })

    const zoneBoonList = zoneInfo.map(function(zone) {
        const bV = isZero(optimalBoostZone['boost']) ? bd(1) : optimalBoostZone['boost']
        return (
        <li key={zone.key} className={optZoneChosen == zone.key ? "" : "hidden"}>
            {zone.name} is <span className="text-red-500">{pn(zone.boost.divide(bV).multiply(bd(100)), fmt, 2)}%</span> as efficient with a boost value of <span className="text-blue-500">{pn(zone.boost, fmt)}.</span>
        </li>
        )
    })

    const zoneExpList = zoneInfo.map(function(zone) {
        const eV = isZero(optimalExpZone['exp']) ? bd(1) : optimalExpZone['exp']
        return (
        <li key={zone.key} className={optZoneChosen == zone.key ? "" : "hidden"}>
            {zone.name} is <span className="text-red-500">{pn(zone.exp.divide(eV).multiply(bd(100)), fmt, 2)}%</span> as efficient with a exp value of <span className="text-blue-500">{pn(zone.exp, fmt)}.</span>
        </li>
        )
    })

    // var zoneHitList = zoneInfo.map(function(zone) {
    //     return (
    //         <li key={zone.key}>
    //             {zone.name} is {zone.hitsToKill} hits per kill with {pn(zone.killsPerHour, fmt, 4)} kills per hour.
    //         </li>
    //     )
    // })

    // let dc = itemSetDropChance(data)
    // if (dc instanceof bigDecimal) {
    //     console.log('hii', dn(dc))
    // } else {
    //     console.log('hii', dc)
    // }
    
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
            {/* <ContentSubsection title="Drop Chance">
                <p>
                    Drop Chance info?
                </p>
                <br />
                <div className='pl-10'>
                    <ul>
                        {zoneHitList}
                    </ul>
                </div>
            </ContentSubsection> */}
        </Content>
    )
}