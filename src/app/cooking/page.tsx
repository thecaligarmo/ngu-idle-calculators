'use client'
import { Dish, Ingredient } from '@/assets/cooking';
import Content, { requiredDataType } from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';
import { getNumberFormat } from '@/components/context';
import { isOne } from '@/helpers/numbers';
import { parseNum, parseObj } from '@/helpers/parsers';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import _ from 'lodash';
import { ReactElement } from 'react';



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
    var pairs : Ingredient[][] = []
    var pairList : ReactElement[] = []
    if(!_.isEmpty(dish)) {
        ings = dish.orderedIngredients()
        ings.forEach((p : Ingredient) => {
            if(p.isUnlocked){
                ingList.push(<li key={p.key} className="inline-block w-1/2"><strong>{p.name}</strong>: <span className="text-green-500">{p.amount()}</span> {p.altAmount() ? <span className="text-blue-500">({p.altAmount()})</span> : null}</li>)
            }
        })
        pairs = dish.pairs
        pairs.forEach((p : Ingredient[], ind : number) => {
            let p1 = p[0].isUnlocked ? <>{p[0].name}</> : <strong className='text-red-500'>Locked</strong>
            let p2 = p[1].isUnlocked ? <>{p[1].name}</> : <strong className='text-red-500'>Locked</strong>
            let pkey = p[0].key + p[1].key
            pairList.push(
                <li key={pkey}>Pair {ind+1}: {p1} - {p2}</li>
            )
        })
    }

    return (
        <Content title="Cooking" infoRequired={infoReq} extraRequired={extraReq} goRequired={goReq}>
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
                The amounts in <span className='text-blue-500'>blue</span> are for swapping for pairing (see below).
            </ContentSubsection>
            <ContentSubsection title="Which ingredients are paired?">
            {(_.isEmpty(pairs)) 
                    ? <p>
                        Upload your save file for things to show up
                    </p>
                    :
                    <>
                        <p>
                            Each ingredient comes in a pair which means you can swap the levels and still get max efficiency.
                        </p>
                        <br />
                        <ul>
                            {pairList}
                        </ul>
                    </>
                }
            </ContentSubsection>
        </Content>
    )
}
