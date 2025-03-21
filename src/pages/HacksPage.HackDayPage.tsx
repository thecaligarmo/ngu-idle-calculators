import { Hack, HackKeys } from "@/assets/hacks";
import { Stat } from "@/assets/stat";
import { PlusMinusButtons } from "../components/buttons/PlusMinusButtons";
import Content from "../components/Content";
import { requiredDataType } from "@/helpers/types";
import ContentSubsection from "../components/ContentSubsection";
import { getPlayer, getNumberFormat } from "../components/Context";
import { disableItem } from "../components/dataListColumns";
import { StandardTable } from "../components/StandardTable";
import { StandardTableRowType } from "@/helpers/types";
import { bd, lessThan, isZero, toNum, pn, dn } from "@/helpers/numbers";
import { getPlayerDataInfo } from "@/helpers/playerInfo";

export default function HackDayPage() {
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
    ];
    // Set extra required (not from playerData)
    const extraRequired: requiredDataType = [
        ["addRes3BetaPotion", "addRes3DeltaPotion"],
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
    const infoReq = getPlayerDataInfo(infoRequired);
    let extraReq = getPlayerDataInfo(extraRequired);
    const goReq = getPlayerDataInfo(goRequired);

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

    let res3pow = player.get("totalRes3Power");
    if (player.get("addRes3BetaPotion")) {
        res3pow = player.get("blueHeart") ? res3pow.multiply(bd(2.2)) : res3pow.multiply(bd(2));
    }
    if (player.get("addRes3DeltaPotion")) {
        res3pow = player.get("blueHeart") ? res3pow.multiply(bd(3.3)) : res3pow.multiply(bd(3));
    }
    const res3cap = player.get("totalRes3Cap");
    const hackSpeed = player.get("totalHackSpeed");

    // Figure out hackday timers
    const hacks: Hack[] = Object.values(player.get("hacks"));
    const hackDayRows: StandardTableRowType = {};
    let doneFindingOptimal = false;
    let hackDayTargets: { [k: string]: number } = {};
    let baseHackDayTime = bd(0);

    hacks.forEach((hack) => {
        const hackTarget = hack.getMaxLevelHackDay(res3pow, res3cap, hackSpeed);
        baseHackDayTime = baseHackDayTime.add(
            hack.getTimeBetweenLevels(res3pow, res3cap, hackSpeed, hackTarget, -1, true)
        );
        hackDayTargets[hack.key] = hackTarget;
    });

    // Figure out with hack info
    try {
        const hackHack = hacks[13];
        const hackHackVal = hackHack.getStatValue(Stat.HACK_SPEED);
        let newHackHackLvl = hackHack.level;
        let i = 0;
        while (!doneFindingOptimal && i < 20) {
            i = i + 1;
            newHackHackLvl = hackHack.getNextMilestoneLvl(newHackHackLvl);
            const newHackHackVal = hackHack.getStatValue(Stat.HACK_SPEED, newHackHackLvl);
            const newHackSpeed = hackSpeed.divide(bd(hackHackVal)).multiply(bd(newHackHackVal));
            let newHackDayTime = bd(0); //hackHack.getTimeBetweenLevels(res3pow, res3cap, hackSpeed, newHackHackLvl)
            const newHackDayTargets: { [k: string]: number } = {};

            hacks.forEach((hack) => {
                let hackTarget: number;
                if (hack.key == HackKeys.HACK) {
                    hackTarget = newHackHackLvl;
                } else {
                    hackTarget = hackDayTargets[hack.key];
                }
                const minHackTime = hack.getTimeBetweenLevels(res3pow, res3cap, newHackSpeed, hackTarget);
                newHackDayTime = newHackDayTime.add(minHackTime);
                newHackDayTargets[hack.key] = hackTarget;
            });

            if (lessThan(newHackDayTime, baseHackDayTime) || lessThan(newHackDayTime, bd(28 * 60 * 60))) {
                hackDayTargets = newHackDayTargets;
                baseHackDayTime = newHackDayTime;
            } else {
                doneFindingOptimal = true;
            }
        }
    } catch {
        console.log("");
    }

    // Fix extra targets
    let totalHackDayTimeMin = bd(0);
    let totalHackDayTimeMax = bd(0);
    try {
        const hackHack = hacks[13];
        const hackHackVal = hackHack.getStatValue(Stat.HACK_SPEED);
        let hackHackTarget = hackDayTargets[hackHack.key];
        if (!isZero(player.get(hackHack.getMilestoneExtraName()))) {
            hackHackTarget = hackHack.getExtraMilestoneLvl(
                toNum(player.get(hackHack.getMilestoneExtraName())),
                hackHackTarget
            );
        }
        const newHackHackVal = hackHack.getStatValue(Stat.HACK_SPEED, hackHackTarget);
        const newHackSpeed = hackSpeed.divide(bd(hackHackVal)).multiply(bd(newHackHackVal));
        hacks.forEach((hack) => {
            const curVal = hack.getStatValue();
            const hackTargetInit = hackDayTargets[hack.key];
            let hackTarget = hackTargetInit;
            let targetMilestone = hack.getMilestone(hackTarget);

            if (!isZero(player.get(hack.getMilestoneExtraName()))) {
                hackTarget = hack.getExtraMilestoneLvl(toNum(player.get(hack.getMilestoneExtraName())), hackTarget);
                targetMilestone = hack.getMilestone(hackTarget);
            }

            const newHackVal = hack.getStatValue("", hackTarget);
            const hackTime = hack.getTimeBetweenLevels(res3pow, res3cap, hackSpeed, hackTarget, -1, true);

            const minHackTime = hack.getTimeBetweenLevels(res3pow, res3cap, newHackSpeed, hackTarget);
            totalHackDayTimeMin = totalHackDayTimeMin.add(minHackTime);
            totalHackDayTimeMax = totalHackDayTimeMax.add(hackTime);
            const milestoneChange = targetMilestone - hack.getMilestone();

            hackDayRows[hack.key] = {
                name: hack.name,
                level: <>{pn(hack.level, fmt, 0)}</>,
                bonus: <>{pn(curVal, fmt, 2)}%</>,
                target: <>{pn(hackTarget, fmt)}</>,
                tBonus: <>{pn(newHackVal, fmt, 2)}%</>,
                milestoneChange: (
                    <>
                        {milestoneChange > 0 ? "+" : ""}
                        {pn(milestoneChange, fmt, 0)}
                        <PlusMinusButtons
                            player={player}
                            keyName={hack.getMilestoneExtraName()}
                            onFinish={() => {
                                if (
                                    toNum(player.get(hack.getMilestoneExtraName())) > hack.getMaxExtra(hackTargetInit)
                                ) {
                                    player.set(
                                        hack.getMilestoneExtraName(),
                                        hack.getMaxExtra(hackTargetInit).toString()
                                    );
                                }
                            }}
                        />
                    </>
                ),
                time: <>{dn(hackTime)}</>,
                minTime: <>{dn(minHackTime)}</>,
                change: <>x {pn(newHackVal / curVal, fmt)} = </>,
            };
        });
    } catch {
        console.log("");
    }

    hackDayRows["total"] = {
        name: "Total",
        isTotal: true,
        time: <>{dn(totalHackDayTimeMax)}</>,
        minTime: <>{dn(totalHackDayTimeMin)}</>,
    };

    const hackDayOrder = ["name", "level", "target", "milestoneChange", "bonus", "change", "tBonus", "time", "minTime"];
    const hackHeader = {
        name: "Name",
        level: "Current Level",
        bonus: "Current Bonus",
        milestoneChange: "Milestone Increase",
        target: "Target Level",
        change: "Bonus Increase Amount",
        tBonus: "Target Bonus Amount",
        time: "Max Time Taken",
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

    const preChildren = <p>This page will calculate the milestones needed to perform a 24 hour hackday.</p>;

    return (
        <Content
            title="Hacks"
            infoRequired={infoReq}
            extraRequired={extraReq}
            goRequired={goReq}
            prechildren={preChildren}
        >
            This page is a work in progress. There might be some errors in calculations.
            <ContentSubsection title="How do I setup my hackday?">
                The max time taken is if you do the Hack hack last and the min time take is if you do it first.
                <StandardTable
                    order={hackDayOrder}
                    header={hackHeader}
                    rows={hackDayRows}
                    extraRowClasses={extraClasses}
                />
            </ContentSubsection>
        </Content>
    );
}
