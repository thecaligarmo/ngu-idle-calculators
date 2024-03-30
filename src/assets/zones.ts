export default class Zone {
    id: number
    key: string
    name: string
    level: number
    constructor(id: number, key: string, name: string, level: number = 0) {
        this.id = id
        this.key = key
        this.name = name
        this.level = level
    }
}

export const Zones = {
    MISC: new Zone(-4, 'misc', 'Miscellaneous'),
    HEART: new Zone(-3, 'hearts', 'My Hearts <3'),
    FOREST_PENDANT: new Zone(-2, 'pendants', 'Forest Pendant'),
    LOOTY: new Zone(-1, 'looty', 'Looty'),
    ITOPOD: new Zone(0, 'itopod', 'ITOPOD'),
    SAFE: new Zone(1, 'safe', 'Safe Zone'),
    TRAINING: new Zone(2, 'training', 'Tutorial Zone'),
    SEWERS: new Zone(3, 'sewers', 'Sewers'),
    FOREST: new Zone(4, 'forest', 'Forest'),
    CAVE: new Zone(5, 'cave', 'Cave of Many Things'),
    SKY: new Zone(6, 'sky', 'The Sky'),
    HSB: new Zone(7, 'HSB', 'High Security Base'),
    GRB: new Zone(8, 'GRB', 'Gordon Ramsay Bolton'),
    CLOCK: new Zone(9, 'clock', 'Clock Dimension'),
    GCT: new Zone(10, 'GCT', 'Grand Corrupted Tree'),
    TWO_D: new Zone(11, 'twoD', 'The 2D Universe'),
    ANCIENT_BATTLEFIELD: new Zone(12, 'ghost', 'Ancient Battlefield'),
    JAKE: new Zone(13, 'jake', 'Jake from Accounting'),
    AVSP: new Zone(14, 'avsp', 'A Very Strange Place'),
    MEGA: new Zone(15, 'mega', 'Mega Lands'),
    UUG: new Zone(16, 'uug', 'UUG, The Unmentionable'),
    BEARDVERSE: new Zone(17, 'beardverse', 'The Beardverse'),
    WALDERP: new Zone(18, 'walderp', 'Walderp'),
    BDW: new Zone(19, 'badlyDrawn', 'Badly Drawn World'),
    BAE: new Zone(20, 'stealth', 'Boring-Ass Earth'),
    BEAST1: new Zone(21, 'beast1', 'The Beast', 1),
    BEAST2: new Zone(21, 'beast2', 'The Beast', 2),
    BEAST3: new Zone(21, 'beast3', 'The Beast', 3),
    BEAST4: new Zone(21, 'beast4', 'The Beast', 4),
    CHOCO: new Zone(22, 'choco', 'Chocolate World'),
    EVIL: new Zone(23, 'edgy', 'The Evilverse'),
    PINK: new Zone(24, 'pretty', 'Pretty Pink Princess Land'),
    NERD: new Zone(25, 'nerd1', 'Greasy Nerd', 1),
    NERD2: new Zone(25, 'nerd2', 'Greasy Nerd', 2),
    NERD3: new Zone(25, 'nerd3', 'Greasy Nerd', 3),
    NERD4: new Zone(25, 'nerd4', 'Greasy Nerd', 4),
    META: new Zone(26, 'meta', 'Meta Land'),
    PARTY: new Zone(27, 'party', 'Interdimensional Party'),
    MOBSTER: new Zone(28, 'godMother1', 'The Godmother', 1),
    MOBSTER2: new Zone(28, 'godMother2', 'The Godmother', 2),
    MOBSTER3: new Zone(28, 'godMother3', 'The Godmother', 3),
    MOBSTER4: new Zone(28, 'godMother4', 'The Godmother', 4),
    TYPO: new Zone(29, 'typo', 'Typo Zonw'),
    FAD: new Zone(30, 'fad', 'The Fad-lands'),
    JRPG: new Zone(31, 'jrpg', 'JRPGVille'),
    EXILE: new Zone(32, 'exile1', 'The Exile', 1),
    EXILE2: new Zone(32, 'exile2', 'The Exile', 2),
    EXILE3: new Zone(32, 'exile3', 'The Exile', 3),
    EXILE4: new Zone(32, 'exile4', 'The Exile', 4),
    RADLANDS: new Zone(33, 'rad', 'The Rad Lands'),
    BACKTOSCHOOL: new Zone(34, 'school', 'Back To School'),
    WESTWORLD: new Zone(35, 'western', 'The West World'),
    ITHUNGERS: new Zone(36, 'hunger1', 'It Hungers', 1),
    ITHUNGERS2: new Zone(36, 'hunger2', 'It Hungers', 2),
    ITHUNGERS3: new Zone(36, 'hugner3', 'It Hungers', 3),
    ITHUNGERS4: new Zone(36, 'hunger4', 'It Hungers', 4),
    BREADVERSE: new Zone(37, 'bread', 'The Breadverse'),
    SEVENTIES: new Zone(38, 'that70s', 'That 70\'s Zone'),
    HALLOWEEN: new Zone(39, 'halloweenies', 'The Halloweenies'),
    ROCKLOBSTER: new Zone(40, 'rockLobster1', 'Rock Lobster', 1),
    ROCKLOBSTER2: new Zone(40, 'rockLobster2', 'Rock Lobster', 2),
    ROCKLOBSTER3: new Zone(40, 'rockLobster3', 'Rock Lobster', 3),
    ROCKLOBSTER4: new Zone(40, 'rockLobster4', 'Rock Lobster', 4),
    CONSTRUCTION: new Zone(41, 'construction', 'Construction Zone'),
    DUCK: new Zone(42, 'duck', 'DUCK DUCK ZONE'),
    NETHER: new Zone(43, 'nether', 'The Nether Regions'),
    AMALGAMATE: new Zone(44, 'amalgamate1', 'Amalgamate', 1),
    AMALGAMATE2: new Zone(44, 'amalgamate2', 'Amalgamate', 2),
    AMALGAMATE3: new Zone(44, 'amalgamate3', 'Amalgamate', 3),
    AMALGAMATE4: new Zone(44, 'amalgamate4', 'Amalgamate', 4),
    PIRATE: new Zone(45, 'pirate', 'The Aethereal Sea Part 1'),
}