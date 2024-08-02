import { toDataObj } from '@/__tests__/testHelperFunctions'
import { bd } from '@/helpers/numbers';
import {defaultPlayerData} from '@/helpers/defaultPlayerData'
import {nguInfo} from '@/helpers/resourceInfo'
import {Stat} from '@/assets/stat';
import  { fruitInfoRows } from '@/app/ygg/page';
import {expectClose} from '@/__tests__/testHelperFunctions';

import earlyNormalTwo from '@/__tests__/__data__/earlyNormal2';
import midNormal from '@/__tests__/__data__/midNormal1';
import midNormalTwo from '@/__tests__/__data__/midNormal2';
import lateNormal from '@/__tests__/__data__/lateNormal';
import renderer from 'react-test-renderer';
import earlyEvil from '../../__data__/earlyEvil1';
import earlyEvilTwo from '@/__tests__/__data__/earlyEvil2';
import midEvil from '@/__tests__/__data__/midEvil1';


test('Yggdrasil for Early Normal 2', () => {
    var playerData = toDataObj(earlyNormalTwo)
    var ygg = playerData['yggdrasil'][0]
    var blueHeart = (playerData['blueHeart^'][0] == 1)
    var seedModifier = bd(playerData['totalSeedGainBonus%'][0])
    var firstHarvest = playerData['firstHarvestPerk'][0]

    var data = {
        'energyNGUs' : [defaultPlayerData(lateNormal, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(lateNormal, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(lateNormal, 'gameMode')],
    }

    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        totalSeedGainBonus: seedModifier,
        yieldModifier: bd(playerData['totalYggdrasilYieldBonus%'][0]),
        nguYgg: nguInfo(data, Stat.YGGDRASIL_YIELD),
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

    var fruitInfo = fruitInfoRows(ygg, fruitYieldData)
    const fruitInfoSnap = renderer.create(<table><tbody>{fruitInfo}</tbody></table>).toJSON();
    expect(fruitInfoSnap).toMatchSnapshot();
});













test('Yggdrasil for Mid Normal 1', () => {
    var playerData = toDataObj(midNormal)
    var ygg = playerData['yggdrasil'][0]
    var blueHeart = (playerData['blueHeart^'][0] == 1)
    var seedModifier = bd(playerData['totalSeedGainBonus%'][0])
    var firstHarvest = playerData['firstHarvestPerk'][0]

    var data = {
        'energyNGUs' : [defaultPlayerData(lateNormal, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(lateNormal, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(lateNormal, 'gameMode')],
    }

    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        totalSeedGainBonus: seedModifier,
        yieldModifier: bd(playerData['totalYggdrasilYieldBonus%'][0]),
        nguYgg: nguInfo(data, Stat.YGGDRASIL_YIELD),
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

    
    var fruitInfo = fruitInfoRows(ygg, fruitYieldData)
    const fruitInfoSnap = renderer.create(<table><tbody>{fruitInfo}</tbody></table>).toJSON();
    expect(fruitInfoSnap).toMatchSnapshot();
})















test('Yggdrasil for Mid Normal 2', () => {
    var playerData = toDataObj(midNormalTwo)
    var ygg = playerData['yggdrasil'][0]
    var blueHeart = (playerData['blueHeart^'][0] == 1)
    var seedModifier = bd(playerData['totalSeedGainBonus%'][0])
    var firstHarvest = playerData['firstHarvestPerk'][0]

    var data = {
        'energyNGUs' : [defaultPlayerData(lateNormal, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(lateNormal, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(lateNormal, 'gameMode')],
    }

    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        totalSeedGainBonus: seedModifier,
        yieldModifier: bd(playerData['totalYggdrasilYieldBonus%'][0]),
        nguYgg: nguInfo(data, Stat.YGGDRASIL_YIELD),
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

    var fruitInfo = fruitInfoRows(ygg, fruitYieldData)
    const fruitInfoSnap = renderer.create(<table><tbody>{fruitInfo}</tbody></table>).toJSON();
    expect(fruitInfoSnap).toMatchSnapshot();
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
        'gameMode' : [defaultPlayerData(lateNormal, 'gameMode')],
    }

    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        totalSeedGainBonus: seedModifier,
        yieldModifier: bd(playerData['totalYggdrasilYieldBonus%'][0]),
        nguYgg: nguInfo(data, Stat.YGGDRASIL_YIELD),
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


    var fruitInfo = fruitInfoRows(ygg, fruitYieldData)
    const fruitInfoSnap = renderer.create(<table><tbody>{fruitInfo}</tbody></table>).toJSON();
    expect(fruitInfoSnap).toMatchSnapshot();
})




test('Yggdrasil for Early Evil 1', () => {
    var playerData = toDataObj(earlyEvil)
    var ygg = playerData['yggdrasil'][0]
    var blueHeart = (playerData['blueHeart^'][0] == 1)
    var seedModifier = bd(playerData['totalSeedGainBonus%'][0])
    var firstHarvest = playerData['firstHarvestPerk'][0]

    var data = {
        'energyNGUs' : [defaultPlayerData(earlyEvil, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(earlyEvil, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(earlyEvil, 'gameMode')],
    }

    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        totalSeedGainBonus: seedModifier,
        yieldModifier: bd(playerData['totalYggdrasilYieldBonus%'][0]),
        nguYgg: nguInfo(data, Stat.YGGDRASIL_YIELD),
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
    expect(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(53161)
    expect(ygg[0].upgradeCost()).toBe(0)
    expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0)

    // PowerA
    expect(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(53161)
    expect(ygg[1].upgradeCost()).toBe(0)
    expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Adventure
    expect(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(43858)
    expect(ygg[2].upgradeCost()).toBe(0)
    var ec = expectClose(Number(ygg[2].fruitYield(fruitYieldData).getValue()), 164887, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)

    // Knowledge
    expect(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(43858)
    expect(ygg[3].upgradeCost()).toBe(0)
    expect(Number(ygg[3].fruitYield(fruitYieldData).getValue())).toBe(6896252)

    // Pomegranate
    var ec = expectClose(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 438577, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[4].upgradeCost()).toBe(0)
    expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Luck
    expect(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(43858)
    expect(ygg[5].upgradeCost()).toBe(0)
    expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBeCloseTo(307.05)

    // PowerB
    expect(Number(ygg[6].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(26581)
    expect(ygg[6].upgradeCost()).toBe(0)
    expect(Number(ygg[6].fruitYield(fruitYieldData).getValue())).toBeCloseTo(53805115.65) 

    // Arbitrariness
    var ec = expectClose(Number(ygg[7].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 131574, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[7].upgradeCost()).toBe(0)
    expect(Number(ygg[7].fruitYield(fruitYieldData).getValue())).toBe(8130)

    // Numbers
    expect(Number(ygg[8].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(79741)
    expect(ygg[8].upgradeCost()).toBe(0)
    expect(Number(ygg[8].fruitYield(fruitYieldData).getValue())).toBeCloseTo(44938.24)

    // Rage
    expect(Number(ygg[9].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(219287)
    expect(ygg[9].upgradeCost()).toBe(0)
    var ec = expectClose(Number(ygg[9].fruitYield(fruitYieldData).getValue()), 260370256, 4)
    expect(ec[0]).toBeCloseTo(ec[1], 0)

    // Macguffin A
    expect(Number(ygg[10].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(56765)
    expect(ygg[10].upgradeCost()).toBe(2.535e6)
    expect(Number(ygg[10].fruitYield(fruitYieldData).getValue())).toBe(32)

    // PowerD
    expect(Number(ygg[11].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(9461)
    expect(ygg[11].upgradeCost()).toBe(480000)
    expect(Number(ygg[11].fruitYield(fruitYieldData).getValue())).toBeCloseTo(6.86)

    // Watermelon
    expect(Number(ygg[12].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(364915)
    expect(ygg[12].upgradeCost()).toBe(5e6)
    expect(Number(ygg[12].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Macguffin B
    expect(Number(ygg[13].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(5407)
    expect(ygg[13].upgradeCost()).toBe(900000)
    expect(Number(ygg[13].fruitYield(fruitYieldData).getValue())).toBe(1)


    // var fruitInfo = fruitInfoRows(ygg, fruitYieldData)
    // const fruitInfoSnap = renderer.create(<table><tbody>{fruitInfo}</tbody></table>).toJSON();
    // expect(fruitInfoSnap).toMatchSnapshot();
})



test('Yggdrasil for Early Evil 2', () => {
    var playerData = toDataObj(earlyEvilTwo)
    var ygg = playerData['yggdrasil'][0]
    var blueHeart = (playerData['blueHeart^'][0] == 1)
    var seedModifier = bd(playerData['totalSeedGainBonus%'][0])
    var firstHarvest = playerData['firstHarvestPerk'][0]

    var data = {
        'energyNGUs' : [defaultPlayerData(earlyEvilTwo, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(earlyEvilTwo, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(earlyEvilTwo, 'gameMode')],
    }

    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        totalSeedGainBonus: seedModifier,
        yieldModifier: bd(playerData['totalYggdrasilYieldBonus%'][0]),
        nguYgg: nguInfo(data, Stat.YGGDRASIL_YIELD),
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
    var ec = expectClose(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 108876, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[0].upgradeCost()).toBe(0)
    expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0)

    // PowerA
    var ec = expectClose(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 108876, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[1].upgradeCost()).toBe(0)
    expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Adventure
    var ec = expectClose(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 54438, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[2].upgradeCost()).toBe(0)
    var ec = expectClose(Number(ygg[2].fruitYield(fruitYieldData).getValue()), 155773, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)

    // Knowledge
    var ec = expectClose(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 89823, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[3].upgradeCost()).toBe(0)
    expect(Number(ygg[3].fruitYield(fruitYieldData).getValue())).toBe(12531734)

    // Pomegranate
    var ec = expectClose(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 544380, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[4].upgradeCost()).toBe(0)
    expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Luck
    var ec = expectClose(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 89823, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[5].upgradeCost()).toBe(0)
    expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBeCloseTo(405.7, 1)

    // PowerB
    var ec = expectClose(Number(ygg[6].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 54438, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[6].upgradeCost()).toBe(0)
    expect(Number(ygg[6].fruitYield(fruitYieldData).getValue())).toBeCloseTo(155526123.75) 

    // Arbitrariness
    var ec = expectClose(Number(ygg[7].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 269468, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[7].upgradeCost()).toBe(0)
    expect(Number(ygg[7].fruitYield(fruitYieldData).getValue())).toBe(8209)

    // Numbers
    var ec = expectClose(Number(ygg[8].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 163314, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[8].upgradeCost()).toBe(0)
    expect(Number(ygg[8].fruitYield(fruitYieldData).getValue())).toBeCloseTo(78548.35)

    // Rage
    var ec = expectClose(Number(ygg[9].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 449113, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[9].upgradeCost()).toBe(0)
    var ec = expectClose(Number(ygg[9].fruitYield(fruitYieldData).getValue()), 438570688, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)

    // Macguffin A
    var ec = expectClose(Number(ygg[10].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 116258, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[10].upgradeCost()).toBe(2.535e6)
    expect(Number(ygg[10].fruitYield(fruitYieldData).getValue())).toBe(32)

    // PowerD
    var ec = expectClose(Number(ygg[11].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 19377, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[11].upgradeCost()).toBe(480000)
    expect(Number(ygg[11].fruitYield(fruitYieldData).getValue())).toBeCloseTo(11.94)

    // Watermelon
    var ec = expectClose(Number(ygg[12].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 3516781, 3)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[12].upgradeCost()).toBe(1.805e7)
    expect(Number(ygg[12].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Macguffin B
    var ec = expectClose(Number(ygg[13].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 22145, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[13].upgradeCost()).toBe(1.6e6)
    expect(Number(ygg[13].fruitYield(fruitYieldData).getValue())).toBe(1)

    // Quirks
    var ec = expectClose(Number(ygg[14].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 37300, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[14].upgradeCost()).toBe(1.6e6)
    expect(Number(ygg[14].fruitYield(fruitYieldData).getValue())).toBe(85)

    // var fruitInfo = fruitInfoRows(ygg, fruitYieldData)
    // const fruitInfoSnap = renderer.create(<table><tbody>{fruitInfo}</tbody></table>).toJSON();
    // expect(fruitInfoSnap).toMatchSnapshot();
})


test('Yggdrasil for Mid Evil 1', () => {
    var playerData = toDataObj(midEvil)
    var ygg = playerData['yggdrasil'][0]
    var blueHeart = (playerData['blueHeart^'][0] == 1)
    var seedModifier = bd(playerData['totalSeedGainBonus%'][0])
    var firstHarvest = playerData['firstHarvestPerk'][0]

    var data = {
        'energyNGUs' : [defaultPlayerData(midEvil, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(midEvil, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(midEvil, 'gameMode')],
    }

    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        totalSeedGainBonus: seedModifier,
        yieldModifier: bd(playerData['totalYggdrasilYieldBonus%'][0]),
        nguYgg: nguInfo(data, Stat.YGGDRASIL_YIELD),
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
    var ec = expectClose(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 38264, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[0].upgradeCost()).toBe(0)
    // expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0)

    // PowerA
    var ec = expectClose(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 76528, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[1].upgradeCost()).toBe(0)
    expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Adventure
    var ec = expectClose(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 63136, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[2].upgradeCost()).toBe(0)
    var ec = expectClose(Number(ygg[2].fruitYield(fruitYieldData).getValue()), 403930, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)

    // Knowledge
    var ec = expectClose(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 63136, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[3].upgradeCost()).toBe(0)
    expect(Number(ygg[3].fruitYield(fruitYieldData).getValue())).toBe(22127056)

    // Pomegranate
    var ec = expectClose(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 631352, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[4].upgradeCost()).toBe(0)
    expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Luck
    var ec = expectClose(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 63136, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[5].upgradeCost()).toBe(0)
    expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBeCloseTo(491.1, 0)

    // PowerB
    var ec = expectClose(Number(ygg[6].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 38264, 1)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[6].upgradeCost()).toBe(0)
    var ec = expectClose(Number(ygg[6].fruitYield(fruitYieldData).getValue()), 376659168, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)

    // Arbitrariness
    var ec = expectClose(Number(ygg[7].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 189406, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[7].upgradeCost()).toBe(0)
    expect(Number(ygg[7].fruitYield(fruitYieldData).getValue())).toBe(8373)

    // Numbers
    var ec = expectClose(Number(ygg[8].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 114792, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[8].upgradeCost()).toBe(0)
    var ec = expectClose(Number(ygg[8].fruitYield(fruitYieldData).getValue()), 115530.04, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)

    // Rage
    var ec = expectClose(Number(ygg[9].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 315676, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[9].upgradeCost()).toBe(0)
    var ec = expectClose(Number(ygg[9].fruitYield(fruitYieldData).getValue()), 680726272, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)

    // Macguffin A
    var ec = expectClose(Number(ygg[10].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 378812, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[10].upgradeCost()).toBe(0)
    expect(Number(ygg[10].fruitYield(fruitYieldData).getValue())).toBe(147)

    // PowerD
    var ec = expectClose(Number(ygg[11].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 34049, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[11].upgradeCost()).toBe(1.47e6)
    expect(Number(ygg[11].fruitYield(fruitYieldData).getValue())).toBeCloseTo(47.43)

    // Watermelon
    var ec = expectClose(Number(ygg[12].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 3788111, 3)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[12].upgradeCost()).toBe(0)
    expect(Number(ygg[12].fruitYield(fruitYieldData).getValue())).toBe(0)

    // Macguffin B
    var ec = expectClose(Number(ygg[13].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 51365, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[13].upgradeCost()).toBe(3.6e6)
    expect(Number(ygg[13].fruitYield(fruitYieldData).getValue())).toBe(3)

    // Quirks
    var ec = expectClose(Number(ygg[14].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 89888, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    expect(ygg[14].upgradeCost()).toBe(0)
    expect(Number(ygg[14].fruitYield(fruitYieldData).getValue())).toBe(375)

    // var fruitInfo = fruitInfoRows(ygg, fruitYieldData)
    // const fruitInfoSnap = renderer.create(<table><tbody>{fruitInfo}</tbody></table>).toJSON();
    // expect(fruitInfoSnap).toMatchSnapshot();
})
