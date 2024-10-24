'use client'
import { Wish, WISHES } from '@/assets/wish';
import Content from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';
import { getNumberFormat } from '@/components/context';
import { StandardTable, StandardTableRowType } from '@/components/standardTable';
import { bd, dn, isOne, pn } from '@/helpers/numbers';
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
    var [optWishChosen, setOptWishChosen] = useState("current")
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired = [
        [['wishSlots-1', 1], 'totalEnergyPower', 'totalEnergyCap', 'totalMagicPower', 'totalMagicCap', 'totalRes3Power', 'totalRes3Cap', 'totalWishSpeed%']
    ]
    // Set extra required (not from playerData)
    var extraRequired  : (string | [string, number])[][] = [
        [['customPercentage%', 1]]
    ]
    const playerStates = createStatesForData(extraRequired);
    
    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates)
    var extraReq = getRequiredStates(extraRequired, playerStates)

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

    var gameMode = v('gameMode')
    var wishes : Wish[] = j('wishes')
    var wishSlots = Number(v('wishSlots-1').getValue())

    var extraChildren = (
        <>
            <strong>Wish to look at:</strong> <select
                className="ml-2 text-black"
                onChange={(e) =>{
                    setOptWishChosen(e.target.value)
                }}
                value={optWishChosen}
            >
                <option key="current" value="current">Select a Wish</option>
                {getWIshList(wishes, gameMode)}
            </select>
        </>
    )

    var chosenWish : Wish = WISHES[0]
    if (wishes.length > 0) {
        if(optWishChosen == 'current') {
            for (var wish of wishes) {
                if (!wish.completed() && wish.appliesToGameMode(gameMode)) {
                    setOptWishChosen(wish.key)
                    break
                }
            }
        } else {
            for (var wish of wishes) {
                if(wish.key == optWishChosen) {
                    chosenWish = wish
                    break
                }
            }
        }
    }

    var caps = {
        '100' : {
            'energy' : v('totalEnergyCap'),
            'magic' : v('totalMagicCap'),
            'res3' : v('totalRes3Cap'),
        },
        '50' : {
            'energy' : v('totalEnergyCap').divide(bd(2)),
            'magic' : v('totalMagicCap').divide(bd(2)),
            'res3' : v('totalRes3Cap').divide(bd(2)),
        },
        '33' : {
            'energy' : v('totalEnergyCap').divide(bd(3)),
            'magic' : v('totalMagicCap').divide(bd(3)),
            'res3' : v('totalRes3Cap').divide(bd(3)),
        },
        '25' : {
            'energy' : v('totalEnergyCap').divide(bd(4)),
            'magic' : v('totalMagicCap').divide(bd(4)),
            'res3' : v('totalRes3Cap').divide(bd(4)),
        },
        'custom' : {
            'energy' : v('totalEnergyCap').multiply(v('customPercentage%')).divide(bd(100)),
            'magic' : v('totalMagicCap').multiply(v('customPercentage%')).divide(bd(100)),
            'res3' : v('totalRes3Cap').multiply(v('customPercentage%')).divide(bd(100)),
        },
    }

    var wishRows : StandardTableRowType = {}
    for (let lev = chosenWish.level; lev < chosenWish.maxLevel; lev++) {
        let capsNeeded = chosenWish.capToMaxLevel(v('totalEnergyPower'), caps['100']['energy'], v('totalMagicPower'), caps['100']['magic'], v('totalRes3Power'), caps['100']['res3'], v('totalWishSpeed%'), lev)
        
        wishRows[chosenWish.key + lev.toString()] = {
            'level' : lev + 1,
            '100' : <>{dn(chosenWish.timeToFinish(v('totalEnergyPower'), caps['100']['energy'], v('totalMagicPower'), caps['100']['magic'], v('totalRes3Power'), caps['100']['res3'], v('totalWishSpeed%'), lev))}</>,
            '50' : <>{dn(chosenWish.timeToFinish(v('totalEnergyPower'), caps['50']['energy'], v('totalMagicPower'), caps['50']['magic'], v('totalRes3Power'), caps['50']['res3'], v('totalWishSpeed%'), lev))}</>,
            '33' : <>{dn(chosenWish.timeToFinish(v('totalEnergyPower'), caps['33']['energy'], v('totalMagicPower'), caps['33']['magic'], v('totalRes3Power'), caps['33']['res3'], v('totalWishSpeed%'), lev))}</>,
            '25' : <>{dn(chosenWish.timeToFinish(v('totalEnergyPower'), caps['25']['energy'], v('totalMagicPower'), caps['25']['magic'], v('totalRes3Power'), caps['25']['res3'], v('totalWishSpeed%'), lev))}</>,
            'custom' : <>{dn(chosenWish.timeToFinish(v('totalEnergyPower'), caps['custom']['energy'], v('totalMagicPower'), caps['custom']['magic'], v('totalRes3Power'), caps['custom']['res3'], v('totalWishSpeed%'), lev))}</>,
            'energy' : <>{pn(capsNeeded['energy'], fmt)}</>,
            'magic' : <>{pn(capsNeeded['magic'], fmt)}</>,
            'res3' : <>{pn(capsNeeded['res3'], fmt)}</>,
        }           
        
    }
    
     

    var wishCapOrder = ['level', '100', '50', '33', '25', 'custom']
    var wishCapHeader = {
        'level' : "Level",
        '100' : "100% of Caps",
        '50' : "50%",
        '33' : "33%",
        '25' : "25%",
        'custom' : v('customPercentage%').getValue() + "% of Caps",
    }
    
    var wishMaxOrder = ['level', 'energy', 'magic', 'res3']
    var wishMaxHeader = {
        'level': "Level",
        'energy' : "Energy Cap",
        'magic' : "Magic Cap",
        'res3' : "Resource 3 Cap"
    }

    var extraClasses = {
        "energy": "text-green-500",
        "magic": "text-blue-500",
        "res3": "text-red-500",
        '100' : (wishSlots == 1) ? "text-green-500 text-right" : "text-right",
        '50' : (wishSlots == 2) ? "text-green-500 text-right" : "text-right",
        '33' : (wishSlots == 3) ? "text-green-500 text-right" : "text-right",
        '25' : (wishSlots == 4) ? "text-green-500 text-right" : "text-right",
        'custom' : "text-blue-500 text-right"
    }

    return (
        <Content title="Wishes" infoRequired={infoReq} extraRequired={extraReq} extraChildren={extraChildren}>
            Chosen Wish: <select
                className="ml-2 text-black"
                onChange={(e) =>{
                    setOptWishChosen(e.target.value)
                }}
                value={optWishChosen}
            >
                <option key="current" value="current">Select a Wish</option>
                {getWIshList(wishes, gameMode)}
            </select>
            <ContentSubsection title="How long will it take to finish my wish with a % of cap?">
                The column in green is if you split your resources equally between all your wish slots. The column in blue is the custom % defined above.
                <StandardTable order={wishCapOrder} header={wishCapHeader} rows={wishRows} extraRowClasses={extraClasses} />
            </ContentSubsection>
            <ContentSubsection title="What cap do I need to max my wish time?">
                <StandardTable order={wishMaxOrder} header={wishMaxHeader} rows={wishRows} extraRowClasses={extraClasses}/>
            </ContentSubsection>
        </Content>
    )
}
