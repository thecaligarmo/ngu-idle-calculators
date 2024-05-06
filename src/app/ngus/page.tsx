'use client'

import { GameMode } from "@/assets/mode";
import { ENERGY_NGUS, MAGIC_NGUS, NGU } from "@/assets/ngus";
import { ChoiceButton } from "@/components/buttons";
import Content from "@/components/content";
import ContentSubsection from "@/components/contentSubsection";
import { getNumberFormat } from "@/components/context";
import { disableItem } from "@/components/dataListColumns";
import { bd, dn, pn} from "@/helpers/numbers";
import { parseNum } from "@/helpers/parsers";
import { createStatesForData, getRequiredStates } from "@/helpers/stateForData";
import bigDecimal from "js-big-decimal";
import { useState } from "react";

const NGU_TARGET = 'target'
const NGU_PERCENTAGE = 'percentage'
const NGU_TIME = 'time'
const NGU_VALUE = 'value'


export default function Page() {
    const [calcType, setCalcType] = useState(NGU_TARGET)
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired = [
        ['currentEnergyCap', 'totalEnergyNGUSpeedFactor%'],
        ['currentMagicCap', 'totalMagicNGUSpeedFactor%'],
        [
            'energyNGUAugmentsLevel',
            'energyNGUWandoosLevel',
            'energyNGURespawnLevel',
            'energyNGUGoldLevel',
            'energyNGUAdventureALevel',
            'energyNGUPowerALevel',
            'energyNGUDropChanceLevel',
            'energyNGUMagicNGULevel',
            'energyNGUPPLevel'
        ],[
            'magicNGUYggdrasilLevel',
            'magicNGUExpLevel',
            'magicNGUPowerBLevel',
            'magicNGUNumberLevel',
            'magicNGUTimeMachineLevel',
            'magicNGUEnergyNGULevel',
            'magicNGUAdventureBLevel'
        ],
        [
            'energyNGUAugmentsTarget',
            'energyNGUWandoosTarget',
            'energyNGURespawnTarget',
            'energyNGUGoldTarget',
            'energyNGUAdventureATarget',
            'energyNGUPowerATarget',
            'energyNGUDropChanceTarget',
            'energyNGUMagicNGUTarget',
            'energyNGUPPTarget'
        ],[
            'magicNGUYggdrasilTarget',
            'magicNGUExpTarget',
            'magicNGUPowerBTarget',
            'magicNGUNumberTarget',
            'magicNGUTimeMachineTarget',
            'magicNGUEnergyNGUTarget',
            'magicNGUAdventureBTarget'
        ]
    ]

    // Set extra required (not from playerData)
    var extraRequired = [
        ['percentageIncrease%', 'timeInSeconds'], [],
        [
            'energyNGUAugmentsValue',
            'energyNGUWandoosValue',
            'energyNGURespawnValue',
            'energyNGUGoldValue',
            'energyNGUAdventureAValue',
            'energyNGUPowerAValue',
            'energyNGUDropChanceValue',
            'energyNGUMagicNGUValue',
            'energyNGUPPValue'
        ],[
            'magicNGUYggdrasilValue',
            'magicNGUExpValue',
            'magicNGUPowerBValue',
            'magicNGUNumberValue',
            'magicNGUTimeMachineValue',
            'magicNGUEnergyNGUValue',
            'magicNGUAdventureBValue'
        ]
    ]
    const playerStates = createStatesForData(extraRequired);

    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates, {
        'energyNGUAugmentsLevel': 'Augments Level',
        'energyNGUWandoosLevel': 'Wandoos Level',
        'energyNGURespawnLevel': 'Respawn Level',
        'energyNGUGoldLevel': 'Gold Level',
        'energyNGUAdventureALevel': 'Adventure α Level',
        'energyNGUPowerALevel': 'Power α Level',
        'energyNGUDropChanceLevel': 'Drop Chance Level',
        'energyNGUMagicNGULevel': 'Magic NGU Level',
        'energyNGUPPLevel': 'PP Level',
        'magicNGUYggdrasilLevel': 'Yggdrasil Level',
        'magicNGUExpLevel': 'Exp Level',
        'magicNGUPowerBLevel': 'Power β Level',
        'magicNGUNumberLevel': 'Number Level',
        'magicNGUTimeMachineLevel': 'Time Machine Level',
        'magicNGUEnergyNGULevel': 'Energy NGU Level',
        'magicNGUAdventureBLevel': 'Adventure β Level',
        'energyNGUAugmentsTarget': 'Augments Target',
        'energyNGUWandoosTarget': 'Wandoos Target',
        'energyNGURespawnTarget': 'Respawn Target',
        'energyNGUGoldTarget': 'Gold Target',
        'energyNGUAdventureATarget': 'Adventure α Target',
        'energyNGUPowerATarget': 'Power α Target',
        'energyNGUDropChanceTarget': 'Drop Chance Target',
        'energyNGUMagicNGUTarget': 'Magic NGU Target',
        'energyNGUPPTarget': 'PP Target',
        'magicNGUYggdrasilTarget': 'Yggdrasil Target',
        'magicNGUExpTarget': 'Exp Target',
        'magicNGUPowerBTarget': 'Power β Target',
        'magicNGUNumberTarget': 'Number Target',
        'magicNGUTimeMachineTarget': 'Time Machine Target',
        'magicNGUEnergyNGUTarget': 'Energy NGU Target',
        'magicNGUAdventureBTarget': 'Adventure β Target',
    })
    var extraReq = getRequiredStates(extraRequired, playerStates, {
        'energyNGUAugmentsValue': 'Augments Value',
        'energyNGUWandoosValue': 'Wandoos Value',
        'energyNGURespawnValue': 'Respawn Value',
        'energyNGUGoldValue': 'Gold Value',
        'energyNGUAdventureAValue': 'Adventure α Value',
        'energyNGUPowerAValue': 'Power α Value',
        'energyNGUDropChanceValue': 'Drop Chance Value',
        'energyNGUMagicNGUValue': 'Magic NGU Value',
        'energyNGUPPValue': 'PP Value',
        'magicNGUYggdrasilValue': 'Yggdrasil Value',
        'magicNGUExpValue': 'Exp Value',
        'magicNGUPowerBValue': 'Power β Value',
        'magicNGUNumberValue': 'Number Value',
        'magicNGUTimeMachineValue': 'Time Machine Value',
        'magicNGUEnergyNGUValue': 'Energy NGU Value',
        'magicNGUAdventureBValue': 'Adventure β Value',
    })

    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        return parseNum(playerStates, key)
    }
    

    var types = ['energy', 'magic']
    var NGUs : NGU[][] = types.map((ty) => {
        var ngus = (ty === 'energy') ? ENERGY_NGUS : MAGIC_NGUS
        var nguIds = (ty === 'energy') ? ENERGY_NGUS.ids : MAGIC_NGUS.ids

        var retNgus = []
        for(var nguId of nguIds) {
            
            var ngu : NGU = ngus[nguId]
            if(ngu.mode == GameMode.NORMAL) {
                ngu.setLevel(Number(v(ty + ngu.key + "Level").getValue()))
                ngu.target = Number(v(ty + ngu.key + "Target").getValue())
                retNgus.push(ngu)
            }
        }
        return retNgus
    })


    var targets = NGUs.map((tyNGUs, index) => {
        var ty = types[index]
        return tyNGUs.map((ngu) => {
            switch(calcType) {
                case NGU_PERCENTAGE:
                    return ngu.percentIncrease(v("percentageIncrease%"))
                case NGU_VALUE:
                    return ngu.valueIncrease(v(ty + ngu.key + "Value"))
                default: 
                    return bd(ngu.target);
            }
        })
    })

    var seconds = NGUs.map((tyNGUs, index) => {
        var ty = types[index]
        ty = ty[0].toUpperCase() + ty.substring(1)
        return tyNGUs.map((ngu, innerIndex) => {
            return ngu.calcSecondsToTarget(v("current" + ty + "Cap"), v("total" + ty + "NGUSpeedFactor%"), targets[index][innerIndex])
        })
    })

    var totalSeconds = seconds.map((secs, index) => {
        return secs.reduce((total, current) => {
            return total.add(current)
        }, bd(0))
    })


    // Information retrieval
    var infoRow = NGUs.map((tyNGUs, index) => {
        var ty = types[index]
        ty = ty[0].toUpperCase() + ty.substring(1)
        return tyNGUs.map(function(ngu, innerIndex) {
            var targetLvl = targets[index][innerIndex]
            var secs = seconds[index][innerIndex]
            var val = bd(ngu.getStatValue(Number(targetLvl.getValue()), ngu.statnames[0]))
            var curVal = bd(ngu.getStatValue(Number(ngu.level), ngu.statnames[0]))
    
            var precision = 0;
            if (ngu.key == 'NGUWandoos' || ngu.key == 'NGUAdventureA' || ngu.key == 'NGUDropChance' || ngu.key == 'NGUMagicNGU'
                || ngu.key == 'NGUYggdrasil' || ngu.key == 'NGUTimeMachine' || ngu.key == 'NGUEnergyNGU'
            ) {
                precision = 1;
            }
            if (ngu.key == 'NGURespawn' || ngu.key == 'NGUPP'
                || ngu.key == 'NGUExp' || ngu.key == 'NGUAdventureB'
            ) {
                precision = 2;
            }

            
            return (
                <tr key={ngu.key} className={innerIndex % 2 == 0 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                    <td className="px-2">{ngu.name}</td>
                    <td className="px-2 text-right"><span className="text-red-500">{dn(secs)}</span></td>
                    <td className="px-2"><span className="text-blue-500">{pn(targetLvl, fmt)}</span></td>
                    <td className="px-2">{pn(curVal, fmt, precision)}%</td>
                    <td className="px-2 text-green-500">{targetLvl.compareTo(bd(0)) <= 0 ? '-' : " x " + pn(val.divide(curVal), fmt, 2 ) + " = "}</td>
                    <td className="px-2">{targetLvl.compareTo(bd(0)) <= 0 ? '-' : pn(val, fmt, precision) + "%"}</td>
                </tr>
            )
        })
    })
    var energyRow = infoRow[0]
    var magicRow = infoRow[1]

    var capToMaxTargetsRow = NGUs.map((tyNGUs, index) => {
        var ty = types[index]
        ty = ty[0].toUpperCase() + ty.substring(1)
        return tyNGUs.map(function(ngu, innerIndex) {
            var cap = ngu.capToReachMaxTarget(v("total" + ty + "NGUSpeedFactor%"))
            
            var targetLvl = targets[index][innerIndex];
            return (
                <tr key={ngu.key} className={innerIndex %2 == 0 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                    <td className="px-2">{ngu.name}</td>
                    <td className="px-2"><span className="text-red-500">{pn(cap, fmt)}</span></td>
                    <td className="px-2"><span className="text-blue-500">{pn(targetLvl, fmt)}</span></td>
                </tr>
            )
        })
    })
    var energyCapToMaxTargetRow = capToMaxTargetsRow[0];
    var magicCapToMaxTargetRow = capToMaxTargetsRow[1];


    var capToMaxInDayRow = NGUs.map((tyNGUs, index) => {
        var ty = types[index]
        ty = ty[0].toUpperCase() + ty.substring(1)
        return tyNGUs.map(function(ngu, innerIndex) {
            var cap = ngu.capToReachMaxInDay(v("total" + ty + "NGUSpeedFactor%"))
            
            return (
                <tr key={ngu.key} className={innerIndex %2 == 0 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                    <td className="px-2">{ngu.name}</td>
                    <td className="px-2"><span className="text-red-500">{pn(cap, fmt)}</span></td>
                </tr>
            )
        })
    })
    var energyCapToMaxInDayRow = capToMaxInDayRow[0];
    var magicCapToMaxInDayRow = capToMaxInDayRow[1];



    switch (calcType) {
        case NGU_TARGET:
            extraReq = disableItem(extraReq, ['percentageIncrease%', 'timeInSeconds']);
            extraReq = disableItem(extraReq, [
                'energyNGUAugmentsValue',
                'energyNGUWandoosValue',
                'energyNGURespawnValue',
                'energyNGUGoldValue',
                'energyNGUAdventureAValue',
                'energyNGUPowerAValue',
                'energyNGUDropChanceValue',
                'energyNGUMagicNGUValue',
                'energyNGUPPValue',
                'magicNGUYggdrasilValue',
                'magicNGUExpValue',
                'magicNGUPowerBValue',
                'magicNGUNumberValue',
                'magicNGUTimeMachineValue',
                'magicNGUEnergyNGUValue',
                'magicNGUAdventureBValue'
            ])
            break;
        case NGU_VALUE:
            extraReq = disableItem(extraReq, ['percentageIncrease%', 'timeInSeconds']);
            infoReq = disableItem(infoReq, [
                'energyNGUAugmentsTarget',
                'energyNGUWandoosTarget',
                'energyNGURespawnTarget',
                'energyNGUGoldTarget',
                'energyNGUAdventureATarget',
                'energyNGUPowerATarget',
                'energyNGUDropChanceTarget',
                'energyNGUMagicNGUTarget',
                'energyNGUPPTarget',
                'magicNGUYggdrasilTarget',
                'magicNGUExpTarget',
                'magicNGUPowerBTarget',
                'magicNGUNumberTarget',
                'magicNGUTimeMachineTarget',
                'magicNGUEnergyNGUTarget',
                'magicNGUAdventureBTarget'
            ])
            break;
        case NGU_PERCENTAGE:
            extraReq = disableItem(extraReq, ['timeInSeconds']);
            extraReq = disableItem(extraReq, [
                'energyNGUAugmentsValue',
                'energyNGUWandoosValue',
                'energyNGURespawnValue',
                'energyNGUGoldValue',
                'energyNGUAdventureAValue',
                'energyNGUPowerAValue',
                'energyNGUDropChanceValue',
                'energyNGUMagicNGUValue',
                'energyNGUPPValue',
                'magicNGUYggdrasilValue',
                'magicNGUExpValue',
                'magicNGUPowerBValue',
                'magicNGUNumberValue',
                'magicNGUTimeMachineValue',
                'magicNGUEnergyNGUValue',
                'magicNGUAdventureBValue'
            ])
            infoReq = disableItem(infoReq, [
                'energyNGUAugmentsTarget',
                'energyNGUWandoosTarget',
                'energyNGURespawnTarget',
                'energyNGUGoldTarget',
                'energyNGUAdventureATarget',
                'energyNGUPowerATarget',
                'energyNGUDropChanceTarget',
                'energyNGUMagicNGUTarget',
                'energyNGUPPTarget',
                'magicNGUYggdrasilTarget',
                'magicNGUExpTarget',
                'magicNGUPowerBTarget',
                'magicNGUNumberTarget',
                'magicNGUTimeMachineTarget',
                'magicNGUEnergyNGUTarget',
                'magicNGUAdventureBTarget'
            ])
            break;
        case NGU_TIME:
            extraReq = disableItem(extraReq, ['percentageIncrease%']);
            extraReq = disableItem(extraReq, [
                'energyNGUAugmentsValue',
                'energyNGUWandoosValue',
                'energyNGURespawnValue',
                'energyNGUGoldValue',
                'energyNGUAdventureAValue',
                'energyNGUPowerAValue',
                'energyNGUDropChanceValue',
                'energyNGUMagicNGUValue',
                'energyNGUPPValue',
                'magicNGUYggdrasilValue',
                'magicNGUExpValue',
                'magicNGUPowerBValue',
                'magicNGUNumberValue',
                'magicNGUTimeMachineValue',
                'magicNGUEnergyNGUValue',
                'magicNGUAdventureBValue'
            ])
            infoReq = disableItem(infoReq, [
                'energyNGUAugmentsTarget',
                'energyNGUWandoosTarget',
                'energyNGURespawnTarget',
                'energyNGUGoldTarget',
                'energyNGUAdventureATarget',
                'energyNGUPowerATarget',
                'energyNGUDropChanceTarget',
                'energyNGUMagicNGUTarget',
                'energyNGUPPTarget',
                'magicNGUYggdrasilTarget',
                'magicNGUExpTarget',
                'magicNGUPowerBTarget',
                'magicNGUNumberTarget',
                'magicNGUTimeMachineTarget',
                'magicNGUEnergyNGUTarget',
                'magicNGUAdventureBTarget'
            ])
            break;

    }
    
    var topButtons = (
        <>
            <p>How would you like to calculate NGUs?</p>
            <ChoiceButton text="Using Targets" onClick={() => setCalcType(NGU_TARGET)} active={calcType==NGU_TARGET} />
            <ChoiceButton text="Using Percentage of Current Value" onClick={() => setCalcType(NGU_PERCENTAGE)}  active={calcType==NGU_PERCENTAGE} />
            <ChoiceButton text="Using Certain Value" onClick={() => setCalcType(NGU_VALUE)}  active={calcType==NGU_VALUE} />
            {/* <ChoiceButton text="Using Time" onClick={() => setCalcType(NGU_TIME)} /> */}
        </>
    )
        

    return (
        <Content prechildren={topButtons} title="NGUs - Normal" infoRequired={infoReq} extraRequired={extraReq}>
            <ContentSubsection title="How long until I reach targets?">
                <p>
                    The following tables let you know how much <span className="text-red-500">Time</span> is needed until you get to the <span className="text-blue-500">Target</span>.
                    The Value represents the bonus you will have once you reach the target.
                </p>
                {/* <div className="flex flex-wrap"> */}
                <table className="inline-block w-full align-top mb-2">
                    <thead>
                        <tr className="text-left border-b-1 border border-t-0 border-x-0">
                            <th className="px-2">Energy NGU</th>
                            <th className="px-2">Time</th>
                            <th className="px-2">Target</th>
                            <th className="px-2">Current Value</th>
                            <th className="px-2">Increase Amount</th>
                            <th className="px-2">Value at target</th>
                        </tr>
                    </thead>
                    <tbody>
                        {energyRow}
                        <tr key="total" className="text-left border-t-1 border border-b-0 border-x-0">
                            <th className="px-2">Total:</th>
                            <th className="px-2"><span className="text-red-500">{dn(totalSeconds[0])}</span></th>
                            <th className="px-2"></th>
                            <th className="px-2"></th>
                            <th className="px-2"></th>
                            <th className="px-2"></th>
                        </tr>
                    </tbody>
                </table>
                <table className="inline-block w-full align-top mb-2">
                    <thead>
                        <tr className="text-left border-b-1 border border-t-0 border-x-0">
                            <th className="px-2">Magic NGU</th>
                            <th className="px-2">Time</th>
                            <th className="px-2">Target</th>
                            <th className="px-2">Current Value</th>
                            <th className="px-2">Increase Amount</th>
                            <th className="px-2">Value at target</th>
                        </tr>
                    </thead>
                    <tbody>
                        {magicRow}
                    
                        <tr key="total" className="text-left border-t-1 border border-b-0 border-x-0">
                            <th className="px-2">Total:</th>
                            <th className="px-2"><span className="text-red-500">{dn(totalSeconds[1])}</span></th>
                            <th className="px-2"></th>
                            <th className="px-2"></th>
                            <th className="px-2"></th>
                            <th className="px-2"></th>
                        </tr>
                    </tbody>
                </table>
                {/* </div> */}
                <p className="mb-2 text-sm">
                    The time formats are given in D:H:M:S where D stands for days, H for hours, M for minutes, S for seconds. For example: 2:04:16:12 means it will take 2 days, 4 hours, 16 minutes and 12 seconds.
                </p>

            </ContentSubsection>
            <ContentSubsection title="How much energy/magic is needed to cap/max the bar at target level?">
                <p>
                    The following tells you how much energy or magic you will need to <span className="text-red-500">Cap</span> the bar at the <span className="text-blue-500">Target</span>.
                </p>
                <table className="inline-block w-full md:w-1/2 align-top mb-2">
                    <thead>
                        <tr className="text-left border-b-1 border border-t-0 border-x-0">
                            <th className="px-2">Energy NGU</th>
                            <th className="px-2">Cap</th>
                            <th className="px-2">Target</th>
                        </tr>
                    </thead>
                    <tbody>
                        {energyCapToMaxTargetRow}
                    </tbody>
                </table>
                <table className="inline-block w-full md:w-1/2 align-top mb-2">
                    <thead>
                        <tr className="text-left border-b-1 border border-t-0 border-x-0">
                            <th className="px-2">Magic NGU</th>
                            <th className="px-2">Cap</th>
                            <th className="px-2">Target</th>
                        </tr>
                    </thead>
                    <tbody>
                        {magicCapToMaxTargetRow}
                    </tbody>
                </table>
            </ContentSubsection>
            <ContentSubsection title="How much energy is needed to cap/max the bar for 24 hours non-stop?">
                <p>
                    The following tells you how much energy or magic you will need to <span className="text-red-500">Cap</span> the bar for a continuous 24 hours.
                </p>
                <table className="inline-block w-full md:w-1/2 align-top mb-2">
                    <thead>
                        <tr className="text-left border-b-1 border border-t-0 border-x-0">
                            <th className="px-2">Energy NGU</th>
                            <th className="px-2">Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {energyCapToMaxInDayRow}
                    </tbody>
                </table>
                <table className="inline-block w-full md:w-1/2 align-top mb-2">
                    <thead>
                        <tr className="text-left border-b-1 border border-t-0 border-x-0">
                            <th className="px-2">Magic NGU</th>
                            <th className="px-2">Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {magicCapToMaxInDayRow}
                    </tbody>
                </table>
            </ContentSubsection>
        </Content>
    )
}

