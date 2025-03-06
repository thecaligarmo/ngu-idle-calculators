import { useState } from "react";
import { Hack } from "@/assets/hacks";
import { ChoiceButton } from "../components/buttons/ChoiceButton";
import { PlusMinusButtons } from "../components/buttons/PlusMinusButtons";
import Content from "../components/Content";
import { requiredDataType } from "@/helpers/types";
import ContentSubsection from "../components/ContentSubsection";
import { getNumberFormat, getPlayer } from "../components/Context";
import { disableItem } from "../components/dataListColumns";
import { StandardTable } from "../components/StandardTable";
import { StandardTableRowType } from "@/helpers/types";
import { bd, dn, isZero, pn, toNum } from "@/helpers/numbers";
import { getPlayerDataInfo } from "@/helpers/playerInfo";

const HACKS_TARGET = "target";
const HACKS_PERCENTAGE = "percentage";
const HACKS_MILESTONE = "milestone";

export default function HacksPage() {
    const [calcType, setCalcType] = useState(HACKS_TARGET);
    const player = getPlayer();
    const fmt = getNumberFormat();

    // Set data required (from playerData)
    const infoRequired: requiredDataType = [
        ["totalRes3Power", "totalRes3Cap", "totalHackSpeed", "blueHeart"],
        [
            "hackMilestoneReductionStat",
            "hackMilestoneReductionAdventure",
            "hackMilestoneReductionTimeMachine",
            "hackMilestoneReductionDropChance",
            "hackMilestoneReductionAugment",
            "hackMilestoneReductionENGU",
            "hackMilestoneReductionMNGU",
            "hackMilestoneReductionBlood",
            "hackMilestoneReductionQP",
            "hackMilestoneReductionDaycare",
            "hackMilestoneReductionExp",
            "hackMilestoneReductionNumber",
            "hackMilestoneReductionPP",
            "hackMilestoneReductionHack",
            "hackMilestoneReductionWish",
        ],
        [
            "hackStatTarget",
            "hackAdventureTarget",
            "hackTimeMachineTarget",
            "hackDropChanceTarget",
            "hackAugmentTarget",
            "hackENGUTarget",
            "hackMNGUTarget",
            "hackBloodTarget",
            "hackQPTarget",
            "hackDaycareTarget",
            "hackExpTarget",
            "hackNumberTarget",
            "hackPPTarget",
            "hackHackTarget",
            "hackWishTarget",
        ],
    ];
    // Set extra required (not from playerData)
    const extraRequired: requiredDataType = [
        ["percentIncrease", "milestoneIncrease", "addRes3BetaPotion", "addRes3DeltaPotion"],
        [
            "hackMilestoneExtraStat",
            "hackMilestoneExtraAdventure",
            "hackMilestoneExtraTimeMachine",
            "hackMilestoneExtraDropChance",
            "hackMilestoneExtraAugment",
            "hackMilestoneExtraENGU",
            "hackMilestoneExtraMNGU",
            "hackMilestoneExtraBlood",
            "hackMilestoneExtraQP",
            "hackMilestoneExtraDaycare",
            "hackMilestoneExtraExp",
            "hackMilestoneExtraNumber",
            "hackMilestoneExtraPP",
            "hackMilestoneExtraHack",
            "hackMilestoneExtraWish",
        ],
    ];
    const goRequired: requiredDataType = [["goResource3Power", "goResource3Cap", "goRawHackSpeed"]];

    // Get required data
    let infoReq = getPlayerDataInfo(infoRequired);
    let extraReq = getPlayerDataInfo(extraRequired);
    const goReq = getPlayerDataInfo(goRequired);

    let res3pow = player.get("totalRes3Power");
    if (player.get("addRes3BetaPotion")) {
        res3pow = player.get("blueHeart") ? res3pow.multiply(bd(2.2)) : res3pow.multiply(bd(2));
    }
    if (player.get("addRes3DeltaPotion")) {
        res3pow = player.get("blueHeart") ? res3pow.multiply(bd(3.3)) : res3pow.multiply(bd(3));
    }
    const res3cap = player.get("totalRes3Cap");
    const hackSpeed = player.get("totalHackSpeed");

    const hacks: Hack[] = Object.values(player.get("hacks"));
    const hackRows: StandardTableRowType = {};
    let totalTime = bd(0);
    hacks.forEach((hack) => {
        hack.milestoneReduction = toNum(player.get(hack.getMilestoneReductionName()));
        const curVal = hack.getStatValue();
        const milestone = hack.getMilestone();
        let target: number;
        if (calcType == HACKS_PERCENTAGE) {
            const targetVal = curVal * (toNum(player.get("percentIncrease")) / 100 + 1);
            target = hack.getLevelFromVal(targetVal);
        } else if (calcType == HACKS_MILESTONE) {
            target = hack.getMilestoneLevel(milestone + toNum(player.get("milestoneIncrease")));
        } else if (calcType == HACKS_TARGET) {
            target = toNum(player.get(hack.getTargetName()));
        } else {
            target = hack.level;
        }

        let targetMilestone = hack.getMilestone(target);
        if (!isZero(player.get(hack.getMilestoneExtraName()))) {
            targetMilestone = targetMilestone + toNum(player.get(hack.getMilestoneExtraName()));
            target = hack.getMilestoneLevel(targetMilestone);
        }

        const newTargetVal = hack.getStatValue("", target); // Not necessarily the same as tVal since levels are discrete
        const time = hack.getTimeBetweenLevels(res3pow, res3cap, hackSpeed, target);
        totalTime = totalTime.add(time);
        const milestoneChange = targetMilestone - milestone;

        hackRows[hack.key] = {
            name: hack.name,
            level: <>{pn(hack.level, fmt, 0)}</>,
            bonus: <>{pn(curVal, fmt, 2)}%</>,
            target: <>{pn(target, fmt)}</>,
            tBonus: <>{pn(newTargetVal, fmt, 2)}%</>,
            change: <>x {pn(newTargetVal / curVal, fmt, 3)} = </>,
            milestoneChange: (
                <>
                    {milestoneChange > 0 ? "+" : ""}
                    {pn(milestoneChange, fmt, 0)}
                    <PlusMinusButtons player={player} keyName={hack.getMilestoneExtraName()} />
                </>
            ),
            time: <>{dn(time)}</>,
        };
    });

    hackRows["total"] = {
        name: "Total",
        isTotal: true,
        time: <>{dn(totalTime)}</>,
    };

    const hackOrder = ["name", "level", "target", "milestoneChange", "bonus", "change", "tBonus", "time"];
    const hackHeader = {
        name: "Name",
        level: "Current Level",
        bonus: "Current Bonus",
        milestoneChange: "Milestone Increase",
        target: "Target Level",
        change: "Bonus Increase Amount",
        tBonus: "Target Bonus Amount",
        time: "Time Taken",
        minTime: "Min Time Taken",
    };

    const extraClasses = {
        time: "text-right text-red-500",
        minTime: "text-right text-red-500",
        target: "text-blue-500",
        tBonus: "text-blue-500",
        change: "text-green-500",
        milestoneChange: "text-right",
    };

    let titleText = "How long does it take to increase hacks ";
    // We never want to show milestone increases:
    extraReq = disableItem(extraReq, [
        "hackMilestoneExtraStat",
        "hackMilestoneExtraAdventure",
        "hackMilestoneExtraTimeMachine",
        "hackMilestoneExtraDropChance",
        "hackMilestoneExtraAugment",
        "hackMilestoneExtraENGU",
        "hackMilestoneExtraMNGU",
        "hackMilestoneExtraBlood",
        "hackMilestoneExtraQP",
        "hackMilestoneExtraDaycare",
        "hackMilestoneExtraExp",
        "hackMilestoneExtraNumber",
        "hackMilestoneExtraPP",
        "hackMilestoneExtraHack",
        "hackMilestoneExtraWish",
    ]);
    switch (calcType) {
        case HACKS_TARGET:
            titleText += "using targets?";
            extraReq = disableItem(extraReq, ["percentIncrease", "milestoneIncrease"]);
            break;
        case HACKS_PERCENTAGE:
            titleText += "by a percent of the stat value?";
            extraReq = disableItem(extraReq, ["milestoneIncrease"]);
            infoReq = disableItem(infoReq, [
                "hackStatTarget",
                "hackAdventureTarget",
                "hackTimeMachineTarget",
                "hackDropChanceTarget",
                "hackAugmentTarget",
                "hackENGUTarget",
                "hackMNGUTarget",
                "hackBloodTarget",
                "hackQPTarget",
                "hackDaycareTarget",
                "hackExpTarget",
                "hackNumberTarget",
                "hackPPTarget",
                "hackHackTarget",
                "hackWishTarget",
            ]);
            break;
        case HACKS_MILESTONE:
            titleText += "using milestones?";
            extraReq = disableItem(extraReq, ["percentIncrease"]);
            infoReq = disableItem(infoReq, [
                "hackStatTarget",
                "hackAdventureTarget",
                "hackTimeMachineTarget",
                "hackDropChanceTarget",
                "hackAugmentTarget",
                "hackENGUTarget",
                "hackMNGUTarget",
                "hackBloodTarget",
                "hackQPTarget",
                "hackDaycareTarget",
                "hackExpTarget",
                "hackNumberTarget",
                "hackPPTarget",
                "hackHackTarget",
                "hackWishTarget",
            ]);
            break;
    }

    const topButtons = (
        <>
            <p>How would you like to calculate Hacks?</p>
            <ChoiceButton
                text="Using Targets"
                onClick={() => setCalcType(HACKS_TARGET)}
                active={calcType == HACKS_TARGET}
            />
            <ChoiceButton
                text="Using Percentage of Current Value"
                onClick={() => setCalcType(HACKS_PERCENTAGE)}
                active={calcType == HACKS_PERCENTAGE}
            />
            <ChoiceButton
                text="Using Milestones"
                onClick={() => setCalcType(HACKS_MILESTONE)}
                active={calcType == HACKS_MILESTONE}
            />
        </>
    );

    return (
        <Content
            prechildren={topButtons}
            title="Hacks"
            infoRequired={infoReq}
            extraRequired={extraReq}
            goRequired={goReq}
        >
            This page is a work in progress. There might be some errors in calculations.
            <ContentSubsection title={titleText}>
                <StandardTable order={hackOrder} header={hackHeader} rows={hackRows} extraRowClasses={extraClasses} />
            </ContentSubsection>
        </Content>
    );
}
