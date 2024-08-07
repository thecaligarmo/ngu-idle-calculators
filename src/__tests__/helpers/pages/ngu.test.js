

import renderer from 'react-test-renderer';
import { toDataObj, expectClose } from '@/__tests__/testHelperFunctions'
import earlyNormal from '@/__tests__/__data__/earlyNormal1';
import earlyNormalTwo from '@/__tests__/__data__/earlyNormal2';
import midNormal from '@/__tests__/__data__/midNormal1';
import midNormalTwo from '@/__tests__/__data__/midNormal2';
import lateNormal from '@/__tests__/__data__/lateNormal';
import earlyEvil from '../../__data__/earlyEvil1';
import earlyEvilTwo from '@/__tests__/__data__/earlyEvil2';
import { ENERGY_NGUS, MAGIC_NGUS, NGU } from '@/assets/ngus';
import { bd } from '@/helpers/numbers';
import NGUTargetTable from '@/components/nguInfo/nguTargetTable';
import { GameMode } from '@/assets/mode';
import NGUCapTable from '@/components/nguInfo/nguCapTable';
import NGUCapDayTable from '@/components/nguInfo/nguCapDayTable';
import {test, describe } from '@jest/globals';
import _ from 'lodash';




var earlyNormalData = toDataObj(earlyNormal);
var earlyNormalTwoData = toDataObj(earlyNormalTwo);
var midNormalData = toDataObj(midNormal);
var midNormalTwoData = toDataObj(midNormalTwo);
var lateNormalData = toDataObj(lateNormal)
var earlyEvilData = toDataObj(earlyEvil);
var earlyEvilTwoData = toDataObj(earlyEvilTwo);

var types = ['energy', 'magic']
var nguNames = [
    ['Augments', 'Wandoos', 'Respawn', 'Gold', 'AdvA', 'PowerA', 'DropChance', 'MNGU', 'PP'],
    ['Ygg', 'Exp', 'PowerB', 'Number', 'TM', 'ENGU', 'AdvB']
]


// Set targets to 10 for early
var earlyNormalExpected = {
    [GameMode.NORMAL] : {
        'seconds': [
            [1282051.4, 1282051.4, 1282051.4, 1282051.4, 1282051.4, 1282051.4, 128205137.8, 2564102564, 64102564103],
            [57291666.8, 171875000, 572916666.8, 1718750000, 14322916667, 143229166667, 1432291666667]
        ],
        'cap' : [
            [4.808e12, 4.808e12, 4.808e12, 4.808e12, 4.808e12, 4.808e12, 4.808e14, 9.615e15, 2.404e17],
            [3.125e13, 9.375e13, 3.125e14, 9.375e14, 7.813e15, 7.813e16, 7.813e17]
        ],
        'capDay': [
            [2.077e18, 2.077e18, 2.077e18, 2.077e18, 2.077e18, 2.077e18, 2.077e20, 4.154e21, 1.038e23],
            [1.350e19, 4.050e19, 1.35e20, 4.05e20, 3.375e21, 3.375e22, 3.375e23]
        ]
    }
}

// Set targets to 100 for early (except we did 200 for gold, power A)
var earlyNormalTwoExpected = {
    [GameMode.NORMAL] : {
        'seconds': [
            [1510613, 1510613, 1510613, 2669745.96, 1510613, 2014349.56, 151061254, 3021225068, 75530626667],
            [397856003.6, 1218911718, 4063039058, 12189117171, 101575976417, 1015759764167, 10157597641668]
        ],
        'cap' : [
            [3.384e12, 3.384e12, 3.384e12, 6.768e12, 3.384e12, 6.768e12, 3.384e14, 6.768e15, 1.692e17],
            [1.328e14, 3.983e14, 1.328e15, 3.983e15, 3.319e16, 3.319e17, 3.319e18]
        ],
        'capDay': [
            [1.462e17, 1.462e17, 1.462e17, 1.462e17, 1.462e17, 1.462e17, 1.462e19, 2.924e20, 7.310e21],
            [5.735e18, 1.72e19, 5.735e19, 1.72e20, 1.434e21, 1.434e22, 1.434e23]
        ]
    }
}

// Set targets for magic to 100 (except ygg, set to 200)
var midNormalExpected = {
    [GameMode.NORMAL] : {
        'seconds': [
            [735869.24, 735898.8, 0, 558860.44, 269887.32, 735265.44, 582938.43, 600847, 15021167],
            [111924.26, 161352, 537839, 1613515, 13445954, 134459526, 1344595247]
        ],
        'cap' : [
            [2.296e12, 2.296e12, 1.837e11, 2.296e12, 2.296e12, 2.296e12, 2.296e13, 9.185e13, 2.296e15],
            [7.393e11, 1.109e12, 3.696e12, 1.109e13, 9.241e13, 9.241e14, 9.241e15]
        ],
        'capDay': [
            [1.984e15, 1.984e15, 1.984e15, 1.985e15, 1.986e15, 1.984e15, 1.984e17, 3.968e18, 9.920e19],
            [1.597e16, 4.791e16, 1.597e17, 4.791e17, 3.992e18, 3.992e19, 3.992e20]
        ]
    }
}

// Altered most targets:
// 100k, 50k, 5k, 100k, 1m, 50k, 100k, 1k, 500
// 200k, 4k, 500, 500, 200, 200, -1
var midNormalTwoExpected = {
    [GameMode.NORMAL] : {
        'seconds': [
            [36438.24, 7562.64, 134.82, 31064.48, 2467730.78, 7862.64, 1393661.24, 7200, 57600],
            [2206265.64, 3971.88, 99.8, 297.68, 827, 10332, 0]
        ],
        'cap' : [
            [7.752e10, 3.876e10, 3.876e9, 7.752e10, 7.752e11, 3.876e10, 7.752e12, 1.550e12, 1.938e13],
            [6.169e11, 3.701e10, 1.542e10, 4.627e10, 1.542e11, 1.542e12, 0]
        ],
        'capDay': [
            [3.388e12, 3.373e12, 3.35e12, 3.395e12, 3.889e12, 3.372e12, 3.414e14, 6.698e15, 1.674e17],
            [1.376e13, 3.999e13, 1.333e14, 3.998e14, 3.331e15, 3.331e16, 3.331e17]
        ]
    }
}


var lateNormalExpected = {
    [GameMode.NORMAL] : {
        'seconds': [
            [40000, 40000, 40000, 40000, 712619.48, 40000, 1537348.74, 84459.48, 70709.4],
            [1397595.72, 518224.7, 5643.36, 12009.22, 9964.98, 22904.1, 9061.5]
        ],
        'cap' : [
            [6.416e9, 6.416e9, 6.416e9, 6.416e9, 6.875e10, 6.416e9, 1.375e12, 9.166e11, 4.583e12],
            [8.596e10, 1.289e11, 1.375e10, 3.095e10, 8.596e10, 4.298e11, 8.596e11]
        ],
        'capDay': [
            [8.543e9, 8.543e9, 8.543e9, 8.543e9, 5.638e10, 8.543e9, 1.508e12, 8.286e12, 2.004e14],
            [7.217e10, 1.363e11, 8.318e10, 2.394e11, 1.9e12, 1.878e13, 1.861e14]
        ]
    }
}


// Changed targets to:
//      Normal: 100M, 50M for DC+
//          Magic: 100M (ygg, exp), 50M, 10M adv B
// Evil had no change
var earlyEvilExpected = {
    [GameMode.NORMAL] : {
        'seconds': [
            [404794.16, 404794.76, 404935.64, 404883.7, 191428.76, 404354.98, 102097.6, 134783.72, 1000944.16],
            [331250.78, 520484.04, 209265.2, 292426.46, 480764.22, 1474479.52, 443997.42]
        ],
        'cap' : [
            [1.22e8, 1.22e8, 1.22e8, 1.22e8, 1.22e8, 1.22e8, 6.1e9, 1.22e11, 3.05e12],
            [6.234e8, 1.87e9, 3.117e9, 9.351e9, 7.792e10, 7.792e11, 1.558e12]
        ],
        'capDay': [
            [1.026e8, 1.026e8, 1.026e8, 1.026e8, 1.156e8, 1.026e8, 6.004e9, 1.161e11, 1.692e12],
            [5.471e8, 1.464e9, 2.734e9, 7.424e9, 4.719e10, 3.290e11, 1.401e12]
        ]
    },
    [GameMode.EVIL] : {
        'seconds': [
            [8803.48, 9015.4, 2588.07, 5823.04, 17968.1, 6326.84, 0, 4076.48, 18044.68],
            [6269.88, 0, 9227.42, 5558.3, 7716.81, 21484.2, 42362.8]
        ],
        'cap' : [
            [48797010585054, 48797010585054, 24398505292527, 121992526462633, 609962632313166, 1219925264626330, 6099626323131660, 12199252646263300, 60996263231316600],
            [31169608827440, 62339217654880, 311696088274396, 779240220685989, 3116960882743960, 15584804413719800, 62339217654879100]
        ],
        'capDay': [
            [5296150605866610, 5295353994668810, 5280403810550810, 52759828013918100, 527142272075263000, 5270567553142130000, 52706871058180700000, 527016009810375000000, 5270091782288930000000],
            [13484540065631000, 134715049352194000, 1346618739995340000, 13465542189050700000, 134654237445372000000, 1346533335267160000000, 13465271013453900000000]
        ]
    }
}


// Changed targets to:
//      Normal: 100M, 200M for adv, 60 for DC/MNGU, 50 for pp
//          Magic: 100M (ygg, exp), 50M, 20M adv B
// Evil : 6M, 6M, 2M, 2M, 2M, 500k, 500k, 50k, 20k
//          30M, 5M, 500k, 250k, 100k, 50k, 20k
var earlyEvilTwoExpected = {
    [GameMode.NORMAL] : {
        'seconds': [
            [200899.12, 200899.28, 201041.32, 200988.66, 1986740.2, 200560.38, 104006.78, 137048.56, 343379.66],
            [124270.14, 314747.58, 8889.46, 92523.26, 286164.3, 491631.22, 198512.2]
        ],
        'cap' : [
            [6296545, 6296545, 6296545, 6296545, 12593089, 6296545, 377792666, 7555853301, 157413610425],
            [8156065, 24468195, 40780325, 122340973, 1019508105, 10195081049, 40780324194]
        ],
        'capDay': [
            [5936071, 5936070, 5935623, 5935789, 6610301, 5937137, 372249572, 7236942393, 116961514338],
            [8001630, 21674569, 43941230, 121591847, 815846782, 6063715918, 29350394539]
        ]
    },
    [GameMode.EVIL] : {
        'seconds': [
            [83990.4, 170882.04, 80999.2, 617853.93, 6808973.08, 4933442.66, 35381641.52, 2866494.22, 5746943.94],
            [10813232.2, 8883482., 136675.9, 3025763.96, 1034795.24, 11813018.1, 22566270]
        ],
        'cap' : [
            [3.778e+14, 3.778e+14, 1.259e+14, 1.259e+15, 1.259e+16, 3.148e+16, 3.148e+17, 3.148e+17, 1.259e+18],
            [1.223e+15, 2.039e+15, 2.039e+15, 1.020e+16, 4.078e+16, 2.039e+17, 8.156e+17]
        ],
        'capDay': [
            [6.317e+14, 6.121e+14, 3.357e+14, 3.481e+15, 3.401e+16, 2.853e+17, 2.922e+18, 2.743e+19, 2.728e+20],
            [1.279e+15, 3.124e+15, 1.957e+16, 1.812e+17, 1.799e+18, 1.772e+19, 1.765e+20]
        ]
    }
}


// TODO - Add tests for % and other

for(let gm = 0; gm < 3; gm++) {
    let gameMode = GameMode.NORMAL
    let gameModeName = 'Normal'
    if(gm == 1)  {
        gameMode = GameMode.EVIL
        gameModeName = 'Evil'
    }
    if(gm == 2)  {
        gameMode = GameMode.SADISTIC
        gameModeName = 'Sadistic'
    }

    describe("NGU Page - " + gameModeName + " NGU", () => {
        var cases = [
            ['Early Normal 1', earlyNormalData, earlyNormalExpected],
            ['Early Normal 2', earlyNormalTwoData, earlyNormalTwoExpected],
            ['Mid Normal 1', midNormalData, midNormalExpected],
            ['Mid Normal 2', midNormalTwoData, midNormalTwoExpected],
            ['Late Normal', lateNormalData, lateNormalExpected],
            ['Early Evil 1', earlyEvilData, earlyEvilExpected],
            ['Early Evil 2', earlyEvilTwoData, earlyEvilTwoExpected],
        ]
        describe.each(cases)(
            gameModeName + " NGU - %s",
            (name, data, expected) => {
                if(!_.isUndefined(expected[gameMode])) {
                    var speedFactors = [
                        bd(data['totalEnergyNGUSpeedFactor%'][0]),
                        bd(data['totalMagicNGUSpeedFactor%'][0])
                    ]
                    var expectedSeconds = expected[gameMode]['seconds']
                    var expectedCap = expected[gameMode]['cap']
                    var expectedCapDay = expected[gameMode]['capDay']
                    
                    var NGUs = types.map((ty) => {
                        var ngus = (ty === 'energy')
                            ? data['energyNGUs'][0]
                            : data['magicNGUs'][0]
                        var retNgus = []
                        for (var ngu of ngus) {
                            if(ngu.mode == gameMode) {
                                retNgus.push(ngu)
                            }
                        }
                        return retNgus
                    })

                    var targets = NGUs.map((tyNGUs, index) => {
                        return tyNGUs.map((ngu) => {
                            return bd(ngu.target);
                        })
                    })

                    var seconds = NGUs.map((tyNGUs, index) => {
                        var ty = types[index]
                        ty = ty[0].toUpperCase() + ty.substring(1)
                        return tyNGUs.map((ngu, innerIndex) => {
                            return ngu.calcSecondsToTarget(
                                bd(data["current" + ty + "Cap"][0]),
                                bd(data["total" + ty + "NGUSpeedFactor%"][0]),
                                targets[index][innerIndex]
                            )
                        })
                    })
                    var totalSeconds = seconds.map((secs, index) => {
                        return secs.reduce((total, current) => {
                            return total.add(current)
                        }, bd(0))
                    })

                    // console.log(seconds, expectedSeconds)
                    for(let i = 0; i < 2; i++) {
                        let maxJ = (i == 0) ? 9 : 7;
                        for(let j = 0; j < maxJ; j++) {
                            test(gameModeName + ' NGU - ' + name + ' - ' + nguNames[i][j] + ' Seconds', () => {
                                var ec = expectClose(seconds[i][j], expectedSeconds[i][j])
                                // console.log(i, j, seconds[i][j], expectedSeconds[i][j], ec)
                                expect(ec[0]).toBeCloseTo(ec[1], 0)
                            })
                            test(gameModeName + ' NGU - ' + name + ' - ' + nguNames[i][j] + ' Cap', () => {
                                var ec = expectClose(NGUs[i][j].capToReachMaxTarget(speedFactors[i]), expectedCap[i][j])
                                // console.log(i, j, seconds[i][j], expectedSeconds[i][j], ec)
                                expect(ec[0]).toBeCloseTo(ec[1], 0)
                            })
                            test(gameModeName + ' NGU - ' + name + ' - ' + nguNames[i][j] + ' Cap Day', () => {
                                var ec = expectClose(NGUs[i][j].capToReachMaxInDay(speedFactors[i]), expectedCapDay[i][j])
                                // console.log(i, j, seconds[i][j], expectedSeconds[i][j], ec)
                                expect(ec[0]).toBeCloseTo(ec[1], 0)
                            })
                        }
                    }
                    
                    var targetCases = [
                        [name, "Energy", NGUs[0], targets[0], seconds[0], totalSeconds[0]],
                        [name, "Magic", NGUs[1], targets[1], seconds[1], totalSeconds[1]],
                    ]
                    test.each(targetCases)(
                        gameModeName + " NGU - %s - Target Table - %s",
                        (tname, type, ngus, targets, seconds, totalSeconds) => {
                            const nguNormalSnap = renderer.create(
                                <NGUTargetTable type={type} NGUs={ngus} targets={targets} seconds={seconds} totalSeconds={totalSeconds} fmt={'scientific'} />
                            ).toJSON();
                            expect(nguNormalSnap).toMatchSnapshot();
                        }
                    )

                    
                    var capCases = [
                        [name, "Energy", NGUs[0], targets[0], speedFactors[0]],
                        [name, "Magic", NGUs[1], targets[1], speedFactors[1]],
                    ]
                    test.each(capCases)(
                        gameModeName + " NGU - %s - Cap Table - %s",
                        (tname, type, ngus, targets, speedFactor) => {
                            const nguNormalSnap = renderer.create(
                                <NGUCapTable type={type} NGUs={ngus} targets={targets} speedFactor={speedFactor} fmt={'scientific'} />
                            ).toJSON();
                            expect(nguNormalSnap).toMatchSnapshot();
                        }
                    )

                    var capDayCases = [
                        [name, "Energy", NGUs[0], speedFactors[0]],
                        [name, "Magic", NGUs[1], speedFactors[1]],
                    ]
                    test.each(capDayCases)(
                        gameModeName + " NGU - %s - Cap Day Table - %s",
                        (tname, type, ngus, speedFactor) => {
                            const nguNormalSnap = renderer.create(
                                <NGUCapDayTable type={type} NGUs={ngus} speedFactor={speedFactor} fmt={'scientific'} />
                            ).toJSON();
                            expect(nguNormalSnap).toMatchSnapshot();
                        }
                    )
                }
            }
        )
    })
}



// We assume 10% increase
// - Based off earlyEvil2
var expectedIncreases = {
    [GameMode.NORMAL] : [
        [98950559, 98950640, 98942727.4, 98945634, 121871859, 98969182, 66358975, 73872143, 46327454],
        [126653193, 108659131, 54511090, 54907018, 40208212, 35431308, 13028800]
    ],
    [GameMode.EVIL] : [
        [6283445, 8248267, 1112917.3, 1329258, 1793095, 232548, 489325, 60684, 68394],
        [282535523, 13733163, 526077, 172419, 103475, 64983, 36074]
    ]
}


for(let gm = 0; gm < 3; gm++) {
    let gameMode = GameMode.NORMAL
    let gameModeName = 'Normal'
    if(gm == 1)  {
        gameMode = GameMode.EVIL
        gameModeName = 'Evil'
    }
    if(gm == 2)  {
        gameMode = GameMode.SADISTIC
        gameModeName = 'Sadistic'
    }

    describe("NGU Page - " + gameModeName + " NGU", () => {
        var cases = [
            ['Early Evil 2', earlyEvilTwoData, expectedIncreases],
        ]
        describe.each(cases)(
            gameModeName + " NGU - %s",
            (name, data, expected) => {
                if(!_.isUndefined(expected[gameMode])) {
                    var NGUs = types.map((ty) => {
                        var ngus = (ty === 'energy')
                            ? data['energyNGUs'][0]
                            : data['magicNGUs'][0]
                        var retNgus = []
                        for (var ngu of ngus) {
                            if(ngu.mode == gameMode) {
                                retNgus.push(ngu)
                            }
                        }
                        return retNgus
                    })

                    var targets = NGUs.map((tyNGUs, index) => {
                        return tyNGUs.map((ngu) => {
                            return ngu.percentIncrease(bd(10))
                        })
                    })

                    for(let i = 0; i < 2; i++) {
                        let maxJ = (i == 0) ? 9 : 7;
                        for(let j = 0; j < maxJ; j++) {
                            test(gameModeName + ' NGU - ' + name + ' - ' + nguNames[i][j] + ' 10% Increase', () => {
                                var ec = expectClose(targets[i][j], expected[gameMode][i][j])
                                expect(ec[0]).toBeCloseTo(ec[1], 0)
                            })
                        }
                    }
                }
            }
        )
    })
}