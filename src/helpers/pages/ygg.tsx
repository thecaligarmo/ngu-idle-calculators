import { fruitYieldType, Yggdrasil } from "@/assets/yggdrasil"
import { ReactElement } from "react"
import { pn } from "../numbers"

export function fruitInfoRows(fruits : Yggdrasil[], fruitYieldData : fruitYieldType, fmt : string = 'scientific') : ReactElement[]{

    return  fruits.map((fruit, index) => {
        return (
            <tr key={fruit.key} className={index %2 == 0 ? "bg-slate-200 dark:bg-slate-900" : ""}>
                <td className="px-2">{fruit.name}</td>
                <td className="px-2">{fruit.tier}</td>
                <td className="px-2">{fruit.usePoop ? 'Yes' : 'No'}</td>
                <td className="px-2">{fruit.eatFruit ? 'Eat' : 'Harvest'}</td>
                <td className="px-2"><span className="text-green-500">{pn(fruit.seedYield(fruitYieldData.totalSeedGainBonus, fruitYieldData.firstHarvest, fruitYieldData.blueHeart), fmt)}</span></td>
                <td className="px-2"><span className="text-red-500">{pn(fruit.fruitYield(fruitYieldData), fmt)}</span></td>
                <td className="px-2"><span className="text-blue-500">{pn(fruit.upgradeCost(), fmt)}</span></td>
            </tr>
        )
    })

}