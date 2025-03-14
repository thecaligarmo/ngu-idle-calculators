import { AttackStat, Titan, Titans } from "@/assets/enemy";
import Player from "@/assets/player";
import { bd } from "@/helpers/numbers";
import {
    getDailySaveAP,
    getDailySpinAP,
    getMaxTitanByAK,
    getMoneyPitAP,
    getQuestInfo,
    getRebirthAP,
    getTitanHourlyInfo,
} from "@/helpers/pages/daily";
import bigDecimal from "js-big-decimal";
import earlyEvil from "@/__data__/earlyEvil1";
import earlyEvilTwo from "@/__data__/earlyEvil2";
import earlyNormal from "@/__data__/earlyNormal1";
import earlyNormalTwo from "@/__data__/earlyNormal2";
import earlySad from "@/__data__/earlySad1";
import lateEvil from "@/__data__/lateEvil1";
import lateNormal from "@/__data__/lateNormal";
import midEvil from "@/__data__/midEvil1";
import midEvilTwo from "@/__data__/midEvil2";
import midNormal from "@/__data__/midNormal1";
import midNormalTwo from "@/__data__/midNormal2";
import { expectClose } from "../../../helpers/testHelperFunctions";

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
// var evilReturnToNormalPlayer = new Player(false, true)
// evilReturnToNormalPlayer.importPlayerData(evilReturnToNormal)
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

// getQuestInfo
describe("Daily Page Helper", () => {
    describe("Quest Info", () => {
        const cases: [
            Player,
            {
                beastButter: boolean;
                hoursOfflinePerDay: bigDecimal;
                hoursPerDay: bigDecimal;
                idleMajorQuests: boolean;
                includeMajorQuests: boolean;
            },
            {
                ap: { major: bigDecimal; minor: bigDecimal; perMajor: bigDecimal; perMinor: bigDecimal };
                qp: { major: bigDecimal; minor: bigDecimal; perMajor: bigDecimal; perMinor: bigDecimal };
            }
        ][] = [
            [
                lateNormalPlayer,
                {
                    beastButter: false,
                    hoursOfflinePerDay: bd(0),
                    hoursPerDay: bd(24),
                    idleMajorQuests: false,
                    includeMajorQuests: false,
                },
                {
                    ap: { major: bd(0), minor: bd(75), perMajor: bd(173), perMinor: bd(17) },
                    qp: { major: bd(0), minor: bd(48), perMajor: bd(114), perMinor: bd(11) },
                },
            ],
            [
                earlyEvilPlayer,
                {
                    beastButter: false,
                    hoursOfflinePerDay: bd(0),
                    hoursPerDay: bd(24),
                    idleMajorQuests: false,
                    includeMajorQuests: true,
                },
                {
                    ap: { major: bd(708), minor: bd(107), perMajor: bd(185), perMinor: bd(18) },
                    qp: { major: bd(536), minor: bd(83), perMajor: bd(140), perMinor: bd(14) },
                },
            ],
            [
                earlyEvilTwoPlayer,
                {
                    beastButter: false,
                    hoursOfflinePerDay: bd(0),
                    hoursPerDay: bd(24),
                    idleMajorQuests: true,
                    includeMajorQuests: true,
                },
                {
                    ap: { major: bd(356), minor: bd(108), perMajor: bd(93), perMinor: bd(18) },
                    qp: { major: bd(306), minor: bd(96), perMajor: bd(80), perMinor: bd(16) },
                },
            ],
            [
                midEvilTwoPlayer,
                {
                    beastButter: false,
                    hoursOfflinePerDay: bd(0),
                    hoursPerDay: bd(24),
                    idleMajorQuests: false,
                    includeMajorQuests: false,
                },
                {
                    ap: { major: bd(0), minor: bd(239), perMajor: bd(191), perMinor: bd(22) },
                    qp: { major: bd(0), minor: bd(554), perMajor: bd(428), perMinor: bd(51) },
                },
            ],
            [
                lateEvilPlayer,
                {
                    beastButter: false,
                    hoursOfflinePerDay: bd(0),
                    hoursPerDay: bd(24),
                    idleMajorQuests: false,
                    includeMajorQuests: false,
                },
                {
                    ap: { major: bd(0), minor: bd(385), perMajor: bd(229), perMinor: bd(22) },
                    qp: { major: bd(0), minor: bd(1265), perMajor: bd(725), perMinor: bd(72) },
                },
            ],
            [
                earlySadPlayer,
                {
                    beastButter: false,
                    hoursOfflinePerDay: bd(0),
                    hoursPerDay: bd(24),
                    idleMajorQuests: false,
                    includeMajorQuests: false,
                },
                {
                    ap: { major: bd(0), minor: bd(412), perMajor: bd(230), perMinor: bd(23) },
                    qp: { major: bd(0), minor: bd(2440), perMajor: bd(1368), perMinor: bd(136) },
                },
            ],
        ];
        test.each(cases)("Case %#", (player, extraData, expectedValue) => {
            const infoData = {
                totalAPBonus: player.get("totalAPBonus"),
                totalQPBonus: player.get("totalQuestRewardBonus"),
                activeQuestWishI: player.get("activeQuestWishI"),
                activeQuestWishII: player.get("activeQuestWishII"),
                blueHeart: player.get("blueHeart"),
                fadLandsSetBonus: player.get("fadLandsSetBonus"),
                fasterQuesting: player.get("fasterQuesting"),
                fibQuestRNG: player.get("fibQuestRNG"),
                redLiquidBonus: player.get("redLiquidBonus"),
                questIdleDivider: player.get("questIdleDivider"),
                questMinorQP: player.get("questMinorQP"),
                questMajorQP: player.get("questMajorQP"),
                totalQuestDropBonus: player.get("totalQuestDropBonus"),
                totalRespawnTime: player.get("totalRespawnTime"),
            };

            const combinedData = { ...infoData, ...extraData };
            const questInfo = getQuestInfo(combinedData);
            let t: "ap" | "qp";
            const tt: (typeof t)[] = ["ap", "qp"];
            for (t of tt) {
                let m: "major" | "minor" | "perMajor" | "perMinor";
                const mm: (typeof m)[] = ["major", "minor", "perMajor", "perMinor"];
                for (m of mm) {
                    expectClose(questInfo[t][m], expectedValue[t][m]);
                }
            }
        });
    });

    // TODO - Renderer
    // test('Daily Page - Title List', ()=> {
    //     var titanList = getTitanList()
    //     const titanListSnap = renderer.create(<>{titanList}</>).toJSON();
    //     expect(titanListSnap).toMatchSnapshot();
    // })

    describe("Max Titan AK", () => {
        const cases: [Player, [Titan, number]][] = [
            [earlyNormalPlayer, [Titans.NONE, 0]], // 0
            [earlyNormalTwoPlayer, [Titans.GRAND_TREE, 0]],
            [midNormalPlayer, [Titans.UUG, 0]], // 2
            [midNormalTwoPlayer, [Titans.WALDERP, 4]],
            [lateNormalPlayer, [Titans.BEAST, 2]], // 4
            [earlyEvilPlayer, [Titans.BEAST, 3]],
            [earlyEvilTwoPlayer, [Titans.BEAST, 3]], // 6
            [midEvilPlayer, [Titans.NERD, 1]],
            [midEvilTwoPlayer, [Titans.GODMOTHER, 1]], // 8
            [lateEvilPlayer, [Titans.EXILE, 0]],
            [earlySadPlayer, [Titans.EXILE, 3]],
        ];
        test.each(cases)("Case %#", (player, expectedValue) => {
            const playerAttack = new AttackStat(
                1,
                player.get("totalPower"),
                player.get("totalToughness"),
                player.get("totalRegen"),
                player.get("totalHealth")
            );
            const titans: Titan[] = player.get("titans");
            const maxTitanByAK = getMaxTitanByAK(titans, playerAttack);
            expect(maxTitanByAK[0].key).toBe(expectedValue[0].key);
            expect(maxTitanByAK[1]).toBe(expectedValue[1]);
        });
    });

    describe("Titan Hourly Info", () => {
        const cases: [
            [Titan, number],
            Player,
            {
                ap: bigDecimal;
                exp: bigDecimal;
                ppp: bigDecimal;
                qp: bigDecimal;
            }
        ][] = [
            [
                [Titans.NONE, 0],
                earlyNormalPlayer,
                {
                    ap: bd(0),
                    exp: bd(0),
                    ppp: bd(0),
                    qp: bd(0),
                },
            ],
            [
                [Titans.GRAND_TREE, 0],
                earlyNormalTwoPlayer,
                {
                    ap: bd(25),
                    exp: bd(95),
                    ppp: bd(0),
                    qp: bd(0),
                },
            ],
            [
                [Titans.UUG, 0],
                midNormalPlayer,
                {
                    ap: bd(100.57),
                    exp: bd(685),
                    ppp: bd(0),
                    qp: bd(0),
                },
            ],
            [
                [Titans.WALDERP, 4],
                midNormalTwoPlayer,
                {
                    ap: bd(262),
                    exp: bd(2172),
                    ppp: bd(0),
                    qp: bd(0),
                },
            ],
            [
                [Titans.BEAST, 2],
                lateNormalPlayer,
                {
                    ap: bd(354),
                    exp: bd(78657),
                    ppp: bd(871450),
                    qp: bd(0),
                },
            ],
            [
                [Titans.BEAST, 3],
                earlyEvilPlayer,
                {
                    ap: bd(377),
                    exp: bd(82194),
                    ppp: bd(3714700),
                    qp: bd(0),
                },
            ],
            [
                [Titans.BEAST, 3],
                earlyEvilTwoPlayer,
                {
                    ap: bd(382),
                    exp: bd(135653),
                    ppp: bd(6257075),
                    qp: bd(0),
                },
            ],
            [
                [Titans.GODMOTHER, 1],
                midEvilTwoPlayer,
                {
                    // Per hour, off by one for version
                    ap: bd(9360 / 24),
                    exp: bd(77909040 / 24),
                    ppp: bd(9152102400 / 24),
                    qp: bd(120 / 24),
                },
            ],
            [
                [Titans.EXILE, 0],
                lateEvilPlayer,
                {
                    // Per hour, off by one for version
                    ap: bd(9360 / 24),
                    exp: bd(74626956 / 24),
                    ppp: bd(32276551680 / 24),
                    qp: bd(696 / 24),
                },
            ],

            [
                [Titans.EXILE, 3],
                earlySadPlayer,
                {
                    // Per hour, off by one for version
                    ap: bd(9408 / 24),
                    exp: bd(528321348 / 24),
                    ppp: bd(102675384240 / 24),
                    qp: bd(2400 / 24),
                },
            ],
        ];
        test.each(cases)("Case %#", (maxTitan, player, expectedValue) => {
            const infoData = {
                totalAPBonus: player.get("totalAPBonus"),
                totalExpBonus: player.get("totalExpBonus"),
                totalPPBonus: player.get("totalPPBonus"),
                totalQPBonus: player.get("totalQuestRewardBonus"),
                bonusTitanEXPPerk: player.get("bonusTitanEXPPerk"),
                numRebirthChallenges: player.get("numRebirthChallenges"),
                twentyFourHourChallenge: player.get("twentyFourHourChallenge"),
                twentyFourHourEvilChallenge: player.get("twentyFourHourEvilChallenge"),
                twentyFourHourSadisticChallenge: player.get("twentyFourHourSadisticChallenge"),
                wishTitansHadBetterRewards: player.get("wishTitansHadBetterRewards"),
                wishes: player.get("wishes"),
            };

            const titanHourlyInfo = getTitanHourlyInfo(maxTitan, infoData);
            let t: "ap" | "exp" | "ppp" | "qp";
            const tt: (typeof t)[] = ["ap", "exp", "ppp", "qp"];
            for (t of tt) {
                expectClose(titanHourlyInfo[t], expectedValue[t]);
            }
        });
    });

    describe("AP Rebirth", () => {
        const cases: [bigDecimal, bigDecimal, number][] = [
            [bd(124.7), bd(24), 206],
            [bd(158.5), bd(20), 216],
            [bd(175.35), bd(15), 176],
        ];
        test.each(cases)("Case %#", (totalAPBonus, hoursPerDay, expectedValue) => {
            const apRebirth = getRebirthAP(totalAPBonus, hoursPerDay);
            expect(Number(apRebirth.getValue())).toBeCloseTo(expectedValue);
        });
    });

    describe("AP Money Pit", () => {
        const cases: [bigDecimal, bigDecimal, bigDecimal, number][] = [
            [bd(50), bd(4), bd(175.35), 348],
            [bd(22), bd(6), bd(125.7), 162],
            [bd(25), bd(2), bd(150.15), 74],
        ];
        test.each(cases)("Case %#", (goldToss, numTosses, totalAPBonus, expectedValue) => {
            const apMoneyPit = getMoneyPitAP(goldToss, numTosses, totalAPBonus);
            expect(Number(apMoneyPit.getValue())).toBeCloseTo(expectedValue);
        });
    });

    describe("AP Daily Save", () => {
        const cases: [bigDecimal, bigDecimal, number][] = [
            [bd(124.7), bd(24), 249],
            [bd(158.5), bd(20), 264.1667],
            [bd(175.35), bd(15), 218.75],
        ];
        test.each(cases)("Case %#", (totalAPBonus, hoursPerDay, expectedValue) => {
            const apDailySave = getDailySaveAP(totalAPBonus, hoursPerDay);
            expect(Number(apDailySave.getValue())).toBeCloseTo(expectedValue);
        });
    });

    describe("AP Daily Spin", () => {
        const cases: [number, bigDecimal, bigDecimal, boolean, boolean, number][] = [
            [1, bd(102), bd(24), false, false, 227],
            [2, bd(124.7), bd(24), true, true, 1080],
            [3, bd(124.7), bd(24), true, true, 2060],
            [4, bd(102), bd(24), false, false, 1020],
            [4, bd(102), bd(24), false, true, 1402],
            [4, bd(124.7), bd(24), true, true, 4798],
            [5, bd(124.7), bd(20), true, false, 3128],
            [5, bd(124.7), bd(24), true, true, 6489],
            [6, bd(159.65), bd(22), false, true, 4344],
            [6, bd(124.7), bd(24), true, true, 11290],
            [7, bd(159.65), bd(22), false, true, 5340],
            [7, bd(124.7), bd(24), true, true, 13851],
        ];
        test.each(cases)(
            "Case %#",
            (dailySpinTier, totalAPBonus, hoursPerDay, incConsumables, incJackpot, expectedValue) => {
                const apDailySpin = getDailySpinAP(
                    dailySpinTier,
                    totalAPBonus,
                    hoursPerDay,
                    incConsumables,
                    incJackpot
                );
                expect(Number(apDailySpin.getValue())).toBeCloseTo(expectedValue, 0);
            }
        );
    });
});
