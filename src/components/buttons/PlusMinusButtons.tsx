import Player from "@/assets/player"
import { playerDataInfo } from "@/assets/playerData"
import { toNum } from "@/helpers/numbers"

export function PlusMinusButtons({player, keyName} : {player : Player, keyName : string}) {
    if(keyName in playerDataInfo) {
        return (
            <>
            <button
                className="rounded-md border-2 border-pink-500 text-pink-500 px-1 ml-2"
                onClick={() => {
                    const curVal = toNum(player.get(keyName))
                    player.set(keyName, (curVal - 1).toString())
                    
                }}
                >-</button>
            <button
                className="rounded-md border-2 border-pink-500 text-pink-500 px-1 ml-2"
                onClick={() => {
                    const curVal = toNum(player.get(keyName))
                    player.set(keyName, (curVal + 1).toString())
                    
                }}
                >+</button>
            </>
        )
    }
    return null
}