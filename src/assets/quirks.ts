import { GameMode } from "./mode";
import Resource, { ResourceContainer } from "./resource";
import { Stat } from "./stat";

export class Quirk extends Resource {
    updateStats() {
        for (const prop of Object.keys(this.base)) {
            this[prop] = this.level > 0 ? this.base[prop] * this.level : 0;
        }
    }
}

export const QUIRKLIST = [
    new Quirk(0, "babysFirstQuirk:EnergyPower", "Baby's First Quirk: Energy Power", GameMode.NORMAL, 1, [
        [Stat.ENERGY_POWER, 10],
    ]),
    new Quirk(1, "babysFirstQuirk:EnergyCap", "Baby's First Quirk: Energy Cap", GameMode.NORMAL, 1, [
        [Stat.ENERGY_CAP, 10],
    ]),
    new Quirk(2, "babysFirstQuirk:EnergyBars", "Baby's First Quirk: Energy Bars", GameMode.NORMAL, 1, [
        [Stat.ENERGY_BARS, 10],
    ]),
    new Quirk(3, "babysFirstQuirk:MagicPower", "Baby's First Quirk: Magic Power", GameMode.NORMAL, 1, [
        [Stat.MAGIC_POWER, 10],
    ]),
    new Quirk(4, "babysFirstQuirk:MagicCap", "Baby's First Quirk: Magic Cap", GameMode.NORMAL, 1, [
        [Stat.MAGIC_CAP, 10],
    ]),
    new Quirk(5, "babysFirstQuirk:MagicBars", "Baby's First Quirk: Magic Bars", GameMode.NORMAL, 1, [
        [Stat.MAGIC_BARS, 10],
    ]),
    new Quirk(6, "babysFirstQuirk:Adventure", "Baby's First Quirk: Adventure", GameMode.NORMAL, 1, [
        [Stat.POWER, 25],
        [Stat.TOUGHNESS, 25],
        [Stat.HEALTH, 25],
        [Stat.REGEN, 25],
    ]),
    new Quirk(7, "statBoostForRichQuirksI", "Stat Boost For Rich Quirks I", GameMode.NORMAL, 1, [
        [Stat.ATTACK, 1],
        [Stat.DEFENSE, 1],
    ]),
    new Quirk(8, "adventureBoostForRichQuirksI", "Adventure Boost For Rich Quirks I", GameMode.NORMAL, 1, [
        [Stat.POWER, 0.1],
        [Stat.TOUGHNESS, 0.1],
        [Stat.HEALTH, 0.1],
        [Stat.REGEN, 0.1],
    ]),
    new Quirk(9, "gOOOOOLLLLLLLLLLLD!", "GOOOOOLLLLLLLLLLLD!", GameMode.NORMAL, 1, [[Stat.GOLD_DROP, 10]]),
    new Quirk(10, "theBeastsSpecialBeardTonic", "The Beast's Special Beard Tonic", GameMode.NORMAL, 1, [
        [Stat.MAGIC_BEARD_SPEED, 1],
        [Stat.ENERGY_BEARD_SPEED, 1],
    ]),
    new Quirk(11, "beastedBoostsI", "Beasted Boosts I", GameMode.NORMAL, 1, [[Stat.BOOSTS_BOOST, 1]]),
    new Quirk(12, "theBeastsSeed)", "The Beast's Seed ;)", GameMode.NORMAL, 1, [[Stat.SEED_GAIN, 1]]),
    new Quirk(13, "theBeasts Fertilizer", "The Beast's Fertilizer", GameMode.NORMAL, 1, []),
    new Quirk(14, "theBeastNGUQuirkEver", "The Beast NGU Quirk Ever ", GameMode.EVIL, 1, []),
    new Quirk(15, "energyWandoosBEAST-a", "Energy Wandoos BEAST-a ", GameMode.EVIL, 1, [
        [Stat.ENERGY_WANDOOS_SPEED, 2],
    ]),
    new Quirk(16, "magicWandoosBEAST-a", "Magic Wandoos BEAST-a ", GameMode.EVIL, 1, [[Stat.MAGIC_WANDOOS_SPEED, 2]]),
    new Quirk(17, "superAdvancedBeastTraining!", "Super Advanced Beast Training! ", GameMode.EVIL, 1, []),
    new Quirk(18, "accessorySlot!", "Accessory Slot! ", GameMode.EVIL, 1, []),
    new Quirk(19, "macGuffinSlot!", "MacGuffin Slot!", GameMode.NORMAL, 1, []),
    new Quirk(20, "adv.TrainingLevelBankI", "Adv. Training Level Bank I", GameMode.NORMAL, 1, []),
    new Quirk(21, "adv.TrainingLevelBankII", "Adv. Training Level Bank II", GameMode.NORMAL, 1, []),
    new Quirk(22, "adv.TrainingLevelBankIII", "Adv. Training Level Bank III ", GameMode.EVIL, 1, []),
    new Quirk(23, "adv.TrainingLevelBankIV", "Adv. Training Level Bank IV ", GameMode.EVIL, 1, []),
    new Quirk(24, "adv.TrainingLevelBankV", "Adv. Training Level Bank V ", GameMode.EVIL, 1, []),
    new Quirk(25, "timeMachineLevelBankI", "Time Machine Level Bank I", GameMode.NORMAL, 1, []),
    new Quirk(26, "timeMachineLevelBankII", "Time Machine Level Bank II", GameMode.NORMAL, 1, []),
    new Quirk(27, "timeMachineLevelBankIII", "Time Machine Level Bank III ", GameMode.EVIL, 1, []),
    new Quirk(28, "timeMachineLevelBankIV", "Time Machine Level Bank IV ", GameMode.EVIL, 1, []),
    new Quirk(29, "timeMachineLevelBankV", "Time Machine Level Bank V ", GameMode.EVIL, 1, []),
    new Quirk(30, "beardTempLevelBankI", "Beard Temp Level Bank I", GameMode.NORMAL, 1, []),
    new Quirk(31, "beardTempLevelBankII", "Beard Temp Level Bank II", GameMode.NORMAL, 1, []),
    new Quirk(32, "beardTempLevelBankIII", "Beard Temp Level Bank III ", GameMode.EVIL, 1, []),
    new Quirk(33, "beardTempLevelBankIV", "Beard Temp Level Bank IV ", GameMode.EVIL, 1, []),
    new Quirk(34, "beardTempLevelBankV", "Beard Temp Level Bank V ", GameMode.EVIL, 1, []),
    new Quirk(35, "genericEnergyPowerQuirkI", "Generic Energy Power Quirk I", GameMode.NORMAL, 1, [
        [Stat.ENERGY_POWER, 1],
    ]),
    new Quirk(36, "genericEnergyCapQuirkI", "Generic Energy Cap Quirk I", GameMode.NORMAL, 1, [[Stat.ENERGY_CAP, 1]]),
    new Quirk(37, "genericEnergyBarsQuirkI", "Generic Energy Bars Quirk I", GameMode.NORMAL, 1, [
        [Stat.ENERGY_BARS, 1],
    ]),
    new Quirk(38, "genericMagicPowerQuirkI", "Generic Magic Power Quirk I", GameMode.NORMAL, 1, [
        [Stat.MAGIC_POWER, 1],
    ]),
    new Quirk(39, "genericMagicCapQuirkI", "Generic Magic Cap Quirk I", GameMode.NORMAL, 1, [[Stat.MAGIC_CAP, 1]]),
    new Quirk(40, "genericMagicBarsQuirkI", "Generic Magic Bars Quirk I", GameMode.NORMAL, 1, [[Stat.MAGIC_BARS, 1]]),
    new Quirk(41, "genericEnergyPowerQuirkII", "Generic Energy Power Quirk II ", GameMode.EVIL, 1, [
        [Stat.ENERGY_POWER, 1],
    ]),
    new Quirk(42, "genericEnergyCapQuirkII", "Generic Energy Cap Quirk II ", GameMode.EVIL, 1, [[Stat.ENERGY_CAP, 1]]),
    new Quirk(43, "genericEnergyBarsQuirkII", "Generic Energy Bars Quirk II ", GameMode.EVIL, 1, [
        [Stat.ENERGY_BARS, 1],
    ]),
    new Quirk(44, "genericMagicPowerQuirkII", "Generic Magic Power Quirk II ", GameMode.EVIL, 1, [
        [Stat.MAGIC_POWER, 1],
    ]),
    new Quirk(45, "genericMagicCapQuirkII", "Generic Magic Cap Quirk II ", GameMode.EVIL, 1, [[Stat.MAGIC_CAP, 1]]),
    new Quirk(46, "genericMagicBarsQuirkII", "Generic Magic Bars Quirk II ", GameMode.EVIL, 1, [[Stat.MAGIC_BARS, 1]]),
    new Quirk(47, "genericResource3PowerQuirkI", "Generic Resource 3 Power Quirk I ", GameMode.EVIL, 1, [
        [Stat.RES3_POWER, 1],
    ]),
    new Quirk(48, "genericResource3CapQuirkI", "Generic Resource 3 Cap Quirk I ", GameMode.EVIL, 1, [
        [Stat.RES3_CAP, 1],
    ]),
    new Quirk(49, "genericResource3BarsQuirkI", "Generic Resource 3 Bars Quirk I ", GameMode.EVIL, 1, [
        [Stat.RES3_BARS, 1],
    ]),
    new Quirk(50, "anotherMacGuffinSlot!", "Another MacGuffin Slot! ", GameMode.EVIL, 1, []),
    new Quirk(51, "statBoostForRichQuirksII", "Stat Boost For Rich Quirks II ", GameMode.EVIL, 1, [
        [Stat.ATTACK, 2],
        [Stat.DEFENSE, 2],
    ]),
    new Quirk(52, "adventureBoostForRichQuirksII", "Adventure Boost For Rich Quirks II ", GameMode.EVIL, 1, [
        [Stat.POWER, 0.1],
        [Stat.TOUGHNESS, 0.1],
        [Stat.HEALTH, 0.1],
        [Stat.REGEN, 0.1],
    ]),
    new Quirk(53, "beastedBoostsII", "Beasted Boosts II ", GameMode.EVIL, 1, [[Stat.BOOSTS_BOOST, 2]]),
    new Quirk(54, "lowerMinimumWishSpeed?", "Lower Minimum Wish Speed?", GameMode.EVIL, 1, []),
    new Quirk(55, "anInventoryAutomergeSlot!", "An Inventory Automerge Slot!", GameMode.EVIL, 1, []),
    new Quirk(56, "aWishSlot!", "A Wish Slot!", GameMode.EVIL, 1, []),
    new Quirk(57, "atk/DefHackMilestoneReducerI", "Atk/Def Hack Milestone Reducer I", GameMode.EVIL, 1, []),
    new Quirk(58, "pPHackMilestoneReducerI", "PP Hack Milestone Reducer I", GameMode.EVIL, 1, []),
    new Quirk(59, "eXPHackMilestoneReducerI", "EXP Hack Milestone Reducer I", GameMode.EVIL, 1, []),
    new Quirk(60, "wishHackMilestoneReducerI", "Wish Hack Milestone Reducer I", GameMode.EVIL, 1, []),
    new Quirk(61, "genericEnergyPowerQuirkIII", "Generic Energy Power Quirk III", GameMode.SADISTIC, 1, [
        [Stat.ENERGY_POWER, 0.5],
    ]),
    new Quirk(62, "genericEnergyCapQuirkIII", "Generic Energy Cap Quirk III", GameMode.SADISTIC, 1, [
        [Stat.ENERGY_CAP, 0.2],
    ]),
    new Quirk(63, "genericEnergyBarsQuirkIII", "Generic Energy Bars Quirk III", GameMode.SADISTIC, 1, [
        [Stat.ENERGY_BARS, 0.2],
    ]),
    new Quirk(64, "genericMagicPowerQuirkIII", "Generic Magic Power Quirk III", GameMode.SADISTIC, 1, [
        [Stat.MAGIC_POWER, 0.5],
    ]),
    new Quirk(65, "genericMagicCapQuirkIII", "Generic Magic Cap Quirk III", GameMode.SADISTIC, 1, [
        [Stat.MAGIC_CAP, 0.2],
    ]),
    new Quirk(66, "genericMagicBarsQuirkIII", "Generic Magic Bars Quirk III", GameMode.SADISTIC, 1, [
        [Stat.MAGIC_BARS, 0.2],
    ]),
    new Quirk(67, "genericResource3PowerQuirkII", "Generic Resource 3 Power Quirk II", GameMode.SADISTIC, 1, [
        [Stat.RES3_POWER, 1],
    ]),
    new Quirk(68, "genericResource3CapQuirkII", "Generic Resource 3 Cap Quirk II", GameMode.SADISTIC, 1, [
        [Stat.RES3_CAP, 0.5],
    ]),
    new Quirk(69, "genericResource3BarsQuirkII", "Generic Resource 3 Bars Quirk II", GameMode.SADISTIC, 1, [
        [Stat.RES3_BARS, 0.5],
    ]),
    new Quirk(70, "improvedBaseITOPODPPP!", "Improved Base ITOPOD PPP!", GameMode.SADISTIC, 1, []),
    new Quirk(71, "bonusQuestHandinProgressI", "Bonus Quest Handin Progress I", GameMode.EVIL, 1, []),
    new Quirk(72, "beastedBoostsIII", "Beasted Boosts III", GameMode.EVIL, 1, [[Stat.BOOSTS_BOOST, 1]]),
    new Quirk(73, "beastedBoostsIV", "Beasted Boosts IV", GameMode.SADISTIC, 1, [[Stat.BOOSTS_BOOST, 0.5]]),
    new Quirk(74, "improvedSadisticBossMultiplierI", "Improved Sadistic Boss Multiplier I", GameMode.SADISTIC, 1, []),
    new Quirk(75, "improvedSadisticBossMultiplierII", "Improved Sadistic Boss Multiplier II", GameMode.SADISTIC, 1, []),
    new Quirk(76, "statBoostforRichQuirksIII", "Stat Boost for Rich Quirks III", GameMode.SADISTIC, 1, [
        [Stat.ATTACK, 1],
        [Stat.DEFENSE, 1],
    ]),
    new Quirk(77, "adventureBoostforRichQuirksIII", "Adventure Boost for Rich Quirks III", GameMode.SADISTIC, 1, [
        [Stat.POWER, 0.03],
        [Stat.TOUGHNESS, 0.03],
        [Stat.HEALTH, 0.03],
        [Stat.REGEN, 0.03],
    ]),
    new Quirk(78, "statBoostforRichQuirksIV", "Stat Boost for Rich Quirks IV", GameMode.SADISTIC, 1, [
        [Stat.ATTACK, 1],
        [Stat.DEFENSE, 1],
    ]),
    new Quirk(79, "adventureBoostforRichQuirksIV", "Adventure Boost for Rich Quirks IV", GameMode.SADISTIC, 1, [
        [Stat.POWER, 0.03],
        [Stat.TOUGHNESS, 0.03],
        [Stat.HEALTH, 0.03],
        [Stat.REGEN, 0.03],
    ]),
    new Quirk(80, "genericEnergyPowerQuirkIV", "Generic Energy Power Quirk IV", GameMode.SADISTIC, 1, [
        [Stat.ENERGY_POWER, 0.5],
    ]),
    new Quirk(81, "genericEnergyCapQuirkIV", "Generic Energy Cap Quirk IV", GameMode.SADISTIC, 1, [
        [Stat.ENERGY_CAP, 0.2],
    ]),
    new Quirk(82, "genericEnergyBarsQuirkIV", "Generic Energy Bars Quirk IV", GameMode.SADISTIC, 1, [
        [Stat.ENERGY_BARS, 0.2],
    ]),
    new Quirk(83, "genericMagicPowerQuirkIV", "Generic Magic Power Quirk IV", GameMode.SADISTIC, 1, [
        [Stat.MAGIC_POWER, 0.5],
    ]),
    new Quirk(84, "genericMagicCapQuirkIV", "Generic Magic Cap Quirk IV", GameMode.SADISTIC, 1, [
        [Stat.MAGIC_CAP, 0.2],
    ]),
    new Quirk(85, "genericMagicBarsQuirkIV", "Generic Magic Bars Quirk IV", GameMode.SADISTIC, 1, [
        [Stat.MAGIC_BARS, 0.2],
    ]),
    new Quirk(86, "genericResource3PowerQuirkIII", "Generic Resource 3 Power Quirk III", GameMode.SADISTIC, 1, [
        [Stat.RES3_POWER, 1],
    ]),
    new Quirk(87, "genericResource3CapQuirkIII", "Generic Resource 3 Cap Quirk III", GameMode.SADISTIC, 1, [
        [Stat.RES3_CAP, 0.5],
    ]),
    new Quirk(88, "genericResource3BarsQuirkIII", "Generic Resource 3 Bars Quirk III", GameMode.SADISTIC, 1, [
        [Stat.RES3_BARS, 0.5],
    ]),
    new Quirk(89, "anevenBeast-erNGUQuirk", "An even Beast-er NGU Quirk", GameMode.SADISTIC, 1, []),
    new Quirk(90, "evenMoreInventorySpace?", "Even More Inventory Space?", GameMode.EVIL, 1, []),
    new Quirk(91, "betterBloodMagicI", "Better Blood Magic I", GameMode.SADISTIC, 1, [[Stat.BLOOD, 1]]),
    new Quirk(92, "evenBetterYggdrasilYields", "Even Better Yggdrasil Yields", GameMode.SADISTIC, 1, [
        [Stat.YGGDRASIL_YIELD, 0.1],
    ]),
    new Quirk(93, "fasterEnergyNGUI", "Faster Energy NGU I", GameMode.SADISTIC, 1, [[Stat.ENERGY_NGU_SPEED, 0.4]]),
    new Quirk(94, "fasterMagicNGUI", "Faster Magic NGU I", GameMode.SADISTIC, 1, [[Stat.MAGIC_NGU_SPEED, 0.4]]),
    new Quirk(95, "fasterEnergyNGUII", "Faster Energy NGU II", GameMode.SADISTIC, 1, [[Stat.ENERGY_NGU_SPEED, 0.3]]),
    new Quirk(96, "fasterMagicNGUII", "Faster Magic NGU II", GameMode.SADISTIC, 1, [[Stat.MAGIC_NGU_SPEED, 0.3]]),
    new Quirk(97, "fasterEnergyNGUIII", "Faster Energy NGU III", GameMode.SADISTIC, 1, [[Stat.ENERGY_NGU_SPEED, 0.3]]),
    new Quirk(98, "fasterMagicNGUIII", "Faster Magic NGU III", GameMode.SADISTIC, 1, [[Stat.MAGIC_NGU_SPEED, 0.3]]),
    new Quirk(99, "magicNGUSpeedCardTierUpI", "Magic NGU Speed Card Tier Up I", GameMode.EVIL, 1, []),
    new Quirk(100, "tMCardTierUpI", "TM Card Tier Up I", GameMode.EVIL, 1, []),
    new Quirk(101, "wishesCardTierUpI", "Wishes Card Tier Up I", GameMode.EVIL, 1, []),
    new Quirk(102, "daycareCardTierUpI", "Daycare Card Tier Up I", GameMode.EVIL, 1, []),
    new Quirk(103, "energyNGUSpeedTierUpI", "Energy NGU Speed Tier Up I", GameMode.EVIL, 1, []),
    new Quirk(104, "dropChanceCardTierUpI", "Drop Chance Card Tier Up I", GameMode.EVIL, 1, []),
    new Quirk(105, "wandoosCardTierUpI", "Wandoos Card Tier Up I", GameMode.EVIL, 1, []),
    new Quirk(106, "adventureStatsCardTierUpI", "Adventure Stats Card Tier Up I", GameMode.EVIL, 1, []),
    new Quirk(107, "hacksCardTierUpI", "Hacks Card Tier Up I", GameMode.EVIL, 1, []),
    new Quirk(108, "augmentCardTierUpI", "Augment Card Tier Up I", GameMode.EVIL, 1, []),
    new Quirk(109, "goldDropCardTierUpI", "Gold Drop Card Tier Up I", GameMode.EVIL, 1, []),
    new Quirk(110, "pPCardTierUpI", "PP Card Tier Up I", GameMode.EVIL, 1, []),
    new Quirk(111, "a/DCardTierUpI", "A/D Card Tier Up I", GameMode.EVIL, 1, []),
    new Quirk(112, "magicNGUSpeedCardTierUpII", "Magic NGU Speed Card Tier Up II", GameMode.SADISTIC, 1, []),
    new Quirk(113, "tMCardTierUpII", "TM Card Tier Up II", GameMode.SADISTIC, 1, []),
    new Quirk(114, "wishesCardTierUpII", "Wishes Card Tier Up II", GameMode.SADISTIC, 1, []),
    new Quirk(115, "daycareCardTierUpII", "Daycare Card Tier Up II", GameMode.SADISTIC, 1, []),
    new Quirk(116, "energyNGUSpeedCardTierUpII", "Energy NGU Speed Card Tier Up II", GameMode.SADISTIC, 1, []),
    new Quirk(117, "dropChanceCardTierUpII", "Drop Chance Card Tier Up II", GameMode.SADISTIC, 1, []),
    new Quirk(118, "wandoosCardTierUpII", "Wandoos Card Tier Up II", GameMode.SADISTIC, 1, []),
    new Quirk(119, "adventureStatsCardTierUpII", "Adventure Stats Card Tier Up II", GameMode.SADISTIC, 1, []),
    new Quirk(120, "hacksCardTierUpII", "Hacks Card Tier Up II", GameMode.SADISTIC, 1, []),
    new Quirk(121, "augmentCardTierUpII", "Augment Card Tier Up II", GameMode.SADISTIC, 1, []),
    new Quirk(122, "goldDropCardTierUpII", "Gold Drop Card Tier Up II", GameMode.SADISTIC, 1, []),
    new Quirk(123, "pPCardTierUpII", "PP Card Tier Up II", GameMode.SADISTIC, 1, []),
    new Quirk(124, "a/DCardTierUpII", "A/D Card Tier Up II", GameMode.SADISTIC, 1, []),
    new Quirk(125, "magicNGUSpeedCardTierUpIII", "Magic NGU Speed Card Tier Up III", GameMode.SADISTIC, 1, []),
    new Quirk(126, "tMCardTierUpIII", "TM Card Tier Up III", GameMode.SADISTIC, 1, []),
    new Quirk(127, "wishesCardTierUpIII", "Wishes Card Tier Up III", GameMode.SADISTIC, 1, []),
    new Quirk(128, "daycareCardTierUpIII", "Daycare Card Tier Up III", GameMode.SADISTIC, 1, []),
    new Quirk(129, "energyNGUSpeedCardTierUpIII", "Energy NGU Speed Card Tier Up III", GameMode.SADISTIC, 1, []),
    new Quirk(130, "dropChanceCardTierUpIII", "Drop Chance Card Tier Up III", GameMode.SADISTIC, 1, []),
    new Quirk(131, "wandoosCardTierUpIII", "Wandoos Card Tier Up III", GameMode.SADISTIC, 1, []),
    new Quirk(132, "adventureStatsCardTierUpIII", "Adventure Stats Card Tier Up III", GameMode.SADISTIC, 1, []),
    new Quirk(133, "hacksCardTierUpIII", "Hacks Card Tier Up III", GameMode.SADISTIC, 1, []),
    new Quirk(134, "augmentCardTierUpIII", "Augment Card Tier Up III", GameMode.SADISTIC, 1, []),
    new Quirk(135, "goldDropCardTierUpIII", "Gold Drop Card Tier Up III", GameMode.SADISTIC, 1, []),
    new Quirk(136, "pPCardTierUpIII", "PP Card Tier Up III", GameMode.SADISTIC, 1, []),
    new Quirk(137, "a/DCardTierUpIII", "A/D Card Tier Up III", GameMode.SADISTIC, 1, []),

    new Quirk(138, "fasterCardGenerationI", "Faster Card Generation I", GameMode.EVIL, 1, [[Stat.CARD_SPEED, 0.5]]),
    new Quirk(139, "fasterMayoGenerationI", "Faster Mayo Generation I", GameMode.EVIL, 1, [[Stat.MAYO_SPEED, 0.5]]),
    new Quirk(140, "fasterCardGenerationII", "Faster Card Generation II", GameMode.SADISTIC, 1, [
        [Stat.CARD_SPEED, 0.4],
    ]),
    new Quirk(141, "fasterMayoGenerationII", "Faster Mayo Generation II", GameMode.SADISTIC, 1, [
        [Stat.MAYO_SPEED, 0.4],
    ]),
    new Quirk(142, "fasterCardGenerationIII", "Faster Card Generation III", GameMode.SADISTIC, 1, [
        [Stat.CARD_SPEED, 0.3],
    ]),
    new Quirk(143, "fasterMayoGenerationIII", "Faster Mayo Generation III", GameMode.SADISTIC, 1, [
        [Stat.MAYO_SPEED, 0.3],
    ]),
    new Quirk(144, "fasterCardGenerationIV", "Faster Card Generation IV", GameMode.SADISTIC, 1, [
        [Stat.CARD_SPEED, 0.3],
    ]),
    new Quirk(145, "fasterMayoGenerationIV", "Faster Mayo Generation IV", GameMode.SADISTIC, 1, [
        [Stat.MAYO_SPEED, 0.3],
    ]),
    new Quirk(146, "biggerDeckI", "Bigger Deck I", GameMode.EVIL, 1, []),
    new Quirk(147, "biggerDeckII", "Bigger Deck II", GameMode.SADISTIC, 1, []),
    new Quirk(148, "biggerDeckII<s>I</s>", "Bigger Deck II<s>I</s>", GameMode.SADISTIC, 1, []),
    new Quirk(149, "bIGCHONKERCARDS", "BIG CHONKER CARDS", GameMode.SADISTIC, 1, []),
    new Quirk(150, "extraMayoGenerator!", "Extra Mayo Generator!", GameMode.SADISTIC, 1, [[Stat.MAYO_GENERATOR, 1]]),
    new Quirk(151, "extraTagSlot!", "Extra Tag Slot!", GameMode.EVIL, 1, []),
    new Quirk(152, "betterTagsI", "Better Tags I", GameMode.EVIL, 1, [[Stat.TAG_EFFECT, 0.05]]),
    new Quirk(153, "betterTagsII", "Better Tags II", GameMode.SADISTIC, 1, [[Stat.TAG_EFFECT, 0.04]]),
    new Quirk(154, "betterTagsIII", "Better Tags III", GameMode.SADISTIC, 1, [[Stat.TAG_EFFECT, 0.04]]),
    new Quirk(155, "betterTagsIV", "Better Tags IV", GameMode.SADISTIC, 1, [[Stat.TAG_EFFECT, 0.04]]),
    new Quirk(156, "cardRecycling:Mayo", "Card Recycling: Mayo", GameMode.SADISTIC, 1, []),
    new Quirk(157, "magicNGUSpeedCardTierUpIV", "Magic NGU Speed Card Tier Up IV", GameMode.SADISTIC, 1, []),
    new Quirk(158, "tMCardTierUpIV", "TM Card Tier Up IV", GameMode.SADISTIC, 1, []),
    new Quirk(159, "wishesCardTierUpIV", "Wishes Card Tier Up IV", GameMode.SADISTIC, 1, []),
    new Quirk(160, "daycareCardTierUpIV", "Daycare Card Tier Up IV", GameMode.SADISTIC, 1, []),
    new Quirk(161, "energyNGUSpeedCardTierUpIV", "Energy NGU Speed Card Tier Up IV", GameMode.SADISTIC, 1, []),
    new Quirk(162, "dropChanceCardTierUpIV", "Drop Chance Card Tier Up IV", GameMode.SADISTIC, 1, []),
    new Quirk(163, "wandoosCardTierUpIV", "Wandoos Card Tier Up IV", GameMode.SADISTIC, 1, []),
    new Quirk(164, "adventureStatsCardTierUpIV", "Adventure Stats Card Tier Up IV", GameMode.SADISTIC, 1, []),
    new Quirk(165, "hacksCardTierUpIV", "Hacks Card Tier Up IV", GameMode.SADISTIC, 1, []),
    new Quirk(166, "augmentCardTierUpIV", "Augment Card Tier Up IV", GameMode.SADISTIC, 1, []),
    new Quirk(167, "goldDropCardTierUpIV", "Gold Drop Card Tier Up IV", GameMode.SADISTIC, 1, []),
    new Quirk(168, "pPCardTierUpIV", "PP Card Tier Up IV", GameMode.SADISTIC, 1, []),
    new Quirk(169, "a/DCardTierUpIV", "A/D Card Tier Up IV", GameMode.SADISTIC, 1, []),
    new Quirk(170, "statBoostforRichQuirksV", "Stat Boost for Rich Quirks V", GameMode.SADISTIC, 1, [
        [Stat.ATTACK, 1],
        [Stat.DEFENSE, 1],
    ]),
    new Quirk(171, "adventureBoostforRichQuirksV", "Adventure Boost for Rich Quirks V", GameMode.SADISTIC, 1, [
        [Stat.POWER, 0.03],
        [Stat.TOUGHNESS, 0.03],
        [Stat.HEALTH, 0.03],
        [Stat.REGEN, 0.03],
    ]),
    new Quirk(172, "statBoostforRichQuirksVI", "Stat Boost for Rich Quirks VI", GameMode.SADISTIC, 1, [
        [Stat.ATTACK, 1],
        [Stat.DEFENSE, 1],
    ]),
    new Quirk(173, "adventureBoostforRichQuirksVI", "Adventure Boost for Rich Quirks VI", GameMode.SADISTIC, 1, [
        [Stat.POWER, 0.03],
        [Stat.TOUGHNESS, 0.03],
        [Stat.HEALTH, 0.03],
        [Stat.REGEN, 0.03],
    ]),
    new Quirk(174, "energyNGUHackMilestonereducerI", "Energy NGU Hack Milestone reducer I", GameMode.SADISTIC, 1, []),
    new Quirk(175, "tMHackMilestonereducerI", "TM Hack Milestone reducer I", GameMode.SADISTIC, 1, []),
    new Quirk(176, "aPROBLEMHASBEENDETECTED", "A PROBLEM HAS BEEN DETECTED", GameMode.SADISTIC, 1, []),
    new Quirk(177, "theFinalGenericEnergyPowerQuirk", "The Final Generic Energy Power Quirk", GameMode.SADISTIC, 1, [
        [Stat.ENERGY_POWER, 1],
    ]),
    new Quirk(178, "theFinalGenericEnergyCapQuirk", "The Final Generic Energy Cap Quirk", GameMode.SADISTIC, 1, [
        [Stat.ENERGY_CAP, 1],
    ]),
    new Quirk(179, "theFinalGenericEnergyBarsQuirk", "The Final Generic Energy Bars Quirk", GameMode.SADISTIC, 1, [
        [Stat.ENERGY_BARS, 1],
    ]),
    new Quirk(180, "theFinalGenericMagicPowerQuirk", "The Final Generic Magic Power Quirk", GameMode.SADISTIC, 1, [
        [Stat.MAGIC_POWER, 1],
    ]),
    new Quirk(181, "theFinalGenericMagicCapQuirk", "The Final Generic Magic Cap Quirk", GameMode.SADISTIC, 1, [
        [Stat.MAGIC_CAP, 1],
    ]),
    new Quirk(182, "theFinalGenericMagicBarsQuirk", "The Final Generic Magic Bars Quirk", GameMode.SADISTIC, 1, [
        [Stat.MAGIC_BARS, 1],
    ]),
    new Quirk(
        183,
        "theFinalGenericResource3PowerQuirk",
        "The Final Generic Resource 3 Power Quirk",
        GameMode.SADISTIC,
        1,
        [[Stat.RES3_POWER, 1]]
    ),
    new Quirk(184, "theFinalGenericResource3CapQuirk", "The Final Generic Resource 3 Cap Quirk", GameMode.SADISTIC, 1, [
        [Stat.RES3_CAP, 1],
    ]),
    new Quirk(
        185,
        "theFinalGenericResource3BarsQuirk",
        "The Final Generic Resource 3 Bars Quirk",
        GameMode.SADISTIC,
        1,
        [[Stat.RES3_BARS, 1]]
    ),
];

export const QUIRKS = new ResourceContainer(QUIRKLIST);
