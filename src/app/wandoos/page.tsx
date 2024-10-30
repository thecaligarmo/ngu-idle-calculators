'use client'
import { Wandoos, WANDOOSLIST } from '@/assets/wandoos';
import Content, { requiredDataType } from '@/components/content';
import ContentSubsection from '@/components/contentSubsection';
import { getNumberFormat } from '@/components/context';
import { bd, isOne, pn } from '@/helpers/numbers';
import { getLevelsGainedInWandoos, getMaxOSBonus, getWandoosBonuses } from '@/helpers/pages/wandoos';
import { parseNum, parseObj } from '@/helpers/parsers';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import _ from 'lodash';

export default function Page() {
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired : requiredDataType = [
        ['gameMode','totalEnergyCap', 'totalMagicCap','wandoosEnergyAllocated', 'wandoosMagicAllocated']
    ]
    // Set extra required (not from playerData)
    var extraRequired : requiredDataType = [
        [['minutesSpentInWandoos', 60], ['energyFillsPerSecond', 50], ['magicFillsPerSecond', 50]]
    ]
    var goRequired : requiredDataType = [['goEnergyCap%', 'goMagicCap%']]
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

    var gameMode = v('gameMode')
    var wandoos : Wandoos = j('wandoos')[0]
    if (_.isUndefined(wandoos)) {
        wandoos = _.cloneDeep(WANDOOSLIST[0])
    }
    wandoos.energyAllocated = v('wandoosEnergyAllocated');
    wandoos.magicAllocated = v('wandoosMagicAllocated');

    var data = {
        gameMode: gameMode,
        minutes : v('minutesSpentInWandoos'),
        energyCap : v('totalEnergyCap'),
        magicCap : v('totalMagicCap'),
        energyFills : v('energyFillsPerSecond'),
        magicFills: v('magicFillsPerSecond'),
        wandoos: wandoos,
    }
    var lvlsGained = getLevelsGainedInWandoos(data)
    var bonuses = getWandoosBonuses(lvlsGained, wandoos)

    var maxOS = getMaxOSBonus(bonuses)

    var prechildren = (
        <p>See which wandoos is the most efficient for where you are. By <span className="text-red-500">&ldquo;fills per second&rdquo;</span> we mean how fast is your bar filling up. So if you&quot;re capped/BBd, then it&quot;s 50, etc.</p>
    )
    
    return (
        <Content prechildren={prechildren} title="Wandoos" infoRequired={infoReq} extraRequired={extraReq} goRequired={goReq}>
            Assumptions: We assume that the wandoos in your save file is capped and OS is fully booted
            <ContentSubsection title="Which OS should I be using?">
                The row highlighted in green is the OS you should be using.<br /><br />
                <table className="inline-block w-full md:w-1/2 align-top mb-2">
                    <thead>
                        <tr className="text-left border-b-1 border border-t-0 border-x-0">
                            <th className="px-2"></th>
                            <th className="px-2">Bonus</th>
                            <th className="px-2">Energy Levels</th>
                            <th className="px-2">Magic Levels</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={maxOS == '98' ? "bg-green-200 dark:bg-green-900" : ""}>
                            <td className="px-2">98</td>
                            <td className="px-2">{pn(bonuses['98'], fmt, 2)}%</td>
                            <td className="px-2">{pn(lvlsGained['98']['energy'], fmt)}</td>
                            <td className="px-2">{pn(lvlsGained['98']['magic'], fmt)}</td>
                        </tr>
                        <tr className={maxOS == 'meh' ? "bg-green-200 dark:bg-green-900" : ""}>
                            <td className="px-2">MEH</td>
                            <td className="px-2">{pn(bonuses['meh'], fmt, 2)}%</td>
                            <td className="px-2">{pn(lvlsGained['meh']['energy'], fmt)}</td>
                            <td className="px-2">{pn(lvlsGained['meh']['magic'], fmt)}</td>
                        </tr>
                        <tr className={maxOS == 'xl' ? "bg-green-200 dark:bg-green-900" : ""}>
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
