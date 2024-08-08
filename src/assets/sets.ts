import _ from "lodash"

export class ItemSet {
    key: string
    name: string
    items: number[]
    isMaxxed: boolean
    numMaxxed: number
    constructor(key: string, items : number | number[]) {
        this.key = key
        this.name = key
        this.items = (typeof items == 'number') ? [items] : items
        this.isMaxxed = false
        this.numMaxxed = 0
    }
    updateStats(data : any) : void{
        this.isMaxxed = false
        if (!_.isUndefined(data.inventory.itemList[this.key + "Complete"]) && data.inventory.itemList[this.key + "Complete"] === 1) {
            this.isMaxxed = true
        } else {
            var maxxed = true
            for(var item of this.items) {
                if(data.inventory.itemList.itemMaxxed[item] == 0) {
                    maxxed = false
                }
            }
            this.isMaxxed = maxxed
        }

        // Let us know how many are maxxed
        this.numMaxxed = 0
        if(this.isMaxxed) {
            this.numMaxxed = this.items.length
        } else {
            for(var item of this.items) {
                if(data.inventory.itemList.itemMaxxed[item] == 1) {
                    this.numMaxxed += 1
                }
            }
        }
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
    RADLANDS: new ItemSet('rad', [345, 346, 347, 348, 349, 350, 341]),
    BACKTOSCHOOL: new ItemSet('school', [352, 353, 354, 355, 356, 357, 358]),
    WESTWORLD: new ItemSet('western', [359, 360, 361, 362, 363, 364, 365]),
    ITHUNGERS: new ItemSet('itHungers', [373, 374, 375, 376, 377, 378, 379]),
    BREADVERSE: new ItemSet('bread', [392, 393, 394, 395, 396, 397, 398, 399]),
    SEVENTIES: new ItemSet('that70s', [400, 401, 402, 403, 404, 405, 406, 407]),
    HALLOWEEN: new ItemSet('halloweenies', [408, 409, 410, 411, 412, 413, 414, 415]),
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