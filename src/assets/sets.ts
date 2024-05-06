import Zone, { Zones } from "./zones"

export class ItemSet {
    key: string
    name: string
    zone: Zone[]
    isMaxxed: boolean
    constructor(key: string, zone: Zone | Zone[]) {
        this.key = key
        this.name = key
        this.zone = (zone instanceof Zone) ? [zone] : zone
        this.isMaxxed = false
    }
    updateStats(data : any) : void{
        this.isMaxxed = false
        if (data.inventory.itemList[this.key + "Complete"] === 1) {
            this.isMaxxed = true
        }
    }
}


// TODO - Each ItemSet should have a list of items. Items have zones, so we just need a list of items


// ItemSets are the sets that can be maxxed
export const ItemSets : {[k: string]: ItemSet} = {
    TRAINING: new ItemSet('training', Zones.TUTORIAL),
    SEWERS: new ItemSet('sewers', Zones.SEWERS),
    FOREST: new ItemSet('forest', Zones.FOREST),
    CAVE: new ItemSet('cave', Zones.CAVE),
    SKY: new ItemSet('sky', Zones.SKY),
    HSB: new ItemSet('HSB', Zones.HSB),
    GRB: new ItemSet('GRB', Zones.GRB),
    NUMBER: new ItemSet('number', Zones.GRB),
    SEED: new ItemSet('seed', Zones.GCT),
    CLOCK: new ItemSet('clock', Zones.CLOCK),
    TWO_D: new ItemSet('twoD', Zones.TWO_D),
    SPOOPY: new ItemSet('ghost', Zones.ANCIENT_BATTLEFIELD),
    JAKE: new ItemSet('jake', Zones.JAKE),
    GAUDY: new ItemSet('gaudy', Zones.AVSP),
    MEGA: new ItemSet('mega', Zones.MEGA),
    UUG: new ItemSet('uug', Zones.UUG),
    UUG_RINGS: new ItemSet('uugRing', Zones.UUG),
    BEARDVERSE: new ItemSet('beardverse', Zones.BEARDVERSE),
    WANDERER: new ItemSet('waldo', Zones.WALDERP),
    WANDERER2: new ItemSet('antiWaldo', Zones.WALDERP),
    BADLY_DRAWN: new ItemSet('badlyDrawn', Zones.BDW),
    STEALTH: new ItemSet('stealth', Zones.BAE),
    SLIMY: new ItemSet('beast1', [Zones.BEAST1, Zones.BEAST2, Zones.BEAST3, Zones.BEAST4]),
    CHOCO: new ItemSet('choco', Zones.CHOCO),
    EDGY: new ItemSet('edgy', Zones.EVIL),
    EDGYBOOTS: new ItemSet('edgyBoots', Zones.EVIL),
    PINK: new ItemSet('pretty', Zones.PINK),
    NERD: new ItemSet('nerd', [Zones.NERD, Zones.NERD2, Zones.NERD3, Zones.NERD4]),
    META: new ItemSet('meta', Zones.META),
    PARTY: new ItemSet('party', Zones.PARTY),
    MOBSTER: new ItemSet('godMother', [Zones.MOBSTER, Zones.MOBSTER2, Zones.MOBSTER3, Zones.MOBSTER4]),
    TYPO: new ItemSet('typo', Zones.TYPO),
    FAD: new ItemSet('fad', Zones.FAD),
    JRPG: new ItemSet('jrpg', Zones.JRPG),
    EXILE: new ItemSet('exile', [Zones.EXILE, Zones.EXILE2, Zones.EXILE3, Zones.EXILE4]),
    RADLANDS: new ItemSet('rad', Zones.RADLANDS),
    BACKTOSCHOOL: new ItemSet('school', Zones.BACKTOSCHOOL),
    WESTWORLD: new ItemSet('western', Zones.WESTWORLD),
    ITHUNGERS: new ItemSet('itHungers', [Zones.ITHUNGERS, Zones.ITHUNGERS2, Zones.ITHUNGERS3, Zones.ITHUNGERS4]),
    BREADVERSE: new ItemSet('bread', Zones.BREADVERSE),
    SEVENTIES: new ItemSet('that70s', Zones.SEVENTIES),
    HALLOWEEN: new ItemSet('halloweenies', Zones.HALLOWEEN),
    ROCKLOBSTER: new ItemSet('rockLobster', [Zones.ROCKLOBSTER, Zones.ROCKLOBSTER2, Zones.ROCKLOBSTER3, Zones.ROCKLOBSTER4]),
    CONSTRUCTION: new ItemSet('construction', Zones.CONSTRUCTION),
    DUCK: new ItemSet('duck', Zones.DUCK),
    NETHER: new ItemSet('nether', Zones.NETHER),
    AMALGAMATE: new ItemSet('amalgamate', [Zones.AMALGAMATE, Zones.AMALGAMATE2, Zones.AMALGAMATE3, Zones.AMALGAMATE4]),
    PIRATE: new ItemSet('pirate', Zones.PIRATE),
    // Without Zones
    FOREST_PENDANT: new ItemSet('forestPendant', []),
    LOOTY: new ItemSet('looty', []),
    HEART: new ItemSet('haert', []),
    MISC: new ItemSet('misc', []),
} as const satisfies {[k: string]: ItemSet};
// space
// wandoos
// tutorialCube
// flubber
// redLiquid
// xl
// itopodKey
// purpleLiquid
// jakeNote
// sigil
// evidence
// pinkHeart
// severedHead
// beatingHeart
// normalBonusAcc
// evilBonusAcc

// rainbowHeart
// brownHeart
// purpleHeart
// orangeHeart
// greyHeart
// greenHeart
// blueHeart


// The following are sets that don't appear in the set list in the save file
// redHeart

