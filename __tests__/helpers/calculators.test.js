import {boostRecyclying, totalEnergyPower, totalEnergyBar, totalEnergyCap, totalMagicPower, totalMagicBar, totalMagicCap, totalEnergyNGUSpeedFactor, totalMagicNGUSpeedFactor, totalExpBonus, totalAPBonus, totalPPBonus, totalPower, totalToughness, totalGoldDrop, totalRespawnRate, totalDropChance, totalRes3Power, totalRes3Bar, totalRes3Cap, totalHackSpeed, totalDaycareSpeed}  from '../../src/helpers/calculators'
import earlyNormal from '../__data__/earlyNormal1'
import earlyNormalTwo from '../__data__/earlyNormal2';
import midNormal from '../__data__/midNormal1';
import midNormalTwo from '../__data__/midNormal2';
import lateNormal from '../__data__/lateNormal';
import { toDataObj, expectClose } from '../testHelperFunctions'
import earlyEvil from '../__data__/earlyEvil1';
import evilReturnToNormal from '../__data__/evilReturnToNormal';
import earlyEvilTwo from '../__data__/earlyEvil2';
import midEvil from '../__data__/midEvil1';




// var playerStatesOne = {
//     'boostRecyclyingPurchase': [5],
//     'challenges': [{}]
// }

// test('Test if initializing', () => {
//     expect(boostRecyclying(playerStatesOne).getValue()).toBe('500')
// })


test('Energy for Early Normal 1', () => {
    var playerData = toDataObj(earlyNormal)
    expect(Number(totalEnergyPower(playerData).getValue())).toBeCloseTo(20.8, 1)
    expect(Number(totalEnergyBar(playerData).getValue())).toBeCloseTo(16.9, 1)
    expect(Number(totalEnergyCap(playerData).getValue())).toBeCloseTo(412500, 0)
});
test('Magic for Early Normal 1', () => {
    var playerData = toDataObj(earlyNormal)
    expect(Number(totalMagicPower(playerData).getValue())).toBeCloseTo(6.4, 1)
    expect(Number(totalMagicBar(playerData).getValue())).toBeCloseTo(5, 1)
    expect(Number(totalMagicCap(playerData).getValue())).toBeCloseTo(60000, 0)
});
test('NGU for Early Normal 1', () => {
    var playerData = toDataObj(earlyNormal)
    expect(Number(totalEnergyNGUSpeedFactor(playerData).getValue())).toBeCloseTo(2080, 0)
    expect(Number(totalMagicNGUSpeedFactor(playerData).getValue())).toBeCloseTo(640, 0)
});
test('Exp, AP, PP for Early Normal 1', () => {
    var playerData = toDataObj(earlyNormal)
    expect(Number(totalExpBonus(playerData).getValue())).toBeCloseTo(100, 0)
    expect(Number(totalAPBonus(playerData).getValue())).toBeCloseTo(102.35, 2)
    expect(Number(totalPPBonus(playerData).getValue())).toBeCloseTo(100, 0)
});
test('Adventure for Early Normal 1', () => {
    var playerData = toDataObj(earlyNormal)
    expect(Number(totalPower(playerData).getValue())).toBeCloseTo(693, 0)
    expect(Number(totalToughness(playerData).getValue())).toBeCloseTo(651, 0)
});
test('Misc Adventure for Early Normal 1', () => {
    var playerData = toDataObj(earlyNormal)
    expect(Number(totalGoldDrop(playerData).getValue())).toBeCloseTo(100, 0)
    expect(Number(totalRespawnRate(playerData).getValue())).toBeCloseTo(100, 0)
    expect(Number(totalDropChance(playerData).getValue())).toBeCloseTo(114, 0)
})
















test('Energy for Early Normal 2', () => {
    var playerData = toDataObj(earlyNormalTwo)
    expect(Number(totalEnergyPower(playerData).getValue())).toBeCloseTo(269, 0);
    expect(Number(totalEnergyBar(playerData).getValue())).toBeCloseTo(158, 0);
    expect(Number(totalEnergyCap(playerData).getValue())).toBeCloseTo(2262598, 0);
});
test('Magic for Early Normal 2', () => {
    var playerData = toDataObj(earlyNormalTwo)
    expect(Number(totalMagicPower(playerData).getValue())).toBeCloseTo(14, 0);
    expect(Number(totalMagicBar(playerData).getValue())).toBeCloseTo(8, 0);
    expect(Number(totalMagicCap(playerData).getValue())).toBeCloseTo(330000, 0);
});
test('NGU for Early Normal 2', () => {
    var playerData = toDataObj(earlyNormalTwo)
    expect(Number(totalEnergyNGUSpeedFactor(playerData).getValue())).toBeCloseTo(29550, 0);
    expect(Number(totalMagicNGUSpeedFactor(playerData).getValue())).toBeCloseTo(1507, 0);
});
test('Exp, AP, PP for Early Normal 2', () => {
    var playerData = toDataObj(earlyNormalTwo)
    expect(Number(totalExpBonus(playerData).getValue())).toBeCloseTo(100, 0)
    expect(Number(totalAPBonus(playerData).getValue())).toBeCloseTo(106.45, 2)
    expect(Number(totalPPBonus(playerData).getValue())).toBeCloseTo(100, 0)
});
test('Adventure for Early Normal 2', () => {
    var playerData = toDataObj(earlyNormalTwo)
    expect(Number(totalPower(playerData).getValue())).toBeCloseTo(23253, 0)
    expect(Number(totalToughness(playerData).getValue())).toBeCloseTo(20102, 0)
});
test('Misc Adventure for Early Normal 2', () => {
    var playerData = toDataObj(earlyNormalTwo)
    expect(Number(totalGoldDrop(playerData).getValue())).toBeCloseTo(854, 0)
    expect(Number(totalRespawnRate(playerData).getValue())).toBeCloseTo(95, 0)
    expect(Number(totalDropChance(playerData).getValue())).toBeCloseTo(155, 0)
})















test('Energy for Mid Normal 1', () => {
    var playerData = toDataObj(midNormal)
    expect(Number(totalEnergyPower(playerData).getValue())).toBeCloseTo(19795.5, 1)
    expect(Number(totalEnergyBar(playerData).getValue())).toBeCloseTo(10560, 0)
    var ec = expectClose(Number(totalEnergyCap(playerData).getValue()), 154393342, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Magic for Mid Normal 1', () => {
    var playerData = toDataObj(midNormal)
    expect(Number(totalMagicPower(playerData).getValue())).toBeCloseTo(1640, 0)
    var ec = expectClose(Number(totalMagicBar(playerData).getValue()), 561, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(Number(totalMagicCap(playerData).getValue())).toBeCloseTo(6941520, 0)
});
test('NGU for Mid Normal 1', () => {
    var playerData = toDataObj(midNormal)
    var ec = expectClose(Number(totalEnergyNGUSpeedFactor(playerData).getValue()), 2178000, 3)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicNGUSpeedFactor(playerData).getValue()), 541060, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Exp, AP, PP for Mid Normal 1', () => {
    var playerData = toDataObj(midNormal)
    expect(Number(totalExpBonus(playerData).getValue())).toBeCloseTo(100, 0)
    expect(Number(totalAPBonus(playerData).getValue())).toBeCloseTo(116.15, 2)
    expect(Number(totalPPBonus(playerData).getValue())).toBeCloseTo(110, 0)
});
test('Adventure for Mid Normal 1', () => {
    var playerData = toDataObj(midNormal)
    // These might be wrong as save file added AT
    var ec = expectClose(Number(totalPower(playerData).getValue()), 1452000, 4)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalToughness(playerData).getValue()), 978531, 3)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Misc Adventure for Mid Normal 1', () => {
    var playerData = toDataObj(midNormal)
    // Drop Chance might be wrong as save file added Beard
    expect(Number(totalGoldDrop(playerData).getValue())).toBeCloseTo(45377.5, 1)
    expect(Number(totalRespawnRate(playerData).getValue())).toBeCloseTo(63.84, 0)
    expect(Number(totalDropChance(playerData).getValue())).toBeCloseTo(705, 0)
})













test('Energy for Mid Normal 2', () => {
    var playerData = toDataObj(midNormalTwo)
    expect(Number(totalEnergyPower(playerData).getValue())).toBeCloseTo(396562, 0)
    var ec = expectClose(Number(totalEnergyBar(playerData).getValue()), 84914, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalEnergyCap(playerData).getValue()), 1617782234, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Magic for Mid Normal 2', () => {
    var playerData = toDataObj(midNormalTwo)
    expect(Number(totalMagicPower(playerData).getValue())).toBeCloseTo(49734, 0)
    var ec = expectClose(Number(totalMagicBar(playerData).getValue()), 18589, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicCap(playerData).getValue()), 281061326, 4)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('NGU for Mid Normal 2', () => {
    var playerData = toDataObj(midNormalTwo)
    var ec = expectClose(Number(totalEnergyNGUSpeedFactor(playerData).getValue()), 1290000000, 6)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicNGUSpeedFactor(playerData).getValue()), 648400000, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Exp, AP, PP for Mid Normal 2', () => {
    var playerData = toDataObj(midNormalTwo)
    expect(Number(totalExpBonus(playerData).getValue())).toBeCloseTo(132, 0)
    expect(Number(totalAPBonus(playerData).getValue())).toBeCloseTo(155.46, 2)
    expect(Number(totalPPBonus(playerData).getValue())).toBeCloseTo(115.5, 0)
});
test('Adventure for Mid Normal 2', () => {
    var playerData = toDataObj(midNormalTwo)
    // These numbers will change as Cube increases in offline
    var ec = expectClose(Number(totalPower(playerData).getValue()), 1189000000, 9)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalToughness(playerData).getValue()), 783600000, 6)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Misc Adventure for Mid Normal 2', () => {
    var playerData = toDataObj(midNormalTwo)
    var ec = expectClose(Number(totalGoldDrop(playerData).getValue()), 2638000, 3)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(Number(totalRespawnRate(playerData).getValue())).toBeCloseTo(63.08, 0)
    expect(Number(totalDropChance(playerData).getValue())).toBeCloseTo(15760, 0)
})












test('Energy for Late Normal', () => {
    var playerData = toDataObj(lateNormal)
    var ec = expectClose(Number(totalEnergyPower(playerData).getValue()), 15400000, 4)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalEnergyBar(playerData).getValue()), 7272000, 3)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalEnergyCap(playerData).getValue()), 47268056150, 6)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Magic for Late Normal', () => {
    var playerData = toDataObj(lateNormal)
    var ec = expectClose(Number(totalMagicPower(playerData).getValue()), 3907000, 3)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicBar(playerData).getValue()), 2249000, 3)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicCap(playerData).getValue()), 14390053554, 6)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('NGU for Late Normal', () => {
    var playerData = toDataObj(lateNormal)
    var ec = expectClose(Number(totalEnergyNGUSpeedFactor(playerData).getValue()), 1091000000000, 9)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicNGUSpeedFactor(playerData).getValue()), 1163000000000, 9)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Exp, AP, PP for Late Normal', () => {
    var playerData = toDataObj(lateNormal)
    expect(Number(totalExpBonus(playerData).getValue())).toBeCloseTo(1776.49, 0)
    expect(Number(totalAPBonus(playerData).getValue())).toBeCloseTo(173.76, 2)
    expect(Number(totalPPBonus(playerData).getValue())).toBeCloseTo(348.58, 0)
});
test('Adventure for Late Normal', () => {
    var playerData = toDataObj(lateNormal)
    // These numbers will change as Cube increases in offline
    var ec = expectClose(Number(totalPower(playerData).getValue()), 1010000000000, 9)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalToughness(playerData).getValue()), 674700000000, 8)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Misc Adventure for Late Normal', () => {
    var playerData = toDataObj(lateNormal)
    var ec = expectClose(Number(totalGoldDrop(playerData).getValue()), 15600000000, 7)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(Number(totalRespawnRate(playerData).getValue())).toBeCloseTo(41.15, 0)
    var ec = expectClose(Number(totalDropChance(playerData).getValue()), 10440000, 4)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
})

















test('Energy for Evil - Return to Normal', () => {
    var playerData = toDataObj(earlyEvil)
    var ec = expectClose(Number(totalEnergyPower(playerData).getValue()), 1148000000, 6)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalEnergyBar(playerData).getValue()), 176300000, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalEnergyCap(playerData).getValue()), 1618503168662, 9)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Magic for Evil - Return to Normal', () => {
    var playerData = toDataObj(earlyEvil)
    var ec = expectClose(Number(totalMagicPower(playerData).getValue()), 106800000, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicBar(playerData).getValue()), 22880000, 4)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicCap(playerData).getValue()), 309027642136, 8)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('NGU for Evil - Return to Normal', () => {
    var playerData = toDataObj(earlyEvil)
    var ec = expectClose(Number(totalEnergyNGUSpeedFactor(playerData).getValue()), 8.197 * 10**14, 11)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicNGUSpeedFactor(playerData).getValue()), 3.208 * 10**14, 11)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Exp, AP, PP for Evil - Return to Normal', () => {
    var playerData = toDataObj(earlyEvil)
    expect(Number(totalExpBonus(playerData).getValue())).toBeCloseTo(1747.11, 0)
    expect(Number(totalAPBonus(playerData).getValue())).toBeCloseTo(185.58, 2)
    expect(Number(totalPPBonus(playerData).getValue())).toBeCloseTo(1485.88, 0)
});
test('Adventure for Evil - Return to Normal', () => {
    var playerData = toDataObj(earlyEvil)
    // These numbers will change as Cube increases in offline
    var ec = expectClose(Number(totalPower(playerData).getValue()), 2.470 * 10**13, 10)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalToughness(playerData).getValue()), 1.477 * 10 ** 13, 10)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Misc Adventure for Evil - Return to Normal', () => {
    var playerData = toDataObj(earlyEvil)
    var ec = expectClose(Number(totalGoldDrop(playerData).getValue()), 1.713 * 10 ** 12, 9)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(Number(totalRespawnRate(playerData).getValue())).toBeCloseTo(34.94, 0)
    var ec = expectClose(Number(totalDropChance(playerData).getValue()), 6.294 * 10 ** 8, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
})













test('Energy for Evil - Return to Normal', () => {
    var playerData = toDataObj(evilReturnToNormal)
    var ec = expectClose(Number(totalEnergyPower(playerData).getValue()), 7.554e8, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalEnergyBar(playerData).getValue()), 1.46e8, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalEnergyCap(playerData).getValue()), 2395637339264, 9)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Magic for Evil - Return to Normal', () => {
    var playerData = toDataObj(evilReturnToNormal)
    var ec = expectClose(Number(totalMagicPower(playerData).getValue()), 8.385e7, 4)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicBar(playerData).getValue()), 3.155e7, 4)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicCap(playerData).getValue()), 258609120090, 8)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});

test('Resource 3 for Evil - Return to Normal', () => {
    var playerData = toDataObj(evilReturnToNormal)
    var ec = expectClose(Number(totalRes3Power(playerData).getValue()), 3, 0)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalRes3Bar(playerData).getValue()), 3, 0)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalRes3Cap(playerData).getValue()), 90000, 0)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});

test('NGU for Evil - Return to Normal', () => {
    var playerData = toDataObj(evilReturnToNormal)
    var ec = expectClose(Number(totalEnergyNGUSpeedFactor(playerData).getValue()), 8.575e12, 9)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicNGUSpeedFactor(playerData).getValue()), 3.442e12, 9)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Exp, AP, PP for Evil - Return to Normal', () => {
    var playerData = toDataObj(evilReturnToNormal)
    expect(Number(totalExpBonus(playerData).getValue())).toBeCloseTo(1665.96, 0)
    expect(Number(totalAPBonus(playerData).getValue())).toBeCloseTo(186.18, 2)
    expect(Number(totalPPBonus(playerData).getValue())).toBeCloseTo(1788.99, 0)
});
test('Adventure for Evil - Return to Normal', () => {
    var playerData = toDataObj(evilReturnToNormal)
    // These numbers will change as Cube increases in offline
    var ec = expectClose(Number(totalPower(playerData).getValue()), 6.749e12, 9)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalToughness(playerData).getValue()), 2.2635e12, 9)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Misc Adventure for Evil - Return to Normal', () => {
    var playerData = toDataObj(evilReturnToNormal)
    var ec = expectClose(Number(totalGoldDrop(playerData).getValue()), 1.698e11, 8)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(Number(totalRespawnRate(playerData).getValue())).toBeCloseTo(43.33, 0)
    var ec = expectClose(Number(totalDropChance(playerData).getValue()), 1.564e8, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
})
















test('Energy for Early Evil 2', () => {
    var playerData = toDataObj(earlyEvilTwo)
    var ec = expectClose(Number(totalEnergyPower(playerData).getValue()), 9.522e9, 6)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalEnergyBar(playerData).getValue()), 1.152e9, 6)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalEnergyCap(playerData).getValue()), 26218964477405, 10)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Magic for Early Evil 2', () => {
    var playerData = toDataObj(earlyEvilTwo)
    var ec = expectClose(Number(totalMagicPower(playerData).getValue()), 3.153e9, 6)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicBar(playerData).getValue()), 1.260e9, 6)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicCap(playerData).getValue()), 6363454536030, 9)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});

test('Resource 3 for Early Evil 2', () => {
    var playerData = toDataObj(earlyEvilTwo)
    var ec = expectClose(Number(totalRes3Power(playerData).getValue()), 3, 0)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalRes3Bar(playerData).getValue()), 6, 0)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalRes3Cap(playerData).getValue()), 90000, 0)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});

test('NGU for Early Evil 2', () => {
    var playerData = toDataObj(earlyEvilTwo)
    var ec = expectClose(Number(totalEnergyNGUSpeedFactor(playerData).getValue()), 1.588e16, 13)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalMagicNGUSpeedFactor(playerData).getValue()), 2.452e16, 13)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Exp, AP, PP for Early Evil 2', () => {
    var playerData = toDataObj(earlyEvilTwo)
    expect(Number(totalExpBonus(playerData).getValue())).toBeCloseTo(2402.84, 0)
    expect(Number(totalAPBonus(playerData).getValue())).toBeCloseTo(187.38, 2)
    expect(Number(totalPPBonus(playerData).getValue())).toBeCloseTo(2502.83, 0)
});

test('Misc for Early Evil 2', () => {
    var playerData = toDataObj(earlyEvilTwo)
    expect(Number(totalDaycareSpeed(playerData).getValue())).toBeCloseTo(126, 0)
    expect(Number(totalHackSpeed(playerData).getValue())).toBeCloseTo(175, 0)
});

test('Adventure for Early Evil 2', () => {
    var playerData = toDataObj(earlyEvilTwo)
    // These numbers will change as Cube increases in offline
    var ec = expectClose(Number(totalPower(playerData).getValue()), 1.621e14, 11)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var ec = expectClose(Number(totalToughness(playerData).getValue()), 1.787e14, 11)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
});
test('Misc Adventure for Early Evil 2', () => {
    var playerData = toDataObj(earlyEvilTwo)
    var ec = expectClose(Number(totalGoldDrop(playerData).getValue()), 9.265e14, 11)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(Number(totalRespawnRate(playerData).getValue())).toBeCloseTo(35.93, 0)
    var ec = expectClose(Number(totalDropChance(playerData).getValue()), 1.629e9, 6)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
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
