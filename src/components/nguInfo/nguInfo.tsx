'use client'

import { GameMode } from "@/assets/mode";
import { ENERGY_NGUS, MAGIC_NGUS, NGU } from "@/assets/ngus";
import { ChoiceButton } from "@/components/buttons";
import Content from "@/components/content";
import ContentSubsection from "@/components/contentSubsection";
import { getNumberFormat } from "@/components/context";
import { disableItem } from "@/components/dataListColumns";
import { bd } from "@/helpers/numbers";
import { nguExtraNameChanges, nguInfoNameChanges, nguTargetElts, nguValueElts } from "@/helpers/pages/ngus";
import { parseNum } from "@/helpers/parsers";
import { createStatesForData, getRequiredStates } from "@/helpers/stateForData";
import bigDecimal from "js-big-decimal";
import { ReactNode, useState } from "react";
import TimeText from "../timeText";
import NGUCapDayTable from "./nguCapDayTable";
import NGUCapTable from "./nguCapTable";
import NGUTargetTable from "./nguTargetTable";

const NGU_TARGET = 'target'
const NGU_PERCENTAGE = 'percentage'
const NGU_TIME = 'time'
const NGU_VALUE = 'value'


interface NGUProps {
    children ?: ReactNode;
    gameMode: number;
}

export default function NGUInfo({children, gameMode} : NGUProps) {
    const [calcType, setCalcType] = useState(NGU_TARGET)
    var fmt = getNumberFormat();

    var modeText = ''
    if(gameMode == GameMode.EVIL) {
        modeText = 'Evil'
    } else if(gameMode == GameMode.SADISTIC) {
        modeText = 'Sadistic'
    }

    // Set data required (from playerData)
    var infoRequired = [
        ['totalEnergyCap', 'totalEnergyNGUSpeedFactor%'],
        ['totalMagicCap', 'totalMagicNGUSpeedFactor%'],
        [
            'energyNGUAugments' + modeText + 'Level',
            'energyNGUWandoos' + modeText + 'Level',
            'energyNGURespawn' + modeText + 'Level',
            'energyNGUGold' + modeText + 'Level',
            'energyNGUAdventureA' + modeText + 'Level',
            'energyNGUPowerA' + modeText + 'Level',
            'energyNGUDropChance' + modeText + 'Level',
            'energyNGUMagicNGU' + modeText + 'Level',
            'energyNGUPP' + modeText + 'Level'
        ],[
            'magicNGUYggdrasil' + modeText + 'Level',
            'magicNGUExp' + modeText + 'Level',
            'magicNGUPowerB' + modeText + 'Level',
            'magicNGUNumber' + modeText + 'Level',
            'magicNGUTimeMachine' + modeText + 'Level',
            'magicNGUEnergyNGU' + modeText + 'Level',
            'magicNGUAdventureB' + modeText + 'Level'
        ],
        [
            'energyNGUAugments' + modeText + 'Target',
            'energyNGUWandoos' + modeText + 'Target',
            'energyNGURespawn' + modeText + 'Target',
            'energyNGUGold' + modeText + 'Target',
            'energyNGUAdventureA' + modeText + 'Target',
            'energyNGUPowerA' + modeText + 'Target',
            'energyNGUDropChance' + modeText + 'Target',
            'energyNGUMagicNGU' + modeText + 'Target',
            'energyNGUPP' + modeText + 'Target'
        ],[
            'magicNGUYggdrasil' + modeText + 'Target',
            'magicNGUExp' + modeText + 'Target',
            'magicNGUPowerB' + modeText + 'Target',
            'magicNGUNumber' + modeText + 'Target',
            'magicNGUTimeMachine' + modeText + 'Target',
            'magicNGUEnergyNGU' + modeText + 'Target',
            'magicNGUAdventureB' + modeText + 'Target'
        ],
        [],[]
    ]

    // Set extra required (not from playerData)
    var extraRequired = [
        ['percentageIncrease%', 'timeInMinutes'], [],
        [
            'energyNGUAugments' + modeText + 'Value',
            'energyNGUWandoos' + modeText + 'Value',
            'energyNGURespawn' + modeText + 'Value',
            'energyNGUGold' + modeText + 'Value',
            'energyNGUAdventureA' + modeText + 'Value',
            'energyNGUPowerA' + modeText + 'Value',
            'energyNGUDropChance' + modeText + 'Value',
            'energyNGUMagicNGU' + modeText + 'Value',
            'energyNGUPP' + modeText + 'Value'
        ],[
            'magicNGUYggdrasil' + modeText + 'Value',
            'magicNGUExp' + modeText + 'Value',
            'magicNGUPowerB' + modeText + 'Value',
            'magicNGUNumber' + modeText + 'Value',
            'magicNGUTimeMachine' + modeText + 'Value',
            'magicNGUEnergyNGU' + modeText + 'Value',
            'magicNGUAdventureB' + modeText + 'Value'
        ]
    ]
    const playerStates = createStatesForData(extraRequired);

    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates, nguInfoNameChanges)
    var extraReq = getRequiredStates(extraRequired, playerStates, nguExtraNameChanges)

    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        return parseNum(playerStates, key)
    }

    
    // Get all the NGUs and have it split by type
    var types = ['energy', 'magic']
    var NGUs : NGU[][] = types.map((ty) => {
        var ngus = (ty === 'energy') ? ENERGY_NGUS : MAGIC_NGUS
        var nguIds = (ty === 'energy') ? ENERGY_NGUS.ids : MAGIC_NGUS.ids

        var retNgus = []
        for(var nguId of nguIds) {
            var ngu : NGU = ngus[nguId]
            if(ngu.mode == gameMode) {
                ngu.setLevel(Number(v(ty + ngu.key + modeText + "Level").getValue()))
                ngu.target = Number(v(ty + ngu.key + modeText + "Target").getValue())
                retNgus.push(ngu)
            }
        }
        return retNgus
    })


    // Get all targets
    var targets = NGUs.map((tyNGUs, index) => {
        var ty = types[index]
        return tyNGUs.map((ngu) => {
            switch(calcType) {
                case NGU_PERCENTAGE:
                    return ngu.percentIncrease(v("percentageIncrease%"))
                case NGU_VALUE:
                    return ngu.valueIncrease(v(ty + ngu.key + modeText + "Value"))
                case NGU_TIME:
                    ty = ty[0].toUpperCase() + ty.substring(1)
                    return ngu.timeIncrease(v('timeInMinutes'), v("total" + ty + "Cap"), v("total" + ty + "NGUSpeedFactor%"))
                default: 
                    return bd(ngu.target);
            }
        })
    })


    // Get the number of seconds 
    var seconds = NGUs.map((tyNGUs, index) => {
        var ty = types[index]
        ty = ty[0].toUpperCase() + ty.substring(1)
        return tyNGUs.map((ngu, innerIndex) => {
            return ngu.calcSecondsToTarget(v("total" + ty + "Cap"), v("total" + ty + "NGUSpeedFactor%"), targets[index][innerIndex])
        })
    })
    
    // Get the total seconds
    var totalSeconds = seconds.map((secs, index) => {
        return secs.reduce((total, current) => {
            return total.add(current)
        }, bd(0))
    })




    switch (calcType) {
        case NGU_TARGET:
            extraReq = disableItem(extraReq, ['percentageIncrease%', 'timeInMinutes']);
            extraReq = disableItem(extraReq, nguValueElts)
            break;
        case NGU_VALUE:
            extraReq = disableItem(extraReq, ['percentageIncrease%', 'timeInMinutes']);
            infoReq = disableItem(infoReq, nguTargetElts)
            break;
        case NGU_PERCENTAGE:
            extraReq = disableItem(extraReq, ['timeInMinutes']);
            extraReq = disableItem(extraReq, nguValueElts)
            infoReq = disableItem(infoReq, nguTargetElts)
            break;
        case NGU_TIME:
            extraReq = disableItem(extraReq, ['percentageIncrease%']);
            extraReq = disableItem(extraReq, nguValueElts)
            infoReq = disableItem(infoReq, nguTargetElts)
            break;
    }
    
    var topButtons = (
        <>
            <p>How would you like to calculate NGUs?</p>
            <ChoiceButton text="Using Targets" onClick={() => setCalcType(NGU_TARGET)} active={calcType==NGU_TARGET} />
            <ChoiceButton text="Using Percentage of Current Value" onClick={() => setCalcType(NGU_PERCENTAGE)}  active={calcType==NGU_PERCENTAGE} />
            <ChoiceButton text="Using Certain Value" onClick={() => setCalcType(NGU_VALUE)}  active={calcType==NGU_VALUE} />
            <ChoiceButton text="Using Time" onClick={() => setCalcType(NGU_TIME)} />
        </>
    )
        

    return (
        <Content prechildren={topButtons} title={"NGUs - " + (modeText == '' ? 'Normal' : modeText)} infoRequired={infoReq} extraRequired={extraReq}>
            <ContentSubsection title="How long until I reach targets?">
                <p>
                    The following tables let you know how much <span className="text-red-500">Time</span> is needed until you get to the <span className="text-blue-500">Target</span>.
                    The Value represents the bonus you will have once you reach the target.
                </p>
                {/* <div className="flex flex-wrap"> */}
                <NGUTargetTable type="Energy" NGUs={NGUs[0]} targets={targets[0]} seconds={seconds[0]} totalSeconds={totalSeconds[0]} fmt={fmt} />
                <NGUTargetTable type="Magic" NGUs={NGUs[1]} targets={targets[1]} seconds={seconds[1]}  totalSeconds={totalSeconds[1]} fmt={fmt} />
                {/* </div> */}
                <TimeText />

            </ContentSubsection>
            <ContentSubsection title="How much energy/magic is needed to cap/max the bar at target level?">
                <p>
                    The following tells you how much energy or magic you will need to <span className="text-red-500">Cap/BB</span> the bar at the <span className="text-blue-500">Target</span>.
                </p>
                <NGUCapTable type="Energy" NGUs={NGUs[0]} targets={targets[0]} speedFactor={v("totalEnergyNGUSpeedFactor%")} fmt={fmt} />
                <NGUCapTable type="Magic" NGUs={NGUs[1]} targets={targets[1]} speedFactor={v("totalMagicNGUSpeedFactor%")} fmt={fmt} />

            </ContentSubsection>
            <ContentSubsection title="How much energy is needed to cap/max the bar for 24 hours non-stop?">
                <p>
                    The following tells you how much energy or magic you will need to <span className="text-red-500">Cap</span> the bar for a continuous 24 hours.
                </p>
                
                <NGUCapDayTable type="Energy" NGUs={NGUs[0]} speedFactor={v("totalEnergyNGUSpeedFactor%")} fmt={fmt} />
                <NGUCapDayTable type="Magic" NGUs={NGUs[1]} speedFactor={v("totalMagicNGUSpeedFactor%")} fmt={fmt} />
            </ContentSubsection>
        </Content>
    )
}

