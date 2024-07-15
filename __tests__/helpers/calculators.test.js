import {boostRecyclying, totalEnergyPower, totalEnergyBar, totalEnergyCap, totalMagicPower, totalMagicBar, totalMagicCap, totalEnergyNGUSpeedFactor, totalMagicNGUSpeedFactor, totalExpBonus, totalAPBonus, totalPPBonus, totalPower, totalToughness, totalGoldDrop, totalRespawnRate, totalDropChance}  from '../../src/helpers/calculators'
import earlyNormal from '../__data__/earlyNormal1'
import earlyNormalTwo from '../__data__/earlyNormal2';
import midNormal from '../__data__/midNormal1';
import midNormalTwo from '../__data__/midNormal2';
import lateNormal from '../__data__/lateNormal';
import { toDataObj, expectClose } from '../testHelperFunctions'




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
