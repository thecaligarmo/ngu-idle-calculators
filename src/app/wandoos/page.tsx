'use client'
import { GameMode } from '@/assets/mode';
import { Wandoos, WANDOOS_OS, WANDOOSLIST } from '@/assets/wandoos';
import Content from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';
import { getNumberFormat } from '@/components/context';
import { bd, bigdec_min, pn } from '@/helpers/numbers';
import { parseNum, parseObj } from '@/helpers/parsers';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import _ from 'lodash';

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


export default function Page() {
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired = [
        ['gameMode'],
        ['totalEnergyCap', 'totalMagicCap'],
        ['wandoosEnergyAllocated', 'wandoosMagicAllocated']
    ]
    // Set extra required (not from playerData)
    var extraRequired = [['minutesSpentInWandoos']]
    const playerStates = createStatesForData(extraRequired);
    
    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates)
    var extraReq = getRequiredStates(extraRequired, playerStates)

    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        return parseNum(playerStates, key)
    }

    function j(key : string) : any{
        return parseObj(playerStates, key)
    }

    function c(key : string) : boolean {
        return v(key).compareTo(bd(1)) == 0
    }

    var gameMode = v('gameMode')
    var sigFig = 20
    
    var minutes = v('minutesSpentInWandoos')
    var wandoos : Wandoos = j('wandoos')[Number(gameMode.getValue())]
    if(_.isUndefined(wandoos)) {
        wandoos = WANDOOSLIST[0]
    }
    wandoos.energyAllocated = v('wandoosEnergyAllocated')
    wandoos.magicAllocated = v('wandoosMagicAllocated')
    var energyCap = v('totalEnergyCap')
    var magicCap = v('totalMagicCap')
    var energyFills = bd(50)
    var magicFills = bd(50)

    var wandoosBase : osType= {
        '98' : bd(1),
        'meh' : bd(1000),
        'xl' : bd(1000000),
    }
    // need baseMultiplier before we change the bases
    var baseMultiplier = wandoosBase['98']
    if(wandoos.os != WANDOOS_OS.NINETY_EIGHT) {
        var baseMultiplier = wandoos.os == WANDOOS_OS.MEH ? wandoosBase['meh'] : wandoosBase['xl'];
    }

    if(gameMode.compareTo(bd(GameMode.NORMAL)) != 0) {
        wandoosBase = {
            '98' : bd(1),
            'meh' : bd(1000000),
            'xl' : bd(1000000000000),
        }
    }

    var wandoosRatios = {
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

    var fillsPerMinute : wandoosOsType = {} as wandoosOsType; // : {[key : 'energy' | 'magic'] : bigDecimal }
    var os : keyof typeof fillsPerMinute
    for(os in wandoosRatios) {
        fillsPerMinute[os] = {} as wandoosType;
        var ty : keyof typeof fillsPerMinute[typeof os]    
        for(ty in fillRatio) {
            fillsPerMinute[os][ty] = bigdec_min(bd(50), fillRatio[ty].multiply(bd(wandoosRatios[os])));
        }
    }

    var timeToFill : wandoosOsType = {} as wandoosOsType; 
    var os : keyof typeof timeToFill
    for(os in wandoosRatios) {
        timeToFill[os] = {} as wandoosType;
        var ty : keyof typeof timeToFill[typeof os]    
        for(ty in fillRatio) {
            timeToFill[os][ty] = bd(0)
            if(fillsPerMinute[os][ty].compareTo(bd(0)) > 0) {
                timeToFill[os][ty] = bd(1).divide(fillsPerMinute[os][ty], sigFig).ceil()
            }
        }
    }

    var lvlsGained : wandoosOsType = {} as wandoosOsType; 
    var os : keyof typeof lvlsGained
    for(os in wandoosRatios) {
        lvlsGained[os] = {} as wandoosType;
        var ty : keyof typeof lvlsGained[typeof os]    
        for(ty in fillRatio) {
            lvlsGained[os][ty] = bd(0)
            if(timeToFill[os][ty].compareTo(bd(0)) > 0) {
                lvlsGained[os][ty] = bd(60 * 50).multiply(minutes).divide(timeToFill[os][ty], sigFig).floor()
            }
        }
    }

    var bonuses : osType = {} as osType;
    var os : keyof typeof bonuses
    for(os in lvlsGained) {
        bonuses[os] = wandoos.getStatByLevel(lvlsGained[os]['energy'], lvlsGained[os]['magic'], osMap[os])
                .multiply(bd(100))
    }

    
    return (
        <Content title="Wandoos" infoRequired={infoReq} extraRequired={extraReq}>
            Assumptions: We assume that the wandoos in your save file is capped and OS is fully booted
            <ContentSubsection title="Which OS should I be using?">
                <table>
                    <thead>
                        <tr>
                            <th className="px-2"></th>
                            <th className="px-2">Bonus</th>
                            <th className="px-2">Energy Levels</th>
                            <th className="px-2">Magic Levels</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-2">98</td>
                            <td className="px-2">{pn(bonuses['98'], fmt, 2)}%</td>
                            <td className="px-2">{pn(lvlsGained['98']['energy'], fmt)}</td>
                            <td className="px-2">{pn(lvlsGained['98']['magic'], fmt)}</td>
                        </tr>
                        <tr>
                            <td className="px-2">MEH</td>
                            <td className="px-2">{pn(bonuses['meh'], fmt, 2)}%</td>
                            <td className="px-2">{pn(lvlsGained['meh']['energy'], fmt)}</td>
                            <td className="px-2">{pn(lvlsGained['meh']['magic'], fmt)}</td>
                        </tr>
                        <tr>
                            <td className="px-2">XL</td>
                            <td className="px-2">{pn(bonuses['xl'], fmt, 2)}%</td>
                            <td className="px-2">{pn(lvlsGained['xl']['energy'], fmt)}</td>
                            <td className="px-2">{pn(lvlsGained['xl']['magic'], fmt)}</td>
                        </tr>
                    </tbody>
                </table>
            </ContentSubsection>
        </Content>
    )
}
