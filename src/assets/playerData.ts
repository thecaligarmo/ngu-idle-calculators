type dataInfoType = {
    'type' : 'number' | 'boolean' | 'object',
    'default' : any,
    'length' ?: number,
    'percent' ?: boolean,
    'name' ?: string,
    'calculated' ?: boolean,
    'max' ?: number,
    'pre' ?: string,
}

export const playerDataInfo : {[k:string] : dataInfoType}= {
    // From Save File
    // Single things
    '70sSet': {'type': 'boolean', 'default': false},
    'activeQuestWishI' : {'type': 'number', 'default': 0, 'length': 2},
    'activeQuestWishII' : {'type': 'number', 'default': 0, 'length': 2},
    'baseAdventureHealth' : {'type': 'number', 'default': 0},
    'baseAdventurePower' : {'type': 'number', 'default': 0},
    'baseAdventureRegen' : {'type': 'number', 'default': 0},
    'baseAdventureToughness' : {'type': 'number', 'default': 0},
    'baseEnergyBar' : {'type': 'number', 'default': 0},
    'baseEnergyCap' : {'type': 'number', 'default': 0},
    'baseEnergyPower' : {'type': 'number', 'default': 0},
    'baseMagicBar' : {'type': 'number', 'default': 0},
    'baseMagicCap' : {'type': 'number', 'default': 0},
    'baseMagicPower' : {'type': 'number', 'default': 0},
    'baseRes3Bar' : {'type': 'number', 'default': 0},
    'baseRes3Cap' : {'type': 'number', 'default': 0},
    'baseRes3Power' : {'type': 'number', 'default': 0},
    'beastMode': {'type': 'boolean', 'default': false},
    'beefyWish': {'type': 'number', 'default': '0', 'length': 1},
    'bloodMagicDropChance': {'type': 'number', 'default': 0},
    'bloodMagicTimeMachine': {'type': 'number', 'default': 0},
    'blueHeart': {'type': 'boolean', 'default': false},
    'bonusPP': {'type': 'number', 'default': 0, 'length': 4},
    'bonusTitanEXPPerk': {'type': 'number', 'default': 0, 'length': 2},
    'boostRecyclyingPurchase': {'type': 'number', 'default': 0},
    'cardChonkers': {'type': 'boolean', 'default': false},
    'cardRecyclingCard': {'type': 'boolean', 'default': false},
    'cardRecyclingMayo': {'type': 'boolean', 'default': false},
    'cardTaggedAdventure': {'type': 'boolean', 'default': false, 'name': 'Adventure Tagged'},
    'cardTaggedAugments': {'type': 'boolean', 'default': false, 'name': 'Augments Tagged'},
    'cardTaggedDaycare': {'type': 'boolean', 'default': false, 'name': 'Daycare Tagged'},
    'cardTaggedDropChance': {'type': 'boolean', 'default': false, 'name': 'Drop Chance Tagged'},
    'cardTaggedEnergyNGU': {'type': 'boolean', 'default': false, 'name': 'Energy NGU Tagged'},
    'cardTaggedGoldDrop': {'type': 'boolean', 'default': false, 'name': 'Gold Drop Tagged'},
    'cardTaggedHack': {'type': 'boolean', 'default': false, 'name': 'Hack Tagged'},
    'cardTaggedMagicNGU': {'type': 'boolean', 'default': false, 'name': 'Magic NGU Tagged'},
    'cardTaggedPP': {'type': 'boolean', 'default': false, 'name': 'PP Tagged'},
    'cardTaggedQP': {'type': 'boolean', 'default': false, 'name': 'QP Tagged'},
    'cardTaggedStat': {'type': 'boolean', 'default': false, 'name': 'Stat Tagged'},
    'cardTaggedTimeMachine': {'type': 'boolean', 'default': false, 'name': 'Time Machine Tagged'},
    'cardTaggedWandoos': {'type': 'boolean', 'default': false, 'name': 'Wandoos Tagged'},
    'cardTaggedWish': {'type': 'boolean', 'default': false, 'name': 'Wish Tagged'},
    'cardTierAdventure': {'type': 'number', 'default': 0, 'length': 2, 'name' : 'Adventure Tier'},
    'cardTierAugments': {'type': 'number', 'default': 0, 'length': 2, 'name' : 'Augments Tier'},
    'cardTierDaycare': {'type': 'number', 'default': 0, 'length': 2, 'name' : 'Daycare Tier'},
    'cardTierDropChance': {'type': 'number', 'default': 0, 'length': 2, 'name' : 'Drop Chance Tier'},
    'cardTierEnergyNGU': {'type': 'number', 'default': 0, 'length': 2, 'name' : 'Energy NGU Tier'},
    'cardTierGoldDrop': {'type': 'number', 'default': 0, 'length': 2, 'name' : 'Gold Drop Tier'},
    'cardTierHack': {'type': 'number', 'default': 0, 'length': 2, 'name' : 'Hack Tier'},
    'cardTierMagicNGU': {'type': 'number', 'default': 0, 'length': 2, 'name' : 'Magic NGU Tier'},
    'cardTierPP': {'type': 'number', 'default': 0, 'length': 2, 'name' : 'PP Tier'},
    'cardTierQP': {'type': 'number', 'default': 0, 'length': 2, 'name' : 'QP Tier'},
    'cardTierStat': {'type': 'number', 'default': 0, 'length': 2, 'name' : 'Stat Tier'},
    'cardTierTimeMachine': {'type': 'number', 'default': 0, 'length': 2, 'name' : 'Time Machine Tier'},
    'cardTierWandoos': {'type': 'number', 'default': 0, 'length': 2, 'name' : 'Wandoos Tier'},
    'cardTierWish': {'type': 'number', 'default': 0, 'length': 2, 'name' : 'Wish Tier'},
    'chonkChonkier': {'type': 'number', 'default': 0, 'length': 1},
    'chonkLessNotChonkier': {'type': 'number', 'default': 0, 'length': 1},
    'cookingExp': {'type': 'number', 'default': 0},
    'cubePower': {'type': 'number', 'default': 0},
    'cubeToughness': {'type': 'number', 'default': 0},
    'eatFruitOfAdventure': {'type': 'boolean', 'default': false},
    'eatFruitOfAngryMayo': {'type': 'boolean', 'default': false},
    'eatFruitOfArbitrariness': {'type': 'boolean', 'default': false},
    'eatFruitOfAyyMayo': {'type': 'boolean', 'default': false},
    'eatFruitOfCincoDeMayo': {'type': 'boolean', 'default': false},
    'eatFruitOfGold': {'type': 'boolean', 'default': false},
    'eatFruitOfKnowledge': {'type': 'boolean', 'default': false},
    'eatFruitOfLuck': {'type': 'boolean', 'default': false},
    'eatFruitOfMacguffinA': {'type': 'boolean', 'default': false},
    'eatFruitOfMacguffinB': {'type': 'boolean', 'default': false},
    'eatFruitOfMoldyMayo': {'type': 'boolean', 'default': false},
    'eatFruitOfNumbers': {'type': 'boolean', 'default': false},
    'eatFruitOfPomegranate': {'type': 'boolean', 'default': false},
    'eatFruitOfPowerA': {'type': 'boolean', 'default': false},
    'eatFruitOfPowerB': {'type': 'boolean', 'default': false},
    'eatFruitOfPowerD': {'type': 'boolean', 'default': false},
    'eatFruitOfPrettyMayo': {'type': 'boolean', 'default': false},
    'eatFruitOfQuirks': {'type': 'boolean', 'default': false},
    'eatFruitOfRage': {'type': 'boolean', 'default': false},
    'eatFruitOfSadMayo': {'type': 'boolean', 'default': false},
    'eatFruitOfWatermelon': {'type': 'boolean', 'default': false},
    'energyNGUAdventureAEvilLevel': {'type': 'number', 'default': 0, 'name': 'Adventure α  Level'},
    'energyNGUAdventureAEvilTarget': {'type': 'number', 'default': 0, 'name': 'Adventure α Target'},
    'energyNGUAdventureALevel': {'type': 'number', 'default': 0, 'name': 'Adventure α Level'},
    'energyNGUAdventureASadisticLevel': {'type': 'number', 'default': 0, 'name': 'Adventure α Level'},
    'energyNGUAdventureASadisticTarget': {'type': 'number', 'default': 0, 'name': 'Adventure α Target'},
    'energyNGUAdventureATarget': {'type': 'number', 'default': 0, 'name': 'Adventure α Target'},
    'energyNGUAugmentsEvilLevel': {'type': 'number', 'default': 0, 'name': 'Augments Level'},
    'energyNGUAugmentsEvilTarget': {'type': 'number', 'default': 0, 'name': 'Augments Target'},
    'energyNGUAugmentsLevel': {'type': 'number', 'default': 0, 'name': 'Augments Level'},
    'energyNGUAugmentsSadisticLevel': {'type': 'number', 'default': 0, 'name': 'Augments Level'},
    'energyNGUAugmentsSadisticTarget': {'type': 'number', 'default': 0, 'name': 'Augments Target'},
    'energyNGUAugmentsTarget': {'type': 'number', 'default': 0, 'name': 'Augments Target'},
    'energyNGUDropChanceEvilLevel': {'type': 'number', 'default': 0, 'name': 'Drop Chance Level'},
    'energyNGUDropChanceEvilTarget': {'type': 'number', 'default': 0, 'name': 'Drop Chance Target'},
    'energyNGUDropChanceLevel': {'type': 'number', 'default': 0, 'name': 'Drop Chance Level'},
    'energyNGUDropChanceSadisticLevel': {'type': 'number', 'default': 0, 'name': 'Drop Chance Level'},
    'energyNGUDropChanceSadisticTarget': {'type': 'number', 'default': 0, 'name': 'Drop Chance Target'},
    'energyNGUDropChanceTarget': {'type': 'number', 'default': 0, 'name': 'Drop Chance Target'},
    'energyNGUGoldEvilLevel': {'type': 'number', 'default': 0, 'name': 'Gold Level'},
    'energyNGUGoldEvilTarget': {'type': 'number', 'default': 0, 'name': 'Gold Target'},
    'energyNGUGoldLevel': {'type': 'number', 'default': 0, 'name': 'Gold Level'},
    'energyNGUGoldSadisticLevel': {'type': 'number', 'default': 0, 'name': 'Gold Level'},
    'energyNGUGoldSadisticTarget': {'type': 'number', 'default': 0, 'name': 'Gold Target'},
    'energyNGUGoldTarget': {'type': 'number', 'default': 0, 'name': 'Gold Target'},
    'energyNGUMagicNGUEvilLevel': {'type': 'number', 'default': 0, 'name': 'Magic NGU Level'},
    'energyNGUMagicNGUEvilTarget': {'type': 'number', 'default': 0, 'name': 'Magic NGU Target'},
    'energyNGUMagicNGULevel': {'type': 'number', 'default': 0, 'name': 'Magic NGU Level'},
    'energyNGUMagicNGUSadisticLevel': {'type': 'number', 'default': 0, 'name': 'Magic NGU Level'},
    'energyNGUMagicNGUSadisticTarget': {'type': 'number', 'default': 0, 'name': 'Magic NGU Target'},
    'energyNGUMagicNGUTarget': {'type': 'number', 'default': 0, 'name': 'Magic NGU Target'},
    'energyNGUPowerAEvilLevel': {'type': 'number', 'default': 0, 'name': 'Power α Level'},
    'energyNGUPowerAEvilTarget': {'type': 'number', 'default': 0, 'name': 'Power α Target'},
    'energyNGUPowerALevel': {'type': 'number', 'default': 0, 'name': 'Power α Level'},
    'energyNGUPowerASadisticLevel': {'type': 'number', 'default': 0, 'name': 'Power α Level'},
    'energyNGUPowerASadisticTarget': {'type': 'number', 'default': 0, 'name': 'Power α Target'},
    'energyNGUPowerATarget': {'type': 'number', 'default': 0, 'name': 'Power α Target'},
    'energyNGUPPEvilLevel': {'type': 'number', 'default': 0, 'name': 'PP Level'},
    'energyNGUPPEvilTarget': {'type': 'number', 'default': 0, 'name': 'PP Target'},
    'energyNGUPPLevel': {'type': 'number', 'default': 0, 'name': 'PP Level'},
    'energyNGUPPSadisticLevel': {'type': 'number', 'default': 0, 'name': 'PP Level'},
    'energyNGUPPSadisticTarget': {'type': 'number', 'default': 0, 'name': 'PP Target'},
    'energyNGUPPTarget': {'type': 'number', 'default': 0, 'name': 'PP Target'},
    'energyNGURespawnEvilLevel': {'type': 'number', 'default': 0, 'name': 'Respawn Level'},
    'energyNGURespawnEvilTarget': {'type': 'number', 'default': 0, 'name': 'Respawn Target'},
    'energyNGURespawnLevel': {'type': 'number', 'default': 0, 'name': 'Respawn Level'},
    'energyNGURespawnSadisticLevel': {'type': 'number', 'default': 0, 'name': 'Respawn Level'},
    'energyNGURespawnSadisticTarget': {'type': 'number', 'default': 0, 'name': 'Respawn Target'},
    'energyNGURespawnTarget': {'type': 'number', 'default': 0, 'name': 'Respawn Target'},
    'energyNGUWandoosEvilLevel': {'type': 'number', 'default': 0, 'name': 'Wandoos Level'},
    'energyNGUWandoosEvilTarget': {'type': 'number', 'default': 0, 'name': 'Wandoos Target'},
    'energyNGUWandoosLevel': {'type': 'number', 'default': 0, 'name': 'Wandoos Level'},
    'energyNGUWandoosSadisticLevel': {'type': 'number', 'default': 0, 'name': 'Wandoos Level'},
    'energyNGUWandoosSadisticTarget': {'type': 'number', 'default': 0, 'name': 'Wandoos Target'},
    'energyNGUWandoosTarget': {'type': 'number', 'default': 0, 'name': 'Wandoos Target'},
    'fadLandsSetBonus': {'type': 'boolean', 'default': false},
    'fasterQuesting': {'type': 'boolean', 'default': false},
    'fibQuestRNG': {'type': 'boolean', 'default': false},
    'firstHarvestPerk': {'type': 'number', 'default': 0},
    'fruitOfKnowledgeSTILLSucks': {'type': 'boolean', 'default': false},
    'fruitOfKnowledgeSucks': {'type': 'boolean', 'default': false},
    'gameMode': {'type': 'number', 'default': 0},
    'hackAdventureTarget': {'type': 'number', 'default': 0},
    'hackAugmentTarget': {'type': 'number', 'default': 0},
    'hackBloodTarget': {'type': 'number', 'default': 0},
    'hackDaycareTarget': {'type': 'number', 'default': 0},
    'hackDropChanceTarget': {'type': 'number', 'default': 0},
    'hackENGUTarget': {'type': 'number', 'default': 0},
    'hackExpTarget': {'type': 'number', 'default': 0},
    'hackHackTarget': {'type': 'number', 'default': 0},
    'hackMilestoneReductionAdventure': {'type': 'number', 'default': 0, 'name': 'Adventure Milestone Reduction'},
    'hackMilestoneReductionAugment': {'type': 'number', 'default': 0, 'name': 'Augment Milestone Reduction'},
    'hackMilestoneReductionBlood': {'type': 'number', 'default': 0, 'name': 'Blood Milestone Reduction'},
    'hackMilestoneReductionDaycare': {'type': 'number', 'default': 0, 'name': 'Daycare Milestone Reduction'},
    'hackMilestoneReductionDropChance': {'type': 'number', 'default': 0, 'name': 'Drop Chance Milestone Reduction'},
    'hackMilestoneReductionENGU': {'type': 'number', 'default': 0, 'name': 'Energy NGU Milestone Reduction'},
    'hackMilestoneReductionExp': {'type': 'number', 'default': 0, 'name': 'Experience Milestone Reduction'},
    'hackMilestoneReductionHack': {'type': 'number', 'default': 0, 'name': 'Hack Milestone Reduction'},
    'hackMilestoneReductionMNGU': {'type': 'number', 'default': 0, 'name': 'Magic NGU Milestone Reduction'},
    'hackMilestoneReductionNumber': {'type': 'number', 'default': 0, 'name': 'Number Milestone Reduction'},
    'hackMilestoneReductionPP': {'type': 'number', 'default': 0, 'name': 'PP Milestone Reduction'},
    'hackMilestoneReductionQP': {'type': 'number', 'default': 0, 'name': 'QP Milestone Reduction'},
    'hackMilestoneReductionStat': {'type': 'number', 'default': 0, 'name': 'Attack/Defense Milestone Reduction'},
    'hackMilestoneReductionTimeMachine': {'type': 'number', 'default': 0, 'name': 'Time Machine Milestone Reduction'},
    'hackMilestoneReductionWish': {'type': 'number', 'default': 0, 'name': 'Wish Milestone Reduction'},
    'hackMNGUTarget': {'type': 'number', 'default': 0},
    'hackNumberTarget': {'type': 'number', 'default': 0},
    'hackPPTarget': {'type': 'number', 'default': 0},
    'hackQPTarget': {'type': 'number', 'default': 0},
    'hackStatTarget': {'type': 'number', 'default': 0},
    'hackTimeMachineTarget': {'type': 'number', 'default': 0},
    'hackWishTarget': {'type': 'number', 'default': 0},
    'highestTitanKilledId': {'type': 'number', 'default': 0, 'length': 2},
    'magicNGUAdventureBEvilLevel': {'type': 'number', 'default': 0, 'name': 'Adventure β Level'},
    'magicNGUAdventureBEvilTarget': {'type': 'number', 'default': 0, 'name': 'Adventure β Target'},
    'magicNGUAdventureBLevel': {'type': 'number', 'default': 0, 'name': 'Adventure β Level'},
    'magicNGUAdventureBSadisticLevel': {'type': 'number', 'default': 0, 'name': 'Adventure β Level'},
    'magicNGUAdventureBSadisticTarget': {'type': 'number', 'default': 0, 'name': 'Adventure β Target'},
    'magicNGUAdventureBTarget': {'type': 'number', 'default': 0, 'name': 'Adventure β Target'},
    'magicNGUEnergyNGUEvilLevel': {'type': 'number', 'default': 0, 'name': 'Energy NGU Level'},
    'magicNGUEnergyNGUEvilTarget': {'type': 'number', 'default': 0, 'name': 'Energy NGU Target'},
    'magicNGUEnergyNGULevel': {'type': 'number', 'default': 0, 'name': 'Energy NGU Level'},
    'magicNGUEnergyNGUSadisticLevel': {'type': 'number', 'default': 0, 'name': 'Energy NGU Level'},
    'magicNGUEnergyNGUSadisticTarget': {'type': 'number', 'default': 0, 'name': 'Energy NGU Target'},
    'magicNGUEnergyNGUTarget': {'type': 'number', 'default': 0, 'name': 'Energy NGU Target'},
    'magicNGUExpEvilLevel': {'type': 'number', 'default': 0, 'name': 'Exp Level'},
    'magicNGUExpEvilTarget': {'type': 'number', 'default': 0, 'name': 'Exp Target'},
    'magicNGUExpLevel': {'type': 'number', 'default': 0, 'name': 'Exp Level'},
    'magicNGUExpSadisticLevel': {'type': 'number', 'default': 0, 'name': 'Exp Level'},
    'magicNGUExpSadisticTarget': {'type': 'number', 'default': 0, 'name': 'Exp Target'},
    'magicNGUExpTarget': {'type': 'number', 'default': 0, 'name': 'Exp Target'},
    'magicNGUNumberEvilLevel': {'type': 'number', 'default': 0, 'name': 'Number Level'},
    'magicNGUNumberEvilTarget': {'type': 'number', 'default': 0, 'name': 'Number Target'},
    'magicNGUNumberLevel': {'type': 'number', 'default': 0, 'name': 'Number Level'},
    'magicNGUNumberSadisticLevel': {'type': 'number', 'default': 0, 'name': 'Number Level'},
    'magicNGUNumberSadisticTarget': {'type': 'number', 'default': 0, 'name': 'Number Target'},
    'magicNGUNumberTarget': {'type': 'number', 'default': 0, 'name': 'Number Target'},
    'magicNGUPowerBEvilLevel': {'type': 'number', 'default': 0, 'name': 'Power β Level'},
    'magicNGUPowerBEvilTarget': {'type': 'number', 'default': 0, 'name': 'Power β Target'},
    'magicNGUPowerBLevel': {'type': 'number', 'default': 0, 'name': 'Power β Level'},
    'magicNGUPowerBSadisticLevel': {'type': 'number', 'default': 0, 'name': 'Power β Level'},
    'magicNGUPowerBSadisticTarget': {'type': 'number', 'default': 0, 'name': 'Power β Target'},
    'magicNGUPowerBTarget': {'type': 'number', 'default': 0, 'name': 'Power β Target'},
    'magicNGUTimeMachineEvilLevel': {'type': 'number', 'default': 0, 'name': 'Time Machine Level'},
    'magicNGUTimeMachineEvilTarget': {'type': 'number', 'default': 0, 'name': 'Time Machine Target'},
    'magicNGUTimeMachineLevel': {'type': 'number', 'default': 0, 'name': 'Time Machine Level'},
    'magicNGUTimeMachineSadisticLevel': {'type': 'number', 'default': 0, 'name': 'Time Machine Level'},
    'magicNGUTimeMachineSadisticTarget': {'type': 'number', 'default': 0, 'name': 'Time Machine Target'},
    'magicNGUTimeMachineTarget': {'type': 'number', 'default': 0, 'name': 'Time Machine Target'},
    'magicNGUYggdrasilEvilLevel': {'type': 'number', 'default': 0, 'name': 'Yggdrasil Level'},
    'magicNGUYggdrasilEvilTarget': {'type': 'number', 'default': 0, 'name': 'Yggdrasil Target'},
    'magicNGUYggdrasilLevel': {'type': 'number', 'default': 0, 'name': 'Yggdrasil Level'},
    'magicNGUYggdrasilSadisticLevel': {'type': 'number', 'default': 0, 'name': 'Yggdrasil Level'},
    'magicNGUYggdrasilSadisticTarget': {'type': 'number', 'default': 0, 'name': 'Yggdrasil Target'},
    'magicNGUYggdrasilTarget': {'type': 'number', 'default': 0, 'name': 'Yggdrasil Target'},
    'numRebirthChallenges': {'type': 'number', 'default': 0, 'length': 2},
    'poopFruitOfAdventure': {'type': 'boolean', 'default': false},
    'poopFruitOfAngryMayo': {'type': 'boolean', 'default': false},
    'poopFruitOfArbitrariness': {'type': 'boolean', 'default': false},
    'poopFruitOfAyyMayo': {'type': 'boolean', 'default': false},
    'poopFruitOfCincoDeMayo': {'type': 'boolean', 'default': false},
    'poopFruitOfGold': {'type': 'boolean', 'default': false},
    'poopFruitOfKnowledge': {'type': 'boolean', 'default': false},
    'poopFruitOfLuck': {'type': 'boolean', 'default': false},
    'poopFruitOfMacguffinA': {'type': 'boolean', 'default': false},
    'poopFruitOfMacguffinB': {'type': 'boolean', 'default': false},
    'poopFruitOfMoldyMayo': {'type': 'boolean', 'default': false},
    'poopFruitOfNumbers': {'type': 'boolean', 'default': false},
    'poopFruitOfPomegranate': {'type': 'boolean', 'default': false},
    'poopFruitOfPowerA': {'type': 'boolean', 'default': false},
    'poopFruitOfPowerB': {'type': 'boolean', 'default': false},
    'poopFruitOfPowerD': {'type': 'boolean', 'default': false},
    'poopFruitOfPrettyMayo': {'type': 'boolean', 'default': false},
    'poopFruitOfQuirks': {'type': 'boolean', 'default': false},
    'poopFruitOfRage': {'type': 'boolean', 'default': false},
    'poopFruitOfSadMayo': {'type': 'boolean', 'default': false},
    'poopFruitOfWatermelon': {'type': 'boolean', 'default': false},
    'questIdleDivider': {'type': 'number', 'default': 0, 'length': 1},
    'questMajorQP': {'type': 'number', 'default': 0, 'length': 2},
    'questMinorQP': {'type': 'number', 'default': 0, 'length': 2},
    'redLiquidBonus' : {'type': 'boolean', 'default': false},
    'res3Active' : {'type': 'boolean', 'default': false},
    'sadisticNoEquipmentChallenges' : {'type': 'number', 'default': 0, 'length': 2},
    'spoopySetBonus': {'type': 'boolean', 'default': false},
    'tierFruitOfAdventure': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfAngryMayo': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfArbitrariness': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfAyyMayo': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfCincoDeMayo': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfGold': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfKnowledge': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfLuck': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfMacguffinA': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfMacguffinB': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfMoldyMayo': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfNumbers': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfPomegranate': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfPowerA': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfPowerB': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfPowerD': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfPrettyMayo': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfQuirks': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfRage': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfSadMayo': {'type': 'number', 'default': 0, 'length': 2},
    'tierFruitOfWatermelon': {'type': 'number', 'default': 0, 'length': 2},
    'twentyFourHourChallenge': {'type': 'number', 'default': 0, 'length': 2},
    'twentyFourHourEvilChallenge': {'type': 'number', 'default': 0, 'length': 2},
    'twentyFourHourSadisticChallenge': {'type': 'number', 'default': 0, 'length': 2},
    'wandoosEnergyAllocated': {'type': 'number', 'default': 0},
    'wandoosMagicAllocated': {'type': 'number', 'default': 0},
    'wimpyWish': {'type': 'number', 'default': 0, 'length': 1},
    'wishBeastDropQP': {'type': 'boolean', 'default': false},
    'wishExileDropQP': {'type': 'boolean', 'default': false},
    'wishGodmotherDropQP': {'type': 'boolean', 'default': false},
    'wishNerdDropQP': {'type': 'boolean', 'default': false},
    'wishSlots': {'type': 'number', 'default': 1, 'length': 1, 'max': 4},
    'wishTitan10DropQP': {'type': 'boolean', 'default': false},
    'wishTitan11DropQP': {'type': 'boolean', 'default': false},
    'wishTitan12DropQP': {'type': 'boolean', 'default': false},
    'wishTitansHadBetterRewards': {'type': 'number', 'default': 0, 'length': 2},
    'yggdrasilDropChance': {'type': 'number', 'default': 0},

    // Objects
    'achievements' : {'type': 'object', 'default': {}},
    'advTrainings' : {'type': 'object', 'default': {}},
    'apItems' : {'type': 'object', 'default': {}},
    'beards' : {'type': 'object', 'default': {}},
    'cards' : {'type': 'object', 'default': {}},
    'challenges' : {'type': 'object', 'default': {}},
    'diggers' : {'type': 'object', 'default': {}},
    'dish' : {'type': 'object', 'default': {}},
    'equipmentWeapon' : {'type': 'object', 'default': {}},
    'equipmentWeaponTwo' : {'type': 'object', 'default': {}},
    'equipmentHead' : {'type': 'object', 'default': {}},
    'equipmentChest' : {'type': 'object', 'default': {}},
    'equipmentLegs' : {'type': 'object', 'default': {}},
    'equipmentBoots' : {'type': 'object', 'default': {}},
    'equipmentAccesories' : {'type': 'object', 'default': {}},
    'energyNGUs' : {'type': 'object', 'default': {}},
    'magicNGUs' : {'type': 'object', 'default': {}},
    'hacks' : {'type': 'object', 'default': {}},
    'macguffins' : {'type': 'object', 'default': {}},
    'perks' : {'type': 'object', 'default': {}},
    'quirks' : {'type': 'object', 'default': {}},
    'titans' : {'type': 'object', 'default': {}},
    'wandoos'  : {'type': 'object', 'default': {}},
    'wishes' : {'type': 'object', 'default': {}},
    'yggdrasil' : {'type': 'object', 'default': {}},
    'itemSets' : {'type': 'object', 'default': {}},
    'maxxedItems' : {'type': 'object', 'default': {}},
    
    // Totals
    'boostRecyclying': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalAPBonus': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalCardSpeed': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalDropChance': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalEnergyCap': {'type': 'number', 'default': 0, 'calculated': true},
    'totalEnergyNGUSpeedFactor': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalEnergyPower': {'type': 'number', 'default': 0, 'calculated': true},
    'totalExpBonus': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalHackSpeed': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalHealth': {'type': 'number', 'default': 0, 'calculated': true},
    'totalMagicCap': {'type': 'number', 'default': 0, 'calculated': true},
    'totalMagicNGUSpeedFactor': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalMagicPower': {'type': 'number', 'default': 0, 'calculated': true},
    'totalMayoSpeed': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalPower': {'type': 'number', 'default': 0, 'calculated': true},
    'totalPPBonus': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalQuestDropBonus': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalQuestRewardBonus': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalRegen': {'type': 'number', 'default': 0, 'calculated': true},
    'totalRes3Cap': {'type': 'number', 'default': 0, 'calculated': true},
    'totalRes3Power': {'type': 'number', 'default': 0, 'calculated': true},
    'totalRespawnTime': {'type': 'number', 'default': 0, 'calculated': true},
    'totalToughness': {'type': 'number', 'default': 0, 'calculated': true},
    'totalSeedGainBonus': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalTagEffect': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalWishSpeed': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'totalYggdrasilYieldBonus': {'type': 'number', 'default': 0, 'percent': true, 'calculated': true},
    'itopodFloor': {'type': 'number', 'default': 0, 'calculated': true, 'length': 5},

    // Extra stuff
    // Cards
    'includeFruit' : {'type': 'boolean', 'default': true},
    'includeLeftovers' : {'type': 'boolean', 'default': false},
    'poopAllLeftovers' : {'type': 'boolean', 'default': false},
    'infusersEveryXDays' : {'type': 'number', 'default': 0, 'length': 2},
    'twoFruitPerInfuser' : {'type': 'boolean', 'default': false},
    'blackPen' : {'type': 'boolean', 'default': false},
    'cardRarityEnergyNGU' : {'type': 'number', 'default': 0, 'name': 'Energy NGU Rarity'},
    'cardRarityMagicNGU' : {'type': 'number', 'default': 0, 'name': 'Magic NGU Rarity'},
    'cardRarityWandoos' : {'type': 'number', 'default': 0, 'name': 'Wandoos Rarity'},
    'cardRarityAugments' : {'type': 'number', 'default': 0, 'name': 'Augments Rarity'},
    'cardRarityTimeMachine' : {'type': 'number', 'default': 0, 'name': 'Time Machine Rarity'},
    'cardRarityHack' : {'type': 'number', 'default': 0, 'name': 'Hack Rarity'},
    'cardRarityWish' : {'type': 'number', 'default': 0, 'name': 'Wish Rarity'},
    'cardRarityStat' : {'type': 'number', 'default': 0, 'name': 'Stat Rarity'},
    'cardRarityAdventure' : {'type': 'number', 'default': 0, 'name': 'Adventure Rarity'},
    'cardRarityDropChance' : {'type': 'number', 'default': 0, 'name': 'Drop Chance Rarity'},
    'cardRarityGoldDrop' : {'type': 'number', 'default': 0, 'name': 'Gold Drop Rarity'},
    'cardRarityDaycare' : {'type': 'number', 'default': 0, 'name': 'Daycare Rarity'},
    'cardRarityPP' : {'type': 'number', 'default': 0, 'name': 'PP Rarity'},
    'cardRarityQP' : {'type': 'number', 'default': 0, 'name': 'QP Rarity'},
    'cardChonkedEnergyNGU' : {'type': 'boolean', 'default': false, 'name': 'Chonk Energy NGU'},
    'cardChonkedMagicNGU' : {'type': 'boolean', 'default': false, 'name': 'Chonk Magic NGU'},
    'cardChonkedWandoos' : {'type': 'boolean', 'default': false, 'name': 'Chonk Wandoos'},
    'cardChonkedAugments' : {'type': 'boolean', 'default': false, 'name': 'Chonk Augments'},
    'cardChonkedTimeMachine' : {'type': 'boolean', 'default': false, 'name': 'Chonk Time Machine'},
    'cardChonkedHack' : {'type': 'boolean', 'default': false, 'name': 'Chonk Hack'},
    'cardChonkedWish' : {'type': 'boolean', 'default': false, 'name': 'Chonk Wish'},
    'cardChonkedStat' : {'type': 'boolean', 'default': false, 'name': 'Chonk Stat'},
    'cardChonkedAdventure' : {'type': 'boolean', 'default': false, 'name': 'Chonk Adventure'},
    'cardChonkedDropChance' : {'type': 'boolean', 'default': false, 'name': 'Chonk Drop Chance'},
    'cardChonkedGoldDrop' : {'type': 'boolean', 'default': false, 'name': 'Chonk Gold Rop'},
    'cardChonkedDaycare' : {'type': 'boolean', 'default': false, 'name': 'Chonk Daycare'},
    'cardChonkedPP' : {'type': 'boolean', 'default': false, 'name': 'Chonk PP'},
    'cardChonkedQP' : {'type': 'boolean', 'default': false, 'name': 'Chonk QP'},

    // Hacks
    'percentIncrease' : {'type': 'number', 'default': 0, 'percent': true},
    'milestoneIncrease' : {'type': 'number', 'default': 0, 'length': 2},
    'addRes3BetaPotion' : {'type': 'boolean', 'default': false},
    'addRes3DeltaPotion' : {'type': 'boolean', 'default': false},
    'hackMilestoneExtraStat' : {'type': 'number', 'default': 0},
    'hackMilestoneExtraAdventure' : {'type': 'number', 'default': 0},
    'hackMilestoneExtraTimeMachine' : {'type': 'number', 'default': 0},
    'hackMilestoneExtraDropChance' : {'type': 'number', 'default': 0},
    'hackMilestoneExtraAugment' : {'type': 'number', 'default': 0},
    'hackMilestoneExtraENGU' : {'type': 'number', 'default': 0},
    'hackMilestoneExtraMNGU' : {'type': 'number', 'default': 0},
    'hackMilestoneExtraBlood' : {'type': 'number', 'default': 0},
    'hackMilestoneExtraQP' : {'type': 'number', 'default': 0},
    'hackMilestoneExtraDaycare' : {'type': 'number', 'default': 0},
    'hackMilestoneExtraExp' : {'type': 'number', 'default': 0},
    'hackMilestoneExtraNumber' : {'type': 'number', 'default': 0},
    'hackMilestoneExtraPP' : {'type': 'number', 'default': 0},
    'hackMilestoneExtraHack' : {'type': 'number', 'default': 0},
    'hackMilestoneExtraWish' : {'type': 'number', 'default': 0},
    
    // NGUs
    'nguPercentageIncrease': {'type': 'number', 'default': 0, 'percent': true},
    'timeInMinutes': {'type': 'number', 'default': 0},
    'energyNGUAugmentsValue': {'type': 'number', 'default': 0, 'name': 'Augments Value'},
    'energyNGUWandoosValue': {'type': 'number', 'default': 0, 'name': 'Wandoos Value'},
    'energyNGURespawnValue': {'type': 'number', 'default': 0, 'name': 'Respawn Value'},
    'energyNGUGoldValue': {'type': 'number', 'default': 0, 'name': 'Gold Value'},
    'energyNGUAdventureAValue': {'type': 'number', 'default': 0, 'name': 'Adventure α Value'},
    'energyNGUPowerAValue': {'type': 'number', 'default': 0, 'name': 'Power α Value'},
    'energyNGUDropChanceValue': {'type': 'number', 'default': 0, 'name': 'Drop Chance Value'},
    'energyNGUMagicNGUValue': {'type': 'number', 'default': 0, 'name': 'Magic NGU Value'},
    'energyNGUPPValue': {'type': 'number', 'default': 0, 'name': 'PP Value'},
    'magicNGUYggdrasilValue': {'type': 'number', 'default': 0, 'name': 'Yggdrasil Value'},
    'magicNGUExpValue': {'type': 'number', 'default': 0, 'name': 'Exp Value'},
    'magicNGUPowerBValue': {'type': 'number', 'default': 0, 'name': 'Power β Value'},
    'magicNGUNumberValue': {'type': 'number', 'default': 0, 'name': 'Number Value'},
    'magicNGUTimeMachineValue': {'type': 'number', 'default': 0, 'name': 'Time Machine Value'},
    'magicNGUEnergyNGUValue': {'type': 'number', 'default': 0, 'name': 'Energy NGU Value'},
    'magicNGUAdventureBValue': {'type': 'number', 'default': 0, 'name': 'Adventure β Value'},
    'energyNGUAugmentsEvilValue': {'type': 'number', 'default': 0, 'name': 'Augments Value'},
    'energyNGUWandoosEvilValue': {'type': 'number', 'default': 0, 'name': 'Wandoos Value'},
    'energyNGURespawnEvilValue': {'type': 'number', 'default': 0, 'name': 'Respawn Value'},
    'energyNGUGoldEvilValue': {'type': 'number', 'default': 0, 'name': 'Gold Value'},
    'energyNGUAdventureAEvilValue': {'type': 'number', 'default': 0, 'name': 'Adventure α Value'},
    'energyNGUPowerAEvilValue': {'type': 'number', 'default': 0, 'name': 'Power α Value'},
    'energyNGUDropChanceEvilValue': {'type': 'number', 'default': 0, 'name': 'Drop Chance Value'},
    'energyNGUMagicNGUEvilValue': {'type': 'number', 'default': 0, 'name': 'Magic NGU Value'},
    'energyNGUPPEvilValue': {'type': 'number', 'default': 0, 'name': 'PP Value'},
    'magicNGUYggdrasilEvilValue': {'type': 'number', 'default': 0, 'name': 'Yggdrasil Value'},
    'magicNGUExpEvilValue': {'type': 'number', 'default': 0, 'name': 'Exp Value'},
    'magicNGUPowerBEvilValue': {'type': 'number', 'default': 0, 'name': 'Power β Value'},
    'magicNGUNumberEvilValue': {'type': 'number', 'default': 0, 'name': 'Number Value'},
    'magicNGUTimeMachineEvilValue': {'type': 'number', 'default': 0, 'name': 'Time Machine Value'},
    'magicNGUEnergyNGUEvilValue': {'type': 'number', 'default': 0, 'name': 'Energy NGU Value'},
    'magicNGUAdventureBEvilValue': {'type': 'number', 'default': 0, 'name': 'Adventure β Value'},
    'energyNGUAugmentsSadisticValue': {'type': 'number', 'default': 0, 'name': 'Augments Value'},
    'energyNGUWandoosSadisticValue': {'type': 'number', 'default': 0, 'name': 'Wandoos Value'},
    'energyNGURespawnSadisticValue': {'type': 'number', 'default': 0, 'name': 'Respawn Value'},
    'energyNGUGoldSadisticValue': {'type': 'number', 'default': 0, 'name': 'Gold Value'},
    'energyNGUAdventureASadisticValue': {'type': 'number', 'default': 0, 'name': 'Adventure α Value'},
    'energyNGUPowerASadisticValue': {'type': 'number', 'default': 0, 'name': 'Power α Value'},
    'energyNGUDropChanceSadisticValue': {'type': 'number', 'default': 0, 'name': 'Drop Chance Value'},
    'energyNGUMagicNGUSadisticValue': {'type': 'number', 'default': 0, 'name': 'Magic NGU Value'},
    'energyNGUPPSadisticValue': {'type': 'number', 'default': 0, 'name': 'PP Value'},
    'magicNGUYggdrasilSadisticValue': {'type': 'number', 'default': 0, 'name': 'Yggdrasil Value'},
    'magicNGUExpSadisticValue': {'type': 'number', 'default': 0, 'name': 'Exp Value'},
    'magicNGUPowerBSadisticValue': {'type': 'number', 'default': 0, 'name': 'Power β Value'},
    'magicNGUNumberSadisticValue': {'type': 'number', 'default': 0, 'name': 'Number Value'},
    'magicNGUTimeMachineSadisticValue': {'type': 'number', 'default': 0, 'name': 'Time Machine Value'},
    'magicNGUEnergyNGUSadisticValue': {'type': 'number', 'default': 0, 'name': 'Energy NGU Value'},
    'magicNGUAdventureBSadisticValue': {'type': 'number', 'default': 0, 'name': 'Adventure β Value'},

    // Ratios
    "energyRatio" : {'type': 'number', 'default': 0},
    "energyPowerRatio" : {'type': 'number', 'default': 0, 'length': 3},
    "energyCapRatio" : {'type': 'number', 'default': 0},
    "energyBarRatio" : {'type': 'number', 'default': 0, 'length': 3},
    "magicRatio" : {'type': 'number', 'default': 0},
    "magicPowerRatio" : {'type': 'number', 'default': 0, 'length': 3},
    "magicCapRatio" : {'type': 'number', 'default': 0},
    "magicBarRatio" : {'type': 'number', 'default': 0},
    "res3Ratio" : {'type': 'number', 'default': 0},
    "res3PowerRatio" : {'type': 'number', 'default': 0, 'length': 3},
    "res3CapRatio" : {'type': 'number', 'default': 0},
    "res3BarRatio" : {'type': 'number', 'default': 0, 'length': 3},

    // Wandoos
    'minutesSpentInWandoos': {'type': 'number', 'default': 60},
    'energyFillsPerSecond': {'type': 'number', 'default': 50},
    'magicFillsPerSecond': {'type': 'number', 'default': 50},

    // Wishes
    'customPercentage': {'type': 'number', 'default': 1, 'percent': true},
    'customEnergyAmount': {'type': 'number', 'default': 1},
    'customMagicAmount': {'type': 'number', 'default': 1},
    'customResource3Amount': {'type': 'number', 'default': 1},

    // Daily
    'hoursPerDay' : {'type': 'number', 'default': 24, 'length': 2},
    'hoursOfflinePerDay' : {'type': 'number', 'default': 0, 'length': 2},
    'bluePill' : {'type': 'boolean', 'default': false},
    'beastButter' : {'type': 'boolean', 'default': false},
    'includeMajorQuests' : {'type': 'boolean', 'default': false},
    'idleMajorQuests' : {'type': 'boolean', 'default': false},
    'dailySpinTier' : {'type': 'number', 'default': 1, 'length': 1},
    'includeDailySpinJackpots' : {'type': 'boolean', 'default': false},
    'includeValueOfConsumables' : {'type': 'boolean', 'default': false},
    'moneyPitGoldToss' : {'type': 'number', 'default': 1, 'pre': '1e'},
    'moneyPitTossesPerDay' : {'type': 'number', 'default': 1, 'length': 2},

    // Go stuff
    'goDropChance' : {'type': 'number', 'default': 0, 'percent': true},
    'goPower' : {'type': 'number', 'default': 0, 'percent': true},
    'goRespawn' : {'type': 'number', 'default': 0, 'percent': true},
    'goEnergyNGU' : {'type': 'number', 'default': 0, 'percent': true},
    'goMagicNGU' : {'type': 'number', 'default': 0, 'percent': true},
    'goRawHackSpeed' : {'type': 'number', 'default': 0, 'percent': true},
    'goRawWishSpeed' : {'type': 'number', 'default': 0, 'percent': true},

    'goEnergyPower' : {'type': 'number', 'default': 0, 'percent': true},
    'goEnergyCap' : {'type': 'number', 'default': 0, 'percent': true},
    'goMagicPower' : {'type': 'number', 'default': 0, 'percent': true},
    'goMagicCap' : {'type': 'number', 'default': 0, 'percent': true},
    'goResource3Power' : {'type': 'number', 'default': 0, 'percent': true},
    'goResource3Cap' : {'type': 'number', 'default': 0, 'percent': true},

    'goSeedGain' : {'type': 'number', 'default': 0, 'percent': true},
    'goYggdrasilYield' : {'type': 'number', 'default': 0, 'percent': true},
    'goAP' : {'type': 'number', 'default': 0, 'percent': true},
    'goQuestDrop' : {'type': 'number', 'default': 0, 'percent': true},
    'goExperience' : {'type': 'number', 'default': 0, 'percent': true},
    
}