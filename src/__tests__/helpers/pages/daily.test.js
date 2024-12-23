import earlyEvilTwo from '@/__tests__/__data__/earlyEvil2';
import earlyNormal from '@/__tests__/__data__/earlyNormal1';
import earlyNormalTwo from '@/__tests__/__data__/earlyNormal2';
import lateNormal from '@/__tests__/__data__/lateNormal';
import midEvil from '@/__tests__/__data__/midEvil1';
import midNormal from '@/__tests__/__data__/midNormal1';
import midNormalTwo from '@/__tests__/__data__/midNormal2';
import { expectClose, toDataObj } from '@/__tests__/testHelperFunctions';
import { AttackStat, Titans } from "@/assets/enemy";
import { bd } from '@/helpers/numbers';
import { getDailySaveAP, getDailySpinAP, getMaxTitanByAK, getMoneyPitAP, getQuestInfo, getRebirthAP, getTitanHourlyInfo, getTitanList } from '@/helpers/pages/daily';
import renderer from 'react-test-renderer';
import earlyEvil from '@/__tests__/__data__/earlyEvil1';
import midEvilTwo from '@/__tests__/__data__/midEvil2';
import lateEvil from '@/__tests__/__data__/lateEvil1';
import earlySad from '@/__tests__/__data__/earlySad1';



var earlyNormalData = toDataObj(earlyNormal);
var earlyNormalTwoData = toDataObj(earlyNormalTwo);
var midNormalData = toDataObj(midNormal);
var midNormalTwoData = toDataObj(midNormalTwo);
var lateNormalData = toDataObj(lateNormal);
var lateEvilData = toDataObj(lateEvil);
var earlyEvilData = toDataObj(earlyEvil);
var earlyEvilTwoData = toDataObj(earlyEvilTwo);
var midEvilData = toDataObj(midEvil);
var midEvilTwoData = toDataObj(midEvilTwo);
var earlySadData = toDataObj(earlySad);

// getQuestInfo

describe("Daily page - Quest Info", () => {
    var cases = [
        [lateNormalData, {
            beastButter : false,
            hoursOfflinePerDay : bd(0),
            hoursPerDay : bd(24),
            idleMajorQuests : false,
            includeMajorQuests : false,
        }, {
            'ap' : {'major' : bd(0), 'minor': bd(75), 'perMajor' : bd(173), 'perMinor' : bd(17)},
            'qp' : {'major' : bd(0), 'minor': bd(48), 'perMajor' : bd(114), 'perMinor' : bd(11)},
        }],
        [earlyEvilData, {
            beastButter : false,
            hoursOfflinePerDay : bd(0),
            hoursPerDay : bd(24),
            idleMajorQuests : false,
            includeMajorQuests : true,
        }, {
            'ap' : {'major' : bd(708), 'minor': bd(107), 'perMajor' : bd(185), 'perMinor' : bd(18)},
            'qp' : {'major' : bd(536), 'minor': bd(83), 'perMajor' : bd(140), 'perMinor' : bd(14)},
        }],
        [earlyEvilTwoData, {
            beastButter : false,
            hoursOfflinePerDay : bd(0),
            hoursPerDay : bd(24),
            idleMajorQuests : true,
            includeMajorQuests : true,
        }, {
            'ap' : {'major' : bd(356), 'minor': bd(108), 'perMajor' : bd(93), 'perMinor' : bd(18)},
            'qp' : {'major' : bd(306), 'minor': bd(96), 'perMajor' : bd(80), 'perMinor' : bd(16)},
        }],
        [midEvilTwoData, {
            beastButter : false,
            hoursOfflinePerDay : bd(0),
            hoursPerDay : bd(24),
            idleMajorQuests : false,
            includeMajorQuests : false,
        }, {
            'ap' : {'major' : bd(0), 'minor': bd(239), 'perMajor' : bd(191), 'perMinor' : bd(22)},
            'qp' : {'major' : bd(0), 'minor': bd(554), 'perMajor' : bd(428), 'perMinor' : bd(51)},
        }],
        [lateEvilData, {
            beastButter : false,
            hoursOfflinePerDay : bd(0),
            hoursPerDay : bd(24),
            idleMajorQuests : false,
            includeMajorQuests : false,
        }, {
            'ap' : {'major' : bd(0), 'minor': bd(385), 'perMajor' : bd(229), 'perMinor' : bd(22)},
            'qp' : {'major' : bd(0), 'minor': bd(1265), 'perMajor' : bd(725), 'perMinor' : bd(72)},
        }],
        [earlySadData, {
            beastButter : false,
            hoursOfflinePerDay : bd(0),
            hoursPerDay : bd(24),
            idleMajorQuests : false,
            includeMajorQuests : false,
        }, {
            'ap' : {'major' : bd(0), 'minor': bd(412), 'perMajor' : bd(230), 'perMinor' : bd(23)},
            'qp' : {'major' : bd(0), 'minor': bd(2440), 'perMajor' : bd(1368), 'perMinor' : bd(136)},
        }],
    ]
    test.each(cases)(
        "Daily Page - Quest Info - Case %#",
        (data, extraData, expectedValue) => {

            var infoData = {
                totalAPBonus: bd(data['totalAPBonus%'][0]),
                totalQPBonus: bd(data['totalQuestRewardBonus%'][0]),
                activeQuestWishI: bd(data['activeQuestWishI-2'][0]),
                activeQuestWishII: bd(data['activeQuestWishII-2'][0]),
                blueHeart: data['blueHeart^'][0] == 1,
                fadLandsSetBonus: data['fadLandsSetBonus^'][0] == 1,
                fasterQuesting: data['fasterQuesting^'][0] == 1,
                fibQuestRNG: data['fibQuestRNG^'][0] == 1,
                redLiquidBonus: data['redLiquidBonus^'][0] == 1,
                questIdleDivider: bd(data['questIdleDivider-1'][0]),
                questMinorQP: bd(data['questMinorQP-2'][0]),
                questMajorQP: bd(data['questMajorQP-2'][0]),
                totalQuestDropBonus: bd(data['totalQuestDropBonus%'][0]),
                totalRespawnTime: bd(data['totalRespawnTime'][0]),
            }


            var combinedData = {...infoData, ...extraData}
            var questInfo = getQuestInfo(combinedData)
            for (var t of ['ap', 'qp']){
                for (var m of ['major', 'minor', 'perMajor', 'perMinor']) {
                    var ec = expectClose(questInfo[t][m], expectedValue[t][m])
                    expect(ec[0]).toBeCloseTo(ec[1], 0)
                }
            }
        }
    )
})



test('Daily Page - Title List', ()=> {
    var titanList = getTitanList()
    const titanListSnap = renderer.create(<>{titanList}</>).toJSON();
    expect(titanListSnap).toMatchSnapshot();
})

describe("Daily page - Max Titan AK", () => {
    var cases = [
        [earlyNormalData, [Titans.NONE, 0]], // 0
        [earlyNormalTwoData, [Titans.GRAND_TREE, 0]],
        [midNormalData, [Titans.UUG, 0]], // 2
        [midNormalTwoData, [Titans.WALDERP, 4]],
        [lateNormalData, [Titans.BEAST, 2]], // 4
        [earlyEvilData, [Titans.BEAST, 3]],
        [earlyEvilTwoData, [Titans.BEAST, 3]], // 6
        [midEvilData, [Titans.NERD, 1]],
        [midEvilTwoData, [Titans.GODMOTHER, 1]], // 8
        [lateEvilData, [Titans.EXILE, 0]],
        [earlySadData, [Titans.EXILE, 3]],
    ]
    test.each(cases)(
        "Daily Page - Max Titan AK - Case %#",
        (data, expectedValue) => {
            var playerAttack = new AttackStat(1, bd(data['totalPower'][0]), bd(data['totalToughness'][0]), bd(data['totalRegen'][0]), bd(data['totalHealth'][0]))
            var titans = data['titans'][0]
            var maxTitanByAK = getMaxTitanByAK(titans, playerAttack)
            expect(maxTitanByAK[0].key).toBe(expectedValue[0].key)
            expect(maxTitanByAK[1]).toBe(expectedValue[1])
        }
    )
})

describe("Daily page - Titan Hourly Info", () => {
    var cases = [
        [[Titans.NONE, 0], earlyNormalData, {
            'ap' : bd(0),
            'exp' : bd(0),
            'ppp' : bd(0),
            'qp' : bd(0),
        }],
        [[Titans.GRAND_TREE, 0], earlyNormalTwoData, {
            'ap' : bd(25),
            'exp' : bd(95),
            'ppp' : bd(0),
            'qp' : bd(0),
        }],
        [[Titans.UUG, 0], midNormalData, {
            'ap' : bd(100.57),
            'exp' : bd(685),
            'ppp' : bd(0),
            'qp' : bd(0),
        }],
        [[Titans.WALDERP, 4], midNormalTwoData, {
            'ap' : bd(262),
            'exp' : bd(2172),
            'ppp' : bd(0),
            'qp' : bd(0),
        }],
        [[Titans.BEAST, 2], lateNormalData, {
            'ap' : bd(354),
            'exp' : bd(78657),
            'ppp' : bd(871450),
            'qp' : bd(0),
        }],
        [[Titans.BEAST, 3], earlyEvilData, {
            'ap' : bd(377),
            'exp' : bd(82194),
            'ppp' : bd(3714700),
            'qp' : bd(0),
        }],
        [[Titans.BEAST, 3], earlyEvilTwoData, {
            'ap' : bd(382),
            'exp' : bd(135653),
            'ppp' : bd(6257075),
            'qp' : bd(0),
        }],
        [[Titans.GODMOTHER, 1], midEvilTwoData, { // Per hour, off by one for version
            'ap' : bd(9360/24), 
            'exp' : bd(77909040/24),
            'ppp' : bd(9152102400/24),
            'qp' : bd(120/24),
        }],
        [[Titans.EXILE, 0], lateEvilData, { // Per hour, off by one for version
            'ap' : bd(9360/24), 
            'exp' : bd(74626956/24),
            'ppp' : bd(32276551680/24),
            'qp' : bd(696/24),
        }],
        
        [[Titans.EXILE, 3], earlySadData, { // Per hour, off by one for version
            'ap' : bd(9408/24), 
            'exp' : bd(528321348/24),
            'ppp' : bd(102675384240/24),
            'qp' : bd(2400/24),
        }],
    ]
    test.each(cases)(
        "Daily Page - Titan Hourly Info - Case %#",
        (maxTitan, data, expectedValue) => {

            var infoData = {
                totalAPBonus: bd(data['totalAPBonus%'][0]),
                totalExpBonus: bd(data['totalExpBonus%'][0]),
                totalPPBonus : bd(data['totalPPBonus%'][0]),
                totalQPBonus: bd(data['totalQuestRewardBonus%'][0]),
                bonusTitanEXPPerk: bd(data['bonusTitanEXPPerk-2'][0]),
                numRebirthChallenges: bd(data['numRebirthChallenges-2'][0]),
                twentyFourHourChallenge: bd(data['twentyFourHourChallenge-2'][0]),
                twentyFourHourEvilChallenge: bd(data['twentyFourHourEvilChallenge-2'][0]),
                twentyFourHourSadisticChallenge: bd(data['twentyFourHourSadisticChallenge-2'][0]),
                wishTitansHadBetterRewards : bd(data['wishTitansHadBetterRewards-2'][0]),
                wishes : data['wishes'][0],
            }

            var titanHourlyInfo = getTitanHourlyInfo(maxTitan, infoData)
            for (var t of ['ap', 'exp', 'ppp', 'qp']){
                var ec = expectClose(titanHourlyInfo[t], expectedValue[t])
                expect(ec[0]).toBeCloseTo(ec[1], 0)
            }
        }
    )
})


describe("Daily page - AP Rebirth", () => {
    var cases = [
        [bd(124.7), bd(24), 206],
        [bd(158.5), bd(20), 216],
        [bd(175.35), bd(15), 176],
    ]
    test.each(cases)(
        "Daily Page - AP Rebirth - Case %#",
        (totalAPBonus, hoursPerDay, expectedValue) => {
            var apRebirth = getRebirthAP(totalAPBonus, hoursPerDay,)
            expect(Number(apRebirth.getValue())).toBeCloseTo(expectedValue)
        }
    )
})


describe("Daily page - AP Money Pit", () => {
    var cases = [
        [bd(50), bd(4), bd(175.35), 348],
        [bd(22), bd(6), bd(125.7), 162],
        [bd(25), bd(2), bd(150.15), 74],
    ]
    test.each(cases)(
        "Daily Page - AP Money Pit - Case %#",
        (goldToss, numTosses, totalAPBonus, expectedValue) => {
            var apMoneyPit = getMoneyPitAP(goldToss, numTosses, totalAPBonus)
            expect(Number(apMoneyPit.getValue())).toBeCloseTo(expectedValue)
        }
    )
})


describe("Daily page - AP Daily Save", () => {
    var cases = [
        [bd(124.7), bd(24), 249],
        [bd(158.5), bd(20), 264.1667],
        [bd(175.35), bd(15), 218.75],
    ]
    test.each(cases)(
        "Daily Page - AP Daily Save - Case %#",
        (totalAPBonus, hoursPerDay, expectedValue) => {

            var apDailySave = getDailySaveAP(totalAPBonus, hoursPerDay)
            expect(Number(apDailySave.getValue())).toBeCloseTo(expectedValue)
        }
    )
})


describe("Daily page - AP Daily Spin", () => {
    var cases = [
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
    ]
    test.each(cases)(
        "Daily Page - AP Daily Spin - Case %#",
        (dailySpinTier, totalAPBonus, hoursPerDay, incConsumables, incJackpot, expectedValue) => {

            var apDailySpin = getDailySpinAP(dailySpinTier, totalAPBonus, hoursPerDay, incConsumables, incJackpot)
            expect(Number(apDailySpin.getValue())).toBeCloseTo(expectedValue, 0)
        }
    )
})