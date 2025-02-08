import { GameMode } from "./mode";
import Resource, { ResourceContainer } from "./resource";
import { Stat } from "./stat";

export class Perk extends Resource{
    setStat(stat : string, baseAmt : number) {
        if(! this.statnames.includes(stat)) {
            this.statnames.push(stat)
            this.base[stat] = baseAmt
        }
    }
    setLevel(level: number) {
        this.level = level
        // Fibonacci Perk
        if (this.id == 94) {
            // Switch goes down, so we just put things in backwards order and we're good =)
            if (this.level >= 1 ) {
                this.setStat(Stat.ENERGY_POWER, 10)
                this.setStat(Stat.MAGIC_POWER, 10)
                if (this.level >= 2 ) {
                    this.setStat(Stat.ENERGY_CAP, 10)
                    if (this.level >= 3 ) {
                        this.setStat(Stat.MAGIC_CAP, 10)
                        if (this.level >= 5 ) {
                            this.setStat(Stat.ENERGY_NGU_SPEED, 5)
                            if (this.level >= 8 ) {
                                this.setStat(Stat.MAGIC_NGU_SPEED, 5)
                                if (this.level >= 13 ) {
                                    this.setStat(Stat.PP, 5)
                                    if (this.level >= 21 ) {
                                        this.setStat(Stat.ENERGY_BARS, 10)
                                        this.setStat(Stat.MAGIC_BARS, 10)
                                        if (this.level >= 34 ) {
                                            this.setStat(Stat.POWER, 13)
                                            this.setStat(Stat.TOUGHNESS, 13)
                                            this.setStat(Stat.HEALTH, 13)
                                            this.setStat(Stat.REGEN, 13)
                                            if (this.level >= 55 ) {
                                                this.setStat(Stat.DAYCARE_SPEED, 5)
                                                if (this.level >= 89 ) {
                                                    this.setStat(Stat.AP, 2)
                                                    if (this.level >= 144 ) {
                                                        // +5% chance for +1 lvl on loot
                                                        if (this.level >= 233 ) {
                                                            this.setStat(Stat.QUEST_REWARD, 10)
                                                            if (this.level >= 377 ) {
                                                                this.setStat(Stat.ATTACK, 377)
                                                                this.setStat(Stat.DEFENSE, 377)
                                                                if (this.level >= 610 ) {
                                                                    // Quests always require 50 instead of RNG
                                                                    if (this.level >= 987 ) {
                                                                        this.setStat(Stat.EXPERIENCE, 5)
                                                                        if(this.level >= 1597) {
                                                                            // Kitty art!
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
        }
        this.updateStats()
    }
    updateStats() {
        for (const prop of Object.keys(this.base)) {
            // Fibonacci Perk
            if (this.id == 94) {
                this[prop] = (this.level > 0) ?  this.base[prop] : 0
            } else {
                this[prop] = (this.level > 0) ?  this.base[prop] * this.level : 0
            }
        }
    }
}

export const PERKLIST = [
    new Perk(0, 'theNewbieEnergyPerk', 'The Newbie Energy Perk', GameMode.NORMAL, 0, []), // Added to base energy
    new Perk(1, 'theNewbieMagicPerk', 'The Newbie Magic Perk', GameMode.NORMAL, 0, []), // Added to base magic
    new Perk(2, 'heNewbieAdventurePerk', 'The Newbie Adventure Perk', GameMode.NORMAL, 0, [[Stat.POWER, 10], [Stat.TOUGHNESS, 10], [Stat.HEALTH, 10], [Stat.REGEN, 10]]), 
    new Perk(3, 'theNewbieDropChancePerk', 'The Newbie Drop Chance Perk', GameMode.NORMAL, 0, [[Stat.DROP_CHANCE, 10],]),
    new Perk(4, 'theNewbieStatPerk', 'The Newbie Stat Perk', GameMode.NORMAL, 0, [[Stat.ATTACK, 100],[Stat.DEFENSE, 100],]),
    new Perk(5, 'statBoostForRichPerksI', 'Stat Boost for Rich Perks I', GameMode.NORMAL, 0, [[Stat.ATTACK, 10],[Stat.DEFENSE, 10],]),
    new Perk(6, 'genericEnergyPowerPerkI', 'Generic Energy Power Perk I', GameMode.NORMAL, 0, [[Stat.ENERGY_POWER, 1]]),
    new Perk(7, 'genericEnergyBarPerkI', 'Generic Energy Bar Perk I', GameMode.NORMAL, 0, [[Stat.ENERGY_BARS, 1]]),
    new Perk(8, 'genericEnergyCapPerkI', 'Generic Energy Cap Perk I', GameMode.NORMAL, 0, [[Stat.ENERGY_CAP, 1]]),
    new Perk(9, 'genericMagicPowerPerkI', 'Generic Magic Power Perk I', GameMode.NORMAL, 0, [[Stat.MAGIC_POWER, 1]]),
    new Perk(10, 'genericMagicBarPerkI', 'Generic Magic Bar Perk I', GameMode.NORMAL, 0, [[Stat.MAGIC_BARS, 1]]),
    new Perk(11, 'genericMagicCapPerkI', 'Generic Magic Cap Perk I', GameMode.NORMAL, 0, [[Stat.MAGIC_CAP, 1]]),
    new Perk(12, 'boostedBoostsI', 'Boosted Boosts I', GameMode.NORMAL, 0, [[Stat.BOOSTS_BOOST, 2.5]]),
    new Perk(13, 'fasterNGUEnergy', 'Faster NGU Energy', GameMode.NORMAL, 0, [[Stat.ENERGY_NGU_SPEED, 2.5],]),
    new Perk(14, 'fasterNGUMagic', 'Faster NGU Magic', GameMode.NORMAL, 0, [[Stat.MAGIC_NGU_SPEED, 2.5],]),
    new Perk(15, 'doubleBasicTraining', 'Double Basic Training', GameMode.NORMAL, 0, []),
    new Perk(16, 'quickerPowerFruitBetaActivation', 'Quicker Power Fruit Beta Activation', GameMode.NORMAL, 0, []),
    new Perk(17, 'quickerFruitOfNumbersBonusActivation', 'Quicker Fruit of Numbers Bonus Activation', GameMode.NORMAL, 0, []),
    new Perk(18, 'instantAdvancedTrainingLevels!', 'Instant Advanced Training Levels!', GameMode.NORMAL, 0, []),
    new Perk(19, 'fruitOfKnowledgeSucks', '"Fruit of Knowledge sucks, 1/5"', GameMode.NORMAL, 0, []),
    new Perk(20, 'fruitOfKnowledgeSTILLSucks', '"Fruit of Knowledge STILL sucks, 1/5"', GameMode.NORMAL, 0, []),
    new Perk(21, 'fiveOClockShadow', 'Five O\'Clock Shadow', GameMode.NORMAL, 0, []),
    new Perk(22, 'wandoosLover', 'Wandoos Lover', GameMode.NORMAL, 0, []),
    new Perk(23, 'goldenShowers', 'Golden Showers', GameMode.NORMAL, 0, [[Stat.GOLD_DROP, 5]]),
    new Perk(24, 'iWantYourSeeds', 'I Want Your Seeds ;)', GameMode.NORMAL, 0, [[Stat.SEED_GAIN, 5],]),
    new Perk(25, 'theLootGoblinsBlessing', 'The Loot Goblin\'s Blessing', GameMode.NORMAL, 0, []),
    new Perk(26, 'improvedCubeBoosting!', 'Improved Cube Boosting!', GameMode.NORMAL, 0, []),
    new Perk(27, 'daycareKittysBlessingI', 'Daycare Kitty\'s Blessing I', GameMode.NORMAL, 0, [[Stat.DAYCARE_TIME, 1]]),
    new Perk(28, 'daycareKittysBlessingII', 'Daycare Kitty\'s Blessing II', GameMode.NORMAL, 0, [[Stat.DAYCARE_TIME, 1]]),
    new Perk(29, 'youllReallyWantThis', 'You\'ll Really Want This', GameMode.NORMAL, 0, []),
    new Perk(30, 'whataCrappyPerk', 'What a Crappy Perk', GameMode.NORMAL, 0, []),
    new Perk(31, 'moreInventorySpaceI', 'More Inventory Space I', GameMode.NORMAL, 0, []),
    new Perk(32, 'moreInventorySpaceII', 'More Inventory Space II', GameMode.NORMAL, 0, []),
    new Perk(33, 'boostedBoostsII', 'Boosted Boosts II', GameMode.NORMAL, 0, [[Stat.BOOSTS_BOOST, 2]]),
    new Perk(34, 'bonusTitanEXP!', 'Bonus Titan EXP!', GameMode.NORMAL, 0, []),
    new Perk(35, 'bonusBossExp!', 'Bonus Boss Exp!', GameMode.NORMAL, 0, []),
    new Perk(36, 'advancedTrainingLevelBankI', 'Advanced Training Level Bank I', GameMode.NORMAL, 0, []),
    new Perk(37, 'advancedTrainingLevelBankII', 'Advanced Training Level Bank II', GameMode.NORMAL, 0, []),
    new Perk(38, 'advancedTrainingLevelBankIII', 'Advanced Training Level Bank III', GameMode.NORMAL, 0, []),
    new Perk(39, 'advancedTrainingLevelBankIV', 'Advanced Training Level Bank IV', GameMode.NORMAL, 0, []),
    new Perk(40, 'advancedTrainingLevelBankV', 'Advanced Training Level Bank V', GameMode.NORMAL, 0, []),
    new Perk(41, 'timeMachineLevelBankI', 'Time Machine Level Bank I', GameMode.NORMAL, 0, []),
    new Perk(42, 'timeMachineLevelBankII', 'Time Machine Level Bank II', GameMode.NORMAL, 0, []),
    new Perk(43, 'timeMachineLevelBankIII', 'Time Machine Level Bank III', GameMode.NORMAL, 0, []),
    new Perk(44, 'timeMachineLevelBankIV', 'Time Machine Level Bank IV', GameMode.NORMAL, 0, []),
    new Perk(45, 'timeMachineLevelBankV', 'Time Machine Level Bank V', GameMode.NORMAL, 0, []),
    new Perk(46, 'beardTempLevelBankI', 'Beard Temp Level Bank I', GameMode.NORMAL, 0, []),
    new Perk(47, 'beardTempLevelBankII', 'Beard Temp Level Bank II', GameMode.NORMAL, 0, []),
    new Perk(48, 'beardTempLevelBankIII', 'Beard Temp Level Bank III', GameMode.NORMAL, 0, []),
    new Perk(49, 'beardTempLevelBankIV', 'Beard Temp Level Bank IV', GameMode.NORMAL, 0, []),
    new Perk(50, 'beardTempLevelBankV', 'Beard Temp Level Bank V', GameMode.NORMAL, 0, []),
    new Perk(51, 'theFirstHarvestsTheBest', 'The First Harvest\'s The Best', GameMode.NORMAL, 0, []),
    new Perk(52, 'aDiggerSlot!', 'A Digger Slot!', GameMode.NORMAL, 0, []),
    new Perk(53, 'oohAnotherDiggerSlot!', 'ooh, Another Digger Slot!', GameMode.NORMAL, 0, []),
    new Perk(54, 'statBoostforRichPerksII', 'Stat Boost for Rich Perks II', GameMode.NORMAL, 0, [[Stat.ATTACK, 1], [Stat.DEFENSE, 1]]),
    new Perk(55, 'adventureBoostForRichPerksI', 'Adventure Boost For Rich Perks I', GameMode.NORMAL, 0, [[Stat.POWER, 0.1], [Stat.TOUGHNESS, 0.1], [Stat.HEALTH, 0.1], [Stat.REGEN, 0.1]]),
    new Perk(56, 'macguffinDaycare!', 'Macguffin Daycare!', GameMode.EVIL, 0, []),
    new Perk(57, 'genericEnergyPowerPerkII', 'Generic Energy Power Perk II', GameMode.EVIL, 0, [[Stat.ENERGY_POWER, 1]]),
    new Perk(58, 'genericEnergyBarPerkII', 'Generic Energy Bar Perk II', GameMode.EVIL, 0, [[Stat.ENERGY_BARS, 1]]),
    new Perk(59, 'genericEnergyCapPerkII', 'Generic Energy Cap Perk II', GameMode.EVIL, 0, [[Stat.ENERGY_CAP, 1]]),
    new Perk(60, 'genericMagicPowerPerkII', 'Generic Magic Power Perk II', GameMode.EVIL, 0, [[Stat.MAGIC_POWER, 1]]),
    new Perk(61, 'genericMagicBarPerkII', 'Generic Magic Bar Perk II ', GameMode.EVIL, 0, [[Stat.MAGIC_BARS, 1]]),
    new Perk(62, 'genericMagicCapPerkII', 'Generic Magic Cap Perk II', GameMode.EVIL, 0, [[Stat.MAGIC_CAP, 1]]),
    new Perk(63, 'fasterNGUEnergyII', 'Faster NGU Energy II', GameMode.EVIL, 0, [[Stat.ENERGY_NGU_SPEED, 2]]),
    new Perk(64, 'fasterNGUMagicII', 'Faster NGU Magic II', GameMode.EVIL, 0, [[Stat.MAGIC_NGU_SPEED, 2]]),
    new Perk(65, 'improvedMacguffinDropsI', 'Improved Macguffin Drops I', GameMode.NORMAL, 0, []),
    new Perk(66, 'aMacGuffinSlot!', 'A MacGuffin Slot!', GameMode.NORMAL, 0, []),
    new Perk(67, 'anotherMacGuffinSlot!', 'Another MacGuffin Slot!', GameMode.EVIL, 0, []),
    new Perk(68, 'macGuffinITOPODDrops!', 'MacGuffin ITOPOD Drops!', GameMode.NORMAL, 0, []),
    new Perk(69, 'improvedMacGuffinITOPODDropsI', 'Improved MacGuffin ITOPOD Drops I', GameMode.NORMAL, 0, []),
    new Perk(70, 'improvedMacGuffinITOPODDropsII', 'Improved MacGuffin ITOPOD Drops II', GameMode.EVIL, 0, []),
    new Perk(71, 'improvedMacGuffinITOPODDropsIII', 'Improved MacGuffin ITOPOD Drops III', GameMode.EVIL, 0, []),
    new Perk(72, 'bloodMacguffinαSpell!', 'Blood Macguffin α Spell!', GameMode.NORMAL, 0, []),
    new Perk(73, 'bloodMacguffinβSpell!', 'Blood Macguffin β Spell!', GameMode.EVIL, 0, []),
    new Perk(74, 'genericEnergyPowerPerkIII', 'Generic Energy Power Perk III', GameMode.EVIL, 0, [[Stat.ENERGY_POWER, 0.3]]),
    new Perk(75, 'genericEnergyBarPerkIII', 'Generic Energy Bar Perk III', GameMode.EVIL, 0, [[Stat.ENERGY_BARS, 0.3]]),
    new Perk(76, 'genericEnergyCapPerkIII', 'Generic Energy Cap Perk III', GameMode.EVIL, 0, [[Stat.ENERGY_CAP, 0.3]]),
    new Perk(77, 'genericMagicPowerPerkIII', 'Generic Magic Power Perk III', GameMode.EVIL, 0, [[Stat.MAGIC_POWER, 0.3]]),
    new Perk(78, 'genericMagicBarPerkIII', 'Generic Magic Bar Perk III', GameMode.EVIL, 0, [[Stat.MAGIC_BARS, 0.3]]),
    new Perk(79, 'genericMagicCapPerkIII', 'Generic Magic Cap Perk III', GameMode.EVIL, 0, [[Stat.MAGIC_CAP, 0.3]]),
    new Perk(80, 'fasterNGUEnergyIII', 'Faster NGU Energy III', GameMode.EVIL, 0, [[Stat.ENERGY_NGU_SPEED, 0.3]]),
    new Perk(81, 'fasterNGUMagicIII', 'Faster NGU Magic III', GameMode.EVIL, 0, [[Stat.MAGIC_NGU_SPEED, 0.3]]),
    new Perk(82, 'statBoostforRichPerksIII', 'Stat Boost for Rich Perks III', GameMode.EVIL, 0, [[Stat.ATTACK, 1], [Stat.DEFENSE, 1]]),
    new Perk(83, 'adventureBoostForRichPerksII', 'Adventure Boost For Rich Perks II', GameMode.EVIL, 0, [[Stat.POWER, 0.1], [Stat.TOUGHNESS, 0.1], [Stat.HEALTH, 0.1], [Stat.REGEN, 0.1]]),
    new Perk(84, 'ironPillAlsoSucks', '"Iron Pill Also Sucks 1/5"', GameMode.EVIL, 0, []),
    new Perk(85, 'ironPillStillSucks', '"Iron Pill Still Sucks 1/5"', GameMode.EVIL, 0, []),
    new Perk(86, 'daycareSlot!c:', 'Daycare Slot! c:', GameMode.EVIL, 0, []),
    new Perk(87, 'notSoMinorAnymore', 'Not So Minor Anymore', GameMode.EVIL, 0, []),
    new Perk(88, 'anotherMacGuffinSlot!', 'Another MacGuffin Slot!', GameMode.EVIL, 0, []),
    new Perk(89, 'betterQPRewards!', 'Better QP Rewards!', GameMode.EVIL, 0, [[Stat.QUEST_REWARD, 0.2]]),
    new Perk(90, 'improvedQuestLooting', 'Improved Quest Looting', GameMode.EVIL, 0, [[Stat.QUEST_DROP, 0.5]]),
    new Perk(91, 'advancedGooderIdleQuesting', 'Advanced Gooder Idle Questing', GameMode.EVIL, 0, []),
    new Perk(92, 'evenMoreAdvancedGooderIdleQuesting', 'Even More Advanced Gooder Idle Questing', GameMode.EVIL, 0, []),
    new Perk(93, 'spawnFasterDammit', 'SPAWN FASTER DAMMIT', GameMode.EVIL, 0, [[Stat.RESPAWN, -0.1]]),
    new Perk(94, 'fibonacciPerk', 'Fibonacci Perk', GameMode.NORMAL, 0, []),
    new Perk(95, 'genericResource3PowerPerkI', 'Generic Resource 3 Power Perk I', GameMode.EVIL, 0, [[Stat.RES3_POWER, 1]]),
    new Perk(96, 'genericResource3BarPerkI', 'Generic Resource 3 Bar Perk I', GameMode.EVIL, 0, [[Stat.RES3_BARS, 1]]),
    new Perk(97, 'genericResource3CapPerkI', 'Generic Resource 3 Cap Perk I', GameMode.EVIL, 0, [[Stat.RES3_CAP, 1]]),
    new Perk(98, 'genericResource3PowerPerkII', 'Generic Resource 3 Power Perk II', GameMode.EVIL, 0, [[Stat.RES3_POWER, 1]]),
    new Perk(99, 'genericResource3BarPerkII', 'Generic Resource 3 Bar Perk II', GameMode.EVIL, 0, [[Stat.RES3_BARS, 1]]),
    new Perk(100, 'genericResource3CapPerkII', 'Generic Resource 3 Cap Perk II ', GameMode.EVIL, 0, [[Stat.RES3_CAP, 1]]),
    new Perk(101, 'genericResource3PowerPerkIII', 'Generic Resource 3 Power Perk III', GameMode.EVIL, 0, [[Stat.RES3_POWER, 1]]),
    new Perk(102, 'genericResource3BarPerkIII', 'Generic Resource 3 Bar Perk III ', GameMode.EVIL, 0, [[Stat.RES3_BARS, 1]]),
    new Perk(103, 'genericResource3CapPerkIII', 'Generic Resource 3 Cap Perk III', GameMode.EVIL, 0, [[Stat.RES3_CAP, 1]]),
    new Perk(104, 'trulyIdleQuesting', 'Truly Idle Questing', GameMode.NORMAL, 0, []),
    new Perk(105, 'gooderIdleQuesting', 'Gooder Idle Questing', GameMode.NORMAL, 0, []),
    new Perk(106, 'anotherGooderIdleQuesting', 'Another Gooder Idle Questing', GameMode.EVIL, 0, []),
    new Perk(107, 'boostedBoostsIII', 'Boosted Boosts III ', GameMode.EVIL, 0, [[Stat.BOOSTS_BOOST, 2]]),
    new Perk(108, 'fasterWishesI', 'Faster Wishes I', GameMode.EVIL, 0, [[Stat.WISH_SPEED, 0.2]]),
    new Perk(109, 'minimumWishTimeReductionI', 'Minimum Wish Time Reduction I', GameMode.EVIL, 0, []),
    new Perk(110, 'minimumWishTimeReductionII', 'Minimum Wish Time Reduction II', GameMode.EVIL, 0, []),
    new Perk(111, 'anInventoryMergeSlot', 'An Inventory Merge Slot', GameMode.NORMAL, 0, []),
    new Perk(112, 'anotherInventoryMergeSlot', 'Another Inventory Merge Slot', GameMode.EVIL, 0, []),
    new Perk(113, 'adventureHackMilestoneReducesI', 'Adventure Hack Milestone Reduces I', GameMode.EVIL, 0, []),
    new Perk(114, 'bloodHackMilestoneReducesI', 'Blood Hack Milestone Reduces I', GameMode.EVIL, 0, []),
    new Perk(115, 'daycareHackMilestoneReducesI', 'Daycare Hack Milestone Reduces I', GameMode.EVIL, 0, []),
    new Perk(116, 'genericEnergyPowerPerkIV', 'Generic Energy Power Perk IV', GameMode.EVIL, 0, [[Stat.ENERGY_POWER, 0.2]]),
    new Perk(117, 'genericEnergyBarPerkIV', 'Generic Energy Bar Perk IV', GameMode.EVIL, 0, [[Stat.ENERGY_BARS, 0.2]]),
    new Perk(118, 'genericEnergyCapPerkIV', 'Generic Energy Cap Perk IV', GameMode.EVIL, 0, [[Stat.ENERGY_CAP, 0.2]]),
    new Perk(119, 'genericMagicPowerPerkIV', 'Generic Magic Power Perk IV', GameMode.EVIL, 0, [[Stat.MAGIC_POWER, 0.2]]),
    new Perk(120, 'genericMagicBarPerkIV', 'Generic Magic Bar Perk IV', GameMode.EVIL, 0, [[Stat.MAGIC_BARS, 0.2]]),
    new Perk(121, 'genericMagicCapPerkIV', 'Generic Magic Cap Perk IV', GameMode.EVIL, 0, [[Stat.MAGIC_CAP, 0.2]]),
    new Perk(122, 'genericResource3PowerPerkIV', 'Generic Resource 3 Power Perk IV', GameMode.EVIL, 0, [[Stat.RES3_POWER, 1]]),
    new Perk(123, 'genericResource3BarPerkIV', 'Generic Resource 3 Bar Perk IV', GameMode.EVIL, 0, [[Stat.RES3_BARS, 1]]),
    new Perk(124, 'genericResource3CapPerkIV', 'Generic Resource 3 Cap Perk IV', GameMode.EVIL, 0, [[Stat.RES3_CAP, 1]]),
    new Perk(125, 'welcometoEvilDifficulty', 'Welcome to Evil Difficulty', GameMode.EVIL, 0, [[Stat.ATTACK, 200], [Stat.DEFENSE, 200], [Stat.DROP_CHANCE, 50]]),
    new Perk(126, 'genericEnergyPowerPerkV', 'Generic Energy Power Perk V', GameMode.SADISTIC, 0, [[Stat.ENERGY_POWER, 0.2]]),
    new Perk(127, 'genericEnergyBarPerkV', 'Generic Energy Bar Perk V', GameMode.SADISTIC, 0, [[Stat.ENERGY_BARS, 0.1]]),
    new Perk(128, 'genericEnergyCapPerkV', 'Generic Energy Cap Perk V', GameMode.SADISTIC, 0, [[Stat.ENERGY_CAP, 0.1]]),
    new Perk(129, 'genericMagicPowerPerkV', 'Generic Magic Power Perk V', GameMode.SADISTIC, 0, [[Stat.MAGIC_POWER, 0.2]]),
    new Perk(130, 'genericMagicBarPerkV', 'Generic Magic Bar Perk V', GameMode.SADISTIC, 0, [[Stat.MAGIC_BARS, 0.1]]),
    new Perk(131, 'genericMagicCapPerkV', 'Generic Magic Cap Perk V', GameMode.SADISTIC, 0, [[Stat.MAGIC_CAP, 0.1]]),
    new Perk(132, 'genericResource3PowerPerkV', 'Generic Resource 3 Power Perk V', GameMode.SADISTIC, 0, [[Stat.RES3_POWER, 1]]),
    new Perk(133, 'genericResource3BarPerkV', 'Generic Resource 3 Bar Perk V', GameMode.SADISTIC, 0, [[Stat.RES3_BARS, 0.5]]),
    new Perk(134, 'genericResource3CapPerkV', 'Generic Resource 3 Cap Perk V', GameMode.SADISTIC, 0, [[Stat.RES3_CAP, 0.5]]),
    new Perk(135, 'genericEnergyPowerPerkVI', 'Generic Energy Power Perk VI', GameMode.SADISTIC, 0, [[Stat.ENERGY_POWER, 0.2]]),
    new Perk(136, 'genericEnergyBarPerkVI', 'Generic Energy Bar Perk VI', GameMode.SADISTIC, 0, [[Stat.ENERGY_BARS, 0.1]]),
    new Perk(137, 'genericEnergyCapPerkVI', 'Generic Energy Cap Perk VI', GameMode.SADISTIC, 0, [[Stat.ENERGY_CAP, 0.1]]),
    new Perk(138, 'genericMagicPowerPerkVI', 'Generic Magic Power Perk VI', GameMode.SADISTIC, 0, [[Stat.MAGIC_POWER, 0.2]]),
    new Perk(139, 'genericMagicBarPerkVI', 'Generic Magic Bar Perk VI', GameMode.SADISTIC, 0, [[Stat.MAGIC_BARS, 0.1]]),
    new Perk(140, 'genericMagicCapPerkVI', 'Generic Magic Cap Perk VI', GameMode.SADISTIC, 0, [[Stat.MAGIC_CAP, 0.1]]),
    new Perk(141, 'genericResource3PowerPerkVI', 'Generic Resource 3 Power Perk VI', GameMode.SADISTIC, 0, [[Stat.RES3_POWER, 1]]),
    new Perk(142, 'genericResource3BarPerkVI', 'Generic Resource 3 Bar Perk VI', GameMode.SADISTIC, 0, [[Stat.RES3_BARS, 0.5]]),
    new Perk(143, 'genericResource3CapPerkVI', 'Generic Resource 3 Cap Perk VI', GameMode.SADISTIC, 0, [[Stat.RES3_CAP, 0.5]]),
    new Perk(144, 'welcometoSadisticDifficulty', 'Welcome to Sadistic Difficulty', GameMode.SADISTIC, 0, [[Stat.ATTACK, 1000], [Stat.DEFENSE, 1000], [Stat.POWER, 15], [Stat.TOUGHNESS, 15], [Stat.HEALTH, 15], [Stat.REGEN, 15], [Stat.ENERGY_NGU_SPEED, 20], [Stat.MAGIC_NGU_SPEED, 20], [Stat.AUGMENT_SPEED, 20],]), //  <- Doesn't show up in stat breakdown for some reason
    new Perk(145, 'bonusQuestHandinProgessI', 'Bonus Quest Handin Progess I', GameMode.EVIL, 0, []),
    new Perk(146, 'bonusQuestHandinProgessII', 'Bonus Quest Handin Progess II', GameMode.EVIL, 0, []),
    new Perk(147, 'improvedMajorQuestQPRewards', 'Improved Major Quest QP Rewards', GameMode.SADISTIC, 0, []),
    new Perk(148, 'improvedMinorQuestQPRewards', 'Improved Minor Quest QP Rewards', GameMode.SADISTIC, 0, []),
    new Perk(149, 'statBoostforrichPerksIV', 'Stat Boost for rich Perks IV', GameMode.EVIL, 0, [[Stat.ATTACK, 1], [Stat.DEFENSE, 1]]),
    new Perk(150, 'adventureBoostForRichPerksIII', 'Adventure Boost For Rich Perks III', GameMode.EVIL, 0, [[Stat.POWER, 0.05], [Stat.TOUGHNESS, 0.05], [Stat.HEALTH, 0.05], [Stat.REGEN, 0.05]]),
    new Perk(151, 'statBoostforrichPerksV', 'Stat Boost for rich Perks V', GameMode.SADISTIC, 0, [[Stat.ATTACK, 1], [Stat.DEFENSE, 1]]),
    new Perk(152, 'adventureBoostForRichPerksIV', 'Adventure Boost For Rich Perks IV', GameMode.SADISTIC, 0, [[Stat.POWER, 0.05], [Stat.TOUGHNESS, 0.05], [Stat.HEALTH, 0.05], [Stat.REGEN, 0.05]]),
    new Perk(153, 'statBoostforrichPerksVI', 'Stat Boost for rich Perks VI', GameMode.SADISTIC, 0, [[Stat.ATTACK, 1], [Stat.DEFENSE, 1]]),
    new Perk(154, 'adventureBoostForRichPerksV', 'Adventure Boost For Rich Perks V', GameMode.SADISTIC, 0, [[Stat.POWER, 0.05], [Stat.TOUGHNESS, 0.05], [Stat.HEALTH, 0.05], [Stat.REGEN, 0.05]]),
    new Perk(155, 'fasterWishesII', 'Faster Wishes II', GameMode.EVIL, 0, [[Stat.WISH_SPEED, 0.1]]),
    new Perk(156, 'fasterWishesIII', 'Faster Wishes III', GameMode.EVIL, 0, [[Stat.WISH_SPEED, 0.1]]),
    new Perk(157, 'improvedSadisticBossMultiplierI', 'Improved Sadistic Boss Multiplier I', GameMode.SADISTIC, 0, []),
    new Perk(158, 'improvedSadisticBossMultiplierII', 'Improved Sadistic Boss Multiplier II', GameMode.SADISTIC, 0, []),
    new Perk(159, 'fasterWishesIV', 'Faster Wishes IV', GameMode.SADISTIC, 0, [[Stat.WISH_SPEED, 0.1]]),
    new Perk(160, 'fasterWishesV', 'Faster Wishes V', GameMode.SADISTIC, 0, [[Stat.WISH_SPEED, 0.1]]),
    new Perk(161, 'augmentCardTierUpI', 'Augment Card Tier Up I', GameMode.EVIL, 0, []),
    new Perk(162, 'goldDropCardTierUpI', 'Gold Drop Card Tier Up I', GameMode.EVIL, 0, []),
    new Perk(163, 'wishesCardTierUpI', 'Wishes Card Tier Up I', GameMode.EVIL, 0, []),
    new Perk(164, 'a/DCardTierUpI', 'A/D Card Tier Up I', GameMode.EVIL, 0, []),
    new Perk(165, 'magicNGUCardTierUpI', 'Magic NGU Card Tier Up I', GameMode.EVIL, 0, []),
    new Perk(166, 'tMCardTierUpI', 'TM Card Tier Up I', GameMode.EVIL, 0, []),
    new Perk(167, 'qPCardTierUpI', 'QP Card Tier Up I', GameMode.EVIL, 0, []),
    new Perk(168, 'daycareCardTierUpI', 'Daycare Card Tier Up I', GameMode.EVIL, 0, []),
    new Perk(169, 'energyNGUCardTierUpI', 'Energy NGU Card Tier Up I', GameMode.EVIL, 0, []),
    new Perk(170, 'dropChanceCardTierUpI', 'Drop Chance Card Tier Up I', GameMode.EVIL, 0, []),
    new Perk(171, 'wandoosCardTierUpI', 'Wandoos Card Tier Up I', GameMode.EVIL, 0, []),
    new Perk(172, 'adventureStatsCardTierUpI', 'Adventure Stats Card Tier Up I', GameMode.EVIL, 0, []),
    new Perk(173, 'hacksCardTierUpI', 'Hacks Card Tier Up I', GameMode.EVIL, 0, []),
    new Perk(174, 'augmentCardTierUpII', 'Augment Card Tier Up II', GameMode.SADISTIC, 0, []),
    new Perk(175, 'goldDropCardTierUpII', 'Gold Drop Card Tier Up II', GameMode.SADISTIC, 0, []),
    new Perk(176, 'wishesCardTierUpII', 'Wishes Card Tier Up II', GameMode.SADISTIC, 0, []),
    new Perk(177, 'a/DCardTierUpII', 'A/D Card Tier Up II', GameMode.SADISTIC, 0, []),
    new Perk(178, 'magicNGUCardTierUpII', 'Magic NGU Card Tier Up II', GameMode.SADISTIC, 0, []),
    new Perk(179, 'tMCardTierUpII', 'TM Card Tier Up II', GameMode.SADISTIC, 0, []),
    new Perk(180, 'qPCardTierUpII', 'QP Card Tier Up II', GameMode.SADISTIC, 0, []),
    new Perk(181, 'daycareCardTierUpII', 'Daycare Card Tier Up II', GameMode.SADISTIC, 0, []),
    new Perk(182, 'energyNGUCardTierUpII', 'Energy NGU Card Tier Up II', GameMode.SADISTIC, 0, []),
    new Perk(183, 'dropChanceCardTierUpII', 'Drop Chance Card Tier Up II', GameMode.SADISTIC, 0, []),
    new Perk(184, 'wandoosCardTierUpII', 'Wandoos Card Tier Up II', GameMode.SADISTIC, 0, []),
    new Perk(185, 'adventureStatsCardTierUpII', 'Adventure Stats Card Tier Up II', GameMode.SADISTIC, 0, []),
    new Perk(186, 'hacksCardTierUpII', 'Hacks Card Tier Up II', GameMode.SADISTIC, 0, []),
    new Perk(187, 'augmentCardTierUpIII', 'Augment Card Tier Up III', GameMode.SADISTIC, 0, []),
    new Perk(188, 'goldDropCardTierUpIII', 'Gold Drop Card Tier Up III', GameMode.SADISTIC, 0, []),
    new Perk(189, 'wishesCardTierUpIII', 'Wishes Card Tier Up III', GameMode.SADISTIC, 0, []),
    new Perk(190, 'a/DCardTierUpIII', 'A/D Card Tier Up III', GameMode.SADISTIC, 0, []),
    new Perk(191, 'magicNGUCardTierUpIII', 'Magic NGU Card Tier Up III', GameMode.SADISTIC, 0, []),
    new Perk(192, 'tMCardTierUpIII', 'TM Card Tier Up III', GameMode.SADISTIC, 0, []),
    new Perk(193, 'qPCardTierUpIII', 'QP Card Tier Up III', GameMode.SADISTIC, 0, []),
    new Perk(194, 'daycareCardTierUpIII', 'Daycare Card Tier Up III', GameMode.SADISTIC, 0, []),
    new Perk(195, 'energyNGUCardTierUpIII', 'Energy NGU Card Tier Up III', GameMode.SADISTIC, 0, []),
    new Perk(196, 'dropChanceCardTierUpIII', 'Drop Chance Card Tier Up III', GameMode.SADISTIC, 0, []),
    new Perk(197, 'wandoosCardTierUpIII', 'Wandoos Card Tier Up III', GameMode.SADISTIC, 0, []),
    new Perk(198, 'adventureStatsCardTierUpIII', 'Adventure Stats Card Tier Up III', GameMode.SADISTIC, 0, []),
    new Perk(199, 'hacksCardTierUpIII', 'Hacks Card Tier Up III', GameMode.SADISTIC, 0, []),
    new Perk(200, 'fasterCardGenerationI', 'Faster Card Generation I', GameMode.EVIL, 0, [[Stat.CARD_SPEED, 0.5]]),
    new Perk(201, 'fasterMayoGenerationI', 'Faster Mayo Generation I', GameMode.EVIL, 0, [[Stat.MAYO_SPEED, 0.5]]),
    new Perk(202, 'fasterCardGenerationII', 'Faster Card Generation II', GameMode.SADISTIC, 0, [[Stat.CARD_SPEED, 0.4]]),
    new Perk(203, 'fasterMayoGenerationII', 'Faster Mayo Generation II', GameMode.SADISTIC, 0, [[Stat.CARD_SPEED, 0.4]]),
    new Perk(204, 'fasterCardGenerationIII', 'Faster Card Generation III', GameMode.SADISTIC, 0, [[Stat.CARD_SPEED, 0.3]]),
    new Perk(205, 'fasterMayoGenerationIII', 'Faster Mayo Generation III', GameMode.SADISTIC, 0, [[Stat.MAYO_SPEED, 0.3]]),
    new Perk(206, 'fasterCardGenerationIV', 'Faster Card Generation IV', GameMode.SADISTIC, 0, [[Stat.CARD_SPEED, 0.3]]),
    new Perk(207, 'fasterMayoGenerationIV', 'Faster Mayo Generation IV', GameMode.SADISTIC, 0, [[Stat.MAYO_SPEED, 0.3]]),
    new Perk(208, 'biggerDeckSizeI', 'Bigger Deck Size I', GameMode.EVIL, 0, []),
    new Perk(209, 'biggerDeckSizeII', 'Bigger Deck Size II', GameMode.SADISTIC, 0, []),
    new Perk(210, 'biggerDeckSizeIII', 'Bigger Deck Size III', GameMode.SADISTIC, 0, []),
    new Perk(211, 'extraMayoGenerator!', 'Extra Mayo Generator!', GameMode.EVIL, 0, [[Stat.MAYO_GENERATOR, 1]]),
    new Perk(212, 'betterTagsI', 'Better Tags I', GameMode.EVIL, 0, [[Stat.TAG_EFFECT, 0.05]]),
    new Perk(213, 'betterTagsII', 'Better Tags II', GameMode.SADISTIC, 0, [[Stat.TAG_EFFECT, 0.04]]),
    new Perk(214, 'betterTagsIII', 'Better Tags III', GameMode.SADISTIC, 0, [[Stat.TAG_EFFECT, 0.04]]),
    new Perk(215, 'betterTagsIV', 'Better Tags IV', GameMode.SADISTIC, 0, [[Stat.TAG_EFFECT, 0.04]]),
    new Perk(216, 'cardRecycling:CardSpawn', 'Card Recycling: Card Spawn', GameMode.SADISTIC, 0, []),
    new Perk(217, 'dropChanceHackMilestoneReducerI', 'Drop Chance Hack Milestone Reducer I', GameMode.SADISTIC, 0, []),
    new Perk(218, 'augmentsHackMilestoneReducerI', 'Augments Hack Milestone Reducer I', GameMode.SADISTIC, 0, []),
    new Perk(219, 'magicNGUHackMilestoneReducerI', 'Magic NGU Hack Milestone Reducer I', GameMode.SADISTIC, 0, []),
    new Perk(220, 'theFinalGenericEnergyPowerPerk', 'The Final Generic Energy Power Perk', GameMode.SADISTIC, 0, [[Stat.ENERGY_POWER, 1]]),
    new Perk(221, 'theFinalGenericEnergyBarPerk', 'The Final Generic Energy Bar Perk', GameMode.SADISTIC, 0, [[Stat.ENERGY_BARS, 1]]),
    new Perk(222, 'theFinalGenericEnergyCapPerk', 'The Final Generic Energy Cap Perk', GameMode.SADISTIC, 0, [[Stat.ENERGY_CAP, 1]]),
    new Perk(223, 'theFinalGenericMagicPowerPerk', 'The Final Generic Magic Power Perk', GameMode.SADISTIC, 0, [[Stat.MAGIC_POWER, 1]]),
    new Perk(224, 'theFinalGenericMagicBarPerk', 'The Final Generic Magic Bar Perk', GameMode.SADISTIC, 0, [[Stat.MAGIC_BARS, 1]]),
    new Perk(225, 'theFinalGenericMagicCapPerk', 'The Final Generic Magic Cap Perk', GameMode.SADISTIC, 0, [[Stat.MAGIC_CAP, 1]]),
    new Perk(226, 'theFinalGenericResource3PowerPerk', 'The Final Generic Resource 3 Power Perk', GameMode.SADISTIC, 0, [[Stat.RES3_POWER, 1]]),
    new Perk(227, 'theFinalGenericResource3BarPerk', 'The Final Generic Resource 3 Bar Perk', GameMode.SADISTIC, 0, [[Stat.RES3_BARS, 1]]),
    new Perk(228, 'theFinalGenericResource3CapPerk', 'The Final Generic Resource 3 Cap Perk', GameMode.SADISTIC, 0, [[Stat.RES3_CAP, 1]]),
    new Perk(229, 'boostedBoostsIV', 'Boosted Boosts IV', GameMode.SADISTIC, 0, [[Stat.BOOSTS_BOOST, 1]]),
    new Perk(230, 'boostedBoostsV', 'Boosted Boosts V', GameMode.SADISTIC, 0, [[Stat.BOOSTS_BOOST, 1]]),
    new Perk(231, 'eRROR', 'ERROR', GameMode.SADISTIC, 0, []),
]

export const PERKS = new ResourceContainer(PERKLIST);