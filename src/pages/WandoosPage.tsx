import _ from "lodash";
import { Wandoos, WANDOOSLIST } from "@/assets/wandoos";
import Content, { requiredDataType } from "../components/Content";
import ContentSubsection from "../components/ContentSubsection";
import { getNumberFormat, getPlayer } from "../components/Context";
import { pn } from "@/helpers/numbers";
import { getLevelsGainedInWandoos, getMaxOSBonus, getWandoosBonuses } from "@/helpers/pages/wandoos";
import { getPlayerDataInfo } from "@/helpers/playerInfo";

export default function WandoosPage() {
    const player = getPlayer();
    const fmt = getNumberFormat();

    // Set data required (from playerData)
    const infoRequired: requiredDataType = [
        ["gameMode", "totalEnergyCap", "totalMagicCap", "wandoosEnergyAllocated", "wandoosMagicAllocated"],
    ];
    // Set extra required (not from playerData)
    const extraRequired: requiredDataType = [["minutesSpentInWandoos", "energyFillsPerSecond", "magicFillsPerSecond"]];
    const goRequired: requiredDataType = [["goEnergyCap", "goMagicCap"]];

    // Get required data
    const infoReq = getPlayerDataInfo(infoRequired);
    const extraReq = getPlayerDataInfo(extraRequired);
    const goReq = getPlayerDataInfo(goRequired);

    const gameMode = player.get("gameMode");
    let wandoos: Wandoos = player.get("wandoos")[0];
    if (_.isUndefined(wandoos)) {
        wandoos = _.cloneDeep(WANDOOSLIST[0]);
    }
    wandoos.energyAllocated = player.get("wandoosEnergyAllocated");
    wandoos.magicAllocated = player.get("wandoosMagicAllocated");

    const data = {
        gameMode: gameMode,
        minutes: player.get("minutesSpentInWandoos"),
        energyCap: player.get("totalEnergyCap"),
        magicCap: player.get("totalMagicCap"),
        energyFills: player.get("energyFillsPerSecond"),
        magicFills: player.get("magicFillsPerSecond"),
        wandoos: wandoos,
    };
    const lvlsGained = getLevelsGainedInWandoos(data);
    const bonuses = getWandoosBonuses(lvlsGained, wandoos);

    const maxOS = getMaxOSBonus(bonuses);

    const prechildren = (
        <p>
            See which wandoos is the most efficient for where you are. By{" "}
            <span className="text-red-500">&ldquo;fills per second&rdquo;</span> we mean how fast is your bar filling
            up. So if you&quot;re capped/BBd, then it&quot;s 50, etc.
        </p>
    );

    return (
        <Content
            prechildren={prechildren}
            title="Wandoos"
            infoRequired={infoReq}
            extraRequired={extraReq}
            goRequired={goReq}
        >
            Assumptions: We assume that the wandoos in your save file is capped and OS is fully booted
            <ContentSubsection title="Which OS should I be using?">
                The row highlighted in green is the OS you should be using.
                <br />
                <br />
                <table className="inline-block w-full md:w-1/2 align-top mb">
                    <thead>
                        <tr className="text-left border-b-1 border border-t-0 border-x">
                            <th className="px"></th>
                            <th className="px">Bonus</th>
                            <th className="px">Energy Levels</th>
                            <th className="px">Magic Levels</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={maxOS == "98" ? "bg-green-200 dark:bg-green-900" : ""}>
                            <td className="px">98</td>
                            <td className="px">{pn(bonuses["98"], fmt, 2)}%</td>
                            <td className="px">{pn(lvlsGained["98"]["energy"], fmt)}</td>
                            <td className="px">{pn(lvlsGained["98"]["magic"], fmt)}</td>
                        </tr>
                        <tr className={maxOS == "meh" ? "bg-green-200 dark:bg-green-900" : ""}>
                            <td className="px">MEH</td>
                            <td className="px">{pn(bonuses["meh"], fmt, 2)}%</td>
                            <td className="px">{pn(lvlsGained["meh"]["energy"], fmt)}</td>
                            <td className="px">{pn(lvlsGained["meh"]["magic"], fmt)}</td>
                        </tr>
                        <tr className={maxOS == "xl" ? "bg-green-200 dark:bg-green-900" : ""}>
                            <td className="px">XL</td>
                            <td className="px">{pn(bonuses["xl"], fmt, 2)}%</td>
                            <td className="px">{pn(lvlsGained["xl"]["energy"], fmt)}</td>
                            <td className="px">{pn(lvlsGained["xl"]["magic"], fmt)}</td>
                        </tr>
                    </tbody>
                </table>
            </ContentSubsection>
        </Content>
    );
}
