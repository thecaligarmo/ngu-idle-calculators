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
        return (calcType == NGU_PERCENTAGE) ? ngu.percentIncrease(v("percentageIncrease%")) : bd(ngu.target);
    })
    var magicTargets = mNGUs.map((ngu) => {
        return (calcType == NGU_PERCENTAGE) ? ngu.percentIncrease(v("percentageIncrease%")) : bd(ngu.target);
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
    var energyLi = energySeconds.map(function(secs, index) {
        var txt = energyText[index]
        var targetLvl = energyTargets[index]
        return (
        <li key={txt}>
            {camelToTitle(txt)}: <span className="text-red-500">{dn(secs)}</span> until level <span className="text-blue-500">{pn(targetLvl, fmt)}</span>
        </li>
        )
    })
    var magicLi = magicSeconds.map(function(secs, index) {
        var txt = magicText[index]
        var targetLvl = magicTargets[index]
        return (
            <li key={txt}>
                {camelToTitle(txt)}: <span className="text-red-500">{dn(secs)}</span> until level <span className="text-blue-500">{pn(targetLvl, fmt)}</span>
            </li>
            )
    })
    var energyCapToMaxTargetLi = eNGUs.map(function(engu, index) {
        var cap = engu.capToReachMaxTarget(v("totalEnergyNGUSpeedFactor%"))
        var txt = energyText[index];
        var targetLvl = energyTargets[index];
        return (
            <li key={txt}>
                {camelToTitle(txt)}: <span className="text-red-500">{pn(cap, fmt)}</span> cap at level <span className="text-blue-500">{pn(targetLvl, fmt)}</span>
            </li>
        )
    })
    var magicCapToMaxTargetLi = mNGUs.map(function(mngu, index) {
        var cap = mngu.capToReachMaxTarget(v("totalMagicNGUSpeedFactor%"));
        var txt = magicText[index];
        var targetLvl = magicTargets[index];
        return (
            <li key={txt}>
                {camelToTitle(txt)}: <span className="text-red-500">{pn(cap, fmt)}</span> until level <span className="text-blue-500">{pn(targetLvl, fmt)}</span>
            </li>
        )
    })
    var energyCapToMaxInDayLi = eNGUs.map(function(engu, index) {
        var cap = engu.capToReachMaxInDay(v("totalEnergyNGUSpeedFactor%"))
        var txt = energyText[index];
        return <li key={txt}>{camelToTitle(txt)}: <span className="text-red-500">{pn(cap, fmt)}</span></li>
    })
    var magicCapToMaxInDayLi = mNGUs.map(function(mngu, index) {
        var cap = mngu.capToReachMaxInDay(v("totalMagicNGUSpeedFactor%"))
        var txt = magicText[index];
        return <li key={txt}>{camelToTitle(txt)}: <span className="text-red-500">{pn(cap, fmt)}</span></li>
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
            <ChoiceButton text="Using Percentage" onClick={() => setCalcType(NGU_PERCENTAGE)}  active={calcType==NGU_PERCENTAGE} />
            {/* <ChoiceButton text="Using Time" onClick={() => setCalcType(NGU_TIME)} /> */}
        </>
    )
        

    return (
        <Content prechildren={topButtons} title="NGUs - Evil" infoRequired={infoReq} extraRequired={extraReq}>
            <ContentSubsection title="How long until I reach targets?">
                <ul className="inline-block w-1/2 align-top mb-2">
                    {energyLi}
                    <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{dn(energyTotalSeconds)}</span></li>
                </ul>
                <ul className="inline-block w-1/2 align-top mb-2">
                    {magicLi}
                    <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{dn(magicTotalSeconds)}</span></li>
                </ul>

                <p className="mb-2 text-sm">
                    The time formats are given in D:H:M:S where D stands for days, H for hours, M for minutes, S for seconds. For example: 2:04:16:12 means it will take 2 days, 4 hours, 16 minutes and 12 seconds.
                </p>
            </ContentSubsection>
            <ContentSubsection title="How much energy is needed to cap/max the bar at target level?">
                <ul className="inline-block w-1/2 align-top mb-2">
                    {energyCapToMaxTargetLi}
                </ul>
                <ul className="inline-block w-1/2 align-top mb-2">
                    {magicCapToMaxTargetLi}
                </ul>
            </ContentSubsection>
            <ContentSubsection title="How much energy is needed to cap/max the bar for 24 hours non-stop?">
                <ul className="inline-block w-1/2 align-top mb-2">
                    {energyCapToMaxInDayLi}
                </ul>
                <ul className="inline-block w-1/2 align-top mb-2">
                    {magicCapToMaxInDayLi}
                </ul>
            </ContentSubsection>
        </Content>
    )
}

