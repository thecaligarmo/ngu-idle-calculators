import { bd } from "@/helpers/numbers";
import { getLevelsGainedInWandoos, getMaxOSBonus, getWandoosBonuses, wandoosNames } from "@/helpers/pages/wandoos";

import earlyEvilTwo from '@/__data__/earlyEvil2';
import earlySad from '@/__data__/earlySad1';
import lateNormal from '@/__data__/lateNormal';
import midEvilTwo from '@/__data__/midEvil2';
import midNormalTwo from '@/__data__/midNormal2';
import Player from "@/assets/player";
import bigDecimal from "js-big-decimal";



const midNormalTwoPlayer = new Player(false, true)
midNormalTwoPlayer.importPlayerData(midNormalTwo)
const lateNormalPlayer = new Player(false, true)
lateNormalPlayer.importPlayerData(lateNormal)

const earlyEvilTwoPlayer = new Player(false, true)
earlyEvilTwoPlayer.importPlayerData(earlyEvilTwo)
const midEvilTwoPlayer = new Player(false, true)
midEvilTwoPlayer.importPlayerData(midEvilTwo)

const earlySadPlayer = new Player(false, true)
earlySadPlayer.importPlayerData(earlySad)



type emNum = {'energy': number, 'magic': number}



describe("Wandoos page", () => {
    const cases : [Player, {'minutes': bigDecimal}, {'98': emNum, 'meh': emNum, 'xl': emNum}, {'98': number, 'meh': number, 'xl': number}, string][]= [
        [ midNormalTwoPlayer, {minutes: bd(60)},
            {
                '98' : {'energy' : 180000, 'magic' : 180000},
                'meh' : {'energy' : 180000, 'magic' : 180000},
                'xl' : {'energy' : 9000, 'magic' : 1578},
            },
            {'98' : 49014572, 'meh' : 1296039600100, 'xl' : 1021420233176 },
            'meh'
        ], [ lateNormalPlayer, {minutes: bd(60)},
            {
                '98' : {'energy' : 180000, 'magic' : 180000},
                'meh' : {'energy' : 180000, 'magic' : 180000},
                'xl' : {'energy' : 180000, 'magic' : 180000},
            },
            {'98' : 49014572, 'meh' : 1296039600100, 'xl' : 3430003396372846 },
            'xl'
        ], [ earlyEvilTwoPlayer, {minutes: bd(60)},
            {
                '98' : {'energy' : 180000, 'magic' : 180000},
                'meh' : {'energy' : 32, 'magic' : 7},
                'xl' : {'energy' : 0, 'magic' : 0},
            },
            {'98' : 49014572, 'meh' : 11100, 'xl' : 100 },
            '98'
        ], [ midEvilTwoPlayer, {minutes: bd(60)},
            {
                '98' : {'energy' : 180000, 'magic' : 180000},
                'meh' : {'energy' : 180000, 'magic' : 180000},
                'xl' : {'energy' : 36000, 'magic' : 22500},
            },
            {'98' : 49014572, 'meh' : 1296039600100, 'xl' : 71307250568067 },
            'xl'
        ], [ earlySadPlayer, {minutes: bd(60)},
            {
                '98' : {'energy' : 180000, 'magic' : 180000},
                'meh' : {'energy' : 622, 'magic' : 216},
                'xl' : {'energy' : 0, 'magic' : 0},
            },
            {'98' : 49014572, 'meh' : 5429820, 'xl' : 100 },
            '98'
        ], 
    ]
    test.each(cases)(
        "Wandoos Page - Case %#",
        (player, extraData, expectedLvls, expectedBonuses, expectedMaxOs) => {
            const infoData = {
                energyCap: player.get('totalEnergyCap'),
                magicCap: player.get('totalMagicCap'),
                energyAllocated: player.get('wandoosEnergyAllocated'),
                magicAllocated: player.get('wandoosMagicAllocated'),
                wandoos: player.get('wandoos')[0],
                gameMode: player.get('gameMode'),
            }
            const combinedData = {...infoData, ...extraData}
            
            combinedData['wandoos'].energyAllocated = combinedData['energyAllocated']
            combinedData['wandoos'].magicAllocated = combinedData['magicAllocated']
            const lvlsGained = getLevelsGainedInWandoos({...combinedData})

            let os : wandoosNames
            for(os in lvlsGained) {
                let ty : 'energy' | 'magic'
                for(ty in lvlsGained[os]) {
                    expect(Number(lvlsGained[os][ty].getValue())).toBeCloseTo(expectedLvls[os][ty])
                }
            }

            const bonuses = getWandoosBonuses(lvlsGained, combinedData['wandoos'])
            for(os in bonuses) {
                expect(Number(bonuses[os].getValue())).toBeCloseTo(expectedBonuses[os])
            }
            
            const maxOs = getMaxOSBonus(bonuses)
            expect(maxOs).toBe(expectedMaxOs)
        }
    )
})
