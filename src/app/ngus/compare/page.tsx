'use client'

import { ENERGY_NGUS, MAGIC_NGUS, NGU } from "@/assets/ngus";
import Content, { requiredDataType } from "@/components/content";
import ContentSubsection from "@/components/contentSubsection";
import { getNumberFormat } from "@/components/context";
import { disableItem } from "@/components/dataListColumns";
import TimeText from "@/components/timeText";
import { isSadMode } from "@/helpers/gameMode";
import { bd, bigdec_equals, bigdec_min, dn, pn, toNum } from "@/helpers/numbers";
import { parseNum } from "@/helpers/parsers";
import { createStatesForData, getRequiredStates } from "@/helpers/stateForData";
import bigDecimal from "js-big-decimal";


// TODO - Should eventually integrate the NGU->NGU perk stuff for comparison
export default function Page() {
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired : requiredDataType = [
        ['gameMode'], [],
        ['totalEnergyCap', 'totalEnergyNGUSpeedFactor%'],
        ['totalMagicCap', 'totalMagicNGUSpeedFactor%'],
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
        ],
        [
            'energyNGUAugmentsSadisticLevel',
            'energyNGUWandoosSadisticLevel',
            'energyNGURespawnSadisticLevel',
            'energyNGUGoldSadisticLevel',
            'energyNGUAdventureASadisticLevel',
            'energyNGUPowerASadisticLevel',
            'energyNGUDropChanceSadisticLevel',
            'energyNGUMagicNGUSadisticLevel',
            'energyNGUPPSadisticLevel',
        ],[
            'magicNGUYggdrasilSadisticLevel',
            'magicNGUExpSadisticLevel',
            'magicNGUPowerBSadisticLevel',
            'magicNGUNumberSadisticLevel',
            'magicNGUTimeMachineSadisticLevel',
            'magicNGUEnergyNGUSadisticLevel',
            'magicNGUAdventureBSadisticLevel',
        ]
    ]

    // Set extra required (not from playerData)
    var extraRequired : requiredDataType= [
        ['percentageIncrease%'], []
    ]
    var goRequired :requiredDataType = [['goEnergyCap%', 'goEnergyNGU%', 'goMagicCap%', 'goMagicNGU%']]
    const playerStates = createStatesForData(extraRequired, goRequired);

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

        'energyNGUAugmentsEvilLevel': 'Augments Evil Level',
        'energyNGUWandoosEvilLevel': 'Wandoos Evil Level',
        'energyNGURespawnEvilLevel': 'Respawn Evil Level',
        'energyNGUGoldEvilLevel': 'Gold Evil Level',
        'energyNGUAdventureAEvilLevel': 'Adventure α Evil Level',
        'energyNGUPowerAEvilLevel': 'Power α Evil Level',
        'energyNGUDropChanceEvilLevel': 'Drop Chance Evil Level',
        'energyNGUMagicNGUEvilLevel': 'Magic NGU Evil Level',
        'energyNGUPPEvilLevel': 'PP Evil Level',
        'magicNGUYggdrasilEvilLevel': 'Yggdrasil Evil Level',
        'magicNGUExpEvilLevel': 'Exp Evil Level',
        'magicNGUPowerBEvilLevel': 'Power β Evil Level',
        'magicNGUNumberEvilLevel': 'Number Evil Level',
        'magicNGUTimeMachineEvilLevel': 'Time Machine Evil Level',
        'magicNGUEnergyNGUEvilLevel': 'Energy NGU Evil Level',
        'magicNGUAdventureBEvilLevel': 'Adventure β Evil Level',

        'energyNGUAugmentsSadisticLevel': 'Augments Sadistic Level',
        'energyNGUWandoosSadisticLevel': 'Wandoos Sadistic Level',
        'energyNGURespawnSadisticLevel': 'Respawn Sadistic Level',
        'energyNGUGoldSadisticLevel': 'Gold Sadistic Level',
        'energyNGUAdventureASadisticLevel': 'Adventure α Sadistic Level',
        'energyNGUPowerASadisticLevel': 'Power α Sadistic Level',
        'energyNGUDropChanceSadisticLevel': 'Drop Chance Sadistic Level',
        'energyNGUMagicNGUSadisticLevel': 'Magic NGU Sadistic Level',
        'energyNGUPPSadisticLevel': 'PP Sadistic Level',
        'magicNGUYggdrasilSadisticLevel': 'Yggdrasil Sadistic Level',
        'magicNGUExpSadisticLevel': 'Exp Sadistic Level',
        'magicNGUPowerBSadisticLevel': 'Power β Sadistic Level',
        'magicNGUNumberSadisticLevel': 'Number Sadistic Level',
        'magicNGUTimeMachineSadisticLevel': 'Time Machine Sadistic Level',
        'magicNGUEnergyNGUSadisticLevel': 'Energy NGU Sadistic Level',
        'magicNGUAdventureBSadisticLevel': 'Adventure β Sadistic Level',
    })
    var extraReq = getRequiredStates(extraRequired, playerStates)
    var goReq = getRequiredStates(goRequired, playerStates)


    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        return parseNum(playerStates, key)
    }


    /**
     * Organise the NGUs with matching keys:
     * 
     * {
     *  'energy' : {
     *      'augments': {
     *          'normal' : NGU,
     *          'evil' : NGU,
     *          'sad' : NGU,
     *      }
     *  }
     * }
     */
    var types = ['energy', 'magic']
    var NGUs : {'normal' : NGU, 'evil' : NGU, 'sadistic' : NGU}[][] = types.map((ty) => {
        var ngus = (ty === 'energy') ? ENERGY_NGUS : MAGIC_NGUS
        var nguIds = (ty === 'energy') ? ENERGY_NGUS.ids : MAGIC_NGUS.ids

        var retNgus = []
        for(var nguId of nguIds) {
            if (nguId < 10) {
                var ngu : NGU = ngus[nguId]
                ngu.setLevel(toNum(v(ty + ngu.key + "Level")))

                var evilngu : NGU = ngus[nguId + 10]
                evilngu.setLevel(toNum(v(ty + evilngu.key + "EvilLevel")))

                var sadngu : NGU = ngus[nguId + 20]
                sadngu.setLevel(toNum(v(ty + sadngu.key + "SadisticLevel")))

                retNgus.push({
                    'normal' : ngu,
                    'evil' : evilngu,
                    'sadistic' : sadngu,
                })
            }
        }
        return retNgus
    })

    var targets = NGUs.map((tyNGUs) => {
        return tyNGUs.map((ngu) => {
            return {
                'normal' : ngu['normal'].percentIncrease(v("percentageIncrease%")),
                'evil' : ngu['evil'].percentIncrease(v("percentageIncrease%")),
                'sadistic' : ngu['sadistic'].percentIncrease(v("percentageIncrease%")),
            }
        })
    })
    
    var seconds = NGUs.map((tyNGUs, index) => {
        var ty = types[index]
        ty = ty[0].toUpperCase() + ty.substring(1)
        return tyNGUs.map((ngu, innerIndex) => {
            return {
                'normal' : ngu['normal'].calcSecondsToTarget(v("total" + ty + "Cap"), v("total" + ty + "NGUSpeedFactor%"), targets[index][innerIndex]['normal']),
                'evil' : ngu['evil'].calcSecondsToTarget(v("total" + ty + "Cap"), v("total" + ty + "NGUSpeedFactor%"), targets[index][innerIndex]['evil']),
                'sadistic' : ngu['sadistic'].calcSecondsToTarget(v("total" + ty + "Cap"), v("total" + ty + "NGUSpeedFactor%"), targets[index][innerIndex]['sadistic']),
            }
        })
    })

    // Information retrieval
    var infoRow = NGUs.map((tyNGUs, index) => {
        var ty = types[index]
        ty = ty[0].toUpperCase() + ty.substring(1)
        return tyNGUs.map(function(ngu, innerIndex) {
            var targetLvls = targets[index][innerIndex]
            var secs = seconds[index][innerIndex]

            var minTime = bd(0)
            if(isSadMode(v('gameMode'))) {
                minTime = bigdec_min(secs['normal'], secs['evil'], secs['sadistic'])
            } else {
                minTime = bigdec_min(secs['normal'], secs['evil'])
            }

            var minbgClass = 'bg-green-200 dark:bg-green-900 '

            return (
                <tr key={ngu['normal'].key} className={innerIndex % 2 == 0 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                    <td className="px-2">{ngu['normal'].name}</td>
                    <td className={bigdec_equals(secs['normal'], minTime) ? minbgClass + 'px-2 text-right' : 'px-2 text-right'}><span className={bigdec_equals(secs['normal'], minTime) ? '' : "text-red-500"}>{dn(secs['normal'])}</span></td>
                    <td className={bigdec_equals(secs['normal'], minTime) ? minbgClass + 'px-2' : 'px-2'}><span className={bigdec_equals(secs['normal'], minTime) ? '' : "text-blue-500"}>{pn(targetLvls['normal'], fmt)}</span></td>
                    <td className={bigdec_equals(secs['evil'], minTime) ? minbgClass + 'px-2 text-right' : 'px-2 text-right'}><span className={bigdec_equals(secs['evil'], minTime) ? '' : "text-red-500"}>{dn(secs['evil'])}</span></td>
                    <td className={bigdec_equals(secs['evil'], minTime)  ? minbgClass + 'px-2' : 'px-2'}><span className={bigdec_equals(secs['evil'], minTime) ? '' : "text-blue-500"}>{pn(targetLvls['evil'], fmt)}</span></td>
                    {
                        isSadMode(v('gameMode'))
                        ? <>
                            <td className={bigdec_equals(secs['sadistic'], minTime) ? minbgClass + 'px-2 text-right' : 'px-2 text-right'}><span className={bigdec_equals(secs['sadistic'], minTime) ? '' : "text-red-500"}>{dn(secs['sadistic'])}</span></td>
                            <td className={bigdec_equals(secs['sadistic'], minTime) ? minbgClass + 'px-2' : 'px-2'}><span className={bigdec_equals(secs['sadistic'], minTime) ? '' : "text-blue-500"}>{pn(targetLvls['sadistic'], fmt)}</span></td>
                        </>
                        : null
                    }
                </tr>
            )
        })
    })
    var energyRow = infoRow[0]
    var magicRow = infoRow[1]

    if(!isSadMode(v('gameMode'))) {
        infoReq = disableItem(infoReq, [
            'energyNGUAugmentsSadisticLevel',
            'energyNGUWandoosSadisticLevel',
            'energyNGURespawnSadisticLevel',
            'energyNGUGoldSadisticLevel',
            'energyNGUAdventureASadisticLevel',
            'energyNGUPowerASadisticLevel',
            'energyNGUDropChanceSadisticLevel',
            'energyNGUMagicNGUSadisticLevel',
            'energyNGUPPSadisticLevel',
            'magicNGUYggdrasilSadisticLevel',
            'magicNGUExpSadisticLevel',
            'magicNGUPowerBSadisticLevel',
            'magicNGUNumberSadisticLevel',
            'magicNGUTimeMachineSadisticLevel',
            'magicNGUEnergyNGUSadisticLevel',
            'magicNGUAdventureBSadisticLevel',
        ])
    }

        

    return (
        <Content title="NGUs - Compare which mode is faster" infoRequired={infoReq} extraRequired={extraReq} goRequired={goReq} prechildren={<p>This page only makes sense if you are in Evil mode or higher.</p>}>
            <p>
                This will tell you what mode is faster for increasing your NGUs. If you state the percentage you want above (in Extra Info) it will compare how fast the differents take to achieve that percentage increase. 
                The <span className="text-green-900 dark:text-green-200">faster mode</span> is highlighted in green.
            </p>
            
            <ContentSubsection title="Energy - Which is faster?">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th colSpan={2}>Normal</th>
                            <th colSpan={2}>Evil</th>
                            {
                                isSadMode(v('gameMode'))
                                ? <th colSpan={2}>Sadistic</th>
                                : null
                            }
                        </tr>
                        <tr>
                            <th>NGU</th>
                            <th>Time</th>
                            <th>Target Level</th>
                            <th>Time</th>
                            <th>Target Level</th>
                            {
                                isSadMode(v('gameMode'))
                                ?   <>
                                    <th>Time</th>
                                    <th>Target Level</th>
                                    </>
                                : null
                            }
                            
                        </tr>
                    </thead>
                    <tbody>
                        {energyRow}
                    </tbody>
                </table>
                <TimeText />
            </ContentSubsection>
            <ContentSubsection title="Magic - Which is faster?">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th colSpan={2}>Normal</th>
                            <th colSpan={2}>Evil</th>
                            {
                                isSadMode(v('gameMode'))
                                ? <th colSpan={2}>Sadistic</th>
                                : null
                            }
                        </tr>
                        <tr>
                            <th>NGU</th>
                            <th>Time</th>
                            <th>Target Level</th>
                            <th>Time</th>
                            <th>Target Level</th>
                            {
                                isSadMode(v('gameMode'))
                                ?   <>
                                    <th>Time</th>
                                    <th>Target Level</th>
                                    </>
                                : null
                            }
                            
                        </tr>
                    </thead>
                    <tbody>
                        {magicRow}
                    </tbody>
                </table>
                <TimeText />
            </ContentSubsection>
            
        </Content>
    )
}

