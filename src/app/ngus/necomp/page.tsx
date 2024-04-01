'use client'

import { ENERGY_NGUS, MAGIC_NGUS, NGU } from "@/assets/ngus";
import Content from "@/components/content";
import ContentSubsection from "@/components/contentSubsection";
import { getNumberFormat } from "@/helpers/context";
import { bd, dn, pn} from "@/helpers/numbers";
import { createStatesForData, getRequiredStates } from "@/helpers/stateForData";
import { camelToTitle } from "@/helpers/strings";
import bigDecimal from "js-big-decimal";

export default function Page() {
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
        ]
    ]

    // Set extra required (not from playerData)
    var extraRequired = [
        ['percentageIncrease%'], []
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
        'energyNGUAugments',
        'energyNGUWandoos',
        'energyNGURespawn',
        'energyNGUGold',
        'energyNGUAdventureA',
        'energyNGUPowerA',
        'energyNGUDropChance',
        'energyNGUMagicNGU',
        'energyNGUPP'
    ]
    var magicText = [
        'magicNGUYggdrasil',
        'magicNGUExp',
        'magicNGUPowerB',
        'magicNGUNumber',
        'magicNGUTimeMachine',
        'magicNGUEnergyNGU',
        'magicNGUAdventureB',
    ]


    var eNGUs : NGU[] = energyText.map((txt, index) => {
        var engu = ENERGY_NGUS[index]
        engu.setLevel(Number(v(txt + "Level").getValue()))
        engu.target = Number(v(txt + "Target").getValue())
        engu.evilLevel = Number(v(txt + "Level").getValue())
        engu.evilTarget = Number(v(txt + "Target").getValue())
        return engu
    })

    var mNGUs : NGU[] = magicText.map((txt, index) => {
        var mngu = MAGIC_NGUS[index]
        mngu.setLevel(Number(v(txt + "Level").getValue()))
        mngu.target = Number(v(txt + "Target").getValue())
        mngu.evilLevel = Number(v(txt + "Level").getValue())
        mngu.evilTarget = Number(v(txt + "Target").getValue())
        return mngu
    })


    // shorthand for targets
    var energyTargets = eNGUs.map((ngu: NGU) => {
        return ngu.percentIncrease(v("percentageIncrease%"))
    })
    var magicTargets = mNGUs.map((ngu : NGU) => {
        return ngu.percentIncrease(v("percentageIncrease%"))
    })
    var energyEvilTargets = eNGUs.map((ngu: NGU) => {
        return ngu.percentIncrease(v("percentageIncrease%"))
    })
    var magicEvilTargets = mNGUs.map((ngu : NGU) => {
        return ngu.percentIncrease(v("percentageIncrease%"))
    })
    

    
    var energySeconds = eNGUs.map((engu) => {
        return engu.calcSecondsToTarget(v("currentEnergyCap"), v("totalEnergyNGUSpeedFactor%"))

    })
    var magicSeconds = mNGUs.map((mngu) => {
        return mngu.calcSecondsToTarget(v("currentMagicCap"), v("totalMagicNGUSpeedFactor%"))
    })

    var energyEvilSeconds = eNGUs.map((engu) => {
        return engu.calcSecondsToTarget(v("currentEnergyCap"), v("totalEnergyNGUSpeedFactor%"))

    })
    var magicEvilSeconds = mNGUs.map((mngu) => {
        return mngu.calcSecondsToTarget(v("currentMagicCap"), v("totalMagicNGUSpeedFactor%"))
    })






    // Information retrieval
    var energyRows = energySeconds.map(function(secs, index) {
        var txt = energyText[index]
        var targetLvl = energyTargets[index]
        var targetEvilLvl = energyEvilTargets[index]
        var evilSecs = energyEvilSeconds[index]
        var normalFaster = (secs < evilSecs)
        var percDiff = (normalFaster ? (secs.divide(evilSecs)) : (evilSecs.divide(secs))).round(2)
        return (
            <></>
        // <tr>
        //     <td>{camelToTitle(txt)}</td>
        //     <td>{pn(targetLvl, fmt)}</td>
        //     <td>{dn(secs)}</td>
        //     <td>{normalFaster ? "<--- " + percDiff + "%" : percDiff + "% --->"}</td>
        //     <td>{dn(evilSecs)}</td>
        //     <td>{pn(targetEvilLvl, fmt)}</td>
        //     <td>{camelToTitle(txt)}</td>
        // </tr>
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




        

    return (
        <Content title="NGUs - Normal vs Evil Percentual Comparison" infoRequired={infoReq} extraRequired={extraReq}>
            <ContentSubsection title="Energy - Which is faster?">
                <table>
                    <thead>
                        <tr>
                            <th>Normal NGU</th>
                            <th>Target Level</th>
                            <th>Time</th>
                            <th>Which is faster?</th>
                            <th>Time</th>
                            <th>Target Level</th>
                            <th>Evil NGU</th>
                        </tr>
                    </thead>
                    <tbody>
                        {energyRows}
                    </tbody>
                </table>
            </ContentSubsection>
            <p className="mb-2 text-sm">
                The time formats are given in D:H:M:S where D stands for days, H for hours, M for minutes, S for seconds. For example: 2:04:16:12 means it will take 2 days, 4 hours, 16 minutes and 12 seconds.
            </p>
        </Content>
    )
}

