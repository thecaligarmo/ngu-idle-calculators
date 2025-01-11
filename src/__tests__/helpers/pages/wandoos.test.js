import { bd } from "@/helpers/numbers";
import { getLevelsGainedInWandoos, getMaxOSBonus, getWandoosBonuses } from "@/helpers/pages/wandoos";

import earlyEvilTwo from '@/__tests__/__data__/earlyEvil2';
import earlySad from '@/__tests__/__data__/earlySad1';
import lateNormal from '@/__tests__/__data__/lateNormal';
import midEvilTwo from '@/__tests__/__data__/midEvil2';
import midNormalTwo from '@/__tests__/__data__/midNormal2';
import { toDataObj } from '@/__tests__/testHelperFunctions';



var midNormalTwoData = toDataObj(midNormalTwo);
var lateNormalData = toDataObj(lateNormal);
var earlyEvilTwoData = toDataObj(earlyEvilTwo);
var midEvilTwoData = toDataObj(midEvilTwo);
var earlySadData = toDataObj(earlySad);



describe("Wandoos page", () => {
    var cases = [
        [ midNormalTwoData, {minutes: bd(60)},
            {
                '98' : {'energy' : 180000, 'magic' : 180000},
                'meh' : {'energy' : 180000, 'magic' : 180000},
                'xl' : {'energy' : 9000, 'magic' : 1578},
            },
            {'98' : 49014572, 'meh' : 1296039600100, 'xl' : 1021420233176 },
            'meh'
        ], [ lateNormalData, {minutes: bd(60)},
            {
                '98' : {'energy' : 180000, 'magic' : 180000},
                'meh' : {'energy' : 180000, 'magic' : 180000},
                'xl' : {'energy' : 180000, 'magic' : 180000},
            },
            {'98' : 49014572, 'meh' : 1296039600100, 'xl' : 3430003396372846 },
            'xl'
        ], [ earlyEvilTwoData, {minutes: bd(60)},
            {
                '98' : {'energy' : 180000, 'magic' : 180000},
                'meh' : {'energy' : 32, 'magic' : 7},
                'xl' : {'energy' : 0, 'magic' : 0},
            },
            {'98' : 49014572, 'meh' : 11100, 'xl' : 100 },
            '98'
        ], [ midEvilTwoData, {minutes: bd(60)},
            {
                '98' : {'energy' : 180000, 'magic' : 180000},
                'meh' : {'energy' : 180000, 'magic' : 180000},
                'xl' : {'energy' : 36000, 'magic' : 22500},
            },
            {'98' : 49014572, 'meh' : 1296039600100, 'xl' : 71307250568067 },
            'xl'
        ], [ earlySadData, {minutes: bd(60)},
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
        (data, extraData, expectedLvls, expectedBonuses, expectedMaxOs) => {
            var infoData = {
                energyCap: bd(data['totalEnergyCap'][0]),
                magicCap: bd(data['totalMagicCap'][0]),
                energyAllocated: bd(data['wandoosEnergyAllocated'][0]),
                magicAllocated: bd(data['wandoosMagicAllocated'][0]),
                wandoos: data['wandoos'][0][0],
                gameMode: bd(data['gameMode'][0]),
            }
            var combinedData = {...infoData, ...extraData}
            
            combinedData['wandoos'].energyAllocated = combinedData['energyAllocated']
            combinedData['wandoos'].magicAllocated = combinedData['magicAllocated']
            var lvlsGained = getLevelsGainedInWandoos({...combinedData})

            for(var os in lvlsGained) {
                for(var ty in lvlsGained[os]) {
                    expect(Number(lvlsGained[os][ty].getValue())).toBeCloseTo(expectedLvls[os][ty])
                }
            }

            var bonuses = getWandoosBonuses(lvlsGained, combinedData['wandoos'])
            for(var os in bonuses) {
                expect(Number(bonuses[os].getValue())).toBeCloseTo(expectedBonuses[os])
            }
            
            var maxOs = getMaxOSBonus(bonuses)
            expect(maxOs).toBe(expectedMaxOs)
        }
    )
})
