import Player from "@/assets/player"
import earlyEvil from "@/__data__/earlyEvil1"
import earlyEvilTwo from "@/__data__/earlyEvil2"
import earlyNormal from "@/__data__/earlyNormal1"
import earlyNormalTwo from "@/__data__/earlyNormal2"
import earlySad from "@/__data__/earlySad1"
import evilReturnToNormal from "@/__data__/evilReturnToNormal"
import lateEvil from "@/__data__/lateEvil1"
import lateNormal from "@/__data__/lateNormal"
import midEvil from "@/__data__/midEvil1"
import midEvilTwo from "@/__data__/midEvil2"
import midNormal from "@/__data__/midNormal1"
import midNormalTwo from "@/__data__/midNormal2"
import { achievementAPBonus, advTrainingInfo, apItemInfo, beardInfoPerm, beardInfoTemp, challengeInfo, diggerInfo, equipmentWithCubeInfo, hackInfo, isMaxxedItemSet, macguffinInfo, maxxedItemSetNum, nguInfo, perkInfo, quirkInfo, wishInfo } from "@/helpers/resourceInfo"
import { expectClose, infoObjType } from "../../helpers/testHelperFunctions"
import { ItemSet, ItemSets } from "@/assets/sets"
import { Stat } from "@/assets/stat"


const earlyNormalPlayer = new Player(false, true)
earlyNormalPlayer.importPlayerData(earlyNormal)
const earlyNormalTwoPlayer = new Player(false, true)
earlyNormalTwoPlayer.importPlayerData(earlyNormalTwo)
const midNormalPlayer = new Player(false, true)
midNormalPlayer.importPlayerData(midNormal)
const midNormalTwoPlayer = new Player(false, true)
midNormalTwoPlayer.importPlayerData(midNormalTwo)
const lateNormalPlayer = new Player(false, true)
lateNormalPlayer.importPlayerData(lateNormal)

const earlyEvilPlayer = new Player(false, true)
earlyEvilPlayer.importPlayerData(earlyEvil)
const evilReturnToNormalPlayer = new Player(false, true)
evilReturnToNormalPlayer.importPlayerData(evilReturnToNormal)
const earlyEvilTwoPlayer = new Player(false, true)
earlyEvilTwoPlayer.importPlayerData(earlyEvilTwo)
const midEvilPlayer = new Player(false, true)
midEvilPlayer.importPlayerData(midEvil)
const midEvilTwoPlayer = new Player(false, true)
midEvilTwoPlayer.importPlayerData(midEvilTwo)
const lateEvilPlayer = new Player(false, true)
lateEvilPlayer.importPlayerData(lateEvil)

const earlySadPlayer = new Player(false, true)
earlySadPlayer.importPlayerData(earlySad)


describe('Resource Info - Achievement Info', () => {
    const cases : [string, Player, number][] = [
        ['Early Normal 1', earlyNormalPlayer, 102.35],
        ['Early Normal 2', earlyNormalTwoPlayer, 106.45],
        ['Mid Normal 1', midNormalPlayer, 116.15],
        ['Mid Normal 2', midNormalTwoPlayer, 129.55],
        ['Late Normal', lateNormalPlayer, 144.8],
        ['Early Evil 1', earlyEvilPlayer, 154.65],
        ['Evil Return to Normal', evilReturnToNormalPlayer, 155.15],
        ['Early Evil 2', earlyEvilTwoPlayer, 156.15],
        ['Mid Evil 1', midEvilPlayer, 156.15],
        ['Mid Evil 2', midEvilTwoPlayer, 156.55],
        ['Late Evil 1', lateEvilPlayer, 156.55],
        ['Early Sad 1', earlySadPlayer, 157.15],
    ]
    
    test.each(cases)(
        "Achievement Info - %s",
        (_name, player, expectedValues) => {       
            
            expectedValues + 1
            const ec = expectClose(achievementAPBonus(player), expectedValues)
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})



describe('Resource Info - Adv Training Info', () => {
    const cases : [string, Player, Pick<Required<infoObjType>, 'power' | 'epower'>][]= [
        ['Early Normal 1', earlyNormalPlayer, {'power' : 110, 'epower' : 100}],
        ['Early Normal 2', earlyNormalTwoPlayer, {'power' : 301.3, 'epower' : 100}],
        ['Mid Normal 1', midNormalPlayer, {'power' : 113.2, 'epower' : 100}],
        ['Mid Normal 2', midNormalTwoPlayer, {'power' : 793.15, 'epower' : 100}],
        ['Late Normal', lateNormalPlayer, {'power' : 1670.14, 'epower' : 100}],
        ['Early Evil 1', earlyEvilPlayer, {'power' : 113.2, 'epower' : 100}],
        ['Evil Return to Normal', evilReturnToNormalPlayer, {'power' : 163.1, 'epower' : 100}],
        ['Early Evil 2', earlyEvilTwoPlayer, {'power' : 163.1, 'epower' : 100}],
        ['Mid Evil 1', midEvilPlayer,  {'power' : 163.1, 'epower' : 100}],
    ]
    test.each(cases)(
        "Adv Training Info - %s",
        (_name, player, expectedValues) => {
            
            var ec = expectClose(advTrainingInfo(player, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(advTrainingInfo(player, Stat.ENERGY_POWER), expectedValues['epower'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Resource Info - AP Info', () => {
    const cases : [string, Player, number][] = [
        ['Early Normal 1', earlyNormalPlayer, 100],
        // ['Early Normal 2', earlyNormalTwoPlayer, 100],
        // ['Mid Normal 1', midNormalPlayer, 100],
        // ['Mid Normal 2', midNormalTwoPlayer, 100],
        // ['Late Normal', lateNormalPlayer, 100],
        ['Early Evil 1', earlyEvilPlayer, 100],
        // ['Evil Return to Normal', evilReturnToNormalPlayer, 100],
        // ['Early Evil 2', earlyEvilTwoPlayer, 100],
        // ['Mid Evil 1', midEvilPlayer, 100],
        // ['Mid Evil 2', midEvil2, 100],
        ['Early Sad 1', earlySadPlayer, 100],
    ]
    test.each(cases)(
        "AP Info - %s",
        (_name, player, expectedValues) => {
            
            const ec = expectClose(apItemInfo(player, Stat.POWER), expectedValues)
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})




describe('Resource Info - Beard Temp Info', () => {
    const cases : [string, Player, Pick<Required<infoObjType>, 'power' | 'dc'>][]= [
        ['Early Normal 1', earlyNormalPlayer, {'power' : 100, 'dc' : 100}],
        // ['Early Normal 2', earlyNormalTwoPlayer, {'power' : 100, 'dc' : 100}],
        // ['Mid Normal 1', midNormalPlayer, {'power' : 100, 'dc' : 100}],
        // ['Mid Normal 2', midNormalTwoPlayer, {'power' : 100, 'dc' : 100}],
        // ['Late Normal', lateNormalPlayer, {'power' : 100, 'dc' : 100}],
        ['Early Evil 1', earlyEvilPlayer, {'power' : 1210, 'dc' : 884}],
        // ['Evil Return to Normal', evilReturnToNormalPlayer, {'power' : 100, 'dc' : 100}],
        // ['Early Evil 2', earlyEvilTwoPlayer, {'power' : 100, 'dc' : 100}],
        // ['Mid Evil 1', midEvilPlayer, {'power' : 100, 'dc' : 100}],
        ['Mid Evil 2', midEvilTwoPlayer, {'power' : 2653.44, 'dc' : 1653.23}],
        ['Late Evil 1', lateEvilPlayer, {'power' : 2579.16, 'dc' : 1339.6}],
        ['Early Sad 1', earlySadPlayer, {'power' : 4390.12, 'dc' : 2245.06}],
    ]
    test.each(cases)(
        "Beard Temp Info - %s",
        (_name, player, expectedValues) => {
            
            var ec = expectClose(beardInfoTemp(player, Stat.POWER, true), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(beardInfoTemp(player, Stat.DROP_CHANCE, true), expectedValues['dc'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Resource Info - Beard Perm Info', () => {
    const cases : [string, Player, Pick<Required<infoObjType>, 'power' | 'dc'>][] = [
        ['Early Normal 1', earlyNormalPlayer, {'power' : 100, 'dc' : 100}],
        ['Early Normal 2', earlyNormalTwoPlayer, {'power' : 100, 'dc' : 100}],
        ['Mid Normal 1', midNormalPlayer, {'power' : 141, 'dc' : 148}],
        ['Mid Normal 2', midNormalTwoPlayer, {'power' : 199, 'dc' : 192}],
        ['Late Normal', lateNormalPlayer, {'power' : 341, 'dc' : 267}],
        ['Early Evil 1', earlyEvilPlayer, {'power' : 695, 'dc' : 396}],
        ['Evil Return to Normal', evilReturnToNormalPlayer, {'power' : 730, 'dc' : 408}],
        ['Early Evil 2', earlyEvilTwoPlayer, {'power' : 908, 'dc' : 466}],
        ['Mid Evil 1', midEvilPlayer, {'power' : 1481, 'dc' : 591}],
        ['Mid Evil 2', midEvilTwoPlayer, {'power' : 1989.36, 'dc' : 682.72}],
        ['Late Evil 1', lateEvilPlayer, {'power' : 2256.3, 'dc' : 724.98}],
        ['Early Sad 1', earlySadPlayer, {'power' : 2825.61, 'dc' : 818.5}],
    ]
    test.each(cases)(
        "Beard Perm Info - %s",
        (_name, player, expectedValues) => {
            
            var ec = expectClose(beardInfoPerm(player, Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(beardInfoPerm(player, Stat.DROP_CHANCE), expectedValues['dc'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})

describe('Resource Info - Challenge Info', () => {
    const cases : [string, Player, Pick<Required<infoObjType>, 'power' | 'mngu'>][]= [
        ['Early Normal 1', earlyNormalPlayer, {'power' : 100, 'mngu' : 100}],
        ['Early Normal 2', earlyNormalTwoPlayer, {'power' : 100, 'mngu' : 100}],
        ['Mid Normal 1', midNormalPlayer, {'power' : 135, 'mngu' : 100}],
        ['Mid Normal 2', midNormalTwoPlayer, {'power' : 135, 'mngu' : 135}],
        ['Late Normal', lateNormalPlayer, {'power' : 135, 'mngu' : 150}],
        ['Early Evil 1', earlyEvilPlayer, {'power' : 149, 'mngu' : 150}],
        ['Evil Return to Normal', evilReturnToNormalPlayer, {'power' : 149, 'mngu' : 150}],
        ['Early Evil 2', earlyEvilTwoPlayer, {'power' : 203, 'mngu' : 150}],
        ['Mid Evil 1', midEvilPlayer, {'power' : 203, 'mngu' : 150}],
        ['Mid Evil 2', midEvilTwoPlayer, {'power' : 203, 'mngu' : 150}],
    ]
    test.each(cases)(
        "Challenge Info - %s",
        (_name, player, expectedValues) => {
            
            var ec = expectClose(challengeInfo(player,  Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(challengeInfo(player,  Stat.MAGIC_NGU_SPEED), expectedValues['mngu'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Resource Info - Digger Info', () => {
    const cases : [string, Player, Pick<Required<infoObjType>, 'power'>][] = [
        ['Early Normal 1', earlyNormalPlayer, {'power' : 100}],
        // ['Early Normal 2', earlyNormalTwoPlayer, {'power' : 100}],
        // ['Mid Normal 1', midNormalPlayer, {'power' : 100}],
        // ['Mid Normal 2', midNormalTwoPlayer, {'power' : 100}],
        ['Late Normal', lateNormalPlayer, {'power' : 235.64}],
        // ['Early Evil 1', earlyEvilPlayer, {'power' : 100}],
        // ['Evil Return to Normal', evilReturnToNormalPlayer, {'power' : 100}],
        // ['Early Evil 2', earlyEvilTwoPlayer, {'power' : 100}],
        // ['Mid Evil 1', earlyEvilTwoPlayer, {'power' : 100}],
        ['Mid Evil 2', midEvilTwoPlayer, {'power' : 100}],
        ['Late Evil 1', lateEvilPlayer, {'power' : 345.22}],
        ['Early Sad 1', earlySadPlayer, {'power' : 343.25}],
    ]
    test.each(cases)(
        "Digger Info - %s",
        (_name, player, expectedValues) => {
            
            const ec = expectClose(diggerInfo(player,  Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})



describe('Resource Info - Equipment Info', () => {
    const cases : [string, Player, Pick<Required<infoObjType>, 'power' | 'toughness' | 'epower' | 'mcap' | 'dc' | 'respawn' | 'engu' | 'mwandoos'>][] = [
        ['Early Normal 1', earlyNormalPlayer, {
            'power' : 435,
            'toughness' : 404,
            'epower' : 160,
            'mcap' : 100,
            'dc' : 104,
            'respawn' : 100,
            'engu' : 100,
            'mwandoos' : 100,
        }],
        ['Early Normal 2', earlyNormalTwoPlayer, {
            'power' : 6736,
            'toughness' : 5779,
            'epower' : 511,
            'mcap' : 110,
            'dc' : 140.8,
            'respawn' : 100,
            'engu' : 100,
            'mwandoos' : 104,
        }],
        ['Mid Normal 1', midNormalPlayer, {
            'power' : 198896,
            'toughness' : 130210+1627,
            'epower' : 3112.5,
            'mcap' : 482,
            'dc' : 290,
            'respawn' : 116,
            'engu' : 100,
            'mwandoos' : 100,
        }],
        ['Mid Normal 2', midNormalTwoPlayer, {
            'power' : 1450789,
            'toughness' : 777305+348826.75,
            'epower' : 8708,
            'mcap' : 868,
            'dc' : 330,
            'respawn' : 116,
            'engu' : 704.5,
            'mwandoos' : 607.6,
        }],
        ['Late Normal', lateNormalPlayer, {
            'power' : 5956238,
            'toughness' : 5.969e6,// 2.761e6+20327854,
            'epower' : 24500,
            'mcap' : 2820,
            'dc' : 370,
            'respawn' : 128,
            'engu' : 1600,
            'mwandoos' : 340,
        }],
        ['Early Evil 1', earlyEvilPlayer, {
            'power' : (1.887e7 ) - (2.347e6),
            'toughness' : 1.45775e7, //6.112e6+60732380,
            'epower' : 57300,
            'mcap' : 6260,
            'dc' : 490,
            'respawn' : 136,
            'engu' : 1800,
            'mwandoos' : 100,
        }],
        ['Evil Return to Normal', evilReturnToNormalPlayer, {
            'power' :  1.83e7 + 2.152e7,
            'toughness' : 1.84356e7,//7.606e6+33232670,
            'epower' : 42111,
            'mcap' : 4856,
            'dc' : 1389.374,
            'respawn' : 124,
            'engu' : 100,
            'mwandoos' : 100,
        }],
        ['Early Evil 2', earlyEvilTwoPlayer, {
            'power' : 3.445e7 + 3.982e7,
            'toughness' : 8.239e7,//3.851e7+88385088,
            'epower' : 107542,
            'mcap' : 7476,
            'dc' : 990,
            'respawn' : 130,
            'engu' : 1700,
            'mwandoos' : 500,
        }],
        ['Mid Evil 1', midEvilPlayer, {
            'power' : 2.448e8 + 1.258e8,
            'toughness' : 1.286e8 + 126625608,
            'epower' : 196100,
            'mcap' : 23718,
            'dc' : 1890,
            'respawn' : 120,
            'engu' : 100,
            'mwandoos' : 100,
        }],
        ['Mid Evil 2', midEvilTwoPlayer, {
            'power' : 8.164e8 + 5.579e8,
            'toughness' : 4.88e8 + 5.389e8,
            'epower' : 615170,
            'mcap' : 13479,
            'dc' : 2490,
            'respawn' : 104,
            'engu' : 2167,
            'mwandoos' : 200,
        }],
        ['Late Evil 1', lateEvilPlayer, {
            'power' : 1.464e9 + 7.434e8,
            'toughness' : 5.858e8 + 6.866e8,
            'epower' : 942100,
            'mcap' : 39946,
            'dc' : 2310,
            'respawn' : 200 - 76,
            'engu' : 1900,
            'mwandoos' : 960,
        }],
        ['Early Sad 1', earlySadPlayer, {
            'power' : 3.257e9 + 9.224e9,
            'toughness' : 1.676e9 + 2.756e9,
            'epower' : 1.793e6,
            'mcap' : 126420,
            'dc' : 6340,
            'respawn' : 200 - 74,
            'engu' : 400,
            'mwandoos' : 100,
        }],
    ]
    test.each(cases)(
        "Equipment Info - %s",
        (_name, player, expectedValues) => {
            
            var ec = expectClose(equipmentWithCubeInfo(player,  Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentWithCubeInfo(player,  Stat.TOUGHNESS), expectedValues['toughness'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentWithCubeInfo(player,  Stat.ENERGY_POWER), expectedValues['epower'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentWithCubeInfo(player,  Stat.MAGIC_CAP), expectedValues['mcap'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentWithCubeInfo(player,  Stat.DROP_CHANCE), expectedValues['dc'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentWithCubeInfo(player,  Stat.RESPAWN), expectedValues['respawn'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentWithCubeInfo(player,  Stat.ENERGY_NGU_SPEED), expectedValues['engu'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(equipmentWithCubeInfo(player,  Stat.MAGIC_WANDOOS_SPEED), expectedValues['mwandoos'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})

describe('Resource Info - Hack Info', () => {
    const cases : [string, Player, Pick<Required<infoObjType>, 'power' | 'qp' | 'wish'>][] = [
        ['Early Normal 1', earlyNormalPlayer, {
            'power' : 100,
            'qp': 100,
            'wish': 100,
        }],
        ['Early Normal 2', earlyNormalTwoPlayer, {
            'power' : 100,
            'qp': 100,
            'wish': 100,
        }],
        ['Mid Normal 1', midNormalPlayer, {
            'power' : 100,
            'qp': 100,
            'wish': 100,
        }],
        ['Mid Normal 2', midNormalTwoPlayer, {
            'power' : 100,
            'qp': 100,
            'wish': 100,
        }],
        ['Late Normal', lateNormalPlayer, {
            'power' : 100,
            'qp': 100,
            'wish': 100,
        }],
        ['Early Evil 1', earlyEvilPlayer, {
            'power' : 100,
            'qp': 100,
            'wish': 100,
        }],
        ['Evil Return to Normal', evilReturnToNormalPlayer, {
            'power' : 100,
            'qp': 100,
            'wish': 100,
        }],
        ['Early Evil 2', earlyEvilTwoPlayer, {
            'power' : 155.42,
            'qp': 100.55,
            'wish': 100,
        }],
        ['Mid Evil 1', midEvilPlayer, {
            'power' : 259.18,
            'qp': 113.56,
            'wish': 100,
        }],
        ['Mid Evil 2', midEvilTwoPlayer, {
            'power' : 594.45,
            'qp': 210.74,
            'wish': 109.3,
        }],
        ['Late Evil 1', lateEvilPlayer, {
            'power' : 1008.4,
            'qp': 284.62,
            'wish': 121.54,
        }],
        ['Early Sad 1', earlySadPlayer, {
            'power' : 2097.52,
            'qp': 465.01,
            'wish': 150.56,
        }],
    ]
    test.each(cases)(
        "Hack Info - %s",
        (_name, player, expectedValues) => {
            
            var ec = expectClose(hackInfo(player,  Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(hackInfo(player,  Stat.QUEST_REWARD), expectedValues['qp'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(hackInfo(player,  Stat.WISH_SPEED), expectedValues['wish'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})

describe('Resource Info - Macguffin Info', () => {
    const cases : [string, Player, Pick<Required<infoObjType>, 'power' | 'epower' | 'dc' | 'attack'> & Partial<infoObjType>][] = [
        ['Early Normal 1', earlyNormalPlayer, {
            'power' : 100,
            'epower' : 100,
            'dc' : 100,
            'attack' : 100,
        }],
        ['Early Normal 2', earlyNormalTwoPlayer, {
            'power' : 100,
            'epower' : 100,
            'dc' : 100,
            'attack' : 100,
        }],
        ['Mid Normal 1', midNormalPlayer, {
            'power' : 100,
            'epower' : 100,
            'dc' : 100,
            'attack' : 100,
        }],
        ['Mid Normal 2', midNormalTwoPlayer, {
            'power' : 100,
            'epower' : 100,
            'dc' : 101.141,
            'attack' : 100,
        }],
        ['Late Normal', lateNormalPlayer, {
            'power' : 100,
            'epower' : 100,
            'dc' : 104.248,
            'attack' : 100,
        }],
        ['Early Evil 1', earlyEvilPlayer, {
            'power' : 100,
            'epower' : 111,
            'dc' : 106.25,
            'attack' : 100,
        }],
        ['Evil Return to Normal', evilReturnToNormalPlayer, {
            'power' :  104,
            'epower' : 116,
            'dc' : 106.25,
            'attack' : 100,
        }],
        ['Early Evil 2', earlyEvilTwoPlayer, {
            'power' : 114,
            'epower' : 128,
            'dc' : 106.25,
            'attack' : 100,
        }],
        ['Mid Evil 1', midEvilPlayer, {
            'power' : 140,
            'epower' : 156,
            'dc' : 106.25,
            'attack' : 100,
        }],
        ['Mid Evil 2', midEvilTwoPlayer, {
            'power' : 189.108,
            'epower' : 209.271,
            'dc' : 119.22,
            'attack' : 100,
        }],
        ['Late Evil 1', lateEvilPlayer, {
            'power' : 227.241,
            'epower' : 250.037,
            'dc' : 144.621,
            'attack' : 100,
        }],
        ['Early Sad 1', earlySadPlayer, {
            'power' : 423.782,
            'epower' : 469.524,
            'dc' : 281.023,
            'attack' : 12253.84,
            'blood' : 498.434,
        }],
    ]
    test.each(cases)(
        "Macguffin Info - %s",
        (_name, player, expectedValues) => {
            
            var ec = expectClose(macguffinInfo(player,  Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(macguffinInfo(player,  Stat.ENERGY_POWER), expectedValues['epower'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(macguffinInfo(player,  Stat.DROP_CHANCE), expectedValues['dc'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(macguffinInfo(player,  Stat.ATTACK), expectedValues['attack'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            if ('blood' in expectedValues) {
                var ec = expectClose(macguffinInfo(player,  Stat.BLOOD), expectedValues['blood'])
                expect(ec[0]).toBeCloseTo(ec[1], 0)
            }
        }
    )
})




describe('Resource Info - NGU Info', () => {
    const cases : [string, Player, Pick<Required<infoObjType>, 'power' | 'ygg' | 'dc' | 'attack' | 'engu'>][] = [
        ['Early Normal 1', earlyNormalPlayer, {
            'power' : 100,
            'ygg' : 100,
            'dc' : 100,
            'attack' : 100,
            'engu' : 100,
        }],
        ['Early Normal 2', earlyNormalTwoPlayer, {
            'power' : 100,
            'ygg' : 101.4,
            'dc' : 100,
            'attack' : 915,
            'engu' : 100,
        }],
        ['Mid Normal 1', midNormalPlayer, {
            'power' : 300,
            'ygg' : 113.8,
            'dc' : 123.3,
            'attack' : 2780,
            'engu' : 100,
        }],
        ['Mid Normal 2', midNormalTwoPlayer, {
            'power' : 2746,
            'ygg' : 377.22,
            'dc' : 1019.92,
            'attack' : 750500,
            'engu' : 105,
        }],
        ['Late Normal', lateNormalPlayer, {
            'power' : 42222,
            'ygg' : 1851.98,
            'dc' : 11140.88,
            'attack' : 129483517932,
            'engu' : 423.38,
        }],
        ['Early Evil 1', earlyEvilPlayer, {
            'power' : 45749 * 9.8111,
            'ygg' : 3003.45,
            'dc' : 26675.27,
            'attack' : 3.522e15,
            'engu' : 1971,
        }],
        ['Evil Return to Normal', evilReturnToNormalPlayer, {
            'power' :  31895*12.92,
            'ygg' : 2465.97,
            'dc' : 23561,
            'attack' : 2.221e14,
            'engu' : 2196,
        }],
        ['Early Evil 2', earlyEvilTwoPlayer, {
            'power' : 123413*16.14,
            'ygg' : 3968.5,
            'dc' : 90096,
            'attack' : 2.255e21,
            'engu' : 4298,
        }],
        ['Mid Evil 1', midEvilPlayer, {
            'power' : 265103 * 45.15,
            'ygg' : 4803.99,
            'dc' : 142252,
            'attack' : 1.347e22,
            'engu' : 7023,
        }],
        ['Mid Evil 2', midEvilTwoPlayer, {
            'power' : 561662 * 8417/100,
            'ygg' : 6269.17,
            'dc' : 623543.1,
            'attack' : 3.671e26,
            'engu' : 18925,
        }],
        ['Late Evil 1', lateEvilPlayer, {
            'power' : 729021 * 15498.15/100,
            'ygg' : 6945.58,
            'dc' : 998829.5,
            'attack' : 8.377e27,
            'engu' : 26188,
        }],
        ['Early Sad 1', earlySadPlayer, {
            'power' : 1665693 * 30613/100,
            'ygg' : 10507.74,
            'dc' : 2195321,
            'attack' : 1.556e30,
            'engu' : 43770,
        }],
    ]
    test.each(cases)(
        "NGU Info - %s",
        (_name, player, expectedValues) => {
            
            var ec = expectClose(nguInfo(player,  Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(nguInfo(player,  Stat.YGGDRASIL_YIELD), expectedValues['ygg'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(nguInfo(player,  Stat.DROP_CHANCE), expectedValues['dc'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(nguInfo(player,  Stat.ATTACK), expectedValues['attack'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(nguInfo(player,  Stat.ENERGY_NGU_SPEED), expectedValues['engu'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


describe('Resource Info - Perk Info', () => {
    const cases : [string, Player, Pick<Required<infoObjType>, 'power' | 'boosts' | 'epower'>][] = [
        ['Early Normal 1', earlyNormalPlayer, {
            'power' : 110,
            'boosts': 100,
            'epower': 100,
        }],
        ['Early Normal 2', earlyNormalTwoPlayer, {
            'power' : 110,
            'boosts': 100,
            'epower': 103,
        }],
        ['Mid Normal 1', midNormalPlayer, {
            'power' : 110,
            'boosts': 100,
            'epower': 106,
        }],
        ['Mid Normal 2', midNormalTwoPlayer, {
            'power' : 110,
            'boosts': 245,
            'epower': 150,
        }],
        ['Late Normal', lateNormalPlayer, {
            'power' : 110,
            'boosts': 550,
            'epower': 150,
        }],
        ['Early Evil 1', earlyEvilPlayer, {
            'power' : 110,
            'boosts': 550,
            'epower': 231,
        }],
        ['Evil Return to Normal', evilReturnToNormalPlayer, {
            'power' : 110,
            'boosts': 550,
            'epower': 165,
        }],
        ['Early Evil 2', earlyEvilTwoPlayer, {
            'power' : 150.5273,
            'boosts': 550,
            'epower': 330,
        }],
        ['Mid Evil 1', midEvilPlayer, {
            'power' : 188.1902,
            'boosts': 550,
            'epower': 429,
        }],
        ['Mid Evil 2', midEvilTwoPlayer, {
            'power' : 254.3178,
            'boosts': 550,
            'epower': 429,
        }],
        ['Late Evil 1', lateEvilPlayer, {
            'power' : 256.3066,
            'boosts': 550,
            'epower': 429,
        }],
        ['Early Sad 1', earlySadPlayer, {
            'power' : 606.0869,
            'boosts': 1210,
            'epower': 429,
        }],
    ]
    test.each(cases)(
        "Perk Info - %s",
        (_name, player, expectedValues) => {
            
            var ec = expectClose(perkInfo(player,  Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(perkInfo(player,  Stat.BOOSTS_BOOST), expectedValues['boosts'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(perkInfo(player,  Stat.ENERGY_POWER), expectedValues['epower'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})


// TODO - Perk Level



describe('Resource Info - Quirk Info', () => {
    const cases : [string, Player, Pick<Required<infoObjType>, 'power' | 'ecap' | 'mngu'>][]= [
        ['Early Normal 1', earlyNormalPlayer, {
            'power' : 100,
            'ecap': 100,
            'mngu': 100,
        }],
        ['Early Normal 2', earlyNormalTwoPlayer, {
            'power' : 100,
            'ecap': 100,
            'mngu': 100,
        }],
        ['Mid Normal 1', midNormalPlayer, {
            'power' : 100,
            'ecap': 100,
            'mngu': 100,
        }],
        ['Mid Normal 2', midNormalTwoPlayer, {
            'power' : 125,
            'ecap': 110,
            'mngu': 100,
        }],
        ['Late Normal', lateNormalPlayer, {
            'power' : 125,
            'ecap': 146.3,
            'mngu': 100,
        }],
        ['Early Evil 1', earlyEvilPlayer, {
            'power' : 125,
            'ecap': 165,
            'mngu': 100,
        }],
        ['Evil Return to Normal', evilReturnToNormalPlayer, {
            'power' : 125,
            'ecap': 165,
            'mngu': 100,
        }],
        ['Early Evil 2', earlyEvilTwoPlayer, {
            'power' : 128,
            'ecap': 165,
            'mngu': 100,
        }],
        ['Mid Evil 1', midEvilPlayer, {
            'power' : 162.5,
            'ecap': 165,
            'mngu': 100,
        }],
        ['Mid Evil 2', midEvilTwoPlayer, {
            'power' : 250,
            'ecap': 165,
            'mngu': 100,
        }],
        ['Late Evil 1', lateEvilPlayer, {
            'power' : 250,
            'ecap': 165,
            'mngu': 100,
        }],
        ['Early Sad 1', earlySadPlayer, {
            'power' : 370,
            'ecap': 248,
            'mngu': 100,
        }],
    ]
    test.each(cases)(
        "Quirk Info - %s",
        (_name, player, expectedValues) => {
            
            var ec = expectClose(quirkInfo(player,  Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(quirkInfo(player,  Stat.ENERGY_CAP), expectedValues['ecap'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(quirkInfo(player,  Stat.MAGIC_NGU_SPEED), expectedValues['mngu'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})



describe('Resource Info - Wish Info', () => {
    const cases : [string, Player, Pick<Required<infoObjType>, 'power' | 'rpower' | 'hack'>][] = [
        ['Early Normal 1', earlyNormalPlayer, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Early Normal 2', earlyNormalTwoPlayer, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Mid Normal 1', midNormalPlayer, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Mid Normal 2', midNormalTwoPlayer, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Late Normal', lateNormalPlayer, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Early Evil 1', earlyEvilPlayer, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Evil Return to Normal', evilReturnToNormalPlayer, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Early Evil 2', earlyEvilTwoPlayer, {
            'power' : 100,
            'rpower': 100,
            'hack': 100,
        }],
        ['Mid Evil 1', midEvilPlayer, {
            'power' : 142,
            'rpower': 121,
            'hack': 100,
        }],
        ['Mid Evil 2', midEvilTwoPlayer, {
            'power' : 187,
            'rpower': 197,
            'hack': 140,
        }],
        ['Late Evil 1', lateEvilPlayer, {
            'power' : 187,
            'rpower': 260,
            'hack': 179,
        }],
        ['Early Sad 1', earlySadPlayer, {
            'power' : 225,
            'rpower': 532,
            'hack': 204,
        }],
    ]
    test.each(cases)(
        "Wish Info - %s",
        (_name, player, expectedValues) => {
            
            var ec = expectClose(wishInfo(player,  Stat.POWER), expectedValues['power'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(wishInfo(player,  Stat.RES3_POWER), expectedValues['rpower'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
            var ec = expectClose(wishInfo(player,  Stat.HACK_SPEED), expectedValues['hack'])
            expect(ec[0]).toBeCloseTo(ec[1], 0)
        }
    )
})



describe('Resource Info - Item Set Info', () => {
    const cases : [string, Player, ItemSet[], ItemSet[], number][] = [
        ['Early Normal 1', earlyNormalPlayer, [ItemSets.FOREST, ItemSets.CAVE], [ItemSets.BADLY_DRAWN], 0],
        ['Early Normal 2', earlyNormalTwoPlayer, [ItemSets.FOREST, ItemSets.NUMBER], [ItemSets.BADLY_DRAWN], 0],
        ['Mid Normal 1', midNormalPlayer, [ItemSets.FOREST, ItemSets.NUMBER], [ItemSets.BADLY_DRAWN], 0],
        ['Mid Normal 2', midNormalTwoPlayer,  [ItemSets.BADLY_DRAWN], [ItemSets.EDGY], 7],
        ['Late Normal', lateNormalPlayer, [ItemSets.BADLY_DRAWN], [ItemSets.EDGY], 7],
        ['Early Evil 1', earlyEvilPlayer, [ItemSets.BADLY_DRAWN], [ItemSets.PRETTY], 8],
        ['Evil Return to Normal', evilReturnToNormalPlayer, [ItemSets.BADLY_DRAWN], [ItemSets.PARTY], 9],
        ['Early Evil 2', earlyEvilTwoPlayer, [ItemSets.BADLY_DRAWN], [ItemSets.PARTY], 10],
        ['Mid Evil 1', midEvilPlayer, [ItemSets.PRETTY, ItemSets.NERD], [ItemSets.CONSTRUCTION, ItemSets.NETHER], 10],
        ['Mid Evil 2', midEvilTwoPlayer, [ItemSets.PRETTY, ItemSets.NERD], [ItemSets.PIRATE], 10],
    ]
    test.each(cases)(
        "Item Sets Info - %s",
        (_name, player, expectSets, noExpectSets, numQuests) => {
            
            for(var itemSet of expectSets) {
                expect(isMaxxedItemSet(player,  itemSet)).toBeTruthy()
            }
            for(var itemSet of noExpectSets) {
                expect(isMaxxedItemSet(player,  itemSet)).toBeFalsy()
            }
            expect(maxxedItemSetNum(player,  ItemSets.QUESTS)).toBe(numQuests)
            
        }
    )
})
    