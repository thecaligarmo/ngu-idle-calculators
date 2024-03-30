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

export const ItemSets : {[key:string]: ItemSet} = {
    'training': new ItemSet('training', Zones.TRAINING),
    'sewers': new ItemSet('sewers', Zones.SEWERS),
    'forest': new ItemSet('forest', Zones.FOREST),
    'cave': new ItemSet('cave', Zones.CAVE),
    'sky': new ItemSet('sky', Zones.SKY),
    'HSB': new ItemSet('HSB', Zones.HSB),
    'GRB': new ItemSet('GRB', Zones.GRB),
    'number': new ItemSet('number', Zones.GRB),
    'seed': new ItemSet('seed', Zones.GCT),
    'clock': new ItemSet('clock', Zones.CLOCK),
    'twoD': new ItemSet('twoD', Zones.TWO_D),
    'ghost': new ItemSet('ghost', Zones.ANCIENT_BATTLEFIELD),
    'jake': new ItemSet('jake', Zones.JAKE),
    'gaudy': new ItemSet('gaudy', Zones.AVSP),
    'mega': new ItemSet('mega', Zones.MEGA),
    'uug': new ItemSet('uug', Zones.UUG),
    'uugRing': new ItemSet('uugRing', Zones.UUG),
    'beardverse': new ItemSet('beardverse', Zones.BEARDVERSE),
    'waldo': new ItemSet('waldo', Zones.WALDERP),
    'antiWaldo': new ItemSet('antiWaldo', Zones.WALDERP),
    'badlyDrawn': new ItemSet('badlyDrawn', Zones.BDW),
    'stealth': new ItemSet('stealth', Zones.BAE),
    'beast1': new ItemSet('beast1', [Zones.BEAST1, Zones.BEAST2, Zones.BEAST3, Zones.BEAST4]),
    'choco': new ItemSet('choco', Zones.CHOCO),
    'edgy': new ItemSet('edgy', Zones.EVIL),
    'edgyBoots': new ItemSet('edgyBoots', Zones.EVIL),
    'pretty': new ItemSet('pretty', Zones.PINK),
    'nerd': new ItemSet('nerd', [Zones.NERD, Zones.NERD2, Zones.NERD3, Zones.NERD4]),
    'meta': new ItemSet('meta', Zones.META),
    'party': new ItemSet('party', Zones.PARTY),
    'godMother': new ItemSet('godMother', [Zones.MOBSTER, Zones.MOBSTER2, Zones.MOBSTER3, Zones.MOBSTER4]),
    'typo': new ItemSet('typo', Zones.TYPO),
    'fad': new ItemSet('fad', Zones.FAD),
    'jrpg': new ItemSet('jrpg', Zones.JRPG),
    'exile': new ItemSet('exile', [Zones.EXILE, Zones.EXILE2, Zones.EXILE3, Zones.EXILE4]),
    'rad': new ItemSet('rad', Zones.RADLANDS),
    'school': new ItemSet('school', Zones.BACKTOSCHOOL),
    'western': new ItemSet('western', Zones.WESTWORLD),
    'bread': new ItemSet('bread', Zones.BREADVERSE),
    'that70s': new ItemSet('that70s', Zones.SEVENTIES),
    'halloweenies': new ItemSet('halloweenies', Zones.HALLOWEEN),
    'rockLobster': new ItemSet('rockLobster', [Zones.ROCKLOBSTER, Zones.ROCKLOBSTER2, Zones.ROCKLOBSTER3, Zones.ROCKLOBSTER4]),
    'construction': new ItemSet('construction', Zones.CONSTRUCTION),
    'duck': new ItemSet('duck', Zones.DUCK),
    'nether': new ItemSet('nether', Zones.NETHER),
    'amalgamate': new ItemSet('amalgamate', [Zones.AMALGAMATE, Zones.AMALGAMATE2, Zones.AMALGAMATE3, Zones.AMALGAMATE4]),
    'pirate': new ItemSet('pirate', Zones.PIRATE),
} ;
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

