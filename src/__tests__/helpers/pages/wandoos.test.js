import { GameMode } from "@/assets/mode";
import { WANDOOS_OS, WANDOOSLIST } from "@/assets/wandoos";
import { bd } from "@/helpers/numbers";
import { getLevelsGainedInWandoos, getMaxOSBonus, getWandoosBonuses } from "@/helpers/pages/wandoos";
import _ from "lodash";



var wandoos98 = _.cloneDeep(WANDOOSLIST[0])
wandoos98.os = WANDOOS_OS.NINETY_EIGHT
var wandoosmeh = _.cloneDeep(WANDOOSLIST[0])
wandoosmeh.os = WANDOOS_OS.MEH
var wandoosxl = _.cloneDeep(WANDOOSLIST[0])
wandoosxl.os = WANDOOS_OS.XL


describe("Wandoos page", () => {
    let cases = [
        [
            {
                gameMode: bd(GameMode.NORMAL),
                minutes: bd(60), 
                energyAllocated : bd(81234567),
                magicAllocated: bd(81234567),
                energyCap: bd(154393342),
                magicCap: bd(6941520),
            }, 
            _.cloneDeep(wandoos98),
            {
                '98' : {'energy' : 180000, 'magic' : 15000},
                'meh' : {'energy' : 341, 'magic' : 15},
                'xl' : {'energy' : 0, 'magic' : 0},
            },
            {
                '98' : 6722186,
                'meh' : 214520,
                'xl' : 100,
            },
            '98'
        ],
        [
            {
                gameMode: bd(GameMode.NORMAL),
                minutes: bd(60), 
                energyAllocated : bd(31234567),
                magicAllocated: bd(31234567),
                energyCap: bd(1617782234),
                magicCap: bd(281061326),
            }, 
            _.cloneDeep(wandoosmeh),
            {
                '98' : {'energy' : 180000, 'magic' : 180000},
                'meh' : {'energy' : 180000, 'magic' : 180000},
                'xl' : {'energy' : 9000, 'magic' : 1607},
            },
            {
                '98' : 49014572,
                'meh' : 1296039600100,
                'xl' : 1041138839118,
            },
            'meh'
        ],
        [
            {
                gameMode: bd(GameMode.NORMAL),
                minutes: bd(60), 
                energyAllocated : bd(26824567),
                magicAllocated: bd(26824567),
                energyCap: bd(47268056150),
                magicCap: bd(14390053554),
            }, 
            _.cloneDeep(wandoosxl),
            {
                '98' : {'energy' : 180000, 'magic' : 180000},
                'meh' : {'energy' : 180000, 'magic' : 180000},
                'xl' : {'energy' : 180000, 'magic' : 180000},
            },
            {
                '98' : 49014572,
                'meh' : 1296039600100,
                'xl' : 3430003396372846,
            },
            'xl'
        ],
        [
            {
                gameMode: bd(GameMode.EVIL),
                minutes: bd(60), 
                energyAllocated : bd(145945678901),
                magicAllocated: bd(145945678901),
                energyCap: bd(26218964477405),
                magicCap: bd(26218964477405),
            }, 
            _.cloneDeep(wandoos98),
            {
                '98' : {'energy' : 180000, 'magic' : 180000},
                'meh' : {'energy' : 32, 'magic' : 32},
                'xl' : {'energy' : 0, 'magic' : 0},
            },
            {
                '98' : 49014572,
                'meh' : 48100,
                'xl' : 100,
            },
            '98'
        ],
        [
            {
                gameMode: bd(GameMode.EVIL),
                minutes: bd(60), 
                energyAllocated : bd(21605497608),
                magicAllocated: bd(21605165832),
                energyCap: bd(570098325465537),
                magicCap: bd(229642150202800),
                energyFills: bd(0.01),
                magicFills: bd(0.01),
            }, 
            _.cloneDeep(wandoosmeh),
            {
                '98' : {'energy' : 180000, 'magic' : 180000},
                'meh' : {'energy' : 947, 'magic' : 382},
                'xl' : {'energy' : 0, 'magic' : 0},
            },
            {
                '98' : 49014572,
                'meh' : 14565600,
                'xl' : 100,
            },
            '98'
        ],
        [
            {
                gameMode: bd(GameMode.EVIL),
                minutes: bd(60), 
                energyAllocated : bd(21605497608),
                magicAllocated: bd(21605165832),
                energyCap: bd(570098325465537),
                magicCap: bd(229642150202800),
            }, 
            _.cloneDeep(wandoosmeh),
            {
                '98' : {'energy' : 180000, 'magic' : 180000},
                'meh' : {'energy' : 180000, 'magic' : 180000},
                'xl' : {'energy' : 4, 'magic' : 1},
            },
            {
                '98' : 49014572,
                'meh' : 1296039600100,
                'xl' : 144964,
            },
            'meh'
        ],
    ]
    test.each(cases)(
        "Wandoos Page - Levels Gained - Case %#",
        (data, wandoos, expectedLvls, expectedBonuses, expectedMaxOs) => {
            wandoos.energyAllocated = data['energyAllocated']
            wandoos.magicAllocated = data['magicAllocated']
            var lvlsGained = getLevelsGainedInWandoos({...data, wandoos: wandoos})
            for(var os in lvlsGained) {
                for(var ty in lvlsGained[os]) {
                    expect(Number(lvlsGained[os][ty].getValue())).toBeCloseTo(expectedLvls[os][ty])
                }
            }
            
            var bonuses = getWandoosBonuses(lvlsGained, wandoos)
            for(var os in bonuses) {
                expect(Number(bonuses[os].getValue())).toBeCloseTo(expectedBonuses[os])
            }
            
            var maxOs = getMaxOSBonus(bonuses)
            expect(maxOs).toBe(expectedMaxOs)
        }
    )
})