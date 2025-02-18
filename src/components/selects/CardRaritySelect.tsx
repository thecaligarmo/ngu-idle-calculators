import { CardRarityText } from "@/assets/cards";
import Player from "@/assets/player";
import { ReactNode } from "react";
import { InputSelect } from "./InputSelect";

export function CardRaritySelect({player, dkey} : {player: Player, dkey : string}){
    
    const rarityOptions : ReactNode[] = []
    for(const k in Object.keys(CardRarityText)) {
        // let v = k.toString()
        rarityOptions.push(
            (
                <option
                    key={'cardRarity-' + CardRarityText[k]}
                    value={k}
                    className="text-black dark:text-white"
                    >
                        {CardRarityText[k]}
                    </option>
            )
        )
    }
    return (
        <InputSelect
                onChange={(e) => {
                    player.set(dkey, e.target.value)
                }}
                value={player.get(dkey).getValue()}
                id={dkey + "-select"}
            >
                {rarityOptions}
            </InputSelect>
        )
}