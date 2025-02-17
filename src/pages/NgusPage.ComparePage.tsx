import { ENERGY_NGUS, MAGIC_NGUS, NGU } from "@/assets/ngus";
import Content, { requiredDataType } from "../components/Content";
import ContentSubsection from "../components/ContentSubsection";
import { getNumberFormat, getPlayer } from "../components/Context";
import { disableItem } from "../components/dataListColumns";
import TimeText from "../components/TimeText";
import { isSadMode } from "@/helpers/gameMode";
import { bd, bigdec_equals, bigdec_min, dn, pn, toNum } from "@/helpers/numbers";
import { getPlayerDataInfo } from "@/helpers/playerInfo";

// TODO - Should eventually integrate the NGU->NGU perk stuff for comparison
export default function NGUsComparePage() {
    const player = getPlayer();
    const fmt = getNumberFormat();

    // Set data required (from playerData)
    const infoRequired : requiredDataType = [
        ['gameMode'], [],
        ['totalEnergyCap', 'totalEnergyNGUSpeedFactor'],
        ['totalMagicCap', 'totalMagicNGUSpeedFactor'],
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
    const extraRequired : requiredDataType= [
        ['nguPercentageIncrease'], []
    ]
    const goRequired :requiredDataType = [['goEnergyCap', 'goEnergyNGU', 'goMagicCap', 'goMagicNGU']]
    
    // Get required data
    let infoReq = getPlayerDataInfo(infoRequired)
    const extraReq = getPlayerDataInfo(extraRequired)
    const goReq = getPlayerDataInfo(goRequired)


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
    const types = ['energy', 'magic']
    const NGUs : {'normal' : NGU, 'evil' : NGU, 'sadistic' : NGU}[][] = types.map((ty) => {
        const ngus = (ty === 'energy') ? ENERGY_NGUS : MAGIC_NGUS
        const nguIds = (ty === 'energy') ? ENERGY_NGUS.ids : MAGIC_NGUS.ids

        const retNgus = []
        for(const nguId of nguIds) {
            if (nguId < 10) {
                const ngu : NGU = ngus[nguId]
                ngu.setLevel(toNum(player.get(ty + ngu.key + "Level")))

                const evilngu : NGU = ngus[nguId + 10]
                evilngu.setLevel(toNum(player.get(ty + evilngu.key + "EvilLevel")))

                const sadngu : NGU = ngus[nguId + 20]
                sadngu.setLevel(toNum(player.get(ty + sadngu.key + "SadisticLevel")))

                retNgus.push({
                    'normal' : ngu,
                    'evil' : evilngu,
                    'sadistic' : sadngu,
                })
            }
        }
        return retNgus
    })

    const targets = NGUs.map((tyNGUs) => {
        return tyNGUs.map((ngu) => {
            return {
                'normal' : ngu['normal'].getTargetUsingPercent(player.get("nguPercentageIncrease")),
                'evil' : ngu['evil'].getTargetUsingPercent(player.get("nguPercentageIncrease")),
                'sadistic' : ngu['sadistic'].getTargetUsingPercent(player.get("nguPercentageIncrease")),
            }
        })
    })
    
    const seconds = NGUs.map((tyNGUs, index) => {
        let ty = types[index]
        ty = ty[0].toUpperCase() + ty.substring(1)
        return tyNGUs.map((ngu, innerIndex) => {
            return {
                'normal' : ngu['normal'].calcSecondsToTarget(player.get("total" + ty + "Cap"), player.get("total" + ty + "NGUSpeedFactor"), targets[index][innerIndex]['normal']),
                'evil' : ngu['evil'].calcSecondsToTarget(player.get("total" + ty + "Cap"), player.get("total" + ty + "NGUSpeedFactor"), targets[index][innerIndex]['evil']),
                'sadistic' : ngu['sadistic'].calcSecondsToTarget(player.get("total" + ty + "Cap"), player.get("total" + ty + "NGUSpeedFactor"), targets[index][innerIndex]['sadistic']),
            }
        })
    })

    // Information retrieval
    const infoRow = NGUs.map((tyNGUs, index) => {
        // let ty = types[index]
        // ty = ty[0].toUpperCase() + ty.substring(1)
        return tyNGUs.map(function(ngu, innerIndex) {
            const targetLvls = targets[index][innerIndex]
            const secs = seconds[index][innerIndex]

            let minTime = bd(0)
            if(isSadMode(player.get('gameMode'))) {
                minTime = bigdec_min(secs['normal'], secs['evil'], secs['sadistic'])
            } else {
                minTime = bigdec_min(secs['normal'], secs['evil'])
            }

            const minbgClass = 'bg-green-200 dark:bg-green-900 '

            return (
                <tr key={ngu['normal'].key} className={innerIndex % 2 == 0 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                    <td className="px">{ngu['normal'].name}</td>
                    <td className={bigdec_equals(secs['normal'], minTime) ? minbgClass + 'px-2 text-right' : 'px-2 text-right'}><span className={bigdec_equals(secs['normal'], minTime) ? '' : "text-red-500"}>{dn(secs['normal'])}</span></td>
                    <td className={bigdec_equals(secs['normal'], minTime) ? minbgClass + 'px' : 'px'}><span className={bigdec_equals(secs['normal'], minTime) ? '' : "text-blue-500"}>{pn(targetLvls['normal'], fmt)}</span></td>
                    <td className={bigdec_equals(secs['evil'], minTime) ? minbgClass + 'px-2 text-right' : 'px-2 text-right'}><span className={bigdec_equals(secs['evil'], minTime) ? '' : "text-red-500"}>{dn(secs['evil'])}</span></td>
                    <td className={bigdec_equals(secs['evil'], minTime)  ? minbgClass + 'px' : 'px'}><span className={bigdec_equals(secs['evil'], minTime) ? '' : "text-blue-500"}>{pn(targetLvls['evil'], fmt)}</span></td>
                    {
                        isSadMode(player.get('gameMode'))
                        ? <>
                            <td className={bigdec_equals(secs['sadistic'], minTime) ? minbgClass + 'px-2 text-right' : 'px-2 text-right'}><span className={bigdec_equals(secs['sadistic'], minTime) ? '' : "text-red-500"}>{dn(secs['sadistic'])}</span></td>
                            <td className={bigdec_equals(secs['sadistic'], minTime) ? minbgClass + 'px' : 'px'}><span className={bigdec_equals(secs['sadistic'], minTime) ? '' : "text-blue-500"}>{pn(targetLvls['sadistic'], fmt)}</span></td>
                        </>
                        : null
                    }
                </tr>
            )
        })
    })
    const energyRow = infoRow[0]
    const magicRow = infoRow[1]

    if(!isSadMode(player.get('gameMode'))) {
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
                                isSadMode(player.get('gameMode'))
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
                                isSadMode(player.get('gameMode'))
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
                                isSadMode(player.get('gameMode'))
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
                                isSadMode(player.get('gameMode'))
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

