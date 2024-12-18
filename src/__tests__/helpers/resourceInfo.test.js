import { ItemSets } from '@/assets/sets';
import { Stat } from '@/assets/stat';
import { defaultPlayerData } from '@/helpers/defaultPlayerData';
import { achievementAPBonus, advTrainingInfo, apItemInfo, beardInfoPerm, beardInfoTemp, challengeInfo, diggerInfo, equipmentWithCubeInfo, hackInfo, isMaxxedItemSet, macguffinInfo, maxxedItemSetNum, nguInfo, perkInfo, quirkInfo, wishInfo } from '@/helpers/resourceInfo';
import { expectClose } from '../testHelperFunctions';

import earlyEvil from '../__data__/earlyEvil1';
import earlyEvilTwo from '../__data__/earlyEvil2';
import earlyNormal from '../__data__/earlyNormal1';
import earlyNormalTwo from '../__data__/earlyNormal2';
import evilReturnToNormal from '../__data__/evilReturnToNormal';
import lateNormal from '../__data__/lateNormal';
import lateEvil from '../__data__/lateEvil1';
import midEvil from '../__data__/midEvil1';
import midEvilTwo from '../__data__/midEvil2';
import midNormal from '../__data__/midNormal1';
import midNormalTwo from '../__data__/midNormal2';




describe('Resource Info - Achievement Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, 102.35],
        ['Early Normal 2', earlyNormalTwo, 106.45],
        ['Mid Normal 1', midNormal, 116.15],
        ['Mid Normal 2', midNormalTwo, 129.55],
        ['Late Normal', lateNormal, 144.8],
        ['Early Evil 1', earlyEvil, 154.65],
        ['Evil Return to Normal', evilReturnToNormal, 155.15],
        ['Early Evil 2', earlyEvilTwo, 156.15],
        ['Mid Evil 1', midEvil, 156.15],
        ['Mid Evil 2', midEvilTwo, 156.55],
        ['Late Evil 1', lateEvil, 156.55],
    ]
    test.each(cases)(
        "Achievement Info - %s",
        (name, obj, expectedValues) => {
            var data = {'achievements' : [defaultPlayerData(obj, 'achievements')]}
            var ec = expectClose(achievementAPBonus(data), expectedValues)
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})

describe('Resource Info - Adv Training Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, {'power' : 110, 'epower' : 100}],
        ['Early Normal 2', earlyNormalTwo, {'power' : 301.3, 'epower' : 100}],
        ['Mid Normal 1', midNormal, {'power' : 113.2, 'epower' : 100}],
        ['Mid Normal 2', midNormalTwo, {'power' : 793.15, 'epower' : 100}],
        ['Late Normal', lateNormal, {'power' : 1670.14, 'epower' : 100}],
        ['Early Evil 1', earlyEvil, {'power' : 113.2, 'epower' : 100}],
        ['Evil Return to Normal', evilReturnToNormal, {'power' : 163.1, 'epower' : 100}],
        ['Early Evil 2', earlyEvilTwo, {'power' : 163.1, 'epower' : 100}],
        ['Mid Evil 1', midEvil,  {'power' : 163.1, 'epower' : 100}],
    ]
    test.each(cases)(
        "Adv Training Info - %s",
        (name, obj, expectedValues) => {
            var data = { 'advTrainings' : [defaultPlayerData(obj, 'advTrainings')]}
            var ec = expectClose(advTrainingInfo(data, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(advTrainingInfo(data, Stat.ENERGY_POWER), expectedValues['epower'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Resource Info - AP Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, 100],
        // ['Early Normal 2', earlyNormalTwo, 100],
        // ['Mid Normal 1', midNormal, 100],
        // ['Mid Normal 2', midNormalTwo, 100],
        // ['Late Normal', lateNormal, 100],
        ['Early Evil 1', earlyEvil, 100],
        // ['Evil Return to Normal', evilReturnToNormal, 100],
        // ['Early Evil 2', earlyEvilTwo, 100],
        // ['Mid Evil 1', midEvil, 100],
        // ['Mid Evil 2', midEvil2, 100],
    ]
    test.each(cases)(
        "AP Info - %s",
        (name, obj, expectedValues) => {
            var data = {
                'apItems' : [defaultPlayerData(obj, 'apItems')],
                'itemSets' : [defaultPlayerData(obj, 'itemSets')],
            }
            var ec = expectClose(apItemInfo(data, Stat.POWER), expectedValues)
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})




describe('Resource Info - Beard Temp Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, {'power' : 100, 'dc' : 100}],
        // ['Early Normal 2', earlyNormalTwo, {'power' : 100, 'dc' : 100}],
        // ['Mid Normal 1', midNormal, {'power' : 100, 'dc' : 100}],
        // ['Mid Normal 2', midNormalTwo, {'power' : 100, 'dc' : 100}],
        // ['Late Normal', lateNormal, {'power' : 100, 'dc' : 100}],
        ['Early Evil 1', earlyEvil, {'power' : 1210, 'dc' : 884}],
        // ['Evil Return to Normal', evilReturnToNormal, {'power' : 100, 'dc' : 100}],
        // ['Early Evil 2', earlyEvilTwo, {'power' : 100, 'dc' : 100}],
        // ['Mid Evil 1', midEvil, {'power' : 100, 'dc' : 100}],
        ['Mid Evil 2', midEvilTwo, {'power' : 2653.44, 'dc' : 1653.23}],
        ['Late Evil 1', lateEvil, {'power' : 2579.16, 'dc' : 1339.6}],
    ]
    test.each(cases)(
        "Beard Temp Info - %s",
        (name, obj, expectedValues) => {
            var data = { 'beards' : [defaultPlayerData(obj, 'beards')]}
            var ec = expectClose(beardInfoTemp(data, Stat.POWER, true), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(beardInfoTemp(data, Stat.DROP_CHANCE, true), expectedValues['dc'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Resource Info - Beard Perm Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, {'power' : 100, 'dc' : 100}],
        ['Early Normal 2', earlyNormalTwo, {'power' : 100, 'dc' : 100}],
        ['Mid Normal 1', midNormal, {'power' : 141, 'dc' : 148}],
        ['Mid Normal 2', midNormalTwo, {'power' : 199, 'dc' : 192}],
        ['Late Normal', lateNormal, {'power' : 341, 'dc' : 267}],
        ['Early Evil 1', earlyEvil, {'power' : 695, 'dc' : 396}],
        ['Evil Return to Normal', evilReturnToNormal, {'power' : 730, 'dc' : 408}],
        ['Early Evil 2', earlyEvilTwo, {'power' : 908, 'dc' : 466}],
        ['Mid Evil 1', midEvil, {'power' : 1481, 'dc' : 591}],
        ['Mid Evil 2', midEvilTwo, {'power' : 1989.36, 'dc' : 682.72}],
        ['Late Evil 1', lateEvil, {'power' : 2256.3, 'dc' : 724.98}],
    ]
    test.each(cases)(
        "Beard Perm Info - %s",
        (name, obj, expectedValues) => {
            var data = { 'beards' : [defaultPlayerData(obj, 'beards')]}
            var ec = expectClose(beardInfoPerm(data, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(beardInfoPerm(data, Stat.DROP_CHANCE), expectedValues['dc'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})

describe('Resource Info - Challenge Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, {'power' : 100, 'mngu' : 100}],
        ['Early Normal 2', earlyNormalTwo, {'power' : 100, 'mngu' : 100}],
        ['Mid Normal 1', midNormal, {'power' : 135, 'mngu' : 100}],
        ['Mid Normal 2', midNormalTwo, {'power' : 135, 'mngu' : 135}],
        ['Late Normal', lateNormal, {'power' : 135, 'mngu' : 150}],
        ['Early Evil 1', earlyEvil, {'power' : 149, 'mngu' : 150}],
        ['Evil Return to Normal', evilReturnToNormal, {'power' : 149, 'mngu' : 150}],
        ['Early Evil 2', earlyEvilTwo, {'power' : 203, 'mngu' : 150}],
        ['Mid Evil 1', midEvil, {'power' : 203, 'mngu' : 150}],
        ['Mid Evil 2', midEvilTwo, {'power' : 203, 'mngu' : 150}],
    ]
    test.each(cases)(
        "Challenge Info - %s",
        (name, obj, expectedValues) => {
            var data = { 'challenges' : [defaultPlayerData(obj, 'challenges')]}
            var ec = expectClose(challengeInfo(data, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(challengeInfo(data, Stat.MAGIC_NGU_SPEED), expectedValues['mngu'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Resource Info - Digger Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, {'power' : 100}],
        // ['Early Normal 2', earlyNormalTwo, {'power' : 100}],
        // ['Mid Normal 1', midNormal, {'power' : 100}],
        // ['Mid Normal 2', midNormalTwo, {'power' : 100}],
        ['Late Normal', lateNormal, {'power' : 235.64}],
        // ['Early Evil 1', earlyEvil, {'power' : 100}],
        // ['Evil Return to Normal', evilReturnToNormal, {'power' : 100}],
        // ['Early Evil 2', earlyEvilTwo, {'power' : 100}],
        // ['Mid Evil 1', earlyEvilTwo, {'power' : 100}],
        ['Mid Evil 2', midEvilTwo, {'power' : 100}],
        ['Late Evil 1', lateEvil, {'power' : 345.22}],
    ]
    test.each(cases)(
        "Digger Info - %s",
        (name, obj, expectedValues) => {
            var data = {
                'diggers' : [defaultPlayerData(obj, 'diggers')],
                'challenges' : [defaultPlayerData(obj, 'challenges')],
                'itemSets' : [defaultPlayerData(obj, 'itemSets')],
            }
            var ec = expectClose(diggerInfo(data, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})



describe('Resource Info - Equipment Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, {
            'power' : 435,
            'toughness' : 404,
            'epower' : 160,
            'mcap' : 100,
            'dc' : 104,
            'respawn' : 100,
            'engu' : 100,
            'mwandoos' : 100,
        }],
        ['Early Normal 2', earlyNormalTwo, {
            'power' : 6736,
            'toughness' : 5779,
            'epower' : 511,
            'mcap' : 110,
            'dc' : 140.8,
            'respawn' : 100,
            'engu' : 100,
            'mwandoos' : 104,
        }],
        ['Mid Normal 1', midNormal, {
            'power' : 198896,
            'toughness' : 130210+1627,
            'epower' : 3112.5,
            'mcap' : 482,
            'dc' : 290,
            'respawn' : 116,
            'engu' : 100,
            'mwandoos' : 100,
        }],
        ['Mid Normal 2', midNormalTwo, {
            'power' : 1450789,
            'toughness' : 777305+348826.75,
            'epower' : 8708,
            'mcap' : 868,
            'dc' : 330,
            'respawn' : 116,
            'engu' : 704.5,
            'mwandoos' : 607.6,
        }],
        ['Late Normal', lateNormal, {
            'power' : 5956238,
            'toughness' : 5.969e6,// 2.761e6+20327854,
            'epower' : 24500,
            'mcap' : 2820,
            'dc' : 370,
            'respawn' : 128,
            'engu' : 1600,
            'mwandoos' : 340,
        }],
        ['Early Evil 1', earlyEvil, {
            'power' : (1.887e7 ) - (2.347e6),
            'toughness' : 1.45775e7, //6.112e6+60732380,
            'epower' : 57300,
            'mcap' : 6260,
            'dc' : 490,
            'respawn' : 136,
            'engu' : 1800,
            'mwandoos' : 100,
        }],
        ['Evil Return to Normal', evilReturnToNormal, {
            'power' :  1.83e7 + 2.152e7,
            'toughness' : 1.84356e7,//7.606e6+33232670,
            'epower' : 42111,
            'mcap' : 4856,
            'dc' : 1389.374,
            'respawn' : 124,
            'engu' : 100,
            'mwandoos' : 100,
        }],
        ['Early Evil 2', earlyEvilTwo, {
            'power' : 3.445e7 + 3.982e7,
            'toughness' : 8.239e7,//3.851e7+88385088,
            'epower' : 107542,
            'mcap' : 7476,
            'dc' : 990,
            'respawn' : 130,
            'engu' : 1700,
            'mwandoos' : 500,
        }],
        ['Mid Evil 1', midEvil, {
            'power' : 2.448e8 + 1.258e8,
            'toughness' : 1.286e8 + 126625608,
            'epower' : 196100,
            'mcap' : 23718,
            'dc' : 1890,
            'respawn' : 120,
            'engu' : 100,
            'mwandoos' : 100,
        }],
        ['Mid Evil 2', midEvilTwo, {
            'power' : 8.164e8 + 5.579e8,
            'toughness' : 4.88e8 + 5.389e8,
            'epower' : 615170,
            'mcap' : 13479,
            'dc' : 2490,
            'respawn' : 104,
            'engu' : 2167,
            'mwandoos' : 200,
        }],
        ['Late Evil 1', lateEvil, {
            'power' : 1.464e9 + 7.434e8,
            'toughness' : 5.858e8 + 6.866e8,
            'epower' : 942100,
            'mcap' : 39946,
            'dc' : 2310,
            'respawn' : 200 - 76,
            'engu' : 1900,
            'mwandoos' : 960,
        }],
    ]
    test.each(cases)(
        "Equipment Info - %s",
        (name, obj, expectedValues) => {
            var data = {
                'equipmentHead' : [defaultPlayerData(obj, 'equipmentHead')],
                'equipmentChest' : [defaultPlayerData(obj, 'equipmentChest')],
                'equipmentLegs' : [defaultPlayerData(obj, 'equipmentLegs')],
                'equipmentBoots' : [defaultPlayerData(obj, 'equipmentBoots')],
                'equipmentWeapon' : [defaultPlayerData(obj, 'equipmentWeapon')],
                'equipmentWeaponTwo' : [defaultPlayerData(obj, 'equipmentWeaponTwo')],
                'equipmentAccesories' : [defaultPlayerData(obj, 'equipmentAccesories')],
                'cubePower' : [defaultPlayerData(obj, 'cubePower')],
                'cubeToughness' : [defaultPlayerData(obj, 'cubeToughness')],
                'baseAdventurePower' : [defaultPlayerData(obj, 'baseAdventurePower')],
                'baseAdventureToughness' : [defaultPlayerData(obj, 'baseAdventureToughness')],
            }
            var ec = expectClose(equipmentWithCubeInfo(data, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentWithCubeInfo(data, Stat.TOUGHNESS), expectedValues['toughness'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentWithCubeInfo(data, Stat.ENERGY_POWER), expectedValues['epower'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentWithCubeInfo(data, Stat.MAGIC_CAP), expectedValues['mcap'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentWithCubeInfo(data, Stat.DROP_CHANCE), expectedValues['dc'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentWithCubeInfo(data, Stat.RESPAWN), expectedValues['respawn'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentWithCubeInfo(data, Stat.ENERGY_NGU_SPEED), expectedValues['engu'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentWithCubeInfo(data, Stat.MAGIC_WANDOOS_SPEED), expectedValues['mwandoos'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})

describe('Resource Info - Hack Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, {
            'power' : 100,
            'qp': 100,
            'wish': 100,
        }],
        ['Early Normal 2', earlyNormalTwo, {
            'power' : 100,
            'qp': 100,
            'wish': 100,
        }],
        ['Mid Normal 1', midNormal, {
            'power' : 100,
            'qp': 100,
            'wish': 100,
        }],
        ['Mid Normal 2', midNormalTwo, {
            'power' : 100,
            'qp': 100,
            'wish': 100,
        }],
        ['Late Normal', lateNormal, {
            'power' : 100,
            'qp': 100,
            'wish': 100,
        }],
        ['Early Evil 1', earlyEvil, {
            'power' : 100,
            'qp': 100,
            'wish': 100,
        }],
        ['Evil Return to Normal', evilReturnToNormal, {
            'power' : 100,
            'qp': 100,
            'wish': 100,
        }],
        ['Early Evil 2', earlyEvilTwo, {
            'power' : 155.42,
            'qp': 100.55,
            'wish': 100,
        }],
        ['Mid Evil 1', midEvil, {
            'power' : 259.18,
            'qp': 113.56,
            'wish': 100,
        }],
        ['Mid Evil 2', midEvilTwo, {
            'power' : 594.45,
            'qp': 210.74,
            'wish': 109.3,
        }],
        ['Late Evil 1', lateEvil, {
            'power' : 1008.4,
            'qp': 284.62,
            'wish': 121.54,
        }],
    ]
    test.each(cases)(
        "Hack Info - %s",
        (name, obj, expectedValues) => {
            var data = {
                'hacks' : [defaultPlayerData(obj, 'hacks')],
                'gameMode' : [defaultPlayerData(obj, 'gameMode')],
            }
            var ec = expectClose(hackInfo(data, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(hackInfo(data, Stat.QUEST_REWARD), expectedValues['qp'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(hackInfo(data, Stat.WISH_SPEED), expectedValues['wish'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})

describe('Resource Info - Macguffin Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, {
            'power' : 100,
            'epower' : 100,
            'dc' : 100,
            'attack' : 100,
        }],
        ['Early Normal 2', earlyNormalTwo, {
            'power' : 100,
            'epower' : 100,
            'dc' : 100,
            'attack' : 100,
        }],
        ['Mid Normal 1', midNormal, {
            'power' : 100,
            'epower' : 100,
            'dc' : 100,
            'attack' : 100,
        }],
        ['Mid Normal 2', midNormalTwo, {
            'power' : 100,
            'epower' : 100,
            'dc' : 101.141,
            'attack' : 100,
        }],
        ['Late Normal', lateNormal, {
            'power' : 100,
            'epower' : 100,
            'dc' : 104.248,
            'attack' : 100,
        }],
        ['Early Evil 1', earlyEvil, {
            'power' : 100,
            'epower' : 111,
            'dc' : 106.25,
            'attack' : 100,
        }],
        ['Evil Return to Normal', evilReturnToNormal, {
            'power' :  104,
            'epower' : 116,
            'dc' : 106.25,
            'attack' : 100,
        }],
        ['Early Evil 2', earlyEvilTwo, {
            'power' : 114,
            'epower' : 128,
            'dc' : 106.25,
            'attack' : 100,
        }],
        ['Mid Evil 1', midEvil, {
            'power' : 140,
            'epower' : 156,
            'dc' : 106.25,
            'attack' : 100,
        }],
        ['Mid Evil 2', midEvilTwo, {
            'power' : 189.108,
            'epower' : 209.271,
            'dc' : 119.22,
            'attack' : 100,
        }],
        ['Late Evil 1', lateEvil, {
            'power' : 227.241,
            'epower' : 250.037,
            'dc' : 144.621,
            'attack' : 100,
        }],
    ]
    test.each(cases)(
        "Macguffin Info - %s",
        (name, obj, expectedValues) => {
            var data = {
                'macguffins' : [defaultPlayerData(obj, 'macguffins')],
            }
            var ec = expectClose(macguffinInfo(data, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(macguffinInfo(data, Stat.ENERGY_POWER), expectedValues['epower'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(macguffinInfo(data, Stat.DROP_CHANCE), expectedValues['dc'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(macguffinInfo(data, Stat.ATTACK), expectedValues['attack'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})




describe('Resource Info - NGU Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, {
            'power' : 100,
            'ygg' : 100,
            'dc' : 100,
            'attack' : 100,
            'engu' : 100,
        }],
        ['Early Normal 2', earlyNormalTwo, {
            'power' : 100,
            'ygg' : 101.4,
            'dc' : 100,
            'attack' : 915,
            'engu' : 100,
        }],
        ['Mid Normal 1', midNormal, {
            'power' : 300,
            'ygg' : 113.8,
            'dc' : 123.3,
            'attack' : 2780,
            'engu' : 100,
        }],
        ['Mid Normal 2', midNormalTwo, {
            'power' : 2746,
            'ygg' : 377.22,
            'dc' : 1019.92,
            'attack' : 750500,
            'engu' : 105,
        }],
        ['Late Normal', lateNormal, {
            'power' : 42222,
            'ygg' : 1851.98,
            'dc' : 11140.88,
            'attack' : 129483517932,
            'engu' : 423.38,
        }],
        ['Early Evil 1', earlyEvil, {
            'power' : 45749 * 9.8111,
            'ygg' : 3003.45,
            'dc' : 26675.27,
            'attack' : 3.522e15,
            'engu' : 1971,
        }],
        ['Evil Return to Normal', evilReturnToNormal, {
            'power' :  31895*12.92,
            'ygg' : 2465.97,
            'dc' : 23561,
            'attack' : 2.221e14,
            'engu' : 2196,
        }],
        ['Early Evil 2', earlyEvilTwo, {
            'power' : 123413*16.14,
            'ygg' : 3968.5,
            'dc' : 90096,
            'attack' : 2.255e21,
            'engu' : 4298,
        }],
        ['Mid Evil 1', midEvil, {
            'power' : 265103 * 45.15,
            'ygg' : 4803.99,
            'dc' : 142252,
            'attack' : 1.347e22,
            'engu' : 7023,
        }],
        ['Mid Evil 2', midEvilTwo, {
            'power' : 561662 * 8417/100,
            'ygg' : 6269.17,
            'dc' : 623543.1,
            'attack' : 3.671e26,
            'engu' : 18925,
        }],
        ['Late Evil 1', lateEvil, {
            'power' : 729021 * 15498.15/100,
            'ygg' : 6945.58,
            'dc' : 998829.5,
            'attack' : 8.377e27,
            'engu' : 26188,
        }],
    ]
    test.each(cases)(
        "NGU Info - %s",
        (name, obj, expectedValues) => {
            var data = {
                'energyNGUs' : [defaultPlayerData(obj, 'energyNGUs')],
                'magicNGUs' : [defaultPlayerData(obj, 'magicNGUs')],
                'gameMode' : [defaultPlayerData(obj, 'gameMode')],
            }
            var ec = expectClose(nguInfo(data, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(nguInfo(data, Stat.YGGDRASIL_YIELD), expectedValues['ygg'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(nguInfo(data, Stat.DROP_CHANCE), expectedValues['dc'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(nguInfo(data, Stat.ATTACK), expectedValues['attack'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(nguInfo(data, Stat.ENERGY_NGU_SPEED), expectedValues['engu'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Resource Info - Perk Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, {
            'power' : 110,
            'boosts': 100,
            'epower': 100,
        }],
        ['Early Normal 2', earlyNormalTwo, {
            'power' : 110,
            'boosts': 100,
            'epower': 103,
        }],
        ['Mid Normal 1', midNormal, {
            'power' : 110,
            'boosts': 100,
            'epower': 106,
        }],
        ['Mid Normal 2', midNormalTwo, {
            'power' : 110,
            'boosts': 245,
            'epower': 150,
        }],
        ['Late Normal', lateNormal, {
            'power' : 110,
            'boosts': 550,
            'epower': 150,
        }],
        ['Early Evil 1', earlyEvil, {
            'power' : 110,
            'boosts': 550,
            'epower': 231,
        }],
        ['Evil Return to Normal', evilReturnToNormal, {
            'power' : 110,
            'boosts': 550,
            'epower': 165,
        }],
        ['Early Evil 2', earlyEvilTwo, {
            'power' : 150.5273,
            'boosts': 550,
            'epower': 330,
        }],
        ['Mid Evil 1', midEvil, {
            'power' : 188.1902,
            'boosts': 550,
            'epower': 429,
        }],
        ['Mid Evil 2', midEvilTwo, {
            'power' : 254.3178,
            'boosts': 550,
            'epower': 429,
        }],
        ['Late Evil 1', lateEvil, {
            'power' : 256.3066,
            'boosts': 550,
            'epower': 429,
        }],
    ]
    test.each(cases)(
        "Perk Info - %s",
        (name, obj, expectedValues) => {
            var data = {
                'perks' : [defaultPlayerData(obj, 'perks')],
                'gameMode' : [defaultPlayerData(obj, 'gameMode')],
            }
            var ec = expectClose(perkInfo(data, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(perkInfo(data, Stat.BOOSTS_BOOST), expectedValues['boosts'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(perkInfo(data, Stat.ENERGY_POWER), expectedValues['epower'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


// TODO - Perk Level



describe('Resource Info - Quirk Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, {
            'power' : 100,
            'ecap': 100,
            'mngu': 100,
        }],
        ['Early Normal 2', earlyNormalTwo, {
            'power' : 100,
            'ecap': 100,
            'mngu': 100,
        }],
        ['Mid Normal 1', midNormal, {
            'power' : 100,
            'ecap': 100,
            'mngu': 100,
        }],
        ['Mid Normal 2', midNormalTwo, {
            'power' : 125,
            'ecap': 110,
            'mngu': 100,
        }],
        ['Late Normal', lateNormal, {
            'power' : 125,
            'ecap': 146.3,
            'mngu': 100,
        }],
        ['Early Evil 1', earlyEvil, {
            'power' : 125,
            'ecap': 165,
            'mngu': 100,
        }],
        ['Evil Return to Normal', evilReturnToNormal, {
            'power' : 125,
            'ecap': 165,
            'mngu': 100,
        }],
        ['Early Evil 2', earlyEvilTwo, {
            'power' : 128,
            'ecap': 165,
            'mngu': 100,
        }],
        ['Mid Evil 1', midEvil, {
            'power' : 162.5,
            'ecap': 165,
            'mngu': 100,
        }],
        ['Mid Evil 2', midEvilTwo, {
            'power' : 250,
            'ecap': 165,
            'mngu': 100,
        }],
        ['Late Evil 1', lateEvil, {
            'power' : 250,
            'ecap': 165,
            'mngu': 100,
        }],
    ]
    test.each(cases)(
        "Quirk Info - %s",
        (name, obj, expectedValues) => {
            var data = {
                'quirks' : [defaultPlayerData(obj, 'quirks')],
                'gameMode' : [defaultPlayerData(obj, 'gameMode')],
            }
            var ec = expectClose(quirkInfo(data, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(quirkInfo(data, Stat.ENERGY_CAP), expectedValues['ecap'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(quirkInfo(data, Stat.MAGIC_NGU_SPEED), expectedValues['mngu'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})



describe('Resource Info - Wish Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Early Normal 2', earlyNormalTwo, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Mid Normal 1', midNormal, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Mid Normal 2', midNormalTwo, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Late Normal', lateNormal, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Early Evil 1', earlyEvil, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Evil Return to Normal', evilReturnToNormal, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Early Evil 2', earlyEvilTwo, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Mid Evil 1', midEvil, {
            'power' : 142,
            'rpower': 121,
            'hack': 100,
        }],
        ['Mid Evil 2', midEvilTwo, {
            'power' : 187,
            'rpower': 197,
            'hack': 140,
        }],
        ['Late Evil 1', lateEvil, {
            'power' : 187,
            'rpower': 260,
            'hack': 179,
        }],
    ]
    test.each(cases)(
        "Wish Info - %s",
        (name, obj, expectedValues) => {
            var data = {
                'wishes' : [defaultPlayerData(obj, 'wishes')],
                'gameMode' : [defaultPlayerData(obj, 'gameMode')],
            }
            var ec = expectClose(wishInfo(data, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(wishInfo(data, Stat.RES3_POWER), expectedValues['rpower'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(wishInfo(data, Stat.HACK_SPEED), expectedValues['hack'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})



describe('Resource Info - Item Set Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, [ItemSets.FOREST, ItemSets.CAVE], [ItemSets.BADLY_DRAWN], 0],
        ['Early Normal 2', earlyNormalTwo, [ItemSets.FOREST, ItemSets.NUMBER], [ItemSets.BADLY_DRAWN], 0],
        ['Mid Normal 1', midNormal, [ItemSets.FOREST, ItemSets.NUMBER], [ItemSets.BADLY_DRAWN], 0],
        ['Mid Normal 2', midNormalTwo,  [ItemSets.BADLY_DRAWN], [ItemSets.EDGY], 7],
        ['Late Normal', lateNormal, [ItemSets.BADLY_DRAWN], [ItemSets.EDGY], 7],
        ['Early Evil 1', earlyEvil, [ItemSets.BADLY_DRAWN], [ItemSets.PRETTY], 8],
        ['Evil Return to Normal', evilReturnToNormal, [ItemSets.BADLY_DRAWN], [ItemSets.PARTY], 9],
        ['Early Evil 2', earlyEvilTwo, [ItemSets.BADLY_DRAWN], [ItemSets.PARTY], 10],
        ['Mid Evil 1', midEvil, [ItemSets.PRETTY, ItemSets.NERD], [ItemSets.CONSTRUCTION, ItemSets.NETHER], 10],
        ['Mid Evil 2', midEvilTwo, [ItemSets.PRETTY, ItemSets.NERD], [ItemSets.PIRATE], 10],
    ]
    test.each(cases)(
        "Item Sets Info - %s",
        (name, obj, expectSets, noExpectSets, numQuests) => {
            var data = {
                'itemSets' : [defaultPlayerData(obj, 'itemSets')],
            }
            for(var itemSet of expectSets) {
                expect(isMaxxedItemSet(data, itemSet)).toBeTruthy()
            }
            for(var itemSet of noExpectSets) {
                expect(isMaxxedItemSet(data, itemSet)).toBeFalsy()
            }
            expect(maxxedItemSetNum(data, ItemSets.QUESTS)).toBe(numQuests)
            
        }
    )
})