'use client'
import { Dish, Ingredient } from '@/assets/cooking';
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
import _ from 'lodash';
import { ReactElement, useState } from 'react';



export default function Page() {
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired : requiredDataType = [[]]
    
    // Set extra required (not from playerData)
    var extraRequired  : requiredDataType = [[]]
    
    var goRequired : requiredDataType = [[]]
    const playerStates = createStatesForData(extraRequired, goRequired);
    
    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates)
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

    var dish : Dish= j('dish')
    var ings : Ingredient[] = []
    var ingList : ReactElement[] = []
    if(!_.isEmpty(dish)) {
        ings = dish.orderedIngredients()
        ings.forEach((p : Ingredient) => {
            if(p.isUnlocked){
                ingList.push(<li key={p.key} className="inline-block w-1/2"><strong>{p.name}</strong>: <span className="text-green-500">{p.amount()}</span></li>)
            }
        })
        console.log(dish.pairs)
    }

    return (
        <Content title="Cooking" infoRequired={infoReq} extraRequired={extraReq} goRequired={goReq}>
            This page is a work in progress. There might be some errors in calculations.

            <ContentSubsection title="What do I need for 100% meal efficiency?">
                {(_.isEmpty(ings)) 
                    ? <p>
                        Upload your save file for things to show up
                    </p>
                    :
                    <>
                        <p>
                            Trying to cook: <strong className="text-blue-500">{dish.name}</strong>
                        </p>
                        <br />
                        <ul>
                            {ingList}
                        </ul>
                    </>
                }
            </ContentSubsection>
        </Content>
    )
}
