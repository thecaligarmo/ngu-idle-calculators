import { fruitYieldType, Yggdrasil } from "@/assets/yggdrasil"
import { ReactElement } from "react"
import { pn } from "../numbers"

export function fruitInfoRows(fruits : Yggdrasil[], fruitYieldData : fruitYieldType, fmt : string = 'scientific') : ReactElement[]{

    return  fruits.map((fruit) => {
        return (
            <tr key={fruit.key}>
                <td>{fruit.name}</td>
                <td>{fruit.tier}</td>
                <td>{fruit.usePoop ? 'Yes' : 'No'}</td>
                <td>{fruit.eatFruit ? 'Eat' : 'Harvest'}</td>
                <td>{pn(fruit.seedYield(fruitYieldData.totalSeedGainBonus, fruitYieldData.firstHarvest, fruitYieldData.blueHeart), fmt)}</td>
                <td>{pn(fruit.fruitYield(fruitYieldData), fmt)}</td>
            </tr>
        )
    })

}