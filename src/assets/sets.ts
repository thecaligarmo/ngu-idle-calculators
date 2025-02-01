import bigDecimal from "js-big-decimal"
import _ from "lodash"
import { bd, bigdec_equals, bigdec_min, factorial, lessThan, Polynomial, toNum } from "@/helpers/numbers"
import { Item, ITEMS } from "./items"
import Zone from "./zones"

export class ItemSet {
    key: string
    name: string
    items: Item[]
    isMaxxed: boolean
    numMaxxed: number
    dropChance : [number, number, number, number]
    lvlDropped : number
    constructor(key: string, items : number | number[], dropChance :  [number, number, number, number] | [] = [], lvlDropped : number = 0) {
        this.key = key
        this.name = key
        this.items = (typeof items == 'number') 
                        ? [_.cloneDeep(ITEMS[items])] 
                        : items.map(function(id) {
                            return _.cloneDeep(ITEMS[id])
                        })
        this.isMaxxed = false
        this.numMaxxed = 0
        this.dropChance = (dropChance.length == 0) ? [0,0,0,0] : dropChance // [normal base, normal max, ]
        this.lvlDropped = lvlDropped
    }

    updateStats(data : any) : void{
        this.isMaxxed = false
        if (!_.isUndefined(data.inventory.itemList[this.key + "Complete"]) && data.inventory.itemList[this.key + "Complete"] === 1) {
            this.isMaxxed = true
        } else {
            var maxxed = true
            for(let item of this.items) {
                if(data.inventory.itemList.itemMaxxed[item.id] == 0) {
                    maxxed = false
                }
            }
            this.isMaxxed = maxxed
        }

        // Let us know how many are maxxed
        this.numMaxxed = 0
        if(this.isMaxxed) {
            this.numMaxxed = this.items.length
            for(let item in this.items) {
                this.items[item].level = 100
            }
        } else {
            for(var item of this.items) {
                if(data.inventory.itemList.itemMaxxed[item.id] == 1) {
                    this.numMaxxed += 1
                }
                var inv = data.inventory.inventory.filter((it : any) => it.id == item.id)
                if (inv.length > 0) {
                    for(let it of inv) {
                        item.importStats(it)
                    }
                }
            }
        }
    }

    getDropChance(totalDropChance : bigDecimal) : bigDecimal {
        if(this.isZoneSet()) {
            let zone = this.getZones()[0]
            let regDC = bigdec_min(zone.baseChance(totalDropChance).multiply(bd(this.dropChance[0])), bd(this.dropChance[1])).divide(bd(100))
            let bossDC = bigdec_min(zone.baseChance(totalDropChance).multiply(bd(this.dropChance[2])), bd(this.dropChance[3])).divide(bd(100))
            let bossChance = zone.bossChance()
            return regDC.multiply(bd(1).subtract(bossChance)).add(
                bossDC.multiply(bossChance)
            )
        }
        return bd(0)
    }

    killsToCompletion(totalDropChance : bigDecimal) : bigDecimal | string {
        if(this.isMaxxed) {
            return bd(0)
        }
        if(this.isZoneSet()) {
            // Based on: https://math.stackexchange.com/a/3475218/86555
            let p = this.getDropChance(totalDropChance)
            let pfix = 1
            while (lessThan(p, bd(1))) {
                p = p.multiply(bd(10))
                pfix = pfix * 10
            }
            p = p.divide(bd(10 * this.items.length))
            pfix = pfix / 10

            let P = Array(this.items.length).fill(p)
            let Q = bd(1).subtract(P.reduce((prev, cur) => {return prev.add(cur)}, bd(0)))
            let v = this.items.map((it) => Math.ceil((100 - it.level) / (this.lvlDropped + 1)))
            
            // For quick test and sigfig
            let x = Math.max(...v)
            let y = 1 / toNum(p)
            let sigFig = Math.max(20, Math.ceil( (1.25 * x) + (x * Math.log(y) / 2)))

        
            let quickTest = x * y
            if(quickTest > 400000) {
                return 'infinity'
            }

            // console.log('here', p.getValue(), x, y, sigFig)
            // console.log(P, Q, v, x, y, x * y, sigFig)
        
            // [i, Poly] -> e^(ix) - (Poly)
            let F : [bigDecimal, Polynomial][][] = P.map((pi : bigDecimal, i) => {
                let coeffs : bigDecimal[] = []
                for(let j = 0; j < v[i]; j++) {
                    coeffs.push(bd(-(toNum(pi)**j)).divide(bd(factorial(j)), sigFig))
                }
                return [[bd(pi), new Polynomial([1])], [bd(0), new Polynomial(coeffs)]]
            })
        
            let start : [bigDecimal, Polynomial][] = [[bd(Q), new Polynomial([1])]]
            
            let G = F.reduce((prev : [bigDecimal, Polynomial][], cur) => {
                let retStuff : {[key:string]: [bigDecimal, Polynomial]} = {}
                for(let p of prev) {
                    if(!cur[0][1].isZero()){
                        let newP : [bigDecimal, Polynomial] = [p[0].add(cur[0][0]), p[1].multiply(cur[0][1])]
                        let e = newP[0].getValue()
                        if(Object.keys(retStuff).includes(e)) {
                            retStuff[e] = [newP[0], retStuff[e][1].add(newP[1])]
                        } else {
                            retStuff[e] = newP
                        }
                    }
                    if(!cur[1][1].isZero()){
                        let newP : [bigDecimal, Polynomial] = [p[0].add(cur[1][0]), p[1].multiply(cur[1][1])]
                        let e = newP[0].getValue()
                        if(Object.keys(retStuff).includes(e)) {
                            retStuff[e] = [newP[0], retStuff[e][1].add(newP[1])]
                        } else {
                            retStuff[e] = newP
                        }
                    }
                }
        
                return Object.values(retStuff)
            }, start)

            
            // Make factorial calculation faster
            let cf = bd(1)
            let facts = [bd(cf)]
            let maxCoeff = Math.max(...G.map((g: [bigDecimal, Polynomial]) => {return g[1].coefficients.length}))
            for(let i = 1; i <= maxCoeff; i++) {
                cf = cf.multiply(bd(i))
                facts.push(cf)
            }

        
            let integral = G.reduce((prev, cur) => {
                if(bigdec_equals(cur[0], bd(1))) {
                    return prev
                }

                // Make power calculation faster
                let cf = bd(1)
                let powers = [cf]
                let maxCoeff = cur[1].length()
                let mult = bd(1 / (toNum(cur[0]) - 1))
                for(let i = 1; i <= maxCoeff+1; i++) {
                    cf = cf.multiply(mult)
                    powers.push(cf)
                }

                return prev.add(cur[1].coefficients.reduce((prevIn, curIn, indIn) => {
                    
                    if(bigdec_equals(cur[0], bd(1))) {
                        return prevIn
                    }
                    return prevIn.add(
                        curIn.multiply(bd((-1)**indIn))
                            .multiply(facts[indIn])
                            .multiply(
                                powers[indIn + 1]
                            )
                    )
                }, bd(0)))
            }, bd(0))
        
            return integral.multiply(bd(pfix)).ceil()
        }
        return 'Not Implemented'
    }

    secsToCompletion(totalDropChance : bigDecimal, totalPower: bigDecimal, idleAttackModifier : bigDecimal, redLiquidBonus : boolean = false, totalRespawnTime : bigDecimal = bd(4)) : bigDecimal | string {
        if(this.isZoneSet()) {
            var killsToCompletion = this.killsToCompletion(totalDropChance)
            if(_.isString(killsToCompletion)) {
                return killsToCompletion
            }
            var killsPerHour = this.getZones()[0].getKillsPerHour(totalPower, idleAttackModifier, redLiquidBonus, totalRespawnTime)
            console.log('info', killsPerHour, killsToCompletion)
            return killsToCompletion.multiply(bd(60 * 60)).divide(killsPerHour)
        }
        return 'Not Implemented'
    }

    isZoneSet() : boolean {
        // Must have more than one item
        // And be only in one zone
        let z = this.getZones()
        return this.items.length > 4 && z.length == 1
    }

    getZones(): Zone[] {
        var zones :Zone[] = []
        var seen : number[][] = []
        for(let it of this.items) {
            for(let z of it.zone) {
                let s = [z.id, z.level]
                // Can't do a direct `includes` because [1,2] !== [1,2]
                if(!seen.some((e) => e[0] == s[0] && e[1] == s[1])){
                    zones.push(z)
                    seen.push(s)
                }
            }
        }
        return zones
    }
}


// ItemSets are the sets that can be maxxed
export const ItemSets : {[k: string]: ItemSet} = {
    // Zone Sets
    SEWERS: new ItemSet('sewers', [40, 41, 42, 43, 44, 45, 46]),
    FOREST: new ItemSet('forest', [47, 48, 49, 50, 51, 52, 53]),
    CAVE: new ItemSet('cave', [54, 55, 56, 57, 58, 59, 60, 61]),
    TRAINING: new ItemSet('training', [75, 62, 63, 64, 65]),
    HSB: new ItemSet('HSB', [68, 69, 70, 71, 72, 73, 74]),
    GRB: new ItemSet('GRB', [78, 79, 80, 81, 82, 83, 84]),
    CLOCK: new ItemSet('clock', [85, 86, 87, 88, 89, 90, 91]),
    TWO_D: new ItemSet('twoD', [95, 96, 97, 98, 99, 100, 101]),
    SPOOPY: new ItemSet('ghost', [103, 104, 105, 106, 107, 108, 109]),
    JAKE: new ItemSet('jake', [111, 112, 113, 114, 115, 116, 117]),
    GAUDY: new ItemSet('gaudy', [122, 123, 124, 125, 126]),    
    MEGA: new ItemSet('mega', [130, 131, 132, 133, 134]),
    UUG_RINGS: new ItemSet('uugRing', [136, 137, 138, 139, 140]),
    BEARDVERSE: new ItemSet('beardverse', [143, 144, 145, 146, 147]),
    WANDERER: new ItemSet('waldo', [150, 151, 152, 153]),
    WANDERER2: new ItemSet('antiWaldo', [155, 156, 157, 158]),
    BADLY_DRAWN: new ItemSet('badlyDrawn', [164, 165, 166, 167, 168]),
    STEALTH: new ItemSet('stealth', [173, 174, 175, 176, 177]),
    SLIMY: new ItemSet('beast1', [184, 185, 186, 187, 188]),
    EDGY: new ItemSet('edgy', [213, 214, 215, 217, 218]),
    EDGYBOOTS: new ItemSet('edgyBoots', [216, 219]),
    CHOCO: new ItemSet('choco', [221, 222, 223, 224, 225]),
    PRETTY: new ItemSet('pretty', [231, 232, 233, 234, 235, 236]),
    NERD: new ItemSet('nerd', [237, 238, 239, 240, 241]),
    META: new ItemSet('meta', [251, 252, 253, 254, 255, 256, 257]),
    PARTY: new ItemSet('party', [258, 259, 260, 261, 262, 263, 264]),
    MOBSTER: new ItemSet('godMother', [265, 266, 267, 268, 269, 270, 271]),
    TYPO: new ItemSet('typo', [301, 302, 303, 304, 305, 306, 307]),
    FAD: new ItemSet('fad', [308, 309, 310, 311, 312, 313, 314]),
    JRPG: new ItemSet('jrpg', [315, 316, 317, 318, 319, 320, 321]),
    EXILE: new ItemSet('exile', [322, 323, 324, 325, 326]),
    RADLANDS: new ItemSet('rad', [345, 346, 347, 348, 349, 350, 351]),
    BACKTOSCHOOL: new ItemSet('school', [352, 353, 354, 355, 356, 357, 358]),
    WESTWORLD: new ItemSet('western', [359, 360, 361, 362, 363, 364, 365]),
    ITHUNGERS: new ItemSet('itHungers', [373, 374, 375, 376, 377, 378, 379]),
    BREADVERSE: new ItemSet('bread', [392, 393, 394, 395, 396, 397, 398, 399]),
    SEVENTIES: new ItemSet('that70s', [400, 401, 402, 403, 404, 405, 406, 407]),
    HALLOWEEN: new ItemSet('halloweenies', [408, 409, 410, 411, 412, 413, 414, 415], [0.0000016, 4, 0.000005, 15], 1),
    ROCKLOBSTER: new ItemSet('rockLobster', [416, 417, 418, 419, 420, 421, 422, 423]),
    CONSTRUCTION: new ItemSet('construction', [453, 454, 455, 456, 457, 458, 459, 460]),
    NETHER: new ItemSet('nether', [461, 462, 463, 464, 465, 466, 467, 468]),
    AMALGAMATE: new ItemSet('amalgamate', [469, 470, 471, 472, 473, 474, 475, 476]),
    DUCK: new ItemSet('duck', [496, 497, 498, 499, 450, 451, 452, 453]),
    PIRATE: new ItemSet('pirate', [507, 508, 509, 510, 511, 512, 513, 514]),

    // Hearts
    RED_HEART: new ItemSet('redHeart', 119), // Todo: Figure out Red Heart in save file
    YELLOW_HEART: new ItemSet('yellowHeart', 129), // Todo: Figure out Yellow Heart in save file
    BROWN_HEART: new ItemSet('brownHeart', 162),
    GREEN_HEART: new ItemSet('greenHeart', 171),
    BLUE_HEART: new ItemSet('blueHeart', 196),
    PURPLE_HEART: new ItemSet('purpleHeart', 212),
    ORANGE_HEART: new ItemSet('orangeHeart', 293),
    GREY_HEART: new ItemSet('greyHeart', 297),
    PINK_HEART: new ItemSet('pinkHeart', 344),
    RAINBOW_HEART: new ItemSet('rainbowHeart', 390),

    // Items
    WANDOOS: new ItemSet('wandoos', 66),
    TUTORIAL_CUBE: new ItemSet('tutorialCube', 77),
    SEED: new ItemSet('seed', 92),
    MYSTERIOUS_RED_LIQUID: new ItemSet('redLiquid', 93),
    NUMBER: new ItemSet('number', 102),
    FLUBBER: new ItemSet('flubber', 121),
    UUG: new ItemSet('uug', 141), // Armpit
    WANDOOS_XL: new ItemSet('xl', 163),
    PISSED_OFF_KEY: new ItemSet('itopodKey', 172),
    MYSTERIOUS_PURPLE_LIQUID: new ItemSet('purpleLiquid', 191),
    A_SCRAP_OF_PAPER: new ItemSet('jakeNote', 197),
    SIGIL: new ItemSet('sigil', 292),
    EVIDENCE: new ItemSet('evidence', 294),
    SEVERED_HEAD: new ItemSet('severedHead', 343),
    BEATING_HEART: new ItemSet('beatingHeart', 391),

    // Extra Item Sets
    NORMAL_ACC: new ItemSet('normalBonusAcc', [432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444]),
    EVIL_ACC: new ItemSet('evilBonusAcc', [445, 446, 447, 448, 449, 450, 451, 452]),
    QUESTS: new ItemSet('quests', [278, 279, 280, 281, 282, 283, 284, 285, 286, 287]),
    BOOSTS: new ItemSet('boosts', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39])

} as const satisfies {[k: string]: ItemSet};