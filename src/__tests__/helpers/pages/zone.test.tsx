import Player from "@/assets/player";
import { Zones } from "@/assets/zones";
import { bd } from '@/helpers/numbers';
import { getOptimalBoostZone, getOptimalExpZone, getZoneInfo } from '@/helpers/pages/zone';
import bigDecimal from "js-big-decimal";

type tempType = 
    'boostRecyclying' | 'redLiquidBonus' | 'sadisticNoEquipmentChallenges' | 'spoopySetBonus' | 'totalDropChance' | 'totalPower' | 'totalRespawnTime'

const cases : [string, string, {[k:string]:number}, {[k:string]:number}, {
    boostRecyclying: bigDecimal,
    redLiquidBonus : boolean,
    sadisticNoEquipmentChallenges: bigDecimal,
    spoopySetBonus: boolean,
    totalDropChance: bigDecimal,
    totalPower: bigDecimal,
    totalRespawnTime: bigDecimal
}][]= [
    [
        Zones.AVSP.key, Zones.ITOPOD.key, {
            [Zones.ITOPOD.key] : 1.83750,
            [Zones.ITOPOD.key + "NO"] : 1.68125,
            [Zones.SEWERS.key] : 0.75,
            [Zones.CAVE.key] : 2.46309,
            [Zones.HSB.key] : 1.37475,
            [Zones.TWO_D.key] : 4.46484,
            [Zones.AVSP.key] : 14.25146,
            [Zones.BEARDVERSE.key] : 0.42551,
            [Zones.BAE.key] : 0.0005,
            [Zones.EVIL.key] : 0,
            [Zones.META.key] : 0,
            [Zones.TYPO.key] : 0,
            [Zones.JRPG.key] : 0,
            [Zones.BACKTOSCHOOL.key] : 0,
            [Zones.BREADVERSE.key] : 0,
            [Zones.HALLOWEEN.key] : 0,
            [Zones.DUCK.key] : 0,
            [Zones.PIRATE.key] : 0,
        },{
            [Zones.ITOPOD.key]: 0.22222,
            [Zones.ITOPOD.key + "NO"]: 0.18084,
            [Zones.SEWERS.key] : 0.025,
            [Zones.CAVE.key] : 0.02813,
            [Zones.HSB.key] : 0.048,
            [Zones.TWO_D.key] : 0.1125,
            [Zones.AVSP.key] : 0.17625,
            [Zones.BEARDVERSE.key] : 0.00832,
            [Zones.BAE.key] : 0.00001,
            [Zones.EVIL.key] : 0,
            [Zones.META.key] : 0,
            [Zones.TYPO.key] : 0,
            [Zones.JRPG.key] : 0,
            [Zones.BACKTOSCHOOL.key] : 0,
            [Zones.BREADVERSE.key] : 0,
            [Zones.HALLOWEEN.key] : 0,
            [Zones.DUCK.key] : 0,
            [Zones.PIRATE.key] : 0,
        },{
            boostRecyclying: bd(50),
            redLiquidBonus : true,
            sadisticNoEquipmentChallenges: bd(0),
            spoopySetBonus: true,
            totalDropChance: bd(705),
            totalPower: bd(1451766),
            totalRespawnTime: bd(2.55),
        }
    ],
    [
        Zones.TWO_D.key, Zones.ITOPOD.key + "NO", {
            [Zones.ITOPOD.key] : 0.35,
            [Zones.ITOPOD.key + "NO"] : 0.56717,
            [Zones.SEWERS.key] : 0.17438,
            [Zones.CAVE.key] : 0.54153,
            [Zones.HSB.key] : 0.30225,
            [Zones.TWO_D.key] : 1.43536,
            [Zones.AVSP.key] : 0.30050,
            [Zones.BEARDVERSE.key] : 0.00153,
            [Zones.BAE.key] : 0,
            [Zones.EVIL.key] : 0,
            [Zones.META.key] : 0,
            [Zones.TYPO.key] : 0,
            [Zones.JRPG.key] : 0,
            [Zones.BACKTOSCHOOL.key] : 0,
            [Zones.BREADVERSE.key] : 0,
            [Zones.HALLOWEEN.key] : 0,
            [Zones.DUCK.key] : 0,
            [Zones.PIRATE.key] : 0,
        },{
            [Zones.ITOPOD.key]: 0.05263,
            [Zones.ITOPOD.key + "NO"]: 0.07007,
            [Zones.SEWERS.key] : 0.025,
            [Zones.CAVE.key] : 0.02813,
            [Zones.HSB.key] : 0.048,
            [Zones.TWO_D.key] : 0.02583,
            [Zones.AVSP.key] : 0.00372,
            [Zones.BEARDVERSE.key] : 0.00003,
            [Zones.BAE.key] : 0,
            [Zones.EVIL.key] : 0,
            [Zones.META.key] : 0,
            [Zones.TYPO.key] : 0,
            [Zones.JRPG.key] : 0,
            [Zones.BACKTOSCHOOL.key] : 0,
            [Zones.BREADVERSE.key] : 0,
            [Zones.HALLOWEEN.key] : 0,
            [Zones.DUCK.key] : 0,
            [Zones.PIRATE.key] : 0,
        },{
            boostRecyclying: bd(50),
            redLiquidBonus : false,
            sadisticNoEquipmentChallenges: bd(0),
            spoopySetBonus: false,
            totalDropChance: bd(155),
            totalPower: bd(23253),
            totalRespawnTime: bd(3.8),
        }
    ],
    [
        Zones.ITOPOD.key, Zones.ITOPOD.key + "NO", {
            [Zones.ITOPOD.key] : 184.30371,
            [Zones.ITOPOD.key + "NO"] : 160.34014,
            [Zones.SEWERS.key] : 0.75,
            [Zones.CAVE.key] : 2.84375,
            [Zones.HSB.key] : 7,
            [Zones.TWO_D.key] : 4.46484,
            [Zones.AVSP.key] : 16.84570,
            [Zones.BEARDVERSE.key] : 36.54785,
            [Zones.BAE.key] : 139.80252,
            [Zones.EVIL.key] : 12.40476,
            [Zones.META.key] : 0.01637,
            [Zones.TYPO.key] : 0,
            [Zones.JRPG.key] : 0,
            [Zones.BACKTOSCHOOL.key] : 0,
            [Zones.BREADVERSE.key] : 0,
            [Zones.HALLOWEEN.key] : 0,
            [Zones.DUCK.key] : 0,
            [Zones.PIRATE.key] : 0,
        },{
            [Zones.ITOPOD.key]: 3.17241,
            [Zones.ITOPOD.key + "NO"]: 3.47991,
            [Zones.SEWERS.key] : 0.025,
            [Zones.CAVE.key] : 0.02813,
            [Zones.HSB.key] : 0.048,
            [Zones.TWO_D.key] : 0.11250,
            [Zones.AVSP.key] : 0.25,
            [Zones.BEARDVERSE.key] : 0.5,
            [Zones.BAE.key] : 0.66667,
            [Zones.EVIL.key] : 0.09859,
            [Zones.META.key] : 0.00001,
            [Zones.TYPO.key] : 0,
            [Zones.JRPG.key] : 0,
            [Zones.BACKTOSCHOOL.key] : 0,
            [Zones.BREADVERSE.key] : 0,
            [Zones.HALLOWEEN.key] : 0,
            [Zones.DUCK.key] : 0,
            [Zones.PIRATE.key] : 0,
        },{
            boostRecyclying: bd(50),
            redLiquidBonus : true,
            sadisticNoEquipmentChallenges: bd(0),
            spoopySetBonus: true,
            totalDropChance: bd(1629355651.98),
            totalPower: bd(162130091657634),
            totalRespawnTime: bd(1.44),
        }
    ],
]

describe("Zone page", () => {
    test.each(cases)(
        "Zone Page - Case %#",
        (caseBoostZone, caseExpZone, caseBoosts, caseExp, data) => {
            const player = new Player(false, true)
            let k : tempType
            for(k in data) {
                player.set(k, data[k])
            }

            const zoneInfo =  getZoneInfo(player);
            const boostZone = getOptimalBoostZone(zoneInfo);
            const expZone = getOptimalExpZone(zoneInfo);
            
            // We should get the correct zones for exp and boost
            expect(boostZone.key).toBe(caseBoostZone)
            expect(expZone.key).toBe(caseExpZone)

            // Check some arbitrary numbers
            for (const zone of zoneInfo) {
                for(var key in caseBoosts) {
                    if (zone.key == key) {
                        expect(Number(zone['boost'].getValue())).toBeCloseTo(caseBoosts[key], 4)
                    }
                }
                for(var key in caseExp) {
                    if (zone.key == key) {
                        expect(Number(zone['exp'].getValue())).toBeCloseTo(caseExp[key], 4)
                    }
                }
            }
        }
    )
})