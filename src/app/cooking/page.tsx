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
    var pairs : Ingredient[][] = []
    if(!_.isEmpty(dish)) {
        dish.makeOptimal()
        pairs = dish.pairs
    }

    var pairList : ReactElement[] = []
    pairs.forEach((p : Ingredient[]) => {
        if(p[0].isUnlocked){
            pairList.push(<li key={p[0].key}><strong>{p[0].name}</strong> - {p[0].amount()}</li>)
        }
        if(p[1].isUnlocked){
            pairList.push(<li key={p[1].key}><strong>{p[1].name}</strong> - {p[1].amount()}</li>)
        }
    })
    console.log(pairs)


    

    return (
        <Content title="Cooking" infoRequired={infoReq} extraRequired={extraReq} goRequired={goReq}>
            This page is a work in progress. There might be some errors in calculations.

            <p>
                Trying to cook {dish.name}
            </p>
            <ul>
                {pairList}
            </ul>
        </Content>
    )
}
