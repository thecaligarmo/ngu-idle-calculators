import { InputSelect } from "@/components/selects/InputSelect";
import { getIdleAttackModifier } from "@/helpers/calculators";
import { bd, dn, isZero, pn } from "@/helpers/numbers";
import { getOptimalBoostZone, getOptimalExpZone, getZoneInfo, nextItemSetToMax } from "@/helpers/pages/zone";
import { getPlayerDataInfo } from "@/helpers/playerInfo";
import bigDecimal from "js-big-decimal";
import _ from "lodash";
import { useEffect, useState } from "react";
import Content from "../components/Content";
import { requiredDataType } from "@/helpers/types";
import ContentSubsection from "../components/ContentSubsection";
import { getNumberFormat, getPlayer } from "../components/Context";

export default function ZonePage() {
    const [timeToCompletion, setTimeToCompletion] = useState("");
    const [killsToCompletion, setKillsToCompletion] = useState(0);
    const player = getPlayer();
    const fmt = getNumberFormat();

    // Set data required (from playerData)
    const infoRequired: requiredDataType = [
        ["totalDropChance", "totalPower", "totalRespawnTime", "boostRecyclying"],
        ["sadisticNoEquipmentChallenges", "redLiquidBonus", "spoopySetBonus"],
    ];
    // Set extra required (not from playerData)
    const extraRequired: requiredDataType = [[]];
    const goRequired: requiredDataType = [["goDropChance", "goPower", "goRespawn"]];

    // Get required data
    const infoReq = getPlayerDataInfo(infoRequired);
    const extraReq = getPlayerDataInfo(extraRequired);
    const goReq = getPlayerDataInfo(goRequired);

    const zoneInfo = getZoneInfo(player);
    const optimalBoostZone = getOptimalBoostZone(zoneInfo);
    const optimalExpZone = getOptimalExpZone(zoneInfo);

    const zoneList = zoneInfo.map(function (zone) {
        return (
            <option key={zone.key} value={zone.key}>
                {zone.name}
            </option>
        );
    });

    const zoneBoonList = zoneInfo.map(function (zone) {
        const bV = isZero(optimalBoostZone["boost"]) ? bd(1) : optimalBoostZone["boost"];
        return (
            <li key={zone.key} className={player.get("optZoneChosenBoost") == zone.key ? "" : "hidden"}>
                {zone.name} is{" "}
                <span className="text-red-500">{pn(zone.boost.divide(bV).multiply(bd(100)), fmt, 2)}%</span> as
                efficient with a boost value of <span className="text-blue-500">{pn(zone.boost, fmt)}.</span>
            </li>
        );
    });

    const zoneExpList = zoneInfo.map(function (zone) {
        const eV = isZero(optimalExpZone["exp"]) ? bd(1) : optimalExpZone["exp"];
        return (
            <li key={zone.key} className={player.get("optZoneChosenExp") == zone.key ? "" : "hidden"}>
                {zone.name} is{" "}
                <span className="text-red-500">{pn(zone.exp.divide(eV).multiply(bd(100)), fmt, 2)}%</span> as efficient
                with a exp value of <span className="text-blue-500">{pn(zone.exp, fmt)}.</span>
            </li>
        );
    });

    useEffect(() => {
        if (!_.isEmpty(player.get("itemSets"))) {
            const itemSet = nextItemSetToMax(player);
            if (itemSet.set.isZoneSet()) {
                const dc = itemSet.set.getDropChance(player.get("totalDropChance"));
                const items = itemSet.set.items.map((it) =>
                    Math.ceil((100 - it.level) / (itemSet.zone.itemDrop[4] + 1))
                );
                const idleAttackModifier = getIdleAttackModifier(
                    player.get("spoopySetBonus"),
                    player.get("sadisticNoEquipmentChallenges")
                );
                fetch(
                    "https://thecaligarmo.com/ngu/index.php?dropChance=" +
                        dc.getValue() +
                        "&itemLevels=" +
                        items.join(",")
                )
                    .then((response) => response.json())
                    .then((data) => {
                        let time = itemSet.set.secsToCompletion(
                            bd(data),
                            player.get("totalPower"),
                            idleAttackModifier,
                            player.get("redLiquidBonus"),
                            player.get("totalRespawnTime")
                        );
                        setKillsToCompletion(data);
                        time = time instanceof bigDecimal || typeof time == "number" ? dn(time) : time.toString();
                        setTimeToCompletion(time);
                    });
            }
        }
    }, [player]);

    let nextSet = "";
    if (!_.isEmpty(player.get("itemSets"))) {
        const itemSet = nextItemSetToMax(player);
        if (itemSet.set.isZoneSet()) {
            nextSet = itemSet.set.name;
        }
    }
    if (nextSet == "") {
        nextSet = "None";
    }

    return (
        <Content title="Optimal Zones" infoRequired={infoReq} extraRequired={extraReq} goRequired={goReq}>
            <ContentSubsection title="What is the optimal zone for getting boosts?">
                <p>
                    The optimal zone for getting boosts is <span className="text-red-500">{optimalBoostZone.name}</span>{" "}
                    which will give you an average boost value of{" "}
                    <span className="text-blue-500">{pn(optimalBoostZone["boost"], fmt, 2)}</span>.
                </p>
                <br />
                <div className="pl-10">
                    <p>
                        Compare the optimal zone with:
                        <InputSelect
                            onChange={(e) => {
                                player.set("optZoneChosenBoost", e.target.value);
                            }}
                            value={player.get("optZoneChosenBoost")}
                            id="compare-boost-select"
                        >
                            {zoneList}
                        </InputSelect>
                    </p>
                    <ul>{zoneBoonList}</ul>
                </div>
            </ContentSubsection>
            <ContentSubsection title="What is the optimal zone for getting experience?">
                <p>
                    The optimal zone for getting experience is{" "}
                    <span className="text-red-500">{optimalExpZone.name}</span> which will give you an average exp value
                    of <span className="text-blue-500">{pn(optimalExpZone["exp"], fmt, 2)}</span>.
                </p>
                <br />
                <div className="pl-10">
                    <p>
                        Compare the optimal zone with:
                        <InputSelect
                            onChange={(e) => {
                                player.set("optZoneChosenExp", e.target.value);
                            }}
                            value={player.get("optZoneChosenExp")}
                            id="compare-boost-select"
                        >
                            {zoneList}
                        </InputSelect>
                    </p>
                    <ul>{zoneExpList}</ul>
                </div>
            </ContentSubsection>
            <ContentSubsection title="How long until I complete the next set?">
                {timeToCompletion == "" ? (
                    <>
                        <p>
                            The next set for you to complete is the <span className="text-blue-500">{nextSet}</span>{" "}
                            set.
                        </p>
                        <p className="text-red-500">Loading... (can take many minutes to calculate.)</p>
                    </>
                ) : (
                    <p>
                        The next set for you to complete is the <span className="text-blue-500">{nextSet}</span> set.
                        You will need to kill <span className="text-green-500">{pn(killsToCompletion)}</span> enemies to
                        complete the set. This should take roughly{" "}
                        <span className="text-green-500">{timeToCompletion}</span>.
                    </p>
                )}
                <small className="text-cyan-700">
                    The numbers above are only estimates as they are dependent on luck.
                </small>
            </ContentSubsection>
        </Content>
    );
}
