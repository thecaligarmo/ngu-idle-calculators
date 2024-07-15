import { toDataObj } from '../../testHelperFunctions'
import { bd } from '../../../src/helpers/numbers';
import {defaultPlayerData} from '../../../src/helpers/defaultPlayerData'
import {nguInfo} from '../../../src/helpers/resourceInfo'
import {Stat} from '../../../src/assets/stat';

import earlyNormalTwo from '../../__data__/earlyNormal2';
import midNormal from '../../__data__/midNormal1';
import midNormalTwo from '../../__data__/midNormal2';
import lateNormal from '../../__data__/lateNormal';


test('Yggdrasil for Early Normal 2', () => {
    var playerData = toDataObj(earlyNormalTwo)
    var ygg = playerData['yggdrasil'][0]
    var blueHeart = (playerData['blueHeart^'][0] == 1)
    var seedModifier = bd(playerData['totalSeedGainBonus%'][0])
    var firstHarvest = playerData['firstHarvestPerk'][0]

    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        yieldModifier: bd(playerData['totalYggdrasilYieldBonus%'][0]),
        baseToughness: bd(playerData['baseAdventureToughness'][0]),
        expBonus: bd(playerData['totalExpBonus%'][0]),
        fokSucksPerk: playerData['fruitOfKnowledgeSucks^'][0] == 1,
        fokStillSucksPerk: playerData['fruitOfKnowledgeSTILLSucks^'][0] == 1,
        apBonus: bd(playerData['totalAPBonus%'][0]),
        ppBonus: bd(playerData['totalPPBonus%'][0]),
        qpRewardBonus: bd(playerData['totalQuestRewardBonus%'][0]),
        mayoSpeed: bd(playerData['totalMayoSpeed%'][0]),
    }
    
    // Gold
    expect(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(47)
    expect(ygg[0].upgradeCost()).toBe(81)
    expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0)

    // PowerA
    expect(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(7)
    expect(ygg[1].upgradeCost()).toBe(90)
    expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Adventure
    expect(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(3)
    expect(ygg[2].upgradeCost()).toBe(100)
    expect(Number(ygg[2].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Pomegranate
    expect(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(11)
    expect(ygg[4].upgradeCost()).toBe(240)
    expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0)
});













test('Yggdrasil for Mid Normal 1', () => {
    var playerData = toDataObj(midNormal)
    var ygg = playerData['yggdrasil'][0]
    var blueHeart = (playerData['blueHeart^'][0] == 1)
    var seedModifier = bd(playerData['totalSeedGainBonus%'][0])
    var firstHarvest = playerData['firstHarvestPerk'][0]

    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        yieldModifier: bd(playerData['totalYggdrasilYieldBonus%'][0]),
        baseToughness: bd(playerData['baseAdventureToughness'][0]),
        expBonus: bd(playerData['totalExpBonus%'][0]),
        fokSucksPerk: playerData['fruitOfKnowledgeSucks^'][0] == 1,
        fokStillSucksPerk: playerData['fruitOfKnowledgeSTILLSucks^'][0] == 1,
        apBonus: bd(playerData['totalAPBonus%'][0]),
        ppBonus: bd(playerData['totalPPBonus%'][0]),
        qpRewardBonus: bd(playerData['totalQuestRewardBonus%'][0]),
        mayoSpeed: bd(playerData['totalMayoSpeed%'][0]),
    }

    // Gold
    expect(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(73)
    expect(ygg[0].upgradeCost()).toBe(121)
    expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0)

    // PowerA
    expect(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(14)
    expect(ygg[1].upgradeCost()).toBe(160)
    expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Adventure
    expect(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(14)
    expect(ygg[2].upgradeCost()).toBe(900)
    expect(Number(ygg[2].fruitYield(fruitYieldData).getValue())).toBe(77)

    // Knowledge
    expect(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(4)
    expect(ygg[3].upgradeCost()).toBe(360)
    expect(Number(ygg[3].fruitYield(fruitYieldData).getValue())).toBe(18)

    // Pomegranate
    expect(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(393)
    expect(ygg[4].upgradeCost()).toBe(4860)
    expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Luck
    expect(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(7)
    expect(ygg[5].upgradeCost()).toBe(1600)
    expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBe(0.25)
})















test('Yggdrasil for Mid Normal 2', () => {
    var playerData = toDataObj(midNormalTwo)
    var ygg = playerData['yggdrasil'][0]
    var blueHeart = (playerData['blueHeart^'][0] == 1)
    var seedModifier = bd(playerData['totalSeedGainBonus%'][0])
    var firstHarvest = playerData['firstHarvestPerk'][0]

    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        yieldModifier: bd(playerData['totalYggdrasilYieldBonus%'][0]),
        baseToughness: bd(playerData['baseAdventureToughness'][0]),
        expBonus: bd(playerData['totalExpBonus%'][0]),
        fokSucksPerk: playerData['fruitOfKnowledgeSucks^'][0] == 1,
        fokStillSucksPerk: playerData['fruitOfKnowledgeSTILLSucks^'][0] == 1,
        apBonus: bd(playerData['totalAPBonus%'][0]),
        ppBonus: bd(playerData['totalPPBonus%'][0]),
        qpRewardBonus: bd(playerData['totalQuestRewardBonus%'][0]),
        mayoSpeed: bd(playerData['totalMayoSpeed%'][0]),
    }
    // Seed calculations - Multiply by 1.3 since had already harvested apparently (Except gold/Pom)

    // Gold
    expect(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(3762)
    expect(ygg[0].upgradeCost()).toBe(0)
    expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0)

    // PowerA
    expect(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(383)
    expect(ygg[1].upgradeCost()).toBe(360)
    expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Adventure
    expect(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(192)
    expect(ygg[2].upgradeCost()).toBe(900)
    expect(Number(ygg[2].fruitYield(fruitYieldData).getValue())).toBe(449)

    // Knowledge
    expect(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(1005)
    expect(ygg[3].upgradeCost()).toBe(6760)
    expect(Number(ygg[3].fruitYield(fruitYieldData).getValue())).toBe(2039)

    // Pomegranate
    expect(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(28210)
    expect(ygg[4].upgradeCost()).toBe(0)
    expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Luck
    expect(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(96)
    expect(ygg[5].upgradeCost()).toBe(1600)
    expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBe(1.05)

    // PowerB
    expect(Number(ygg[6].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(48)
    expect(ygg[6].upgradeCost()).toBe(1350)
    expect(Number(ygg[6].fruitYield(fruitYieldData).getValue())).toBeCloseTo(1224.75) 

    // Arbitrariness
    expect(Number(ygg[7].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(144)
    expect(ygg[7].upgradeCost()).toBe(1530)
    expect(Number(ygg[7].fruitYield(fruitYieldData).getValue())).toBe(91)
})






test('Yggdrasil for Late Normal', () => {
    var playerData = toDataObj(lateNormal)
    var ygg = playerData['yggdrasil'][0]
    var blueHeart = (playerData['blueHeart^'][0] == 1)
    var seedModifier = bd(playerData['totalSeedGainBonus%'][0])
    var firstHarvest = playerData['firstHarvestPerk'][0]

    var data = {
        'energyNGUs' : [defaultPlayerData(lateNormal, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(lateNormal, 'magicNGUs')],
    }
    var nguYgg = nguInfo(data, Stat.YGGDRASIL_YIELD)

    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        yieldModifier: bd(playerData['totalYggdrasilYieldBonus%'][0]),
        noNGUYieldModifier: bd(playerData['totalYggdrasilYieldBonus%'][0]).divide(nguYgg).multiply(bd(100)),
        baseToughness: bd(playerData['baseAdventureToughness'][0]),
        expBonus: bd(playerData['totalExpBonus%'][0]),
        fokSucksPerk: playerData['fruitOfKnowledgeSucks^'][0] == 1,
        fokStillSucksPerk: playerData['fruitOfKnowledgeSTILLSucks^'][0] == 1,
        apBonus: bd(playerData['totalAPBonus%'][0]),
        ppBonus: bd(playerData['totalPPBonus%'][0]),
        qpRewardBonus: bd(playerData['totalQuestRewardBonus%'][0]),
        mayoSpeed: bd(playerData['totalMayoSpeed%'][0]),
    }
    // Seed calculations - Multiply by 1.3 since had already harvested apparently (Except gold/Pom)

    // Gold
    expect(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(32781)
    expect(ygg[0].upgradeCost()).toBe(0)
    expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0)

    // PowerA
    expect(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(32781)
    expect(ygg[1].upgradeCost()).toBe(0)
    expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Adventure
    expect(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(16391)
    expect(ygg[2].upgradeCost()).toBe(0)
    expect(Number(ygg[2].fruitYield(fruitYieldData).getValue())).toBe(44139)

    // Knowledge
    expect(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(27044)
    expect(ygg[3].upgradeCost()).toBe(0)
    expect(Number(ygg[3].fruitYield(fruitYieldData).getValue())).toBe(4323912)

    // Pomegranate
    expect(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(270436)
    expect(ygg[4].upgradeCost()).toBe(0)
    expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Luck
    expect(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(27044)
    expect(ygg[5].upgradeCost()).toBe(0)
    expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBeCloseTo(189.35)

    // PowerB
    expect(Number(ygg[6].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(16391)
    expect(ygg[6].upgradeCost()).toBe(0)
    expect(Number(ygg[6].fruitYield(fruitYieldData).getValue())).toBeCloseTo(3027008.85) 

    // Arbitrariness
    expect(Number(ygg[7].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(81131)
    expect(ygg[7].upgradeCost()).toBe(0)
    expect(Number(ygg[7].fruitYield(fruitYieldData).getValue())).toBe(7612)

    // Numbers
    expect(Number(ygg[8].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(22085)
    expect(ygg[8].upgradeCost()).toBe(45000)
    expect(Number(ygg[8].fruitYield(fruitYieldData).getValue())).toBeCloseTo(4810.22)

    // Rage
    // 1st Harvest doesn't count - So file will show  / 1.5
    expect(Number(ygg[9].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(42399)
    expect(ygg[9].upgradeCost()).toBe(288000)
    expect(Number(ygg[9].fruitYield(fruitYieldData).getValue())).toBe(19152704)
})
