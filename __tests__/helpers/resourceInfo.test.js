import {achievementAPBonus, advTrainingInfo, apItemInfo, beardInfoTemp, beardInfoPerm, challengeInfo, diggerInfo, equipmentInfo, macguffinInfo, nguInfo, perkInfo, quirkInfo, isMaxxedItem, isMaxxedItemSet} from '../../src/helpers/resourceInfo'
import {defaultPlayerData} from '../../src/helpers/defaultPlayerData'
import {Stat} from '../../src/assets/stat';
import { ItemSets } from '../../src/assets/sets';
import { expectClose } from '../testHelperFunctions';

import earlyNormal from '../__data__/earlyNormal1';
import earlyNormalTwo from '../__data__/earlyNormal2';
import midNormal from '../__data__/midNormal1';
import midNormalTwo from '../__data__/midNormal2';
import lateNormal from '../__data__/lateNormal';
import earlyEvil from '../__data__/earlyEvil1';
import evilReturnToNormal from '../__data__/evilReturnToNormal';
import earlyEvilTwo from '../__data__/earlyEvil2';
import midEvil from '../__data__/midEvil1';




test('Achievement info - Early Normal', () => {
    var data = {'achievements' : [defaultPlayerData(earlyNormal, 'achievements')]}
    expect(achievementAPBonus(data).getValue()).toBe('102.35')
});

test('Advanced Training info - Early Normal', () => {
    var data = { 'advTrainings' : [defaultPlayerData(earlyNormal, 'advTrainings')]}
    var val = Number(advTrainingInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(110, 0)
    var val = Number(advTrainingInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('AP - Early Normal', () => {
    var data = { 'apItems' : [defaultPlayerData(earlyNormal, 'apItems')]}
    var val = Number(apItemInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Temp - Early Normal', () => {
    var data = { 'beards' : [defaultPlayerData(earlyNormal, 'beards')]}
    var val = Number(beardInfoTemp(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(beardInfoTemp(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Perm - Early Normal', () => {
    var data = { 'beards' : [defaultPlayerData(earlyNormal, 'beards')]}
    var val = Number(beardInfoPerm(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(beardInfoPerm(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Challenges - Early Normal', () => {
    var data = { 'challenges' : [defaultPlayerData(earlyNormal, 'challenges')]}
    var val = Number(challengeInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(challengeInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Digger - Early Normal', () => {
    var data = {
        'diggers' : [defaultPlayerData(earlyNormal, 'diggers')],
        'challenges' : [defaultPlayerData(earlyNormal, 'challenges')],
        'itemSets' : [defaultPlayerData(earlyNormal, 'itemSets')],
    }
    var val = Number(diggerInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Equipment - Early Normal', () => {
    var data = {
        'equipmentHead' : [defaultPlayerData(earlyNormal, 'equipmentHead')],
        'equipmentChest' : [defaultPlayerData(earlyNormal, 'equipmentChest')],
        'equipmentLegs' : [defaultPlayerData(earlyNormal, 'equipmentLegs')],
        'equipmentBoots' : [defaultPlayerData(earlyNormal, 'equipmentBoots')],
        'equipmentWeapon' : [defaultPlayerData(earlyNormal, 'equipmentWeapon')],
        'equipmentAccesories' : [defaultPlayerData(earlyNormal, 'equipmentAccesories')],
        'cubePower' : [defaultPlayerData(earlyNormal, 'cubePower')],
        'cubeToughness' : [defaultPlayerData(earlyNormal, 'cubeToughness')],
        'baseAdventurePower' : [defaultPlayerData(earlyNormal, 'baseAdventurePower')],
        'baseAdventureToughness' : [defaultPlayerData(earlyNormal, 'baseAdventureToughness')],
    }
    var val = Number(equipmentInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(435, 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(160, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_CAP).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(equipmentInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(104, 0)
    var val = Number(equipmentInfo(data, Stat.RESPAWN).getValue())
    expect(val).toBeCloseTo(100, 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_WANDOOS_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('MacGuffin - Early Normal', () => {
    var data = {
        'macguffins' : [defaultPlayerData(earlyNormal, 'macguffins')],
    }
    var val = Number(macguffinInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(macguffinInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(macguffinInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(macguffinInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('NGU - Early Normal', () => {
    var data = {
        'energyNGUs' : [defaultPlayerData(earlyNormal, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(earlyNormal, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(earlyNormal, 'gameMode')],
    }
    var val = Number(nguInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(nguInfo(data, Stat.YGGDRASIL_YIELD).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(nguInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(nguInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(nguInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Perks - Early Normal', () => {
    var data = {
        'perks' : [defaultPlayerData(earlyNormal, 'perks')],
        'gameMode' : [defaultPlayerData(earlyNormal, 'gameMode')],
    }
    var val = Number(perkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(110, 0)
    var val = Number(perkInfo(data, Stat.BOOSTS_BOOST).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(perkInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Quirks - Early Normal', () => {
    var data = {
        'quirks' : [defaultPlayerData(earlyNormal, 'quirks')],
        'gameMode' : [defaultPlayerData(earlyNormal, 'gameMode')],
    }
    var val = Number(quirkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(quirkInfo(data, Stat.ENERGY_CAP).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(quirkInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('Maxxed Items/Sets - Early Normal', () => {
    var data = {
        'itemSets' : [defaultPlayerData(earlyNormal, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(earlyNormal, 'maxxedItems')],
    }
    expect(isMaxxedItem(data, 1)).toBeTruthy()
    expect(isMaxxedItem(data, 3)).toBeFalsy()
    expect(isMaxxedItem(data, 44)).toBeTruthy()
    expect(isMaxxedItem(data, 76)).toBeFalsy()
    expect(isMaxxedItem(data, 51)).toBeTruthy()
    expect(isMaxxedItem(data, 100)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.CAVE)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeFalsy()
});





































test('Achievement info - Early Normal 2', () => {
    var data = {'achievements' : [defaultPlayerData(earlyNormalTwo, 'achievements')]}
    expect(achievementAPBonus(data).getValue()).toBe('106.45')
});

test('Advanced Training info - Early Normal 2', () => {
    var data = { 'advTrainings' : [defaultPlayerData(earlyNormalTwo, 'advTrainings')]}
    var val = Number(advTrainingInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(301.3, 0)
    var val = Number(advTrainingInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('AP - Early Normal 2', () => {
    var data = { 'apItems' : [defaultPlayerData(earlyNormalTwo, 'apItems')]}
    var val = Number(apItemInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Temp - Early Normal 2', () => {
    var data = { 'beards' : [defaultPlayerData(earlyNormalTwo, 'beards')]}
    var val = Number(beardInfoTemp(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(beardInfoTemp(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Perm - Early Normal 2', () => {
    var data = { 'beards' : [defaultPlayerData(earlyNormalTwo, 'beards')]}
    var val = Number(beardInfoPerm(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(beardInfoPerm(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Challenges - Early Normal 2', () => {
    var data = { 'challenges' : [defaultPlayerData(earlyNormalTwo, 'challenges')]}
    var val = Number(challengeInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(challengeInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Digger - Early Normal 2', () => {
    var data = {
        'diggers' : [defaultPlayerData(earlyNormalTwo, 'diggers')],
        'challenges' : [defaultPlayerData(earlyNormalTwo, 'challenges')],
        'itemSets' : [defaultPlayerData(earlyNormalTwo, 'itemSets')],
    }
    var val = Number(diggerInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Equipment - Early Normal 2', () => {
    var data = {
        'equipmentHead' : [defaultPlayerData(earlyNormalTwo, 'equipmentHead')],
        'equipmentChest' : [defaultPlayerData(earlyNormalTwo, 'equipmentChest')],
        'equipmentLegs' : [defaultPlayerData(earlyNormalTwo, 'equipmentLegs')],
        'equipmentBoots' : [defaultPlayerData(earlyNormalTwo, 'equipmentBoots')],
        'equipmentWeapon' : [defaultPlayerData(earlyNormalTwo, 'equipmentWeapon')],
        'equipmentAccesories' : [defaultPlayerData(earlyNormalTwo, 'equipmentAccesories')],
        'cubePower' : [defaultPlayerData(earlyNormalTwo, 'cubePower')],
        'cubeToughness' : [defaultPlayerData(earlyNormalTwo, 'cubeToughness')],
        'baseAdventurePower' : [defaultPlayerData(earlyNormalTwo, 'baseAdventurePower')],
        'baseAdventureToughness' : [defaultPlayerData(earlyNormalTwo, 'baseAdventureToughness')],
    }
    var val = Number(equipmentInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(6736, 0)
    var val = Number(equipmentInfo(data, Stat.TOUGHNESS).getValue())
    expect(val).toBeCloseTo(5779, 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(511, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_CAP).getValue())
    expect(val).toBeCloseTo(110, 0)
    var val = Number(equipmentInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(140.8, 1)
    var val = Number(equipmentInfo(data, Stat.RESPAWN).getValue())
    expect(val).toBeCloseTo(100, 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_WANDOOS_SPEED).getValue())
    expect(val).toBeCloseTo(104, 0)
});


test('MacGuffin - Early Normal 2', () => {
    var data = {
        'macguffins' : [defaultPlayerData(earlyNormalTwo, 'macguffins')],
    }
    var val = Number(macguffinInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(macguffinInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(macguffinInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(macguffinInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('NGU - Early Normal 2', () => {
    var data = {
        'energyNGUs' : [defaultPlayerData(earlyNormalTwo, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(earlyNormalTwo, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(earlyNormalTwo, 'gameMode')],
    }
    var val = Number(nguInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(nguInfo(data, Stat.YGGDRASIL_YIELD).getValue())
    expect(val).toBeCloseTo(101.4, 0)
    var val = Number(nguInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(nguInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(915, 0)
    var val = Number(nguInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Perks - Early Normal 2', () => {
    var data = {
        'perks' : [defaultPlayerData(earlyNormalTwo, 'perks')],
        'gameMode' : [defaultPlayerData(earlyNormalTwo, 'gameMode')],
    }
    var val = Number(perkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(110, 0)
    var val = Number(perkInfo(data, Stat.BOOSTS_BOOST).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(perkInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(103, 0)
});

test('Quirks - Early Normal 2', () => {
    var data = {
        'quirks' : [defaultPlayerData(earlyNormalTwo, 'quirks')],
        'gameMode' : [defaultPlayerData(earlyNormalTwo, 'gameMode')],
    }
    var val = Number(quirkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(quirkInfo(data, Stat.ENERGY_CAP).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(quirkInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('Maxxed Items/Sets - Early Normal 2', () => {
    var data = {
        'itemSets' : [defaultPlayerData(earlyNormalTwo, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(earlyNormalTwo, 'maxxedItems')],
    }
    expect(isMaxxedItem(data, 1)).toBeTruthy()
    expect(isMaxxedItem(data, 5)).toBeFalsy()
    expect(isMaxxedItem(data, 44)).toBeTruthy()
    expect(isMaxxedItem(data, 76)).toBeFalsy()
    expect(isMaxxedItem(data, 89)).toBeTruthy()
    expect(isMaxxedItem(data, 110)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.NUMBER)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeFalsy()
});




































test('Achievement info - Mid Normal 1', () => {
    var data = {'achievements' : [defaultPlayerData(midNormal, 'achievements')]}
    expect(achievementAPBonus(data).getValue()).toBe('116.15')
});

test('Advanced Training info - Mid Normal 1', () => {
    var data = { 'advTrainings' : [defaultPlayerData(midNormal, 'advTrainings')]}
    var val = Number(advTrainingInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(113.2, 1)
    var val = Number(advTrainingInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('AP - Mid Normal 1', () => {
    var data = { 'apItems' : [defaultPlayerData(midNormal, 'apItems')]}
    var val = Number(apItemInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Temp - Mid Normal 1', () => {
    var data = { 'beards' : [defaultPlayerData(midNormal, 'beards')]}
    var val = Number(beardInfoTemp(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(beardInfoTemp(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Perm - Mid Normal 1', () => {
    var data = { 'beards' : [defaultPlayerData(midNormal, 'beards')]}
    var val = Number(beardInfoPerm(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(141, 0)
    var val = Number(beardInfoPerm(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(148, 0)
});

test('Challenges - Mid Normal 1', () => {
    var data = { 'challenges' : [defaultPlayerData(midNormal, 'challenges')]}
    var val = Number(challengeInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(135, 0)
    var val = Number(challengeInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Digger - Mid Normal 1', () => {
    var data = {
        'diggers' : [defaultPlayerData(midNormal, 'diggers')],
        'challenges' : [defaultPlayerData(midNormal, 'challenges')],
        'itemSets' : [defaultPlayerData(midNormal, 'itemSets')],
    }
    var val = Number(diggerInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Equipment - Mid Normal 1', () => {
    var data = {
        'equipmentHead' : [defaultPlayerData(midNormal, 'equipmentHead')],
        'equipmentChest' : [defaultPlayerData(midNormal, 'equipmentChest')],
        'equipmentLegs' : [defaultPlayerData(midNormal, 'equipmentLegs')],
        'equipmentBoots' : [defaultPlayerData(midNormal, 'equipmentBoots')],
        'equipmentWeapon' : [defaultPlayerData(midNormal, 'equipmentWeapon')],
        'equipmentAccesories' : [defaultPlayerData(midNormal, 'equipmentAccesories')],
        'cubePower' : [defaultPlayerData(midNormal, 'cubePower')],
        'cubeToughness' : [defaultPlayerData(midNormal, 'cubeToughness')],
        'baseAdventurePower' : [defaultPlayerData(midNormal, 'baseAdventurePower')],
        'baseAdventureToughness' : [defaultPlayerData(midNormal, 'baseAdventureToughness')],
    }
    var val = Number(equipmentInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(198896, 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(3112.5, 1)
    var val = Number(equipmentInfo(data, Stat.MAGIC_CAP).getValue())
    expect(val).toBeCloseTo(482, 0)
    var val = Number(equipmentInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(290, 0)
    var val = Number(equipmentInfo(data, Stat.RESPAWN).getValue())
    expect(val).toBeCloseTo(116, 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_WANDOOS_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('MacGuffin - Mid Normal 1', () => {
    var data = {
        'macguffins' : [defaultPlayerData(midNormal, 'macguffins')],
    }
    var val = Number(macguffinInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(macguffinInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(macguffinInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(macguffinInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('NGU - Mid Normal 1', () => {
    var data = {
        'energyNGUs' : [defaultPlayerData(midNormal, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(midNormal, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(midNormal, 'gameMode')],
    }
    var val = Number(nguInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(300, 0)
    var val = Number(nguInfo(data, Stat.YGGDRASIL_YIELD).getValue())
    expect(val).toBeCloseTo(113.8, 1)
    var val = Number(nguInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(123.3, 1)
    var val = Number(nguInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(2780, 0)
    var val = Number(nguInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Perks - Mid Normal 1', () => {
    var data = {
        'perks' : [defaultPlayerData(midNormal, 'perks')],
        'gameMode' : [defaultPlayerData(midNormal, 'gameMode')],
    }
    var val = Number(perkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(110, 0)
    var val = Number(perkInfo(data, Stat.BOOSTS_BOOST).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(perkInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(106, 0)
});

test('Quirks - Mid Normal 1', () => {
    var data = {
        'quirks' : [defaultPlayerData(midNormal, 'quirks')],
        'gameMode' : [defaultPlayerData(midNormal, 'gameMode')],
    }
    var val = Number(quirkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(quirkInfo(data, Stat.ENERGY_CAP).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(quirkInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('Maxxed Items/Sets - Mid Normal 1', () => {
    var data = {
        'itemSets' : [defaultPlayerData(midNormal, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(midNormal, 'maxxedItems')],
    }
    expect(isMaxxedItem(data, 1)).toBeTruthy()
    expect(isMaxxedItem(data, 8)).toBeFalsy()
    expect(isMaxxedItem(data, 44)).toBeTruthy()
    expect(isMaxxedItem(data, 89)).toBeTruthy()
    expect(isMaxxedItem(data, 110)).toBeFalsy()
    expect(isMaxxedItem(data, 460)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.NUMBER)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeFalsy()
});
































test('Achievement info - Mid Normal 2', () => {
    var data = {'achievements' : [defaultPlayerData(midNormalTwo, 'achievements')]}
    expect(achievementAPBonus(data).getValue()).toBe('129.55')
});

test('Advanced Training info - Mid Normal 2', () => {
    var data = { 'advTrainings' : [defaultPlayerData(midNormalTwo, 'advTrainings')]}
    var val = Number(advTrainingInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(793.15, 1)
    var val = Number(advTrainingInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('AP - Mid Normal 2', () => {
    var data = { 'apItems' : [defaultPlayerData(midNormalTwo, 'apItems')]}
    var val = Number(apItemInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Temp - Mid Normal 2', () => {
    var data = { 'beards' : [defaultPlayerData(midNormalTwo, 'beards')]}
    var val = Number(beardInfoTemp(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 1)
    var val = Number(beardInfoTemp(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 1)
});

test('Beard Perm - Mid Normal 2', () => {
    var data = { 'beards' : [defaultPlayerData(midNormalTwo, 'beards')]}
    var val = Number(beardInfoPerm(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(199, 0)
    var val = Number(beardInfoPerm(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(192, 0)
});

test('Challenges - Mid Normal 2', () => {
    var data = { 'challenges' : [defaultPlayerData(midNormalTwo, 'challenges')]}
    var val = Number(challengeInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(135, 0)
    var val = Number(challengeInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(135, 0)
});

test('Digger - Mid Normal 2', () => {
    var data = {
        'diggers' : [defaultPlayerData(midNormalTwo, 'diggers')],
        'challenges' : [defaultPlayerData(midNormalTwo, 'challenges')],
        'itemSets' : [defaultPlayerData(midNormalTwo, 'itemSets')],
    }
    var val = Number(diggerInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Equipment - Mid Normal 2', () => {
    var data = {
        'equipmentHead' : [defaultPlayerData(midNormalTwo, 'equipmentHead')],
        'equipmentChest' : [defaultPlayerData(midNormalTwo, 'equipmentChest')],
        'equipmentLegs' : [defaultPlayerData(midNormalTwo, 'equipmentLegs')],
        'equipmentBoots' : [defaultPlayerData(midNormalTwo, 'equipmentBoots')],
        'equipmentWeapon' : [defaultPlayerData(midNormalTwo, 'equipmentWeapon')],
        'equipmentAccesories' : [defaultPlayerData(midNormalTwo, 'equipmentAccesories')],
        'cubePower' : [defaultPlayerData(midNormalTwo, 'cubePower')],
        'cubeToughness' : [defaultPlayerData(midNormalTwo, 'cubeToughness')],
        'baseAdventurePower' : [defaultPlayerData(midNormalTwo, 'baseAdventurePower')],
        'baseAdventureToughness' : [defaultPlayerData(midNormalTwo, 'baseAdventureToughness')],
    }
    // Cube may be wrong due to offline increases
    var val = Number(equipmentInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(1450789, 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(8708, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_CAP).getValue())
    expect(val).toBeCloseTo(868, 0)
    var val = Number(equipmentInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(330, 0)
    var val = Number(equipmentInfo(data, Stat.RESPAWN).getValue())
    expect(val).toBeCloseTo(116, 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(704.5, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_WANDOOS_SPEED).getValue())
    expect(val).toBeCloseTo(607.6, 0)
});


test('MacGuffin - Mid Normal 2', () => {
    var data = {
        'macguffins' : [defaultPlayerData(midNormalTwo, 'macguffins')],
    }
    var val = Number(macguffinInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(macguffinInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(macguffinInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(101.141, 3)
    var val = Number(macguffinInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('NGU - Mid Normal 2', () => {
    var data = {
        'energyNGUs' : [defaultPlayerData(midNormalTwo, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(midNormalTwo, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(midNormalTwo, 'gameMode')],
    }
    var val = Number(nguInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(2746, 0)
    var val = Number(nguInfo(data, Stat.YGGDRASIL_YIELD).getValue())
    expect(val).toBeCloseTo(377.22, 1)
    var val = Number(nguInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(1019.92, 1)
    var val = Number(nguInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(750500, 0)
    var val = Number(nguInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(105, 0)
});

test('Perks - Mid Normal 2', () => {
    var data = {
        'perks' : [defaultPlayerData(midNormalTwo, 'perks')],
        'gameMode' : [defaultPlayerData(midNormalTwo, 'gameMode')],
    }
    var val = Number(perkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(110, 0)
    var val = Number(perkInfo(data, Stat.BOOSTS_BOOST).getValue())
    expect(val).toBeCloseTo(245, 0)
    var val = Number(perkInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(150, 0)
});

test('Quirks - Mid Normal 2', () => {
    var data = {
        'quirks' : [defaultPlayerData(midNormalTwo, 'quirks')],
        'gameMode' : [defaultPlayerData(midNormalTwo, 'gameMode')],
    }
    var val = Number(quirkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(125, 0)
    var val = Number(quirkInfo(data, Stat.ENERGY_CAP).getValue())
    expect(val).toBeCloseTo(110, 0)
    var val = Number(quirkInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('Maxxed Items/Sets - Mid Normal 2', () => {
    var data = {
        'itemSets' : [defaultPlayerData(midNormalTwo, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(midNormalTwo, 'maxxedItems')],
    }
    expect(isMaxxedItem(data, 1)).toBeTruthy()
    expect(isMaxxedItem(data, 44)).toBeTruthy()
    expect(isMaxxedItem(data, 89)).toBeTruthy()
    expect(isMaxxedItem(data, 110)).toBeFalsy()
    expect(isMaxxedItem(data, 460)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.EDGY)).toBeFalsy()
});


































test('Achievement info - Late Normal', () => {
    var data = {'achievements' : [defaultPlayerData(lateNormal, 'achievements')]}
    expect(achievementAPBonus(data).getValue()).toBe('144.8')
});

test('Advanced Training info - Late Normal', () => {
    var data = { 'advTrainings' : [defaultPlayerData(lateNormal, 'advTrainings')]}
    var val = Number(advTrainingInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(1670.14, 1)
    var val = Number(advTrainingInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('AP - Late Normal', () => {
    var data = { 'apItems' : [defaultPlayerData(lateNormal, 'apItems')]}
    var val = Number(apItemInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Temp - Late Normal', () => {
    var data = { 'beards' : [defaultPlayerData(lateNormal, 'beards')]}
    var val = Number(beardInfoTemp(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 1)
    var val = Number(beardInfoTemp(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 1)
});

test('Beard Perm - Late Normal', () => {
    var data = { 'beards' : [defaultPlayerData(lateNormal, 'beards')]}
    var val = Number(beardInfoPerm(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(341, 0)
    var val = Number(beardInfoPerm(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(267, 0)
});

test('Challenges - Late Normal', () => {
    var data = { 'challenges' : [defaultPlayerData(lateNormal, 'challenges')]}
    var val = Number(challengeInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(135, 0)
    var val = Number(challengeInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(150, 0)
});

test('Digger - Late Normal', () => {
    var data = {
        'diggers' : [defaultPlayerData(lateNormal, 'diggers')],
        'challenges' : [defaultPlayerData(lateNormal, 'challenges')],
        'itemSets' : [defaultPlayerData(lateNormal, 'itemSets')],
    }
    var val = Number(diggerInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(235.64, 2)
});

test('Equipment - Late Normal', () => {
    var data = {
        'equipmentHead' : [defaultPlayerData(lateNormal, 'equipmentHead')],
        'equipmentChest' : [defaultPlayerData(lateNormal, 'equipmentChest')],
        'equipmentLegs' : [defaultPlayerData(lateNormal, 'equipmentLegs')],
        'equipmentBoots' : [defaultPlayerData(lateNormal, 'equipmentBoots')],
        'equipmentWeapon' : [defaultPlayerData(lateNormal, 'equipmentWeapon')],
        'equipmentAccesories' : [defaultPlayerData(lateNormal, 'equipmentAccesories')],
        'cubePower' : [defaultPlayerData(lateNormal, 'cubePower')],
        'cubeToughness' : [defaultPlayerData(lateNormal, 'cubeToughness')],
        'baseAdventurePower' : [defaultPlayerData(lateNormal, 'baseAdventurePower')],
        'baseAdventureToughness' : [defaultPlayerData(lateNormal, 'baseAdventureToughness')],
    }
    // Cube may be wrong due to offline increases
    var val = Number(equipmentInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(5956238, 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(24500, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_CAP).getValue())
    expect(val).toBeCloseTo(2820, 0)
    var val = Number(equipmentInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(370, 0)
    var val = 200 - Number(equipmentInfo(data, Stat.RESPAWN).getValue())
    expect(val).toBeCloseTo(72, 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(1600, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_WANDOOS_SPEED).getValue())
    expect(val).toBeCloseTo(340, 0)
});


test('MacGuffin - Late Normal', () => {
    var data = {
        'macguffins' : [defaultPlayerData(lateNormal, 'macguffins')],
    }
    var val = Number(macguffinInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(macguffinInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(macguffinInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(104.248, 3)
    var val = Number(macguffinInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('NGU - Late Normal', () => {
    var data = {
        'energyNGUs' : [defaultPlayerData(lateNormal, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(lateNormal, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(lateNormal, 'gameMode')],
    }
    var val = Number(nguInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(42222, 0)
    var val = Number(nguInfo(data, Stat.YGGDRASIL_YIELD).getValue())
    expect(val).toBeCloseTo(1851.98, 1)
    var val = Number(nguInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(11140.88, 1)
    var val = Number(nguInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(129483517932, 0)
    var val = Number(nguInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(423.38, 0)
});

test('Perks - Late Normal', () => {
    var data = {
        'perks' : [defaultPlayerData(lateNormal, 'perks')],
        'gameMode' : [defaultPlayerData(lateNormal, 'gameMode')],
    }
    var val = Number(perkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(110, 0)
    var val = Number(perkInfo(data, Stat.BOOSTS_BOOST).getValue())
    expect(val).toBeCloseTo(550, 0)
    var val = Number(perkInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(150, 0)
});

test('Quirks - Late Normal', () => {
    var data = {
        'quirks' : [defaultPlayerData(lateNormal, 'quirks')],
        'gameMode' : [defaultPlayerData(lateNormal, 'gameMode')],
    }
    var val = Number(quirkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(125, 0)
    var val = Number(quirkInfo(data, Stat.ENERGY_CAP).getValue())
    expect(val).toBeCloseTo(146.3, 1)
    var val = Number(quirkInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('Maxxed Items/Sets - Late Normal', () => {
    var data = {
        'itemSets' : [defaultPlayerData(lateNormal, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(lateNormal, 'maxxedItems')],
    }
    expect(isMaxxedItem(data, 1)).toBeTruthy()
    expect(isMaxxedItem(data, 44)).toBeTruthy()
    expect(isMaxxedItem(data, 89)).toBeTruthy()
    expect(isMaxxedItem(data, 460)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.EDGY)).toBeFalsy()
});


















test('Achievement info - Early Evil 1', () => {
    var data = {'achievements' : [defaultPlayerData(earlyEvil, 'achievements')]}
    expect(achievementAPBonus(data).getValue()).toBe('154.65')
});

test('Advanced Training info - Early Evil 1', () => {
    var data = { 'advTrainings' : [defaultPlayerData(earlyEvil, 'advTrainings')]}
    var val = Number(advTrainingInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(113.2, 1)
    var val = Number(advTrainingInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('AP - Early Evil 1', () => {
    var data = { 'apItems' : [defaultPlayerData(earlyEvil, 'apItems')]}
    var val = Number(apItemInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Temp - Early Evil 1', () => {
    var data = { 'beards' : [defaultPlayerData(earlyEvil, 'beards')]}
    var val = Number(beardInfoTemp(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(1210, 0)
    var val = Number(beardInfoTemp(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(884, 0)
});

test('Beard Perm - Early Evil 1', () => {
    var data = { 'beards' : [defaultPlayerData(earlyEvil, 'beards')]}
    var val = Number(beardInfoPerm(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(695, 0)
    var val = Number(beardInfoPerm(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(396, 0)
});

test('Challenges - Early Evil 1', () => {
    var data = { 'challenges' : [defaultPlayerData(earlyEvil, 'challenges')]}
    var val = Number(challengeInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(149, 0)
    var val = Number(challengeInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(150, 0)
});

test('Digger - Early Evil 1', () => {
    var data = {
        'diggers' : [defaultPlayerData(earlyEvil, 'diggers')],
        'challenges' : [defaultPlayerData(earlyEvil, 'challenges')],
        'itemSets' : [defaultPlayerData(earlyEvil, 'itemSets')],
    }
    var val = Number(diggerInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Equipment - Early Evil 1', () => {
    var data = {
        'equipmentHead' : [defaultPlayerData(earlyEvil, 'equipmentHead')],
        'equipmentChest' : [defaultPlayerData(earlyEvil, 'equipmentChest')],
        'equipmentLegs' : [defaultPlayerData(earlyEvil, 'equipmentLegs')],
        'equipmentBoots' : [defaultPlayerData(earlyEvil, 'equipmentBoots')],
        'equipmentWeapon' : [defaultPlayerData(earlyEvil, 'equipmentWeapon')],
        'equipmentAccesories' : [defaultPlayerData(earlyEvil, 'equipmentAccesories')],
        'cubePower' : [defaultPlayerData(earlyEvil, 'cubePower')],
        'cubeToughness' : [defaultPlayerData(earlyEvil, 'cubeToughness')],
        'baseAdventurePower' : [defaultPlayerData(earlyEvil, 'baseAdventurePower')],
        'baseAdventureToughness' : [defaultPlayerData(earlyEvil, 'baseAdventureToughness')],
    }
    // Cube may be wrong due to offline increases
    var ec = expectClose(Number(equipmentInfo(data, Stat.POWER).getValue()), (1.887 * 10 ** 7 ) - (2.347 * 10 ** 6), 4)
    expect(ec[0]).toBeCloseTo(ec[1], 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(57300, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_CAP).getValue())
    expect(val).toBeCloseTo(6260, 0)
    var val = Number(equipmentInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(490, 0)
    var val = 200 - Number(equipmentInfo(data, Stat.RESPAWN).getValue())
    expect(val).toBeCloseTo(64, 0)
    var val = Number(equipmentInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(1800, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_WANDOOS_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('MacGuffin - Early Evil 1', () => {
    var data = {
        'macguffins' : [defaultPlayerData(earlyEvil, 'macguffins')],
    }
    var val = Number(macguffinInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(macguffinInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(111, 0)
    var val = Number(macguffinInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(106.25, 3)
    var val = Number(macguffinInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('NGU - Early Evil 1', () => {
    var data = {
        'energyNGUs' : [defaultPlayerData(earlyEvil, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(earlyEvil, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(earlyEvil, 'gameMode')],
    }
    var ec = expectClose(Number(nguInfo(data, Stat.POWER).getValue()), 45749 * 9.8111, 2)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var val = Number(nguInfo(data, Stat.YGGDRASIL_YIELD).getValue())
    expect(val).toBeCloseTo(3003.45, 1)
    var val = Number(nguInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(26675.27, 1)
    var ec = expectClose(Number(nguInfo(data, Stat.ATTACK).getValue()), 3.522 * 10**15, 12)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var val = Number(nguInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(1971, 0)
});

test('Perks - Early Evil 1', () => {
    var data = {
        'perks' : [defaultPlayerData(earlyEvil, 'perks')],
        'gameMode' : [defaultPlayerData(earlyEvil, 'gameMode')],
    }
    var val = Number(perkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(110, 0)
    var val = Number(perkInfo(data, Stat.BOOSTS_BOOST).getValue())
    expect(val).toBeCloseTo(550, 0)
    var val = Number(perkInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(231, 0)
});

test('Quirks - Early Evil 1', () => {
    var data = {
        'quirks' : [defaultPlayerData(earlyEvil, 'quirks')],
        'gameMode' : [defaultPlayerData(earlyEvil, 'gameMode')],
    }
    var val = Number(quirkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(125, 0)
    var val = Number(quirkInfo(data, Stat.ENERGY_CAP).getValue())
    expect(val).toBeCloseTo(165, 1)
    var val = Number(quirkInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('Maxxed Items/Sets - Early Evil 1', () => {
    var data = {
        'itemSets' : [defaultPlayerData(earlyEvil, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(earlyEvil, 'maxxedItems')],
    }
    expect(isMaxxedItem(data, 1)).toBeTruthy()
    expect(isMaxxedItem(data, 44)).toBeTruthy()
    expect(isMaxxedItem(data, 89)).toBeTruthy()
    expect(isMaxxedItem(data, 460)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.PINK)).toBeFalsy()
});



















test('Achievement info - Evil - Return to Normal', () => {
    var data = {'achievements' : [defaultPlayerData(evilReturnToNormal, 'achievements')]}
    expect(achievementAPBonus(data).getValue()).toBe('155.15')
});

test('Advanced Training info - Evil - Return to Normal', () => {
    var data = { 'advTrainings' : [defaultPlayerData(evilReturnToNormal, 'advTrainings')]}
    var val = Number(advTrainingInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(163.1, 1)
    var val = Number(advTrainingInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('AP - Evil - Return to Normal', () => {
    var data = { 'apItems' : [defaultPlayerData(evilReturnToNormal, 'apItems')]}
    var val = Number(apItemInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Temp - Evil - Return to Normal', () => {
    var data = { 'beards' : [defaultPlayerData(evilReturnToNormal, 'beards')]}
    var val = Number(beardInfoTemp(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(beardInfoTemp(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Perm - Evil - Return to Normal', () => {
    var data = { 'beards' : [defaultPlayerData(evilReturnToNormal, 'beards')]}
    var val = Number(beardInfoPerm(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(730, 0)
    var val = Number(beardInfoPerm(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(408, 0)
});

test('Challenges - Evil - Return to Normal', () => {
    var data = { 'challenges' : [defaultPlayerData(evilReturnToNormal, 'challenges')]}
    var val = Number(challengeInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(149, 0)
    var val = Number(challengeInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(150, 0)
});

test('Digger - Evil - Return to Normal', () => {
    var data = {
        'diggers' : [defaultPlayerData(evilReturnToNormal, 'diggers')],
        'challenges' : [defaultPlayerData(evilReturnToNormal, 'challenges')],
        'itemSets' : [defaultPlayerData(evilReturnToNormal, 'itemSets')],
    }
    var val = Number(diggerInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Equipment - Evil - Return to Normal', () => {
    var data = {
        'equipmentHead' : [defaultPlayerData(evilReturnToNormal, 'equipmentHead')],
        'equipmentChest' : [defaultPlayerData(evilReturnToNormal, 'equipmentChest')],
        'equipmentLegs' : [defaultPlayerData(evilReturnToNormal, 'equipmentLegs')],
        'equipmentBoots' : [defaultPlayerData(evilReturnToNormal, 'equipmentBoots')],
        'equipmentWeapon' : [defaultPlayerData(evilReturnToNormal, 'equipmentWeapon')],
        'equipmentAccesories' : [defaultPlayerData(evilReturnToNormal, 'equipmentAccesories')],
        'cubePower' : [defaultPlayerData(evilReturnToNormal, 'cubePower')],
        'cubeToughness' : [defaultPlayerData(evilReturnToNormal, 'cubeToughness')],
        'baseAdventurePower' : [defaultPlayerData(evilReturnToNormal, 'baseAdventurePower')],
        'baseAdventureToughness' : [defaultPlayerData(evilReturnToNormal, 'baseAdventureToughness')],
    }
    // Cube may be wrong due to offline increases
    var ec = expectClose(Number(equipmentInfo(data, Stat.POWER).getValue()), 1.83e7 + 2.152e7, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(42111, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_CAP).getValue())
    expect(val).toBeCloseTo(4856, 0)
    var val = Number(equipmentInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(1389.374, 0)
    var val = 200 - Number(equipmentInfo(data, Stat.RESPAWN).getValue())
    expect(val).toBeCloseTo(76, 0)
    var val = Number(equipmentInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_WANDOOS_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('MacGuffin - Evil - Return to Normal', () => {
    var data = {
        'macguffins' : [defaultPlayerData(evilReturnToNormal, 'macguffins')],
    }
    var val = Number(macguffinInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(104, 0)
    var val = Number(macguffinInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(116, 0)
    var val = Number(macguffinInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(106.25, 3)
    var val = Number(macguffinInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('NGU - Evil - Return to Normal', () => {
    var data = {
        'energyNGUs' : [defaultPlayerData(evilReturnToNormal, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(evilReturnToNormal, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(evilReturnToNormal, 'gameMode')],
    }
    var ec = expectClose(Number(nguInfo(data, Stat.POWER).getValue()), 31895 * 1292 / 100, 4)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var val = Number(nguInfo(data, Stat.YGGDRASIL_YIELD).getValue())
    expect(val).toBeCloseTo(2465.97, 0)
    var val = Number(nguInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(23561, 0)
    var ec = expectClose(Number(nguInfo(data, Stat.ATTACK).getValue()), 2.221e14, 11)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var val = Number(nguInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(2196, 0)
});

test('Perks - Evil - Return to Normal', () => {
    var data = {
        'perks' : [defaultPlayerData(evilReturnToNormal, 'perks')],
        'gameMode' : [defaultPlayerData(evilReturnToNormal, 'gameMode')],
    }
    var val = Number(perkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(110, 0)
    var val = Number(perkInfo(data, Stat.BOOSTS_BOOST).getValue())
    expect(val).toBeCloseTo(550, 0)
    var val = Number(perkInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(165, 0)
});

test('Quirks - Evil - Return to Normal', () => {
    var data = {
        'quirks' : [defaultPlayerData(evilReturnToNormal, 'quirks')],
        'gameMode' : [defaultPlayerData(evilReturnToNormal, 'gameMode')],
    }
    var val = Number(quirkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(125, 0)
    var val = Number(quirkInfo(data, Stat.ENERGY_CAP).getValue())
    expect(val).toBeCloseTo(165, 1)
    var val = Number(quirkInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('Maxxed Items/Sets - Evil - Return to Normal', () => {
    var data = {
        'itemSets' : [defaultPlayerData(evilReturnToNormal, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(evilReturnToNormal, 'maxxedItems')],
    }
    expect(isMaxxedItem(data, 1)).toBeTruthy()
    expect(isMaxxedItem(data, 44)).toBeTruthy()
    expect(isMaxxedItem(data, 89)).toBeTruthy()
    expect(isMaxxedItem(data, 460)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.PARTY)).toBeFalsy()
});





































test('Achievement info - Early Evil 2', () => {
    var data = {'achievements' : [defaultPlayerData(earlyEvilTwo, 'achievements')]}
    expect(achievementAPBonus(data).getValue()).toBe('156.15')
});

test('Advanced Training info - Early Evil 2', () => {
    var data = { 'advTrainings' : [defaultPlayerData(earlyEvilTwo, 'advTrainings')]}
    var val = Number(advTrainingInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(163.1, 1)
    var val = Number(advTrainingInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('AP - Early Evil 2', () => {
    var data = { 'apItems' : [defaultPlayerData(earlyEvilTwo, 'apItems')]}
    var val = Number(apItemInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Temp - Early Evil 2', () => {
    var data = { 'beards' : [defaultPlayerData(earlyEvilTwo, 'beards')]}
    var val = Number(beardInfoTemp(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(beardInfoTemp(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Perm - Early Evil 2', () => {
    var data = { 'beards' : [defaultPlayerData(earlyEvilTwo, 'beards')]}
    var val = Number(beardInfoPerm(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(908, 0)
    var val = Number(beardInfoPerm(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(466, 0)
});

test('Challenges - Early Evil 2', () => {
    var data = { 'challenges' : [defaultPlayerData(earlyEvilTwo, 'challenges')]}
    var val = Number(challengeInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(203, 0)
    var val = Number(challengeInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(150, 0)
});

test('Digger - Early Evil 2', () => {
    var data = {
        'diggers' : [defaultPlayerData(earlyEvilTwo, 'diggers')],
        'challenges' : [defaultPlayerData(earlyEvilTwo, 'challenges')],
        'itemSets' : [defaultPlayerData(earlyEvilTwo, 'itemSets')],
    }
    var val = Number(diggerInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Equipment - Early Evil 2', () => {
    var data = {
        'equipmentHead' : [defaultPlayerData(earlyEvilTwo, 'equipmentHead')],
        'equipmentChest' : [defaultPlayerData(earlyEvilTwo, 'equipmentChest')],
        'equipmentLegs' : [defaultPlayerData(earlyEvilTwo, 'equipmentLegs')],
        'equipmentBoots' : [defaultPlayerData(earlyEvilTwo, 'equipmentBoots')],
        'equipmentWeapon' : [defaultPlayerData(earlyEvilTwo, 'equipmentWeapon')],
        'equipmentAccesories' : [defaultPlayerData(earlyEvilTwo, 'equipmentAccesories')],
        'cubePower' : [defaultPlayerData(earlyEvilTwo, 'cubePower')],
        'cubeToughness' : [defaultPlayerData(earlyEvilTwo, 'cubeToughness')],
        'baseAdventurePower' : [defaultPlayerData(earlyEvilTwo, 'baseAdventurePower')],
        'baseAdventureToughness' : [defaultPlayerData(earlyEvilTwo, 'baseAdventureToughness')],
    }
    // Cube may be wrong due to offline increases
    var ec = expectClose(Number(equipmentInfo(data, Stat.POWER).getValue()), 3.445e7 + 3.982e7, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(107542, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_CAP).getValue())
    expect(val).toBeCloseTo(7476, 0)
    var val = Number(equipmentInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(990, 0)
    var val = 200 - Number(equipmentInfo(data, Stat.RESPAWN).getValue())
    expect(val).toBeCloseTo(70, 0)
    var val = Number(equipmentInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(1700, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_WANDOOS_SPEED).getValue())
    expect(val).toBeCloseTo(500, 0)
});


test('MacGuffin - Early Evil 2', () => {
    var data = {
        'macguffins' : [defaultPlayerData(earlyEvilTwo, 'macguffins')],
    }
    var val = Number(macguffinInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(114, 0)
    var val = Number(macguffinInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(128, 0)
    var val = Number(macguffinInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(106.25, 3)
    var val = Number(macguffinInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('NGU - Early Evil 2', () => {
    var data = {
        'energyNGUs' : [defaultPlayerData(earlyEvilTwo, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(earlyEvilTwo, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(earlyEvilTwo, 'gameMode')],
    }
    var ec = expectClose(Number(nguInfo(data, Stat.POWER).getValue()), 123413 * 1614 / 100, 4)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var val = Number(nguInfo(data, Stat.YGGDRASIL_YIELD).getValue())
    expect(val).toBeCloseTo(3968.5, 0)
    var val = Number(nguInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(90096, 0)
    var ec = expectClose(Number(nguInfo(data, Stat.ATTACK).getValue()), 2.255e21, 18)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var val = Number(nguInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(4298, 0)
});

test('Perks - Early Evil 2', () => {
    var data = {
        'perks' : [defaultPlayerData(earlyEvilTwo, 'perks')],
        'gameMode' : [defaultPlayerData(earlyEvilTwo, 'gameMode')],
    }
    var val = Number(perkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(150.5273, 0)
    var val = Number(perkInfo(data, Stat.BOOSTS_BOOST).getValue())
    expect(val).toBeCloseTo(550, 0)
    var val = Number(perkInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(330, 0)
});

test('Quirks - Early Evil 2', () => {
    var data = {
        'quirks' : [defaultPlayerData(earlyEvilTwo, 'quirks')],
        'gameMode' : [defaultPlayerData(earlyEvilTwo, 'gameMode')],
    }
    var val = Number(quirkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(128, 0)
    var val = Number(quirkInfo(data, Stat.ENERGY_CAP).getValue())
    expect(val).toBeCloseTo(165, 1)
    var val = Number(quirkInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('Maxxed Items/Sets - Early Evil 2', () => {
    var data = {
        'itemSets' : [defaultPlayerData(earlyEvilTwo, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(earlyEvilTwo, 'maxxedItems')],
    }
    expect(isMaxxedItem(data, 1)).toBeTruthy()
    expect(isMaxxedItem(data, 44)).toBeTruthy()
    expect(isMaxxedItem(data, 89)).toBeTruthy()
    expect(isMaxxedItem(data, 460)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.PARTY)).toBeFalsy()
});













test('Achievement info - Mid Evil 1', () => {
    var data = {'achievements' : [defaultPlayerData(midEvil, 'achievements')]}
    expect(achievementAPBonus(data).getValue()).toBe('156.15')
});

test('Advanced Training info - Mid Evil 1', () => {
    var data = { 'advTrainings' : [defaultPlayerData(midEvil, 'advTrainings')]}
    var val = Number(advTrainingInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(163.1, 1)
    var val = Number(advTrainingInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('AP - Mid Evil 1', () => {
    var data = { 'apItems' : [defaultPlayerData(midEvil, 'apItems')]}
    var val = Number(apItemInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Temp - Mid Evil 1', () => {
    var data = { 'beards' : [defaultPlayerData(midEvil, 'beards')]}
    var val = Number(beardInfoTemp(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(beardInfoTemp(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Beard Perm - Mid Evil 1', () => {
    var data = { 'beards' : [defaultPlayerData(midEvil, 'beards')]}
    var val = Number(beardInfoPerm(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(1481, 0)
    var val = Number(beardInfoPerm(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(591, 0)
});

test('Challenges - Mid Evil 1', () => {
    var data = { 'challenges' : [defaultPlayerData(midEvil, 'challenges')]}
    var val = Number(challengeInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(203, 0)
    var val = Number(challengeInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(150, 0)
});

test('Digger - Mid Evil 1', () => {
    var data = {
        'diggers' : [defaultPlayerData(midEvil, 'diggers')],
        'challenges' : [defaultPlayerData(midEvil, 'challenges')],
        'itemSets' : [defaultPlayerData(midEvil, 'itemSets')],
    }
    var val = Number(diggerInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Equipment - Mid Evil 1', () => {
    var data = {
        'equipmentHead' : [defaultPlayerData(midEvil, 'equipmentHead')],
        'equipmentChest' : [defaultPlayerData(midEvil, 'equipmentChest')],
        'equipmentLegs' : [defaultPlayerData(midEvil, 'equipmentLegs')],
        'equipmentBoots' : [defaultPlayerData(midEvil, 'equipmentBoots')],
        'equipmentWeapon' : [defaultPlayerData(midEvil, 'equipmentWeapon')],
        'equipmentAccesories' : [defaultPlayerData(midEvil, 'equipmentAccesories')],
        'cubePower' : [defaultPlayerData(midEvil, 'cubePower')],
        'cubeToughness' : [defaultPlayerData(midEvil, 'cubeToughness')],
        'baseAdventurePower' : [defaultPlayerData(midEvil, 'baseAdventurePower')],
        'baseAdventureToughness' : [defaultPlayerData(midEvil, 'baseAdventureToughness')],
    }
    // Cube may be wrong due to offline increases
    var ec = expectClose(Number(equipmentInfo(data, Stat.POWER).getValue()), 2.448e8 + 1.258e8, 5)
    expect(ec[0]).toBeCloseTo(ec[1], 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(196100, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_CAP).getValue())
    expect(val).toBeCloseTo(23718, 0)
    var val = Number(equipmentInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(1890, 0)
    var val = 200 - Number(equipmentInfo(data, Stat.RESPAWN).getValue())
    expect(val).toBeCloseTo(80, 0)
    var val = Number(equipmentInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_WANDOOS_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('MacGuffin - Mid Evil 1', () => {
    var data = {
        'macguffins' : [defaultPlayerData(midEvil, 'macguffins')],
    }
    var val = Number(macguffinInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(140, 0)
    var val = Number(macguffinInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(156, 0)
    var val = Number(macguffinInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(106.25, 3)
    var val = Number(macguffinInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('NGU - Mid Evil 1', () => {
    var data = {
        'energyNGUs' : [defaultPlayerData(midEvil, 'energyNGUs')],
        'magicNGUs' : [defaultPlayerData(midEvil, 'magicNGUs')],
        'gameMode' : [defaultPlayerData(midEvil, 'gameMode')],
    }
    var ec = expectClose(Number(nguInfo(data, Stat.POWER).getValue()), 265103 * 4515 / 100, 4)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var val = Number(nguInfo(data, Stat.YGGDRASIL_YIELD).getValue())
    expect(val).toBeCloseTo(4803.99, 0)
    var val = Number(nguInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(142252, 0)
    var ec = expectClose(Number(nguInfo(data, Stat.ATTACK).getValue()), 1.347e22, 19)
    expect(ec[0]).toBeCloseTo(ec[1], 0)
    var val = Number(nguInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(7023, 0)
});

test('Perks - Mid Evil 1', () => {
    var data = {
        'perks' : [defaultPlayerData(midEvil, 'perks')],
        'gameMode' : [defaultPlayerData(midEvil, 'gameMode')],
    }
    var val = Number(perkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(188.1902, 0)
    var val = Number(perkInfo(data, Stat.BOOSTS_BOOST).getValue())
    expect(val).toBeCloseTo(550, 0)
    var val = Number(perkInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(429, 0)
});

test('Quirks - Mid Evil 1', () => {
    var data = {
        'quirks' : [defaultPlayerData(midEvil, 'quirks')],
        'gameMode' : [defaultPlayerData(midEvil, 'gameMode')],
    }
    var val = Number(quirkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(162.5, 0)
    var val = Number(quirkInfo(data, Stat.ENERGY_CAP).getValue())
    expect(val).toBeCloseTo(165, 1)
    var val = Number(quirkInfo(data, Stat.MAGIC_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});


test('Maxxed Items/Sets - Mid Evil 1', () => {
    var data = {
        'itemSets' : [defaultPlayerData(midEvil, 'itemSets')],
        'maxxedItems' : [defaultPlayerData(midEvil, 'maxxedItems')],
    }
    expect(isMaxxedItem(data, 1)).toBeTruthy()
    expect(isMaxxedItem(data, 44)).toBeTruthy()
    expect(isMaxxedItem(data, 89)).toBeTruthy()
    expect(isMaxxedItem(data, 460)).toBeFalsy()

    expect(isMaxxedItemSet(data, ItemSets.FOREST)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.BADLY_DRAWN)).toBeTruthy()
    expect(isMaxxedItemSet(data, ItemSets.NETHER)).toBeFalsy()
});