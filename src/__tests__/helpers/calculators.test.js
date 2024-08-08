import { totalAPBonus, totalAugmentSpeed, totalDaycareSpeed, totalDropChance, totalEnergyBar, totalEnergyBeardSpeed, totalEnergyCap, totalEnergyNGUSpeedFactor, totalEnergyPower, totalEnergyWandoosSpeed, totalExpBonus, totalGoldDrop, totalHackSpeed, totalMagicBar, totalMagicBeardSpeed, totalMagicCap, totalMagicNGUSpeedFactor, totalMagicPower, totalMagicWandoosSpeed, totalPPBonus, totalPower, totalQuestDropBonus, totalQuestRewardBonus, totalRes3Bar, totalRes3Cap, totalRes3Power, totalRespawnRate, totalToughness, totalWishSpeed } from '@/helpers/calculators';
import earlyEvil from '../__data__/earlyEvil1';
import earlyEvilTwo from '../__data__/earlyEvil2';
import earlyNormal from '../__data__/earlyNormal1';
import earlyNormalTwo from '../__data__/earlyNormal2';
import evilReturnToNormal from '../__data__/evilReturnToNormal';
import lateNormal from '../__data__/lateNormal';
import midEvil from '../__data__/midEvil1';
import midNormal from '../__data__/midNormal1';
import midNormalTwo from '../__data__/midNormal2';
import { expectClose, toDataObj } from '../testHelperFunctions';


var earlyNormalData = toDataObj(earlyNormal);
var earlyNormalTwoData = toDataObj(earlyNormalTwo);
var midNormalData = toDataObj(midNormal);
var midNormalTwoData = toDataObj(midNormalTwo);
var lateNormalData = toDataObj(lateNormal);
var earlyEvilData = toDataObj(earlyEvil);
var evilReturnToNormalData = toDataObj(evilReturnToNormal);
var earlyEvilTwoData = toDataObj(earlyEvilTwo);
var midEvilData = toDataObj(midEvil);



describe('Calculators - Energy', () => {
    var cases = [
        ['Early Normal 1', earlyNormalData, {'power': 20.8, 'bar': 16.9, 'cap': 412500}],
        ['Early Normal 2', earlyNormalTwoData, {'power': 269, 'bar': 158, 'cap': 2262598}],
        ['Mid Normal 1', midNormalData, {'power': 19795.5, 'bar': 10560, 'cap': 154393342}],
        ['Mid Normal 2', midNormalTwoData, {'power': 396562, 'bar': 84914, 'cap': 1617782234}],
        ['Late Normal', lateNormalData, {'power': 15400000, 'bar': 7272000, 'cap': 47268056150}],
        ['Early Evil 1', earlyEvilData, {'power': 1148000000, 'bar': 176300000, 'cap': 1618503168662}],
        ['Evil Return to Normal', evilReturnToNormalData, {'power': 7.554e8, 'bar': 1.46e8, 'cap': 2395637339264}],
        ['Early Evil 2', earlyEvilTwoData, {'power': 9.522e9, 'bar': 1.152e9, 'cap': 26218964477405}],
        ['Mid Evil 1', midEvilData, {'power': 4.299e10, 'bar': 5.743e9, 'cap':111846015531154 }],
    ]
    test.each(cases)(
        "Calculators - Energy - %s",
        (name, data, expectedValues) => {
            var ec = expectClose(totalEnergyPower(data), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalEnergyBar(data), expectedValues['bar'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalEnergyCap(data), expectedValues['cap'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Calculators - Magic', () => {
    var cases = [
        ['Early Normal 1', earlyNormalData, {'power': 6.4, 'bar': 5, 'cap': 60000}],
        ['Early Normal 2', earlyNormalTwoData, {'power': 14, 'bar': 8, 'cap': 330000}],
        ['Mid Normal 1', midNormalData, {'power': 1640, 'bar': 561.5, 'cap': 6941520}],
        ['Mid Normal 2', midNormalTwoData, {'power': 49734, 'bar': 18589, 'cap': 281061326}],
        ['Late Normal', lateNormalData, {'power': 3907000, 'bar': 2249000, 'cap': 14390053554}],
        ['Early Evil 1', earlyEvilData, {'power': 106800000, 'bar': 22880000, 'cap': 309027642136}],
        ['Evil Return to Normal', evilReturnToNormalData, {'power': 8.385e7, 'bar': 3.155e7, 'cap': 258609120090}],
        ['Early Evil 2', earlyEvilTwoData, {'power': 3.153e9, 'bar': 1.260e9, 'cap': 6363454536030}],
        ['Mid Evil 1', midEvilData, {'power': 1.439e10, 'bar': 1.914e9, 'cap': 44967554132115}],
    ]
    test.each(cases)(
        "Calculators - Magic - %s",
        (name, data, expectedValues) => {
            var ec = expectClose(totalMagicPower(data), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalMagicBar(data), expectedValues['bar'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalMagicCap(data), expectedValues['cap'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})

describe('Calculators - Resource 3', () => {
    var cases = [
        ['Early Normal 1', earlyNormalData, {'power': 1, 'bar': 0, 'cap': 0}],
        ['Early Normal 2', earlyNormalTwoData, {'power': 1, 'bar': 0, 'cap': 0}],
        ['Mid Normal 1', midNormalData, {'power': 1, 'bar': 0, 'cap': 0}],
        ['Mid Normal 2', midNormalTwoData, {'power': 1, 'bar': 0, 'cap': 0}],
        ['Late Normal', lateNormalData, {'power': 1, 'bar': 0, 'cap': 0}],
        ['Early Evil 1', earlyEvilData, {'power': 1, 'bar': 0, 'cap': 0}],
        ['Evil Return to Normal', evilReturnToNormalData, {'power': 3, 'bar': 3, 'cap': 90000}],
        ['Early Evil 2', earlyEvilTwoData, {'power': 3, 'bar': 6, 'cap': 90000}],
        ['Mid Evil 1', midEvilData, {'power': 188, 'bar': 30, 'cap': 5549251}],
    ]
    test.each(cases)(
        "Calculators - Resource 3 - %s",
        (name, data, expectedValues) => {
            var ec = expectClose(totalRes3Power(data), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalRes3Bar(data), expectedValues['bar'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalRes3Cap(data), expectedValues['cap'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Calculators - Augments', () => {
    var cases = [
        ['Early Normal 1', earlyNormalData, 2080],
        ['Early Normal 2', earlyNormalTwoData, 26864],
        ['Mid Normal 1', midNormalData, 1.98e6],
        ['Mid Normal 2', midNormalTwoData, 4.362e7],
        ['Late Normal', lateNormalData, 1.694e9],
        ['Early Evil 1', earlyEvilData, 1.263e11],
        ['Evil Return to Normal', evilReturnToNormalData, 8.309e10],
        ['Early Evil 2', earlyEvilTwoData, 1.719e12],
        ['Mid Evil 1', midEvilData, 1.373e13],
    ]
    test.each(cases)(
        "Calculators - Augments - %s",
        (name, data, expectedValue) => {
            var ec = expectClose(totalAugmentSpeed(data), expectedValue)
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Calculators - NGU', () => {
    var cases = [
        ['Early Normal 1', earlyNormalData, {'energy': 2080, 'magic': 640}],
        ['Early Normal 2', earlyNormalTwoData, {'energy': 29550, 'magic': 1507}],
        ['Mid Normal 1', midNormalData, {'energy': 2178000, 'magic': 541060}],
        ['Mid Normal 2', midNormalTwoData, {'energy': 1290000000, 'magic': 648400000}],
        ['Late Normal', lateNormalData, {'energy': 1091000000000, 'magic': 1163000000000}],
        ['Early Evil 1', earlyEvilData, {'energy': 8.197e14, 'magic': 3.208e14}],
        ['Evil Return to Normal', evilReturnToNormalData, {'energy': 8.575e12, 'magic': 3.442e12}],
        ['Early Evil 2', earlyEvilTwoData, {'energy': 1.588e16, 'magic': 2.452e16}],
        ['Mid Evil 1', midEvilData, {'energy': 1.265e16, 'magic': 1.926e16}],
    ]
    test.each(cases)(
        "Calculators - NGU - %s",
        (name, data, expectedValues) => {
            var ec = expectClose(totalEnergyNGUSpeedFactor(data), expectedValues['energy'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalMagicNGUSpeedFactor(data), expectedValues['magic'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Calculators - EXP, AP, PP', () => {
    var cases = [
        ['Early Normal 1', earlyNormalData, {'exp': 100, 'ap': 102.35, 'pp' : 100}],
        ['Early Normal 2', earlyNormalTwoData, {'exp': 100, 'ap': 106.45, 'pp' : 100}],
        ['Mid Normal 1', midNormalData, {'exp': 100, 'ap': 116.15, 'pp' : 110}],
        ['Mid Normal 2', midNormalTwoData, {'exp': 132, 'ap': 155.46, 'pp' : 115.5}],
        ['Late Normal', lateNormalData, {'exp': 1776.49, 'ap': 173.76, 'pp' : 348.58}],
        ['Early Evil 1', earlyEvilData, {'exp': 1747.11, 'ap': 185.58, 'pp' : 1485.88}],
        ['Evil Return to Normal', evilReturnToNormalData, {'exp': 1665.96, 'ap': 186.18, 'pp' : 1788.99}],
        ['Early Evil 2', earlyEvilTwoData, {'exp': 2402.84, 'ap': 187.38, 'pp' : 2502.83}],
        ['Mid Evil 1', midEvilData, {'exp': 3504.79, 'ap': 191.12, 'pp' : 3884.76}],
    ]
    test.each(cases)(
        "Calculators - EXP, AP, PP - %s",
        (name, data, expectedValues) => {
            var ec = expectClose(totalExpBonus(data), expectedValues['exp'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalAPBonus(data), expectedValues['ap'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalPPBonus(data), expectedValues['pp'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Calculators - Misc', () => {
    var cases = [
        ['Early Normal 1', earlyNormalData, {'daycare': 100, 'hack': 100, 'wish' : 100}],
        ['Early Normal 2', earlyNormalTwoData, {'daycare': 100, 'hack': 100, 'wish' : 100}],
        ['Mid Normal 1', midNormalData, {'daycare': 100, 'hack': 100, 'wish' : 100}],
        ['Mid Normal 2', midNormalTwoData, {'daycare': 100, 'hack': 100, 'wish' : 100}],
        ['Late Normal', lateNormalData,  {'daycare': 100, 'hack': 100, 'wish' : 100}],
        ['Early Evil 1', earlyEvilData, {'daycare': 100, 'hack': 100, 'wish' : 100}],
        ['Evil Return to Normal', evilReturnToNormalData, {'daycare': 100, 'hack': 100, 'wish' : 100}],
        ['Early Evil 2', earlyEvilTwoData, {'daycare': 126, 'hack': 175, 'wish' : 100}],
        ['Mid Evil 1', midEvilData, {'daycare': 145, 'hack': 202, 'wish' : 250}],
    ]
    test.each(cases)(
        "Calculators - Misc - %s",
        (name, data, expectedValues) => {
            var ec = expectClose(totalDaycareSpeed(data), expectedValues['daycare'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalHackSpeed(data), expectedValues['hack'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalWishSpeed(data), expectedValues['wish'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Calculators - Adventure', () => {
    var cases = [
        ['Early Normal 1', earlyNormalData, {'power': 693, 'toughness': 651}],
        ['Early Normal 2', earlyNormalTwoData, {'power': 23253, 'toughness': 20102}],
        ['Mid Normal 1', midNormalData, {'power': 1452000, 'toughness': 978531}],
        ['Mid Normal 2', midNormalTwoData, {'power': 1189000000, 'toughness': 783600000}],
        ['Late Normal', lateNormalData, {'power': 1010000000000, 'toughness': 674700000000}],
        ['Early Evil 1', earlyEvilData, {'power': 2.47e13, 'toughness': 1.477e13}],
        ['Evil Return to Normal', evilReturnToNormalData, {'power': 6.749e12, 'toughness': 2.2635e12}],
        ['Early Evil 2', earlyEvilTwoData, {'power': 1.621e14, 'toughness': 1.787e14}],
        ['Mid Evil 1', midEvilData, {'power': 5.401e16, 'toughness': 2.537e16}],
    ]
    test.each(cases)(
        "Calculators - Adventure - %s",
        (name, data, expectedValues) => {
            var ec = expectClose(totalPower(data), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalToughness(data), expectedValues['toughness'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Calculators - Misc', () => {
    var cases = [
        ['Early Normal 1', earlyNormalData, {'gold': 100, 'respawn': 100, 'dropChance' : 114}],
        ['Early Normal 2', earlyNormalTwoData, {'gold': 854, 'respawn': 95, 'dropChance' : 155}],
        ['Mid Normal 1', midNormalData, {'gold': 45377.5, 'respawn': 63.84, 'dropChance' : 705}],
        ['Mid Normal 2', midNormalTwoData, {'gold': 2638000, 'respawn': 63.08, 'dropChance' : 15760}],
        ['Late Normal', lateNormalData, {'gold': 15600000000, 'respawn': 41.15, 'dropChance' : 10440000}],
        ['Early Evil 1', earlyEvilData, {'gold': 1.713e12, 'respawn': 34.94, 'dropChance' : 6.294e8}],
        ['Evil Return to Normal', evilReturnToNormalData, {'gold': 1.698e11, 'respawn': 43.33, 'dropChance' : 1.564e8}],
        ['Early Evil 2', earlyEvilTwoData, {'gold': 9.265e14, 'respawn': 35.93, 'dropChance' : 1.629e9}],
        ['Mid Evil 1', midEvilData, {'gold': 4.011e17, 'respawn': 41.05, 'dropChance' : 2.975e10}],
    ]
    test.each(cases)(
        "Calculators - Misc - %s",
        (name, data, expectedValues) => {
            var ec = expectClose(totalGoldDrop(data), expectedValues['gold'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalRespawnRate(data), expectedValues['respawn'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalDropChance(data), expectedValues['dropChance'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})





describe('Calculators - Beards', () => {
    var cases = [
        ['Early Normal 1', earlyNormalData, {'energy': 7297, 'magic': 1265}],
        ['Early Normal 2', earlyNormalTwoData, {'energy': 258965, 'magic': 2961}],
        ['Mid Normal 1', midNormalData, {'energy': 2.133e8, 'magic': 3.262e6}],
        ['Mid Normal 2', midNormalTwoData, {'energy': 8.529e9, 'magic': 6.612e8}],
        ['Late Normal', lateNormalData, {'energy': 4.004e13, 'magic': 2.445e12}],
        ['Early Evil 1', earlyEvilData, {'energy': 1.363e15, 'magic': 4.047e13}],
        ['Evil Return to Normal', evilReturnToNormalData, {'energy': 7.061e14, 'magic': 5.085e13}],
        ['Early Evil 2', earlyEvilTwoData, {'energy': 7.169e16, 'magic': 4.514e16}],
        ['Mid Evil 1', midEvilData, {'energy': 1.310e17, 'magic': 2.526e16}],
    ]
    test.each(cases)(
        "Calculators - Beards - %s",
        (name, data, expectedValues) => {
            var ec = expectClose(totalEnergyBeardSpeed(data), expectedValues['energy'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalMagicBeardSpeed(data), expectedValues['magic'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})



describe('Calculators - Wandoos', () => {
    var cases = [
        ['Early Normal 1', earlyNormalData, {'energy': 4.04, 'magic': 4.04}],
        ['Early Normal 2', earlyNormalTwoData, {'energy': 103, 'magic': 103}],
        ['Mid Normal 1', midNormalData, {'energy': 1237, 'magic': 1237}],
        ['Mid Normal 2', midNormalTwoData, {'energy': 3.131e6, 'magic': 3.131e6}],
        ['Late Normal', lateNormalData, {'energy': 3.729e9, 'magic': 3.729e9}],
        ['Early Evil 1', earlyEvilData, {'energy': 3.698e11, 'magic': 3.698e11}],
        ['Evil Return to Normal', evilReturnToNormalData, {'energy': 9.078e9, 'magic': 9.078e9}],
        ['Early Evil 2', earlyEvilTwoData, {'energy': 6.854e11, 'magic': 6.854e11}],
        ['Mid Evil 1', midEvilData, {'energy': 6.318e11, 'magic': 6.318e11}],
    ]
    test.each(cases)(
        "Calculators - Beards - %s",
        (name, data, expectedValues) => {
            var ec = expectClose(totalEnergyWandoosSpeed(data), expectedValues['energy'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalMagicWandoosSpeed(data), expectedValues['magic'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})



// Found on Questing page
describe('Calculators - Quests', () => {
    var cases = [
        ['Early Normal 1', earlyNormalData, {'reward': 100, 'drop': 100}],
        ['Early Normal 2', earlyNormalTwoData, {'reward': 100, 'drop': 100}],
        ['Mid Normal 1', midNormalData, {'reward': 100, 'drop': 100}],
        ['Mid Normal 2', midNormalTwoData, {'reward': 115, 'drop': 110}],
        ['Late Normal', lateNormalData, {'reward': 115, 'drop': 110}],
        ['Early Evil 1', earlyEvilData, {'reward': 141, 'drop': 110}],
        ['Evil Return to Normal', evilReturnToNormalData, {'reward': 143, 'drop': 116.66}],
        ['Early Evil 2', earlyEvilTwoData, {'reward': 162, 'drop': 139.15}],
        ['Mid Evil 1', midEvilData, {'reward': 210, 'drop': 139.15}],
    ]
    test.each(cases)(
        "Calculators - Quests - %s",
        (name, data, expectedValues) => {
            var ec = expectClose(totalQuestRewardBonus(data), expectedValues['reward'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(totalQuestDropBonus(data), expectedValues['drop'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            
        }
    )
})
