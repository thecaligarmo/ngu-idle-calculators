import { isEvilMode, isSadMode } from "@/helpers/gameMode"
import { bd, bigdec_equals, bigdec_min, greaterThan, toNum } from "@/helpers/numbers"
import bigDecimal from "js-big-decimal"
import { ENEMY_TYPE, Enemies, Enemy } from "./enemy"

const boostTable : number[] = [0, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000]

export default class Zone {
    id: number
    key: string
    name: string
    boosts: number[][]
    enemies: Enemy[]
    exp: number[]
    // optional
    bossChanceVal: number
    level: number // Only for ITOPOD and TItans
    constructor(id: number, key: string, name: string, boosts: number[][], exp: number[], enemies: Enemy[], level: number = 0,  bossChanceVal : number = -1) {
        this.id = id
        this.key = key
        this.name = name
        this.boosts = boosts // [ [BoostValue, BoostChance, MaxBoostChance], ... ]
        this.exp = exp // [ Value, Chance, MaxChance]
        this.enemies = enemies
        this.bossChanceVal = bossChanceVal
        this.level = level
    }
    setLevel(level : number | bigDecimal) {
        level = toNum(level)
        this.level = level
        // For Itopod, update boosts
        if (this.id === 0) {
            let boostValue = 1
            if (level >= 1150) {
                boostValue = 10000
            } else if (level >= 850) {
                boostValue = 5000
            } else if (level >= 700) {
                boostValue = 2000
            } else if (level >= 450) {
                boostValue = 1000
            } else if (level >= 400) {
                boostValue = 500
            } else if (level >= 350) {
                boostValue = 200
            } else if (level >= 300) {
                boostValue = 100
            } else if (level >= 250) {
                boostValue = 50
            } else if (level >= 200) {
                boostValue = 20
            } else if (level >= 150) {
                boostValue = 10
            } else if (level >= 100) {
                boostValue = 5
            } else if (level >= 50) {
                boostValue = 2
            }
            
            this.boosts = [[boostValue, 14, 14]]
        }

        const expChance = 1 / Math.max(20, 40 - Math.ceil((level + 1) / 50))
        if (level >= 50) {
            this.exp = [Math.floor(level / 50) * (Math.floor(level / 50) - 1) + 2, expChance, expChance]
        } else {
            this.exp = [1, expChance, expChance]
        }
    }
    hardestEnemy() : Enemy {
        let hp = bd(0)
        let toughness = bd(0)
        let power = bd(0)
        let retEnemy = this.enemies[0];
        this.enemies.forEach((enemy) => {
            if( greaterThan(enemy.hp(), hp)) {
                retEnemy = enemy
                toughness = enemy.toughness()
                power = enemy.power()
                hp = enemy.hp()
            }  else if (bigdec_equals(enemy.hp(), hp) && greaterThan(enemy.toughness(), toughness)) {
                retEnemy = enemy
                toughness = enemy.toughness()
                power = enemy.power()
                hp = enemy.hp()
            } else if (bigdec_equals(enemy.hp(), hp) && bigdec_equals(enemy.toughness(), toughness) && greaterThan(enemy.power(), power)) {
                retEnemy = enemy
                toughness = enemy.toughness()
                power = enemy.power()
                hp = enemy.hp()
            }
        })
        return retEnemy
    }
    bossChance() : bigDecimal {
        if (this.bossChanceVal > 0) {
            return bd(this.bossChanceVal)
        }
        let bossEnemies = 0
        this.enemies.forEach((enemy) => {
            if (enemy.isBoss) {
                bossEnemies += 1
            }
        })
        return bd(bossEnemies).divide(bd(this.enemies.length))
    }
    paralyzeEnemies() : bigDecimal {
        let paralyzeEnemies = 0
        let paralyzeBosses = 0
        let totalNormals = 0
        let totalBosses = 0
        this.enemies.forEach((enemy) => {
            if (enemy.type === ENEMY_TYPE.PARALYZE || enemy.type === ENEMY_TYPE.POISONPARALYZE) {
                if(enemy.isBoss) {
                    paralyzeBosses += 1
                } else {
                    paralyzeEnemies += 1
                }
            }

            if(enemy.isBoss) {
                totalBosses += 1
            } else {
                totalNormals += 1
            }

        })
        const bossChance = this.bossChance()
        const chanceParalyze = bd(paralyzeEnemies).multiply(bd(1).subtract(bossChance)).divide(bd(totalNormals))
        const chanceBossParalyze = bd(paralyzeBosses).multiply(bossChance).divide(bd(totalBosses))
        return chanceParalyze.add(chanceBossParalyze)
    }
    boostedValue(boostRecyclying : bigDecimal) : bigDecimal[] { 
        const boostedVals : bigDecimal[] = []

        this.boosts.forEach((boost) => {
            const recycledValue = boostTable.reduce((boostSum, boostVal) => {
                if (boostVal <= boost[0]) {
                    return boostSum.multiply(boostRecyclying).divide(bd(100)).add(bd(boostVal));
                }
                return boostSum
            }, bd(0))
            
            boostedVals.push(recycledValue)
        })
        return boostedVals
    }

    baseChance(dropChance: bigDecimal) : bigDecimal {
        if (this.id >= 22) {
            return bd(Math.pow(toNum(dropChance.divide(bd(100))), 1/3))
        }
        return dropChance.divide(bd(100))
    }

    boostChances(dropChance : bigDecimal) : bigDecimal[] {
        const boostChance : bigDecimal[] = []

        this.boosts.forEach((boost) => {
            const maxChance = bd(boost[1]).divide(bd(100)).multiply(this.baseChance(dropChance))
            boostChance.push(bigdec_min(bd(boost[2]).divide(bd(100)), maxChance))
        })
        return boostChance
    }

    expChance(dropChance : bigDecimal) : bigDecimal {
        let maxChance = bd(1)
        if (this.id >= 22) {
            const root = Math.pow(toNum(dropChance.divide(bd(100))), 1/3)
            maxChance = bd(this.exp[1]).divide(bd(100)).multiply(bd(root))

        } else {
            maxChance = bd(this.exp[1]).divide(bd(100)).multiply(dropChance).divide(bd(100))
        }
        return bigdec_min(bd(this.exp[2]).divide(bd(100)), maxChance).multiply(this.bossChance())
    }

    getKillsPerHour(totalPower: bigDecimal, idleAttackModifier : bigDecimal, redLiquidBonus : boolean = false, totalRespawnTime : bigDecimal = bd(4)) : bigDecimal {
        const idleAttackCooldown = redLiquidBonus ? bd(0.8) : bd(1)
        const respawnTime = totalRespawnTime.round(2, bigDecimal.RoundingModes.CEILING)
        return bd(60 * 60).divide( respawnTime.add(idleAttackCooldown.multiply(bd(this.getHitsPerKill(totalPower, idleAttackModifier))))).floor()
    }

    getHitsPerKill(totalPower: bigDecimal, idleAttackModifier : bigDecimal) : number {
        // =MAX ( 1.05 ^ ( G51 - MAX(0,LOG(B2/765 * B10, 1.05))) ,1)
        if (this.id == 0) {
            return Math.max(
                1.05 ** (
                    this.level - Math.max(
                                            0,
                                            Math.log(toNum(totalPower.multiply(idleAttackModifier).divide(bd(765)))) / Math.log(1.05)
                                        )
                        ),
                1
            )
        } else {
            const hits = this.enemies.map(function(enemy) {
                return enemy.numHitsToKill(totalPower, idleAttackModifier)
            })

            return toNum(hits.reduce((prev, cur) => {return prev.add(cur)}, bd(0)).divide(bd(hits.length)))
        }
        return 1
    }

    // ITOPOD Specific things
    // TODO - Make it a subclass of Zone
    cycleLength() : bigDecimal {
        if (this.id === 0) { 
            return bd(Math.max(20, 40 - Math.ceil((this.level + 1) / 50)))
        }
        return bd(1)
    }
    getOptimalFloor(power : bigDecimal, idleAttackModifier : bigDecimal) : number {
        return Math.max(
            0,
            Math.floor(
                Math.log(toNum(power.multiply(idleAttackModifier).divide(bd(765)))) / Math.log(1.05)
            )
        )
    }
    getPPPPerKill(gameMode:bigDecimal, totalPPBonus : bigDecimal = bd(1), bluePill : boolean = false, blueHeart : boolean = false, bonusPPP : number | bigDecimal = 0) : bigDecimal{
        const bluePillMultiplier = bluePill
                                    ? (blueHeart ? bd(2.2) : bd(2))
                                    : bd(1)
    
        bonusPPP = toNum(bonusPPP)
        
        let floorAdd = 200
        if(isEvilMode(gameMode)) {
            floorAdd = 700
        } else if(isSadMode(gameMode)) {
            floorAdd = 2000
        }
    
        return totalPPBonus
                .divide(bd(100))
                .multiply(bluePillMultiplier)
                .multiply(bd(this.level + floorAdd + bonusPPP))
                .floor()
    
    }
}

/*
    id: number, key: string, name: string,
    boosts: number[][], exp: number[],
    enemies: Enemy[],
    level: number = 0,  bossChanceVal : number = -1
*/
export const Zones : {[key: string]: Zone} = {
    MISC: new Zone(-4, 'misc', 'Miscellaneous', [], [], []),
    HEART: new Zone(-3, 'hearts', 'My Hearts <3', [], [], []),
    FOREST_PENDANT: new Zone(-2, 'pendants', 'Forest Pendant', [], [], []),
    LOOTY: new Zone(-1, 'looty', 'Looty', [], [], []),
    ITOPOD: new Zone(
            0, 'itopod', 'ITOPOD',
            [], [],
            []
        ),
    SAFE: new Zone(
            1, 'safe', 'Safe Zone',
            [], [],
            []
        ),
    TUTORIAL: new Zone(
            2, 'training', 'Tutorial Zone',
            [[1, 15, 100]], [1, 7, 8],
            [Enemies.A_SMALL_PIECE_OF_FLUFF, Enemies.FLOATING_SEWAGE, Enemies.A_STICK, Enemies.A_SMALL_MOUSE]
        ),
    SEWERS: new Zone(
            3, 'sewers', 'Sewers',
            [[1, 15, 100]], [1, 8.5, 10],
            [Enemies.SMALL_MOUSE, Enemies.SLIGHTLY_BIGGER_MOUSE, Enemies.BIG_RAT, Enemies.BROWN_SLIME]
        ),
    FOREST: new Zone(
            4, 'forest', 'Forest',
            [[1, 12, 100], [2, 8, 100]], [1, 10, 12],
            [Enemies.SKELETON, Enemies.GOBLIN, Enemies.ORC, Enemies.ZOMBIE, Enemies.ENT, Enemies.GIANT, Enemies.RAT_OF_UNUSUAL_SIZE, Enemies.FAIRY, Enemies.GORGON]
        ),
    CAVE: new Zone(
            5, 'cave', 'Cave of Many Things',
            [[1, 13, 100], [2, 12, 100]], [1, 12, 15],
            [Enemies.GORGONZOLA, Enemies.BRIE, Enemies.GOUDA, Enemies.BLUE_CHEESE, Enemies.PARMESAN, Enemies.LIMBURGER, Enemies.MEGA_RAT, Enemies.ROBOT, Enemies.FLUFFY_CHAIR, Enemies.COUCH, Enemies.FLOPPY_MATTRESS, Enemies.EVIL_FRIDGE, Enemies.T800, Enemies.WIDE_SCREEN_TV, Enemies.KITCHEN_SINK, Enemies.CHAD]
        ),
    SKY: new Zone(
            6, 'sky', 'The Sky',
            [[2, 8, 100], [5, 8, 100]], [1, 16, 20],
            [Enemies.ICARUS_PROUDBOTTOM, Enemies.KID_ON_A_CLOUD, Enemies.NINJA_SAMURAI, Enemies.GIGANTIC_FLOCK_OF_SEAGULLS, Enemies.SEVENFORTYSEVEN, Enemies.TWO_HEADED_GUY, Enemies.LESTER, Enemies.ORIENTAL_DRAGON, Enemies.BIRD_PERSON, Enemies.GFOCG]
        ),
    HSB: new Zone(
            7, 'HSB', 'High Security Base',
            [[2, 6, 100], [5, 1.5, 100]], [2, 9, 12],
            [Enemies.HIGH_SECURITY_INSECT_GUARD_1, Enemies.HIGH_SECURITY_INSECT_GUARD_2, Enemies.WHOLE_LOTTA_GUARDS, Enemies.THE_EXPERIMENT, Enemies.GROSS_GREEN_ALIEN, Enemies.THE_RAT_GOD, Enemies.HOOLOOVOO, Enemies.MASSIVE_PLANT_MONSTER, Enemies.MEGA_GUARD, Enemies.SPIKY_HAIRED_GUY]
        ),
    GRB: new Zone(
            8, 'GRB', 'Gordon Ramsay Bolton',
            [], [],
            []
        ),
    CLOCK: new Zone(
            9, 'clock', 'Clock Dimension',
            [[5, 3, 15], [10, 3, 15]], [2, 10, 16],
            [Enemies.MONDAY, Enemies.TUESDAY, Enemies.WEDNESDAY, Enemies.THURSDAY, Enemies.FRIDAY, Enemies.SATURDAY, Enemies.SUNDAY, Enemies.SUNDAE],
            0, 2/9
        ),
    GCT: new Zone(
            10, 'GCT', 'Grand Corrupted Tree',
            [], [],
            []
        ),
    TWO_D: new Zone(
            11, 'twoD', 'The 2D Universe',
            [[10, 7, 15], [20, 7, 15]], [3, 5, 15],  [Enemies.A_FLAT_MOUSE, Enemies.A_TINY_TRIANGLE, Enemies.A_SQUARE_BEAR, Enemies.THE_PENTAGON, Enemies.THE_FIRST_STOP_SIGN, Enemies.THE_SECOND_STOP_SIGN, Enemies.KING_CIRCLE, Enemies.SUPER_HEXAGON]
        ),
    ANCIENT_BATTLEFIELD: new Zone(
            12, 'ghost', 'Ancient Battlefield',
            [[10, 6, 20],[20, 6, 20]], [5, 3, 10],  [Enemies.GHOST_MICE, Enemies.CRASPER_THE_PISSED_OFF_GHOST, Enemies.LIVING_ARMOR, Enemies.LIVING_ARMOUR, Enemies.QUOTES, Enemies.THE_PANTHEON_OF_FALLEN_GODS, Enemies.GHOST_DAD, Enemies.MYSTERIOUS_FIGURE]
        ),
    JAKE: new Zone(
            13, 'jake', 'Jake from Accounting',
            [], [],
            []
        ),
    AVSP: new Zone(
            14, 'avsp', 'A Very Strange Place',
            [[20, 3, 25],[50, 3, 25]], [10, 1, 10],
            [Enemies.THE_ENTIRE_ALPHABET_UP_A_COCONUT_TREE, Enemies.THE_LUMMOX, Enemies.A_METAL_SLIME, Enemies.A_GINORMOUS_SWORD, Enemies.AN_ORDINARY_CHICKEN, Enemies.SEVENFORTYTHREE_CHICKENS, Enemies.VIC, Enemies.KENNY]
        ),
    MEGA: new Zone(
            15, 'mega', 'Mega Lands',
            [[50, 1.1, 15], [100, 1.1, 15]], [15, 0.5, 10],
            [Enemies.BROKEN_VCR_MAN, Enemies.KITTEN_IN_A_MECH_WOMAN, Enemies.MR_PLOW, Enemies.ROBUTT, Enemies.FORMER_CANADIAN_PM_STEPHEN_HARPER, Enemies.A_CYBERDEMON, Enemies.ROBO_RAT_9000, Enemies.BUTTER_PASSING_ROBOT, Enemies.DOCTOR_WAHWEE],
            0, 1/5
        ),
    UUG: new Zone(
            16, 'uug', 'UUG, The Unmentionable',
            [], [],
            []
        ),
    BEARDVERSE: new Zone(
            17, 'beardverse', 'The Beardverse',
            [[50, 0.35, 25], [100, 0.35, 25]], [20, 0.2, 10], 
            [Enemies.A_BEARDED_LADY, Enemies.A_BEARDED_MAN, Enemies.COUSIN_ITT, Enemies.A_NAKED_MOLERAT, Enemies.ROB_BOSS, Enemies.GOSSAMER, Enemies.ORANGE_TOUPEE_WITH_FISTS, Enemies.A_CLOGGED_SHOWER_DRAIN]
        ),
    WALDERP: new Zone(
            18, 'walderp', 'Walderp',
            [], [],
            []
        ),
    BDW: new Zone(
            19, 'badlyDrawn', 'Badly Drawn World',
            [[100, 0.1, 20], [200, 0.1, 20]], [25, 0.05, 10],
            [Enemies.BADLY_DRAWN_DRAGON, Enemies.REALLY_BAD_SONIC_FANART, Enemies.BADLY_DRAWN_SCHOOLGIRL, Enemies.NO_ENEMY, Enemies.REALLY_BAD_MLP_FANART, Enemies.LOSS_PNG, Enemies.EVIL_SPIKY_HAIRED_GUY, Enemies.EVIL_BADLY_DRAWN_KITTY]
        ),
    BAE: new Zone(
            20, 'stealth', 'Boring-Ass Earth',
            [[200, 0.012, 20], [500, 0.012, 20]], [30, 0.03, 10],
            [Enemies.THE_EIFFEL_TOWER, Enemies.A_MUMMY, Enemies.A_DADDY, Enemies.TWO_BANANAS_IN_PYJAMAS, Enemies.GIANT_RAISINS_FROM_CALIFORNIA, Enemies.AN_ANNOYING_PENGUIN, Enemies.AN_ARMY_OF_ANNOYING_PENGUINS, Enemies.THE_ELUSIVE_CS],
            0, 2/9
        ),
    BEAST1: new Zone(
            21, 'beast1', 'The Beast',
            [], [],
            [],
            1
        ),
    BEAST2: new Zone(
            21, 'beast2', 'The Beast',
            [], [],
            [],
            2
        ),
    BEAST3: new Zone(
            21, 'beast3', 'The Beast',
            [], [],
            [],
            3
        ),
    BEAST4: new Zone(
            21, 'beast4', 'The Beast',
            [], [],
            [],
            4
        ),
    CHOCO: new Zone(
            22, 'choco', 'Chocolate World',
            [[200, 0.055, 10], [500, 0.055, 10]], [30, 0.02, 3],
            [Enemies.CHOCOLATE_MOUSE, Enemies.CHOCOLATE_MIMIC, Enemies.CHOCOLATE_CROWBAR, Enemies.CHOCO_FREEMAN, Enemies.CHOCOLATE_FONDUE, Enemies.CHOCOLATE_SLIME, Enemies.DARK_CHOCOLATE, Enemies.CHOCOLATE_SALTY_BALLS, Enemies.SCREAMING_CHOCOLATE_FISH, Enemies.A_MIGHTY_LUMP_OF_POO, Enemies.CHOCO_GIANT, Enemies.TYPE_TWO_DIABETES, Enemies.MELTED_CHOCOLATE_BLOB]
        ),
    EVIL: new Zone(
            23, 'edgy', 'The Evilverse',
            [[200, 0.012, 10], [500, 0.012, 10]], [30, 0.01, 3],
            [Enemies.EVIL_MOUSE, Enemies.EVIL_GOBLIN, Enemies.EVIL_GOBLIN, Enemies.EVIL_MOLE, Enemies.EVIL_ICARUS_PROUDBOTTOM, Enemies.EVIL_BROWN_SLIME, Enemies.FLOCK_OF_CANADA_GEESE, Enemies.EVIL_SPIKY_HAIRED_GUY_BOSS, Enemies.EVIL_CHAD]
        ),
    PPPL: new Zone(
            24, 'pretty', 'Pretty Pink Princess Land',
            [[500, 0.01, 8], [1000, 0.01, 6]], [30, 0.03, 3],
            [Enemies.THE_HUMKEYCORN, Enemies.POOKY_THE_BUNNY, Enemies.THE_MORE_YOU_KNOW_STAR, Enemies.A_FABULOUS_LEPRECHAUN, Enemies.AN_ORDINARY_POSSUM, Enemies.BARRY_THE_BEER_FAIRY, Enemies.AN_ASSHOLE_SWAN, Enemies.TINKLES]
        ),
    NERD: new Zone(
            25, 'nerd1', 'Greasy Nerd',
            [], [],
            [],
            1
        ),
    NERD2: new Zone(
            25, 'nerd2', 'Greasy Nerd',
            [], [],
            [],
            2
        ),
    NERD3: new Zone(
            25, 'nerd3', 'Greasy Nerd',
            [], [],
            [],
            3
        ),
    NERD4: new Zone(
            25, 'nerd4', 'Greasy Nerd',
            [], [],
            [],
            4
        ),
    META: new Zone(
            26, 'meta', 'Meta Land',
            [[1000, 0.005, 7], [2000, 0.005, 7]], [30, 0.001, 3],
            [Enemies.A_HALF_EATEN_COOKIE, Enemies.A_RUSTY_CRANK, Enemies.AHH_A_SHARK, Enemies.THE_NUMBER_18X10308, Enemies.A_WEIRD_GOBLIN_DEMON_THING, Enemies.A_CUTE_KITTEN, Enemies.THE_DRAGON_OF_WISDOM, Enemies.THE_DRAGON_OF_DILDO]
        ),
    PARTY: new Zone(
            27, 'party', 'Interdimensional Party',
            [[1000, 0.003, 8], [2000, 0.003, 8]], [30, 0.003, 3],
            [Enemies.THE_BOUNCER_PART_2, Enemies.JAMBI, Enemies.GOD_OF_THUNDER, Enemies.THE_ENTIRE_STATE_OF_SOUTH_DAKOTA, Enemies.A_HUGE_STACK_OF_POGS, Enemies.THREE_GUYS_SHOUTING_OUT_ED, Enemies.MR_CHOW, Enemies.THE_LIFE_OF_THE_PARTY]
        ),
    MOBSTER: new Zone(
            28, 'godMother1', 'The Godmother',
            [], [],
            [],
            1
        ),
    MOBSTER2: new Zone(
            28, 'godMother2', 'The Godmother',
            [], [],
            [],
            2
        ),
    MOBSTER3: new Zone(
            28, 'godMother3', 'The Godmother',
            [], [],
            [],
            3
        ),
    MOBSTER4: new Zone(
            28, 'godMother4', 'The Godmother',
            [], [],
            [],
            4
        ),
    TYPO: new Zone(
            29, 'typo', 'Typo Zonw',
            [[1000, 0.0022, 9], [2000, 0.0022, 9]], [35, 0.0022, 3],
            [Enemies.PERMANENET, Enemies.COUDL, Enemies.LIEK, Enemies.BRIAN, Enemies.BLODO, Enemies.ODIGN, Enemies.HORUS, Enemies.ELDER_TYPO_GOD_ELXU]
        ),
    FAD: new Zone(
            30, 'fad', 'The Fad-lands',
            [[2000, 0.0018, 10], [5000, 0.0018, 10]], [40, 0.00018, 3],
            [Enemies.A_VERY_SAD_SLINKY, Enemies.GIANT_METAL_SPINNING_TOP, Enemies.A_STACK_OF_KRAZY_BONEZ, Enemies.RARE_FOIL_POKEYMAN_CARD, Enemies.A_BUSTED_GAMEBOY, Enemies.A_WORTHLESS_BEANY_BABY, Enemies.THE_SLAMMER, Enemies.DEMONIC_FLURBIE]
        ),
    JRPG: new Zone(
            31, 'jrpg', 'JRPGVille',
            [[2000, 0.0015, 10], [5000, 0.0015, 10]], [45, 0.0018, 3],
            [Enemies.SENTIENT_PILE_OF_BELTS, Enemies.MIMIC_MIMIC_CHEST_CHEST, Enemies.A_SUPLEXING_TRAIN, Enemies.THE_ANNOYING_FAN, Enemies.THE_INFINITY_SWORD, Enemies.THE_DAMAGE_CAP, Enemies.FINAL_BOSS, Enemies.TRUE_FINAL_BOSS]
        ),
    EXILE: new Zone(
            32, 'exile1', 'The Exile',
            [], [],
            [],
            1
        ),
    EXILE2: new Zone(
            32, 'exile2', 'The Exile',
            [], [],
            [],
            2
        ),
    EXILE3: new Zone(
            32, 'exile3', 'The Exile',
            [], [],
            [],
            3
        ),
    EXILE4: new Zone(
            32, 'exile4', 'The Exile',
            [], [],
            [],
            4
        ),
    RADLANDS: new Zone(
            33, 'rad', 'The Rad Lands',
            [[2000, 0.00006, 15], [5000, 0.00006, 15]], [450, 0.00006, 15],
            [Enemies.SMALL_BART, Enemies.PAIR_OF_SHADES_WEARING_SHADES, Enemies.AC_SKATER, Enemies.LAME_SECURITY_GUARD, Enemies.A_GIANT_VAT_OF_PLUTONIUM, Enemies.MUTANT_ZOMBIE_MARIE_CURIE, Enemies.NUCLEAR_POWER_PANTS, Enemies.A_WANDERING_GAMMA_RAY, Enemies.A_MASSIVE_SEALED_VAULT, Enemies.RADIOACTIVE_MACGUFFIN]
        ),
    BACKTOSCHOOL: new Zone(
            34, 'school', 'Back To School',
            [[5000, 0.00004, 10], [10000, 0.00004, 10]], [500, 0.000045, 15],
            [Enemies.A_DIFFERENT_GREASY_NERD, Enemies.SENTIENT_JOCK_STRAP, Enemies.THE_FLYING_SPINELLI_MONSTER, Enemies.A_REALLY_STRICT_NUN, Enemies.THE_NUNS_RULER, Enemies.THE_MYSTERY_MEAT, Enemies.WILLY, Enemies.BELDING]
        ),
    WESTWORLD: new Zone(
            35, 'western', 'The West World',
            [[5000, 0.000025, 15], [10000, 0.000025, 15]], [600, 0.00003, 15],
            [Enemies.A_STICKMAN_COWBOY, Enemies.A_GIANT_CANNON, Enemies.THE_ENTIRE_BAR, Enemies.A_PATHETIC_TUMBLEWEED, Enemies.A_SINGLE_COW, Enemies.HERD_OF_PISSED_OFF_COWS, Enemies.THE_OUTLAW, Enemies.THE_SHERIFF]
        ),
    ITHUNGERS: new Zone(
            36, 'hunger1', 'It Hungers',
            [], [],
            [],
            1
        ),
    ITHUNGERS2: new Zone(
            36, 'hunger2', 'It Hungers',
            [], [],
            [],
            2
        ),
    ITHUNGERS3: new Zone(
            36, 'hugner3', 'It Hungers',
            [], [],
            [],
            3
        ),
    ITHUNGERS4: new Zone(
            36, 'hunger4', 'It Hungers',
            [], [],
            [],
            4
        ),
    BREADVERSE: new Zone(
            37, 'bread', 'The Breadverse',
            [[5000, 0.00001, 15], [10000, 0.00001, 15]], [800, 0.000012, 15],
            [Enemies.GRANDMAS_BROWNIES, Enemies.ANGRY_RAW_COOKIE_DOUGH, Enemies.A_BEARDED_BREADED_BRAID, Enemies.BUTCHER_CANDLESTICK_MAKER, Enemies.THE_EXGREATEST_THING, Enemies.MOLDY_SLICE_OF_BREAD, Enemies.THE_YEAST_BEAST, Enemies.A_DAY_OLD_BAGUETTE]
        ),
    SEVENTIES: new Zone(
            38, 'that70s', 'That 70\'s Zone',
            [[10000, 0.000006, 15], [10000, 0.000006, 15]], [1000, 0.000008, 15],
            [Enemies.A_GROOVY_SAXOPHONE, Enemies.A_GIANT_PAIR_OF_ROLLER_SKATES, Enemies.A_S_PORN_MUSTASCHE, Enemies.A_DISGUSTING_BONG, Enemies.A_HIPPIE_WITH_A_HIP, Enemies.HOLY_CRAP_ITS_ANOTHER_SHARK, Enemies.THE_WORST_VINYL_RECORD, Enemies.THE_FRO]
        ),
    HALLOWEEN: new Zone(
            39, 'halloweenies', 'The Halloweenies',
            [[10000, 0.000004, 15], [10000, 0.000004, 15]], [1200, 0.000005, 15],
            [Enemies.ULTRA_INSTINCT_STONER, Enemies.A_SKELETON_INSIDE_A_BODY, Enemies.A_BADLY_MADE_SEXY_FLORIDA_COSTUME, Enemies.AN_UNNECESSARY_SEQUEL, Enemies.AN_ELEVATOR_FULL_OF_BLOOD, Enemies.CANDY_CORN, Enemies.TEXAS_CHAINSAW_MASCARA, Enemies.JIGSAW]
        ),
    ROCKLOBSTER: new Zone(
            40, 'rockLobster1', 'Rock Lobster',
            [], [],
            [],
            1
        ),
    ROCKLOBSTER2: new Zone(
            40, 'rockLobster2', 'Rock Lobster',
            [], [],
            [],
            2
        ),
    ROCKLOBSTER3: new Zone(
            40, 'rockLobster3', 'Rock Lobster',
            [], [],
            [],
            3
        ),
    ROCKLOBSTER4: new Zone(
            40, 'rockLobster4', 'Rock Lobster',
            [], [],
            [],
            4
        ),
    CONSTRUCTION: new Zone(
            41, 'construction', 'Construction Zone',
            [[10000, 0.0000025, 16], [10000, 0.0000025, 16]], [1200, 0.000004, 15],
            [Enemies.A_CONSTRUCTION_SLOB, Enemies.QUICKSAND_CEMENT, Enemies.A_CEMENT_TRUCK, Enemies.A_BULLDOZER, Enemies.THREE_GUYS_CARRYING_A_BEAM, Enemies.A_PIANOSAFE, Enemies.SEVEN_GUYS_TAKING_A_BREAK, Enemies.THE_CRANE]
        ),
    DUCK: new Zone(
            42, 'duck', 'DUCK DUCK ZONE',
            [[10000, 0.000002, 17], [10000, 0.000002, 17]], [1200, 0.0000033, 15],
            [Enemies.A_DUCK, Enemies.ANOTHER_DUCK, Enemies.GOOSE, Enemies.SCIENTIFICALLY_ACCURATE_DUCK, Enemies.A_MOTHERDUCKER, Enemies.TOTALLY_A_DUCK, Enemies.THE_DOG, Enemies.A_SINGLE_GRAPE]
        ),
    NETHER: new Zone(
            43, 'nether', 'The Nether Regions',
            [[10000, 0.0000016, 17], [10000, 0.0000016, 17]], [1200, 0.0000018, 15],
            [Enemies.A_PATCH_OF_TULIPS, Enemies.A_RANDOM_LADY, Enemies.A_LOST_CANADIAN_MOOSE, Enemies.A_FIVE_BLADED_WINDMILL, Enemies.A_JERK_CYCLIST, Enemies.A_DUTCH_OVEN, Enemies.THE_GRAND_DUTCH_DUCHY, Enemies.DAAN_VAN_DER_VAN_JAANSEN]
        ),
    AMALGAMATE: new Zone(
            44, 'amalgamate1', 'Amalgamate',
            [], [],
            [],
            1
        ),
    AMALGAMATE2: new Zone(
            44, 'amalgamate2', 'Amalgamate',
            [], [],
            [],
            2
        ),
    AMALGAMATE3: new Zone(
            44, 'amalgamate3', 'Amalgamate',
            [], [],
            [],
            3
        ),
    AMALGAMATE4: new Zone(
            44, 'amalgamate4', 'Amalgamate',
            [], [],
            [],
            4
        ),
    PIRATE: new Zone(
            45, 'pirate', 'The Aethereal Sea Part 1',
            [[10000, 0.000001, 17], [10000, 0.000001, 17]], [1200, 0.0000012, 15],
            [Enemies.A_SEAGULL, Enemies.COSMIC_JELLYFISH, Enemies.AETHER_EEL, Enemies.YOU, Enemies.A_PIRAT, Enemies.A_BUNCH_OF_OLD_NEWSPAPERS, Enemies.THE_BUCKET, Enemies.A_TAR_BLOB_MONSTER, Enemies.ANOTHER_YOU, Enemies.A_PADDLEFISH, Enemies.AN_ANGLERFISH, Enemies.A_BUNCH_OF_CANNONS, Enemies.A_PILE_OF_ROPES, Enemies.LADDERS, Enemies.AND_SNAKES, Enemies.RAMSHACKLE_SEA_INN, Enemies.THE_FIRST_PIRATE, Enemies.THE_SECOND_PIRATE, Enemies.THE_THIRD_PIRATE, Enemies.THE_FOURTH_PIRATE_, Enemies.THE_CAPTAIN]
        ),
} as const satisfies {[key: string]: Zone};