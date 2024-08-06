import {achievementAPBonus, advTrainingInfo, apItemInfo, beardInfoTemp, beardInfoPerm, challengeInfo, diggerInfo, equipmentInfo, macguffinInfo, nguInfo, perkInfo, quirkInfo, isMaxxedItem, isMaxxedItemSet} from '@/helpers/resourceInfo'
import {defaultPlayerData} from '@/helpers/defaultPlayerData'
import {Stat} from '@/assets/stat';
import { ItemSets } from '@/assets/sets';
import { expectClose } from '../testHelperFunctions';

import earlyNormal from '../__data__/earlyNormal1';
import earlyNormalTwo from '../__data__/earlyNormal2';
import midNormal from '../__data__/midNormal1';
import midNormalTwo from '../__data__/midNormal2';
import lateNormal from '../__data__/lateNormal';
import earlyEvil from '../__data__/earlyEvil1';
import evilReturnToNormal from '../__data__/evilReturnToNormal';
import earlyEvilTwo from '../__data__/earlyEvil2';
import midEvil from '../__data__/midEvil1';




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
        ['Early Normal 2', earlyNormalTwo, 100],
        ['Mid Normal 1', midNormal, 100],
        ['Mid Normal 2', midNormalTwo, 100],
        ['Late Normal', lateNormal, 100],
        ['Early Evil 1', earlyEvil, 100],
        ['Evil Return to Normal', evilReturnToNormal, 100],
        ['Early Evil 2', earlyEvilTwo, 100],
    ]
    test.each(cases)(
        "AP Info - %s",
        (name, obj, expectedValues) => {
            var data = {'apItems' : [defaultPlayerData(obj, 'apItems')]}
            var ec = expectClose(apItemInfo(data, Stat.POWER), expectedValues)
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})




describe('Resource Info - Beard Temp Info', () => {
    var cases = [
        ['Early Normal 1', earlyNormal, {'power' : 100, 'dc' : 100}],
        ['Early Normal 2', earlyNormalTwo, {'power' : 100, 'dc' : 100}],
        ['Mid Normal 1', midNormal, {'power' : 100, 'dc' : 100}],
        ['Mid Normal 2', midNormalTwo, {'power' : 100, 'dc' : 100}],
        ['Late Normal', lateNormal, {'power' : 100, 'dc' : 100}],
        ['Early Evil 1', earlyEvil, {'power' : 1210, 'dc' : 884}],
        ['Evil Return to Normal', evilReturnToNormal, {'power' : 100, 'dc' : 100}],
        ['Early Evil 2', earlyEvilTwo, {'power' : 100, 'dc' : 100}],
    ]
    test.each(cases)(
        "Beard Temp Info - %s",
        (name, obj, expectedValues) => {
            var data = { 'beards' : [defaultPlayerData(obj, 'beards')]}
            var ec = expectClose(beardInfoTemp(data, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(beardInfoTemp(data, Stat.DROP_CHANCE), expectedValues['dc'])
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
        ['Early Normal 2', earlyNormalTwo, {'power' : 100}],
        ['Mid Normal 1', midNormal, {'power' : 100}],
        ['Mid Normal 2', midNormalTwo, {'power' : 100}],
        ['Late Normal', lateNormal, {'power' : 235.64}],
        ['Early Evil 1', earlyEvil, {'power' : 100}],
        ['Evil Return to Normal', evilReturnToNormal, {'power' : 100}],
        ['Early Evil 2', earlyEvilTwo, {'power' : 100}],
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
                'equipmentAccesories' : [defaultPlayerData(obj, 'equipmentAccesories')],
                'cubePower' : [defaultPlayerData(obj, 'cubePower')],
                'cubeToughness' : [defaultPlayerData(obj, 'cubeToughness')],
                'baseAdventurePower' : [defaultPlayerData(obj, 'baseAdventurePower')],
                'baseAdventureToughness' : [defaultPlayerData(obj, 'baseAdventureToughness')],
            }
            var ec = expectClose(equipmentInfo(data, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentInfo(data, Stat.TOUGHNESS), expectedValues['toughness'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentInfo(data, Stat.ENERGY_POWER), expectedValues['epower'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentInfo(data, Stat.MAGIC_CAP), expectedValues['mcap'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentInfo(data, Stat.DROP_CHANCE), expectedValues['dc'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentInfo(data, Stat.RESPAWN), expectedValues['respawn'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentInfo(data, Stat.ENERGY_NGU_SPEED), expectedValues['engu'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentInfo(data, Stat.MAGIC_WANDOOS_SPEED), expectedValues['mwandoos'])
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









test('Maxxed Items/Sets - Early Normal', () => {
    var data = {
        'itemSets' : [defaultPlayerData(earlyNormal, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(earlyNormal, 'maxxedItems')],
    }
    // expect(isMaxxedItem(data, 1)).toBeTruthy()
    // expect(isMaxxedItem(data, 3)).toBeFalsy()
    // expect(isMaxxedItem(data, 44)).toBeTruthy()
    // expect(isMaxxedItem(data, 76)).toBeFalsy()
    // expect(isMaxxedItem(data, 51)).toBeTruthy()
    // expect(isMaxxedItem(data, 100)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.CAVE)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeFalsy()
});





test('Maxxed Items/Sets - Early Normal 2', () => {
    var data = {
        'itemSets' : [defaultPlayerData(earlyNormalTwo, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(earlyNormalTwo, 'maxxedItems')],
    }
    // expect(isMaxxedItem(data, 1)).toBeTruthy()
    // expect(isMaxxedItem(data, 5)).toBeFalsy()
    // expect(isMaxxedItem(data, 44)).toBeTruthy()
    // expect(isMaxxedItem(data, 76)).toBeFalsy()
    // expect(isMaxxedItem(data, 89)).toBeTruthy()
    // expect(isMaxxedItem(data, 110)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.NUMBER)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeFalsy()
});





test('Maxxed Items/Sets - Mid Normal 1', () => {
    var data = {
        'itemSets' : [defaultPlayerData(midNormal, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(midNormal, 'maxxedItems')],
    }
    // expect(isMaxxedItem(data, 1)).toBeTruthy()
    // expect(isMaxxedItem(data, 8)).toBeFalsy()
    // expect(isMaxxedItem(data, 44)).toBeTruthy()
    // expect(isMaxxedItem(data, 89)).toBeTruthy()
    // expect(isMaxxedItem(data, 110)).toBeFalsy()
    // expect(isMaxxedItem(data, 460)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.NUMBER)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeFalsy()
});




test('Maxxed Items/Sets - Mid Normal 2', () => {
    var data = {
        'itemSets' : [defaultPlayerData(midNormalTwo, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(midNormalTwo, 'maxxedItems')],
    }
    // expect(isMaxxedItem(data, 1)).toBeTruthy()
    // expect(isMaxxedItem(data, 44)).toBeTruthy()
    // expect(isMaxxedItem(data, 89)).toBeTruthy()
    // expect(isMaxxedItem(data, 110)).toBeFalsy()
    // expect(isMaxxedItem(data, 460)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.EDGY)).toBeFalsy()
});





test('Maxxed Items/Sets - Late Normal', () => {
    var data = {
        'itemSets' : [defaultPlayerData(lateNormal, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(lateNormal, 'maxxedItems')],
    }
    // expect(isMaxxedItem(data, 1)).toBeTruthy()
    // expect(isMaxxedItem(data, 44)).toBeTruthy()
    // expect(isMaxxedItem(data, 89)).toBeTruthy()
    // expect(isMaxxedItem(data, 460)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.EDGY)).toBeFalsy()
});




test('Maxxed Items/Sets - Early Evil 1', () => {
    var data = {
        'itemSets' : [defaultPlayerData(earlyEvil, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(earlyEvil, 'maxxedItems')],
    }
    // expect(isMaxxedItem(data, 1)).toBeTruthy()
    // expect(isMaxxedItem(data, 44)).toBeTruthy()
    // expect(isMaxxedItem(data, 89)).toBeTruthy()
    // expect(isMaxxedItem(data, 460)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.PRETTY)).toBeFalsy()
});


test('Maxxed Items/Sets - Evil - Return to Normal', () => {
    var data = {
        'itemSets' : [defaultPlayerData(evilReturnToNormal, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(evilReturnToNormal, 'maxxedItems')],
    }
    // expect(isMaxxedItem(data, 1)).toBeTruthy()
    // expect(isMaxxedItem(data, 44)).toBeTruthy()
    // expect(isMaxxedItem(data, 89)).toBeTruthy()
    // expect(isMaxxedItem(data, 460)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.PARTY)).toBeFalsy()
});




test('Maxxed Items/Sets - Early Evil 2', () => {
    var data = {
        'itemSets' : [defaultPlayerData(earlyEvilTwo, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(earlyEvilTwo, 'maxxedItems')],
    }
    // expect(isMaxxedItem(data, 1)).toBeTruthy()
    // expect(isMaxxedItem(data, 44)).toBeTruthy()
    // expect(isMaxxedItem(data, 89)).toBeTruthy()
    // expect(isMaxxedItem(data, 460)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.PARTY)).toBeFalsy()
});













test('Achievement info - Mid Evil 1', () => {
    var data = {'achievements' : [defaultPlayerData(midEvil, 'achievements')]}
    expect(achievementAPBonus(data).getValue()).toBe('156.15')
});

test('Advanced Training info - Mid Evil 1', () => {
    var data = { 'advTrainings' : [defaultPlayerData(midEvil, 'advTrainings')]}
    var val = Number(advTrainingInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(163.1, 1)
    var val = Number(advTrainingInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('AP - Mid Evil 1', () => {
    var data = { 'apItems' : [defaultPlayerData(midEvil, 'apItems')]}
    var val = Number(apItemInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Temp - Mid Evil 1', () => {
    var data = { 'beards' : [defaultPlayerData(midEvil, 'beards')]}
    var val = Number(beardInfoTemp(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(beardInfoTemp(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Perm - Mid Evil 1', () => {
    var data = { 'beards' : [defaultPlayerData(midEvil, 'beards')]}
    var val = Number(beardInfoPerm(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(1481, 0)
    var val = Number(beardInfoPerm(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(591, 0)
});

test('Challenges - Mid Evil 1', () => {
    var data = { 'challenges' : [defaultPlayerData(midEvil, 'challenges')]}
    var val = Number(challengeInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(203, 0)
    var val = Number(challengeInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(150, 0)
});

test('Digger - Mid Evil 1', () => {
    var data = {
        'diggers' : [defaultPlayerData(midEvil, 'diggers')],
        'challenges' : [defaultPlayerData(midEvil, 'challenges')],
        'itemSets' : [defaultPlayerData(midEvil, 'itemSets')],
    }
    var val = Number(diggerInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Equipment - Mid Evil 1', () => {
    var data = {
        'equipmentHead' : [defaultPlayerData(midEvil, 'equipmentHead')],
        'equipmentChest' : [defaultPlayerData(midEvil, 'equipmentChest')],
        'equipmentLegs' : [defaultPlayerData(midEvil, 'equipmentLegs')],
        'equipmentBoots' : [defaultPlayerData(midEvil, 'equipmentBoots')],
        'equipmentWeapon' : [defaultPlayerData(midEvil, 'equipmentWeapon')],
        'equipmentAccesories' : [defaultPlayerData(midEvil, 'equipmentAccesories')],
        'cubePower' : [defaultPlayerData(midEvil, 'cubePower')],
        'cubeToughness' : [defaultPlayerData(midEvil, 'cubeToughness')],
        'baseAdventurePower' : [defaultPlayerData(midEvil, 'baseAdventurePower')],
        'baseAdventureToughness' : [defaultPlayerData(midEvil, 'baseAdventureToughness')],
    }
    // Cube may be wrong due to offline increases
    var ec = expectClose(Number(equipmentInfo(data, Stat.POWER).getValue()), 2.448e8 + 1.258e8, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(196100, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_CAP).getValue())
    expect(val).toBeCloseTo(23718, 0)
    var val = Number(equipmentInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(1890, 0)
    var val = 200 - Number(equipmentInfo(data, Stat.RESPAWN).getValue())
    expect(val).toBeCloseTo(80, 0)
    var val = Number(equipmentInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_WANDOOS_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('MacGuffin - Mid Evil 1', () => {
    var data = {
        'macguffins' : [defaultPlayerData(midEvil, 'macguffins')],
    }
    var val = Number(macguffinInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(140, 0)
    var val = Number(macguffinInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(156, 0)
    var val = Number(macguffinInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(106.25, 3)
    var val = Number(macguffinInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('NGU - Mid Evil 1', () => {
    var data = {
        'energyNGUs' : [defaultPlayerData(midEvil, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(midEvil, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(midEvil, 'gameMode')],
    }
    var ec = expectClose(Number(nguInfo(data, Stat.POWER).getValue()), 265103 * 4515 / 100, 4)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var val = Number(nguInfo(data, Stat.YGGDRASIL_YIELD).getValue())
    expect(val).toBeCloseTo(4803.99, 0)
    var val = Number(nguInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(142252, 0)
    var ec = expectClose(Number(nguInfo(data, Stat.ATTACK).getValue()), 1.347e22, 19)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var val = Number(nguInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(7023, 0)
});

test('Perks - Mid Evil 1', () => {
    var data = {
        'perks' : [defaultPlayerData(midEvil, 'perks')],
        'gameMode' : [defaultPlayerData(midEvil, 'gameMode')],
    }
    var val = Number(perkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(188.1902, 0)
    var val = Number(perkInfo(data, Stat.BOOSTS_BOOST).getValue())
    expect(val).toBeCloseTo(550, 0)
    var val = Number(perkInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(429, 0)
});

test('Quirks - Mid Evil 1', () => {
    var data = {
        'quirks' : [defaultPlayerData(midEvil, 'quirks')],
        'gameMode' : [defaultPlayerData(midEvil, 'gameMode')],
    }
    var val = Number(quirkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(162.5, 0)
    var val = Number(quirkInfo(data, Stat.ENERGY_CAP).getValue())
    expect(val).toBeCloseTo(165, 1)
    var val = Number(quirkInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('Maxxed Items/Sets - Mid Evil 1', () => {
    var data = {
        'itemSets' : [defaultPlayerData(midEvil, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(midEvil, 'maxxedItems')],
    }
    // expect(isMaxxedItem(data, 1)).toBeTruthy()
    // expect(isMaxxedItem(data, 44)).toBeTruthy()
    // expect(isMaxxedItem(data, 89)).toBeTruthy()
    // expect(isMaxxedItem(data, 460)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.NETHER)).toBeFalsy()
});