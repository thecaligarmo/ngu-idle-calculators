'use client'

import { ENERGY_NGUS, MAGIC_NGUS, NGU } from "@/assets/ngus";
import { ChoiceButton } from "@/components/buttons";
import Content from "@/components/content";
import ContentSubsection from "@/components/contentSubsection";
import { getNumberFormat } from "@/helpers/context";
import { bd, dn, pn} from "@/helpers/numbers";
import { createStatesForData, getRequiredStates } from "@/helpers/stateForData";
import { camelToTitle } from "@/helpers/strings";
import bigDecimal from "js-big-decimal";
import { useState } from "react";

const NGU_TARGET = 'target'
const NGU_PERCENTAGE = 'percentage'
const NGU_TIME = 'time'


export default function Page() {
    const [calcType, setCalcType] = useState(NGU_TARGET)
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired = [
        ['currentEnergyCap', 'totalEnergyNGUSpeedFactor%'],
        ['currentMagicCap', 'totalMagicNGUSpeedFactor%'],
        [
            'energyNGUAugmentsEvilLevel',
            'energyNGUWandoosEvilLevel',
            'energyNGURespawnEvilLevel',
            'energyNGUGoldEvilLevel',
            'energyNGUAdventureAEvilLevel',
            'energyNGUPowerAEvilLevel',
            'energyNGUDropChanceEvilLevel',
            'energyNGUMagicNGUEvilLevel',
            'energyNGUPPEvilLevel'
        ],[
            'magicNGUYggdrasilEvilLevel',
            'magicNGUExpEvilLevel',
            'magicNGUPowerBEvilLevel',
            'magicNGUNumberEvilLevel',
            'magicNGUTimeMachineEvilLevel',
            'magicNGUEnergyNGUEvilLevel',
            'magicNGUAdventureBEvilLevel'
        ],
        [
            'energyNGUAugmentsEvilTarget',
            'energyNGUWandoosEvilTarget',
            'energyNGURespawnEvilTarget',
            'energyNGUGoldEvilTarget',
            'energyNGUAdventureAEvilTarget',
            'energyNGUPowerAEvilTarget',
            'energyNGUDropChanceEvilTarget',
            'energyNGUMagicNGUEvilTarget',
            'energyNGUPPEvilTarget'
        ],[
            'magicNGUYggdrasilEvilTarget',
            'magicNGUExpEvilTarget',
            'magicNGUPowerBEvilTarget',
            'magicNGUNumberEvilTarget',
            'magicNGUTimeMachineEvilTarget',
            'magicNGUEnergyNGUEvilTarget',
            'magicNGUAdventureBEvilTarget'
        ]
    ]

    // Set extra required (not from playerData)
    var extraRequired = [
        // [],//['totalEnergyNGUSpeedFactor%'],
        // [],
        ['percentageIncrease%', 'timeInSeconds'], []
    ]
    const playerStates = createStatesForData(extraRequired);

    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates)
    var extraReq = getRequiredStates(extraRequired, playerStates)

    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        var x = playerStates[key][0]
        if (x instanceof bigDecimal) {
            return x
        }
        return bd(x)
    }
    
    // Setup our texts
    var energyText = [
        'energyNGUAugmentsEvil',
        'energyNGUWandoosEvil',
        'energyNGURespawnEvil',
        'energyNGUGoldEvil',
        'energyNGUAdventureAEvil',
        'energyNGUPowerAEvil',
        'energyNGUDropChanceEvil',
        'energyNGUMagicNGUEvil',
        'energyNGUPPEvil'
    ]
    var magicText = [
        'magicNGUYggdrasilEvil',
        'magicNGUExpEvil',
        'magicNGUPowerBEvil',
        'magicNGUNumberEvil',
        'magicNGUTimeMachineEvil',
        'magicNGUEnergyNGUEvil',
        'magicNGUAdventureBEvil',
    ]

    
    var eNGUs : NGU[] = energyText.map((txt, index) => {
        var engu = ENERGY_NGUS[index]
        engu.evilLevel = Number(v(txt + "Level").getValue())
        engu.evilTarget = Number(v(txt + "Target").getValue())
        return engu
    })

    var mNGUs : NGU[] = magicText.map((txt, index) => {
        var mngu = MAGIC_NGUS[index]
        mngu.evilLevel = Number(v(txt + "Level").getValue())
        mngu.evilTarget = Number(v(txt + "Target").getValue())
        return mngu
    })


    // shorthand for targets
    var energyTargets = eNGUs.map((ngu) => {
        return (calcType == NGU_PERCENTAGE) ? ngu.percentIncrease(v("percentageIncrease%")) : bd(ngu.evilTarget);
    })
    var magicTargets = mNGUs.map((ngu) => {
        return (calcType == NGU_PERCENTAGE) ? ngu.percentIncrease(v("percentageIncrease%")) : bd(ngu.evilTarget);
    })
    

    var energySeconds = eNGUs.map((engu) => {
        return engu.calcSecondsToTarget(v("currentEnergyCap"), v("totalEnergyNGUSpeedFactor%"))

    })
    var magicSeconds = mNGUs.map((mngu) => {
        return mngu.calcSecondsToTarget(v("currentMagicCap"), v("totalMagicNGUSpeedFactor%"))
    })

    var energyTotalSeconds = energySeconds.reduce((total, current) => {
        return total.add(current)
    }, bd(0))
    var magicTotalSeconds = magicSeconds.reduce((total, current) => {
        return total.add(current)
    }, bd(0))




    // Information retrieval
    // Information retrieval
    var energyRow = eNGUs.map(function(engu, index) {
        var txt = energyText[index]
        var targetLvl = energyTargets[index]
        var secs = energySeconds[index]
        var val = bd(engu.getStatValue(Number(targetLvl.getValue()), engu.statnames[0]))
        
        return (
            <tr key={txt} className={index %2 == 0 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                <td className="px-2">{camelToTitle(txt).replace("Energy NGU ", "")}</td>
                <td className="px-2"><span className="text-red-500">{dn(secs)}</span></td>
                <td className="px-2"><span className="text-blue-500">{pn(targetLvl, fmt)}</span></td>
                <td className="px-2">{pn(val, fmt)}%</td>
            </tr>
        )
    })
    var magicRow = mNGUs.map(function(mngu, index) {
        var txt = magicText[index]
        var targetLvl = magicTargets[index]
        var secs = magicSeconds[index]
        var val = bd(mngu.getStatValue(Number(targetLvl.getValue()), mngu.statnames[0]))
        return (
            <tr key={txt} className={index %2 == 0 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                <td className="px-2">{camelToTitle(txt).replace("Magic NGU ", "")}</td>
                <td className="px-2"><span className="text-red-500">{dn(secs)}</span></td>
                <td className="px-2"><span className="text-blue-500">{pn(targetLvl, fmt)}</span></td>
                <td className="px-2">{pn(val, fmt)}%</td>
            </tr>
        )
    })

    var energyCapToMaxTargetRow = eNGUs.map(function(engu, index) {
        var cap = engu.capToReachMaxTarget(v("totalEnergyNGUSpeedFactor%"))
        var txt = energyText[index];
        var targetLvl = energyTargets[index];
        return (
            <tr key={txt} className={index %2 == 0 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                <td className="px-2">{camelToTitle(txt).replace("Energy NGU ", "")}</td>
                <td className="px-2"><span className="text-red-500">{pn(cap, fmt)}</span></td>
                <td className="px-2"><span className="text-blue-500">{pn(targetLvl, fmt)}</span></td>
            </tr>
        )
    })
    var magicCapToMaxTargetRow = mNGUs.map(function(mngu, index) {
        var cap = mngu.capToReachMaxTarget(v("totalMagicNGUSpeedFactor%"));
        var txt = magicText[index];
        var targetLvl = magicTargets[index];
        return (
            <tr key={txt} className={index %2 == 0 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                <td className="px-2">{camelToTitle(txt).replace("Magic NGU ", "")}</td>
                <td className="px-2"><span className="text-red-500">{pn(cap, fmt)}</span></td>
                <td className="px-2"><span className="text-blue-500">{pn(targetLvl, fmt)}</span></td>
            </tr>
        )
    })
    var energyCapToMaxInDayRow = eNGUs.map(function(engu, index) {
        var cap = engu.capToReachMaxInDay(v("totalEnergyNGUSpeedFactor%"))
        var txt = energyText[index];
        return (
            <tr key={txt} className={index %2 == 0 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                <td className="px-2">{camelToTitle(txt).replace("Energy NGU ", "")}</td>
                <td className="px-2"><span className="text-red-500">{pn(cap, fmt)}</span></td>
            </tr>
        )
    })
    var magicCapToMaxInDayRow = mNGUs.map(function(mngu, index) {
        var cap = mngu.capToReachMaxInDay(v("totalMagicNGUSpeedFactor%"))
        var txt = magicText[index];
        return (
            <tr key={txt} className={index %2 == 0 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                <td className="px-2">{camelToTitle(txt).replace("Magic NGU ", "")}</td>
                <td className="px-2"><span className="text-red-500">{pn(cap, fmt)}</span></td>
            </tr>
        )
    })

    if(calcType == NGU_TARGET) {
        extraReq.pop()
        extraReq.pop()
    } else {
        infoReq.pop()
        infoReq.pop()
        if (calcType != NGU_PERCENTAGE) {
            extraReq[2].shift()
        }
        if (calcType != NGU_TIME) {
            extraReq[2].pop()
        }
    }

    
    var topButtons = (
        <>
            <p>How would you like to calculate NGUs?</p>
            <ChoiceButton text="Using Targets" onClick={() => setCalcType(NGU_TARGET)} active={calcType==NGU_TARGET} />
            <ChoiceButton text="Using Percentage of bonus" onClick={() => setCalcType(NGU_PERCENTAGE)}  active={calcType==NGU_PERCENTAGE} />
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
                <table className="inline-block w-1/2 align-top mb-2">
                    <thead>
                        <tr className="text-left border-b-1 border border-t-0 border-x-0">
                            <th className="px-2">Energy NGU</th>
                            <th className="px-2">Time</th>
                            <th className="px-2">Target</th>
                            <th className="px-2">Value at target</th>
                        </tr>
                    </thead>
                    <tbody>
                        {energyRow}
                        <tr key="total" className="text-left border-t-1 border border-b-0 border-x-0">
                            <th className="px-2">Total:</th>
                            <th className="px-2"><span className="text-red-500">{dn(energyTotalSeconds)}</span></th>
                            <th className="px-2"></th>
                            <th className="px-2"></th>
                        </tr>
                    </tbody>
                </table>
                <table className="inline-block w-1/2 align-top mb-2">
                    <thead>
                        <tr className="text-left border-b-1 border border-t-0 border-x-0">
                            <th className="px-2">Magic NGU</th>
                            <th className="px-2">Time</th>
                            <th className="px-2">Target</th>
                            <th className="px-2">Value at target</th>
                        </tr>
                    </thead>
                    <tbody>
                        {magicRow}
                    
                        <tr key="total" className="text-left border-t-1 border border-b-0 border-x-0">
                            <th className="px-2">Total:</th>
                            <th className="px-2"><span className="text-red-500">{dn(magicTotalSeconds)}</span></th>
                            <th className="px-2"></th>
                            <th className="px-2"></th>
                        </tr>
                    </tbody>
                </table>
                <p className="mb-2 text-sm">
                    The time formats are given in D:H:M:S where D stands for days, H for hours, M for minutes, S for seconds. For example: 2:04:16:12 means it will take 2 days, 4 hours, 16 minutes and 12 seconds.
                </p>

            </ContentSubsection>
            <ContentSubsection title="How much energy/magic is needed to cap/max the bar at target level?">
                <p>
                    The following tells you how much energy or magic you will need to <span className="text-red-500">Cap</span> the bar at the <span className="text-blue-500">Target</span>.
                </p>
                <table className="inline-block w-1/2 align-top mb-2">
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
                <table className="inline-block w-1/2 align-top mb-2">
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
                <table className="inline-block w-1/2 align-top mb-2">
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
                <table className="inline-block w-1/2 align-top mb-2">
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

