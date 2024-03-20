'use client'

import { ChoiceButton } from "@/components/buttons";
import Content from "@/components/content";
import { getPlayerData } from "@/helpers/context";
import { bd, bigdec_min, dn, pn} from "@/helpers/numbers";
import createStatesForData from "@/helpers/stateForData";
import { camelToTitle } from "@/helpers/strings";
import bigDecimal from "js-big-decimal";
import { useState } from "react";

const NGU_TARGET = 'target'
const NGU_PERCENTAGE = 'percentage'
const NGU_TIME = 'time'

function calcSeconds(cap, speedFactor, base, level, target) {
    // Grab base amount of time things will take
    try {
        var baseTime = base.divide(cap).divide(speedFactor).multiply(bd(100))
    } catch (error) {
        var baseTime = bd(0)
    }
    
    // Grab the starting time and the ending time
    var startingSpeed = baseTime.multiply(level.add(bd(1))).round(2)
    var endingSpeed = baseTime.multiply(target).round(2)

    // Grab the number of levels that will be calculated with starting, middle (average) and end times
    try {
        var startingSpeedLevels = bigdec_min(startingSpeed.divide(baseTime), target).subtract(level).floor()
        var x = endingSpeed.subtract(bd(0.01)).divide(baseTime).subtract(level).subtract(startingSpeedLevels).floor()
        var middleSpeedLevels = x.compareTo(bd(0)) == -1 ? bd(0) : x;
        x = bigdec_min(endingSpeed.divide(baseTime), target).subtract(level).subtract(startingSpeedLevels).subtract(middleSpeedLevels).floor()
        var endingSpeedLevels = x.compareTo(bd(0)) == -1 ? bd(0) : x;
    } catch(error) {
        var startingSpeedLevels = bd(0);
        var middleSpeedLevels = bd(0);
        var endingSpeedLevels = bd(0);
    }

    return startingSpeedLevels.multiply(startingSpeed)
            .add(endingSpeed.multiply(endingSpeedLevels))
            .add(endingSpeed.add(startingSpeed).divide(bd(2)).multiply(middleSpeedLevels))

}

function percentTargetLevel(baseLevel, percentage) {
    return baseLevel.multiply(percentage.add(bd(100))).divide(bd(100))
}

export default function Page({children}) {
    const [calcType, setCalcType] = useState(NGU_TARGET)
    const playerData = getPlayerData();

    // Set data required (from playerData)
    var infoRequired = [
        ['currentEnergyCap'],
        ['currentMagicCap'],
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
  
    var [infoReq, infoData] = createStatesForData(infoRequired)

    // Set extra required (not from playerData)
    var extraRequired = [
        ['totalEnergyNGUSpeedFactor%'],
        ['totalMagicNGUSpeedFactor%'],
        ['percentageIncrease%', 'timeInSeconds'], []
    ]
    var [extraReq, extraData] = createStatesForData(extraRequired)

    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key) {
        if (key in infoData) {
            var x = infoData[key][0] 
        } else if (key in extraData) {
            var x = extraData[key][0]
        }
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


    // Setup Base
    var energyNGUBase = [
        bd("200000000000"), // augments
        bd("200000000000"), // wandoos
        bd("200000000000"), // respawn
        bd("200000000000"), // gold
        bd("200000000000"), // adventure
        bd("200000000000"), // power a
        bd("20000000000000"), // drop chance
        bd("400000000000000"), // magic NGU
        bd("10000000000000000"), // pp
    ]
    var magicNGUBase = [
        bd("400000000000"), // Yggrdrasil
        bd("1200000000000"), // Exp
        bd("4000000000000"), // power b
        bd("12000000000000"), // number
        bd("100000000000000"), // time machine
        bd("1000000000000000"), // energy ngu
        bd("10000000000000000"), // adv b
    ]
    

    var energySeconds = energyText.map((txt, index) => {
        return calcSeconds(
            v("currentEnergyCap"), // cap
            v("totalEnergyNGUSpeedFactor%"), // speedFactor
            energyNGUBase[index], // base
            v(txt + "Level"), // level
            (calcType == NGU_PERCENTAGE) ? percentTargetLevel (v(txt + "Level"), v("percentageIncrease%")): v(txt + "Target")// target
        )
    })
    var magicSeconds = magicText.map((txt, index) => {
        return calcSeconds(
            v("currentMagicCap"), // cap
            v("totalMagicNGUSpeedFactor%"), // speedFactor
            magicNGUBase[index], // base
            v(txt + "Level"), // level
            (calcType == NGU_PERCENTAGE) ? percentTargetLevel(v(txt + "Level"), v("percentageIncrease%")): v(txt + "Target") // target
        )
    })

    var energyTotalSeconds = energySeconds.reduce((total, current) => {
        return total.add(current)
    }, bd(0))
    var magicTotalSeconds = magicSeconds.reduce((total, current) => {
        return total.add(current)
    }, bd(0))


    // Information retrieval
    var energyLi = energySeconds.map(function(secs, index) {
        return <li key={energyText[index]}><strong>{camelToTitle(energyText[index])}:</strong> {dn(secs)}</li>
    })
    var magicLi = magicSeconds.map(function(secs, index) {
        return <li key={magicText[index]}><strong>{camelToTitle(magicText[index])}:</strong> {dn(secs)}</li>
    })


    console.log(extraReq.length, infoReq.length)
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
            <ChoiceButton text="Using Targets" onClick={() => setCalcType(NGU_TARGET)} />
            <ChoiceButton text="Using Percentage" onClick={() => setCalcType(NGU_PERCENTAGE)} />
            {/* <ChoiceButton text="Using Time" onClick={() => setCalcType(NGU_TIME)} /> */}
        </>
    )
        

    return (
        <Content prechildren={topButtons} title="NGUs" infoRequired={infoReq} extraRequired={extraReq}>
            <ul className="inline-block w-1/2 align-top mb-2">
                {energyLi}
                <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> {dn(energyTotalSeconds)}</li>
            </ul>
            <ul className="inline-block w-1/2 align-top mb-2">
                {magicLi}
                <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> {dn(magicTotalSeconds)}</li>
            </ul>
        </Content>
    )
}

