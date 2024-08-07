import { totalAPBonus, totalDaycareSpeed, totalDropChance, totalEnergyBar, totalEnergyCap, totalEnergyNGUSpeedFactor, totalEnergyPower, totalExpBonus, totalGoldDrop, totalHackSpeed, totalMagicBar, totalMagicCap, totalMagicNGUSpeedFactor, totalMagicPower, totalPPBonus, totalPower, totalRes3Bar, totalRes3Cap, totalRes3Power, totalRespawnRate, totalToughness, totalWishSpeed } from '@/helpers/calculators';
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























































test('Energy for Mid Evil 1', () => {
    var playerData = toDataObj(midEvil)
    var ec = expectClose(Number(totalEnergyPower(playerData).getValue()), 4.299e10, 7)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalEnergyBar(playerData).getValue()), 5.743e9, 6)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalEnergyCap(playerData).getValue()), 111846015531154, 11)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Magic for Mid Evil 1', () => {
    var playerData = toDataObj(midEvil)
    var ec = expectClose(Number(totalMagicPower(playerData).getValue()), 1.439e10, 7)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicBar(playerData).getValue()), 1.914e9, 6)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicCap(playerData).getValue()), 44967554132115, 10)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});

test('Resource 3 for Mid Evil 1', () => {
    var playerData = toDataObj(midEvil)
    var ec = expectClose(Number(totalRes3Power(playerData).getValue()), 188, 0)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalRes3Bar(playerData).floor().getValue()), 30, 0)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalRes3Cap(playerData).getValue()), 5549251, 3)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});

test('NGU for Mid Evil 1', () => {
    var playerData = toDataObj(midEvil)
    var ec = expectClose(Number(totalEnergyNGUSpeedFactor(playerData).getValue()), 1.265e16, 13)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicNGUSpeedFactor(playerData).getValue()), 1.926e16, 13)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Exp, AP, PP for Mid Evil 1', () => {
    var playerData = toDataObj(midEvil)
    expect(Number(totalExpBonus(playerData).getValue())).toBeCloseTo(3504.79, 0)
    expect(Number(totalAPBonus(playerData).getValue())).toBeCloseTo(191.12, 1)
    expect(Number(totalPPBonus(playerData).getValue())).toBeCloseTo(3884.76, 0)
});

test('Misc for Mid Evil 1', () => {
    var playerData = toDataObj(midEvil)
    expect(Number(totalDaycareSpeed(playerData).getValue())).toBeCloseTo(145, 0)
    expect(Number(totalHackSpeed(playerData).getValue())).toBeCloseTo(202, 0)
    //expect(Number(totalHackSpeed(playerData).getValue())).toBeCloseTo(250, 0)
});

test('Adventure for Mid Evil 1', () => {
    var playerData = toDataObj(midEvil)
    // These numbers will change as Cube increases in offline
    var ec = expectClose(Number(totalPower(playerData).getValue()), 5.401e16, 13)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalToughness(playerData).getValue()), 2.537e16, 13)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Misc Adventure for Mid Evil 1', () => {
    var playerData = toDataObj(midEvil)
    var ec = expectClose(Number(totalGoldDrop(playerData).getValue()), 4.011e17, 14)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(Number(totalRespawnRate(playerData).getValue())).toBeCloseTo(41.05, 0)
    var ec = expectClose(Number(totalDropChance(playerData).getValue()), 2.975e10, 7)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
})
