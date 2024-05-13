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
import { ReactNode, useState } from "react";
import TimeText from "./timeText";

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
        ['currentEnergyCap', 'totalEnergyNGUSpeedFactor%'],
        ['currentMagicCap', 'totalMagicNGUSpeedFactor%'],
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
        ]
    ]

    // Set extra required (not from playerData)
    var extraRequired = [
        ['percentageIncrease%', 'timeInSeconds'], [],
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

        'energyNGUAugmentsEvilLevel': 'Augments Level',
        'energyNGUWandoosEvilLevel': 'Wandoos Level',
        'energyNGURespawnEvilLevel': 'Respawn Level',
        'energyNGUGoldEvilLevel': 'Gold Level',
        'energyNGUAdventureAEvilLevel': 'Adventure α Level',
        'energyNGUPowerAEvilLevel': 'Power α Level',
        'energyNGUDropChanceEvilLevel': 'Drop Chance Level',
        'energyNGUMagicNGUEvilLevel': 'Magic NGU Level',
        'energyNGUPPEvilLevel': 'PP Level',
        'magicNGUYggdrasilEvilLevel': 'Yggdrasil Level',
        'magicNGUExpEvilLevel': 'Exp Level',
        'magicNGUPowerBEvilLevel': 'Power β Level',
        'magicNGUNumberEvilLevel': 'Number Level',
        'magicNGUTimeMachineEvilLevel': 'Time Machine Level',
        'magicNGUEnergyNGUEvilLevel': 'Energy NGU Level',
        'magicNGUAdventureBEvilLevel': 'Adventure β Level',
        'energyNGUAugmentsEvilTarget': 'Augments Target',
        'energyNGUWandoosEvilTarget': 'Wandoos Target',
        'energyNGURespawnEvilTarget': 'Respawn Target',
        'energyNGUGoldEvilTarget': 'Gold Target',
        'energyNGUAdventureAEvilTarget': 'Adventure α Target',
        'energyNGUPowerAEvilTarget': 'Power α Target',
        'energyNGUDropChanceEvilTarget': 'Drop Chance Target',
        'energyNGUMagicNGUEvilTarget': 'Magic NGU Target',
        'energyNGUPPEvilTarget': 'PP Target',
        'magicNGUYggdrasilEvilTarget': 'Yggdrasil Target',
        'magicNGUExpEvilTarget': 'Exp Target',
        'magicNGUPowerBEvilTarget': 'Power β Target',
        'magicNGUNumberEvilTarget': 'Number Target',
        'magicNGUTimeMachineEvilTarget': 'Time Machine Target',
        'magicNGUEnergyNGUEvilTarget': 'Energy NGU Target',
        'magicNGUAdventureBEvilTarget': 'Adventure β Target',

        'energyNGUAugmentsSadisticLevel': 'Augments Level',
        'energyNGUWandoosSadisticLevel': 'Wandoos Level',
        'energyNGURespawnSadisticLevel': 'Respawn Level',
        'energyNGUGoldSadisticLevel': 'Gold Level',
        'energyNGUAdventureASadisticLevel': 'Adventure α Level',
        'energyNGUPowerASadisticLevel': 'Power α Level',
        'energyNGUDropChanceSadisticLevel': 'Drop Chance Level',
        'energyNGUMagicNGUSadisticLevel': 'Magic NGU Level',
        'energyNGUPPSadisticLevel': 'PP Level',
        'magicNGUYggdrasilSadisticLevel': 'Yggdrasil Level',
        'magicNGUExpSadisticLevel': 'Exp Level',
        'magicNGUPowerBSadisticLevel': 'Power β Level',
        'magicNGUNumberSadisticLevel': 'Number Level',
        'magicNGUTimeMachineSadisticLevel': 'Time Machine Level',
        'magicNGUEnergyNGUSadisticLevel': 'Energy NGU Level',
        'magicNGUAdventureBSadisticLevel': 'Adventure β Level',
        'energyNGUAugmentsSadisticTarget': 'Augments Target',
        'energyNGUWandoosSadisticTarget': 'Wandoos Target',
        'energyNGURespawnSadisticTarget': 'Respawn Target',
        'energyNGUGoldSadisticTarget': 'Gold Target',
        'energyNGUAdventureASadisticTarget': 'Adventure α Target',
        'energyNGUPowerASadisticTarget': 'Power α Target',
        'energyNGUDropChanceSadisticTarget': 'Drop Chance Target',
        'energyNGUMagicNGUSadisticTarget': 'Magic NGU Target',
        'energyNGUPPSadisticTarget': 'PP Target',
        'magicNGUYggdrasilSadisticTarget': 'Yggdrasil Target',
        'magicNGUExpSadisticTarget': 'Exp Target',
        'magicNGUPowerBSadisticTarget': 'Power β Target',
        'magicNGUNumberSadisticTarget': 'Number Target',
        'magicNGUTimeMachineSadisticTarget': 'Time Machine Target',
        'magicNGUEnergyNGUSadisticTarget': 'Energy NGU Target',
        'magicNGUAdventureBSadisticTarget': 'Adventure β Target',
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

        'energyNGUAugmentsEvilValue': 'Augments Value',
        'energyNGUWandoosEvilValue': 'Wandoos Value',
        'energyNGURespawnEvilValue': 'Respawn Value',
        'energyNGUGoldEvilValue': 'Gold Value',
        'energyNGUAdventureAEvilValue': 'Adventure α Value',
        'energyNGUPowerAEvilValue': 'Power α Value',
        'energyNGUDropChanceEvilValue': 'Drop Chance Value',
        'energyNGUMagicNGUEvilValue': 'Magic NGU Value',
        'energyNGUPPEvilValue': 'PP Value',
        'magicNGUYggdrasilEvilValue': 'Yggdrasil Value',
        'magicNGUExpEvilValue': 'Exp Value',
        'magicNGUPowerBEvilValue': 'Power β Value',
        'magicNGUNumberEvilValue': 'Number Value',
        'magicNGUTimeMachineEvilValue': 'Time Machine Value',
        'magicNGUEnergyNGUEvilValue': 'Energy NGU Value',
        'magicNGUAdventureBEvilValue': 'Adventure β Value',

        'energyNGUAugmentsSadisticValue': 'Augments Value',
        'energyNGUWandoosSadisticValue': 'Wandoos Value',
        'energyNGURespawnSadisticValue': 'Respawn Value',
        'energyNGUGoldSadisticValue': 'Gold Value',
        'energyNGUAdventureASadisticValue': 'Adventure α Value',
        'energyNGUPowerASadisticValue': 'Power α Value',
        'energyNGUDropChanceSadisticValue': 'Drop Chance Value',
        'energyNGUMagicNGUSadisticValue': 'Magic NGU Value',
        'energyNGUPPSadisticValue': 'PP Value',
        'magicNGUYggdrasilSadisticValue': 'Yggdrasil Value',
        'magicNGUExpSadisticValue': 'Exp Value',
        'magicNGUPowerBSadisticValue': 'Power β Value',
        'magicNGUNumberSadisticValue': 'Number Value',
        'magicNGUTimeMachineSadisticValue': 'Time Machine Value',
        'magicNGUEnergyNGUSadisticValue': 'Energy NGU Value',
        'magicNGUAdventureBSadisticValue': 'Adventure β Value',
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
            if(ngu.mode == gameMode) {
                ngu.setLevel(Number(v(ty + ngu.key + modeText + "Level").getValue()))
                ngu.target = Number(v(ty + ngu.key + modeText + "Target").getValue())
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
                    return ngu.valueIncrease(v(ty + ngu.key + modeText + "Value"))
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
            var val = bd(ngu.getStatValue(ngu.statnames[0], Number(targetLvl.getValue())))
            var curVal = bd(ngu.getStatValue(ngu.statnames[0]))
    
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
                'magicNGUAdventureBValue',

                'energyNGUAugmentsEvilValue',
                'energyNGUWandoosEvilValue',
                'energyNGURespawnEvilValue',
                'energyNGUGoldEvilValue',
                'energyNGUAdventureAEvilValue',
                'energyNGUPowerAEvilValue',
                'energyNGUDropChanceEvilValue',
                'energyNGUMagicNGUEvilValue',
                'energyNGUPPEvilValue',
                'magicNGUYggdrasilEvilValue',
                'magicNGUExpEvilValue',
                'magicNGUPowerBEvilValue',
                'magicNGUNumberEvilValue',
                'magicNGUTimeMachineEvilValue',
                'magicNGUEnergyNGUEvilValue',
                'magicNGUAdventureBEvilValue',

                'energyNGUAugmentsSadisticValue',
                'energyNGUWandoosSadisticValue',
                'energyNGURespawnSadisticValue',
                'energyNGUGoldSadisticValue',
                'energyNGUAdventureASadisticValue',
                'energyNGUPowerASadisticValue',
                'energyNGUDropChanceSadisticValue',
                'energyNGUMagicNGUSadisticValue',
                'energyNGUPPSadisticValue',
                'magicNGUYggdrasilSadisticValue',
                'magicNGUExpSadisticValue',
                'magicNGUPowerBSadisticValue',
                'magicNGUNumberSadisticValue',
                'magicNGUTimeMachineSadisticValue',
                'magicNGUEnergyNGUSadisticValue',
                'magicNGUAdventureBSadisticValue',
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
                'magicNGUAdventureBTarget',

                'energyNGUAugmentsEvilTarget',
                'energyNGUWandoosEvilTarget',
                'energyNGURespawnEvilTarget',
                'energyNGUGoldEvilTarget',
                'energyNGUAdventureAEvilTarget',
                'energyNGUPowerAEvilTarget',
                'energyNGUDropChanceEvilTarget',
                'energyNGUMagicNGUEvilTarget',
                'energyNGUPPEvilTarget',
                'magicNGUYggdrasilEvilTarget',
                'magicNGUExpEvilTarget',
                'magicNGUPowerBEvilTarget',
                'magicNGUNumberEvilTarget',
                'magicNGUTimeMachineEvilTarget',
                'magicNGUEnergyNGUEvilTarget',
                'magicNGUAdventureBEvilTarget',

                'energyNGUAugmentsSadisticTarget',
                'energyNGUWandoosSadisticTarget',
                'energyNGURespawnSadisticTarget',
                'energyNGUGoldSadisticTarget',
                'energyNGUAdventureASadisticTarget',
                'energyNGUPowerASadisticTarget',
                'energyNGUDropChanceSadisticTarget',
                'energyNGUMagicNGUSadisticTarget',
                'energyNGUPPSadisticTarget',
                'magicNGUYggdrasilSadisticTarget',
                'magicNGUExpSadisticTarget',
                'magicNGUPowerBSadisticTarget',
                'magicNGUNumberSadisticTarget',
                'magicNGUTimeMachineSadisticTarget',
                'magicNGUEnergyNGUSadisticTarget',
                'magicNGUAdventureBSadisticTarget',
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
                'magicNGUAdventureBValue',

                'energyNGUAugmentsEvilValue',
                'energyNGUWandoosEvilValue',
                'energyNGURespawnEvilValue',
                'energyNGUGoldEvilValue',
                'energyNGUAdventureAEvilValue',
                'energyNGUPowerAEvilValue',
                'energyNGUDropChanceEvilValue',
                'energyNGUMagicNGUEvilValue',
                'energyNGUPPEvilValue',
                'magicNGUYggdrasilEvilValue',
                'magicNGUExpEvilValue',
                'magicNGUPowerBEvilValue',
                'magicNGUNumberEvilValue',
                'magicNGUTimeMachineEvilValue',
                'magicNGUEnergyNGUEvilValue',
                'magicNGUAdventureBEvilValue',

                'energyNGUAugmentsSadisticValue',
                'energyNGUWandoosSadisticValue',
                'energyNGURespawnSadisticValue',
                'energyNGUGoldSadisticValue',
                'energyNGUAdventureASadisticValue',
                'energyNGUPowerASadisticValue',
                'energyNGUDropChanceSadisticValue',
                'energyNGUMagicNGUSadisticValue',
                'energyNGUPPSadisticValue',
                'magicNGUYggdrasilSadisticValue',
                'magicNGUExpSadisticValue',
                'magicNGUPowerBSadisticValue',
                'magicNGUNumberSadisticValue',
                'magicNGUTimeMachineSadisticValue',
                'magicNGUEnergyNGUSadisticValue',
                'magicNGUAdventureBSadisticValue',
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
                'magicNGUAdventureBTarget',

                'energyNGUAugmentsEvilTarget',
                'energyNGUWandoosEvilTarget',
                'energyNGURespawnEvilTarget',
                'energyNGUGoldEvilTarget',
                'energyNGUAdventureAEvilTarget',
                'energyNGUPowerAEvilTarget',
                'energyNGUDropChanceEvilTarget',
                'energyNGUMagicNGUEvilTarget',
                'energyNGUPPEvilTarget',
                'magicNGUYggdrasilEvilTarget',
                'magicNGUExpEvilTarget',
                'magicNGUPowerBEvilTarget',
                'magicNGUNumberEvilTarget',
                'magicNGUTimeMachineEvilTarget',
                'magicNGUEnergyNGUEvilTarget',
                'magicNGUAdventureBEvilTarget',

                'energyNGUAugmentsSadisticTarget',
                'energyNGUWandoosSadisticTarget',
                'energyNGURespawnSadisticTarget',
                'energyNGUGoldSadisticTarget',
                'energyNGUAdventureASadisticTarget',
                'energyNGUPowerASadisticTarget',
                'energyNGUDropChanceSadisticTarget',
                'energyNGUMagicNGUSadisticTarget',
                'energyNGUPPSadisticTarget',
                'magicNGUYggdrasilSadisticTarget',
                'magicNGUExpSadisticTarget',
                'magicNGUPowerBSadisticTarget',
                'magicNGUNumberSadisticTarget',
                'magicNGUTimeMachineSadisticTarget',
                'magicNGUEnergyNGUSadisticTarget',
                'magicNGUAdventureBSadisticTarget',
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
                'magicNGUAdventureBValue',

                'energyNGUAugmentsEvilValue',
                'energyNGUWandoosEvilValue',
                'energyNGURespawnEvilValue',
                'energyNGUGoldEvilValue',
                'energyNGUAdventureAEvilValue',
                'energyNGUPowerAEvilValue',
                'energyNGUDropChanceEvilValue',
                'energyNGUMagicNGUEvilValue',
                'energyNGUPPEvilValue',
                'magicNGUYggdrasilEvilValue',
                'magicNGUExpEvilValue',
                'magicNGUPowerBEvilValue',
                'magicNGUNumberEvilValue',
                'magicNGUTimeMachineEvilValue',
                'magicNGUEnergyNGUEvilValue',
                'magicNGUAdventureBEvilValue',

                'energyNGUAugmentsSadisticValue',
                'energyNGUWandoosSadisticValue',
                'energyNGURespawnSadisticValue',
                'energyNGUGoldSadisticValue',
                'energyNGUAdventureASadisticValue',
                'energyNGUPowerASadisticValue',
                'energyNGUDropChanceSadisticValue',
                'energyNGUMagicNGUSadisticValue',
                'energyNGUPPSadisticValue',
                'magicNGUYggdrasilSadisticValue',
                'magicNGUExpSadisticValue',
                'magicNGUPowerBSadisticValue',
                'magicNGUNumberSadisticValue',
                'magicNGUTimeMachineSadisticValue',
                'magicNGUEnergyNGUSadisticValue',
                'magicNGUAdventureBSadisticValue',
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
                'magicNGUAdventureBTarget',
                
                'energyNGUAugmentsEvilTarget',
                'energyNGUWandoosEvilTarget',
                'energyNGURespawnEvilTarget',
                'energyNGUGoldEvilTarget',
                'energyNGUAdventureAEvilTarget',
                'energyNGUPowerAEvilTarget',
                'energyNGUDropChanceEvilTarget',
                'energyNGUMagicNGUEvilTarget',
                'energyNGUPPEvilTarget',
                'magicNGUYggdrasilEvilTarget',
                'magicNGUExpEvilTarget',
                'magicNGUPowerBEvilTarget',
                'magicNGUNumberEvilTarget',
                'magicNGUTimeMachineEvilTarget',
                'magicNGUEnergyNGUEvilTarget',
                'magicNGUAdventureBEvilTarget',

                'energyNGUAugmentsSadisticTarget',
                'energyNGUWandoosSadisticTarget',
                'energyNGURespawnSadisticTarget',
                'energyNGUGoldSadisticTarget',
                'energyNGUAdventureASadisticTarget',
                'energyNGUPowerASadisticTarget',
                'energyNGUDropChanceSadisticTarget',
                'energyNGUMagicNGUSadisticTarget',
                'energyNGUPPSadisticTarget',
                'magicNGUYggdrasilSadisticTarget',
                'magicNGUExpSadisticTarget',
                'magicNGUPowerBSadisticTarget',
                'magicNGUNumberSadisticTarget',
                'magicNGUTimeMachineSadisticTarget',
                'magicNGUEnergyNGUSadisticTarget',
                'magicNGUAdventureBSadisticTarget',
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
        <Content prechildren={topButtons} title={"NGUs - " + (modeText == '' ? 'Normal' : modeText)} infoRequired={infoReq} extraRequired={extraReq}>
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
                <TimeText />

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

