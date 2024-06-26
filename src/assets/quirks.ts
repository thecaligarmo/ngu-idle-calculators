import { GameMode } from "./mode";
import Resource, { ResourceContainer } from "./resource"
import { Stat } from "./stat"

export class Quirk  extends Resource {
    updateStats() {
        for (var prop of Object.keys(this.base)) {
            this[prop] = (this.level > 0) ?  this.base[prop] * this.level : 0
        }
    }
}

// TODO - Finish adding all the Quirks


export const QUIRKLIST = [
    new Quirk(0, 'babysFirstQuirk:EnergyPower', 'Baby\'s First Quirk: Energy Power', GameMode.NORMAL, 1, [[Stat.ENERGY_POWER, 10],]),
    new Quirk(1, 'babysFirstQuirk:EnergyCap','Baby\'s First Quirk: Energy Cap', GameMode.NORMAL, 1, [[Stat.ENERGY_CAP, 10],]),
    new Quirk(2, 'babysFirstQuirk:EnergyBars', 'Baby\'s First Quirk: Energy Bars', GameMode.NORMAL, 1, [[Stat.ENERGY_BARS, 10],]),
    new Quirk(3, 'babysFirstQuirk:MagicPower', 'Baby\'s First Quirk: Magic Power', GameMode.NORMAL, 1, [[Stat.MAGIC_POWER, 10],]),
    new Quirk(4, 'babysFirstQuirk:MagicCap','Baby\'s First Quirk: Magic Cap', GameMode.NORMAL, 1, [[Stat.MAGIC_CAP, 10],]),
    new Quirk(5, 'babysFirstQuirk:MagicBars', 'Baby\'s First Quirk: Magic Bars', GameMode.NORMAL, 1, [[Stat.MAGIC_BARS, 10],]),
    new Quirk(6, 'babysFirstQuirk:Adventure', 'Baby\'s First Quirk: Adventure', GameMode.NORMAL, 1, [[Stat.POWER, 25],[Stat.TOUGHNESS, 25],]),
    new Quirk(7, 'statBoostForRichQuirksI', 'Stat Boost For Rich Quirks I', GameMode.NORMAL, 1, [[Stat.ATTACK, 1], [Stat.DEFENSE, 1]]),
    new Quirk(8, 'adventureBoostForRichQuirksI', 'Adventure Boost For Rich Quirks I', GameMode.NORMAL, 1, [[Stat.POWER, 0.1], [Stat.TOUGHNESS, 0.1]]),
    new Quirk(9, 'gOOOOOLLLLLLLLLLLD!', 'GOOOOOLLLLLLLLLLLD!', GameMode.NORMAL, 1, [[Stat.GOLD_DROP, 10]]),
    new Quirk(10, 'theBeastsSpecialBeardTonic', 'The Beast\'s Special Beard Tonic', GameMode.NORMAL, 1, [[Stat.MAGIC_BEARD_SPEED, 1], [Stat.ENERGY_BEARD_SPEED, 1]]),
    new Quirk(11, 'beastedBoostsI', 'Beasted Boosts I', GameMode.NORMAL, 1, [[Stat.BOOSTS_BOOST, 1]]),
    new Quirk(12, 'theBeastsSeed)', 'The Beast\'s Seed ;)', GameMode.NORMAL, 1, []),
    new Quirk(13, 'theBeasts Fertilizer', 'The Beast\'s Fertilizer', GameMode.NORMAL, 1, []),
    new Quirk(14, 'theBeastNGUQuirkEver', 'The Beast NGU Quirk Ever ', GameMode.EVIL, 1, []),
    new Quirk(15, 'energyWandoosBEAST-a', 'Energy Wandoos BEAST-a ', GameMode.EVIL, 1, [[Stat.ENERGY_WANDOOS_SPEED, 2]]),
    new Quirk(16, 'magicWandoosBEAST-a', 'Magic Wandoos BEAST-a ', GameMode.EVIL, 1, [[Stat.MAGIC_WANDOOS_SPEED, 2]]),
    new Quirk(17, 'superAdvancedBeastTraining!', 'Super Advanced Beast Training! ', GameMode.EVIL, 1, []),
    new Quirk(18, 'accessorySlot!', 'Accessory Slot! ', GameMode.EVIL, 1, []),
    new Quirk(19, 'macGuffinSlot!', 'MacGuffin Slot!', GameMode.NORMAL, 1, []),
    new Quirk(20, 'adv.TrainingLevelBankI', 'Adv. Training Level Bank I', GameMode.NORMAL, 1, []),
    new Quirk(21, 'adv.TrainingLevelBankII', 'Adv. Training Level Bank II', GameMode.NORMAL, 1, []),
    new Quirk(22, 'adv.TrainingLevelBankIII', 'Adv. Training Level Bank III ', GameMode.EVIL, 1, []),
    new Quirk(23, 'adv.TrainingLevelBankIV', 'Adv. Training Level Bank IV ', GameMode.EVIL, 1, []),
    new Quirk(24, 'adv.TrainingLevelBankV', 'Adv. Training Level Bank V ', GameMode.EVIL, 1, []),
    new Quirk(25, 'timeMachineLevelBankI', 'Time Machine Level Bank I', GameMode.NORMAL, 1, []),
    new Quirk(26, 'timeMachineLevelBankII', 'Time Machine Level Bank II', GameMode.NORMAL, 1, []),
    new Quirk(27, 'timeMachineLevelBankIII', 'Time Machine Level Bank III ', GameMode.EVIL, 1, []),
    new Quirk(28, 'timeMachineLevelBankIV', 'Time Machine Level Bank IV ', GameMode.EVIL, 1, []),
    new Quirk(29, 'timeMachineLevelBankV', 'Time Machine Level Bank V ', GameMode.EVIL, 1, []),
    new Quirk(30, 'beardTempLevelBankI', 'Beard Temp Level Bank I', GameMode.NORMAL, 1, []),
    new Quirk(31, 'beardTempLevelBankII', 'Beard Temp Level Bank II', GameMode.NORMAL, 1, []),
    new Quirk(32, 'beardTempLevelBankIII', 'Beard Temp Level Bank III ', GameMode.EVIL, 1, []),
    new Quirk(33, 'beardTempLevelBankIV', 'Beard Temp Level Bank IV ', GameMode.EVIL, 1, []),
    new Quirk(34, 'beardTempLevelBankV', 'Beard Temp Level Bank V ', GameMode.EVIL, 1, []),
    new Quirk(35, 'genericEnergyPowerQuirkI', 'Generic Energy Power Quirk I', GameMode.NORMAL, 1, [[Stat.ENERGY_POWER, 1]]),
    new Quirk(36, 'genericEnergyCapQuirkI', 'Generic Energy Cap Quirk I', GameMode.NORMAL, 1, [[Stat.ENERGY_CAP, 1]]),
    new Quirk(37, 'genericEnergyBarsQuirkI', 'Generic Energy Bars Quirk I', GameMode.NORMAL, 1, [[Stat.ENERGY_BARS, 1]]),
    new Quirk(38, 'genericMagicPowerQuirkI', 'Generic Magic Power Quirk I', GameMode.NORMAL, 1, [[Stat.MAGIC_POWER, 1]]),
    new Quirk(39, 'genericMagicCapQuirkI', 'Generic Magic Cap Quirk I', GameMode.NORMAL, 1, [[Stat.MAGIC_CAP, 1]]),
    new Quirk(40, 'genericMagicBarsQuirkI', 'Generic Magic Bars Quirk I', GameMode.NORMAL, 1, [[Stat.MAGIC_BARS, 1]]),
    new Quirk(41, 'genericEnergyPowerQuirkII', 'Generic Energy Power Quirk II ', GameMode.EVIL, 1, [[Stat.ENERGY_POWER, 1]]),
    new Quirk(42, 'genericEnergyCapQuirkII', 'Generic Energy Cap Quirk II ', GameMode.EVIL, 1, [[Stat.ENERGY_CAP, 1]]),
    new Quirk(43, 'genericEnergyBarsQuirkII', 'Generic Energy Bars Quirk II ', GameMode.EVIL, 1, [[Stat.ENERGY_BARS, 1]]),
    new Quirk(44, 'genericMagicPowerQuirkII', 'Generic Magic Power Quirk II ', GameMode.EVIL, 1, [[Stat.MAGIC_POWER, 1]]),
    new Quirk(45, 'genericMagicCapQuirkII', 'Generic Magic Cap Quirk II ', GameMode.EVIL, 1, [[Stat.MAGIC_CAP, 1]]),
    new Quirk(46, 'genericMagicBarsQuirkII', 'Generic Magic Bars Quirk II ', GameMode.EVIL, 1, [[Stat.MAGIC_BARS, 1]]),
    // new Quirk(47, 'genericResource3PowerQuirkI', 'Generic Resource 3 Power Quirk I ', GameMode.EVIL, 1, [Each level in this Quirk adds a 1% boost to your Resource 3 Power! Or whatever you called it, you maniac.]),
    // new Quirk(48, 'genericResource3CapQuirkI', 'Generic Resource 3 Cap Quirk I ', GameMode.EVIL, 1, [Each level in this Quirk adds a 1% boost to your Resource 3 Cap!]),
    // new Quirk(49, 'genericResource3BarsQuirkI', 'Generic Resource 3 Bars Quirk I ', GameMode.EVIL, 1, [Each level in this Quirk adds a 1% boost to your Resource 3 Bars!]),
    // new Quirk(50, 'anotherMacGuffinSlot!', 'Another MacGuffin Slot! ', GameMode.EVIL, 1, [With this quirk you'll get... *checks notes* ... another MacGuffin Slot! Not surprising at this point, TBH.]),
    // new Quirk(51, 'statBoostForRichQuirksII', 'Stat Boost For Rich Quirks II ', GameMode.EVIL, 1, [Only for the truly richest of Quirks. Improve your Attack/Defense by 2% per level!]),
    // new Quirk(52, 'adventureBoostForRichQuirksII', 'Adventure Boost For Rich Quirks II ', GameMode.EVIL, 1, [Only for the truly richest of Quirks. Improve your Adventure stats by 0.1% per level!]),
    // new Quirk(53, 'beastedBoostsII', 'Beasted Boosts II ', GameMode.EVIL, 1, [The Beast just can't get enough of squirting random fluids onto boosts!  Gain 2% better boosts per level of this quirk!]),
    // new Quirk(54, 'lowerMinimumWishSpeed?', 'Lower Minimum Wish Speed?', GameMode.EVIL, 1, [Using the powers of regurgitation, The Beast will reduce the minimum wish completion time by 24 seconds per level! This time is normally 4 hours.]),
    // new Quirk(55, 'anInventoryAutomergeSlot!', 'An Inventory Automerge Slot!', GameMode.EVIL, 1, [The Beast has developed a neat party trick where it eats 2 identical items! In unrelated news this Quirk will unlock an extra inventory [[Adventure Mode Equipment#Automerge slots|merge slot]].]),
    // new Quirk(56, 'aWishSlot!', 'A Wish Slot!', GameMode.EVIL, 1, [The Beast and the Godmother have come to an agreement - if you unlock this really expensive Quirk you can have an extra Wish Slot!]),
    // new Quirk(57, 'atk/DefHackMilestoneReducerI', 'Atk/Def Hack Milestone Reducer I', GameMode.EVIL, 1, [Each level of this quirk reduces the number of hack levels required per milestone by 1! This means more milestone bonuses!]),
    // new Quirk(58, 'pPHackMilestoneReducerI', 'PP Hack Milestone Reducer I', GameMode.EVIL, 1, [Each level of this quirk reduces the number of hack levels required per milestone by 1! This means more milestone bonuses!]),
    // new Quirk(59, 'eXPHackMilestoneReducerI', 'EXP Hack Milestone Reducer I', GameMode.EVIL, 1, [Each level of this quirk reduces the number of hack levels required per milestone by 1! This means more milestone bonuses!]),
    // new Quirk(60, 'wishHackMilestoneReducerI', 'Wish Hack Milestone Reducer I', GameMode.EVIL, 1, [Each level of this quirk reduces the number of hack levels required per milestone by 1! This means more milestone bonuses!]),
    // new Quirk(61, 'genericEnergyPowerQuirkIII', 'Generic Energy Power Quirk III', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.5% boost to your Energy Power!]),
    // new Quirk(62, 'genericEnergyCapQuirkIII', 'Generic Energy Cap Quirk III', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.2% boost to your Energy Cap!]),
    // new Quirk(63, 'genericEnergyBarsQuirkIII', 'Generic Energy Bars Quirk III', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.2% boost to your Energy Bars!]),
    // new Quirk(64, 'genericMagicPowerQuirkIII', 'Generic Magic Power Quirk III', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.5% boost to your Magic Power!]),
    // new Quirk(65, 'genericMagicCapQuirkIII', 'Generic Magic Cap Quirk III', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.2% boost to your Magic Cap!]),
    // new Quirk(66, 'genericMagicBarsQuirkIII', 'Generic Magic Bars Quirk III', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.2% boost to your Magic Bars!]),
    // new Quirk(67, 'genericResource3PowerQuirkII', 'Generic Resource 3 Power Quirk II', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 1% boost to your Resource 3 Power!]),
    // new Quirk(68, 'genericResource3CapQuirkII', 'Generic Resource 3 Cap Quirk II', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.5% boost to your Resource 3 Cap!]),
    // new Quirk(69, 'genericResource3BarsQuirkII', 'Generic Resource 3 Bars Quirk II', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.5% boost to your Resource 3 Bars!]),
    // new Quirk(70, 'improvedBaseITOPODPPP!', 'Improved Base ITOPOD PPP!', GameMode.SADISTIC, 1, [Need to afford those new Sadistic Perks? No better solution to a Sadistic Quirk! Each level adds +10 base PPP to ITOPOD rewards!]),
    // new Quirk(71, 'bonusQuestHandinProgressI', 'Bonus Quest Handin Progress I', GameMode.EVIL, 1, [reduce the level ratio for higher level Quest handins by 1 per level of this Quirk! Originally the formula is 1 + (level/10), rounded down.]),
    // new Quirk(72, 'beastedBoostsIII', 'Beasted Boosts III', GameMode.EVIL, 1, [The Beast REALLY can't get enough of squirting random fluids onto boosts! Gain 1% better boosts per level of this quirk!]),
    // new Quirk(73, 'beastedBoostsIV', 'Beasted Boosts IV', GameMode.SADISTIC, 1, [The Beast has a problem. Gain 0.5% better boosts per level of this quirk!]),
    // new Quirk(74, 'improvedSadisticBossMultiplierI', 'Improved Sadistic Boss Multiplier I', GameMode.SADISTIC, 1, [Each level of this Quirk adds +0.001 to the Sadistic Boss Multiplier. Originally this value is 1.20. A tiny change in this number has a huge difference!]),
    // new Quirk(75, 'improvedSadisticBossMultiplierII', 'Improved Sadistic Boss Multiplier II', GameMode.SADISTIC, 1, [Each level of this Quirk adds another +0.001 to the Sadistic Boss Multiplier. Originally this value is 1.20. A tiny change in this number has a huge difference!]),
    // new Quirk(76, 'statBoostforRichQuirksIII', 'Stat Boost for Rich Quirks III', GameMode.SADISTIC, 1, [Only for the truly richester of Quirks. Improve your Attack/Defense by 1% per level!]),
    // new Quirk(77, 'adventureBoostforRichQuirksIII', 'Adventure Boost for Rich Quirks III', GameMode.SADISTIC, 1, [Only for the truly richester of Quirks. Improve your Adventure stats by 0.03% per level!]),
    // new Quirk(78, 'statBoostforRichQuirksIV', 'Stat Boost for Rich Quirks IV', GameMode.SADISTIC, 1, [Only for the truly richesterest of Quirks. Improve your Attack/Defense by 1% per level!]),
    // new Quirk(79, 'adventureBoostforRichQuirksIV', 'Adventure Boost for Rich Quirks IV', GameMode.SADISTIC, 1, [Only for the truly richesterest of Quirks. Improve your Adventure stats by 0.03% per level!]),
    // new Quirk(80, 'genericEnergyPowerQuirkIV', 'Generic Energy Power Quirk IV', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.5% boost to your Energy Power!]),
    // new Quirk(81, 'genericEnergyCapQuirkIV', 'Generic Energy Cap Quirk IV', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.2% boost to your Energy Cap!]),
    // new Quirk(82, 'genericEnergyBarsQuirkIV', 'Generic Energy Bars Quirk IV', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.2% boost to your Energy Bars!]),
    // new Quirk(83, 'genericMagicPowerQuirkIV', 'Generic Magic Power Quirk IV', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.5% boost to your Magic Power!]),
    // new Quirk(84, 'genericMagicCapQuirkIV', 'Generic Magic Cap Quirk IV', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.2% boost to your Magic Cap!]),
    // new Quirk(85, 'genericMagicBarsQuirkIV', 'Generic Magic Bars Quirk IV', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.2% boost to your Magic Bars!]),
    // new Quirk(86, 'genericResource3PowerQuirkIII', 'Generic Resource 3 Power Quirk III', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 1% boost to your Resource 3 Power!]),
    // new Quirk(87, 'genericResource3CapQuirkIII', 'Generic Resource 3 Cap Quirk III', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.5% boost to your Resource 3 Cap!]),
    // new Quirk(88, 'genericResource3BarsQuirkIII', 'Generic Resource 3 Bars Quirk III', GameMode.SADISTIC, 1, [Each level in this Quirk adds a 0.5% boost to your Resource 3 Bars!]),
    // new Quirk(89, 'anevenBeast-erNGUQuirk', 'An even Beast-er NGU Quirk', GameMode.SADISTIC, 1, [Using secret demonic (and SADISTIC) rituals known only to the Beast, it can grant you the ability to gain 1 level in an Evil NGU every time you gain a level in a Sadistic NGU!]),
    // new Quirk(90, 'evenMoreInventorySpace?', 'Even More Inventory Space?', GameMode.EVIL, 1, [The Beast promises it can stash up to 24 items for you, the only way it knows how... by eating them.]),
    // new Quirk(91, 'betterBloodMagicI', 'Better Blood Magic I', GameMode.SADISTIC, 1, [The Beast knows a LOT about blood, and they can teach you how to produce more of it faster! <s>(+1% per level)</s>]),
    // new Quirk(92, 'evenBetterYggdrasilYields', 'Even Better Yggdrasil Yields', GameMode.SADISTIC, 1, [The solution to growing better Yggdrasil fruits is once again, a cocktail of more random body fluids. <s>(+0.1% per level)</s>]),
    // new Quirk(93, 'fasterEnergyNGUI', 'Faster Energy NGU I', GameMode.SADISTIC, 1, [The Beast just realized they haven't offered to help improve your NGU's for Sadistic Difficulty. That was awfully rude of them. Get this Quirk and you can enjoy 0.4% Faster Energy NGUs!]),
    // new Quirk(94, 'fasterMagicNGUI', 'Faster Magic NGU I', GameMode.SADISTIC, 1, [The Beast just realized they haven't offered to help improve your NGU's for Sadistic Difficulty. That was awfully rude of them. Get this Quirk and you can enjoy 0.4% Faster Magic NGUs!]),
    // new Quirk(95, 'fasterEnergyNGUII', 'Faster Energy NGU II', GameMode.SADISTIC, 1, [This Quirk will improve Energy NGU speeds by 0.3% per level!]),
    // new Quirk(96, 'fasterMagicNGUII', 'Faster Magic NGU II', GameMode.SADISTIC, 1, [This Quirk will improve Magic NGU speeds by 0.3% per level!]),
    // new Quirk(97, 'fasterEnergyNGUIII', 'Faster Energy NGU III', GameMode.SADISTIC, 1, [This Quirk will improve Energy NGU speeds by 0.3% per level!]),
    // new Quirk(98, 'fasterMagicNGUIII', 'Faster Magic NGU III', GameMode.SADISTIC, 1, [This Quirk will improve Magic NGU speeds by 0.3% per level!]),
    // new Quirk(99, 'magicNGUSpeedCardTierUpI', 'Magic NGU Speed Card Tier Up I', GameMode.EVIL, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(100, 'tMCardTierUpI', 'TM Card Tier Up I', GameMode.EVIL, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(101, 'wishesCardTierUpI', 'Wishes Card Tier Up I', GameMode.EVIL, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(102, 'daycareCardTierUpI', 'Daycare Card Tier Up I', GameMode.EVIL, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(103, 'energyNGUSpeedTierUpI', 'Energy NGU Speed Tier Up I', GameMode.EVIL, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(104, 'dropChanceCardTierUpI', 'Drop Chance Card Tier Up I', GameMode.EVIL, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(105, 'wandoosCardTierUpI', 'Wandoos Card Tier Up I', GameMode.EVIL, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(106, 'adventureStatsCardTierUpI', 'Adventure Stats Card Tier Up I', GameMode.EVIL, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(107, 'hacksCardTierUpI', 'Hacks Card Tier Up I', GameMode.EVIL, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(108, 'augmentCardTierUpI', 'Augment Card Tier Up I', GameMode.EVIL, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(109, 'goldDropCardTierUpI', 'Gold Drop Card Tier Up I', GameMode.EVIL, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(110, 'pPCardTierUpI', 'PP Card Tier Up I', GameMode.EVIL, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(111, 'a/DCardTierUpI', 'A/D Card Tier Up I', GameMode.EVIL, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(112, 'magicNGUSpeedCardTierUpII', 'Magic NGU Speed Card Tier Up II', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(113, 'tMCardTierUpII', 'TM Card Tier Up II', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(114, 'wishesCardTierUpII', 'Wishes Card Tier Up II', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(115, 'daycareCardTierUpII', 'Daycare Card Tier Up II', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(116, 'energyNGUSpeedCardTierUpII', 'Energy NGU Speed Card Tier Up II', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(117, 'dropChanceCardTierUpII', 'Drop Chance Card Tier Up II', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(118, 'wandoosCardTierUpII', 'Wandoos Card Tier Up II', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(119, 'adventureStatsCardTierUpII', 'Adventure Stats Card Tier Up II', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(120, 'hacksCardTierUpII', 'Hacks Card Tier Up II', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(121, 'augmentCardTierUpII', 'Augment Card Tier Up II', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(122, 'goldDropCardTierUpII', 'Gold Drop Card Tier Up II', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(123, 'pPCardTierUpII', 'PP Card Tier Up II', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(124, 'a/DCardTierUpII', 'A/D Card Tier Up II', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(125, 'magicNGUSpeedCardTierUpIII', 'Magic NGU Speed Card Tier Up III', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(126, 'tMCardTierUpIII', 'TM Card Tier Up III', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(127, 'wishesCardTierUpIII', 'Wishes Card Tier Up III', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(128, 'daycareCardTierUpIII', 'Daycare Card Tier Up III', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(129, 'energyNGUSpeedCardTierUpIII', 'Energy NGU Speed Card Tier Up III', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(130, 'dropChanceCardTierUpIII', 'Drop Chance Card Tier Up III', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(131, 'wandoosCardTierUpIII', 'Wandoos Card Tier Up III', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(132, 'adventureStatsCardTierUpIII', 'Adventure Stats Card Tier Up III', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(133, 'hacksCardTierUpIII', 'Hacks Card Tier Up III', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(134, 'augmentCardTierUpIII', 'Augment Card Tier Up III', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(135, 'goldDropCardTierUpIII', 'Gold Drop Card Tier Up III', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(136, 'pPCardTierUpIII', 'PP Card Tier Up III', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(137, 'a/DCardTierUpIII', 'A/D Card Tier Up III', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(138, 'fasterCardGenerationI', 'Faster Card Generation I', GameMode.EVIL, 1, [This Quirk will increase Card Generation Speed by 0.5% per level!]),
    // new Quirk(139, 'fasterMayoGenerationI', 'Faster Mayo Generation I', GameMode.EVIL, 1, [This Quirk will increase Mayo Generation Speed by 0.5% per level!]),
    // new Quirk(140, 'fasterCardGenerationII', 'Faster Card Generation II', GameMode.SADISTIC, 1, [This Quirk will increase Card Generation Speed by 0.4% per level!]),
    // new Quirk(141, 'fasterMayoGenerationII', 'Faster Mayo Generation II', GameMode.SADISTIC, 1, [This Quirk will increase Mayo Generation Speed by 0.4% per level!]),
    // new Quirk(142, 'fasterCardGenerationIII', 'Faster Card Generation III', GameMode.SADISTIC, 1, [This Quirk will increase Card Generation Speed by 0.3% per level!]),
    // new Quirk(143, 'fasterMayoGenerationIII', 'Faster Mayo Generation III', GameMode.SADISTIC, 1, [This Quirk will increase Mayo Generation Speed by 0.3% per level!]),
    // new Quirk(144, 'fasterCardGenerationIV', 'Faster Card Generation IV', GameMode.SADISTIC, 1, [This Quirk will increase Card Generation Speed by 0.3% per level!]),
    // new Quirk(145, 'fasterMayoGenerationIV', 'Faster Mayo Generation IV', GameMode.SADISTIC, 1, [This Quirk will increase Mayo Generation Speed by 0.3% per level!]),
    // new Quirk(146, 'biggerDeckI', 'Bigger Deck I', GameMode.EVIL, 1, [The Beast saw this email advertising Deck growth pills and bought some pills for you to try! Each level of this Quirk will add +1 to your max Deck Size.]),
    // new Quirk(147, 'biggerDeckII', 'Bigger Deck II', GameMode.SADISTIC, 1, [Each level of this Quirk will add another +1 max Deck Size.]),
    // new Quirk(148, 'biggerDeckII<s>I</s>', 'Bigger Deck II<s>I</s>', GameMode.SADISTIC, 1, [Each level of this Quirk will add another +1 max Deck Size.]),
    // new Quirk(149, 'bIGCHONKERCARDS', 'BIG CHONKER CARDS', GameMode.SADISTIC, 1, [Even The Beast is in awe at the size of these absolute units. Unlock BIG CHONKER cards with this Quirk]),
    // new Quirk(150, 'extraMayoGenerator!', 'Extra Mayo Generator!', GameMode.SADISTIC, 1, [With this Quirk you can run 1 more Mayo Generator at the same time! There's also a 2% Mayo Speed bonus for no reason!]),
    // new Quirk(151, 'extraTagSlot!', 'Extra Tag Slot!', GameMode.EVIL, 1, [With this Quirk you can have one extra tag active at the same time! Tags help you get the type of cards you actually want!]),
    // new Quirk(152, 'betterTagsI', 'Better Tags I', GameMode.EVIL, 1, [This Quirk improve the effects of tagging card bonuses by 0.05% per level!]),
    // new Quirk(153, 'betterTagsII', 'Better Tags II', GameMode.SADISTIC, 1, [This Quirk improve the effects of tagging card bonuses by 0.04% per level!]),
    // new Quirk(154, 'betterTagsIII', 'Better Tags III', GameMode.SADISTIC, 1, [This Quirk improve the effects of tagging card bonuses by 0.04% per level!]),
    // new Quirk(155, 'betterTagsIV', 'Better Tags IV', GameMode.SADISTIC, 1, [This Quirk improve the effects of tagging card bonuses by 0.04% per level!]),
    // new Quirk(156, 'cardRecycling:Mayo', 'Card Recycling: Mayo', GameMode.SADISTIC, 1, [With this Card Recycling Quirk, you'll gain 20% mayo progress to a random selected Mayo type on the yeeted card!]),
    // new Quirk(157, 'magicNGUSpeedCardTierUpIV', 'Magic NGU Speed Card Tier Up IV', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(158, 'tMCardTierUpIV', 'TM Card Tier Up IV', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(159, 'wishesCardTierUpIV', 'Wishes Card Tier Up IV', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(160, 'daycareCardTierUpIV', 'Daycare Card Tier Up IV', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(161, 'energyNGUSpeedCardTierUpIV', 'Energy NGU Speed Card Tier Up IV', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(162, 'dropChanceCardTierUpIV', 'Drop Chance Card Tier Up IV', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(163, 'wandoosCardTierUpIV', 'Wandoos Card Tier Up IV', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(164, 'adventureStatsCardTierUpIV', 'Adventure Stats Card Tier Up IV', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(165, 'hacksCardTierUpIV', 'Hacks Card Tier Up IV', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(166, 'augmentCardTierUpIV', 'Augment Card Tier Up IV', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(167, 'goldDropCardTierUpIV', 'Gold Drop Card Tier Up IV', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(168, 'pPCardTierUpIV', 'PP Card Tier Up IV', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(169, 'a/DCardTierUpIV', 'A/D Card Tier Up IV', GameMode.SADISTIC, 1, [This Quirk will raise the Tier of all cards with this bonus type by 1!]),
    // new Quirk(170, 'statBoostforRichQuirksV', 'Stat Boost for Rich Quirks V', GameMode.SADISTIC, 1, [Only for the truly richesterester of Quirks. Improve your Attack/Defense by 1% per level!]),
    // new Quirk(171, 'adventureBoostforRichQuirksV', 'Adventure Boost for Rich Quirks V', GameMode.SADISTIC, 1, [Only for the truly richesterester of Quirks. Improve your Adventure stats by 0.03% per level!]),
    // new Quirk(172, 'statBoostforRichQuirksVI', 'Stat Boost for Rich Quirks VI', GameMode.SADISTIC, 1, [Only for the truly richesteresterest of Quirks. Improve your Attack/Defense by 1% per level!]),
    // new Quirk(173, 'adventureBoostforRichQuirksVI', 'Adventure Boost for Rich Quirks VI', GameMode.SADISTIC, 1, [Only for the truly richesteresterest of Quirks. Improve your Adventure stats by 0.03% per level!]),
    // new Quirk(174, 'energyNGUHackMilestonereducerI', 'Energy NGU Hack Milestone reducer I', GameMode.SADISTIC, 1, [Each level of this quirk reduces the number of hack levels required per milestone by 1! This means more milestone bonuses!]),
    // new Quirk(175, 'tMHackMilestonereducerI', 'TM Hack Milestone reducer I', GameMode.SADISTIC, 1, [Each level of this quirk reduces the number of hack levels required per milestone by 1! This means more milestone bonuses!]),
    // new Quirk(176, 'aPROBLEMHASBEENDETECTED', 'A PROBLEM HAS BEEN DETECTED', GameMode.SADISTIC, 1, [YOUR PC RAN INTO A PROBLEM]),
    // new Quirk(177, 'theFinalGenericEnergyPowerQuirk', 'The Final Generic Energy Power Quirk', GameMode.SADISTIC, 1, [Add a 1% Boost to your Energy Power with this Quirk!]),
    // new Quirk(178, 'theFinalGenericEnergyCapQuirk', 'The Final Generic Energy Cap Quirk', GameMode.SADISTIC, 1, [Add a 1% Boost to your Energy Cap with this Quirk!]),
    // new Quirk(179, 'theFinalGenericEnergyBarsQuirk', 'The Final Generic Energy Bars Quirk', GameMode.SADISTIC, 1, [Add a 1% Boost to your Energy Bars with this Quirk!]),
    // new Quirk(180, 'theFinalGenericMagicPowerQuirk', 'The Final Generic Magic Power Quirk', GameMode.SADISTIC, 1, [Add a 1% Boost to your Magic Power with this Quirk!]),
    // new Quirk(181, 'theFinalGenericMagicCapQuirk', 'The Final Generic Magic Cap Quirk', GameMode.SADISTIC, 1, [Add a 1% Boost to your Magic Cap with this Quirk!]),
    // new Quirk(182, 'theFinalGenericMagicBarsQuirk', 'The Final Generic Magic Bars Quirk', GameMode.SADISTIC, 1, [Add a 1% Boost to your Magic Bars with this Quirk!]),
    // new Quirk(183, 'theFinalGenericResource3PowerQuirk', 'The Final Generic Resource 3 Power Quirk', GameMode.SADISTIC, 1, [Add a 1% Boost to your Resource 3 Power with this Quirk!]),
    // new Quirk(184, 'theFinalGenericResource3CapQuirk', 'The Final Generic Resource 3 Cap Quirk', GameMode.SADISTIC, 1, [Add a 1% Boost to your Resource 3 Cap with this Quirk! ]),
    // new Quirk(185, 'theFinalGenericResource3BarsQuirk', 'The Final Generic Resource 3 Bars Quirk', GameMode.SADISTIC, 1, [Add a 1% Boost to your Resource 3 Bars with this Quirk!]),

]

export var QUIRKS = new ResourceContainer(QUIRKLIST);