'use client'
import { Hack } from '@/assets/hacks';
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
    var infoRequired : requiredDataType = [['totalRes3Power', 'totalRes3Cap', 'totalHackSpeed%'],
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
    var extraRequired  : requiredDataType = [['percentIncrease%']
    ]
    var goRequired : requiredDataType = [['goResource3Power%', 'goResource3Cap%', 'goHacks%']]
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
            'target' : <>{pn(hack.getLevelFromVal(targetVal), fmt)}</>,
            'tBonus' : <>{pn(newTargetVal, fmt, 2)}%</>,
            'change' : <>x {pn(newTargetVal/curVal, fmt)} = </>,
            'time' : <>{dn(time)}</>,
        }
    })

    // Figure out hackday timers
    var hackDayRows : StandardTableRowType = {}
    var hackDayTime = bd(0)
    var done = false

    hacks.forEach((hack) => {
        var curVal = hack.getStatValue()  
        var hackTarget = hack.getMaxLevelHackDay(res3pow, res3cap, hackSpeed)
        var newHackVal = hack.getStatValue('', hackTarget)
        var hackTime = hack.getTimeBetweenLevels(res3pow, res3cap, hackSpeed, hackTarget)
        hackDayTime = hackDayTime.add(hackTime)

        hackDayRows[hack.key] = {
            'name' : hack.name,
            'level' : <>{pn(hack.level, fmt, 0)}</>,
            'bonus' : <>{pn(curVal, fmt, 2)}%</>,
            'target' : <>{pn(hackTarget, fmt)}</>,
            'tBonus' : <>{pn(newHackVal, fmt, 2)}</>,
            'time' : <>{dn(hackTime)}</>,
            'change' : <>x {pn(newHackVal / curVal, fmt)} = </>
        }
    })

    try{
        var hackHack = hacks[13]
        var hackHackVal = hackHack.getStatValue(Stat.HACK_SPEED)
        var hackHackLvl = hackHack.level
        var i = 0
        while (i < 2) {
            i = i + 1
            var newHackHackLvl = hackHackLvl + i * hackHack.levelsPerMilestone()
            var newHackHackVal = hackHack.getStatValue(Stat.HACK_SPEED, newHackHackLvl)
            var newHackSpeed = hackSpeed.divide(bd(hackHackVal)).multiply(bd(newHackHackVal))
            var newHackDayTime = hackHack.getTimeBetweenLevels(res3pow, res3cap, hackSpeed, newHackHackLvl)

            var newHackDayRows : StandardTableRowType = {}
            hacks.forEach((hack) => {
                var curVal = hack.getStatValue()  
                var hackTarget = hack.getMaxLevelHackDay(res3pow, res3cap, newHackSpeed)
                var newHackVal = hack.getStatValue('', hackTarget)
                var hackTime = hack.getTimeBetweenLevels(res3pow, res3cap, newHackSpeed, hackTarget)
                newHackDayTime = newHackDayTime.add(hackTime)
        
                newHackDayRows[hack.key] = {
                    'name' : hack.name,
                    'level' : <>{pn(hack.level, fmt, 0)}</>,
                    'bonus' : <>{pn(curVal, fmt, 2)}%</>,
                    'target' : <>{pn(hackTarget, fmt)}</>,
                    'tBonus' : <>{pn(newHackVal, fmt, 2)}</>,
                    'time' : <>{dn(hackTime)}</>,
                    'change' : <>x {pn(newHackVal / curVal, fmt)} = </>
                }
            })
            if(lessThan(newHackDayTime, hackDayTime)) {
                hackDayRows = newHackDayRows
            } else {
                done = true
            }
        }
    } catch {

    }



    hackDayRows['total'] = {
        'name' : "Total",
        'isTotal' : true,
        'time' : <>{dn(hackDayTime)}</>,
    }
     

    var hackOrder = ['name', 'level', 'target', 'bonus', 'change', 'tBonus', 'time']
    var hackDayOrder = ['name', 'level', 'target', 'bonus', 'change', 'tBonus', 'time']
    var hackHeader = {
        'name' : "Name",
        'level' : "Current Level",
        'bonus' : "Bonus",
        'target' : "Target Level",
        'change' : "Increase Amount",
        'tBonus' : "Bonus Amount",
        'time' : "Time Taken",
    }

    var extraClasses = {
        "time": "text-right text-red-500",
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
