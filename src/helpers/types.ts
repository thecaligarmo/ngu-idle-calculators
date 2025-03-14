import bigDecimal from "js-big-decimal";
import { ReactNode } from "react";

type fourNumber = [number, number, number, number];
export type fiveNumber = [number, number, number, number, number];
export type sevenNumber = [number, number, number, number, number, number, number];
export type tenNumber = [number, number, number, number, number, number, number, number, number, number];
export type fourteenNumber = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];
export type sixteenNumber = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];

export type propType = [string, number][] | [string, number, number][];
export type bigDecimalObj = { [key: string]: bigDecimal };

export type resKeyType = "power" | "cap" | "bar";
export type resType = {
    power: bigDecimal;
    cap: bigDecimal;
    bar: bigDecimal;
};

export type mainGensKeyType = "energy" | "magic";
export type gensKeyType = mainGensKeyType | "res3";
export type gensType = {
    energy: resType;
    magic: resType;
    res3: resType;
};

export type gensBDType = { energy: bigDecimal; magic: bigDecimal; res3: bigDecimal; total: bigDecimal };

/*
Content
*/
export type requiredDataType = (string | [string, number])[][];
export type StandardTableRowType = { [key: string]: { [k: string]: string | ReactNode } };

/*
Player Import Types
*/

type valueImportType = { value__: number };
type timeImportType = { totalseconds: number; seconds: number; minutes: number; hours: number; days: number };
type stateImportType = { s0: number; s1: number; s2: number; s3: number };

type augmentImportType = {
    augLevel: number;
    augProgress: number;
    upgradeLevel: number;
    upgradeProgress: number;
    augEnergy: number;
    upgradeEnergy: number;
    augmentTarget: number;
    upgradeTarget: number;
};

export type beardImportType = {
    progress: number;
    active: boolean;
    beardLevel: number;
    permLevel: number;
    bankedLevel: number;
};

type bloodRitualImportType = {
    progress: number;
    magic: number;
    level: number;
};

type cardImportType = {
    tier: number;
    artID: number;
    cardName: string;
    type: valueImportType;
    effectAmount: number;
    cardRarity: valueImportType;
    bonusType: valueImportType;
    manaCosts: number[];
    isProtected: boolean;
};

type cardManaImportType = {
    progress: number;
    amount: number;
    running: boolean;
};

export type challengeImportType = {
    inChallenge: boolean;
    curCompletions: number;
    curEvilCompletions: number;
    curSadisticCompletions: number;
    bestTime: number;
    highScore: number;
    unlocked: boolean;
    challengeType: valueImportType;
    challengeTime: timeImportType;
};

type diggerImportType = {
    curLevel: number;
    maxLevel: number;
    active: boolean;
    cooldown: timeImportType;
};

export type ingredientsType = {
    propertyIndex: number;
    curLevel: number;
    targetLevel: number;
    pairedIngred: number;
    weight: number;
    pairedWeight: number;
    unlocked: boolean;
};

export type cookingImportType = {
    unlocked: boolean;
    cookTimer: number;
    pair1Target: number;
    pair2Target: number;
    pair3Target: number;
    pair4Target: number;
    expBonus: number;
    curDishIndex: number;
    pair1: fourNumber;
    pair2: fourNumber;
    pair3: fourNumber;
    pair4: fourNumber;
    ingredients: ingredientsType[];
};

type beastQuestImportType = {
    quirkLevel: number[];
    quirkPoints: number;
    lifetimePoints: number;
    questsUnlocked: boolean;
    inQuest: boolean;
    idleMode: boolean;
    questID: number;
    targetDrops: number;
    curDrops: number;
    curBankedQuests: number;
    maxBankedQuests: number;
    reducedRewards: boolean;
    allActive: boolean;
    usedButter: boolean;
    idleProgress: number;
    filterDiff: boolean;
    filterAfford: boolean;
    filterMaxxed: boolean;
    dailyQuestTimer: timeImportType;
    questState: stateImportType;
    orderType: valueImportType;
};

export type hackImportType = {
    res3: number;
    progress: number;
    level: number;
    target: number;
};

type itopodImportType = {
    perkLevel: number[];
    perkPoints: number;
    lifetimePoints: number;
    pointProgress: number;
    enemiesKilled: number;
    poopProgress: number;
    buffedKills: number;
    filterDiff: boolean;
    filterAfford: boolean;
    filterMaxxed: boolean;
    orderType: valueImportType;
};

export type itemImportType = {
    id: number;
    type: valueImportType;
    bossRequired: number;
    capAttack: number;
    curAttack: number;
    capDefense: number;
    curDefense: number;
    spec1Type: valueImportType;
    spec1Cur: number;
    spec1Cap: number;
    spec2Type: valueImportType;
    spec2Cur: number;
    spec2Cap: number;
    spec3Type: valueImportType;
    spec3Cur: number;
    spec3Cap: number;
    removable: boolean;
    level: number;
};

type loadoutImportType = {
    head: number;
    chest: number;
    legs: number;
    boots: number;
    weapon: number;
    weapon2: number;
    accessories: number[];
    temp: number;
    loadoutName: string;
};

export type itemListImportType = {
    itemDropped: boolean[];
    itemMaxxed: boolean[];
    itemFiltered: boolean[];
    totalDiscovered: number;
    totalMaxxed: number;
    trainingComplete: boolean;
    sewersComplete: boolean;
    forestComplete: boolean;
    caveComplete: boolean;
    skyComplete: boolean;
    HSBComplete: boolean;
    GRBComplete: boolean;
    clockComplete: boolean;
    twoDComplete: boolean;
    ghostComplete: boolean;
    jakeComplete: boolean;
    gaudyComplete: boolean;
    megaComplete: boolean;
    beardverseComplete: boolean;
    waldoComplete: boolean;
    antiWaldoComplete: boolean;
    badlyDrawnComplete: boolean;
    stealthComplete: boolean;
    beast1complete: boolean;
    chocoComplete: boolean;
    edgyComplete: boolean;
    edgyBootsComplete: boolean;
    prettyComplete: boolean;
    nerdComplete: boolean;
    metaComplete: boolean;
    partyComplete: boolean;
    godmotherComplete: boolean;
    typoComplete: boolean;
    fadComplete: boolean;
    jrpgComplete: boolean;
    exileComplete: boolean;
    radComplete: boolean;
    schoolComplete: boolean;
    westernComplete: boolean;
    spaceComplete: boolean;
    breadverseComplete: boolean;
    that70sComplete: boolean;
    halloweeniesComplete: boolean;
    rockLobsterComplete: boolean;
    constructionComplete: boolean;
    duckComplete: boolean;
    netherComplete: boolean;
    amalgamateComplete: boolean;
    pirateComplete: boolean;
    wandoosComplete: boolean;
    tutorialCubeComplete: boolean;
    numberComplete: boolean;
    flubberComplete: boolean;
    seedComplete: boolean;
    uugComplete: boolean;
    uugRingComplete: boolean;
    redLiquidComplete: boolean;
    brownHeartComplete: boolean;
    xlComplete: boolean;
    greenHeartComplete: boolean;
    itopodKeyComplete: boolean;
    purpleLiquidComplete: boolean;
    blueHeartComplete: boolean;
    jakeNoteComplete: boolean;
    purpleHeartComplete: boolean;
    orangeHeartComplete: boolean;
    greyHeartComplete: boolean;
    sigilComplete: boolean;
    evidenceComplete: boolean;
    pinkHeartComplete: boolean;
    severedHeadComplete: boolean;
    rainbowHeartComplete: boolean;
    beatingHeartComplete: boolean;
    normalBonusAccComplete: boolean;
    evilBonusAccComplete: boolean;
};

type inventoryImportType = {
    spaces: number;
    item1: number;
    item2: number;
    head: itemImportType;
    chest: itemImportType;
    legs: itemImportType;
    boots: itemImportType;
    weapon: itemImportType;
    weapon2: itemImportType;
    acc1: itemImportType;
    acc2: itemImportType;
    acc3: itemImportType;
    temp: itemImportType;
    trash: itemImportType;
    items: itemImportType[];
    accessories: itemImportType[];
    boostCombineState: stateImportType;
    inventory: itemImportType[];
    accs: (itemImportType | null)[];
    macguffins: (itemImportType | null)[];
    daycare: itemImportType[];
    daycareTimers: timeImportType[];
    itemList: itemListImportType;
    autoMergeSlot1: number;
    mergeTime: timeImportType;
    boostTime: timeImportType;
    loadouts: loadoutImportType[];
    cubePower: number;
    cubeToughness: number;
    selectedGraphic: number;
    disabled: boolean;
    kittyArt: number;
    unlockedKittyArt: boolean[];
    macguffinBonuses: number[];
};

export type nguImportType = {
    progress: number;
    level: number;
    evilProgress: number;
    evilLevel: number;
    sadisticProgress: number;
    sadisticLevel: number;
    energy: number;
    magic: number;
    target: number;
    evilTarget: number;
    sadisticTarget: number;
};

type perkInfoImportType = {
    level: number;
    perLevelCost: number;
    levelCap: number;
    type: valueImportType;
};

type wishImportType = {
    energy: number;
    magic: number;
    res3: number;
    level: number;
    progress: number;
};

type yggdrasilFruitImportType = {
    seconds: number;
    activated: boolean;
    unlockCost: number;
    totalLevels: number;
    maxTier: number;
    permCostPaid: boolean;
    usePoop: boolean;
    eatFruit: boolean;
    harvests: number;
};
export type yggdrasilFruitPermaImportType = {
    seconds: number;
    activated: boolean;
    unlockCost: number;
    totalLevels: number;
    maxTier: number;
    permCostPaid: boolean;
    usePoop: boolean;
    eatFruit: boolean;
    harvests: number;
    totalPermStatBonus: number;
    totalPermStatBonus2: number;
    totalPermNumberBonus: number;
};

export type playerImportType = {
    playerName: string;
    firstTimePlaying: boolean;
    version: number;
    lastTime: number;
    nextRebirthDifficulty: valueImportType;
    maxHP: number;
    curHP: number;
    hpRegen: number;
    attack: number;
    defense: number;
    gold: number;
    realGold: number;
    attackMulti: number;
    defenseMulti: number;
    nextAttackMulti: number;
    nextDefenseMulti: number;
    oldBossMulti: number;
    timeMulti: number;
    oldTimeMulti: number;
    exp: number;
    realExp: number;
    attackBoost: number;
    defenseBoost: number;
    energySpeed: number;
    capEnergy: number;
    curEnergy: number;
    idleEnergy: number;
    energyGained: number;
    energyPerBar: number;
    energyBars: number;
    energyPower: number;
    energyBarProgress: number;
    training: {
        _attackCaps: number[];
        _defenseCaps: number[];
        evilAttackCaps: number[];
        evilDefenseCaps: number[];
        _attackTraining: number[];
        _defenseTraining: number[];
        _attackEnergy: number[];
        _defenseEnergy: number[];
        _totalAttackLevels: number;
        _totalDefenseLevels: number;
        _attackBarProgress: number[];
        _defenseBarProgress: number[];
        _trainFactor: number[];
        _hasAutoAdvance: boolean;
        _autoAdvanceToggle: boolean;
    };
    bossID: number;
    bossAttack: number;
    bossDefense: number;
    bossRegen: number;
    bossCurHP: number;
    bossMaxHP: number;
    bossMulti: number;
    highestBoss: number;
    highestHardBoss: number;
    highestSadisticBoss: number;
    firstBossEver: boolean;
    currentHighestBoss: number;
    adventure: {
        attack: number;
        defense: number;
        regen: number;
        curHP: number;
        maxHP: number;
        respawnRate: number;
        attackSpeed: number;
        zone: number;
        autoattacking: boolean;
        boss1Spawn: timeImportType;
        boss1Defeated: boolean;
        titan1Kills: number;
        boss2Spawn: timeImportType;
        boss2Defeated: boolean;
        titan2Kills: number;
        boss3Spawn: timeImportType;
        boss3Defeated: boolean;
        titan3Kills: number;
        boss4Spawn: timeImportType;
        boss4Defeated: boolean;
        titan4Kills: number;
        boss5Spawn: timeImportType;
        boss5Defeated: boolean;
        waldoDefeats: number;
        waldoFinds: number;
        boss5Kills: number;
        titan5Kills: number;
        boss6Spawn: timeImportType;
        boss6Defeated: boolean;
        titan6Kills: number;
        clue1Complete: boolean;
        clue2Complete: boolean;
        clue3Complete: boolean;
        clue4Complete: boolean;
        titan6Unlocked: boolean;
        titan6Version: number;
        boss6Kills: number;
        titan6V1Kills: number;
        titan6V2Kills: number;
        titan6V3Kills: number;
        titan6V4Kills: number;
        boss7Spawn: timeImportType;
        boss7Defeated: boolean;
        titan7questStarted: boolean;
        titan7QuestSequence: number;
        titan7questComplete: boolean;
        titan7Kills: number;
        titan7Unlocked: boolean;
        titan7Version: number;
        boss7Kills: number;
        titan7V1Kills: number;
        titan7V2Kills: number;
        titan7V3Kills: number;
        titan7V4Kills: number;
        boss8Spawn: timeImportType;
        boss8Defeated: boolean;
        titan8questStarted: boolean;
        titan8QuestSequence: number;
        titan8questComplete: boolean;
        titan8Kills: number;
        titan8Unlocked: boolean;
        titan8Version: number;
        boss8Kills: number;
        titan8V1Kills: number;
        titan8V2Kills: number;
        titan8V3Kills: number;
        titan8V4Kills: number;
        skeletonWhacked: boolean;
        icarusWhacked: boolean;
        emptyNameWhacked: boolean;
        kingCircleWhacked: boolean;
        robBossWhacked: boolean;
        boss9Spawn: timeImportType;
        boss9Defeated: boolean;
        titan9questStarted: boolean;
        titan9questComplete: boolean;
        titan9SpecialReward: boolean;
        titan9Kills: number;
        titan9Unlocked: boolean;
        titan9Version: number;
        boss9Kills: number;
        titan9V1Kills: number;
        titan9V2Kills: number;
        titan9V3Kills: number;
        titan9V4Kills: number;
        boss10Spawn: timeImportType;
        boss10Defeated: boolean;
        titan10questStarted: boolean;
        titan10SpecialReward: boolean;
        titan10Kills: number;
        titan10Unlocked: boolean;
        titan10Version: number;
        boss10Kills: number;
        titan10V1Kills: number;
        titan10V2Kills: number;
        titan10V3Kills: number;
        titan10V4Kills: number;
        boss11Spawn: timeImportType;
        boss11Defeated: boolean;
        titan11Kills: number;
        titan11Unlocked: boolean;
        titan11Version: number;
        boss11Kills: number;
        titan11V1Kills: number;
        titan11V2Kills: number;
        titan11V3Kills: number;
        titan11V4Kills: number;
        boss12Spawn: timeImportType;
        boss12Defeated: boolean;
        titan12Kills: number;
        titan12Unlocked: boolean;
        titan12Version: number;
        boss12Kills: number;
        titan12V1Kills: number;
        titan12V2Kills: number;
        titan12V3Kills: number;
        titan12V4Kills: number;
        ratTitanDefeated: boolean;
        boss13Spawn: timeImportType;
        finalTitanDefeated: boolean;
        boss14Spawn: timeImportType;
        itopodStart: number;
        itopodEnd: number;
        highestItopodLevel: number;
        itopod: itopodImportType;
        beastModeOn: boolean;
        didAdvAdvance: boolean;
        move69Unlocked: boolean;
        move69Used: number;
    };
    inventory: inventoryImportType;
    advancedTraining: {
        training: number[];
        level: tenNumber;
        bankedLevel: number[];
        energy: number[];
        barProgress: number[];
        levelTarget: number[];
        transferredBankedLevels: boolean;
        autoAdvance: boolean;
    };
    augments: {
        augs: augmentImportType[];
        advanceEnergy: boolean;
    };
    magic: {
        capMagic: number;
        curMagic: number;
        idleMagic: number;
        magicBarSpeed: number;
        magicPerBar: number;
        magicGained: number;
        magicPower: number;
        magicBarProgress: number;
    };
    machine: {
        baseGold: number;
        machineProgress: number;
        machineEnergy: number;
        realBaseGold: number;
        speedLevel: number;
        levelSpeed: number;
        speedBuildTime: number;
        speedProgress: number;
        speedEnergy: number;
        speedGoldCost: number;
        goldMultiLevel: number;
        levelGoldMulti: number;
        goldMultiBuildTime: number;
        goldMultiProgress: number;
        goldMultiMagic: number;
        goldMultiGoldCost: number;
        speedTarget: number;
        multiTarget: number;
        speedBankLevels: number;
        goldMultiBankLevels: number;
        transferredBankLevels: boolean;
    };
    bloodMagic: {
        rituals: null[];
        ritual: bloodRitualImportType[];
        bloodPoints: number;
        rebirthPower: number;
        adventureSpellTime: timeImportType;
        macguffin1Time: timeImportType;
        macguffin2Time: timeImportType;
        goldSpellBlood: number;
        lootSpellBlood: number;
        rebirthAutoSpell: boolean;
        lootAutoSpell: boolean;
        goldAutoSpell: boolean;
    };
    rebirthTime: timeImportType;
    totalPlaytime: timeImportType;
    lootState: stateImportType;
    boostState: stateImportType;
    purchases: {
        hasCustomEnergyButton1: boolean;
        hasCustomEnergyButton2: boolean;
        hasCustomMagicButton1: boolean;
        hasCustomMagicButton2: boolean;
        hasAutoAdvance: boolean;
        hasFilter: boolean;
        hasAcc3: boolean;
        boost: number;
        boostCombineLevel: number;
        hasAutoMerge: boolean;
        hasAutoBoost: boolean;
        hasCustomEnergyPercent1: boolean;
        hasCustomEnergyPercent2: boolean;
        hasCustomMagicPercent1: boolean;
        hasCustomMagicPercent2: boolean;
        hasCustomRes3Percent1: boolean;
        hasCustomRes3Percent2: boolean;
        hasCustomIdleEnergyPercent1: boolean;
        hasCustomIdleEnergyPercent2: boolean;
        hasCustomIdleMagicPercent1: boolean;
        hasCustomIdleMagicPercent2: boolean;
        hasCustomIdleRes3Percent1: boolean;
        hasCustomIdleRes3Percent2: boolean;
        hasAcc5: boolean;
        hasloadout1: boolean;
        hasloadout2: boolean;
        hasBeardSlot1: boolean;
        hasDaycare: boolean;
        hasDaycareSlot2: boolean;
        hasDaycareSlot3: boolean;
        hasDiggerSlot1: boolean;
        hasDiggerSlot2: boolean;
        hasMacguffinSlot1: boolean;
        hasMacguffinSlot2: boolean;
        hasSpecialPrize1: boolean;
        choseKitty: boolean;
        holidayspins: number;
        hasInvMerge: boolean;
    };
    stats: {
        rebirthNumber: number;
        highestBoss: number;
        lifeTimeEnergy: number;
        advBossesKilled: number;
        highestDamageDealt: number;
        highestDamageTaken: number;
        totalExp: number;
        totalGold: number;
        titansDefeated: number;
        bossesDefeated: number;
        lastBloodMagic: number;
        poopUsed: number;
    };
    perks: {
        statPerk: perkInfoImportType;
        advStat1: perkInfoImportType;
        lootPerk: perkInfoImportType;
        energyPower1: perkInfoImportType;
        magicPower1: perkInfoImportType;
        energyBar1: perkInfoImportType;
        magicBar1: perkInfoImportType;
        discount1: perkInfoImportType;
        cooldown1: perkInfoImportType;
        goldBoost1: perkInfoImportType;
        recycleBonus1: perkInfoImportType;
        paralyze: perkInfoImportType;
        wandoos1: perkInfoImportType;
        yggdrasil1: perkInfoImportType;
        respecTime: timeImportType;
    };
    settings: {
        numberDisplay: number;
        tooltipsOn: boolean;
        special1Bought: boolean;
        special2Bought: boolean;
        special3Bought: boolean;
        specialAdvHpBars: boolean;
        filterOn: boolean;
        wandoos98On: boolean;
        customEnergy1: number;
        customEnergy2: number;
        customMagic1: number;
        customMagic2: number;
        yggdrasilOn: boolean;
        filterHead: boolean;
        filterChest: boolean;
        filterLegs: boolean;
        filterBoots: boolean;
        filterWeapon: boolean;
        filterAccessory: boolean;
        filterBoosts: boolean;
        filterBoostAtk: boolean;
        filterBoostDef: boolean;
        filterBoostSpec: boolean;
        filterMisc: boolean;
        filterTitan: boolean;
        syncTraining: boolean;
        hasHyperRegen: boolean;
        rebirthDifficulty: valueImportType;
        rebirthLevels: number;
        speedrunCount: number;
        gotSpeedrunSecret: boolean;
        nguOn: boolean;
        inventoryOn: boolean;
        antiFlickerBars: boolean;
        autoAssignOn: boolean;
        autoAssignTime: number;
        machineEnergyAmount: number;
        machineGoldMultiAmount: number;
        tutorialState: -1;
        tutorialOffForever: boolean;
        tutorial1Complete: boolean;
        expPopups: boolean;
        dailySaveRewardTime: timeImportType;
        submitHighscores: boolean;
        timedTooltipsOn: boolean;
        autoMergeOn: boolean;
        inputAmount: number;
        autoKillTitans: boolean;
        autoBoostOn: boolean;
        customEnergyPercent1: number;
        customEnergyPercent2: number;
        customMagicPercent1: number;
        customMagicPercent2: number;
        customRes3Percent1: number;
        customRes3Percent2: number;
        customIdleEnergyPercent1: number;
        customIdleEnergyPercent2: number;
        customIdleMagicPercent1: number;
        customIdleMagicPercent2: number;
        customIdleRes3Percent1: number;
        customIdleRes3Percent2: number;
        autoboostRecycledBoosts: boolean;
        unassignWhenSwapping: boolean;
        shakeySales: boolean;
        beardsOn: boolean;
        beardPopup: boolean;
        checkForUpdates: boolean;
        fancyYggBars: boolean;
        autoTransform: number;
        simpleInvShortcuts: boolean;
        poopOnlyMaxTier: boolean;
        itopodOn: boolean;
        itopodConfirmation: boolean;
        buffedKillsOn: boolean;
        customPowerAmount: number;
        customBarAmount: number;
        customCapAmount: number;
        customMagicPowerAmount: number;
        customMagicBarAmount: number;
        customMagicCapAmount: number;
        customRes3PowerAmount: number;
        customRes3BarAmount: number;
        customRes3CapAmount: number;
        customAttackInput: number;
        customDefenseInput: number;
        customPowerInput: number;
        customToughnessInput: number;
        customHPInput: number;
        customRegenInput: number;
        beastModeUnlocked: boolean;
        diggersOn: boolean;
        nguLevelTrack: valueImportType;
        pitUnlocked: boolean;
        themeID: number;
        genericRes3ColourID: number;
        beastConfirmation: boolean;
        beastOn: boolean;
        useMajorQuests: boolean;
        autoNukeOn: boolean;
        nguCapModifier: number;
        idleQuestAutocycle: boolean;
        res3NameGeneratorOn: boolean;
        claimedKartPromo: boolean;
        claimedSteamPromo: boolean;
        assholeSetting: boolean;
        badge1Complete: boolean;
        badge2Started: boolean;
        badge2Part1Complete: boolean;
        badge2Part2Complete: boolean;
        badge2Part3Complete: boolean;
        badge2Part4Complete: boolean;
        invAutoMergeOn: boolean;
        invAutoBoostOn: boolean;
        exilev4Defeated: boolean;
        prizePicked: number;
        picked2ndPrize: boolean;
        isNaughty: boolean;
        foilsOn: boolean;
    };
    challenges: {
        basicChallenge: challengeImportType;
        noAugsChallenge: challengeImportType;
        hour24Challenge: challengeImportType;
        levelChallenge10k: challengeImportType;
        noEquipmentChallenge: challengeImportType;
        noRebirthChallenge: challengeImportType;
        trollChallenge: challengeImportType;
        laserSwordChallenge: challengeImportType;
        blindChallenge: challengeImportType;
        nguChallenge: challengeImportType;
        timeMachineChallenge: challengeImportType;
        unlocked: boolean;
        inChallenge: boolean;
        curChallengeType: valueImportType;
        curPoints: number;
        maxPoints: number;
        trollCounter: number;
        trollUnlocked: boolean;
        trollDisplay: boolean;
        trollMenuSwap: boolean;
        trollDivided: boolean;
        blindChallengeUnlocked: boolean;
        laserSwordChallengeUnlocked: boolean;
    };
    pit: {
        totalGold: number;
        highestTier: number;
        tossedGold: boolean;
        pitState: stateImportType;
        pitTime: timeImportType;
        tier1TRewarded: boolean;
        tier2TRewarded: boolean;
        tier3TRewarded: boolean;
        tier4TRewarded: boolean;
        tier5TRewarded: boolean;
        tossCount: number;
    };
    lootBoxes: {
        expBoxCount: number;
        expBoxState: stateImportType;
        advBoxCount: number;
        advBoxState: stateImportType;
        dailyBoxCount: number;
        dailyBoxState: stateImportType;
    };
    wandoos98: {
        energyProgress: number;
        magicProgress: number;
        bootupProgress: number;
        wandoosEnergy: number;
        wandoosMagic: number;
        energyLevel: number;
        magicLevel: number;
        baseEnergyTime: number;
        baseMagicTime: number;
        OSlevel: number;
        pitOSLevels: number;
        XLLevels: number;
        installed: boolean;
        disabled: boolean;
        bootupTime: timeImportType;
        installTime: timeImportType;
        os: valueImportType;
    };
    yggdrasil: {
        goldFruit: yggdrasilFruitImportType;
        adventureFruit: yggdrasilFruitImportType;
        luckFruit: yggdrasilFruitImportType;
        statFruit: yggdrasilFruitImportType;
        knowledgeFruit: yggdrasilFruitImportType;
        pomegranate: yggdrasilFruitImportType;
        fruits: (yggdrasilFruitImportType | yggdrasilFruitPermaImportType)[];
        resetFactor: number;
        statBonus: number;
        seeds: number;
        totalLuck: number;
        totalPermStatBonus: number;
        permBonusOn: boolean;
        totalPermStatBonus2: number;
        totalPermNumberBonus: number;
        permNumberBonusOn: boolean;
        usePoop: boolean;
    };
    NGU: {
        skills: nguImportType[];
        magicSkills: nguImportType[];
        autoAdvance: boolean;
        disabled: false;
    };
    arbitrary: {
        arbitraryPoints: number;
        lifetimePoints: number;
        curArbitraryPoints: number;
        curLifetimePoints: number;
        energyPotion1Count: number;
        energyPotion1Time: timeImportType;
        energyPotion2Count: number;
        energyPotion2InUse: boolean;
        magicPotion1Count: number;
        magicPotion1Time: timeImportType;
        magicPotion2Count: number;
        magicPotion2InUse: boolean;
        lootCharm1Count: number;
        lootcharm1Time: timeImportType;
        energyBarBar1Count: number;
        energyBarBar1Time: timeImportType;
        magicBarBar1Count: number;
        magicBarBar1Time: timeImportType;
        macGuffinBooster1Count: number;
        macGuffinBooster1Time: timeImportType;
        macGuffinBooster1InUse: boolean;
        nukeTimer: timeImportType;
        boughtAutoNuke: boolean;
        lootFilter: boolean;
        improvedAutoBoostMerge: boolean;
        instaTrain: boolean;
        inventorySpaces: number;
        hasStarterPack: boolean;
        hasAcc4: boolean;
        hasAcc5: boolean;
        hasAcc6: boolean;
        hasAcc7: boolean;
        hasAcc8: boolean;
        hasAcc9: boolean;
        hasYggdrasilReminder: boolean;
        hasExtendedSpinBank: boolean;
        curLoadoutSlots: number;
        poop1Count: number;
        energyPotion3Count: number;
        magicPotion3Count: number;
        beardSlots: number;
        hasCubeFilter: boolean;
        lootCharm2Count: number;
        hasDaycareSpeed: boolean;
        boughtNewbiePack: boolean;
        boughtAscendedNewbiePack: boolean;
        boughtAscendedNewbiePack2: boolean;
        boughtAscendedNewbiePack3: boolean;
        boughtAscendedNewbiePack4: boolean;
        boughtFashionPack1: boolean;
        boughtLazyITOPOD: boolean;
        lazyITOPODOn: boolean;
        boughtRes3Pack: boolean;
        diggerSlots: number;
        macguffinSlots: number;
        nameSlotsBought: number;
        beastButterCount: number;
        hasQuestLight: boolean;
        hasFasterQuests: boolean;
        hasExtendedQuestBank: boolean;
        boughtDaycareArt: boolean;
        hasNGUCapModifier: boolean;
        res3Potion1Count: number;
        res3Potion1Time: timeImportType;
        res3Potion2Count: number;
        res3Potion2InUse: boolean;
        res3Potion3Count: number;
        res3NameGeneratorBought: boolean;
        wishSpeedBoster: boolean;
        wishSlotsBought: number;
        boughtFoils: boolean;
        gotTagslot1: boolean;
        mayoGenSlots: number;
        deckSpaceBought: number;
        mayoSpeedPotCount: number;
        mayoSpeedPotTime: timeImportType;
        cardTierUpperCount: number;
        invMergeSlots: number;
        advLightBought: boolean;
        advAdvancerBought: boolean;
        advAdvancerZone: number;
        goToQuestZoneBought: boolean;
    };
    achievements: {
        achievementComplete: boolean[];
        totalAchieves: number;
    };
    daily: {
        totalSpins: number;
        spinTime: timeImportType;
        dailyRewardState: stateImportType;
        freeSpins: number;
    };
    beards: {
        beards: (beardImportType | null)[];
        activeBeards: number[];
        capBeards: number;
        energyBeardCount: number;
        magicBeardCount: number;
        disabled: boolean;
        transferredBankedLevels: boolean;
    };
    diggers: {
        diggers: diggerImportType[];
        activeDiggers: number[];
        loadoutDiggers: number[];
    };
    beastQuest: beastQuestImportType;
    res3: {
        capRes3: number;
        curRes3: number;
        idleRes3: number;
        res3BarSpeed: number;
        res3PerBar: number;
        res3Gained: number;
        res3Power: number;
        res3BarProgress: number;
        res3Name: string;
        res3R: number;
        res3G: number;
        res3B: number;
        res3On: boolean;
    };
    hacks: {
        hacks: hackImportType[];
        hacksOn: boolean;
        autoAdvance: boolean;
        target: number;
        disabled: boolean;
    };
    wishes: {
        wishes: wishImportType[];
        wishesOn: boolean;
        filterDiff: boolean;
        filterAfford: boolean;
        filterMaxxed: boolean;
        orderType: valueImportType;
    };
    portraits: {
        portraitUnlocked: boolean[];
        curPortrait: number;
    };
    bestiary: {
        enemies: { kills: number }[];
    };
    cards: {
        cards: cardImportType[];
        manas: cardManaImportType[];
        cardsOn: boolean;
        bonuses: sixteenNumber;
        cardState: stateImportType;
        chonkerState: stateImportType;
        cardSpawnTimer: timeImportType;
        chonkerSpawnTimer: timeImportType;
        taggedBonuses: valueImportType[];
        cardsGenerated: number;
        extraDeckSpace: 0;
    };
    cooking: cookingImportType;
};
