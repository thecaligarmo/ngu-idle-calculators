

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




// TODO - Add tests for seconds
describe("NGU Page - Normal NGU", () => {
    var cases = [
        ['Early Normal 1', earlyNormalData, earlyNormalExpected],
        ['Early Normal 2', earlyNormalTwoData, earlyNormalTwoExpected],
        ['Mid Normal 1', midNormalData, midNormalExpected],
        ['Mid Normal 2', midNormalTwoData, midNormalTwoExpected],
        ['Late Normal', lateNormalData, lateNormalExpected],
    ]
    describe.each(cases)(
        "Normal NGU - %s",
        (name, data, expected) => {
            var gameMode = GameMode.NORMAL
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
                    test('Normal NGU - ' + name + ' - ' + nguNames[i][j] + ' Seconds', () => {
                        var ec = expectClose(seconds[i][j], expectedSeconds[i][j])
                        // console.log(i, j, seconds[i][j], expectedSeconds[i][j], ec)
                        expect(ec[0]).toBeCloseTo(ec[1], 0)
                    })
                    test('Normal NGU - ' + name + ' - ' + nguNames[i][j] + ' Cap', () => {
                        var ec = expectClose(NGUs[i][j].capToReachMaxTarget(speedFactors[i]), expectedCap[i][j])
                        // console.log(i, j, seconds[i][j], expectedSeconds[i][j], ec)
                        expect(ec[0]).toBeCloseTo(ec[1], 0)
                    })
                    test('Normal NGU - ' + name + ' - ' + nguNames[i][j] + ' Cap Day', () => {
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
                "Normal NGU - %s - Target Table - %s",
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
                "Normal NGU - %s - Cap Table - %s",
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
                "Normal NGU - %s - Cap Day Table - %s",
                (tname, type, ngus, speedFactor) => {
                    const nguNormalSnap = renderer.create(
                        <NGUCapDayTable type={type} NGUs={ngus} speedFactor={speedFactor} fmt={'scientific'} />
                    ).toJSON();
                    expect(nguNormalSnap).toMatchSnapshot();
                }
            )
            
        }
    )
})