'use client'
import { Hack } from '@/assets/hacks';
import { ChoiceButton, PlusMinusButtons } from '@/components/buttons';
import Content, { requiredDataType } from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';
import { getNumberFormat } from '@/components/context';
import { disableItem } from '@/components/dataListColumns';
import { StandardTable, StandardTableRowType } from '@/components/standardTable';
import { bd, dn, greaterThan, isOne, isZero, pn, toNum } from '@/helpers/numbers';
import { parseNum, parseObj } from '@/helpers/parsers';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import { useState } from 'react';

const HACKS_TARGET = 'target'
const HACKS_PERCENTAGE = 'percentage'
const HACKS_MILESTONE = 'milestone'

export default function Page() {
    const [calcType, setCalcType] = useState(HACKS_TARGET)
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired : requiredDataType = [['totalRes3Power', 'totalRes3Cap', 'totalHackSpeed%', 'blueHeart^'],
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
        ],
        [
            'hackStatTarget',
            'hackAdventureTarget',
            'hackTimeMachineTarget',
            'hackDropChanceTarget',
            'hackAugmentTarget',
            'hackENGUTarget',
            'hackMNGUTarget',
            'hackBloodTarget',
            'hackQPTarget',
            'hackDaycareTarget',
            'hackExpTarget',
            'hackNumberTarget',
            'hackPPTarget',
            'hackHackTarget',
            'hackWishTarget',
        ]
    ]
    // Set extra required (not from playerData)
    var extraRequired  : requiredDataType = [['percentIncrease%','milestoneIncrease-2','addRes3BetaPotion^', 'addRes3DeltaPotion^'],
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
    var goRequired : requiredDataType = [['goResource3Power%', 'goResource3Cap%', 'goRawHackSpeed%']]
    const playerStates = createStatesForData(extraRequired, goRequired);
    
    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates, {
        'hackMilestoneReductionStat' : 'Attack/Defense Milestone Reduction',
        'hackMilestoneReductionAdventure' : 'Adventure Milestone Reduction',
        'hackMilestoneReductionTimeMachine' : 'Time Machine Milestone Reduction',
        'hackMilestoneReductionDropChance' : 'Drop Chance Milestone Reduction',
        'hackMilestoneReductionAugment' : 'Augment Milestone Reduction',
        'hackMilestoneReductionENGU' : 'Energy NGU Milestone Reduction',
        'hackMilestoneReductionMNGU' : 'Magic NGU Milestone Reduction',
        'hackMilestoneReductionBlood' : 'Blood Milestone Reduction',
        'hackMilestoneReductionQP' : 'QP Milestone Reduction',
        'hackMilestoneReductionDaycare' : 'Daycare Milestone Reduction',
        'hackMilestoneReductionExp' : 'Experience Milestone Reduction',
        'hackMilestoneReductionNumber' : 'Number Milestone Reduction',
        'hackMilestoneReductionPP' : 'PP Milestone Reduction',
        'hackMilestoneReductionHack' : 'Hack Milestone Reduction',
        'hackMilestoneReductionWish' : 'Wish Milestone Reduction',
    })
    var extraReq = getRequiredStates(extraRequired, playerStates)
    var goReq = getRequiredStates(goRequired, playerStates)

    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        return parseNum(playerStates, key)
    }

    function j(key : string) : any{
        return parseObj(playerStates, key)
    }

    function c(key : string) : boolean {
        return isOne(v(key))
    }
    
    
    var res3pow = v('totalRes3Power')
    if (c('addRes3BetaPotion^')) {
        res3pow = c('blueHeart^') ? res3pow.multiply(bd(2.2)) : res3pow.multiply(bd(2))
    }
    if (c('addRes3DeltaPotion^')) {
        res3pow = c('blueHeart^') ? res3pow.multiply(bd(3.3)) : res3pow.multiply(bd(3))
    }
    var res3cap = v('totalRes3Cap')
    var hackSpeed = v('totalHackSpeed%')

    var hacks : Hack[] = Object.values(j('hacks'))
    var hackRows : StandardTableRowType = {}
    var totalTime = bd(0)
    hacks.forEach((hack) => {
        hack.milestoneReduction = toNum(v(hack.getMilestoneReductionName()))
        var curVal = hack.getStatValue()
        var milestone = hack.getMilestone()
        if (calcType == HACKS_PERCENTAGE) {
            var targetVal = curVal * (toNum(v('percentIncrease%')) / 100 + 1)
            var target = hack.getLevelFromVal(targetVal)
        } else if (calcType == HACKS_MILESTONE) {
            var target = hack.getMilestoneLevel(milestone + toNum(v('milestoneIncrease-2')))
        } else if (calcType == HACKS_TARGET) {
            var target = toNum(v(hack.getTargetName()))
        } else {
            var target = hack.level
        }

        var targetMilestone = hack.getMilestone(target)
        if (!isZero(v(hack.getMilestoneExtraName()))) {
            targetMilestone = targetMilestone + toNum(v(hack.getMilestoneExtraName()))
            target = hack.getMilestoneLevel(targetMilestone)
        }
        
        var newTargetVal = hack.getStatValue('', target) // Not necessarily the same as tVal since levels are discrete
        var time = hack.getTimeBetweenLevels(res3pow, res3cap, hackSpeed, target)
        totalTime = totalTime.add(time)
        var milestoneChange = targetMilestone - milestone
        
        hackRows[hack.key] = {
            'name' : hack.name,
            'level' : <>{pn(hack.level, fmt, 0)}</>,
            'bonus' : <>{pn(curVal, fmt, 2)}%</>,
            'target' : <>{pn(target, fmt)}</>,
            'tBonus' : <>{pn(newTargetVal, fmt, 2)}%</>,
            'change' : <>x {pn(newTargetVal/curVal, fmt, 3)} = </>,
            'milestoneChange' : <>{milestoneChange > 0 ? "+" : ""}{pn(milestoneChange, fmt, 0)}<PlusMinusButtons state={playerStates} keyName={hack.getMilestoneExtraName()} /></>,
            'time' : <>{dn(time)}</>,
        }
    })

    hackRows['total'] = {
        'name' : "Total",
        'isTotal' : true,
        'time' : <>{dn(totalTime)}</>,
    }
     

    var hackOrder = ['name', 'level', 'target', 'milestoneChange', 'bonus', 'change', 'tBonus', 'time']
    var hackHeader = {
        'name' : "Name",
        'level' : "Current Level",
        'bonus' : "Current Bonus",
        'milestoneChange': "Milestone Increase",
        'target' : "Target Level",
        'change' : "Bonus Increase Amount",
        'tBonus' : "Target Bonus Amount",
        'time' : "Time Taken",
        'minTime' : "Min Time Taken",
    }

    var extraClasses = {
        "time": "text-right text-red-500",
        "minTime": "text-right text-red-500",
        "target": "text-blue-500",
        'tBonus': "text-blue-500",
        "change": "text-green-500",
        "milestoneChange": "text-right",
    }


    var titleText = "How long does it take to increase hacks "
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
    switch (calcType) {
        case HACKS_TARGET:
            titleText += "using targets?"
            extraReq = disableItem(extraReq, ['percentIncrease%','milestoneIncrease-2']);
            break;
        case HACKS_PERCENTAGE:
            titleText += "by a percent of the stat value?"
            extraReq = disableItem(extraReq, ['milestoneIncrease-2']);
            infoReq = disableItem(infoReq, [
                'hackStatTarget',
                'hackAdventureTarget',
                'hackTimeMachineTarget',
                'hackDropChanceTarget',
                'hackAugmentTarget',
                'hackENGUTarget',
                'hackMNGUTarget',
                'hackBloodTarget',
                'hackQPTarget',
                'hackDaycareTarget',
                'hackExpTarget',
                'hackNumberTarget',
                'hackPPTarget',
                'hackHackTarget',
                'hackWishTarget',
            ])
            break;
        case HACKS_MILESTONE:
            titleText += "using milestones?"
            extraReq = disableItem(extraReq, ['percentIncrease%']);
            infoReq = disableItem(infoReq, [
                'hackStatTarget',
                'hackAdventureTarget',
                'hackTimeMachineTarget',
                'hackDropChanceTarget',
                'hackAugmentTarget',
                'hackENGUTarget',
                'hackMNGUTarget',
                'hackBloodTarget',
                'hackQPTarget',
                'hackDaycareTarget',
                'hackExpTarget',
                'hackNumberTarget',
                'hackPPTarget',
                'hackHackTarget',
                'hackWishTarget',
            ])
            break;
    }
    

    var topButtons = (
        <>
            <p>How would you like to calculate Hacks?</p>
            <ChoiceButton text="Using Targets" onClick={() => setCalcType(HACKS_TARGET)} active={calcType==HACKS_TARGET} />
            <ChoiceButton text="Using Percentage of Current Value" onClick={() => setCalcType(HACKS_PERCENTAGE)}  active={calcType==HACKS_PERCENTAGE} />
            <ChoiceButton text="Using Milestones" onClick={() => setCalcType(HACKS_MILESTONE)}  active={calcType==HACKS_MILESTONE} />
        </>
    )
    

    return (
        <Content prechildren={topButtons} title="Hacks" infoRequired={infoReq} extraRequired={extraReq} goRequired={goReq}>
            This page is a work in progress. There might be some errors in calculations.
            <ContentSubsection title={titleText}>
                <StandardTable order={hackOrder} header={hackHeader} rows={hackRows} extraRowClasses={extraClasses}/>
            </ContentSubsection>
        </Content>
    )
}
