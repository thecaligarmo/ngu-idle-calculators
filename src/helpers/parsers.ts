import bigDecimal from "js-big-decimal"
import { bd } from "./numbers"

const calcToGo : {[k:string] : string} = {
    'totalAPBonus%' : 'goAP%',
    'totalDropChance%' : 'goDropChance%',
    'totalEnergyCap' : 'goEnergyCap%',
    'totalEnergyNGUSpeedFactor%' : 'goEnergyNGU%',
    'totalEnergyPower' : 'goEnergyPower%',
    'totalExpBonus%' : 'goExperience%',
    'totalMagicCap' : 'goMagicCap%',
    'totalMagicNGUSpeedFactor%' : 'goMagicNGU%',
    'totalMagicPower' : 'goMagicPower%',
    'totalPower' : 'goPower%',
    'totalQuestDropBonus%' : 'goQuestDrop%',
    'totalRes3Cap' : 'goResource3Cap%',
    'totalRes3Power' : 'goResource3Power%',
    'totalRespawnTime' : 'goRespawn%',
    'totalSeedGainBonus%' : 'goSeedGain%',
    'totalWishSpeed%' : 'goWishes%',
    'totalYggdrasilYieldBonus%' : 'goYggdrasilYield%',
}

// Parse an object to get something back properly
export function parseObj(state: any, key: string) {
    var x : any = state[key][0]
    if (typeof x === 'string') {
        x = JSON.parse(x)
    }
    if (typeof x === 'number') {
        return {}
    }
    return x
}


// Parse a number from player states to get back a bigDecimal
export function parseNum(state: any, key: string) : bigDecimal{
    var val = bd(state[key][0])
    // Handle gear optimizer stuff
    if(key in calcToGo) {
        val = val.multiply(
            parseNum(state, calcToGo[key]).divide(bd(100)).add(bd(1))
        )
    }
    return val
}