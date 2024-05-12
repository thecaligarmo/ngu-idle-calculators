import {achievementAPBonus, advTrainingInfo, apItemInfo, beardInfoTemp, beardInfoPerm, challengeInfo, diggerInfo, equipmentInfo, macguffinInfo, nguInfo, perkInfo, quirkInfo, isMaxxedItem, isMaxxedItemSet} from '../../src/helpers/resourceInfo'
import {defaultPlayerData} from '../../src/helpers/defaultPlayerData'
import {Stat} from '../../src/assets/stat';
import { ItemSets } from '../../src/assets/sets';
import earlyNormal from './__data__/earlyNormal1';
import earlyNormalTwo from './__data__/earlyNormal2';
import { describe } from 'node:test';
import midNormal from './__data__/midNormal1';
import midNormalTwo from './__data__/midNormal2';
import lateNormal from './__data__/lateNormal';


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
    expect(val).toBeCloseTo(133, 0)
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
    }
    var val = Number(equipmentInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(6736, 0)

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
    }
    var val = Number(nguInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(nguInfo(data, Stat.YGGDRASIL_YIELD).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(nguInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(100, 0)
    var val = Number(nguInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(140, 0)
    var val = Number(nguInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(100, 0)
});

test('Perks - Early Normal 2', () => {
    var data = {
        'perks' : [defaultPlayerData(earlyNormalTwo, 'perks')],
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
    expect(val).toBeCloseTo(205.4, 1)
    var val = Number(beardInfoTemp(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(174.47, 1)
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
    }
    var val = Number(equipmentInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(1145412, 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(8708, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_CAP).getValue())
    expect(val).toBeCloseTo(868, 0)
    var val = Number(equipmentInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(310, 0)
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
    }
    var val = Number(nguInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(1585.66, 1)
    var val = Number(nguInfo(data, Stat.YGGDRASIL_YIELD).getValue())
    expect(val).toBeCloseTo(286.51, 1)
    var val = Number(nguInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(565.03, 1)
    var val = Number(nguInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(750500, 0)
    var val = Number(nguInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(105, 0)
});

test('Perks - Mid Normal 2', () => {
    var data = {
        'perks' : [defaultPlayerData(midNormalTwo, 'perks')],
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
    expect(val).toBeCloseTo(437.09, 1)
    var val = Number(beardInfoTemp(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(337.75, 1)
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
    expect(val).toBeCloseTo(236.98, 2)
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
    }
    var val = Number(equipmentInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(4804846, 0)

    var val = Number(equipmentInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(24500, 0)
    var val = Number(equipmentInfo(data, Stat.MAGIC_CAP).getValue())
    expect(val).toBeCloseTo(2820, 0)
    var val = Number(equipmentInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(350, 0)
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
    }
    var val = Number(nguInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(20981.39, 1)
    var val = Number(nguInfo(data, Stat.YGGDRASIL_YIELD).getValue())
    expect(val).toBeCloseTo(1135.37, 1)
    var val = Number(nguInfo(data, Stat.DROP_CHANCE).getValue())
    expect(val).toBeCloseTo(4646.36, 1)
    var val = Number(nguInfo(data, Stat.ATTACK).getValue())
    expect(val).toBeCloseTo(129483517932, 0)
    var val = Number(nguInfo(data, Stat.ENERGY_NGU_SPEED).getValue())
    expect(val).toBeCloseTo(423.38, 0)
});

test('Perks - Late Normal', () => {
    var data = {
        'perks' : [defaultPlayerData(lateNormal, 'perks')],
    }
    var val = Number(perkInfo(data, Stat.POWER).getValue())
    expect(val).toBeCloseTo(110, 0)
    var val = Number(perkInfo(data, Stat.BOOSTS_BOOST).getValue())
    expect(val).toBeCloseTo(370, 0)
    var val = Number(perkInfo(data, Stat.ENERGY_POWER).getValue())
    expect(val).toBeCloseTo(150, 0)
});

test('Quirks - Late Normal', () => {
    var data = {
        'quirks' : [defaultPlayerData(lateNormal, 'quirks')],
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