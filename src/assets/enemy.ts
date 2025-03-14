import { bd, bigdec_max, isZero, lessThanOrEqual } from "@/helpers/numbers";
import bigDecimal from "js-big-decimal";
import _ from "lodash";
import { Wish } from "./wish";

export class AttackStat {
    attackRate: number;
    power: bigDecimal;
    toughness: bigDecimal;
    regen: bigDecimal;
    hp: bigDecimal;
    constructor(attackRate: number, power: bigDecimal, toughness: bigDecimal, regen: bigDecimal, hp: bigDecimal) {
        this.attackRate = attackRate;
        this.power = power;
        this.toughness = toughness;
        this.regen = regen;
        this.hp = hp;
    }

    oneHitPower(attackModifier: bigDecimal = bd(1)): bigDecimal {
        return this.hp
            .divide(bd(0.8).multiply(attackModifier))
            .add(this.toughness.divide(bd(2)));
    }

    isWeaker(other: AttackStat) {
        return (
            this.attackRate <= other.attackRate &&
            lessThanOrEqual(this.power, other.power) &&
            lessThanOrEqual(this.toughness, other.toughness) &&
            lessThanOrEqual(this.regen, other.regen) &&
            lessThanOrEqual(this.hp, other.hp)
        );
    }
}

export const ENEMY_TYPE: { [k: string]: number } = {
    NORMAL: 0,
    CHARGER: 1,
    EXPLODER: 2,
    GROWER: 3,
    PARALYZE: 4,
    POISON: 5,
    RAPID: 6,
    POISONPARALYZE: 100,
} as const satisfies { [k: string]: number };

// An enemy is an adventure enemy, not a "Fight Boss" enemy
export class Enemy {
    id: number;
    key: string;
    name: string;
    type: number;

    attackStat: AttackStat[];

    isBoss: boolean;
    isTitan: boolean;
    constructor(id: number, key: string, name: string, type: number, attackStat: AttackStat | AttackStat[], isBoss: boolean = false) {
        this.id = id;
        this.key = key;
        this.name = name;
        this.type = type;

        this.attackStat = attackStat instanceof AttackStat ? [attackStat] : attackStat;

        this.isBoss = isBoss;
        this.isTitan = false;
    }
    attackRate(version: number = 0): number {
        return this.attackStat[version].attackRate;
    }
    power(version: number = 0): bigDecimal {
        return this.attackStat[version].power;
    }
    toughness(version: number = 0): bigDecimal {
        return this.attackStat[version].toughness;
    }
    regen(version: number = 0): bigDecimal {
        return this.attackStat[version].regen;
    }
    hp(version: number = 0): bigDecimal {
        return this.attackStat[version].hp;
    }
    oneHitPower(attackModifier: bigDecimal = bd(1), version: number = 0): bigDecimal {
        return this.attackStat[version].oneHitPower(attackModifier);
    }

    numHitsToKill(totalPower: bigDecimal, attackModifier: bigDecimal = bd(1), version: number = 0): bigDecimal {
        const oneHit = this.oneHitPower(attackModifier, version);
        return !isZero(totalPower) ? bigdec_max(oneHit.divide(totalPower).ceil(), bd(1)) : bd(1);
    }
}

export class Titan extends Enemy {
    respawnTime: number;
    versions: number;
    exp: bigDecimal;
    gold: bigDecimal[];
    ap: number;
    pp: number;
    qp: number;
    autokill: AttackStat[];
    kills: number[];
    constructor(
        id: number,
        key: string,
        name: string,
        attackStat: AttackStat | AttackStat[],
        autokill: AttackStat | AttackStat[],
        respawnTime: number,
        exp: bigDecimal,
        gold: bigDecimal[],
        ap: number,
        pp: number,
        qp: number
    ) {
        super(id, key, name, ENEMY_TYPE.NORMAL, attackStat);
        this.isTitan = true;
        this.versions = _.isArray(attackStat) ? attackStat.length : 1;

        // If there's more than one, then exp, pp, qp, ap are 1, 1.1, 1.2, 1.3 multiplied
        this.respawnTime = respawnTime;
        this.gold = gold;
        this.exp = exp;
        this.ap = ap;
        this.pp = pp;
        this.qp = qp;
        this.autokill = autokill instanceof AttackStat ? [autokill] : autokill;
        this.kills = [];
        for (let i = 0; i < this.versions; i++) {
            this.kills.push(0);
        }
    }
    getFullName(i: number = 0): string {
        if (this.versions != 4) {
            return this.name;
        }
        return this.name + " v" + (i + 1);
    }
    getFullKey(i: number = 0): string {
        if (this.versions != 4) {
            return this.key;
        }
        return this.key + "v" + (i + 1);
    }
    canAutoKill(player: AttackStat, version: number = 0, kills: number = 0): boolean {
        kills = kills > 0 ? kills : this.kills[version];

        // Exile - 24 kilsl allows AK
        if (this.id == 9) {
            if (kills >= 24) {
                return true;
            }
        }
        // Final two bosses you can't autokill
        else if (this.id > 12) {
            return false;
        }
        // IT Hungers, Rock Lobster, Amalgamate - 5 kills allows you to AK
        else if (this.id >= 10) {
            if (kills >= 5) {
                return true;
            }
        }
        // Final version of walderp requires 3 kills
        else if (this.id == 5 && version == 4) {
            return this.autokill[version].isWeaker(player) && kills >= 3;
        }
        return this.autokill[version].isWeaker(player);
    }

    hasKilled(version: number = 0): boolean {
        return this.kills[version] > 0;
    }

    getAP(apBonus: bigDecimal = bd(1)): bigDecimal {
        return apBonus.multiply(bd(this.ap)).divide(bd(100));
    }
    getEXP(
        expBonus: bigDecimal = bd(1),
        twentyFourHourChallenge: bigDecimal = bd(0),
        twentyFourHourEvilChallenge: bigDecimal = bd(0),
        twentyFourHourSadisticChallenge: bigDecimal = bd(0)
    ): bigDecimal {
        return expBonus
            .multiply(this.exp)
            .divide(bd(100))
            .multiply(
                bd(1)
                    .add(twentyFourHourChallenge.multiply(bd(0.1)))
                    .add(twentyFourHourEvilChallenge.multiply(bd(0.04)))
                    .add(twentyFourHourSadisticChallenge.multiply(bd(0.02)))
            );
    }
    getPP(ppBonus: bigDecimal = bd(1)): bigDecimal {
        return ppBonus.multiply(bd(this.pp)).divide(bd(100));
    }
    getQPWishNum(): number {
        switch (this.id) {
            case 6:
                return 73;
            case 7:
                return 74;
            case 8:
                return 40;
            case 9:
                return 41;
            case 10:
                return 100;
            case 11:
                return 187;
            case 12:
                return 204;
        }
        return 0;
    }
    getQP(wishes: Wish[], qpBonus: bigDecimal = bd(1)): bigDecimal {
        let qpAmount = bd(0);
        if (this.getQPWishNum() > 0 && !_.isUndefined(wishes[73]) && wishes[this.getQPWishNum()].completed()) {
            qpAmount = bd(this.qp);
        }
        return qpBonus.multiply(qpAmount).divide(bd(100));
    }
    getRespawnTime(rbChallenges: number | bigDecimal): bigDecimal {
        if (typeof rbChallenges == "number") {
            rbChallenges = bd(rbChallenges);
        }
        return bigdec_max(bd(1), bd(this.respawnTime).subtract(rbChallenges.multiply(bd(1 / 4))));
    }
    importKills(bestiary: { kills: number }[]) {
        switch (this.id) {
            case 1:
                this.kills = [bestiary[302].kills];
                break;
            case 2:
                this.kills = [bestiary[303].kills];
                break;
            case 3:
                this.kills = [bestiary[304].kills];
                break;
            case 4:
                this.kills = [bestiary[305].kills];
                break;
            case 5: // Walderp
                this.kills = [bestiary[306].kills, bestiary[307].kills, bestiary[308].kills, bestiary[309].kills, bestiary[310].kills];
                break;
            case 6: // Beast
                this.kills = [bestiary[312].kills, bestiary[313].kills, bestiary[314].kills, bestiary[315].kills];
                break;
            case 7: // Nerdy
                this.kills = [bestiary[334].kills, bestiary[335].kills, bestiary[336].kills, bestiary[337].kills];
                break;
            case 8: // Godmother
                this.kills = [bestiary[339].kills, bestiary[340].kills, bestiary[341].kills, bestiary[342].kills];
                break;
            case 9: // Exile
                this.kills = [bestiary[344].kills, bestiary[345].kills, bestiary[346].kills, bestiary[347].kills];
                break;
            case 10: // IT Hungers
                this.kills = [bestiary[365].kills, bestiary[366].kills, bestiary[367].kills, bestiary[368].kills];
                break;
            case 11: // Rock Lobster
                this.kills = [bestiary[369].kills, bestiary[370].kills, bestiary[371].kills, bestiary[372].kills];
                break;
            case 12: // Amalgamate
                this.kills = [bestiary[373].kills, bestiary[374].kills, bestiary[375].kills, bestiary[376].kills];
                break;
            case 13: // Tutorial Mouse
                this.kills = [bestiary[377].kills];
                break;
            case 14: // Traitor
                this.kills = [bestiary[378].kills];
                break;
        }
    }
}

export const Enemies: { [k: string]: Enemy } = {
    // Tutorial
    A_SMALL_PIECE_OF_FLUFF: new Enemy(1, "aSmallPieceofFluff", "A Small Piece of Fluff", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(7), bd(6), bd(1), bd(40))),
    FLOATING_SEWAGE: new Enemy(2, "floatingSewage", "Floating Sewage", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(7), bd(6), bd(1.5), bd(45))),
    A_STICK: new Enemy(3, "aStick", "A Stick?", ENEMY_TYPE.NORMAL, new AttackStat(1.5, bd(8), bd(7), bd(0.5), bd(55))),
    A_SMALL_MOUSE: new Enemy(4, "aSMALLMOUSEBOSS", "A SMALL MOUSE (BOSS)", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(9), bd(9), bd(1), bd(100)), true),

    // Sewers
    SMALL_MOUSE: new Enemy(4, "smallMouse", "Small Mouse", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(9), bd(9), bd(1), bd(40))),
    SLIGHTLY_BIGGER_MOUSE: new Enemy(5, "slightlyBiggerMouse", "Slightly Bigger Mouse", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(10), bd(10), bd(1.5), bd(50))),
    BIG_RAT: new Enemy(6, "bigRat", "Big Rat", ENEMY_TYPE.NORMAL, new AttackStat(1.5, bd(11), bd(11), bd(0.5), bd(70))),
    BROWN_SLIME: new Enemy(7, "bROWNSLIMEBOSS", "BROWN SLIME (BOSS)", ENEMY_TYPE.POISON, new AttackStat(1, bd(13), bd(13), bd(1), bd(150)), true),

    // Forest
    SKELETON: new Enemy(8, "skeleton", "Skeleton", ENEMY_TYPE.NORMAL, new AttackStat(1.1, bd(26), bd(29), bd(3), bd(400))),
    GOBLIN: new Enemy(9, "goblin", "Goblin", ENEMY_TYPE.RAPID, new AttackStat(0.9, bd(30), bd(29), bd(1), bd(420))),
    GIANT: new Enemy(14, "giant", "Giant", ENEMY_TYPE.CHARGER, new AttackStat(1.3, bd(30), bd(35), bd(1), bd(500))),
    ENT: new Enemy(13, "ent", "Ent", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(28), bd(34), bd(4), bd(515))),
    ZOMBIE: new Enemy(11, "zombie", "Zombie", ENEMY_TYPE.NORMAL, new AttackStat(1.5, bd(30), bd(17), bd(8), bd(900))),
    ORC: new Enemy(10, "orc", "Orc", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(31), bd(31), bd(2), bd(450))),
    RAT_OF_UNUSUAL_SIZE: new Enemy(15, "rOUSBOSS", "R.O.U.S (BOSS)", ENEMY_TYPE.NORMAL, new AttackStat(1.5, bd(32), bd(32), bd(3), bd(500)), true),
    FAIRY: new Enemy(16, "fairy", "Fairy", ENEMY_TYPE.EXPLODER, new AttackStat(5, bd(33), bd(31), bd(2), bd(200))),
    GORGON: new Enemy(17, "gORGONBOSS", "GORGON (BOSS)", ENEMY_TYPE.PARALYZE, new AttackStat(1.25, bd(33), bd(33), bd(2.5), bd(600)), true),

    // Cave
    GORGONZOLA: new Enemy(18, "gorgonzola", "Gorgonzola", ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(114), bd(113), bd(8), bd(1900))),
    BRIE: new Enemy(19, "brie", "Brie", ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(110), bd(117), bd(10), bd(1900))),
    GOUDA: new Enemy(20, "gouda", "Gouda", ENEMY_TYPE.NORMAL, new AttackStat(1.5, bd(107), bd(120), bd(12), bd(1940))),
    BLUE_CHEESE: new Enemy(21, "blueCheese", "Blue Cheese", ENEMY_TYPE.POISON, new AttackStat(1.5, bd(114), bd(110), bd(8), bd(2050))),
    PARMESAN: new Enemy(22, "parmesan", "Parmesan", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(117), bd(112), bd(13), bd(1900))),
    ROBOT: new Enemy(25, "robot", "Robot", ENEMY_TYPE.CHARGER, new AttackStat(1, bd(114), bd(111), bd(8), bd(2080))),
    FLUFFY_CHAIR: new Enemy(26, "fluffyChair", "Fluffy Chair", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(115), bd(110), bd(10), bd(2100))),
    COUCH: new Enemy(27, "couch", "Couch", ENEMY_TYPE.NORMAL, new AttackStat(1.5, bd(119), bd(114), bd(12), bd(1900))),
    FLOPPY_MATTRESS: new Enemy(28, "floppyMattress", "Floppy Mattress", ENEMY_TYPE.POISON, new AttackStat(1.5, bd(111), bd(110), bd(8), bd(1810))),
    EVIL_FRIDGE: new Enemy(29, "evilFridge", "Evil Fridge", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(115), bd(112), bd(13), bd(2000))),
    T800: new Enemy(30, "t800", "T-800", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(113), bd(111), bd(13), bd(2130))),
    WIDE_SCREEN_TV: new Enemy(31, "wideScreenTV", "Wide Screen T.V", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(112), bd(110), bd(13), bd(1900))),
    KITCHEN_SINK: new Enemy(32, "kitchenSink", "Kitchen Sink", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(113), bd(110), bd(13), bd(1900))),
    LIMBURGER: new Enemy(23, "lIMBURGERBOSS", "LIMBURGER (BOSS)", ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(110), bd(110), bd(15), bd(2800)), true),
    MEGA_RAT: new Enemy(24, "mEGARATBOSS", "MEGA RAT (BOSS)", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(120), bd(119), bd(16), bd(2900)), true),
    CHAD: new Enemy(37, "cHADBOSS", "CHAD (BOSS)", ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(120), bd(122), bd(17), bd(3000)), true),

    // Sky
    KID_ON_A_CLOUD: new Enemy(38, "kidOnaCloud", "Kid On a Cloud", ENEMY_TYPE.GROWER, new AttackStat(1.3, bd(300), bd(323), bd(20), bd(4600))),
    SEVENFORTYSEVEN: new Enemy(39, "", "747", ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(350), bd(310), bd(20), bd(4500))),
    ORIENTAL_DRAGON: new Enemy(40, "orientalDragon", "Oriental Dragon", ENEMY_TYPE.CHARGER, new AttackStat(1, bd(322), bd(322), bd(22), bd(4440))),
    LESTER: new Enemy(41, "lester", "Lester", ENEMY_TYPE.POISON, new AttackStat(1.3, bd(350), bd(350), bd(18), bd(4550))),
    NINJA_SAMURAI: new Enemy(42, "ninjaSamurai", "Ninja Samurai", ENEMY_TYPE.RAPID, new AttackStat(1.3, bd(350), bd(342), bd(13), bd(4800))),
    ICARUS_PROUDBOTTOM: new Enemy(43, "icarusProudbottom", "Icarus Proudbottom", ENEMY_TYPE.EXPLODER, new AttackStat(9, bd(340), bd(320), bd(10), bd(4900))),
    GIGANTIC_FLOCK_OF_SEAGULLS: new Enemy(44, "giganticFlockofSeagulls", "Gigantic Flock of Seagulls", ENEMY_TYPE.POISON, new AttackStat(1.3, bd(340), bd(317), bd(20), bd(5200))),
    GFOCG: new Enemy(45, "gFOCGBOSS", "G.F.O.C.G (BOSS)", ENEMY_TYPE.POISON, new AttackStat(1.3, bd(365), bd(360), bd(23), bd(8700)), true),
    TWO_HEADED_GUY: new Enemy(46, "twoHeadedGuy", "Two Headed Guy", ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(330), bd(310), bd(19), bd(3500))),
    BIRD_PERSON: new Enemy(47, "bIRDPERSONBOSS", "BIRD PERSON (BOSS)", ENEMY_TYPE.RAPID, new AttackStat(1.3, bd(340), bd(340), bd(25), bd(9000)), true),

    // High Security Base
    HOOLOOVOO: new Enemy(49, "hooloovoo", "Hooloovoo", ENEMY_TYPE.RAPID, new AttackStat(1.3, bd(400), bd(403), bd(40), bd(6333))),
    GROSS_GREEN_ALIEN: new Enemy(50, "grossGreenAlien", "Gross Green Alien", ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(400), bd(410), bd(30), bd(6500))),
    THE_RAT_GOD: new Enemy(51, "theRatGod", "The Rat God", ENEMY_TYPE.CHARGER, new AttackStat(1, bd(412), bd(422), bd(32), bd(6440))),
    MASSIVE_PLANT_MONSTER: new Enemy(52, "massivePlantMonster", "Massive Plant Monster", ENEMY_TYPE.POISON, new AttackStat(1.3, bd(390), bd(451), bd(28), bd(6500))),
    HIGH_SECURITY_INSECT_GUARD_1: new Enemy(
        53,
        "highSecurityInsectGuard1",
        "High Security Insect Guard 1",
        ENEMY_TYPE.NORMAL,
        new AttackStat(1.3, bd(420), bd(402), bd(23), bd(6140))
    ),
    HIGH_SECURITY_INSECT_GUARD_2: new Enemy(
        54,
        "highSecurityInsectGuard2",
        "High Security Insect Guard 2",
        ENEMY_TYPE.NORMAL,
        new AttackStat(1.2, bd(426), bd(404), bd(20), bd(6600))
    ),
    THE_EXPERIMENT: new Enemy(55, "theExperiment", "The Experiment", ENEMY_TYPE.GROWER, new AttackStat(1.1, bd(416), bd(410), bd(20), bd(6200))),
    WHOLE_LOTTA_GUARDS: new Enemy(56, "wholeLottaGuards", "Whole Lotta Guards", ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(410), bd(427), bd(30), bd(6300))),
    MEGA_GUARD: new Enemy(57, "mEGAGUARDBOSS", "MEGA GUARD (BOSS)", ENEMY_TYPE.CHARGER, new AttackStat(1.3, bd(435), bd(440), bd(33), bd(11200)), true),
    SPIKY_HAIRED_GUY: new Enemy(58, "sPIKYHAIREDGUYBOSS", "SPIKY HAIRED GUY (BOSS)", ENEMY_TYPE.RAPID, new AttackStat(1.3, bd(440), bd(440), bd(35), bd(12000)), true),

    //Clock Dimension
    MONDAY: new Enemy(59, "monday", "Monday", ENEMY_TYPE.CHARGER, new AttackStat(1.3, bd(1641), bd(1571), bd(147), bd(50000))),
    TUESDAY: new Enemy(60, "tuesday", "Tuesday", ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(1641), bd(1591), bd(149), bd(52000))),
    WEDNESDAY: new Enemy(61, "wednesday", "Wednesday", ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(1611), bd(1611), bd(141), bd(54000))),
    THURSDAY: new Enemy(62, "thursday", "Thursday", ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(1631), bd(1631), bd(143), bd(56000))),
    FRIDAY: new Enemy(63, "friday", "Friday", ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(1651), bd(1651), bd(145), bd(58000))),
    SATURDAY: new Enemy(64, "saturday", "Saturday", ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(1671), bd(1671), bd(147), bd(60000))),
    SUNDAY: new Enemy(65, "sunday", "Sunday", ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(1691), bd(1691), bd(149), bd(62000))),
    SUNDAE: new Enemy(66, "sUNDAEBOSS", "SUNDAE (BOSS)", ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(1700), bd(1720), bd(200), bd(85000)), true),

    // The 2D Universe
    A_FLAT_MOUSE: new Enemy(67, "aFlatMouse", "A Flat Mouse", ENEMY_TYPE.CHARGER, new AttackStat(1, bd(3076), bd(3071), bd(307), bd(100000))),
    A_TINY_TRIANGLE: new Enemy(68, "aTinyTriangle", "A Tiny Triangle", ENEMY_TYPE.NORMAL, new AttackStat(1.1, bd(3001), bd(3091), bd(309), bd(101000))),
    A_SQUARE_BEAR: new Enemy(69, "aSquareBear", "A Square Bear", ENEMY_TYPE.NORMAL, new AttackStat(1.1, bd(3065), bd(3011), bd(301), bd(100000))),
    THE_PENTAGON: new Enemy(70, "thePentagon", "The Pentagon", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(3022), bd(3031), bd(303), bd(105000))),
    THE_FIRST_STOP_SIGN: new Enemy(72, "theFirstStopSign", "The First Stop Sign", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(3086), bd(3071), bd(307), bd(108000))),
    THE_SECOND_STOP_SIGN: new Enemy(73, "theSecondStopSign", "The Second Stop Sign", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(3159), bd(3091), bd(309), bd(100000))),
    KING_CIRCLE: new Enemy(74, "kINGCIRCLEBOSS", "KING CIRCLE (BOSS)", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(3041), bd(3050), bd(300), bd(100000)), true),
    SUPER_HEXAGON: new Enemy(71, "sUPERHEXAGONBOSS", "SUPER HEXAGON (BOSS)", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(3133), bd(3133), bd(303), bd(133333)), true),

    // Ancient Battlefield
    GHOST_MICE: new Enemy(75, "ghostMice", "Ghost Mice", ENEMY_TYPE.CHARGER, new AttackStat(1, bd(6300), bd(7100), bd(720), bd(256000))),
    CRASPER_THE_PISSED_OFF_GHOST: new Enemy(
        76,
        "crasperThePissedOffGhost",
        "Crasper, The Pissed Off Ghost",
        ENEMY_TYPE.PARALYZE,
        new AttackStat(1.1, bd(6200), bd(7100), bd(719), bd(250000))
    ),
    LIVING_ARMOR: new Enemy(78, "livingArmor", "Living Armor", ENEMY_TYPE.NORMAL, new AttackStat(1.1, bd(6665), bd(7200), bd(721), bd(250000))),
    LIVING_ARMOUR: new Enemy(79, "livingArmour", "Living Armour", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(6480), bd(7400), bd(723), bd(255000))),
    QUOTES: new Enemy(80, "", "", ENEMY_TYPE.POISON, new AttackStat(1.2, bd(6500), bd(7500), bd(726), bd(248000))),
    THE_PANTHEON_OF_FALLEN_GODS: new Enemy(
        81,
        "thePantheonofFallenGods",
        "The Pantheon of Fallen Gods",
        ENEMY_TYPE.RAPID,
        new AttackStat(1.2, bd(6550), bd(7550), bd(729), bd(260000))
    ),
    GHOST_DAD: new Enemy(77, "gHOSTDADBOSS", "GHOST DAD (BOSS)", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(6600), bd(7600), bd(730), bd(335000)), true),
    MYSTERIOUS_FIGURE: new Enemy(82, "mYSTERIOUSFIGUREBOSS", "MYSTERIOUS FIGURE (BOSS)", ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(6600), bd(7600), bd(782), bd(332000)), true),

    // A Very Strange Place
    THE_ENTIRE_ALPHABET_UP_A_COCONUT_TREE: new Enemy(
        83,
        "theEntireAlphabetUpaCoconutTree",
        "The Entire Alphabet Up a Coconut Tree",
        ENEMY_TYPE.RAPID,
        new AttackStat(1, bd(16100), bd(18100), bd(1620), bd(756000))
    ),
    THE_LUMMOX: new Enemy(84, "theLummox", "The Lummox", ENEMY_TYPE.PARALYZE, new AttackStat(1.1, bd(16100), bd(18100), bd(1619), bd(750000))),
    A_METAL_SLIME: new Enemy(85, "aMetalSlime", "A Metal Slime", ENEMY_TYPE.NORMAL, new AttackStat(1.1, bd(16000), bd(18000), bd(1621), bd(750000))),
    A_GINORMOUS_SWORD: new Enemy(86, "aGinormousSword", "A Ginormous Sword", ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(16000), bd(18100), bd(1623), bd(755000))),
    AN_ORDINARY_CHICKEN: new Enemy(89, "anOrdinaryChicken", "An Ordinary Chicken", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(16100), bd(18100), bd(1626), bd(748000))),
    SEVENFORTYTHREE_CHICKENS: new Enemy(90, "Chickens", "743 Chickens", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(16200), bd(18100), bd(1629), bd(760000))),
    KENNY: new Enemy(87, "kENNYBOSS", "KENNY (BOSS)", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(16300), bd(18300), bd(1660), bd(950000)), true),
    VIC: new Enemy(88, "vICBOSS", "VIC (BOSS)", ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(16300), bd(18300), bd(1682), bd(1000000)), true),

    // Mega Lands
    BROKEN_VCR_MAN: new Enemy(91, "brokenVCRMan", "Broken VCR Man", ENEMY_TYPE.RAPID, new AttackStat(1, bd(63500), bd(63000), bd(7620), bd(3600000))),
    KITTEN_IN_A_MECH_WOMAN: new Enemy(92, "kittenInaMechWoman", "Kitten In a Mech Woman", ENEMY_TYPE.EXPLODER, new AttackStat(12, bd(63500), bd(63500), bd(7619), bd(3600000))),
    MR_PLOW: new Enemy(93, "mrPlow", "Mr Plow", ENEMY_TYPE.NORMAL, new AttackStat(1.1, bd(63700), bd(63700), bd(7621), bd(3650000))),
    ROBUTT: new Enemy(94, "rOBUTTNOTABOSS", "ROBUTT (NOT A BOSS)", ENEMY_TYPE.POISON, new AttackStat(1.2, bd(63700), bd(63100), bd(7623), bd(3700000))),
    FORMER_CANADIAN_PM_STEPHEN_HARPER: new Enemy(
        95,
        "formerCanadianPMStephenHarper",
        "Former Canadian PM Stephen Harper",
        ENEMY_TYPE.RAPID,
        new AttackStat(1.2, bd(63100), bd(63100), bd(7626), bd(3750000))
    ),
    A_CYBERDEMON: new Enemy(96, "aCyberdemon", "A Cyberdemon", ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(63200), bd(63100), bd(7629), bd(3800000))),
    ROBO_RAT_9000: new Enemy(97, "roboRat9000", "Robo Rat 9000", ENEMY_TYPE.PARALYZE, new AttackStat(1.2, bd(63200), bd(63100), bd(7629), bd(3850000))),
    BUTTER_PASSING_ROBOT: new Enemy(98, "butterPassingRobot", "Butter-Passing Robot", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(64200), bd(63100), bd(7629), bd(3950000))),
    DOCTOR_WAHWEE: new Enemy(100, "dOCTORWAHWEEBOSS", "DOCTOR WAHWEE (BOSS)", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(64300), bd(63300), bd(7660), bd(4200000)), true),

    // The Beardverse
    A_BEARDED_LADY: new Enemy(101, "aBeardedLady", "A Bearded Lady", ENEMY_TYPE.RAPID, new AttackStat(1, bd(740000), bd(740000), bd(74000), bd(50000000))),
    A_BEARDED_MAN: new Enemy(102, "aBeardedMan", "A Bearded Man", ENEMY_TYPE.CHARGER, new AttackStat(1, bd(740000), bd(740000), bd(74000), bd(50000000))),
    COUSIN_ITT: new Enemy(103, "cousinItt", "Cousin Itt", ENEMY_TYPE.NORMAL, new AttackStat(1.1, bd(742000), bd(742000), bd(74200), bd(51000000))),
    A_NAKED_MOLERAT: new Enemy(104, "aNakedMolerat", "A Naked Molerat", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(744000), bd(744000), bd(74400), bd(52000000))),
    ROB_BOSS: new Enemy(105, "robBoss", "Rob Boss", ENEMY_TYPE.EXPLODER, new AttackStat(12, bd(746000), bd(746000), bd(74600), bd(40000000))),
    GOSSAMER: new Enemy(107, "gossamer", "Gossamer", ENEMY_TYPE.PARALYZE, new AttackStat(1.2, bd(748000), bd(748000), bd(74800), bd(53000000))),
    ORANGE_TOUPEE_WITH_FISTS: new Enemy(
        106,
        "oRANGETOUPEEWITHFISTSBOSS",
        "ORANGE TOUPEE WITH FISTS (BOSS)",
        ENEMY_TYPE.CHARGER,
        new AttackStat(1.2, bd(750000), bd(750000), bd(75000), bd(54000000)),
        true
    ),
    A_CLOGGED_SHOWER_DRAIN: new Enemy(
        108,
        "aCLOGGEDSHOWERDRAINBOSS",
        "A CLOGGED SHOWER DRAIN (BOSS)",
        ENEMY_TYPE.POISON,
        new AttackStat(1.2, bd(750000), bd(750000), bd(75000), bd(55000000)),
        true
    ),

    // Badly Drawn World
    BADLY_DRAWN_DRAGON: new Enemy(109, "badlyDrawnDragon", "Badly Drawn Dragon", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(11000000), bd(11000000), bd(1100000), bd(1e9))),
    REALLY_BAD_SONIC_FANART: new Enemy(
        110,
        "reallyBadSonicFanart",
        "Really Bad Sonic Fanart",
        ENEMY_TYPE.CHARGER,
        new AttackStat(1, bd(11200000), bd(11200000), bd(1102000), bd(1e9))
    ),
    BADLY_DRAWN_SCHOOLGIRL: new Enemy(
        111,
        "badlyDrawnSchoolgirl",
        "Badly Drawn Schoolgirl",
        ENEMY_TYPE.POISON,
        new AttackStat(1.1, bd(11400000), bd(11400000), bd(1140000), bd(1.01e9))
    ),
    NO_ENEMY: new Enemy(112, "noEnemy", "No Enemy(?)", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(11600000), bd(11600000), bd(1160000), bd(1.02e9))),
    REALLY_BAD_MLP_FANART: new Enemy(
        113,
        "reallyBadMLPFanart",
        "Really Bad MLP Fanart",
        ENEMY_TYPE.GROWER,
        new AttackStat(1.1, bd(11800000), bd(11800000), bd(1180000), bd(1.03e9))
    ),
    LOSS_PNG: new Enemy(114, "losspng", "Loss.png", ENEMY_TYPE.PARALYZE, new AttackStat(1.2, bd(11000000), bd(11000000), bd(1100000), bd(1.04e9))),
    EVIL_SPIKY_HAIRED_GUY: new Enemy(
        115,
        "eVILSPIKYHAIREDGUY",
        "EVIL SPIKY HAIRED GUY",
        ENEMY_TYPE.RAPID,
        new AttackStat(1.2, bd(11200000), bd(11200000), bd(1120000), bd(1.05e9)),
        true
    ),
    EVIL_BADLY_DRAWN_KITTY: new Enemy(
        116,
        "eVILBADLYDRAWNKITTY",
        "EVIL BADLY DRAWN KITTY",
        ENEMY_TYPE.PARALYZE,
        new AttackStat(1.2, bd(11500000), bd(11500000), bd(1150000), bd(1.06e9)),
        true
    ),

    // Boring-Ass Earth
    THE_EIFFEL_TOWER: new Enemy(117, "theEiffelTower", "The Eiffel Tower", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(89000000), bd(89000000), bd(8900000), bd(8.5e9))),
    A_MUMMY: new Enemy(118, "aMummy", "A Mummy", ENEMY_TYPE.CHARGER, new AttackStat(1, bd(89000000), bd(89000000), bd(8900000), bd(8.5e9))),
    A_DADDY: new Enemy(119, "aDaddy", "A Daddy", ENEMY_TYPE.POISON, new AttackStat(1.1, bd(89200000), bd(89200000), bd(8920000), bd(8.52e9))),
    TWO_BANANAS_IN_PYJAMAS: new Enemy(
        120,
        "twoBananasInPyjamas",
        "Two Bananas In Pyjamas",
        ENEMY_TYPE.RAPID,
        new AttackStat(1.2, bd(89400000), bd(89400000), bd(8940000), bd(8.54e9))
    ),
    GIANT_RAISINS_FROM_CALIFORNIA: new Enemy(
        121,
        "giantRaisinsFromCalifornia",
        "Giant Raisins From California",
        ENEMY_TYPE.GROWER,
        new AttackStat(1.1, bd(89600000), bd(89600000), bd(8960000), bd(8.56e9))
    ),
    AN_ANNOYING_PENGUIN: new Enemy(122, "anAnnoyingPenguin", "An Annoying Penguin", ENEMY_TYPE.PARALYZE, new AttackStat(1.2, bd(89800000), bd(89800000), bd(8980000), bd(8.58e9))),
    AN_ARMY_OF_ANNOYING_PENGUINS: new Enemy(
        123,
        "anArmyofAnnoyingPenguins",
        "An Army of Annoying Penguins",
        ENEMY_TYPE.RAPID,
        new AttackStat(1.2, bd(90000000), bd(90000000), bd(9000000), bd(8.6e9))
    ),
    THE_ELUSIVE_CS: new Enemy(124, "tHEELUSIVECSBOSS", "THE ELUSIVE C.S (BOSS)", ENEMY_TYPE.POISON, new AttackStat(1.2, bd(90000000), bd(90000000), bd(9000000), bd(8.6e9)), true),

    //Chocolate World
    CHOCOLATE_MOUSE: new Enemy(125, "chocolateMouse", "Chocolate Mouse", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(3e10), bd(3e10), bd(3e9), bd(3e12))),
    CHOCOLATE_MIMIC: new Enemy(126, "chocolateMimic", "Chocolate Mimic", ENEMY_TYPE.RAPID, new AttackStat(1, bd(3.01e10), bd(3.01e10), bd(3.01e9), bd(3.05e12))),
    CHOCOLATE_CROWBAR: new Enemy(127, "chocolateCrowbar", "Chocolate Crowbar", ENEMY_TYPE.POISON, new AttackStat(1.1, bd(3.01e10), bd(3.01e10), bd(3.01e9), bd(3.05e12))),
    CHOCO_FREEMAN: new Enemy(128, "chocoFreeman", "Choco-Freeman", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(3.02e10), bd(3.02e10), bd(3.02e9), bd(3.1e12))),
    CHOCOLATE_FONDUE: new Enemy(129, "chocolateFondue", "Chocolate Fondue", ENEMY_TYPE.EXPLODER, new AttackStat(12, bd(3.02e10), bd(3.02e10), bd(3.02e9), bd(3.1e12))),
    CHOCOLATE_SLIME: new Enemy(130, "chocolateSlime", "Chocolate Slime", ENEMY_TYPE.POISON, new AttackStat(1.2, bd(3.03e10), bd(3.03e10), bd(3.03e9), bd(3.15e12))),
    DARK_CHOCOLATE: new Enemy(131, "darkChocolate", "Dark Chocolate", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(3.03e10), bd(3.03e10), bd(3.03e9), bd(3.15e12))),
    CHOCOLATE_SALTY_BALLS: new Enemy(132, "chocolateSaltyBalls", "Chocolate Salty Balls", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(3.03e10), bd(3.03e10), bd(3.03e9), bd(3.15e12))),
    SCREAMING_CHOCOLATE_FISH: new Enemy(
        133,
        "screamingChocolateFish",
        "Screaming Chocolate Fish",
        ENEMY_TYPE.RAPID,
        new AttackStat(1.2, bd(3.03e10), bd(3.03e10), bd(3.03e9), bd(3.15e12))
    ),
    A_MIGHTY_LUMP_OF_POO: new Enemy(134, "aMightyLumpofPoo", "A Mighty Lump of Poo", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(3.03e10), bd(3.03e10), bd(3.03e9), bd(3.15e12))),
    MELTED_CHOCOLATE_BLOB: new Enemy(
        135,
        "mELTEDCHOCOLATEBLOBBOSS",
        "MELTED CHOCOLATE BLOB (BOSS)",
        ENEMY_TYPE.GROWER,
        new AttackStat(1.2, bd(3.05e10), bd(3.05e10), bd(3.05e9), bd(3.25e12)),
        true
    ),
    CHOCO_GIANT: new Enemy(136, "cHOCOGIANTBOSS", "CHOCO GIANT (BOSS)", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(3.05e10), bd(3.05e10), bd(3.05e9), bd(3.25e12)), true),
    TYPE_TWO_DIABETES: new Enemy(
        137,
        "tYPEDIABETESBOSS",
        "TYPE 2 DIABETES (BOSS)",
        ENEMY_TYPE.CHARGER,
        new AttackStat(1.2, bd(3.05e10), bd(3.05e10), bd(3.05e9), bd(3.25e12)),
        true
    ),

    // The Evilverse
    EVIL_MOUSE: new Enemy(316, "evilMouse", "Evil Mouse", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(5e12), bd(5e12), bd(5e11), bd(5e14))),
    EVIL_GOBLIN: new Enemy(317, "evilGoblin", "Evil Goblin", ENEMY_TYPE.RAPID, new AttackStat(1, bd(5.01e12), bd(5.01e12), bd(5.01e11), bd(5.05e14))),
    EVIL_GORGON: new Enemy(318, "evilGorgon", "Evil Gorgon", ENEMY_TYPE.POISON, new AttackStat(1.1, bd(5.01e12), bd(5.01e12), bd(5.01e11), bd(5.05e14))),
    EVIL_MOLE: new Enemy(319, "evilMole", "Evil Mole", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(5.02e12), bd(5.02e12), bd(5.02e11), bd(5.1e14))),
    EVIL_ICARUS_PROUDBOTTOM: new Enemy(
        320,
        "evilIcarusProudbottom",
        "Evil Icarus Proudbottom",
        ENEMY_TYPE.EXPLODER,
        new AttackStat(12, bd(5.02e12), bd(5.02e12), bd(5.02e11), bd(5.1e14))
    ),
    EVIL_BROWN_SLIME: new Enemy(321, "evilBrownSlime", "Evil Brown Slime", ENEMY_TYPE.POISON, new AttackStat(1.2, bd(5.03e12), bd(5.03e12), bd(5.03e11), bd(5.15e14))),
    FLOCK_OF_CANADA_GEESE: new Enemy(322, "flockofCanadaGeese", "Flock of Canada Geese", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(5.03e12), bd(5.03e12), bd(5.03e11), bd(5.15e14))),
    EVIL_SPIKY_HAIRED_GUY_BOSS: new Enemy(
        323,
        "eVILSPIKYHAIREDGUYBOSS",
        "EVIL SPIKY HAIRED GUY (BOSS)",
        ENEMY_TYPE.RAPID,
        new AttackStat(1.2, bd(5.05e12), bd(5.05e12), bd(5.05e11), bd(5.25e14)),
        true
    ),
    EVIL_CHAD: new Enemy(324, "eVILCHADBOSS", "EVIL CHAD(BOSS)", ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(5.05e12), bd(5.05e12), bd(5.05e11), bd(5.25e14)), true),

    // Pretty Pink Princess Land
    THE_HUMKEYCORN: new Enemy(325, "theHumkeycorn", "The Humkeycorn", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(2.5e13), bd(2.5e13), bd(2.5e12), bd(2.5e15))),
    POOKY_THE_BUNNY: new Enemy(326, "pookyTheBunny", "Pooky The Bunny", ENEMY_TYPE.RAPID, new AttackStat(1, bd(2.51e13), bd(2.51e13), bd(2.51e12), bd(2.55e15))),
    THE_MORE_YOU_KNOW_STAR: new Enemy(
        327,
        "TheMoreYouKnowStar",
        "'The More You Know' Star",
        ENEMY_TYPE.CHARGER,
        new AttackStat(1.1, bd(2.51e13), bd(2.51e13), bd(2.51e12), bd(2.55e15))
    ),
    A_FABULOUS_LEPRECHAUN: new Enemy(
        328,
        "aFabulousLeprechaun",
        "A Fabulous Leprechaun",
        ENEMY_TYPE.GROWER,
        new AttackStat(1.2, bd(2.52e13), bd(2.52e13), bd(2.52e12), bd(2.6e15))
    ),
    AN_ORDINARY_POSSUM: new Enemy(329, "anOrdinaryPossum", "An Ordinary Possum", ENEMY_TYPE.POISON, new AttackStat(1.2, bd(2.52e13), bd(2.52e13), bd(2.52e12), bd(2.6e15))),
    BARRY_THE_BEER_FAIRY: new Enemy(330, "barrytheBeerFairy", "Barry, the Beer Fairy", ENEMY_TYPE.EXPLODER, new AttackStat(12, bd(2.53e13), bd(2.53e13), bd(2.53e12), bd(2.65e15))),
    AN_ASSHOLE_SWAN: new Enemy(331, "aNASSHOLESWANBOSS", "AN ASSHOLE SWAN (BOSS)", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(2.53e13), bd(2.53e13), bd(2.53e12), bd(2.65e15)), true),
    TINKLES: new Enemy(332, "tINKLESBOSS", "TINKLES (BOSS)", ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(2.55e13), bd(2.55e13), bd(2.55e12), bd(2.7e15)), true),

    // Meta Land
    A_HALF_EATEN_COOKIE: new Enemy(151, "aHalfeatenCookie", "A Half-eaten Cookie", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1e16), bd(1e16), bd(1e15), bd(1e18))),
    A_RUSTY_CRANK: new Enemy(152, "aRustyCrank", "A Rusty Crank", ENEMY_TYPE.POISON, new AttackStat(1, bd(1.02e16), bd(1.02e16), bd(1.02e15), bd(1.05e18))),
    AHH_A_SHARK: new Enemy(153, "ahhAShark", "Ahh!! A Shark!!", ENEMY_TYPE.CHARGER, new AttackStat(1.1, bd(1.04e16), bd(1.04e16), bd(1.04e15), bd(1.1e18))),
    THE_NUMBER_18X10308: new Enemy(154, "thenumberx", "The number 1.8 x 10^308", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(1.06e16), bd(1.06e16), bd(1.06e15), bd(1.15e18))),
    A_WEIRD_GOBLIN_DEMON_THING: new Enemy(
        155,
        "aWeirdGoblinDemonThing",
        "A Weird Goblin-Demon-Thing",
        ENEMY_TYPE.RAPID,
        new AttackStat(1.2, bd(1.08e16), bd(1.08e16), bd(1.08e15), bd(1.2e18))
    ),
    A_CUTE_KITTEN: new Enemy(156, "aCuteKitten", "A Cute Kitten", ENEMY_TYPE.EXPLODER, new AttackStat(12, bd(1.1e16), bd(1.1e16), bd(1.1e15), bd(1.2e18))),
    THE_DRAGON_OF_WISDOM: new Enemy(
        157,
        "tHEDRAGONOFWISDOMBOSS",
        "THE DRAGON OF WISDOM (BOSS)",
        ENEMY_TYPE.GROWER,
        new AttackStat(1.2, bd(1.12e16), bd(1.12e16), bd(1.12e15), bd(1.25e18)),
        true
    ),
    THE_DRAGON_OF_DILDO: new Enemy(
        158,
        "tHEDRAGONOFDILDOBOSS",
        "THE DRAGON OF DILDO (BOSS)",
        ENEMY_TYPE.GROWER,
        new AttackStat(1.2, bd(1.15e16), bd(1.15e16), bd(1.15e15), bd(1.25e18)),
        true
    ),

    // Interdimensional Party
    THE_BOUNCER_PART_2: new Enemy(159, "theBouncerPart", "The Bouncer, Part 2", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1e17), bd(1e17), bd(1e16), bd(1.1e19))),
    JAMBI: new Enemy(160, "jambi", "Jambi", ENEMY_TYPE.RAPID, new AttackStat(1, bd(1.02e17), bd(1.02e17), bd(1.02e16), bd(1.1e19))),
    GOD_OF_THUNDER: new Enemy(161, "godofThunder", "God of Thunder", ENEMY_TYPE.CHARGER, new AttackStat(1.1, bd(1.04e17), bd(1.04e17), bd(1.04e16), bd(1.15e19))),
    THE_ENTIRE_STATE_OF_SOUTH_DAKOTA: new Enemy(
        162,
        "theEntireStateofSouthDakota",
        "The Entire State of South Dakota",
        ENEMY_TYPE.NORMAL,
        new AttackStat(1.2, bd(1.06e17), bd(1.06e17), bd(1.06e16), bd(1.15e19))
    ),
    A_HUGE_STACK_OF_POGS: new Enemy(163, "aHugeStackofPogs", "A Huge Stack of Pogs", ENEMY_TYPE.POISON, new AttackStat(1.2, bd(1.08e17), bd(1.08e17), bd(1.08e16), bd(1.2e19))),
    THREE_GUYS_SHOUTING_OUT_ED: new Enemy(
        164,
        "threeGuysShoutingoutEd",
        "Three Guys Shouting out 'Ed'",
        ENEMY_TYPE.EXPLODER,
        new AttackStat(12, bd(1.1e17), bd(1.1e17), bd(1.1e16), bd(1.2e19))
    ),
    MR_CHOW: new Enemy(165, "MRCHOWBOSS", "'MR CHOW' (BOSS)", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(1.12e17), bd(1.12e17), bd(1.12e16), bd(1.25e19)), true),
    THE_LIFE_OF_THE_PARTY: new Enemy(
        166,
        "tHELIFEOFTHEPARTYBOSS",
        "THE LIFE OF THE PARTY (BOSS)",
        ENEMY_TYPE.GROWER,
        new AttackStat(1.2, bd(1.15e17), bd(1.15e17), bd(1.15e16), bd(1.25e19)),
        true
    ),

    // Typo Zonw
    PERMANENET: new Enemy(167, "permanenet", "Permanenet", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(8e19), bd(8e19), bd(8e18), bd(8.1e21))),
    COUDL: new Enemy(168, "coudl", "Coudl", ENEMY_TYPE.RAPID, new AttackStat(1, bd(8.02e19), bd(8.02e19), bd(8.02e18), bd(8.1e21))),
    LIEK: new Enemy(169, "liek", "Liek", ENEMY_TYPE.CHARGER, new AttackStat(1.1, bd(8.04e19), bd(8.04e19), bd(8.04e18), bd(8.15e21))),
    BLODO: new Enemy(170, "blodo", "Blodo", ENEMY_TYPE.POISON, new AttackStat(1.2, bd(8.08e19), bd(8.08e19), bd(8.08e18), bd(8.2e21))),
    BRIAN: new Enemy(171, "brian", "Brian", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(8.06e19), bd(8.06e19), bd(8.06e18), bd(8.15e21))),
    ODIGN: new Enemy(172, "odign", "Odign", ENEMY_TYPE.RAPID, new AttackStat(0.8, bd(8.1e19), bd(8.1e19), bd(8.1e18), bd(8.2e21))),
    HORUS: new Enemy(173, "hORUSBOSS", "HORUS (BOSS)", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(8.12e19), bd(8.12e19), bd(8.12e18), bd(8.25e21)), true),
    ELDER_TYPO_GOD_ELXU: new Enemy(
        174,
        "eLDERTYPOGODELXUBOSS",
        "ELDER TYPO GOD, ELXU (BOSS)",
        ENEMY_TYPE.GROWER,
        new AttackStat(1.2, bd(8.15e19), bd(8.15e19), bd(8.15e18), bd(8.25e21)),
        true
    ),

    // The Fad-lands
    A_VERY_SAD_SLINKY: new Enemy(175, "aVerySadSlinkyc", "A Very Sad Slinky :c", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(4e20), bd(4e20), bd(4e19), bd(4.1e22))),
    GIANT_METAL_SPINNING_TOP: new Enemy(
        176,
        "giantMetalSpinningTop",
        "Giant Metal Spinning Top",
        ENEMY_TYPE.RAPID,
        new AttackStat(1, bd(4.02e20), bd(4.02e20), bd(4.02e19), bd(4.1e22))
    ),
    A_STACK_OF_KRAZY_BONEZ: new Enemy(
        177,
        "aStackofKrazyBonez",
        "A Stack of Krazy Bonez",
        ENEMY_TYPE.CHARGER,
        new AttackStat(1.1, bd(4.04e20), bd(4.04e20), bd(4.04e19), bd(4.15e22))
    ),
    RARE_FOIL_POKEYMAN_CARD: new Enemy(
        178,
        "rareFoilPokeymanCard",
        "Rare Foil Pokeyman Card",
        ENEMY_TYPE.NORMAL,
        new AttackStat(1.2, bd(4.06e20), bd(4.06e20), bd(4.06e19), bd(4.15e22))
    ),
    A_BUSTED_GAMEBOY: new Enemy(179, "aBustedGameboy", "A Busted Gameboy", ENEMY_TYPE.POISON, new AttackStat(1.2, bd(4.08e20), bd(4.08e20), bd(4.08e19), bd(4.2e22))),
    A_WORTHLESS_BEANY_BABY: new Enemy(180, "aWorthlessBeanyBaby", "A Worthless Bean-y Baby", ENEMY_TYPE.RAPID, new AttackStat(0.8, bd(4.1e20), bd(4.1e20), bd(4.1e19), bd(4.2e22))),
    THE_SLAMMER: new Enemy(181, "tHESLAMMERBOSS", "THE SLAMMER (BOSS)", ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(4.12e20), bd(4.12e20), bd(4.12e19), bd(4.25e22)), true),
    DEMONIC_FLURBIE: new Enemy(
        182,
        "dEMONICFLURBIEBOSS",
        "DEMONIC FLURBIE (BOSS)",
        ENEMY_TYPE.GROWER,
        new AttackStat(1.2, bd(4.15e20), bd(4.15e20), bd(4.15e19), bd(4.25e22)),
        true
    ),

    // JRPGVille
    SENTIENT_PILE_OF_BELTS: new Enemy(183, "sentientPileofBelts", "Sentient Pile of Belts", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(2e21), bd(2e21), bd(2e20), bd(2.1e23))),
    MIMIC_MIMIC_CHEST_CHEST: new Enemy(
        184,
        "mimicMimicChestChest",
        "Mimic 'Mimic Chest' Chest",
        ENEMY_TYPE.PARALYZE,
        new AttackStat(1, bd(2.02e21), bd(2.02e21), bd(2.02e20), bd(2.1e23))
    ),
    A_SUPLEXING_TRAIN: new Enemy(185, "aSuplexingTrain", "A Suplexing Train", ENEMY_TYPE.CHARGER, new AttackStat(1.1, bd(2.04e21), bd(2.04e21), bd(2.04e20), bd(2.15e23))),
    THE_ANNOYING_FAN: new Enemy(186, "theAnnoyingFan", "The Annoying Fan", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(2.06e21), bd(2.06e21), bd(2.06e20), bd(2.15e23))),
    THE_INFINITY_SWORD: new Enemy(187, "theInfinitySword", "The Infinity+1 Sword", ENEMY_TYPE.POISON, new AttackStat(1.2, bd(2.08e21), bd(2.08e21), bd(2.08e20), bd(2.2e23))),
    THE_DAMAGE_CAP: new Enemy(188, "theDamageCap", "The Damage Cap", ENEMY_TYPE.GROWER, new AttackStat(1.1, bd(2.1e21), bd(2.1e21), bd(2.1e20), bd(2.2e23))),
    FINAL_BOSS: new Enemy(189, "fINALBOSS", "FINAL (BOSS)", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(2.12e21), bd(2.12e21), bd(2.12e20), bd(2.25e23)), true),
    TRUE_FINAL_BOSS: new Enemy(190, "tRUEFINALBOSS", "TRUE FINAL (BOSS)", ENEMY_TYPE.GROWER, new AttackStat(1.2, bd(2.15e21), bd(2.15e21), bd(2.15e20), bd(2.25e23)), true),

    // The Rad-Lands
    SMALL_BART: new Enemy(191, "smallBart", "Small Bart", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(2e24), bd(2e24), bd(2e23), bd(2.1e26))),
    PAIR_OF_SHADES_WEARING_SHADES: new Enemy(
        197,
        "pairofShadesWearingShades",
        "Pair of Shades Wearing Shades",
        ENEMY_TYPE.PARALYZE,
        new AttackStat(1, bd(2.02e24), bd(2.02e24), bd(2.02e23), bd(2.1e26))
    ),
    AC_SKATER: new Enemy(193, "aCSKATERBOSS", "A.C SKATER (BOSS)", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(2e24), bd(2e24), bd(2e23), bd(2.1e26)), true),
    LAME_SECURITY_GUARD: new Enemy(194, "lameSecurityGuard", "Lame Security Guard", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(2e24), bd(2e24), bd(2e23), bd(2.1e26))),
    A_GIANT_VAT_OF_PLUTONIUM: new Enemy(
        195,
        "aGiantVatofPlutonium",
        "A Giant Vat of Plutonium-238",
        ENEMY_TYPE.CHARGER,
        new AttackStat(1.1, bd(2.04e24), bd(2.04e24), bd(2.04e23), bd(2.15e26))
    ),
    MUTANT_ZOMBIE_MARIE_CURIE: new Enemy(
        196,
        "mutantZombieMarieCurie",
        "Mutant Zombie Marie Curie",
        ENEMY_TYPE.NORMAL,
        new AttackStat(1.2, bd(2.06e24), bd(2.06e24), bd(2.06e23), bd(2.15e26))
    ),
    NUCLEAR_POWER_PANTS: new Enemy(192, "nuclearPowerPants", "Nuclear Power Pants", ENEMY_TYPE.POISON, new AttackStat(1.2, bd(2.08e24), bd(2.08e24), bd(2.08e23), bd(2.2e26))),
    A_WANDERING_GAMMA_RAY: new Enemy(198, "aWanderingGammaRay", "A Wandering Gamma Ray", ENEMY_TYPE.GROWER, new AttackStat(1, bd(2.1e24), bd(2.1e24), bd(2.1e23), bd(2.2e26))),
    A_MASSIVE_SEALED_VAULT: new Enemy(
        199,
        "aMassiveSealedVault",
        "A Massive Sealed Vault",
        ENEMY_TYPE.NORMAL,
        new AttackStat(1.2, bd(2.12e24), bd(2.12e24), bd(2.12e23), bd(2.25e26))
    ),
    RADIOACTIVE_MACGUFFIN: new Enemy(
        200,
        "rADIOACTIVEMACGUFFINBOSS",
        "RADIOACTIVE MACGUFFIN (BOSS)",
        ENEMY_TYPE.GROWER,
        new AttackStat(1.2, bd(2.15e24), bd(2.15e24), bd(2.15e23), bd(2.25e26)),
        true
    ),

    // Back To School
    A_DIFFERENT_GREASY_NERD: new Enemy(348, "aDifferentGreasyNerd", "A Different Greasy Nerd", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(3e26), bd(3e26), bd(3e25), bd(3.1e28))),
    SENTIENT_JOCK_STRAP: new Enemy(349, "sentientJockStrap", "Sentient Jock Strap", ENEMY_TYPE.PARALYZE, new AttackStat(1, bd(3.02e26), bd(3.02e26), bd(3.02e25), bd(3.1e28))),
    THE_FLYING_SPINELLI_MONSTER: new Enemy(
        350,
        "theFlyingSpinelliMonster",
        "The Flying Spinelli Monster",
        ENEMY_TYPE.CHARGER,
        new AttackStat(1.1, bd(3.04e26), bd(3.04e26), bd(3.04e25), bd(3.15e28))
    ),
    A_REALLY_STRICT_NUN: new Enemy(351, "aReallyStrictNun", "A Really Strict Nun", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(3.06e26), bd(3.06e26), bd(3.06e25), bd(3.15e28))),
    THE_NUNS_RULER: new Enemy(352, "theNunsRuler", "The Nun's Ruler", ENEMY_TYPE.POISON, new AttackStat(1.2, bd(3.08e26), bd(3.08e26), bd(3.08e25), bd(3.2e28))),
    THE_MYSTERY_MEAT: new Enemy(353, "theMysteryMeat", "The Mystery Meat", ENEMY_TYPE.GROWER, new AttackStat(1.1, bd(3.1e26), bd(3.1e26), bd(3.1e25), bd(3.2e28))),
    WILLY: new Enemy(354, "wILLYBOSS", "WILLY (BOSS)", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(3.12e26), bd(3.12e26), bd(3.12e25), bd(3.25e28)), true),
    BELDING: new Enemy(355, "bELDINGBOSS", "BELDING (BOSS)", ENEMY_TYPE.GROWER, new AttackStat(1.2, bd(3.15e26), bd(3.15e26), bd(3.15e25), bd(3.25e28)), true),

    // The West World
    A_STICKMAN_COWBOY: new Enemy(356, "aStickmanCowboy", "A Stickman Cowboy", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1.5e27), bd(1.5e27), bd(1.5e26), bd(1.5e29))),
    A_GIANT_CANNON: new Enemy(357, "aGiantCannon", "A Giant Cannon", ENEMY_TYPE.PARALYZE, new AttackStat(1, bd(1.52e27), bd(1.52e27), bd(1.52e26), bd(1.5e29))),
    THE_ENTIRE_BAR: new Enemy(358, "theEntireBar", "The Entire Bar", ENEMY_TYPE.RAPID, new AttackStat(1.1, bd(1.54e27), bd(1.54e27), bd(1.54e26), bd(1.55e29))),
    A_PATHETIC_TUMBLEWEED: new Enemy(
        359,
        "aPatheticTumbleweed",
        "A Pathetic Tumbleweed",
        ENEMY_TYPE.POISON,
        new AttackStat(1.2, bd(1.56e27), bd(1.56e27), bd(1.56e26), bd(1.55e29))
    ),
    A_SINGLE_COW: new Enemy(360, "aSingleCow", "A Single Cow", ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(1.58e27), bd(1.58e27), bd(1.58e26), bd(1.6e29))),
    HERD_OF_PISSED_OFF_COWS: new Enemy(
        361,
        "herdofPissedOffCows",
        "Herd of Pissed Off Cows",
        ENEMY_TYPE.GROWER,
        new AttackStat(1.1, bd(1.6e27), bd(1.6e27), bd(1.6e26), bd(1.6e29))
    ),
    THE_OUTLAW: new Enemy(362, "tHEOUTLAWBOSS", "THE OUTLAW (BOSS)", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(1.62e27), bd(1.62e27), bd(1.62e26), bd(1.65e29)), true),
    THE_SHERIFF: new Enemy(363, "tHESHERIFFBOSS", "THE SHERIFF (BOSS)", ENEMY_TYPE.GROWER, new AttackStat(1.2, bd(1.65e27), bd(1.65e27), bd(1.65e26), bd(1.65e29)), true),

    // The Breadverse
    GRANDMAS_BROWNIES: new Enemy(201, "grandmasBrownies", "Grandma's 'Brownies'", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1e29), bd(1.2e29), bd(1.2e28), bd(5.5e30))),
    ANGRY_RAW_COOKIE_DOUGH: new Enemy(
        202,
        "angryRawCookieDough",
        "Angry Raw Cookie Dough",
        ENEMY_TYPE.PARALYZE,
        new AttackStat(1, bd(1.02e29), bd(1.22e29), bd(1.22e28), bd(5.4e30))
    ),
    A_BEARDED_BREADED_BRAID: new Enemy(203, "aBeardedBreadedBraid", "A Bearded Breaded Braid", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1e29), bd(1.2e29), bd(1.2e28), bd(5.6e30))),
    BUTCHER_CANDLESTICK_MAKER: new Enemy(
        204,
        "butcherCandlestickMaker",
        "Butcher & Candlestick Maker",
        ENEMY_TYPE.NORMAL,
        new AttackStat(1, bd(1e29), bd(1.2e29), bd(1.2e28), bd(5.7e30))
    ),
    THE_EXGREATEST_THING: new Enemy(205, "theExGreatestThing", "The Ex-Greatest Thing", ENEMY_TYPE.CHARGER, new AttackStat(1.1, bd(1.04e29), bd(1.24e29), bd(1.24e28), bd(5.8e30))),
    MOLDY_SLICE_OF_BREAD: new Enemy(206, "moldySliceOfBread", "Moldy Slice Of Bread", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(1.06e29), bd(1.26e29), bd(1.26e28), bd(5.9e30))),
    THE_YEAST_BEAST: new Enemy(207, "tHEYEASTBEASTBOSS", "THE YEAST BEAST (BOSS)", ENEMY_TYPE.POISON, new AttackStat(1.2, bd(1.08e29), bd(1.28e29), bd(1.28e28), bd(6e30)), true),
    A_DAY_OLD_BAGUETTE: new Enemy(
        208,
        "aDAYOLDBAGUETTEBOSS",
        "A DAY-OLD BAGUETTE (BOSS)",
        ENEMY_TYPE.GROWER,
        new AttackStat(1.2, bd(1.1e29), bd(1.3e29), bd(1.35e28), bd(6e30)),
        true
    ),

    // That 70's Zone
    A_GROOVY_SAXOPHONE: new Enemy(209, "aGroovySaxophone", "A Groovy Saxophone", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(3e29), bd(4e29), bd(4e28), bd(2.02e31))),
    A_GIANT_PAIR_OF_ROLLER_SKATES: new Enemy(
        210,
        "aGiantPairOfRollerSkates",
        "A Giant Pair Of Roller Skates",
        ENEMY_TYPE.PARALYZE,
        new AttackStat(1, bd(3.02e29), bd(4.02e29), bd(4.02e28), bd(2.02e31))
    ),
    A_S_PORN_MUSTASCHE: new Enemy(211, "asPornMustasche", "A 70's Porn Mustasche", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(3e29), bd(4e29), bd(4e28), bd(2.03e31))),
    A_DISGUSTING_BONG: new Enemy(212, "aDisgustingBong", "A Disgusting Bong", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(3e29), bd(4e29), bd(4e28), bd(2.03e31))),
    A_HIPPIE_WITH_A_HIP: new Enemy(213, "aHippiewithaHip", "A Hippie with a Hip", ENEMY_TYPE.CHARGER, new AttackStat(1.1, bd(3.04e29), bd(4.04e29), bd(4.04e28), bd(2.04e31))),
    HOLY_CRAP_ITS_ANOTHER_SHARK: new Enemy(
        214,
        "holyCrapItsAnotherShark",
        "Holy Crap It's Another Shark",
        ENEMY_TYPE.RAPID,
        new AttackStat(1.2, bd(3.06e29), bd(4.06e29), bd(4.06e28), bd(2.04e31))
    ),
    THE_WORST_VINYL_RECORD: new Enemy(
        215,
        "tHEWORSTVINYLRECORD",
        "THE WORST VINYL RECORD",
        ENEMY_TYPE.POISON,
        new AttackStat(1.2, bd(3.08e29), bd(4.08e29), bd(4.08e28), bd(2.05e31)),
        true
    ),
    THE_FRO: new Enemy(216, "tHEFROBOSS", "THE 'FRO (BOSS)", ENEMY_TYPE.GROWER, new AttackStat(1.2, bd(3.15e29), bd(4.1e29), bd(4.15e28), bd(2.06e31)), true),

    // The Halloweenies
    ULTRA_INSTINCT_STONER: new Enemy(217, "ultraInstinctStoner", "Ultra Instinct Stoner", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1e30), bd(1.2e30), bd(1.2e29), bd(6e31))),
    A_SKELETON_INSIDE_A_BODY: new Enemy(
        218,
        "aSkeletonInsideaBody",
        "A Skeleton Inside a Body",
        ENEMY_TYPE.PARALYZE,
        new AttackStat(1, bd(1e30), bd(1.22e30), bd(1.22e29), bd(6e31))
    ),
    A_BADLY_MADE_SEXY_FLORIDA_COSTUME: new Enemy(
        219,
        "aBadlyMadeSexyFloridaCostume",
        "A Badly Made Sexy Florida Costume",
        ENEMY_TYPE.NORMAL,
        new AttackStat(1, bd(1e30), bd(1.2e30), bd(1.2e29), bd(6e31))
    ),
    AN_UNNECESSARY_SEQUEL: new Enemy(220, "anUnnecessarySequel", "An Unnecessary Sequel", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1e30), bd(1.2e30), bd(1.2e29), bd(6e31))),
    AN_ELEVATOR_FULL_OF_BLOOD: new Enemy(
        221,
        "anElevatorFullofBlood",
        "An Elevator Full of Blood",
        ENEMY_TYPE.CHARGER,
        new AttackStat(1.1, bd(1.04e30), bd(1.24e30), bd(1.24e29), bd(6.5e31))
    ),
    CANDY_CORN: new Enemy(222, "candyCorn", "Candy Corn", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(1.06e30), bd(1.26e30), bd(1.26e29), bd(6.5e31))),
    TEXAS_CHAINSAW_MASCARA: new Enemy(
        223,
        "tEXASCHAINSAWMASCARABOSS",
        "TEXAS CHAINSAW MASCARA (BOSS)",
        ENEMY_TYPE.NORMAL,
        new AttackStat(1.2, bd(1.08e30), bd(1.28e30), bd(1.28e29), bd(6e31)),
        true
    ),
    JIGSAW: new Enemy(224, "jIGSAWBOSS", "JIGSAW (BOSS)", ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(1.12e30), bd(1.3e30), bd(1.25e29), bd(6.5e31)), true),

    // Construction Zone
    A_CONSTRUCTION_SLOB: new Enemy(225, "aConstructionSlob", "A Construction Slob", ENEMY_TYPE.POISON, new AttackStat(1, bd(4e31), bd(4.2e31), bd(4.2e30), bd(2.05e33))),
    QUICKSAND_CEMENT: new Enemy(226, "quicksandCement", "Quicksand Cement", ENEMY_TYPE.RAPID, new AttackStat(1, bd(4.02e31), bd(4.22e31), bd(4.22e30), bd(2.04e33))),
    A_CEMENT_TRUCK: new Enemy(227, "aCementTruck", "A Cement Truck", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(4e31), bd(4.2e31), bd(4.2e30), bd(2.06e33))),
    A_BULLDOZER: new Enemy(228, "aBulldozer", "A Bulldozer", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(4e31), bd(4.2e31), bd(4.2e30), bd(2.07e33))),
    THREE_GUYS_CARRYING_A_BEAM: new Enemy(
        229,
        "GuysCarryingaBeam",
        "3 Guys Carrying a Beam",
        ENEMY_TYPE.NORMAL,
        new AttackStat(1.1, bd(4.04e31), bd(4.24e31), bd(4.24e30), bd(2.08e33))
    ),
    A_PIANOSAFE: new Enemy(230, "aPianoSafe", "A Piano-Safe", ENEMY_TYPE.EXPLODER, new AttackStat(14, bd(4.06e31), bd(4.26e31), bd(4.26e30), bd(2.09e33))),
    SEVEN_GUYS_TAKING_A_BREAK: new Enemy(
        231,
        "GUYSTAKINGABREAKBOSS",
        "7 GUYS TAKING A BREAK (BOSS)",
        ENEMY_TYPE.NORMAL,
        new AttackStat(1.2, bd(4.08e31), bd(4.28e31), bd(4.28e30), bd(2.1e33)),
        true
    ),
    THE_CRANE: new Enemy(232, "tHECRANEBOSS", "THE CRANE (BOSS)", ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(4.1e31), bd(4.3e31), bd(4.35e30), bd(2.1e33)), true),

    //DUCK DUCK ZONE
    A_DUCK: new Enemy(233, "aDuck", "A Duck", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1e32), bd(1e32), bd(1e30), bd(5.02e33))),
    ANOTHER_DUCK: new Enemy(234, "anotherDuck", "Another Duck", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1.02e32), bd(1.02e32), bd(1.02e30), bd(5.02e33))),
    GOOSE: new Enemy(235, "Goose", "...Goose!", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1e32), bd(1e32), bd(1e30), bd(5.03e33))),
    SCIENTIFICALLY_ACCURATE_DUCK: new Enemy(
        236,
        "scientificallyAccurateDuck",
        "Scientifically Accurate Duck",
        ENEMY_TYPE.PARALYZE,
        new AttackStat(1, bd(1e32), bd(1e32), bd(1e30), bd(5.03e33))
    ),
    A_MOTHERDUCKER: new Enemy(237, "aMotherDucker", "A MotherDucker", ENEMY_TYPE.CHARGER, new AttackStat(1.1, bd(1.04e32), bd(1.04e32), bd(1.04e30), bd(5.04e33))),
    TOTALLY_A_DUCK: new Enemy(238, "totallyaDuck", "Totally a Duck", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(1.06e32), bd(1.06e32), bd(1.06e30), bd(5.04e33))),
    THE_DOG: new Enemy(239, "tHEDOGBOSS", "THE DOG (BOSS)", ENEMY_TYPE.GROWER, new AttackStat(1.2, bd(1.08e32), bd(1.08e32), bd(1.08e30), bd(5.05e33)), true),
    A_SINGLE_GRAPE: new Enemy(240, "aSINGLEGRAPEBOSS", "A SINGLE GRAPE (BOSS)", ENEMY_TYPE.POISON, new AttackStat(1.2, bd(1e32), bd(1.1e32), bd(1e30), bd(5.06e33)), true),

    // The Nether Regions
    A_PATCH_OF_TULIPS: new Enemy(241, "aPatchofTulips", "A Patch of Tulips", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(2.5e32), bd(2.5e32), bd(2.5e30), bd(1.2e34))),
    A_RANDOM_LADY: new Enemy(242, "aRandomLady", "A Random Lady", ENEMY_TYPE.PARALYZE, new AttackStat(1, bd(2.5e32), bd(2.5e32), bd(2.52e30), bd(1.2e34))),
    A_LOST_CANADIAN_MOOSE: new Enemy(243, "aLostCanadianMoosec", "A Lost Canadian Moose :c", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(2.5e32), bd(2.5e32), bd(2.5e30), bd(1.2e34))),
    A_FIVE_BLADED_WINDMILL: new Enemy(244, "aBladedWindmill", "A 5 Bladed Windmill", ENEMY_TYPE.CHARGER, new AttackStat(1.1, bd(2.54e32), bd(2.54e32), bd(2.54e30), bd(1.25e34))),
    A_JERK_CYCLIST: new Enemy(245, "aJerkCyclist", "A Jerk Cyclist", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(2.56e32), bd(2.56e32), bd(2.56e30), bd(1.25e34))),
    A_DUTCH_OVEN: new Enemy(246, "aDutchOven", "A Dutch Oven", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(2.5e32), bd(2.5e32), bd(2.5e30), bd(1.2e34))),
    THE_GRAND_DUTCH_DUCHY: new Enemy(
        247,
        "tHEGRANDDUTCHDUCHY",
        "THE GRAND DUTCH DUCHY",
        ENEMY_TYPE.NORMAL,
        new AttackStat(1.2, bd(2.58e32), bd(2.68e32), bd(2.58e30), bd(1.3e34)),
        true
    ),
    DAAN_VAN_DER_VAN_JAANSEN: new Enemy(
        248,
        "dAANVANDERVANJAANSENBOSS",
        "DAAN VAN DER VAN JAANSEN (BOSS)",
        ENEMY_TYPE.CHARGER,
        new AttackStat(1.2, bd(2.6e32), bd(2.6e32), bd(2.55e30), bd(1.3e34)),
        true
    ),

    // The Aethereal Sea
    A_SEAGULL: new Enemy(249, "aSeagull", "A Seagull", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.3e32), bd(8.2e35))),
    COSMIC_JELLYFISH: new Enemy(250, "cosmicJellyfish", "Cosmic Jellyfish", ENEMY_TYPE.PARALYZE, new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.32e32), bd(8.2e35))),
    AETHER_EEL: new Enemy(251, "aetherEel", "Aether Eel", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.3e32), bd(8.2e35))),
    YOU: new Enemy(252, "you", "You.", ENEMY_TYPE.CHARGER, new AttackStat(1.1, bd(1.34e34), bd(1.34e34), bd(1.34e32), bd(8.25e35))),
    A_PIRAT: new Enemy(253, "aPirat", "A Pi-rat", ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(1.36e34), bd(1.36e34), bd(1.36e32), bd(8.25e35))),
    A_BUNCH_OF_OLD_NEWSPAPERS: new Enemy(
        254,
        "aBunchofOldNewspapers",
        "A Bunch of Old Newspapers",
        ENEMY_TYPE.NORMAL,
        new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.3e32), bd(8.2e35))
    ),
    THE_BUCKET: new Enemy(255, "tHEBUCKETBOSS", "THE BUCKET (BOSS)", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(1.38e34), bd(1.38e34), bd(1.38e32), bd(8.34e35)), true),
    A_TAR_BLOB_MONSTER: new Enemy(
        256,
        "aTARBLOBMONSTERBOSS",
        "A TAR BLOB MONSTER (BOSS)",
        ENEMY_TYPE.POISON,
        new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.3e32), bd(8.34e35)),
        true
    ),
    ANOTHER_YOU: new Enemy(257, "anotherYou", "Another You.", ENEMY_TYPE.PARALYZE, new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.32e32), bd(8.25e35))),
    A_PADDLEFISH: new Enemy(258, "aPaddlefish", "A Paddlefish", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.3e32), bd(8.26e35))),
    AN_ANGLERFISH: new Enemy(259, "anAnglerfish", "An Anglerfish", ENEMY_TYPE.RAPID, new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.3e32), bd(8.27e35))),
    A_BUNCH_OF_CANNONS: new Enemy(260, "aBunchofCannons", "A Bunch of Cannons", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.3e32), bd(8.28e35))),
    A_PILE_OF_ROPES: new Enemy(261, "aPileofRopes", "A Pile of Ropes", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.3e32), bd(8.2e35))),
    LADDERS: new Enemy(262, "ladders", "Ladders!", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.3e32), bd(8.2e35))),
    AND_SNAKES: new Enemy(263, "andSnakes", "And Snakes!!!", ENEMY_TYPE.POISON, new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.3e32), bd(8.2e35))),
    RAMSHACKLE_SEA_INN: new Enemy(
        264,
        "rAMSHACKLESEAINNBOSS",
        "RAMSHACKLE SEA INN (BOSS)",
        ENEMY_TYPE.CHARGER,
        new AttackStat(1.1, bd(1.34e34), bd(1.34e34), bd(1.34e32), bd(8.35e35)),
        true
    ),
    THE_FIRST_PIRATE: new Enemy(265, "theFirstPirate", "The First Pirate", ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(1.36e34), bd(1.36e34), bd(1.36e32), bd(8.25e35))),
    THE_SECOND_PIRATE: new Enemy(266, "theSecondPirate", "The Second Pirate", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.3e32), bd(8.2e35))),
    THE_THIRD_PIRATE: new Enemy(267, "theThirdPirate", "The Third Pirate", ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.3e32), bd(8.2e35))),
    THE_FOURTH_PIRATE_: new Enemy(268, "theFourthPirate", "The Fourth Pirate ", ENEMY_TYPE.PARALYZE, new AttackStat(1, bd(1.3e34), bd(1.3e34), bd(1.32e32), bd(8.2e35))),
    THE_CAPTAIN: new Enemy(269, "tHECAPTAINBOSS", "THE CAPTAIN (BOSS)", ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(1.3e34), bd(1.3e34), bd(1.35e32), bd(8.35e35)), true),
} as const satisfies { [k: string]: Enemy };

export const Titans: { [k: string]: Titan } = {
    // Titans
    NONE: new Titan(0, "none", "No Titan", new AttackStat(0, bd(0), bd(0), bd(0), bd(0)), new AttackStat(0, bd(0), bd(0), bd(0), bd(0)), 1, bd(0), [bd(0), bd(0)], 0, 0, 0),
    GORDON_RAMSEY: new Titan(
        1,
        "gordonRamsayBolton",
        "Gordon Ramsay Bolton",
        new AttackStat(2, bd(666), bd(666), bd(66), bd(300000)),
        new AttackStat(0, bd(3000), bd(2500), bd(0), bd(0)),
        1,
        bd(35),
        [bd(1000000), bd(1250000)],
        10,
        0,
        0
    ),
    GRAND_TREE: new Titan(
        2,
        "grandCorruptedTree",
        "Grand Corrupted Tree",
        new AttackStat(2, bd(2000), bd(2000), bd(200), bd(750000)),
        new AttackStat(0, bd(9000), bd(7000), bd(0), bd(0)),
        1,
        bd(60),
        [bd(1600000), bd(2000000)],
        15,
        0,
        0
    ),
    JAKE: new Titan(
        3,
        "jakeFromAccounting",
        "Jake From Accounting",
        new AttackStat(2, bd(8000), bd(8000), bd(1000), bd(3000000)),
        new AttackStat(0, bd(25000), bd(15000), bd(0), bd(0)),
        2,
        bd(200),
        [bd("1.2e6"), bd("1.5e6")],
        50,
        0,
        0
    ),
    UUG: new Titan(
        4,
        "uUGTheUnmentionable",
        "UGG, The Unmentionable",
        new AttackStat(2, bd(200000), bd(200000), bd(30000), bd(100000000)),
        new AttackStat(0, bd(800000), bd(400000), bd(14000), bd(0)),
        2,
        bd(300),
        [bd("2e6"), bd("2.5e6")],
        60,
        0,
        0
    ),
    WALDERP: new Titan(
        5,
        "walderp",
        "Walderp",
        [
            new AttackStat(3.2, bd("5e5"), bd("3e5"), bd(45000), bd("1.5e8")),
            new AttackStat(3.15, bd("9e5"), bd("6e5"), bd(90000), bd("3e8")),
            new AttackStat(3.1, bd("1.5e6"), bd("1e6"), bd(150000), bd("6e8")),
            new AttackStat(3.05, bd("2.2e6"), bd("1.5e6"), bd(230000), bd("8e8")),
            new AttackStat(3, bd("3e6"), bd("2e6"), bd(300000), bd("1e9")),
        ],
        [
            new AttackStat(0, bd(13e6), bd(7e6), bd(150000), bd(0)),
            new AttackStat(0, bd(13e6), bd(7e6), bd(150000), bd(0)),
            new AttackStat(0, bd(13e6), bd(7e6), bd(150000), bd(0)),
            new AttackStat(0, bd(13e6), bd(7e6), bd(150000), bd(0)),
            new AttackStat(0, bd(13e6), bd(7e6), bd(150000), bd(0)),
        ],
        3,
        bd(500),
        [bd("4e6"), bd("5e6")],
        70,
        0,
        0
    ),
    BEAST: new Titan(
        6,
        "theBeast",
        "The Beast",
        [
            new AttackStat(2.1, bd("5e8"), bd("5e8"), bd("5e7"), bd("5e10")),
            new AttackStat(2, bd("5e9"), bd("5e9"), bd("5e8"), bd("5e11")),
            new AttackStat(1.9, bd("5e10"), bd("5e10"), bd("5e9"), bd("5e12")),
            new AttackStat(1.8, bd("5e11"), bd("5e11"), bd("5e10"), bd("5e13")),
        ],
        [
            new AttackStat(0, bd(2.5e9), bd(1.6e9), bd(2.5e7), bd(0)),
            new AttackStat(0, bd(2.5e10), bd(1.6e10), bd(2.5e8), bd(0)),
            new AttackStat(0, bd(2.5e11), bd(1.6e11), bd(2.5e9), bd(0)),
            new AttackStat(0, bd(2.5e12), bd(1.6e12), bd(2.5e10), bd(0)),
        ],
        3.5,
        bd(750),
        [bd("2e7"), bd("2.5e7")],
        0,
        250000,
        1
    ),
    NERD: new Titan(
        7,
        "greasyNerd",
        "Greasy Nerd",
        [
            new AttackStat(2.1, bd("1e14"), bd("1e14"), bd("1e13"), bd("1e16")),
            new AttackStat(2, bd("2e15"), bd("2e15"), bd("2e14"), bd("2e17")),
            new AttackStat(1.9, bd("4e16"), bd("4e16"), bd("4e15"), bd("4e18")),
            new AttackStat(1.8, bd("1e18"), bd("1e18"), bd("1e17"), bd("1e20")),
        ],
        [
            new AttackStat(0, bd(5e14), bd(2.5e14), bd(5e12), bd(0)),
            new AttackStat(0, bd(1e16), bd(5e15), bd(1e14), bd(0)),
            new AttackStat(0, bd(2e17), bd(1e17), bd(2e15), bd(0)),
            new AttackStat(0, bd(5e18), bd(2.5e18), bd(5e16), bd(0)),
        ],
        4.5,
        bd(1100),
        [bd("4e10"), bd("5e10")],
        0,
        250000,
        1
    ),
    GODMOTHER: new Titan(
        8,
        "theGodmother",
        "The Godmother",
        [
            new AttackStat(2.1, bd("1e18"), bd("1e18"), bd("1e17"), bd("1e20")),
            new AttackStat(2, bd("2e19"), bd("2e19"), bd("2e18"), bd("2e21")),
            new AttackStat(1.9, bd("4e20"), bd("4e20"), bd("4e19"), bd("4e22")),
            new AttackStat(1.8, bd("1e22"), bd("1e22"), bd("1e21"), bd("1e24")),
        ],
        [
            new AttackStat(0, bd(5e18), bd(2.5e18), bd(5e16), bd(0)),
            new AttackStat(0, bd(1e20), bd(5e19), bd(1e17), bd(0)),
            new AttackStat(0, bd(2e21), bd(1e21), bd(2e19), bd(0)),
            new AttackStat(0, bd(5e22), bd(2.5e22), bd(5e20), bd(0)),
        ],
        5,
        bd(1500),
        [bd("4e11"), bd("5e11")],
        0,
        300000,
        2
    ),
    EXILE: new Titan(
        9,
        "theExile",
        "The Exile",
        [
            new AttackStat(2.1, bd("2e22"), bd("2e22"), bd("2e21"), bd("2e24")),
            new AttackStat(2, bd("4e23"), bd("4e23"), bd("2e22"), bd("2e25")),
            new AttackStat(1.9, bd("8e24"), bd("8e24"), bd("4e23"), bd("4e26")),
            new AttackStat(1.8, bd("1.5e26"), bd("1.5e26"), bd("1.5e25"), bd("1.5e28")),
        ],
        [
            new AttackStat(0, bd(1e23), bd(5e22), bd(1e21), bd(0)),
            new AttackStat(0, bd(2e24), bd(1e24), bd(2e22), bd(0)),
            new AttackStat(0, bd(4e25), bd(2e25), bd(4e23), bd(0)),
            new AttackStat(0, bd(7.5e26), bd(3.7e26), bd(7.5e24), bd(0)),
        ],
        5.5,
        bd(2500),
        [bd("4e12"), bd("5e12")],
        0,
        400000,
        3
    ),
    IT_HUNGERS: new Titan(
        10,
        "itHungers",
        "IT HUNGERS",
        [
            new AttackStat(2.1, bd("1e28"), bd("2e28"), bd("2e27"), bd("5e29")),
            new AttackStat(1.9, bd("8e28"), bd("1.6e29"), bd("1.6e28"), bd("4e30")),
            new AttackStat(1.7, bd("5e29"), bd("1e30"), bd("1e29"), bd("2.5e31")),
            new AttackStat(1.5, bd("2.5e30"), bd("5e30"), bd("5e29"), bd("1.25e32")),
        ],
        [
            new AttackStat(0, bd(4e28), bd(2e28), bd(4e26), bd(0)),
            new AttackStat(0, bd(3.2e29), bd(1.6e29), bd(1.6e27), bd(0)),
            new AttackStat(0, bd(2e30), bd(1e30), bd(1e28), bd(0)),
            new AttackStat(0, bd(1e31), bd(5e30), bd(5e28), bd(0)),
        ],
        6.5,
        bd(4000),
        [bd("8e15"), bd("1e16")],
        0,
        500000,
        4
    ),
    ROCK_LOBSTER: new Titan(
        11,
        "rockLobster",
        "Rock Lobster",
        [
            new AttackStat(2, bd("4e30"), bd("1.2e31"), bd("3e30"), bd("1e33")),
            new AttackStat(1.9, bd("2e31"), bd("6e31"), bd("1.5e31"), bd("5e33")),
            new AttackStat(1.8, bd("8e31"), bd("2.5e32"), bd("6e31"), bd("2e34")),
            new AttackStat(1.7, bd("2.5e32"), bd("7.5e32"), bd("1.2e32"), bd("6e34")),
        ],
        [
            new AttackStat(0, bd(1.8e31), bd(6e30), bd(1.2e29), bd(0)),
            new AttackStat(0, bd(9e31), bd(3e31), bd(6e29), bd(0)),
            new AttackStat(0, bd(3.6e32), bd(1.2e32), bd(2.5e30), bd(0)),
            new AttackStat(0, bd(1.1e33), bd(3.6e32), bd(7.5e30), bd(0)),
        ],
        7,
        bd(6000),
        [bd("8e16"), bd("1e17")],
        0,
        700000,
        5
    ),
    AMALGAMATE: new Titan(
        12,
        "amalgamate",
        "Amalgamate",
        [
            new AttackStat(2, bd("5e32"), bd("1.5e33"), bd("4e32"), bd("1.25e35")),
            new AttackStat(1.9, bd("2e33"), bd("6e33"), bd("1.6e33"), bd("5e35")),
            new AttackStat(1.8, bd("6e33"), bd("1.8e34"), bd("4.8e33"), bd("1.5e36")),
            new AttackStat(1.7, bd("1.2e34"), bd("3.6e34"), bd("9.6e33"), bd("3e36")),
        ],
        [
            new AttackStat(0, bd(3e33), bd(1e33), bd(2e31), bd(0)),
            new AttackStat(0, bd(1.2e34), bd(4e33), bd(8e31), bd(0)),
            new AttackStat(0, bd(3.6e34), bd(1.2e34), bd(2.4e32), bd(0)),
            new AttackStat(0, bd(7.2e34), bd(2.4e34), bd(4.8e32), bd(0)),
        ],
        7.45,
        bd(8000),
        [bd("6e17"), bd("7.5e17")],
        0,
        1000000,
        6
    ),
    TIPPI: new Titan(
        13,
        "tippiTheTutorialMouse",
        "Tippi The Tutorial Mouse",
        new AttackStat(2, bd("2e34"), bd("4e34"), bd("1e32"), bd("2e36")),
        new AttackStat(0, bd(0), bd(0), bd(0), bd(0)),
        0,
        bd(0),
        [bd(0), bd(0)],
        0,
        0,
        0
    ),
    TRAITOR: new Titan(
        14,
        "theTraitor",
        "The Traitor",
        new AttackStat(1.8, bd("5e34"), bd("1e35"), bd("1e33"), bd("2e37")),
        new AttackStat(0, bd(0), bd(0), bd(0), bd(0)),
        0,
        bd(0),
        [bd(0), bd(0)],
        0,
        0,
        0
    ),
} as const satisfies { [k: string]: Titan };
