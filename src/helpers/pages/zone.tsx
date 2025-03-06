import Player from "@/assets/player";
import { ItemSet } from "@/assets/sets";
import Zone, { Zones } from "@/assets/zones";
import bigDecimal from "js-big-decimal";
import { getIdleAttackModifier } from "../calculators";
import { bd, greaterThan, isZero } from "../numbers";

type zoneType = {
    key: string;
    name: string;
    boost: bigDecimal;
    exp: bigDecimal;
    hitsToKill: number;
    killsPerHour: bigDecimal;
};

export function getZoneInfo(player: Player): zoneType[] {
    // idle attack cooldown
    const idleAttackCooldown = player.get("redLiquidBonus") ? bd(0.8) : bd(1);
    const idleAttackModifier = getIdleAttackModifier(
        player.get("spoopySetBonus"),
        player.get("sadisticNoEquipmentChallenges")
    );

    // get the optimal itopod zone
    const itopodZone = Zones.ITOPOD;
    const optimalITOPODFloor = itopodZone.getOptimalFloor(player.get("totalPower"), idleAttackModifier);
    itopodZone.setLevel(optimalITOPODFloor);
    const itopodExpValue = bd(itopodZone.exp[0] * itopodZone.exp[1]);
    const itopodBoostChance = itopodZone.boostChances(player.get("totalDropChance"))[0];
    const itopodBoostedVal = itopodBoostChance.multiply(itopodZone.boostedValue(player.get("boostRecyclying"))[0]);
    const optExpectedHits = itopodZone.getHitsPerKill(player.get("totalPower"), idleAttackModifier);

    // Let the optimal itopod be the optimal zone for now
    const ito: zoneType = {
        key: itopodZone.key,
        name: itopodZone.name + " (floor: " + optimalITOPODFloor + ")",
        boost: itopodBoostedVal,
        exp: itopodExpValue,
        hitsToKill: optExpectedHits,
        killsPerHour: itopodZone.getKillsPerHour(
            player.get("totalPower"),
            idleAttackModifier,
            player.get("redLiquidBonus"),
            player.get("totalRespawnTime")
        ),
    };

    // Keep track of all the boost information
    const zoneBoostInfo: zoneType[] = [ito];

    // Non-optimal ITOPOD (non-optimal is the next itopod floor set (by 50))
    const nonOptItopodZone = Zones.ITOPOD;
    const nonOptFloor = Math.ceil(optimalITOPODFloor / 50) * 50;
    nonOptItopodZone.setLevel(nonOptFloor);
    const nonOptExpVal = bd(nonOptItopodZone.exp[0] * nonOptItopodZone.exp[1]);
    const nonOptBoostChance = nonOptItopodZone.boostChances(player.get("totalDropChance"))[0];
    const nonOptBoostedVal = nonOptBoostChance.multiply(
        nonOptItopodZone.boostedValue(player.get("boostRecyclying"))[0]
    );
    const nonOptExpectedHits = nonOptItopodZone.getHitsPerKill(player.get("totalPower"), idleAttackModifier);

    const nonOptHitRatio: bigDecimal = player
        .get("totalRespawnTime")
        .add(idleAttackCooldown)
        .divide(player.get("totalRespawnTime").add(idleAttackCooldown.multiply(bd(nonOptExpectedHits))));
    const nonOptItopod: zoneType = {
        key: nonOptItopodZone.key + "NO",
        name: nonOptItopodZone.name + " Non-optimal" + " (floor: " + nonOptItopodZone.level + ")",
        boost: nonOptBoostedVal.multiply(nonOptHitRatio),
        exp: nonOptExpVal.multiply(nonOptHitRatio),
        hitsToKill: nonOptExpectedHits,
        killsPerHour: nonOptItopodZone.getKillsPerHour(
            player.get("totalPower"),
            idleAttackModifier,
            player.get("redLiquidBonus"),
            player.get("totalRespawnTime")
        ),
    };
    zoneBoostInfo.push(nonOptItopod);

    if (!isZero(player.get("totalPower"))) {
        for (const zone of Object.values(Zones)) {
            if (zone.hardestEnemy()) {
                // var oneHitPower = zone.hardestEnemy().oneHitPower(idleAttackModifier);
                const paralyzer = zone.paralyzeEnemies();
                const normalEnemyPercent = bd(1).subtract(zone.bossChance());
                const exp = zone.exp[0];
                const expChance = zone.expChance(player.get("totalDropChance"));
                const boostChances = zone.boostChances(player.get("totalDropChance"));
                const recycledValues = zone.boostedValue(player.get("boostRecyclying")).reduce((sum, boost, index) => {
                    const boostValueChance = boost.multiply(boostChances[index]);
                    return sum.add(boostValueChance);
                }, bd(0));

                const powerRat = zone.hardestEnemy().numHitsToKill(player.get("totalPower"), idleAttackModifier);
                const expValZone = player
                    .get("totalRespawnTime")
                    .add(idleAttackCooldown)
                    .divide(
                        player
                            .get("totalRespawnTime")
                            .add(idleAttackCooldown.multiply(powerRat))
                            .add(
                                greaterThan(idleAttackCooldown.multiply(powerRat), bd(3.5))
                                    ? bd(2).multiply(paralyzer)
                                    : bd(0)
                            )
                    )
                    .multiply(expChance)
                    .multiply(bd(exp));

                const zoneBoostedVal = player
                    .get("totalRespawnTime")
                    .add(idleAttackCooldown)
                    .divide(
                        player
                            .get("totalRespawnTime")
                            .add(idleAttackCooldown.multiply(powerRat))
                            .add(
                                greaterThan(idleAttackCooldown.multiply(powerRat), bd(3.5))
                                    ? bd(2).multiply(paralyzer)
                                    : bd(0)
                            )
                    )
                    .multiply(normalEnemyPercent)
                    .multiply(recycledValues);

                const zoneInfo: zoneType = {
                    key: zone.key,
                    name: zone.name,
                    boost: zoneBoostedVal,
                    exp: expValZone,
                    hitsToKill: zone.getHitsPerKill(player.get("totalPower"), idleAttackModifier),
                    killsPerHour: zone.getKillsPerHour(
                        player.get("totalPower"),
                        idleAttackModifier,
                        player.get("redLiquidBonus"),
                        player.get("totalRespawnTime")
                    ),
                };
                zoneBoostInfo.push(zoneInfo);
            }
        }
    }

    return zoneBoostInfo;
}

export function getOptimalBoostZone(zoneBoostInfo: zoneType[]): zoneType {
    let optimalZone = zoneBoostInfo[0];
    for (const zone of zoneBoostInfo) {
        if (greaterThan(zone["boost"], optimalZone["boost"])) {
            optimalZone = zone;
        }
    }
    return optimalZone;
}

export function getOptimalExpZone(zoneBoostInfo: zoneType[]): zoneType {
    let optimalZone = zoneBoostInfo[0];
    for (const zone of zoneBoostInfo) {
        if (greaterThan(zone["exp"], optimalZone["exp"])) {
            optimalZone = zone;
        }
    }
    return optimalZone;
}

export function itemSetInfo(player: Player) {
    const itemSets: ItemSet[] = Object.values(player.get("itemSets"));
    const notMaxed = itemSets.filter((itSet: ItemSet) => !itSet.isMaxxed && itSet.isZoneSet());
    const ret: { [k: string]: { zone: Zone; set: ItemSet } } = {};
    for (const itSet of notMaxed) {
        // Since it's a zone set, we know `getZones()` only has one zone
        const zone: Zone = itSet.getZones()[0];
        ret[itSet.key] = {
            zone: zone,
            set: itSet,
        };
    }

    return ret;
}

export function nextItemSetToMax(player: Player): { zone: Zone; set: ItemSet } {
    const itemSetsLeftToMax = Object.values(itemSetInfo(player));
    let minSet: { zone: Zone; set: ItemSet } = itemSetsLeftToMax[0];
    let minZoneId = minSet.zone.id;
    for (const itemSet of Object.values(itemSetsLeftToMax)) {
        if (itemSet.zone.id < minZoneId) {
            minZoneId = itemSet.zone.id;
            minSet = itemSet;
        }
    }
    return minSet;
}
