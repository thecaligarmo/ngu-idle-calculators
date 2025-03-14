import earlyEvilTwo from "@/__data__/earlyEvil2";
import earlyNormal from "@/__data__/earlyNormal1";
import earlyNormalTwo from "@/__data__/earlyNormal2";
import evilReturnToNormal from "@/__data__/evilReturnToNormal";
import lateEvil from "@/__data__/lateEvil1";
import lateNormal from "@/__data__/lateNormal";
import midEvil from "@/__data__/midEvil1";
import midEvilTwo from "@/__data__/midEvil2";
import midNormal from "@/__data__/midNormal1";
import midNormalTwo from "@/__data__/midNormal2";
import { expectClose } from "@/helpers/testHelperFunctions";
import { GameMode } from "@/assets/mode";
import Player from "@/assets/player";
import { bd } from "@/helpers/numbers";
import { describe, test } from "@jest/globals";
import _ from "lodash";
import earlyEvil from "@/__data__/earlyEvil1";
import { NGU } from "@/assets/ngus";

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

// var earlySadPlayer = new Player(false, true)
// earlySadPlayer.importPlayerData(earlySad)

type energyNums = [number, number, number, number, number, number, number, number, number];
type magicNumbs = [number, number, number, number, number, number, number];

type nguExpected = {
    [x: number]: {
        seconds: [energyNums, magicNumbs];
        cap: [energyNums, magicNumbs];
        capDay: [energyNums, magicNumbs];
    };
};

const types = ["energy", "magic"];
const nguNames = [
    ["Augments", "Wandoos", "Respawn", "Gold", "AdvA", "PowerA", "DropChance", "MNGU", "PP"],
    ["Ygg", "Exp", "PowerB", "Number", "TM", "ENGU", "AdvB"],
];

// Set targets to 10 for early
const earlyNormalExpected: nguExpected = {
    [GameMode.NORMAL]: {
        seconds: [
            [1282051.4, 1282051.4, 1282051.4, 1282051.4, 1282051.4, 1282051.4, 128205137.8, 2564102564, 64102564103],
            [57291666.8, 171875000, 572916666.8, 1718750000, 14322916667, 143229166667, 1432291666667],
        ],
        cap: [
            [4.808e12, 4.808e12, 4.808e12, 4.808e12, 4.808e12, 4.808e12, 4.808e14, 9.615e15, 2.404e17],
            [3.125e13, 9.375e13, 3.125e14, 9.375e14, 7.813e15, 7.813e16, 7.813e17],
        ],
        capDay: [
            [2.077e18, 2.077e18, 2.077e18, 2.077e18, 2.077e18, 2.077e18, 2.077e20, 4.154e21, 1.038e23],
            [1.35e19, 4.05e19, 1.35e20, 4.05e20, 3.375e21, 3.375e22, 3.375e23],
        ],
    },
};

// Set targets to 100 for early (except we did 200 for gold, power A)
const earlyNormalTwoExpected: nguExpected = {
    [GameMode.NORMAL]: {
        seconds: [
            [1510613, 1510613, 1510613, 2669745.96, 1510613, 2014349.56, 151061254, 3021225068, 75530626667],
            [397856003.6, 1218911718, 4063039058, 12189117171, 101575976417, 1015759764167, 10157597641668],
        ],
        cap: [
            [3.384e12, 3.384e12, 3.384e12, 6.768e12, 3.384e12, 6.768e12, 3.384e14, 6.768e15, 1.692e17],
            [1.328e14, 3.983e14, 1.328e15, 3.983e15, 3.319e16, 3.319e17, 3.319e18],
        ],
        capDay: [
            [1.462e17, 1.462e17, 1.462e17, 1.462e17, 1.462e17, 1.462e17, 1.462e19, 2.924e20, 7.31e21],
            [5.735e18, 1.72e19, 5.735e19, 1.72e20, 1.434e21, 1.434e22, 1.434e23],
        ],
    },
};

// Set targets for magic to 100 (except ygg, set to 200)
const midNormalExpected: nguExpected = {
    [GameMode.NORMAL]: {
        seconds: [
            [735869.24, 735898.8, 0, 558860.44, 269887.32, 735265.44, 582938.43, 600847, 15021167],
            [111924.26, 161352, 537839, 1613515, 13445954, 134459526, 1344595247],
        ],
        cap: [
            [2.296e12, 2.296e12, 1.837e11, 2.296e12, 2.296e12, 2.296e12, 2.296e13, 9.185e13, 2.296e15],
            [7.393e11, 1.109e12, 3.696e12, 1.109e13, 9.241e13, 9.241e14, 9.241e15],
        ],
        capDay: [
            [1.984e15, 1.984e15, 1.984e15, 1.985e15, 1.986e15, 1.984e15, 1.984e17, 3.968e18, 9.92e19],
            [1.597e16, 4.791e16, 1.597e17, 4.791e17, 3.992e18, 3.992e19, 3.992e20],
        ],
    },
};

// Altered most targets:
// 100k, 50k, 5k, 100k, 1m, 50k, 100k, 1k, 500
// 200k, 4k, 500, 500, 200, 200, -1
const midNormalTwoExpected: nguExpected = {
    [GameMode.NORMAL]: {
        seconds: [
            [35937.69, 7374.46, 100.68, 30666.81, 2467730.78, 7666.75, 1393661.24, 7192.28, 57600],
            [2206265.64, 3951.43, 98.88, 296.64, 825.82, 10332, 0],
        ],
        cap: [
            [7.752e10, 3.876e10, 3.876e9, 7.752e10, 7.752e11, 3.876e10, 7.752e12, 1.55e12, 1.938e13],
            [6.169e11, 3.701e10, 1.542e10, 4.627e10, 1.542e11, 1.542e12, 0],
        ],
        capDay: [
            [3.388e12, 3.373e12, 3.35e12, 3.395e12, 3.889e12, 3.372e12, 3.414e14, 6.698e15, 1.674e17],
            [1.376e13, 3.999e13, 1.333e14, 3.998e14, 3.331e15, 3.331e16, 3.331e17],
        ],
    },
};

const lateNormalExpected: nguExpected = {
    [GameMode.NORMAL]: {
        seconds: [
            [40000, 40000, 40000, 40000, 456662.97, 40000, 1509530.54, 81445.56, 70235.04],
            [1292937.08, 490190, 5643.36, 9215.41, 8960.79, 22402.34, 8961.18],
        ],
        cap: [
            [6.416e9, 6.416e9, 6.416e9, 6.416e9, 6.875e10, 6.416e9, 1.375e12, 9.166e11, 4.583e12],
            [8.596e10, 1.289e11, 1.375e10, 3.095e10, 8.596e10, 4.298e11, 8.596e11],
        ],
        capDay: [
            [8.543e9, 8.543e9, 8.543e9, 8.543e9, 5.638e10, 8.543e9, 1.508e12, 8.286e12, 2.004e14],
            [7.217e10, 1.363e11, 8.318e10, 2.394e11, 1.9e12, 1.878e13, 1.861e14],
        ],
    },
};

// Changed targets to:
//      Normal: 100M, 50M for DC+
//          Magic: 100M (ygg, exp), 50M, 10M adv B
// Evil had no change
const earlyEvilExpected: nguExpected = {
    [GameMode.NORMAL]: {
        seconds: [
            [404794.16, 404794.76, 404935.64, 404883.7, 191428.76, 404354.98, 102097.6, 134783.72, 739148.99],
            [331250.78, 520484.04, 209265.2, 292426.46, 480764.22, 1123287.77, 394400.54],
        ],
        cap: [
            [1.22e8, 1.22e8, 1.22e8, 1.22e8, 1.22e8, 1.22e8, 6.1e9, 1.22e11, 3.05e12],
            [6.234e8, 1.87e9, 3.117e9, 9.351e9, 7.792e10, 7.792e11, 1.558e12],
        ],
        capDay: [
            [1.026e8, 1.026e8, 1.026e8, 1.026e8, 1.156e8, 1.026e8, 6.004e9, 1.161e11, 1.692e12],
            [5.471e8, 1.464e9, 2.734e9, 7.424e9, 4.719e10, 3.29e11, 1.401e12],
        ],
    },
    [GameMode.EVIL]: {
        seconds: [
            [8616.82, 8824, 2474.93, 5771.35, 17968.1, 6326.84, 0, 4076.48, 18044.68],
            [6232.02, 0, 9221.65, 5558.3, 7716.81, 21484.2, 42362.8],
        ],
        cap: [
            [
                48797010585054, 48797010585054, 24398505292527, 121992526462633, 609962632313166, 1219925264626330,
                6099626323131660, 12199252646263300, 60996263231316600,
            ],
            [
                31169608827440, 62339217654880, 311696088274396, 779240220685989, 3116960882743960, 15584804413719800,
                62339217654879100,
            ],
        ],
        capDay: [
            [
                5296150605866610, 5295353994668810, 5280403810550810, 52759828013918100, 527142272075263000,
                5270567553142130000, 52706871058180700000, 527016009810375000000, 5270091782288930000000,
            ],
            [
                13484540065631000, 134715049352194000, 1346618739995340000, 13465542189050700000, 134654237445372000000,
                1346533335267160000000, 13465271013453900000000,
            ],
        ],
    },
};

// Changed targets to:
//      Normal: 100M, 200M for adv, 60 for DC/MNGU, 50 for pp
//          Magic: 100M (ygg, exp), 50M, 20M adv B
// Evil : 6M, 6M, 2M, 2M, 2M, 500k, 500k, 50k, 20k
//          30M, 5M, 500k, 250k, 100k, 50k, 20k
const earlyEvilTwoExpected: nguExpected = {
    [GameMode.NORMAL]: {
        seconds: [
            [200899.12, 200899.28, 201041.32, 200988.66, 1986740.2, 200560.38, 104006.78, 137048.56, 343379.66],
            [124270.14, 314747.58, 8889.46, 92523.26, 286164.3, 491631.22, 198512.2],
        ],
        cap: [
            [6296545, 6296545, 6296545, 6296545, 12593089, 6296545, 377792666, 7555853301, 157413610425],
            [8156065, 24468195, 40780325, 122340973, 1019508105, 10195081049, 40780324194],
        ],
        capDay: [
            [5936071, 5936070, 5935623, 5935789, 6610301, 5937137, 372249572, 7236942393, 116961514338],
            [8001630, 21674569, 43941230, 121591847, 815846782, 6063715918, 29350394539],
        ],
    },
    [GameMode.EVIL]: {
        seconds: [
            [80948.89, 164004.03, 71478.5, 609933.82, 6799784.36, 4933442.66, 35381641.52, 2866494.22, 5746943.94],
            [10813232.2, 8866873.05, 136675.9, 3025763.96, 1034795.24, 11813018.1, 22566270],
        ],
        cap: [
            [3.778e14, 3.778e14, 1.259e14, 1.259e15, 1.259e16, 3.148e16, 3.148e17, 3.148e17, 1.259e18],
            [1.223e15, 2.039e15, 2.039e15, 1.02e16, 4.078e16, 2.039e17, 8.156e17],
        ],
        capDay: [
            [6.317e14, 6.121e14, 3.357e14, 3.481e15, 3.401e16, 2.853e17, 2.922e18, 2.743e19, 2.728e20],
            [1.279e15, 3.124e15, 1.957e16, 1.812e17, 1.799e18, 1.772e19, 1.765e20],
        ],
    },
};

// Changed targets to:
//      Normal: 200M All
//          Magic: 200M All
// Evil : 7.5M, 7.5M, 5M, 20M, 10M, 500k, 500k, 100k, 50k
//          20M, 10M, 500k, 250k, 250k, 50k, 100k
const midEvilExpected: nguExpected = {
    [GameMode.NORMAL]: {
        seconds: [
            [303953.04, 303953.04, 304096.72, 304045.2, 83822.8, 303606.16, 1036817.68, 1071384.4, 1460947.28],
            [220396.24, 415312.08, 1138522, 1225680.4, 1426186.96, 1642145.2, 1939454.48],
        ],
        cap: [
            [15811918, 15811918, 15811918, 15811918, 15811918, 15811918, 1581191732, 31623834640, 790595865999],
            [20769342, 62308024, 207693411, 623080233, 5192335271, 51923352701, 519233527004],
        ],
        capDay: [
            [14951935, 14951935, 14951367, 14951571, 15822105, 14953306, 1205493588, 23836588693, 518918016702],
            [20073588, 57184558, 153063710, 445614459, 3453179499, 31728476018, 278691523659],
        ],
    },
    [GameMode.EVIL]: {
        seconds: [
            [56982.62, 87173.12, 108822.48, 15668581.66, 4301354.05, 1453990.2, 12578634.86, 2102403.9, 14493040.96],
            [3113033.5, 2338459.65, 20828.61, 543737.09, 2950616.14, 927274.89, 53180082.87],
        ],
        cap: [
            [5.929e14, 5.929e14, 3.953e14, 1.581e16, 7.906e16, 3.953e16, 3.953e17, 7.906e17, 3.953e18],
            [1.038e15, 5.192e15, 2.596e15, 1.298e16, 1.298e17, 2.596e17, 5.192e18],
        ],
        capDay: [
            [8.904e14, 8.655e14, 5.866e14, 1.397e16, 1.108e17, 3.583e17, 3.628e18, 3.482e19, 3.432e20],
            [8.172e14, 6.88e15, 2.493e16, 2.308e17, 2.343e18, 2.264e19, 2.281e20],
        ],
    },
};

const midEvilTwoExpected: nguExpected = {
    [GameMode.NORMAL]: {
        seconds: [
            [400847.56, 406050.26, 458496.04, 364273.62, 258774.94, 24531.06, 644804.6, 82794.42, 601376.84],
            [208520.28, 451227.72, 795816.68, 918349.62, 1168346.5, 302838.74, 1019056.18],
        ],
        cap: [
            [1536, 1536, 1536, 1536, 1536, 1174, 117384, 1805893, 45147323],
            [953, 2859, 7287, 21860, 182164, 1401258, 14012575],
        ],
        capDay: [
            [1465, 1463, 1452, 1473, 1497, 1188, 104778, 1807521, 39334867],
            [936, 2706, 6293, 18363, 144262, 1325436, 10745347],
        ],
    },
    [GameMode.EVIL]: {
        seconds: [
            [155867.72, 167367.72, 83389.96, 161143.72, 101341, 115453.46, 9425.22, 158098.01, 1284818.62],
            [147036.46, 46973.1, 47144.88, 89649.76, 467045.42, 1572200.1, 1124689.79],
        ],
        cap: [
            [4.966e11, 4.966e11, 4.515e11, 4.966e12, 4.515e13, 1.806e14, 1.806e15, 4.515e15, 1.806e16],
            [1.682e11, 1.541e12, 5.605e12, 5.605e13, 5.605e14, 4.204e15, 9.809e15],
        ],
        capDay: [
            [4.809e11, 4.783e11, 4.522e11, 4.797e12, 4.481e13, 1.74e14, 1.998e15, 6.279e15, 3.338e16],
            [1.639e11, 1.569e12, 5.88e12, 5.582e13, 5.249e14, 4.394e15, 1.457e16],
        ],
    },
};

const lateEvilExpected: nguExpected = {
    [GameMode.NORMAL]: {
        seconds: [
            [278147.88, 283011.86, 346589.96, 259619.86, 151928.38, 81515.24, 779356.44, 1158138.8, 2054254.94],
            [3609.94, 245918.34, 781953.28, 930443.74, 1351977.14, 1738048.06, 2343919.7],
        ],
        cap: [
            [146, 146, 146, 146, 146, 121, 12139, 242778, 6069439],
            [24, 73, 202, 605, 5045, 50444, 504440],
        ],
        capDay: [
            [142, 142, 141, 143, 145, 121, 10938, 205607, 4363185],
            [24, 71, 182, 532, 4133, 38542, 341757],
        ],
    },
    [GameMode.EVIL]: {
        seconds: [
            [233168.04, 244329.32, 371483.88, 256489.96, 394494.44, 172437.64, 135754.12, 83574.44, 1073715.15],
            [142126.12, 41663.72, 33281.48, 101743.88, 320817.96, 494426.6, 4492.93],
        ],
        cap: [
            [6.937e10, 6.937e10, 6.937e10, 6.937e11, 6.937e12, 4.509e13, 4.509e14, 3.815e15, 3.121e16],
            [6.053e9, 5.765e10, 3.747e11, 3.747e12, 3.747e13, 3.747e14, 2.594e15],
        ],
        capDay: [
            [6.682e10, 6.663e10, 6.442e10, 6.642e11, 6.402e12, 4.36e13, 4.423e14, 3.82e15, 2.939e16],
            [5.973e9, 5.83e10, 3.824e11, 3.725e12, 3.409e13, 3.159e14, 2.714e15],
        ],
    },
};

// var earlySadExpected = {
//     [GameMode.SADISTIC] : {
//         'seconds' : [
//             []
//         ]
//     }
// }

// TODO - Add tests for % and other
describe("NGU Page Helper", () => {
    for (let gm = 0; gm < 3; gm++) {
        let gameMode = GameMode.NORMAL;
        let gameModeName = "Normal";
        if (gm == 1) {
            gameMode = GameMode.EVIL;
            gameModeName = "Evil";
        }
        if (gm == 2) {
            gameMode = GameMode.SADISTIC;
            gameModeName = "Sadistic";
        }

        describe(gameModeName + " NGU", () => {
            const cases: [string, Player, nguExpected][] = [
                ["Early Normal 1", earlyNormalPlayer, earlyNormalExpected],
                ["Early Normal 2", earlyNormalTwoPlayer, earlyNormalTwoExpected],
                ["Mid Normal 1", midNormalPlayer, midNormalExpected],
                ["Mid Normal 2", midNormalTwoPlayer, midNormalTwoExpected],
                ["Late Normal", lateNormalPlayer, lateNormalExpected],
                ["Early Evil 1", earlyEvilPlayer, earlyEvilExpected],
                ["Early Evil 2", earlyEvilTwoPlayer, earlyEvilTwoExpected],
                ["Mid Evil 1", midEvilPlayer, midEvilExpected],
                ["Mid Evil 2", midEvilTwoPlayer, midEvilTwoExpected],
                ["Late Evil 1", lateEvilPlayer, lateEvilExpected],
            ];
            describe.each(cases)("%s", (name, player, expected) => {
                if (!_.isUndefined(expected[gameMode])) {
                    const speedFactors = [
                        player.get("totalEnergyNGUSpeedFactor"),
                        player.get("totalMagicNGUSpeedFactor"),
                    ];
                    const expectedSeconds = expected[gameMode]["seconds"];
                    const expectedCap = expected[gameMode]["cap"];
                    const expectedCapDay = expected[gameMode]["capDay"];

                    const NGUs: NGU[][] = types.map((ty) => {
                        const ngus = ty === "energy" ? player.get("energyNGUs") : player.get("magicNGUs");
                        const retNgus = [];
                        for (const ngu of ngus) {
                            if (ngu.mode == gameMode) {
                                retNgus.push(ngu);
                            }
                        }
                        return retNgus;
                    });

                    const targets = NGUs.map((tyNGUs) => {
                        return tyNGUs.map((ngu) => {
                            return bd(ngu.target);
                        });
                    });

                    const seconds = NGUs.map((tyNGUs, index) => {
                        let ty = types[index];
                        ty = ty[0].toUpperCase() + ty.substring(1);
                        return tyNGUs.map((ngu, innerIndex) => {
                            return ngu.calcSecondsToTarget(
                                player.get("total" + ty + "Cap"),
                                player.get("total" + ty + "NGUSpeedFactor"),
                                targets[index][innerIndex]
                            );
                        });
                    });
                    // var totalSeconds = seconds.map((secs) => {
                    //     return secs.reduce((total, current) => {
                    //         return total.add(current)
                    //     }, bd(0))
                    // })

                    // console.log(seconds, expectedSeconds)
                    for (let i = 0; i < 2; i++) {
                        const maxJ = i == 0 ? 9 : 7;
                        for (let j = 0; j < maxJ; j++) {
                            test(gameModeName + " NGU - " + name + " - " + nguNames[i][j] + " Seconds", () => {
                                expectClose(seconds[i][j], expectedSeconds[i][j]);
                            });
                            test(gameModeName + " NGU - " + name + " - " + nguNames[i][j] + " Cap", () => {
                                expectClose(
                                    NGUs[i][j].capToReachMaxTarget(speedFactors[i]),
                                    expectedCap[i][j]
                                );
                            });
                            test(gameModeName + " NGU - " + name + " - " + nguNames[i][j] + " Cap Day", () => {
                                expectClose(
                                    NGUs[i][j].capToReachMaxInDay(speedFactors[i]),
                                    expectedCapDay[i][j]
                                );
                            });
                        }
                    }

                    // TODO - Need to update snapshots as these are no longer going to be used
                    // var targetCases = [
                    //     [name, "Energy", NGUs[0], targets[0], seconds[0], totalSeconds[0]],
                    //     [name, "Magic", NGUs[1], targets[1], seconds[1], totalSeconds[1]],
                    // ]
                    // test.each(targetCases)(
                    //     gameModeName + " NGU - %s - Target Table - %s",
                    //     (_tname, type, ngus, targets, seconds, totalSeconds) => {
                    //         const nguNormalSnap = renderer.create(
                    //             <NGUTargetTable type={type} NGUs={ngus} targets={targets} seconds={seconds} totalSeconds={totalSeconds} fmt={'scientific'} />
                    //         ).toJSON();
                    //         expect(nguNormalSnap).toMatchSnapshot();
                    //     }
                    // )

                    // var capCases = [
                    //     [name, "Energy", NGUs[0], targets[0], speedFactors[0]],
                    //     [name, "Magic", NGUs[1], targets[1], speedFactors[1]],
                    // ]
                    // test.each(capCases)(
                    //     gameModeName + " NGU - %s - Cap Table - %s",
                    //     (_tname, type, ngus, targets, speedFactor) => {
                    //         const nguNormalSnap = renderer.create(
                    //             <NGUCapTable type={type} NGUs={ngus} targets={targets} speedFactor={speedFactor} fmt={'scientific'} />
                    //         ).toJSON();
                    //         expect(nguNormalSnap).toMatchSnapshot();
                    //     }
                    // )

                    // var capDayCases = [
                    //     [name, "Energy", NGUs[0], speedFactors[0]],
                    //     [name, "Magic", NGUs[1], speedFactors[1]],
                    // ]
                    // test.each(capDayCases)(
                    //     gameModeName + " NGU - %s - Cap Day Table - %s",
                    //     (_tname, type, ngus, speedFactor) => {
                    //         const nguNormalSnap = renderer.create(
                    //             <NGUCapDayTable type={type} NGUs={ngus} speedFactor={speedFactor} fmt={'scientific'} />
                    //         ).toJSON();
                    //         expect(nguNormalSnap).toMatchSnapshot();
                    //     }
                    // )
                }
            });
        });
    }

    // We assume 10% increase
    // - Based off earlyEvil2
    // var expectedIncreases = {
    //     [GameMode.NORMAL] : [
    //         [98950559, 98950640, 98942727.4, 98945634, 121871859, 98969182, 66358975, 73872143, 46327454],
    //         [126653193, 108659131, 54511090, 54907018, 40208212, 35431308, 13028800]
    //     ],
    //     [GameMode.EVIL] : [
    //         [6283445, 8248267, 1112917.3, 1329258, 1793095, 232548, 489325, 60684, 68394],
    //         [282535523, 13733163, 526077, 172419, 103475, 64983, 36074]
    //     ]
    // }

    // for(let gm = 0; gm < 3; gm++) {
    //     let gameMode = GameMode.NORMAL
    //     let gameModeName = 'Normal'
    //     if(gm == 1)  {
    //         gameMode = GameMode.EVIL
    //         gameModeName = 'Evil'
    //     }
    //     if(gm == 2)  {
    //         gameMode = GameMode.SADISTIC
    //         gameModeName = 'Sadistic'
    //     }

    //     describe("NGU Page - " + gameModeName + " NGU", () => {
    //         var cases = [
    //             ['Early Evil 2', earlyEvilTwoData, expectedIncreases],
    //         ]
    //         describe.each(cases)(
    //             gameModeName + " NGU - %s",
    //             (name, data, expected) => {
    //                 if(!_.isUndefined(expected[gameMode])) {
    //                     var NGUs = types.map((ty) => {
    //                         var ngus = (ty === 'energy')
    //                             ? data['energyNGUs'][0]
    //                             : data['magicNGUs'][0]
    //                         var retNgus = []
    //                         for (var ngu of ngus) {
    //                             if(ngu.mode == gameMode) {
    //                                 retNgus.push(ngu)
    //                             }
    //                         }
    //                         return retNgus
    //                     })

    //                     var targets = NGUs.map((tyNGUs, index) => {
    //                         return tyNGUs.map((ngu) => {
    //                             return ngu.percentIncrease(bd(10))
    //                         })
    //                     })

    //                     for(let i = 0; i < 2; i++) {
    //                         let maxJ = (i == 0) ? 9 : 7;
    //                         for(let j = 0; j < maxJ; j++) {
    //                             test(gameModeName + ' NGU - ' + name + ' - ' + nguNames[i][j] + ' 10% Increase', () => {
    //                                 var ec = expectClose(targets[i][j], expected[gameMode][i][j])
    //                                 expect(ec[0]).toBeCloseTo(ec[1], 0)
    //                             })
    //                         }
    //                     }
    //                 }
    //             }
    //         )
    //     })
    // }
});
