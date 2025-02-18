import { Titan, Titans } from "@/assets/enemy";
import Player from "@/assets/player";
import { ReactElement } from "react";
import { InputSelect } from "./InputSelect";

export function TitanSelect({maxTitanByAK, player} : {maxTitanByAK: [Titan, number], player: Player}) {
    const titanOptions : ReactElement[] = []
    for (const titan of Object.values(Titans)) {
        if(titan.id < 13) {
            for(let i = 0; i < titan.versions; i++) {
                if(titan.id == 5 && i > 0) {
                    continue
                }
                titanOptions.push(<option key={titan.getFullKey(i)} value={titan.id +'-' + i}>
                    {titan.getFullName(i)}
                </option>)
                
            }
        }
    }
    
    return (<InputSelect
        onChange={(e) =>{
            player.set('dailyMaxTitan', e.target.value)
            
        }}
        value={player.get('dailyMaxTitan')}
        id="max-titan-select"
    >
        <option key="current" value="current">
            Highest Titan by Autokill - {maxTitanByAK[0].getFullName(maxTitanByAK[1])}
        </option>
        {titanOptions}
    </InputSelect>)
}