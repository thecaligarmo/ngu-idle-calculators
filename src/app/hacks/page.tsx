'use client'
import { Hack, HackKeys } from '@/assets/hacks';
import { Stat } from '@/assets/stat';
import { Wish, WISHES } from '@/assets/wish';
import Content, { requiredDataType } from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';
import { getNumberFormat } from '@/components/context';
import { StandardTable, StandardTableRowType } from '@/components/standardTable';
import { bd, dn, isOne, lessThan, pn, toNum } from '@/helpers/numbers';
import { parseNum, parseObj } from '@/helpers/parsers';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import { ReactElement, useState } from 'react';

function getWIshList(wishes : Wish[], gameMode : bigDecimal) : ReactElement[]{
    var wishOptions : ReactElement[] = []
    if (wishes.length > 0) {
        for (var wish of wishes) {
            if((!wish.completed() && wish.appliesToGameMode(gameMode))) {
                wishOptions.push(<option key={wish.key} value={wish.key}>
                    {wish.id} - {wish.name}
                </option>)
            }
        }
    }
    return wishOptions;
}

export default function Page() {
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired : requiredDataType = [['totalRes3Power', 'totalRes3Cap', 'totalHackSpeed%', 'blueHeart^'],
        [   
            'hackMilestoneStat',
            'hackMilestoneAdventure',
            'hackMilestoneTimeMachine',
            'hackMilestoneDropChance',
            'hackMilestoneAugment',
            'hackMilestoneENGU',
            'hackMilestoneMNGU',
            'hackMilestoneBlood',
            'hackMilestoneQP',
            'hackMilestoneDaycare',
            'hackMilestoneExp',
            'hackMilestoneNumber',
            'hackMilestonePP',
            'hackMilestoneHack',
            'hackMilestoneWish',
        ]
    ]
    // Set extra required (not from playerData)
    var extraRequired  : requiredDataType = [['percentIncrease%','addRes3BetaPotion^', 'addRes3DeltaPotion^']
    ]
    var goRequired : requiredDataType = [['goResource3Power%', 'goResource3Cap%', 'goRawHackSpeed%']]
    const playerStates = createStatesForData(extraRequired, goRequired);
    
    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates, {
        'hackMilestoneStat' : 'Attack/Defense Milestones',
        'hackMilestoneAdventure' : 'Adventure Milestones',
        'hackMilestoneTimeMachine' : 'Time Machine Milestones',
        'hackMilestoneDropChance' : 'Drop Chance Milestones',
        'hackMilestoneAugment' : 'Augment Milestones',
        'hackMilestoneENGU' : 'Energy NGU Milestones',
        'hackMilestoneMNGU' : 'Magic NGU Milestones',
        'hackMilestoneBlood' : 'Blood Milestones',
        'hackMilestoneQP' : 'QP Milestones',
        'hackMilestoneDaycare' : 'Daycare Milestones',
        'hackMilestoneExp' : 'Experience Milestones',
        'hackMilestoneNumber' : 'Number Milestones',
        'hackMilestonePP' : 'PP Milestones',
        'hackMilestoneHack' : 'Hack Milestones',
        'hackMilestoneWish' : 'Wish Milestones',
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
    hacks.forEach((hack) => {
        hack.milestoneReduction = toNum(v(hack.getMilestoneName()))
        var curVal = hack.getStatValue()
        var targetVal = curVal * (toNum(v('percentIncrease%')) / 100 + 1)
        var target = hack.getLevelFromVal(targetVal)
        var newTargetVal = hack.getStatValue('', target) // Not necessarily the same as tVal since levels are discrete
        var time = hack.getTimeBetweenLevels(res3pow, res3cap, hackSpeed, target)

        hackRows[hack.key] = {
            'name' : hack.name,
            'level' : <>{pn(hack.level, fmt, 0)}</>,
            'bonus' : <>{pn(curVal, fmt, 2)}%</>,
            'target' : <>{pn(target, fmt)}</>,
            'tBonus' : <>{pn(newTargetVal, fmt, 2)}%</>,
            'change' : <>x {pn(newTargetVal/curVal, fmt, 3)} = </>,
            'time' : <>{dn(time)}</>,
        }
    })

    // Figure out hackday timers
    var hackDayRows : StandardTableRowType = {}
    var hackDayTime = bd(0)
    var doneFindingOptimal = false

    hacks.forEach((hack) => {
        var curVal = hack.getStatValue()
        var hackTarget = hack.getMaxLevelHackDay(res3pow, res3cap, hackSpeed)
        var newHackVal = hack.getStatValue('', hackTarget)
        var hackTime = hack.getTimeBetweenLevels(res3pow, res3cap, hackSpeed, hackTarget)
        hackDayTime = hackDayTime.add(hackTime)
        var milestoneChange = Math.ceil((hackTarget - hack.level) / hack.levelsPerMilestone())

        hackDayRows[hack.key] = {
            'name' : hack.name,
            'level' : <>{pn(hack.level, fmt, 0)}</>,
            'bonus' : <>{pn(curVal, fmt, 2)}%</>,
            'target' : <>{pn(hackTarget, fmt)}</>,
            'tBonus' : <>{pn(newHackVal, fmt, 2)}%</>,
            'milestoneChange' : <>+{pn(milestoneChange, fmt)}</>,
            'time' : <>{dn(hackTime)}</>,
            'minTime' : <>{dn(hackTime)}</>,
            'change' : <>x {pn(newHackVal / curVal, fmt, 3)} = </>
        }
    })


    var minHackDayTime = hackDayTime
    try{
        var hackHack = hacks[13]
        var hackHackVal = hackHack.getStatValue(Stat.HACK_SPEED)
        var newHackHackLvl = hackHack.level
        var i = 0
        while (!doneFindingOptimal && i < 10) {
            i = i + 1
            var newHackHackLvl = hackHack.getNextMilestone(newHackHackLvl)
            var newHackHackVal = hackHack.getStatValue(Stat.HACK_SPEED, newHackHackLvl)
            var newHackSpeed = hackSpeed.divide(bd(hackHackVal)).multiply(bd(newHackHackVal))
            var newHackDayTime = bd(0)//hackHack.getTimeBetweenLevels(res3pow, res3cap, hackSpeed, newHackHackLvl)

            var newHackDayRows : StandardTableRowType = {}
            hacks.forEach((hack) => {
                var curVal = hack.getStatValue()
                if (hack.key == HackKeys.HACK) {
                    var hackTarget = newHackHackLvl
                } else {
                    var hackTarget = hack.getMaxLevelHackDay(res3pow, res3cap, hackSpeed)
                }
                var newHackVal = hack.getStatValue('', hackTarget)
                var hackTime = hack.getTimeBetweenLevels(res3pow, res3cap, hackSpeed, hackTarget)
                var minHackTime = hack.getTimeBetweenLevels(res3pow, res3cap, newHackSpeed, hackTarget)
                newHackDayTime = newHackDayTime.add(minHackTime)
                var milestoneChange = Math.ceil((hackTarget - hack.level) / hack.levelsPerMilestone())

        
                newHackDayRows[hack.key] = {
                    'name' : hack.name,
                    'level' : <>{pn(hack.level, fmt, 0)}</>,
                    'bonus' : <>{pn(curVal, fmt, 2)}%</>,
                    'target' : <>{pn(hackTarget, fmt)}</>,
                    'tBonus' : <>{pn(newHackVal, fmt, 2)}%</>,
                    'milestoneChange' : <>+{pn(milestoneChange, fmt)}</>,
                    'time' : <>{dn(hackTime)}</>,
                    'minTime' : <>{dn(minHackTime)}</>,
                    'change' : <>x {pn(newHackVal / curVal, fmt)} = </>
                }
            })
            // console.log(i, newHackDayTime.getValue(), minHackDayTime.getValue(), newHackDayRows)
            if(lessThan(newHackDayTime, minHackDayTime) || lessThan(newHackDayTime, bd(28 * 60 * 60))) {
                hackDayRows = newHackDayRows
                minHackDayTime = newHackDayTime
            } else {
                doneFindingOptimal = true
            }
        }
    } catch {

    }


    hackDayRows['total'] = {
        'name' : "Total",
        'isTotal' : true,
        'time' : <>{dn(hackDayTime)}</>,
        'minTime': <>{dn(minHackDayTime)}</>
    }
     

    var hackOrder = ['name', 'level', 'target', 'bonus', 'change', 'tBonus', 'time']
    var hackDayOrder = ['name', 'level', 'target', 'milestoneChange', 'bonus', 'change', 'tBonus', 'time', 'minTime']
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
    }

    
    

    return (
        <Content title="Hacks" infoRequired={infoReq} extraRequired={extraReq} goRequired={goReq}>
            This page is a work in progress. There might be some errors in calculations.
            <ContentSubsection title="How do I setup my hackday?">
                <StandardTable order={hackDayOrder} header={hackHeader} rows={hackDayRows} extraRowClasses={extraClasses}/>
            </ContentSubsection>
            <ContentSubsection title="How long to go up by a percent?">
                <StandardTable order={hackOrder} header={hackHeader} rows={hackRows} extraRowClasses={extraClasses}/>
            </ContentSubsection>
        </Content>
    )
}
