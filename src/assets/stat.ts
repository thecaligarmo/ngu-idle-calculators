export const Stat: { [k: string]: string } = {
    // Boss
    ATTACK: "attack",
    DEFENSE: "defense",
    // adventure
    POWER: "power",
    TOUGHNESS: "toughness",
    HEALTH: "health",
    REGEN: "regen",
    BLOCK_REDUCTION: "blockReduction",
    MOVE_COOLDOWN: "moveCooldown",
    RESPAWN: "respawn",
    DAYCARE_SPEED: "daycareSpeed",
    DAYCARE_TIME: "daycareTime",
    // Drop
    GOLD_DROP: "goldDrops",
    DROP_CHANCE: "dropChance",
    QUEST_DROP: "questDrops",
    QUEST_REWARD: "questReward",
    QUEST_REWARD_ACTIVE: "questRewardActive",
    // Ygg
    SEED_GAIN: "seedGain",
    YGGDRASIL_YIELD: "yggdrasilYield",
    // Energy
    ENERGY_BARS: "energyBars",
    ENERGY_CAP: "energyCap",
    ENERGY_POWER: "energyPower",
    ENERGY_SPEED: "energySpeed",
    ENERGY_NGU_SPEED: "energyNGUSpeed",
    ENERGY_BEARD_SPEED: "energyBeardSpeed",
    ENERGY_WANDOOS_SPEED: "energyWandoosSpeed",
    // Magic
    MAGIC_BARS: "magicBars",
    MAGIC_CAP: "magicCap",
    MAGIC_POWER: "magicPower",
    MAGIC_SPEED: "magicSpeed",
    MAGIC_NGU_SPEED: "magicNGUSpeed",
    MAGIC_BEARD_SPEED: "magicBeardSpeed",
    MAGIC_WANDOOS_SPEED: "magicWandoosSpeed",
    // Resource 3
    RES3_BARS: "resource3Bars",
    RES3_CAP: "resource3Cap",
    RES3_POWER: "resource3Power",
    // raw speed
    AT_SPEED: "rawATSpeed",
    AUGMENT_SPEED: "rawAugmentSpeed",
    AUGMENT_EFFECT: "augmentEffect", // TODO - No idea what this is for
    HACK_SPEED: "rawHackSpeed",
    WISH_SPEED: "rawWishSpeed",
    TIME_MACHINE_SPEED: "rawTimeMachineSpeed",
    BOOSTS_BOOST: "boostsBoost",
    MAYO_GENERATOR: "mayoGeneration",
    MAYO_SPEED: "mayoSpeed",
    CARD_GENERATOR: "cardGeneration",
    CARD_SPEED: "cardSpeed",
    TAG_EFFECT: "tagEffect",
    // junk
    AP: "AP",
    PP: "PP",
    NUMBER: "number",
    TIME_MACHINE: "timeMachine",
    BLOOD: "blood",
    EXPERIENCE: "experience",
    COOKING: "cooking",
} as const satisfies { [k: string]: string };
