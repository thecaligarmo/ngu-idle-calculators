import bigDecimal from "js-big-decimal"
import { WANDOOS_OS, WANDOOSLIST, Wandoos } from "@/assets/wandoos"
import { isNormalMode } from "../gameMode"
import { bd, bigdec_min, greaterThan, bigdec_max, bigdec_equals } from "../numbers"


export type wandoosNames = '98' | 'meh' | 'xl'


type wandoosType = {
    'energy' : bigDecimal
    'magic' : bigDecimal
}

type wandoosOsType = {
    '98' : wandoosType,
    'meh' : wandoosType,
    'xl' : wandoosType,
}

type osType = {
    '98' : bigDecimal,
    'meh' : bigDecimal,
    'xl' : bigDecimal,
}

var osMap = {
    '98' : WANDOOS_OS.NINETY_EIGHT,
    'meh' : WANDOOS_OS.MEH,
    'xl' : WANDOOS_OS.XL,
}


export function getLevelsGainedInWandoos({
    gameMode,
    minutes,
    energyCap,
    magicCap,
    energyFills = bd(50),
    magicFills = bd(50),
    wandoos = WANDOOSLIST[0],
}: {
    gameMode : bigDecimal,
    minutes : bigDecimal,
    energyCap : bigDecimal,
    magicCap : bigDecimal,
    energyFills ?: bigDecimal,
    magicFills ?: bigDecimal,
    wandoos ?: Wandoos
}) : wandoosOsType {
    
    const sigFig = 20
    
    let wandoosBase : osType = {
        '98' : bd(1),
        'meh' : bd(1000),
        'xl' : bd(1000000),
    }


    if(!isNormalMode(gameMode)) {
        wandoosBase = {
            '98' : bd(1),
            'meh' : bd(1000000),
            'xl' : bd(1000000000000),
        }
    }

    // need baseMultiplier before we change the bases
    let baseMultiplier = wandoosBase['98']
    if(wandoos.os != WANDOOS_OS.NINETY_EIGHT) {
        baseMultiplier = wandoos.os == WANDOOS_OS.MEH ? wandoosBase['meh'] : wandoosBase['xl'];
    }

    let wandoosRatios = {
        '98' : baseMultiplier.divide(wandoosBase['98'], sigFig),
        'meh' : baseMultiplier.divide(wandoosBase['meh'], sigFig),
        'xl' : baseMultiplier.divide(wandoosBase['xl'], sigFig),
    }

    try {
        var fillRatio = {
            'energy' : energyFills.multiply(energyCap).divide(bd(50), sigFig).divide(wandoos.energyAllocated, sigFig),
            'magic' : magicFills.multiply(magicCap).divide(bd(50), sigFig).divide(wandoos.magicAllocated, sigFig)
        }
    } catch {
        var fillRatio = {
            'energy' : bd(1),
            'magic' : bd(1)
        }
    }

    let fillsPerMinute : wandoosOsType = {} as wandoosOsType; // : {[key : 'energy' | 'magic'] : bigDecimal }
    var os : keyof typeof fillsPerMinute
    for(os in wandoosRatios) {
        fillsPerMinute[os] = {} as wandoosType;
        var ty : keyof typeof fillsPerMinute[typeof os]    
        for(ty in fillRatio) {
            fillsPerMinute[os][ty] = bigdec_min(bd(50), fillRatio[ty].multiply(bd(wandoosRatios[os])));
        }
    }

    let timeToFill : wandoosOsType = {} as wandoosOsType; 
    var os : keyof typeof timeToFill
    for(os in wandoosRatios) {
        timeToFill[os] = {} as wandoosType;
        var ty : keyof typeof timeToFill[typeof os]    
        for(ty in fillRatio) {
            timeToFill[os][ty] = bd(0)
            if( greaterThan(fillsPerMinute[os][ty], bd(0))) {
                timeToFill[os][ty] = bd(1).divide(fillsPerMinute[os][ty], sigFig).ceil()
            }
        }
    }

    let lvlsGained : wandoosOsType = {} as wandoosOsType; 
    var os : keyof typeof lvlsGained
    for(os in wandoosRatios) {
        lvlsGained[os] = {} as wandoosType;
        var ty : keyof typeof lvlsGained[typeof os]    
        for(ty in fillRatio) {
            lvlsGained[os][ty] = bd(0)
            if(greaterThan(timeToFill[os][ty], bd(0))) {
                lvlsGained[os][ty] = bd(60 * 50).multiply(minutes).divide(timeToFill[os][ty], sigFig).floor()
            }
        }
    }
    return lvlsGained;
}

export function getWandoosBonuses(lvlsGained : wandoosOsType, wandoos : Wandoos = WANDOOSLIST[0]) : osType {
    let bonuses : osType = {} as osType;
    let os : keyof typeof bonuses
    for(os in lvlsGained) {
        bonuses[os] = wandoos.getStatByLevel(lvlsGained[os]['energy'], lvlsGained[os]['magic'], osMap[os])
                .multiply(bd(100))
                .round()
    }

    return bonuses
}


export function getMaxOSBonus(bonuses : osType) : string {
    const max = bigdec_max(...Object.values(bonuses))
    for(let ty of Object.keys(bonuses)){
        if (bigdec_equals(bonuses[ty as keyof typeof bonuses], max)) {
            return ty
        }
    }
    return ''
}