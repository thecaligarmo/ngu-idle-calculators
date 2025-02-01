import { Dish, Ingredient } from "@/assets/cooking";
import { getPlayerDataInfo } from "@/helpers/playerInfo";
import _ from "lodash";
import { ReactElement } from "react";
import Content, { requiredDataType } from "../components/Content";
import ContentSubsection from "../components/ContentSubsection";
import { getPlayer } from "../components/Context";



export default function CookingPage() {
    // const fmt = getNumberFormat();
    const player = getPlayer();

    // Set data required (from playerData)
    const infoRequired : requiredDataType = [[]]
    
    // Set extra required (not from playerData)
    const extraRequired  : requiredDataType = [[]]
    const goRequired : requiredDataType = [[]]
    
    // Get required data
    const infoReq = getPlayerDataInfo(infoRequired)
    const extraReq = getPlayerDataInfo(extraRequired)
    const goReq = getPlayerDataInfo(goRequired)


    const dish : Dish= player.get('dish')
    let ings : Ingredient[] = []
    const ingList : ReactElement[] = []
    let pairs : Ingredient[][] = []
    const pairList : ReactElement[] = []
    if(!_.isEmpty(dish)) {
        ings = dish.orderedIngredients()
        ings.forEach((p : Ingredient) => {
            if(p.isUnlocked){
                ingList.push(<li key={p.key} className="inline-block w-1/2"><strong>{p.name}</strong>: <span className="text-green-500">{p.amount()}</span> {p.altAmount() ? <span className="text-violet-500">(alt: {p.altAmount()})</span> : null}</li>)
            }
        })
        pairs = dish.pairs
        pairs.forEach((p : Ingredient[], ind : number) => {
            const p1 = p[0].isUnlocked ? <>{p[0].name}</> : <strong className='text-red-500'>Locked</strong>
            const p2 = p[1].isUnlocked ? <>{p[1].name}</> : <strong className='text-red-500'>Locked</strong>
            const pkey = p[0].key + p[1].key
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
                The amounts in <span className='text-violet-500'>purple</span> are for swapping for pairing (see below). If you use the alt number for one item, you *must* also use the alt number for its pair.
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
