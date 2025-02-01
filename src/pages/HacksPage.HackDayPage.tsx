import { Hack, HackKeys } from "@/assets/hacks";
import { Stat } from "@/assets/stat";
import { PlusMinusButtons } from "../components/buttons/PlusMinusButtons";
import Content, { requiredDataType } from "../components/Content";
import ContentSubsection from "../components/ContentSubsection";
import { getPlayer, getNumberFormat } from "../components/Context";
import { disableItem } from "../components/dataListColumns";
import { StandardTableRowType, StandardTable } from "../components/StandardTable";
import { bd, lessThan, isZero, toNum, pn, dn } from "@/helpers/numbers";
import { getPlayerDataInfo } from "@/helpers/playerInfo";

export default function HackDayPage() {
    const player = getPlayer();
    const fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired : requiredDataType = [['totalRes3Power', 'totalRes3Cap', 'totalHackSpeed', 'blueHeart'],
        [   
            'hackMilestoneReductionStat',
            'hackMilestoneReductionAdventure',
            'hackMilestoneReductionTimeMachine',
            'hackMilestoneReductionDropChance',
            'hackMilestoneReductionAugment',
            'hackMilestoneReductionENGU',
            'hackMilestoneReductionMNGU',
            'hackMilestoneReductionBlood',
            'hackMilestoneReductionQP',
            'hackMilestoneReductionDaycare',
            'hackMilestoneReductionExp',
            'hackMilestoneReductionNumber',
            'hackMilestoneReductionPP',
            'hackMilestoneReductionHack',
            'hackMilestoneReductionWish',
        ]
    ]
    // Set extra required (not from playerData)
    var extraRequired  : requiredDataType = [['addRes3BetaPotion', 'addRes3DeltaPotion'],
        [
            'hackMilestoneExtraStat',
            'hackMilestoneExtraAdventure',
            'hackMilestoneExtraTimeMachine',
            'hackMilestoneExtraDropChance',
            'hackMilestoneExtraAugment',
            'hackMilestoneExtraENGU',
            'hackMilestoneExtraMNGU',
            'hackMilestoneExtraBlood',
            'hackMilestoneExtraQP',
            'hackMilestoneExtraDaycare',
            'hackMilestoneExtraExp',
            'hackMilestoneExtraNumber',
            'hackMilestoneExtraPP',
            'hackMilestoneExtraHack',
            'hackMilestoneExtraWish',
        ]
    ]
    var goRequired : requiredDataType = [['goResource3Power', 'goResource3Cap', 'goRawHackSpeed']]
    
    // Get required data
    var infoReq = getPlayerDataInfo(infoRequired)
    var extraReq = getPlayerDataInfo(extraRequired)
    var goReq = getPlayerDataInfo(goRequired)


    // We never want to show milestone increases:
    extraReq = disableItem(extraReq, 
        [
            'hackMilestoneExtraStat',
            'hackMilestoneExtraAdventure',
            'hackMilestoneExtraTimeMachine',
            'hackMilestoneExtraDropChance',
            'hackMilestoneExtraAugment',
            'hackMilestoneExtraENGU',
            'hackMilestoneExtraMNGU',
            'hackMilestoneExtraBlood',
            'hackMilestoneExtraQP',
            'hackMilestoneExtraDaycare',
            'hackMilestoneExtraExp',
            'hackMilestoneExtraNumber',
            'hackMilestoneExtraPP',
            'hackMilestoneExtraHack',
            'hackMilestoneExtraWish',
        ]
    )
    
    
    var res3pow = player.get('totalRes3Power')
    if (player.get('addRes3BetaPotion')) {
        res3pow = player.get('blueHeart') ? res3pow.multiply(bd(2.2)) : res3pow.multiply(bd(2))
    }
    if (player.get('addRes3DeltaPotion')) {
        res3pow = player.get('blueHeart') ? res3pow.multiply(bd(3.3)) : res3pow.multiply(bd(3))
    }
    var res3cap = player.get('totalRes3Cap')
    var hackSpeed = player.get('totalHackSpeed')

    
    // Figure out hackday timers
    var hacks : Hack[] = Object.values(player.get('hacks'))
    var hackDayRows : StandardTableRowType = {}
    var doneFindingOptimal = false
    var hackDayTargets : {[k:string] : number} = {}
    var baseHackDayTime = bd(0)

    hacks.forEach((hack) => {
        let hackTarget = hack.getMaxLevelHackDay(res3pow, res3cap, hackSpeed)
        baseHackDayTime = baseHackDayTime.add(hack.getTimeBetweenLevels(res3pow, res3cap, hackSpeed, hackTarget, -1, true))
        hackDayTargets[hack.key] = hackTarget
    })


    // Figure out with hack info

    try{
        var hackHack = hacks[13]
        var hackHackVal = hackHack.getStatValue(Stat.HACK_SPEED)
        var newHackHackLvl = hackHack.level
        var i = 0
        while (!doneFindingOptimal && i < 20) {
            i = i + 1
            var newHackHackLvl = hackHack.getNextMilestone(newHackHackLvl)
            var newHackHackVal = hackHack.getStatValue(Stat.HACK_SPEED, newHackHackLvl)
            var newHackSpeed = hackSpeed.divide(bd(hackHackVal)).multiply(bd(newHackHackVal))
            var newHackDayTime = bd(0)//hackHack.getTimeBetweenLevels(res3pow, res3cap, hackSpeed, newHackHackLvl)
            var newHackDayTargets : any = {}

            hacks.forEach((hack) => {
                if (hack.key == HackKeys.HACK) {
                    var hackTarget = newHackHackLvl
                } else {
                    var hackTarget = hackDayTargets[hack.key]
                }
                var minHackTime = hack.getTimeBetweenLevels(res3pow, res3cap, newHackSpeed, hackTarget)
                newHackDayTime = newHackDayTime.add(minHackTime)
                newHackDayTargets[hack.key] = hackTarget
            })
            
            if(lessThan(newHackDayTime, baseHackDayTime) || lessThan(newHackDayTime, bd(28 * 60 * 60))) {
                hackDayTargets = newHackDayTargets
                baseHackDayTime = newHackDayTime
            } else {
                doneFindingOptimal = true
            }
        }
    } catch {

    }

    // Fix extra targets
    var totalHackDayTimeMin = bd(0)
    var totalHackDayTimeMax = bd(0)
    try {
        var hackHack = hacks[13]
        var hackHackVal = hackHack.getStatValue(Stat.HACK_SPEED)
        var hackHackTarget = hackDayTargets[hackHack.key]
        if (!isZero(player.get(hackHack.getMilestoneExtraName()))) {
            let targetMilestone = hackHack.getMilestone(hackHackTarget) + toNum(player.get(hackHack.getMilestoneExtraName()))
            hackHackTarget = hackHack.getMilestoneLevel(targetMilestone)
        }
        var newHackHackVal = hackHack.getStatValue(Stat.HACK_SPEED, hackHackTarget)
        var newHackSpeed = hackSpeed.divide(bd(hackHackVal)).multiply(bd(newHackHackVal))
        hacks.forEach((hack) => {
            var curVal = hack.getStatValue()
            var hackTarget = hackDayTargets[hack.key]

            if (!isZero(player.get(hack.getMilestoneExtraName()))) {
                let targetMilestone = hack.getMilestone(hackTarget) + toNum(player.get(hack.getMilestoneExtraName()))
                hackTarget = hack.getMilestoneLevel(targetMilestone)
            }

            var newHackVal = hack.getStatValue('', hackTarget)
            var hackTime = hack.getTimeBetweenLevels(res3pow, res3cap, hackSpeed, hackTarget, -1, true)
            
            var minHackTime = hack.getTimeBetweenLevels(res3pow, res3cap, newHackSpeed, hackTarget)
            totalHackDayTimeMin = totalHackDayTimeMin.add(minHackTime)
            totalHackDayTimeMax = totalHackDayTimeMax.add(hackTime)
            var milestoneChange = Math.ceil((hackTarget - hack.level) / hack.levelsPerMilestone())

            hackDayRows[hack.key] = {
                'name' : hack.name,
                'level' : <>{pn(hack.level, fmt, 0)}</>,
                'bonus' : <>{pn(curVal, fmt, 2)}%</>,
                'target' : <>{pn(hackTarget, fmt)}</>,
                'tBonus' : <>{pn(newHackVal, fmt, 2)}%</>,
                'milestoneChange' : <>{milestoneChange > 0 ? "+" : ""}{pn(milestoneChange, fmt, 0)}<PlusMinusButtons player={player} keyName={hack.getMilestoneExtraName()} /></>,
                'time' : <>{dn(hackTime)}</>,
                'minTime' : <>{dn(minHackTime)}</>,
                'change' : <>x {pn(newHackVal / curVal, fmt)} = </>
            }
        })
    } catch {

    }


    hackDayRows['total'] = {
        'name' : "Total",
        'isTotal' : true,
        'time' : <>{dn(totalHackDayTimeMax)}</>,
        'minTime': <>{dn(totalHackDayTimeMin)}</>
    }



     

    var hackDayOrder = ['name', 'level', 'target', 'milestoneChange', 'bonus', 'change', 'tBonus', 'time', 'minTime']
    var hackHeader = {
        'name' : "Name",
        'level' : "Current Level",
        'bonus' : "Current Bonus",
        'milestoneChange': "Milestone Increase",
        'target' : "Target Level",
        'change' : "Bonus Increase Amount",
        'tBonus' : "Target Bonus Amount",
        'time' : "Max Time Taken",
        'minTime' : "Min Time Taken",
    }

    var extraClasses = {
        "time": "text-right text-red-500",
        "minTime": "text-right text-red-500",
        "target": "text-blue-500",
        'tBonus': "text-blue-500",
        "change": "text-green-500",
        "milestoneChange" : "text-right",
    }

    
    var preChildren = (<p>This page will calculate the milestones needed to perform a 24 hour hackday.</p>)

    return (
        <Content title="Hacks" infoRequired={infoReq} extraRequired={extraReq} goRequired={goReq} prechildren={preChildren}>
            This page is a work in progress. There might be some errors in calculations.
            <ContentSubsection title="How do I setup my hackday?">
                The max time taken is if you do the Hack hack last and the min time take is if you do it first.
                <StandardTable order={hackDayOrder} header={hackHeader} rows={hackDayRows} extraRowClasses={extraClasses}/>
            </ContentSubsection>
        </Content>
    )
}
