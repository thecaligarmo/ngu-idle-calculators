import {
    isInitilizing,
    totalAPBonus,
    totalAugmentSpeed,
    totalCardSpeed,
    totalDaycareSpeed,
    totalDropChance,
    totalEnergyBar,
    totalEnergyBeardSpeed,
    totalEnergyCap,
    totalEnergyNGUSpeedFactor,
    totalEnergyPower,
    totalEnergyWandoosSpeed,
    totalExpBonus,
    totalGoldDrop,
    totalHackSpeed,
    totalMagicBar,
    totalMagicBeardSpeed,
    totalMagicCap,
    totalMagicNGUSpeedFactor,
    totalMagicPower,
    totalMagicWandoosSpeed,
    totalMayoGeneration,
    totalMayoSpeed,
    totalPPBonus,
    totalPower,
    totalQuestDropBonus,
    totalQuestRewardBonus,
    totalRes3Bar,
    totalRes3Cap,
    totalRes3Power,
    totalRespawnRate,
    totalTagEffect,
    totalToughness,
    totalWishSpeed,
} from "@/helpers/calculators";
import earlyEvil from "@/__data__/earlyEvil1";
import earlyEvilTwo from "@/__data__/earlyEvil2";
import earlyNormal from "@/__data__/earlyNormal1";
import earlyNormalTwo from "@/__data__/earlyNormal2";
import evilReturnToNormal from "@/__data__/evilReturnToNormal";
import lateNormal from "@/__data__/lateNormal";
import midEvil from "@/__data__/midEvil1";
import midEvilTwo from "@/__data__/midEvil2";
import midNormal from "@/__data__/midNormal1";
import midNormalTwo from "@/__data__/midNormal2";
import { expectClose, infoObjType } from "../../helpers/testHelperFunctions";
import lateEvil from "@/__data__/lateEvil1";
import earlySad from "@/__data__/earlySad1";
import Player from "@/assets/player";

const earlyNormalPlayer = new Player(false, true);
earlyNormalPlayer.importPlayerData(earlyNormal);
const earlyNormalTwoPlayer = new Player(false, true);
earlyNormalTwoPlayer.importPlayerData(earlyNormalTwo);
const midNormalPlayer = new Player(false, true);
midNormalPlayer.importPlayerData(midNormal);
const midNormalTwoPlayer = new Player(false, true);
midNormalTwoPlayer.importPlayerData(midNormalTwo);
const lateNormalPlayer = new Player(false, true);
lateNormalPlayer.importPlayerData(lateNormal);

const earlyEvilPlayer = new Player(false, true);
earlyEvilPlayer.importPlayerData(earlyEvil);
const evilReturnToNormalPlayer = new Player(false, true);
evilReturnToNormalPlayer.importPlayerData(evilReturnToNormal);
const earlyEvilTwoPlayer = new Player(false, true);
earlyEvilTwoPlayer.importPlayerData(earlyEvilTwo);
const midEvilPlayer = new Player(false, true);
midEvilPlayer.importPlayerData(midEvil);
const midEvilTwoPlayer = new Player(false, true);
midEvilTwoPlayer.importPlayerData(midEvilTwo);
const lateEvilPlayer = new Player(false, true);
lateEvilPlayer.importPlayerData(lateEvil);

const earlySadPlayer = new Player(false, true);
earlySadPlayer.importPlayerData(earlySad);

describe("Calculators Helper", () => {
    describe("Initializing", () => {
        const player = new Player(false, true);
        expect(isInitilizing(player)).toBeTruthy();

        expectClose(totalEnergyPower(player), 0);

        expectClose(totalRespawnRate(player), 0);

        expectClose(totalTagEffect(player), 0);
    });

    describe("Energy", () => {
        const cases: [string, Player, Pick<Required<infoObjType>, "power" | "bar" | "cap">][] = [
            ["Early Normal 1", earlyNormalPlayer, { power: 20.8, bar: 16.9, cap: 412500 }],
            ["Early Normal 2", earlyNormalTwoPlayer, { power: 269, bar: 158, cap: 2262598 }],
            ["Mid Normal 1", midNormalPlayer, { power: 19795.5, bar: 10560, cap: 154393342 }],
            ["Mid Normal 2", midNormalTwoPlayer, { power: 396562, bar: 84914, cap: 1617782234 }],
            ["Late Normal", lateNormalPlayer, { power: 15400000, bar: 7272000, cap: 47268056150 }],
            ["Early Evil 1", earlyEvilPlayer, { power: 1148000000, bar: 176300000, cap: 1618503168662 }],
            ["Evil Return to Normal", evilReturnToNormalPlayer, { power: 7.554e8, bar: 1.46e8, cap: 2395637339264 }],
            ["Early Evil 2", earlyEvilTwoPlayer, { power: 9.522e9, bar: 1.152e9, cap: 26218964477405 }],
            ["Mid Evil 1", midEvilPlayer, { power: 4.299e10, bar: 5.743e9, cap: 111846015531154 }],
            ["Mid Evil 2", midEvilTwoPlayer, { power: 5.49e11, bar: 1.755e10, cap: 230186471106591 }],
            ["Late Evil 1", lateEvilPlayer, { power: 9.572e12, bar: 7.141e10, cap: 5268374280342490 }],
            ["Early Sad 1", earlySadPlayer, { power: 2.221e14, bar: 1.774e12, cap: 242137082178342176 }],
        ];
        test.each(cases)("%s", (_name, player, expectedValues) => {
            expectClose(totalEnergyPower(player), expectedValues["power"]);
            expectClose(totalEnergyBar(player), expectedValues["bar"]);
            expectClose(totalEnergyCap(player), expectedValues["cap"]);
        });
    });

    describe("Magic", () => {
        const cases: [string, Player, Pick<Required<infoObjType>, "power" | "bar" | "cap">][] = [
            ["Early Normal 1", earlyNormalPlayer, { power: 6.4, bar: 5, cap: 60000 }],
            ["Early Normal 2", earlyNormalTwoPlayer, { power: 14, bar: 8, cap: 330000 }],
            ["Mid Normal 1", midNormalPlayer, { power: 1640, bar: 561.5, cap: 6941520 }],
            ["Mid Normal 2", midNormalTwoPlayer, { power: 49734, bar: 18589, cap: 281061326 }],
            ["Late Normal", lateNormalPlayer, { power: 3907000, bar: 2249000, cap: 14390053554 }],
            ["Early Evil 1", earlyEvilPlayer, { power: 106800000, bar: 22880000, cap: 309027642136 }],
            ["Evil Return to Normal", evilReturnToNormalPlayer, { power: 8.385e7, bar: 3.155e7, cap: 258609120090 }],
            ["Early Evil 2", earlyEvilTwoPlayer, { power: 3.153e9, bar: 1.26e9, cap: 6363454536030 }],
            ["Mid Evil 1", midEvilPlayer, { power: 1.439e10, bar: 1.914e9, cap: 44967554132115 }],
            ["Mid Evil 2", midEvilTwoPlayer, { power: 3.17e11, bar: 9.02e9, cap: 150522568302284 }],
            ["Late Evil 1", lateEvilPlayer, { power: 3.105e12, bar: 2.219e10, cap: 1927981300048642 }],
            ["Early Sad 1", earlySadPlayer, { power: 7.216e13, bar: 5.622e11, cap: 83469167085821456 }],
        ];
        test.each(cases)("%s", (_name, player, expectedValues) => {
            expectClose(totalMagicPower(player), expectedValues["power"]);
            expectClose(totalMagicBar(player), expectedValues["bar"]);
            expectClose(totalMagicCap(player), expectedValues["cap"]);
        });
    });

    describe("Resource 3", () => {
        const cases: [string, Player, Pick<Required<infoObjType>, "power" | "bar" | "cap">][] = [
            ["Early Normal 1", earlyNormalPlayer, { power: 1, bar: 0, cap: 0 }],
            ["Early Normal 2", earlyNormalTwoPlayer, { power: 1, bar: 0, cap: 0 }],
            ["Mid Normal 1", midNormalPlayer, { power: 1, bar: 0, cap: 0 }],
            ["Mid Normal 2", midNormalTwoPlayer, { power: 1, bar: 0, cap: 0 }],
            ["Late Normal", lateNormalPlayer, { power: 1, bar: 0, cap: 0 }],
            ["Early Evil 1", earlyEvilPlayer, { power: 1, bar: 0, cap: 0 }],
            ["Evil Return to Normal", evilReturnToNormalPlayer, { power: 3, bar: 3, cap: 90000 }],
            ["Early Evil 2", earlyEvilTwoPlayer, { power: 3, bar: 6, cap: 90000 }],
            ["Mid Evil 1", midEvilPlayer, { power: 188, bar: 30, cap: 5549251 }],
            ["Mid Evil 2", midEvilTwoPlayer, { power: 8621, bar: 563, cap: 42743632 }],
            ["Late Evil 1", lateEvilPlayer, { power: 63553, bar: 1418, cap: 424242703 }],
            ["Early Sad 1", earlySadPlayer, { power: 1.295e6, bar: 19603, cap: 10685329741 }],
        ];
        test.each(cases)("%s", (_name, player, expectedValues) => {
            expectClose(totalRes3Power(player), expectedValues["power"]);
            expectClose(totalRes3Bar(player), expectedValues["bar"]);
            expectClose(totalRes3Cap(player), expectedValues["cap"]);
        });
    });

    describe("Augments", () => {
        const cases: [string, Player, number][] = [
            ["Early Normal 1", earlyNormalPlayer, 2080],
            ["Early Normal 2", earlyNormalTwoPlayer, 26864],
            ["Mid Normal 1", midNormalPlayer, 1.98e6],
            ["Mid Normal 2", midNormalTwoPlayer, 4.362e7],
            ["Late Normal", lateNormalPlayer, 1.694e9],
            ["Early Evil 1", earlyEvilPlayer, 1.263e11],
            ["Evil Return to Normal", evilReturnToNormalPlayer, 8.309e10],
            ["Early Evil 2", earlyEvilTwoPlayer, 1.719e12],
            ["Mid Evil 1", midEvilPlayer, 1.373e13],
            ["Mid Evil 2", midEvilTwoPlayer, 6.354e14],
            ["Late Evil 1", lateEvilPlayer, 2.191e16],
            ["Early Sad 1", earlySadPlayer, 2.953e19 * 1.2],
        ];
        test.each(cases)("%s", (_name, player, expectedValue) => {
            expectClose(totalAugmentSpeed(player), expectedValue);
        });
    });

    describe("NGU", () => {
        const cases: [string, Player, Pick<Required<infoObjType>, "engu" | "mngu">][] = [
            ["Early Normal 1", earlyNormalPlayer, { engu: 2080, mngu: 640 }],
            ["Early Normal 2", earlyNormalTwoPlayer, { engu: 29550, mngu: 1507 }],
            ["Mid Normal 1", midNormalPlayer, { engu: 2178000, mngu: 541060 }],
            ["Mid Normal 2", midNormalTwoPlayer, { engu: 1290000000, mngu: 648400000 }],
            ["Late Normal", lateNormalPlayer, { engu: 1091000000000, mngu: 1163000000000 }],
            ["Early Evil 1", earlyEvilPlayer, { engu: 8.197e14, mngu: 3.208e14 }],
            ["Evil Return to Normal", evilReturnToNormalPlayer, { engu: 8.575e12, mngu: 3.442e12 }],
            ["Early Evil 2", earlyEvilTwoPlayer, { engu: 1.588e16, mngu: 2.452e16 }],
            ["Mid Evil 1", midEvilPlayer, { engu: 1.265e16, mngu: 1.926e16 }],
            ["Mid Evil 2", midEvilTwoPlayer, { engu: 2.215e20, mngu: 7.136e20 }],
            ["Late Evil 1", lateEvilPlayer, { engu: 2.883e21, mngu: 3.469e22 }],
            ["Early Sad 1", earlySadPlayer, { engu: 8.33e24, mngu: 9.193e24 }],
        ];
        test.each(cases)("%s", (_name, player, expectedValues) => {
            expectClose(totalEnergyNGUSpeedFactor(player), expectedValues["engu"]);
            expectClose(totalMagicNGUSpeedFactor(player), expectedValues["mngu"]);
        });
    });

    describe("EXP, AP, PP", () => {
        const cases: [string, Player, Pick<Required<infoObjType>, "exp" | "ap" | "pp">][] = [
            ["Early Normal 1", earlyNormalPlayer, { exp: 100, ap: 102.35, pp: 100 }],
            ["Early Normal 2", earlyNormalTwoPlayer, { exp: 100, ap: 106.45, pp: 100 }],
            ["Mid Normal 1", midNormalPlayer, { exp: 100, ap: 116.15, pp: 110 }],
            ["Mid Normal 2", midNormalTwoPlayer, { exp: 132, ap: 155.46, pp: 115.5 }],
            ["Late Normal", lateNormalPlayer, { exp: 1776.49, ap: 173.76, pp: 348.58 }],
            ["Early Evil 1", earlyEvilPlayer, { exp: 1747.11, ap: 185.58, pp: 1485.88 }],
            ["Evil Return to Normal", evilReturnToNormalPlayer, { exp: 1665.96, ap: 186.18, pp: 1788.99 }],
            ["Early Evil 2", earlyEvilTwoPlayer, { exp: 2402.84, ap: 187.38, pp: 2502.83 }],
            ["Mid Evil 1", midEvilPlayer, { exp: 3504.79, ap: 191.12, pp: 3884.76 }],
            ["Mid Evil 2", midEvilTwoPlayer, { exp: 19100.88, ap: 191.61, pp: 38912.44 }],
            ["Late Evil 1", lateEvilPlayer, { exp: 11436.48, ap: 191.61, pp: 93392.8 }],
            ["Early Sad 1", earlySadPlayer, { exp: 69705.4, ap: 192.35, pp: 274239.8 }],
        ];
        test.each(cases)("%s", (_name, player, expectedValues) => {
            expectClose(totalExpBonus(player), expectedValues["exp"]);
            expectClose(totalAPBonus(player), expectedValues["ap"]);
            expectClose(totalPPBonus(player), expectedValues["pp"]);
        });
    });

    describe("Misc", () => {
        const cases: [string, Player, Pick<Required<infoObjType>, "daycare" | "hack" | "wish">][] = [
            ["Early Normal 1", earlyNormalPlayer, { daycare: 100, hack: 100, wish: 100 }],
            ["Early Normal 2", earlyNormalTwoPlayer, { daycare: 100, hack: 100, wish: 100 }],
            ["Mid Normal 1", midNormalPlayer, { daycare: 100, hack: 100, wish: 100 }],
            ["Mid Normal 2", midNormalTwoPlayer, { daycare: 100, hack: 100, wish: 100 }],
            ["Late Normal", lateNormalPlayer, { daycare: 100, hack: 100, wish: 100 }],
            ["Early Evil 1", earlyEvilPlayer, { daycare: 100, hack: 100, wish: 100 }],
            ["Evil Return to Normal", evilReturnToNormalPlayer, { daycare: 100, hack: 100, wish: 100 }],
            ["Early Evil 2", earlyEvilTwoPlayer, { daycare: 126, hack: 175, wish: 100 }],
            ["Mid Evil 1", midEvilPlayer, { daycare: 145, hack: 202, wish: 250 }],
            ["Mid Evil 2", midEvilTwoPlayer, { daycare: 282, hack: 2767, wish: 361 }],
            ["Late Evil 1", lateEvilPlayer, { daycare: 267, hack: 12853, wish: 926 }],
            ["Early Sad 1", earlySadPlayer, { daycare: 860, hack: 151588, wish: 2430 }],
        ];
        test.each(cases)("%s", (_name, player, expectedValues) => {
            expectClose(totalDaycareSpeed(player), expectedValues["daycare"]);
            expectClose(totalHackSpeed(player), expectedValues["hack"]);
            expectClose(totalWishSpeed(player), expectedValues["wish"]);
        });
    });

    describe("Adventure", () => {
        const cases: [string, Player, Pick<Required<infoObjType>, "power" | "toughness">][] = [
            ["Early Normal 1", earlyNormalPlayer, { power: 693, toughness: 651 }],
            ["Early Normal 2", earlyNormalTwoPlayer, { power: 23253, toughness: 20102 }],
            ["Mid Normal 1", midNormalPlayer, { power: 1452000, toughness: 978531 }],
            ["Mid Normal 2", midNormalTwoPlayer, { power: 1189000000, toughness: 783600000 }],
            ["Late Normal", lateNormalPlayer, { power: 1010000000000, toughness: 674700000000 }],
            ["Early Evil 1", earlyEvilPlayer, { power: 2.47e13, toughness: 1.477e13 }],
            ["Evil Return to Normal", evilReturnToNormalPlayer, { power: 6.749e12, toughness: 2.2635e12 }],
            ["Early Evil 2", earlyEvilTwoPlayer, { power: 1.621e14, toughness: 1.787e14 }],
            ["Mid Evil 1", midEvilPlayer, { power: 5.401e16, toughness: 2.537e16 }],
            ["Mid Evil 2", midEvilTwoPlayer, { power: 7.205e20, toughness: 3.652e20 }],
            ["Late Evil 1", lateEvilPlayer, { power: 2.75e22, toughness: 1.09e22 }],
            ["Early Sad 1", earlySadPlayer, { power: 3.969e27, toughness: 7.858e26 }],
        ];
        test.each(cases)("%s", (_name, player, expectedValues) => {
            expectClose(totalPower(player), expectedValues["power"]);
            expectClose(totalToughness(player), expectedValues["toughness"]);
        });
    });

    describe("Misc Adventure", () => {
        const cases: [string, Player, Pick<Required<infoObjType>, "gold" | "respawn" | "dc">][] = [
            ["Early Normal 1", earlyNormalPlayer, { gold: 100, respawn: 100, dc: 114 }],
            ["Early Normal 2", earlyNormalTwoPlayer, { gold: 854, respawn: 95, dc: 155 }],
            ["Mid Normal 1", midNormalPlayer, { gold: 45377.5, respawn: 63.84, dc: 705 }],
            ["Mid Normal 2", midNormalTwoPlayer, { gold: 2638000, respawn: 63.08, dc: 15760 }],
            ["Late Normal", lateNormalPlayer, { gold: 15600000000, respawn: 41.15, dc: 10440000 }],
            ["Early Evil 1", earlyEvilPlayer, { gold: 1.713e12, respawn: 34.94, dc: 6.294e8 }],
            ["Evil Return to Normal", evilReturnToNormalPlayer, { gold: 1.698e11, respawn: 43.33, dc: 1.564e8 }],
            ["Early Evil 2", earlyEvilTwoPlayer, { gold: 9.265e14, respawn: 35.93, dc: 1.629e9 }],
            ["Mid Evil 1", midEvilPlayer, { gold: 4.011e17, respawn: 41.05, dc: 2.975e10 }],
            ["Mid Evil 2", midEvilTwoPlayer, { gold: 8.264e19, respawn: 45.66, dc: 9.69e12 }],
            ["Late Evil 1", lateEvilPlayer, { gold: 1.348e19, respawn: 35.09, dc: 5.96e13 }],
            ["Early Sad 1", earlySadPlayer, { gold: 8.667e23, respawn: 30.64, dc: 2.048e16 }],
        ];
        test.each(cases)("%s", (_name, player, expectedValues) => {
            expectClose(totalGoldDrop(player), expectedValues["gold"]);
            expectClose(totalRespawnRate(player), expectedValues["respawn"]);
            expectClose(totalDropChance(player), expectedValues["dc"]);
        });
    });

    describe("Beards", () => {
        const cases: [string, Player, Pick<Required<infoObjType>, "energy" | "magic">][] = [
            ["Early Normal 1", earlyNormalPlayer, { energy: 7297, magic: 1265 }],
            ["Early Normal 2", earlyNormalTwoPlayer, { energy: 258965, magic: 2961 }],
            ["Mid Normal 1", midNormalPlayer, { energy: 2.133e8, magic: 3.262e6 }],
            ["Mid Normal 2", midNormalTwoPlayer, { energy: 8.529e9, magic: 6.612e8 }],
            ["Late Normal", lateNormalPlayer, { energy: 4.004e13, magic: 2.445e12 }],
            ["Early Evil 1", earlyEvilPlayer, { energy: 1.363e15, magic: 4.047e13 }],
            ["Evil Return to Normal", evilReturnToNormalPlayer, { energy: 7.061e14, magic: 5.085e13 }],
            ["Early Evil 2", earlyEvilTwoPlayer, { energy: 7.169e16, magic: 4.514e16 }],
            ["Mid Evil 1", midEvilPlayer, { energy: 1.31e17, magic: 2.526e16 }],
            ["Mid Evil 2", midEvilTwoPlayer, { energy: 2.574e18, magic: 1.005e18 }],
            ["Late Evil 1", lateEvilPlayer, { energy: 2.34e20, magic: 1.032e19 }],
            ["Early Sad 1", earlySadPlayer, { energy: 1.939e21, magic: 2.627e20 }],
        ];
        test.each(cases)("%s", (_name, player, expectedValues) => {
            expectClose(totalEnergyBeardSpeed(player), expectedValues["energy"]);
            expectClose(totalMagicBeardSpeed(player), expectedValues["magic"]);
        });
    });

    describe("Wandoos", () => {
        const cases: [string, Player, Pick<Required<infoObjType>, "energy" | "magic">][] = [
            ["Early Normal 1", earlyNormalPlayer, { energy: 4.04, magic: 4.04 }],
            ["Early Normal 2", earlyNormalTwoPlayer, { energy: 103, magic: 103 }],
            ["Mid Normal 1", midNormalPlayer, { energy: 1237, magic: 1237 }],
            ["Mid Normal 2", midNormalTwoPlayer, { energy: 3.131e6, magic: 3.131e6 }],
            ["Late Normal", lateNormalPlayer, { energy: 3.729e9, magic: 3.729e9 }],
            ["Early Evil 1", earlyEvilPlayer, { energy: 3.698e11, magic: 3.698e11 }],
            ["Evil Return to Normal", evilReturnToNormalPlayer, { energy: 9.078e9, magic: 9.078e9 }],
            ["Early Evil 2", earlyEvilTwoPlayer, { energy: 6.854e11, magic: 6.854e11 }],
            ["Mid Evil 1", midEvilPlayer, { energy: 6.318e11, magic: 6.318e11 }],
            ["Mid Evil 2", midEvilTwoPlayer, { energy: 9.897e18, magic: 9.9e18 }], // auto advances
            ["Late Evil 1", lateEvilPlayer, { energy: 1.386e19, magic: 1.386e19 }], // auto advances
            ["Early Sad 1", earlySadPlayer, { energy: 5.784e11, magic: 5.813e11 }], // auto advances
        ];
        test.each(cases)("%s", (_name, player, expectedValues) => {
            expectClose(totalEnergyWandoosSpeed(player), expectedValues["energy"]);
            expectClose(totalMagicWandoosSpeed(player), expectedValues["magic"]);
        });
    });

    // Found on Questing page
    describe("Quests", () => {
        const cases: [string, Player, Pick<Required<infoObjType>, "reward" | "dc">][] = [
            ["Early Normal 1", earlyNormalPlayer, { reward: 100, dc: 100 }],
            ["Early Normal 2", earlyNormalTwoPlayer, { reward: 100, dc: 100 }],
            ["Mid Normal 1", midNormalPlayer, { reward: 100, dc: 100 }],
            ["Mid Normal 2", midNormalTwoPlayer, { reward: 115, dc: 110 }],
            ["Late Normal", lateNormalPlayer, { reward: 115, dc: 110 }],
            ["Early Evil 1", earlyEvilPlayer, { reward: 141, dc: 110 }],
            ["Evil Return to Normal", evilReturnToNormalPlayer, { reward: 143, dc: 116.66 }],
            ["Early Evil 2", earlyEvilTwoPlayer, { reward: 162, dc: 139.15 }],
            ["Mid Evil 1", midEvilPlayer, { reward: 210, dc: 139.15 }],
            ["Mid Evil 2", midEvilTwoPlayer, { reward: 429, dc: 144.21 }],
            ["Late Evil 1", lateEvilPlayer, { reward: 605, dc: 146.74 }],
            ["Early Sad 1", earlySadPlayer, { reward: 1140, dc: 126.5 }],
        ];
        test.each(cases)("%s", (_name, player, expectedValues) => {
            expectClose(totalQuestRewardBonus(player), expectedValues["reward"]);
            expectClose(totalQuestDropBonus(player), expectedValues["dc"]);
        });
    });

    // Found on Mayo
    describe("Mayo", () => {
        const cases: [
            string,
            Player,
            Pick<Required<infoObjType>, "mayoSpeed" | "cardSpeed" | "mayoGen" | "tagEffect">
        ][] = [
            ["Early Normal 1", earlyNormalPlayer, { mayoSpeed: 100, cardSpeed: 100, mayoGen: 1, tagEffect: 10 }],
            ["Early Evil 1", earlyEvilPlayer, { mayoSpeed: 100, cardSpeed: 100, mayoGen: 1, tagEffect: 10 }],
            ["Mid Evil 1", midEvilPlayer, { mayoSpeed: 100, cardSpeed: 100, mayoGen: 1, tagEffect: 10 }],
            ["Early Sad 1", earlySadPlayer, { mayoSpeed: 114.97, cardSpeed: 110, mayoGen: 3, tagEffect: 11.15 }],
        ];
        test.each(cases)("%s", (_name, player, expectedValues) => {
            expectClose(totalMayoSpeed(player), expectedValues["mayoSpeed"]);
            expectClose(totalCardSpeed(player), expectedValues["cardSpeed"]);
            expectClose(totalMayoGeneration(player), expectedValues["mayoGen"]);
            expectClose(totalTagEffect(player), expectedValues["tagEffect"]);
        });
    });
});
