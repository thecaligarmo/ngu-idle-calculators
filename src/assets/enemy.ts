import { bd, bigdec_max, lessThan } from "@/helpers/numbers"
import bigDecimal from "js-big-decimal"
import _ from "lodash"
import { Wish } from "./wish"

export class AttackStat {
    attackRate: number
    power: bigDecimal
    toughness: bigDecimal
    regen: bigDecimal
    hp: bigDecimal
    constructor(attackRate: number, power: bigDecimal, toughness: bigDecimal, regen: bigDecimal, hp: bigDecimal) {
        this.attackRate = attackRate
        this.power = power
        this.toughness = toughness
        this.regen = regen
        this.hp = hp
    }
    oneHitPower(attackModifier: bigDecimal = bd(1)) : bigDecimal{
        return (this.hp.divide(bd(0.8)).divide(attackModifier)).add(
                    this.toughness.divide(bd(2))
                )
    }

    isWeaker(other : AttackStat) {
        return (this.attackRate < other.attackRate) 
            && (lessThan(this.power, other.power)) 
            && (lessThan(this.toughness, other.toughness))
            && (lessThan(this.regen, other.regen))
            && (lessThan(this.hp, other.hp))
    }
}

export const ENEMY_TYPE : {[k: string]: number} = {
    NORMAL: 0,
    CHARGER: 1, 
    EXPLODER: 2,
    GROWER: 3,
    PARALYZE: 4,
    POISON: 5,
    RAPID: 6,
    POISONPARALYZE: 100,
} as const satisfies {[k: string]: number};

// An enemy is an adventure enemy, not a "Fight Boss" enemy
export class Enemy {
    id: number
    key: string
    name: string
    type: number
    
    attackStat: AttackStat[]

    isBoss: boolean
    isTitan: boolean
    constructor(id: number, key: string, name: string, type: number, attackStat: AttackStat | AttackStat[], isBoss: boolean = false) {
        this.id = id
        this.key = key
        this.name = name
        this.type = type
        
        this.attackStat = (attackStat instanceof AttackStat) ? [attackStat] : attackStat

        this.isBoss = isBoss
        this.isTitan = false
    }
    attackRate(version: number = 0) : number {
        return this.attackStat[version].attackRate
    }
    power(version: number = 0) : bigDecimal {
        return this.attackStat[version].power
    }
    toughness(version: number = 0) : bigDecimal {
        return this.attackStat[version].toughness
    }
    regen(version: number = 0) : bigDecimal {
        return this.attackStat[version].regen
    }
    hp(version: number = 0) : bigDecimal {
        return this.attackStat[version].hp
    }
    oneHitPower(attackModifier: bigDecimal = bd(1), version : number = 0) : bigDecimal{
        return this.attackStat[version].oneHitPower(attackModifier)
    }
}

export class Titan extends Enemy {
    respawnTime: number
    versions: number
    exp: bigDecimal
    gold: bigDecimal[]
    ap: number
    pp: number
    qp: number
    autokill : AttackStat[]
    kills: number[]
    constructor(
        id: number, key: string, name: string,
        attackStat: AttackStat | AttackStat[],
        autokill: AttackStat | AttackStat[],
        respawnTime: number,
        exp: bigDecimal, gold: bigDecimal[], ap: number, pp: number, qp: number
    ) {
        super(id, key, name, ENEMY_TYPE.NORMAL, attackStat)
        this.isTitan = true
        this.versions = _.isArray(attackStat) ? attackStat.length : 1

        // If there's more than one, then exp, pp, qp, ap are 1, 1.1, 1.2, 1.3 multiplied
        this.respawnTime = respawnTime
        this.gold = gold
        this.exp = exp
        this.ap = ap
        this.pp = pp
        this.qp = qp
        this.autokill = (autokill instanceof AttackStat) ? [autokill] : autokill
        this.kills = []
        for(let i =0 ; i < this.versions; i++) {
            this.kills.push(0)
        }
    }
    getFullName(i : number = 0) : string{
        if (this.versions != 4) {
            return this.name
        } 
        return this.name + " v" + (i+1)
        
    }
    getFullKey(i : number = 0) : string{
        if (this.versions != 4) {
            return this.key
        }
        return this.key + "v" + (i+1)
        
    }
    canAutoKill(player : AttackStat, version : number = 0, kills : number = 0) : boolean {
        
        // Exile - 24 kilsl allows AK
        if (this.id == 9) {
            if (this.kills[version] >=24) {
                return true
            }
        }
        // Final two bosses you can't autokill
        else if (this.id > 12) {
            return false
        }
        // IT Hungers, Rock Lobster, Amalgamate - 5 kills allows you to AK
        else if (this.id > 10) {
            if (this.kills[version] >= 5) {
                return true
            }
        }
        // Final version of walderp requires 3 kills
        else if (this.id == 5 && version == 4) {
            return this.autokill[version].isWeaker(player) && this.kills[version] >= 3
        }
        return this.autokill[version].isWeaker(player)
    }
    getAP(apBonus : bigDecimal = bd(1)) : bigDecimal {
        return apBonus.multiply(bd(this.ap)).divide(bd(100))
    }
    getEXP(expBonus : bigDecimal = bd(1), twentyFourHourChallenge : bigDecimal = bd(0), twentyFourHourEvilChallenge : bigDecimal = bd(0), twentyFourHourSadisticChallenge : bigDecimal = bd(0)) : bigDecimal {
        return expBonus.multiply(this.exp).divide(bd(100))
            .multiply(
                bd(1)
                .add(twentyFourHourChallenge.multiply(bd(0.1)))
                .add(twentyFourHourEvilChallenge.multiply(bd(0.04)))
                .add(twentyFourHourSadisticChallenge.multiply(bd(0.02)))
            )
    }
    getPP(ppBonus : bigDecimal = bd(1)) : bigDecimal {
        return ppBonus.multiply(bd(this.pp)).divide(bd(100))
    }
    getQPWishNum(): number{
        switch(this.id) {
            case 6:
                return 73
            case 7:
                return 74
            case 8:
                return 40
            case 9:
                return 41
            case 10:
                return 100
            case 11:
                return 187
            case 12:
                return 204
        }
        return 0
    }
    getQP(wishes : Wish[], qpBonus : bigDecimal = bd(1)) : bigDecimal {
        var qpAmount = bd(0)
        if(this.getQPWishNum() > 0 && !_.isUndefined(wishes[73]) && wishes[this.getQPWishNum()].completed()) {
            qpAmount = bd(this.qp)
        }
        return qpBonus.multiply(qpAmount).divide(bd(100))
    }
    getRespawnTime(rbChallenges : number | bigDecimal) : bigDecimal{
        if(typeof rbChallenges == 'number') {
            rbChallenges = bd(rbChallenges)
        }
        return bigdec_max(bd(1), bd(this.respawnTime).subtract(rbChallenges.multiply(bd(1/4))))
    }
    importKills(bestiary : any) {
        switch(this.id){
            case 1:
                this.kills = [bestiary[302].kills]
                break;
            case 2:
                this.kills = [bestiary[303].kills]
                break;
            case 3:
                this.kills = [bestiary[304].kills]
                break;
            case 4:
                this.kills = [bestiary[305].kills]
                break;
            case 5: // Walderp
                this.kills = [bestiary[306].kills, bestiary[307].kills, bestiary[308].kills, bestiary[309].kills, bestiary[310].kills]
                break;
            case 6: // Beast
                this.kills = [bestiary[312].kills, bestiary[313].kills, bestiary[314].kills, bestiary[315].kills]
                break;
            case 7: // Nerdy
                this.kills = [bestiary[334].kills, bestiary[335].kills, bestiary[336].kills, bestiary[337].kills]
                break;
            case 8: // Godmother
                this.kills = [bestiary[339].kills, bestiary[340].kills, bestiary[341].kills, bestiary[342].kills]
                break;
            case 9: // Exile
                this.kills = [bestiary[344].kills, bestiary[345].kills, bestiary[346].kills, bestiary[347].kills]
                break;
            case 10: // IT Hungers
                this.kills = [bestiary[365].kills, bestiary[366].kills, bestiary[367].kills, bestiary[368].kills]
                break;
            case 11: // Rock Lobster
                this.kills = [bestiary[369].kills, bestiary[370].kills, bestiary[371].kills, bestiary[372].kills]
                break;
            case 12: // Amalgamate
                this.kills = [bestiary[373].kills, bestiary[374].kills, bestiary[375].kills, bestiary[376].kills]
                break;
            case 13: // Tutorial Mouse
                this.kills = [bestiary[377].kills]
                break;
            case 14: // Traitor
                this.kills = [bestiary[378].kills]
                break;
        }
    }
}

export const Enemies :  {[k: string]: Enemy} = {
    // Tutorial
    A_SMALL_PIECE_OF_FLUFF: new Enemy(1, 'aSmallPieceOfFluff', 'A Small Piece Of Fluff', ENEMY_TYPE.NORMAL, new AttackStat(1, bd(7), bd(6), bd(1), bd(40))),
    FLOATING_SEWAGE: new Enemy(2, 'floatingSewage', 'Floating Sewage', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(7), bd(6), bd(1.5), bd(45))),
    A_STICK: new Enemy(3, 'aStick', 'A Stick?', ENEMY_TYPE.NORMAL, new AttackStat(1.5, bd(8), bd(7), bd(0.5), bd(55))),
    A_SMALL_MOUSE: new Enemy(4, 'aSmallMouse', 'A Small Mouse', ENEMY_TYPE.NORMAL, new AttackStat(1, bd(9), bd(9), bd(1), bd(100)), true),
    // Sewers
    SMALL_MOUSE: new Enemy(5, 'smallMouse', 'Small Mouse',ENEMY_TYPE.NORMAL, new AttackStat(1, bd(9), bd(9), bd(1), bd(40))),
    SLIGHTLY_BIGGER_MOUSE: new Enemy(6, 'slightlyBiggerMouse', 'Slightly Bigger Mouse', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(10), bd(10), bd(1.5), bd(50))),
    BIG_RAT: new Enemy(7, 'bigRat', 'Big Rat', ENEMY_TYPE.NORMAL, new AttackStat(1.5, bd(11), bd(11), bd(0.5), bd(70))),
    BROWN_SLIME: new Enemy(8, 'brownSlime', 'Brown Slime', ENEMY_TYPE.POISON, new AttackStat(1, bd(13), bd(13), bd(1), bd(150)), true),
    // Forest
    SKELETON: new Enemy(9, 'Skeleton', 'Skeleton', ENEMY_TYPE.NORMAL, new AttackStat(1.1, bd(26), bd(29), bd(3), bd(400))),
    GOBLIN: new Enemy(10, 'Goblin', 'Goblin', ENEMY_TYPE.RAPID, new AttackStat(0.9, bd(30), bd(29), bd(1), bd(420))),
    ORC: new Enemy(11, 'Orc', 'Orc', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(31), bd(31), bd(2), bd(450))),
    ZOMBIE: new Enemy(12, 'Zombie', 'Zombie', ENEMY_TYPE.NORMAL, new AttackStat(1.5, bd(30), bd(17), bd(8), bd(900))),
    ENT: new Enemy(13, 'Ent', 'Ent', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(28), bd(34), bd(4), bd(515))),
    GIANT: new Enemy(14, 'Giant', 'Giant', ENEMY_TYPE.CHARGER, new AttackStat(1.3, bd(30), bd(35), bd(1), bd(500))),
    RAT_OF_UNUSUAL_SIZE: new Enemy(15, 'ratOfUnusualSize', 'Rat of Unusual Size', ENEMY_TYPE.NORMAL, new AttackStat(1.5, bd(32), bd(32), bd(3), bd(500)), true),
    FAIRY: new Enemy(16, 'Fairy', 'Fairy', ENEMY_TYPE.EXPLODER, new AttackStat(5, bd(33), bd(31), bd(2), bd(200))),
    GORGON: new Enemy(17, 'gorgon', 'Gorgon', ENEMY_TYPE.PARALYZE, new AttackStat(1.25, bd(33), bd(33), bd(2.5), bd(600)), true),
    // Cave
    GORGONZOLA: new Enemy(18, 'Gorgonzola', 'Gorgonzola', ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(114), bd(113), bd(8), bd(1900))),
    BRIE: new Enemy(19, 'Brie', 'Brie', ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(110), bd(117), bd(10), bd(1900))),
    GOUDA: new Enemy(20, 'Gouda', 'Gouda', ENEMY_TYPE.NORMAL, new AttackStat(1.5, bd(107), bd(120), bd(12), bd(1940))),
    BLUE_CHEESE: new Enemy(21, 'blueCheese', 'Blue Cheese', ENEMY_TYPE.POISON, new AttackStat(1.5, bd(114), bd(110), bd(8), bd(2050))),
    PARMESAN: new Enemy(22, 'Parmesan', 'Parmesan', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(117), bd(112), bd(13), bd(1900))),
    LIMBURGER_CHEESE: new Enemy(23, 'limburgerCheese', 'Limburger Cheese', ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(110), bd(110), bd(15), bd(2800)), true),
    MEGA_RAT: new Enemy(24, 'megaRat', 'Mega-Rat', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(120), bd(119), bd(16), bd(2900)), true),
    ROBOT: new Enemy(25, 'Robot', 'Robot', ENEMY_TYPE.CHARGER, new AttackStat(1, bd(114), bd(111), bd(8), bd(2080))),
    A_FLUFFY_CHAIR: new Enemy(26, 'aFluffyChair', 'A Fluffy Chair', ENEMY_TYPE.NORMAL, new AttackStat(1, bd(115), bd(110), bd(10), bd(2100))),
    COUCH: new Enemy(27, 'Couch', 'Couch', ENEMY_TYPE.NORMAL, new AttackStat(1.5, bd(119), bd(114), bd(12), bd(1900))),
    FLOPPY_MATTRESS: new Enemy(28, 'floppyMattress', 'Floppy Mattress', ENEMY_TYPE.POISON, new AttackStat(1.5, bd(111), bd(110), bd(8), bd(1810))),
    EVIL_FRIDGE: new Enemy(29, 'evilFridge', 'Evil Fridge', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(115), bd(112), bd(13), bd(2000))),
    T800: new Enemy(30, 'T-800', 'T-800', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(113), bd(111), bd(13), bd(2130))),
    A_WIDE_SCREEN_TV: new Enemy(31, 'aWideScreenT.V', 'A Wide Screen T.V', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(112), bd(110), bd(13), bd(1900))),
    THE_KITCHEN_SINK: new Enemy(32, 'theKitchenSink', 'The Kitchen Sink', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(113), bd(110), bd(13), bd(1900))),
    A_FIFTH_GIANT_MOLE: new Enemy(33, 'fifthGiantMole', 'A Fifth Giant Mole', ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(120), bd(122), bd(17), bd(3000)), true),
    // Sky
    ICARUS_PROUDBOTTOM: new Enemy(34, 'icarusProudbottom', 'Icarus Proudbottom', ENEMY_TYPE.EXPLODER, new AttackStat(9, bd(340), bd(320), bd(10), bd(4900))),
    KID_ON_A_CLOUD: new Enemy(35, 'kidOnaCloud', 'Kid On a Cloud', ENEMY_TYPE.GROWER, new AttackStat(1.3, bd(300), bd(323), bd(20), bd(4600))),
    NINJA_SAMURAI: new Enemy(36, 'ninjaSamurai', 'Ninja Samurai', ENEMY_TYPE.RAPID, new AttackStat(1.3, bd(350), bd(342), bd(13), bd(4800))),
    GIGANTIC_FLOCK_OF_SEAGULLS: new Enemy(37, 'giganticFlockofSeagulls', 'Gigantic Flock of Seagulls', ENEMY_TYPE.POISON, new AttackStat(1.3, bd(340), bd(317), bd(20), bd(5200))),
    SEVENFORTYSEVEN: new Enemy(38, '747', '747', ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(350), bd(310), bd(20), bd(4500))),
    TWO_HEADED_GUY: new Enemy(39, 'twoHeadedGuy', 'Two Headed Guy', ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(330), bd(310), bd(19), bd(3500))),
    LESTER: new Enemy(40, 'Lester', 'Lester', ENEMY_TYPE.POISON, new AttackStat(1.3, bd(350), bd(350), bd(18), bd(4550))),
    ORIENTAL_DRAGON: new Enemy(41, 'orientalDragon', 'Oriental Dragon', ENEMY_TYPE.CHARGER, new AttackStat(1, bd(322), bd(322), bd(22), bd(4440))),
    A_BIRD_PERSON: new Enemy(42, 'aBirdPerson', 'A Bird Person', ENEMY_TYPE.RAPID, new AttackStat(1.3, bd(340), bd(340), bd(25), bd(9000)), true),
    GIGANTIC_FLOCK_OF_CANADA_GEESE: new Enemy(43, 'giganticFlockofCanadaGeese', 'Gigantic Flock of Canada Geese', ENEMY_TYPE.POISON, new AttackStat(1.3, bd(365), bd(360), bd(23), bd(8700)), true),
    // High Security Base
    HIGH_SECURITY_INSECT_GUARD_1: new Enemy(44, 'highSecurityInsectGuard1', 'High Security Insect Guard 1', ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(420), bd(402), bd(23), bd(6140))),
    HIGH_SECURITY_INSECT_GUARD_2: new Enemy(45, 'highSecurityInsectGuard2', 'High Security Insect Guard 2', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(426), bd(404), bd(20), bd(6600))),
    A_WHOLE_LOTTA_GUARDS: new Enemy(46, 'aWholeLottaGuards', 'A Whole Lotta Guards', ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(410), bd(427), bd(30), bd(6300))),
    THE_EXPERIMENT: new Enemy(47, 'theExperiment', 'The Experiment', ENEMY_TYPE.GROWER, new AttackStat(1.1, bd(416), bd(410), bd(20), bd(6200))),
    GROSS_GREEN_ALIEN: new Enemy(48, 'grossGreenAlien', 'Gross Green Alien', ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(400), bd(410), bd(30), bd(6500))),
    THE_RAT_GOD: new Enemy(49, 'theRatGod', 'The Rat God', ENEMY_TYPE.CHARGER, new AttackStat(1, bd(412), bd(422), bd(32), bd(6440))),
    HOOLOOVOO: new Enemy(50, 'Hooloovoo', 'Hooloovoo', ENEMY_TYPE.RAPID, new AttackStat(1.3, bd(400), bd(403), bd(40), bd(6333))),
    MASSIVE_PLANT_MONSTER: new Enemy(51, 'massivePlantMonster', 'Massive Plant Monster', ENEMY_TYPE.POISON, new AttackStat(1.3, bd(390), bd(451), bd(28), bd(6500))),
    ONE_MEGA_GUARD: new Enemy(52, 'oneMegaGuard', 'One Mega Guard', ENEMY_TYPE.CHARGER, new AttackStat(1.3, bd(435), bd(440), bd(33), bd(11200)), true),
    SPIKY_HAIRED_GUY: new Enemy(53, 'spikyHairedGuy', 'Spiky Haired Guy', ENEMY_TYPE.RAPID, new AttackStat(1.3, bd(440), bd(440), bd(35), bd(12000)), true),
    //Clock Dimension
    MONDAY: new Enemy(54, 'Monday', 'Monday', ENEMY_TYPE.CHARGER, new AttackStat(1.3, bd(1641), bd(1571), bd(147), bd(50000))),
    TUESDAY: new Enemy(55, 'Tuesday', 'Tuesday', ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(1641), bd(1591), bd(149), bd(52000))),
    WEDNESDAY: new Enemy(56, 'Wednesday', 'Wednesday', ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(1611), bd(1611), bd(141), bd(54000))),
    THURSDAY: new Enemy(57, 'Thursday', 'Thursday', ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(1631), bd(1631), bd(143), bd(56000))),
    FRIDAY: new Enemy(58, 'Friday', 'Friday', ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(1651), bd(1651), bd(145), bd(58000))),
    SATURDAY: new Enemy(59, 'Saturday', 'Saturday', ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(1671), bd(1671), bd(147), bd(60000))),
    SUNDAY: new Enemy(60, 'Sunday', 'Sunday', ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(1691), bd(1691), bd(149), bd(662000))),
    SUNDAE: new Enemy(61, 'Sundae*', 'Sundae*', ENEMY_TYPE.NORMAL, new AttackStat(1.3, bd(1700), bd(1720), bd(200), bd(85000)), true),
    // The 2D Universe
    A_FLAT_MOUSE: new Enemy(62, 'aFlatMouse', 'A Flat Mouse', ENEMY_TYPE.CHARGER, new AttackStat(1, bd(3076), bd(3071), bd(307), bd(100000))),
    A_TINY_TRIANGLE: new Enemy(63, 'aTinyTriangle', 'A Tiny Triangle', ENEMY_TYPE.NORMAL, new AttackStat(1.1, bd(3001), bd(3091), bd(309), bd(101000))),
    A_SQUARE_BEAR: new Enemy(64, 'aSquareBear', 'A Square Bear', ENEMY_TYPE.NORMAL, new AttackStat(1.1, bd(3065), bd(3011), bd(301), bd(100000))),
    THE_PENTAGON: new Enemy(65, 'thePentagon', 'The Pentagon', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(3022), bd(3031), bd(303), bd(105000))),
    THE_FIRST_STOP_SIGN: new Enemy(66, 'theFirstStopSign', 'The First Stop Sign', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(3086), bd(3071), bd(307), bd(108000))),
    THE_SECOND_STOP_SIGN: new Enemy(67, 'theSecondStopSign', 'The Second Stop Sign', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(3159), bd(3091), bd(309), bd(100000))),
    KING_CIRCLE: new Enemy(68, 'kingCircle', 'King Circle', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(3041), bd(3050), bd(300), bd(100000)), true),
    A_SUPER_HEXAGON: new Enemy(69, 'aSuperHexagon', 'A Super Hexagon', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(3133), bd(3133), bd(303), bd(133333)), true),
    // Ancient Battlefield
    GHOST_MICE: new Enemy(70, 'ghostMice', 'Ghost Mice', ENEMY_TYPE.CHARGER, new AttackStat(1, bd(6300), bd(7100), bd(720), bd(256000))),
    CRASPER_THE_PISSED_OFF_GHOST: new Enemy(71, 'crasperThePissedOffGhost', 'Crasper The Pissed Off Ghost', ENEMY_TYPE.PARALYZE, new AttackStat(1.1, bd(6200), bd(7100), bd(719), bd(250000))),
    LIVING_ARMOR: new Enemy(72, 'livingArmor', 'Living Armor', ENEMY_TYPE.NORMAL, new AttackStat(1.1, bd(6665), bd(7200), bd(721), bd(250000))),
    LIVING_ARMOUR: new Enemy(73, 'livingArmour', 'Living Armour', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(6480), bd(7400), bd(723), bd(255000))),
    QUOTES: new Enemy(74, '""', '""', ENEMY_TYPE.POISON, new AttackStat(1.2, bd(6500), bd(7500), bd(726), bd(248000))),
    THE_PANTHEON_OF_FALLEN_GODS: new Enemy(75, 'thePantheonofFallenGods', 'The Pantheon of Fallen Gods', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(6550), bd(7550), bd(729), bd(260000))),
    GHOST_DAD: new Enemy(76, 'ghostDad', 'Ghost Dad', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(6600), bd(7600), bd(730), bd(335000)), true),
    MYSTERIOUS_FIGURE: new Enemy(77, 'mysteriousFigure', 'Mysterious Figure', ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(6600), bd(7600), bd(782), bd(332000)), true),
    // A Very Strange Place
    THE_ENTIRE_ALPHABET_UP_A_COCONUT_TREE: new Enemy(78, 'theEntireAlphabetUpaCoconutTree', 'The Entire Alphabet Up a Coconut Tree', ENEMY_TYPE.RAPID, new AttackStat(1, bd(16100), bd(18100), bd(1620), bd(756000))),
    THE_LUMMOX: new Enemy(79, 'theLummox', 'The Lummox', ENEMY_TYPE.PARALYZE, new AttackStat(1.1, bd(16100), bd(18100), bd(1619), bd(750000))),
    A_METAL_SLIME: new Enemy(80, 'aMetalSlime', 'A Metal Slime', ENEMY_TYPE.NORMAL, new AttackStat(1.1, bd(16000), bd(18000), bd(1621), bd(750000))),
    A_GINORMOUS_SWORD: new Enemy(81, 'aGinormousSword', 'A Ginormous Sword', ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(16000), bd(18100), bd(1623), bd(755000))),
    AN_ORDINARY_CHICKEN: new Enemy(82, 'anOrdinaryChicken', 'An Ordinary Chicken', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(16100), bd(18100), bd(1626), bd(748000))),
    SEVENFORTYTHREE_CHICKENS: new Enemy(83, '743 Chickens', '743 Chickens', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(16200), bd(18100), bd(1629), bd(760000))),
    VIC: new Enemy(84, 'Vic', 'Vic', ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(16300), bd(18300), bd(1682), bd(1000000)), true),
    KENNY: new Enemy(85, 'Kenny', 'Kenny', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(16300), bd(18300), bd(1660), bd(950000)), true),
    // Mega Lands
    BROKEN_VCR_MAN: new Enemy(86, 'brokenVCRMan', 'Broken VCR Man', ENEMY_TYPE.RAPID, new AttackStat(1, bd(63500), bd(63500), bd(7620), bd(3600000))),
    KITTEN_IN_A_MECH_WOMAN: new Enemy(87, 'kittenInaMechWoman', 'Kitten In a Mech Woman', ENEMY_TYPE.EXPLODER, new AttackStat(12, bd(63500), bd(63500), bd(7619), bd(3600000))),
    MR_PLOW: new Enemy(88, 'mrPlow', 'Mr Plow', ENEMY_TYPE.NORMAL, new AttackStat(1.1, bd(63700), bd(63700), bd(7621), bd(3650000))),
    ROBUTT: new Enemy(89, 'rOBUTT(NOT A BOSS)', 'ROBUTT (NOT A BOSS)', ENEMY_TYPE.POISON, new AttackStat(1.2, bd(63700), bd(63100), bd(7623), bd(3700000))),
    FORMER_CANADIAN_PM_STEPHEN_HARPER: new Enemy(90, 'formerCanadianPMStephenHarper', 'Former Canadian PM Stephen Harper', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(63100), bd(63100), bd(7626), bd(3750000))),
    A_CYBERDEMON: new Enemy(91, 'aCyberdemon', 'A Cyberdemon', ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(63200), bd(63100), bd(7629), bd(3800000))),
    ROBO_RAT_9000: new Enemy(92, 'roboRat9000', 'Robo Rat 9000', ENEMY_TYPE.PARALYZE, new AttackStat(1.2, bd(63200), bd(63100), bd(7629), bd(3850000))),
    BUTTER_PASSING_ROBOT: new Enemy(93, 'Butter-Passing Robot', 'Butter-Passing Robot', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(64200), bd(63100), bd(7629), bd(3950000))),
    DOCTOR_WAHWEE: new Enemy(94, 'doctorWahwee', 'Doctor Wahwee', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(64300), bd(63300), bd(7660), bd(4200000)), true),
    // The Beardverse
    A_BEARDED_LADY: new Enemy(95, 'aBeardedLady', 'A Bearded Lady', ENEMY_TYPE.RAPID, new AttackStat(1, bd(740000), bd(740000), bd(74000), bd('5e7'))),
    A_BEARDED_MAN: new Enemy(96, 'aBeardedMan', 'A Bearded Man', ENEMY_TYPE.CHARGER, new AttackStat(1, bd(740000), bd(740000), bd(74000), bd('5e7'))),
    COUSIN_ITT: new Enemy(97, 'cousinItt', 'Cousin Itt', ENEMY_TYPE.NORMAL, new AttackStat(1.1, bd(742000), bd(742000), bd(74200), bd('5.1e7'))),
    A_NAKED_MOLERAT: new Enemy(98, 'aNakedMolerat', 'A Naked Molerat', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(744000), bd(744000), bd(74400), bd('5.2e7'))),
    ROB_BOSS: new Enemy(99, 'robBoss', 'Rob Boss', ENEMY_TYPE.EXPLODER, new AttackStat(12, bd(746000), bd(746000), bd(74600), bd('4e7'))),
    GOSSAMER: new Enemy(100, 'Gossamer', 'Gossamer', ENEMY_TYPE.PARALYZE, new AttackStat(1.2, bd(748000), bd(748000), bd(74800), bd('5.3e7'))),
    AN_ORANGE_TOUPEE_WITH_FISTS: new Enemy(101, 'anOrangeToupée With Fists', 'An Orange Toupée With Fists', ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(750000), bd(750000), bd(75000), bd('5.4e7')), true),
    A_CLOGGED_SHOWER_DRAIN: new Enemy(102, 'aCloggedShowerDrain', 'A Clogged Shower Drain', ENEMY_TYPE.POISON, new AttackStat(1.2, bd(750000), bd(750000), bd(75000), bd('5.5e7')), true),
    // Badly Drawn World
    BADLY_DRAWN_DRAGON: new Enemy(103, 'badlyDrawnDragon', 'Badly Drawn Dragon', ENEMY_TYPE.NORMAL, new AttackStat(1, bd('1.1e7'), bd('1.1e7'), bd('1.1e6'), bd('1e9'))),
    REALLY_BAD_SONIC_FANART: new Enemy(104, 'reallyBadSonicFanart', 'Really Bad Sonic Fanart', ENEMY_TYPE.CHARGER, new AttackStat(1, bd('1.12e7'), bd('1.12e7'), bd('1.1e6'), bd('1e9'))),
    BADLY_DRAWN_SCHOOLGIRL: new Enemy(105, 'badlyDrawnSchoolgirl', 'Badly Drawn Schoolgirl', ENEMY_TYPE.POISON, new AttackStat(1.1, bd('1.14e7'), bd('1.14e7'), bd('1.14e6'), bd('1.01e9'))),
    NO_ENEMY: new Enemy(106, 'noEnemy(?)', 'No Enemy(?)', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd('1.16e7'), bd('1.16e7'), bd('1.16e6'), bd('1.02e9'))),
    REALLY_BAD_MLP_FANART: new Enemy(107, 'reallyBadMLPFanart', 'Really Bad MLP Fanart', ENEMY_TYPE.GROWER, new AttackStat(1.1, bd('1.18e7'), bd('1.18e7'), bd('1.18e6'), bd('1.03e9'))),
    LOSS_PNG: new Enemy(108, 'Loss.png', 'Loss.png', ENEMY_TYPE.PARALYZE, new AttackStat(1.2, bd('1.1e7'), bd('1.1e7'), bd('1.1e6'), bd('1.04e9'))),
    EVIL_SPIKY_HAIRED_GUY: new Enemy(109, 'evilSpikyHairedGuy', 'Evil Spiky Haired Guy', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd('1.12e7'), bd('1.12e7'), bd('1.12e6'), bd('1.05e9')), true),
    EVIL_BADLY_DRAWN_KITTY: new Enemy(110, 'evilBadlyDrawnKitty', 'Evil Badly Drawn Kitty', ENEMY_TYPE.PARALYZE, new AttackStat(1.2, bd('1.15e7'), bd('1.15e7'), bd('1.15e6'), bd('1.06e9')), true),
    // Boring-Ass Earth
    THE_EIFFEL_TOWER: new Enemy(111, 'theEiffelTower', 'The Eiffel Tower', ENEMY_TYPE.NORMAL, new AttackStat(1, bd('8.9e7'), bd('8.9e7'), bd('8.9e6'), bd('8.5e9'))),
    A_MUMMY: new Enemy(112, 'aMummy', 'A Mummy', ENEMY_TYPE.CHARGER, new AttackStat(1, bd('8.9e7'), bd('8.9e7'), bd('8.9e6'), bd('8.5e9'))),
    A_DADDY: new Enemy(113, 'aDaddy', 'A Daddy', ENEMY_TYPE.POISON, new AttackStat(1.1, bd('8.92e7'), bd('8.92e7'), bd('8.92e6'), bd('8.52e9'))),
    TWO_BANANAS_IN_PYJAMAS: new Enemy(114, 'twoBananasInPyjamas', 'Two Bananas In Pyjamas', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd('8.94e7'), bd('8.94e7'), bd('8.94e6'), bd('8.54e9'))),
    GIANT_RAISINS_FROM_CALIFORNIA: new Enemy(115, 'giantRaisinsFromCalifornia', 'Giant Raisins From California', ENEMY_TYPE.GROWER, new AttackStat(1.1, bd('8.96e7'), bd('8.96e7'), bd('8.96e6'), bd('8.56e9'))),
    AN_ANNOYING_PENGUIN: new Enemy(116, 'anAnnoyingPenguin', 'An Annoying Penguin', ENEMY_TYPE.PARALYZE, new AttackStat(1.2, bd('8.98e7'), bd('8.98e7'), bd('8.98e6'), bd('8.58e9'))),
    AN_ARMY_OF_ANNOYING_PENGUINS: new Enemy(117, 'anArmyofAnnoyingPenguins', 'An Army of Annoying Penguins', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd('9e7'), bd('9e7'), bd('9e6'), bd('8.6e9'))),
    THE_ELUSIVE_CS: new Enemy(118, 'theElusiveC.S*', 'The Elusive C.S*', ENEMY_TYPE.POISONPARALYZE, new AttackStat(1.2, bd('9e7'), bd('9e7'), bd('9e6'), bd('8.6e9')), true),
    //Chocolate World
    CHOCOLATE_MOUSE: new Enemy(119, 'chocolateMouse', 'Chocolate Mouse', ENEMY_TYPE.NORMAL, new AttackStat(1, bd('3e10'), bd('3e10'), bd('3e9'), bd('3e12'))),
    CHOCOLATE_MIMIC: new Enemy(120, 'chocolateMimic', 'Chocolate Mimic', ENEMY_TYPE.RAPID, new AttackStat(1, bd('3.01e10'), bd('3.01e10'), bd('3.01e9'), bd('3.05e12'))),
    CHOCOLATE_CROWBAR: new Enemy(121, 'chocolateCrowbar', 'Chocolate Crowbar', ENEMY_TYPE.POISON, new AttackStat(1.1, bd('3.01e10'), bd('3.01e10'), bd('3.01e9'), bd('3.05e12'))),
    CHOCO_FREEMAN: new Enemy(122, 'Choco-Freeman', 'Choco-Freeman', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd('3.02e10'), bd('3.02e10'), bd('3.02e9'), bd('3.1e12'))),
    CHOCOLATE_FONDUE: new Enemy(123, 'chocolateFondue', 'Chocolate Fondue', ENEMY_TYPE.EXPLODER, new AttackStat(12, bd('3.02e10'), bd('3.02e10'), bd('3.02e9'), bd('3.1e12'))),
    CHOCOLATE_SLIME: new Enemy(124, 'chocolateSlime', 'Chocolate Slime', ENEMY_TYPE.POISON, new AttackStat(1.2, bd('3.03e10'), bd('3.03e10'), bd('3.03e9'), bd('3.15e12'))),
    DARK_CHOCOLATE: new Enemy(125, 'darkChocolate', 'Dark Chocolate', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd('3.03e10'), bd('3.03e10'), bd('3.03e9'), bd('3.15e12'))),
    CHOCOLATE_SALTY_BALLS: new Enemy(126, 'chocolateSaltyBalls', 'Chocolate Salty Balls', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd('3.03e10'), bd('3.03e10'), bd('3.03e9'), bd('3.15e12'))),
    SCREAMING_CHOCOLATE_FISH: new Enemy(127, 'screamingChocolateFish', 'Screaming Chocolate Fish', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd('3.03e10'), bd('3.03e10'), bd('3.03e9'), bd('3.15e12'))),
    A_MIGHTY_LUMP_OF_POO: new Enemy(128, 'aMightyLumpofPoo', 'A Mighty Lump of Poo', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd('3.03e10'), bd('3.03e10'), bd('3.03e9'), bd('3.15e12'))),
    CHOCO_GIANT: new Enemy(129, 'chocoGiant', 'Choco Giant', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd('3.05e10'), bd('3.05e10'), bd('3.05e9'), bd('3.25e12')), true),
    TYPE_TWO_DIABETES: new Enemy(130, 'type2Diabetes', 'Type 2 Diabetes', ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd('3.05e10'), bd('3.05e10'), bd('3.05e9'), bd('3.25e12')), true),
    MELTED_CHOCOLATE_BLOB: new Enemy(131, 'meltedChocolateBlob', 'Melted Chocolate Blob', ENEMY_TYPE.GROWER, new AttackStat(1.2, bd('3.05e10'), bd('3.05e10'), bd('3.05e9'), bd('3.25e12')), true),
    // The Evilverse
    EVIL_MOUSE: new Enemy(132, 'evilMouse', 'Evil Mouse', ENEMY_TYPE.NORMAL, new AttackStat(1, bd(5.00e12), bd(5.00e12), bd(5.00e11), bd(5.00e14))),
    EVIL_GOBLIN: new Enemy(133, 'evilGoblin', 'Evil Goblin', ENEMY_TYPE.RAPID, new AttackStat(1, bd(5.01e12), bd(5.01e12), bd(5.01e11), bd(5.05e14))),
    EVIL_GORGON: new Enemy(134, 'evilGorgon', 'Evil Gorgon', ENEMY_TYPE.POISON, new AttackStat(1.1, bd(5.01e12), bd(5.01e12), bd(5.01e11), bd(5.05e14))),
    EVIL_MOLE: new Enemy(135, 'evilMole', 'Evil Mole', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(5.02e12), bd(5.02e12), bd(5.02e11), bd(5.10e14))),
    EVIL_ICARUS_PROUDBOTTOM: new Enemy(136, 'evilIcarusProudbottom', 'Evil Icarus Proudbottom', ENEMY_TYPE.EXPLODER, new AttackStat(12, bd(5.02e12), bd(5.02e12), bd(5.02e11), bd(5.10e14))),
    EVIL_BROWN_SLIME: new Enemy(137, 'evilBrownSlime', 'Evil Brown Slime', ENEMY_TYPE.POISON, new AttackStat(1.2, bd(5.03e12), bd(5.03e12), bd(5.03e11), bd(5.15e14))),
    FLOCK_OF_CANADA_GEESE: new Enemy(138, 'flockofCanadaGeese', 'Flock of Canada Geese', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(5.03e12), bd(5.03e12), bd(5.03e11), bd(5.15e14))),
    EVIL_SPIKY_HAIRED_GUY_BOSS: new Enemy(139, 'eVILSPIKYHAIREDGUYBOSS', 'EVIL SPIKY HAIRED GUY (BOSS)', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(5.05e12), bd(5.05e12), bd(5.05e11), bd(5.25e14)), true),
    EVIL_CHAD: new Enemy(140, 'eVILCHAD', 'EVIL CHAD', ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(5.05e12), bd(5.05e12), bd(5.05e11), bd(5.25e14)), true),
    // Pretty Pink Princess Land
    THE_HUMKEYCORN: new Enemy(141, 'theHumkeycorn', 'The Humkeycorn', ENEMY_TYPE.NORMAL, new AttackStat(1, bd(2.50e13), bd(2.50e13), bd(2.50e12), bd(2.50e15))),
    POOKY_THE_BUNNY: new Enemy(142, 'pookyTheBunny', 'Pooky The Bunny', ENEMY_TYPE.RAPID, new AttackStat(1, bd(2.51e13), bd(2.51e13), bd(2.51e12), bd(2.55e15))),
    THE_MORE_YOU_KNOW_STAR: new Enemy(143, 'theMoreYouKnowStar', '\'The More You Know\' Star', ENEMY_TYPE.CHARGER, new AttackStat(1.1, bd(2.51e13), bd(2.51e13), bd(2.51e12), bd(2.55e15))),
    A_FABULOUS_LEPRECHAUN: new Enemy(144, 'aFabulousLeprechaun', 'A Fabulous Leprechaun', ENEMY_TYPE.GROWER, new AttackStat(1.2, bd(2.52e13), bd(2.52e13), bd(2.52e12), bd(2.60e15))),
    AN_ORDINARY_POSSUM: new Enemy(145, 'anOrdinaryPossum', 'An Ordinary Possum', ENEMY_TYPE.POISON, new AttackStat(1.2, bd(2.52e13), bd(2.52e13), bd(2.52e12), bd(2.60e15))),
    BARRY_THE_BEER_FAIRY: new Enemy(146, 'barrytheBeerFairy', 'Barry, the Beer Fairy', ENEMY_TYPE.EXPLODER, new AttackStat(12, bd(2.53e13), bd(2.53e13), bd(2.53e12), bd(2.65e15))),
    AN_ASSHOLE_SWAN: new Enemy(147, 'aNASSHOLESWAN', 'AN ASSHOLE SWAN', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(2.53e13), bd(2.53e13), bd(2.53e12), bd(2.65e15)), true),
    TINKLES: new Enemy(148, 'TINKLES', 'TINKLES', ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(2.55e13), bd(2.55e13), bd(2.55e12), bd(2.70e15)), true),
    // Meta Land
    A_HALF_EATEN_COOKIE: new Enemy(149, 'aHalf-eaten Cookie', 'A Half-eaten Cookie', ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1.00e16), bd(1.00e16), bd(1.00e15), bd(1.00e18))),
    A_RUSTY_CRANK: new Enemy(150, 'aRustyCrank', 'A Rusty Crank', ENEMY_TYPE.POISON, new AttackStat(1, bd(1.02e16), bd(1.02e16), bd(1.02e15), bd(1.05e18))),
    AHH_A_SHARK: new Enemy(151, 'Ahh!! A Shark!!', 'Ahh!! A Shark!!', ENEMY_TYPE.CHARGER, new AttackStat(1.1, bd(1.04e16), bd(1.04e16), bd(1.04e15), bd(1.10e18))),
    THE_NUMBER_18X10308: new Enemy(152, 'thenumber1.8 x 10^308', 'The number 1.8 x 10^308', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(1.06e16), bd(1.06e16), bd(1.06e15), bd(1.15e18))),
    A_WEIRD_GOBLIN_DEMON_THING: new Enemy(153, 'aWeirdGoblin-Demon-Thing', 'A Weird Goblin-Demon-Thing', ENEMY_TYPE.RAPID, new AttackStat(1.2, bd(1.08e16), bd(1.08e16), bd(1.08e15), bd(1.20e18))),
    A_CUTE_KITTEN: new Enemy(154, 'aCuteKitten', 'A Cute Kitten', ENEMY_TYPE.EXPLODER, new AttackStat(12, bd(1.10e16), bd(1.10e16), bd(1.10e15), bd(1.20e18))),
    THE_DRAGON_OF_WISDOM: new Enemy(155, 'tHEDRAGONOFWISDOM', 'THE DRAGON OF WISDOM', ENEMY_TYPE.GROWER, new AttackStat(1.2, bd(1.12e16), bd(1.12e16), bd(1.12e15), bd(1.25e18)), true),
    THE_DRAGON_OF_DILDO: new Enemy(156, 'tHEDRAGONOFDILDO', 'THE DRAGON OF DILDO', ENEMY_TYPE.GROWER, new AttackStat(1.2, bd(1.15e16), bd(1.15e16), bd(1.15e15), bd(1.25e18)), true),
    // Interdimensional Party
    THE_BOUNCER_PART_2: new Enemy(157, 'theBouncerPart2', 'The Bouncer, Part 2', ENEMY_TYPE.NORMAL, new AttackStat(1, bd(1.00e17), bd(1.00e17), bd(1.00e16), bd(1.10e19))),
    JAMBI: new Enemy(158, 'Jambi', 'Jambi', ENEMY_TYPE.RAPID, new AttackStat(1, bd(1.02e17), bd(1.02e17), bd(1.02e16), bd(1.10e19))),
    GOD_OF_THUNDER: new Enemy(159, 'godofThunder', 'God of Thunder', ENEMY_TYPE.CHARGER, new AttackStat(1.1, bd(1.04e17), bd(1.04e17), bd(1.04e16), bd(1.15e19))),
    THE_ENTIRE_STATE_OF_SOUTH_DAKOTA: new Enemy(160, 'theEntireStateofSouthDakota', 'The Entire State of South Dakota', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(1.06e17), bd(1.06e17), bd(1.06e16), bd(1.15e19))),
    A_HUGE_STACK_OF_POGS: new Enemy(161, 'aHugeStackofPogs', 'A Huge Stack of Pogs', ENEMY_TYPE.POISON, new AttackStat(1.2, bd(1.08e17), bd(1.08e17), bd(1.08e16), bd(1.20e19))),
    THREE_GUYS_SHOUTING_OUT_ED: new Enemy(162, 'threeGuysShoutingoutEd', 'Three Guys Shouting out \'Ed\'', ENEMY_TYPE.EXPLODER, new AttackStat(12, bd(1.10e17), bd(1.10e17), bd(1.10e16), bd(1.20e19))),
    MR_CHOW: new Enemy(163, 'mRCHOW', '\'MR CHOW\'', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(1.12e17), bd(1.12e17), bd(1.12e16), bd(1.25e19)), true),
    THE_LIFE_OF_THE_PARTY: new Enemy(164, 'tHELIFEOFTHEPARTY', 'THE LIFE OF THE PARTY', ENEMY_TYPE.GROWER, new AttackStat(1.2, bd(1.15e17), bd(1.15e17), bd(1.15e16), bd(1.25e19)), true),
    // Typo Zonw
    PERMANENET: new Enemy(165, 'Permanenet', 'Permanenet', ENEMY_TYPE.NORMAL, new AttackStat(1, bd(8.00e19), bd(8.00e19), bd(8.00e18), bd(8.10e21))),
    COUDL: new Enemy(166, 'Coudl', 'Coudl', ENEMY_TYPE.RAPID, new AttackStat(1, bd(8.02e19), bd(8.02e19), bd(8.02e18), bd(8.10e21))),
    LIEK: new Enemy(167, 'Liek', 'Liek', ENEMY_TYPE.CHARGER, new AttackStat(1.1, bd(8.04e19), bd(8.04e19), bd(8.04e18), bd(8.15e21))),
    BRIAN: new Enemy(168, 'Brian', 'Brian', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(8.06e19), bd(8.06e19), bd(8.06e18), bd(8.15e21))),
    BLODO: new Enemy(169, 'Blodo', 'Blodo', ENEMY_TYPE.POISON, new AttackStat(1.2, bd(8.08e19), bd(8.08e19), bd(8.08e18), bd(8.20e21))),
    ODIGN: new Enemy(170, 'Odign', 'Odign', ENEMY_TYPE.RAPID, new AttackStat(0.8, bd(8.10e19), bd(8.10e19), bd(8.10e18), bd(8.20e21))),
    HORUS: new Enemy(171, 'HORUS', 'HORUS', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(8.12e19), bd(8.12e19), bd(8.12e18), bd(8.25e21)), true),
    ELDER_TYPO_GOD_ELXU: new Enemy(172, 'eLDERTYPOGODELXU', 'ELDER TYPO GOD, ELXU', ENEMY_TYPE.GROWER, new AttackStat(1.2, bd(8.15e19), bd(8.15e19), bd(8.1e18), bd(8.25e21)), true),
    // The Fad-lands
    A_VERY_SAD_SLINKY: new Enemy(173, 'aVerySadSlinky:c', 'A Very Sad Slinky :c', ENEMY_TYPE.NORMAL, new AttackStat(1, bd(4.00e20), bd(4.00e20), bd(4.00e19), bd(4.10e22))),
    GIANT_METAL_SPINNING_TOP: new Enemy(174, 'giantMetalSpinningTop', 'Giant Metal Spinning Top', ENEMY_TYPE.RAPID, new AttackStat(1, bd(4.02e20), bd(4.02e20), bd(4.02e19), bd(4.10e22))),
    A_STACK_OF_KRAZY_BONEZ: new Enemy(175, 'aStackofKrazyBonez', 'A Stack of Krazy Bonez', ENEMY_TYPE.CHARGER, new AttackStat(1.1, bd(4.04e20), bd(4.04e20), bd(4.04e19), bd(4.15e22))),
    RARE_FOIL_POKEYMAN_CARD: new Enemy(176, 'rareFoilPokeymanCard', 'Rare Foil Pokeyman Card', ENEMY_TYPE.NORMAL, new AttackStat(1.2, bd(4.06e20), bd(4.06e20), bd(4.06e19), bd(4.15e22))),
    A_BUSTED_GAMEBOY: new Enemy(177, 'aBustedGameboy', 'A Busted Gameboy', ENEMY_TYPE.POISON, new AttackStat(1.2, bd(4.08e20), bd(4.08e20), bd(4.08e19), bd(4.20e22))),
    A_WORTHLESS_BEANY_BABY: new Enemy(178, 'aWorthlessBean-y Baby', 'A Worthless Bean-y Baby', ENEMY_TYPE.RAPID, new AttackStat(0.8, bd(4.10e20), bd(4.10e20), bd(4.10e19), bd(4.20e22))),
    THE_SLAMMER: new Enemy(179, 'tHESLAMMER', 'THE SLAMMER', ENEMY_TYPE.CHARGER, new AttackStat(1.2, bd(4.12e20), bd(4.12e20), bd(4.12e19), bd(4.25e22)), true),
    DEMONIC_FLURBIE: new Enemy(180, 'dEMONICFLURBIE', 'DEMONIC FLURBIE', ENEMY_TYPE.GROWER, new AttackStat(1.2, bd(4.15e20), bd(4.15e20), bd(4.15e19), bd(4.25e22)), true),

    
// First set-up data in the following way:
// name, id, type, attackRate, power, toughness, regen, hp(, isBoss)
// Then Regex
//^ +([^,]*), (\d+), ([^,]*), ([^,]*), ([^,]*), ([^,]*), ([^,]*), ([^,]*)(.*) *$
//    \U$1: new Enemy($2, '$1', '$1', ENEMY_TYPE.\U$3, new AttackStat($4, bd($5), bd($6), bd($7), bd($8))$9),

// Then clean up the array keys
//^    ([A-Z][A-Z_]*) 
//    $1_

// Then clean up they keys
//\((\d*), '([a-zA-Z]*) 
//($1, '\l$2


    // // JRPGVille
    // Sentient Pile of Belts
    // Mimic 'Mimic Chest' Chest
    // A Suplexing Train
    // The Annoying Fan
    // The Infinity+1 Sword
    // The Damage Cap
    // FINAL BOSS
    // TRUE FINAL BOSS

    // // The Rad-Lands
    // Small Bart
    // Pair of Shades Wearing Shades
    // Lame Security Guard
    // A Giant Vat of Plutonium-238
    // Mutant Zombie Marie Curie
    // Nuclear Power Pants
    // A Wandering Gamma Ray
    // A Massive Sealed Vault
    // A.C SKATER
    // RADIOACTIVE MACGUFFIN

    // // Back To School
    // A Different Greasy Nerd
    // Sentient Jock Strap
    // The Flying Spinelli Monster
    // A Really Strict Nun
    // The Nun's Ruler
    // The Mystery Meat
    // WILLY
    // BELDING

    // // The West World
    // A Stickman Cowboy
    // A Giant Cannon
    // The Entire Bar
    // A Pathetic Tumbleweed
    // A Single Cow
    // Herd of Pissed Off Cows
    // THE OUTLAW
    // THE SHERIFF

    // // The Breadverse
    // Grandma's 'Brownies'
    // Angry Raw Cookie Dough
    // A Bearded Breaded Braid
    // Butcher & Candlestick Maker
    // The Ex-Greatest Thing
    // Moldy Slice Of Bread
    // THE YEAST BEAST
    // A DAY-OLD BAGUETTE

    // // That 70's Zone
    // A Groovy Saxophone
    // A Giant Pair Of Roller Skates
    // A 70's Porn Mustasche
    // A Disgusting Bong
    // A Hippie with a Hip
    // Holy Crap It's Another Shark
    // THE WORST VINYL RECORD
    // THE 'FRO

    // // The Halloweenies
    // Ultra Instinct Stoner
    // A Skeleton Inside a Body
    // A Badly Made Sexy Florida Costume
    // An Unnecessary Sequel
    // An Elevator Full of Blood
    // Candy Corn
    // TEXAS CHAINSAW MASCARA
    // JIGSAW

    // // Construction Zone
    // A Construction Slob
    // Quicksand Cement
    // A Cement Truck
    // A Bulldozer
    // 3 Guys Carrying a Beam
    // A Piano-Safe
    // 7 GUYS TAKING A BREAK
    // THE CRANE

    // //DUCK DUCK ZONE
    // A Duck
    // Another Duck
    // ...Goose!
    // Scientifically Accurate Duck
    // A MotherDucker
    // Totally a Duck
    // THE DOG
    // A SINGLE GRAPE

    // // The Nether Regions
    // A Patch of Tulips
    // A Random Lady
    // A Lost Canadian Moose :c
    // A 5 Bladed Windmill
    // A Jerk Cyclist
    // A Dutch Oven
    // THE GRAND DUTCH DUCHY
    // DAAN VAN DER VAN JAANSEN

    // // The Aethereal Sea
    // A Seagull
    // Cosmic Jellyfish
    // Aether Eel
    // You.
    // A Pi-rat
    // A Bunch of Old Newspapers
    // Another You.
    // A Paddlefish
    // AAn Anglerfish
    // A Bunch of Cannons
    // A Pile of Ropes
    // Ladders!
    // And Snakes!!!
    // The First Pirate
    // The Second Pirate
    // The Third Pirate
    // The Fourth Pirate
    // THE BUCKET
    // TAR BLOB MONSTER
    // RAMSHACKLE SEA INN
    // THE CAPTAIN
} as const satisfies {[k: string]: Enemy}


export const Titans : {[k: string]: Titan} = {
    // Titans
    NONE: new Titan(
        0, 'none', 'No Titan',
        new AttackStat(0, bd(0), bd(0), bd(0), bd(0)),
        new AttackStat(0, bd(0), bd(0), bd(0), bd(0)),
        1,
        bd(0), [bd(0), bd(0)], 0, 0, 0
    ),
    GORDON_RAMSEY: new Titan(
        1, 'gordonRamsayBolton', 'Gordon Ramsay Bolton',
        new AttackStat(2, bd(666), bd(666), bd(66), bd(300000)),
        new AttackStat(0, bd(3000), bd(2500), bd(0), bd(0)),
        1,
        bd(35), [bd(1000000), bd(1250000)], 10, 0, 0
    ),
    GRAND_TREE: new Titan(
        2, 'grandCorruptedTree', 'Grand Corrupted Tree',
        new AttackStat(2, bd(2000), bd(2000), bd(200), bd(750000)),
        new AttackStat(0, bd(9000), bd(7000), bd(0), bd(0)),
        1,
        bd(60), [bd(1600000), bd(2000000)], 15, 0, 0
    ),
    JAKE: new Titan(
        3, 'jakeFromAccounting', 'Jake From Accounting',
        new AttackStat(2, bd(8000), bd(8000), bd(1000), bd(3000000)),
        new AttackStat(0, bd(25000), bd(15000), bd(0), bd(0)),
        2,
        bd(200), [bd('1.2e6'), bd('1.5e6')], 50, 0, 0
    ),
    UUG: new Titan(
        4, 'uUGTheUnmentionable', 'UGG, The Unmentionable',
        new AttackStat(2, bd(200000), bd(200000), bd(30000), bd('1e8')),
        new AttackStat(0, bd(800000), bd(400000), bd(14000), bd(0)),
        2,
        bd(300), [bd('2e6'), bd('2.5e6')], 60, 0, 0
    ),
    WALDERP: new Titan(
        5, 'walderp', 'Walderp',
        [
            new AttackStat(3, bd('5e5'), bd('3e5'), bd(45000), bd('1.5e8')),
            new AttackStat(3, bd('9e5'), bd('6e5'), bd(90000), bd('3e8')),
            new AttackStat(3, bd('1.5e6'), bd('1e6'), bd(150000), bd('6e8')),
            new AttackStat(3, bd('2.2e6'), bd('1.5e6'), bd(230000), bd('8e8')),
            new AttackStat(3, bd('3e6'), bd('2e6'), bd(300000), bd('1e9')),
        ],
        [
            new AttackStat(0, bd(13e6), bd(7e6), bd(150000), bd(0)),
            new AttackStat(0, bd(13e6), bd(7e6), bd(150000), bd(0)),
            new AttackStat(0, bd(13e6), bd(7e6), bd(150000), bd(0)),
            new AttackStat(0, bd(13e6), bd(7e6), bd(150000), bd(0)),
            new AttackStat(0, bd(13e6), bd(7e6), bd(150000), bd(0)),
        ],
        3,
        bd(500), [bd('4e6'), bd('5e6')], 70, 0, 0
    ),
    BEAST: new Titan(
        6, 'theBeast', 'The Beast',
        [
            new AttackStat(2.1, bd('5e8'), bd('5e8'), bd('5e7'), bd('5e10')),
            new AttackStat(2, bd('5e9'), bd('5e9'), bd('5e8'), bd('5e11')),
            new AttackStat(1.9, bd('5e10'), bd('5e10'), bd('5e9'), bd('5e12')),
            new AttackStat(1.8, bd('5e11'), bd('5e11'), bd('5e10'), bd('5e13')),
        ],
        [
            new AttackStat(0, bd(2.5e9), bd(1.6e9), bd(2.5e7), bd(0)),
            new AttackStat(0, bd(2.5e10), bd(1.6e10), bd(2.5e8), bd(0)),
            new AttackStat(0, bd(2.5e11), bd(1.6e11), bd(2.5e9), bd(0)),
            new AttackStat(0, bd(2.5e12), bd(1.6e12), bd(2.5e10), bd(0)),
        ],
        3.5,
        bd(750), [bd('2e7'), bd('2.5e7')], 0, 250000, 1
    ),
    NERD: new Titan(
        7, 'greasyNerd', 'Greasy Nerd',
        [
            new AttackStat(2.1, bd('1e14'), bd('1e14'), bd('1e13'), bd('1e16')),
            new AttackStat(2, bd('2e15'), bd('2e15'), bd('2e14'), bd('2e17')),
            new AttackStat(1.9, bd('4e16'), bd('4e16'), bd('4e15'), bd('4e18')),
            new AttackStat(1.8, bd('1e18'), bd('1e18'), bd('1e17'), bd('1e20')),
        ],
        [
            new AttackStat(0, bd(5e14), bd(2.5e14), bd(5e12), bd(0)),
            new AttackStat(0, bd(1e16), bd(5e15), bd(1e14), bd(0)),
            new AttackStat(0, bd(2e17), bd(1e17), bd(2e15), bd(0)),
            new AttackStat(0, bd(5e18), bd(2.5e18), bd(5e16), bd(0)),
        ],
        4.5,
        bd(1100), [bd('4e10'), bd('5e10')], 0, 250000, 1
    ),
    GODMOTHER: new Titan(
        8, 'theGodmother', 'The Godmother',
        [
            new AttackStat(2.1, bd('1e18'), bd('1e18'), bd('1e17'), bd('1e20')),
            new AttackStat(2, bd('2e19'), bd('2e19'), bd('2e18'), bd('2e21')),
            new AttackStat(1.9, bd('4e20'), bd('4e20'), bd('4e19'), bd('4e22')),
            new AttackStat(1.8, bd('1e22'), bd('1e22'), bd('1e21'), bd('1e24')),
        ],
        [
            new AttackStat(0, bd(5e18), bd(2.5e18), bd(5e16), bd(0)),
            new AttackStat(0, bd(1e20), bd(5e19), bd(1e17), bd(0)),
            new AttackStat(0, bd(2e21), bd(1e21), bd(2e19), bd(0)),
            new AttackStat(0, bd(5e22), bd(2.5e22), bd(5e20), bd(0)),
        ],
        5,
        bd(1500), [bd('4e11'), bd('5e11')], 0, 300000, 2
    ),
    EXILE: new Titan(
        9, 'theExile', 'The Exile',
        [
            new AttackStat(2.1, bd('2e22'), bd('2e22'), bd('2e21'), bd('1.5e25')),
            new AttackStat(2, bd('4e23'), bd('4e23'), bd('2e22'), bd('2e25')),
            new AttackStat(1.9, bd('8e24'), bd('8e24'), bd('4e23'), bd('4e26')),
            new AttackStat(1.8, bd('1.5e26'), bd('1.5e26'), bd('1e24'), bd('1.5e28')),
        ],
        [
            new AttackStat(0, bd(1e23), bd(5e22), bd(1e21), bd(0)),
            new AttackStat(0, bd(2e24), bd(1e24), bd(2e22), bd(0)),
            new AttackStat(0, bd(4e25), bd(2e25), bd(4e23), bd(0)),
            new AttackStat(0, bd(7.5e26), bd(3.7e26), bd(7.5e24), bd(0)),
        ],
        5.5,
        bd(2500), [bd('4e12'), bd('5e12')], 0, 400000, 3
    ),
    IT_HUNGERS: new Titan(
        10, 'itHungers', 'IT HUNGERS',
        [
            new AttackStat(2.1, bd('1e28'), bd('2e28'), bd('2e27'), bd('5e29')),
            new AttackStat(1.9, bd('8e28'), bd('1.6e29'), bd('1.6e28'), bd('4e30')),
            new AttackStat(1.7, bd('5e29'), bd('1e30'), bd('1e29'), bd('2.5e31')),
            new AttackStat(1.5, bd('2.5e30'), bd('5e30'), bd('5e29'), bd('1.25e32')),
        ],
        [
            new AttackStat(0, bd(4e28), bd(2e28), bd(4e26), bd(0)),
            new AttackStat(0, bd(3.2e29), bd(1.6e29), bd(1.6e27), bd(0)),
            new AttackStat(0, bd(2e30), bd(1e30), bd(1e28), bd(0)),
            new AttackStat(0, bd(1e31), bd(5e30), bd(5e28), bd(0)),
        ],
        6.5,
        bd(4000), [bd('8e15'), bd('1e16')], 0, 500000, 4
    ),
    ROCK_LOBSTER: new Titan(
        11, 'rockLobster', 'Rock Lobster',
        [
            new AttackStat(2, bd('4e30'), bd('1.2e31'), bd('3e30'), bd('1e33')),
            new AttackStat(1.9, bd('6e31'), bd('2e31'), bd('1.5e31'), bd('5e33')),
            new AttackStat(1.8, bd('8e31'), bd('2.5e32'), bd('6e31'), bd('2e34')),
            new AttackStat(1.7, bd('2.5e32'), bd('7.5e32'), bd('1.2e32'), bd('6e34')),
        ],
        [
            new AttackStat(0, bd(1.8e31), bd(6e30), bd(1.2e29), bd(0)),
            new AttackStat(0, bd(9e31), bd(3e31), bd(6e29), bd(0)),
            new AttackStat(0, bd(3.6e32), bd(1.2e32), bd(2.5e30), bd(0)),
            new AttackStat(0, bd(1.1e33), bd(3.6e32), bd(7.5e30), bd(0)),
        ],
        7,
        bd(6000), [bd('8e16'), bd('1e17')], 0, 700000, 5
    ),
    AMALGAMATE: new Titan(
        12,  'amalgamate', 'Amalgamate',
        [
            new AttackStat(2, bd('5e32'), bd('1.5e33'), bd('4e32'), bd('1.25e35')),
            new AttackStat(1.9, bd('2e33'), bd('6e33'), bd('1.6e33'), bd('5e35')),
            new AttackStat(1.8, bd('6e33'), bd('1.8e34'), bd('4.8e33'), bd('1.5e36')),
            new AttackStat(1.7, bd('1.2e34'), bd('3.6e34'), bd('9.6e33'), bd('3e36')),
        ],
        [
            new AttackStat(0, bd(3e33), bd(1e33), bd(2e31), bd(0)),
            new AttackStat(0, bd(1.2e34), bd(4e33), bd(8e31), bd(0)),
            new AttackStat(0, bd(3.6e34), bd(1.2e34), bd(2.4e32), bd(0)),
            new AttackStat(0, bd(7.2e34), bd(2.4e34), bd(4.8e32), bd(0)),
        ],
        7.45,
        bd(8000), [bd('6e17'), bd('7.5e17')], 0, 1000000, 6
    ),
    TIPPI: new Titan(
        13, 'tippiTheTutorialMouse', 'Tippi The Tutorial Mouse',
        new AttackStat(2, bd('2e34'), bd('4e34'), bd('1e32'), bd('2e36')),
        new AttackStat(0, bd(0), bd(0), bd(0), bd(0)),
        0,
        bd(0), [bd(0), bd(0)], 0, 0, 0
    ),
    TRAITOR: new Titan(
        14, 'theTraitor', 'The Traitor',
        new AttackStat(1.8, bd('5e34'), bd('1e35'), bd('1e33'), bd('2e37')),
        new AttackStat(0, bd(0), bd(0), bd(0), bd(0)),
        0,
        bd(0), [bd(0), bd(0)], 0, 0, 0
    ),
} as const satisfies {[k: string]: Titan}