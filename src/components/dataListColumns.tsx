import { CardRarityColor, CardRarityText } from "@/assets/cards";
import Player from "@/assets/player";
import { pn, toNum } from "@/helpers/numbers";
import _ from "lodash";
import { ReactNode } from "react";
import { ChoiceButton } from "./buttons/ChoiceButton";
import { getNumberFormat } from "./Context";
import { CardRaritySelect } from "./selects/CardRaritySelect";
import { playerDataInfo } from "@/assets/playerData";

// TODO - Fix the `any` in this page

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function disableItem(reqs: any, itemToRemove: string[]): string[][] {
    for (let i = 0; i < reqs.length; i++) {
        for (let j = 0; j < reqs[i].length; j++) {
            if (itemToRemove.includes(reqs[i][j].key)) {
                reqs[i][j].key = reqs[i][j].key + "DISABLED";
            }
        }
    }
    return reqs;
}

/*
 Returns the <li> or <input> needed for `dataToCols`
*/
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function dataToList(player: Player, d: any, input: boolean = false): ReactNode {
    // const {playerDataUpdated, setPlayerDataUpdated} = useSavedDataContext();
    const fmt = getNumberFormat();

    const disabled = d.disabled ? "hidden" : "";

    if (input) {
        // For some reason a checkbox isn't working... so we'll do this instead.
        if (d.type == "boolean") {
            return (
                <li key={"in-" + d.key} id={"in-" + d.id} className={disabled}>
                    <label className="inline-block text-black dark:text-white mt-2 mb-1 mr-2">
                        {/* htmlFor={d.id} */}
                        {d.name}:
                        <ChoiceButton
                            text="Yes"
                            active={player.get(d.key, true)}
                            onClick={() => {
                                player.set(d.key, true);
                            }}
                        />
                        <ChoiceButton
                            text="No"
                            active={!player.get(d.key, true)}
                            onClick={() => {
                                player.set(d.key, false);
                            }}
                        />
                    </label>
                </li>
            );
        }
        // Game mode is weird
        if (d.key == "gameMode") {
            return (
                <li key={"in-" + d.key} id={"in-" + d.id} className={disabled}>
                    <label className="inline-block text-black dark:text-white mt-2 mb-1 mr-2">
                        {/* htmlFor={d.id} */}
                        {d.name}:
                        <ChoiceButton
                            text="Normal"
                            active={player.get(d.key, true).getValue() == "0"}
                            onClick={() => {
                                player.set(d.key, 0);
                            }}
                        />
                        <ChoiceButton
                            text="Evil"
                            active={player.get(d.key, true).getValue() == "1"}
                            onClick={() => {
                                player.set(d.key, 1);
                            }}
                        />
                        <ChoiceButton
                            text="Sadistic"
                            active={player.get(d.key, true).getValue() == "2"}
                            onClick={() => {
                                player.set(d.key, 2);
                            }}
                        />
                    </label>
                </li>
            );
        }
        if (d.key.startsWith("cardRarity")) {
            return (
                <li key={"in-" + d.key} id={"in-" + d.id} className={disabled}>
                    <label className="inline-block mt-2 mb-1 mr-2">
                        {/* htmlFor={d.id} */}
                        {d.name}:
                        <CardRaritySelect player={player} dkey={d.key} />
                    </label>
                </li>
            );
        }

        // dark:bg-black dark:text-white
        let inputClass =
            "text-black font-normal rounded-lg border border-blue-500 px-1.5 py-1 dark:bg-black dark:text-white";

        if (_.isUndefined(d.pre) || d.pre == "") {
            inputClass += " w-32";
        } else {
            inputClass += " w-16";
        }
        // Giving an input length overrides old one
        if (d.length > 0) {
            inputClass = inputClass.replace(" w-32", "").replace(" w-16", "");
            switch (d.length) {
                case 1:
                    inputClass += " w-10";
                    break;
                case 2:
                    inputClass += " w-12";
                    break;
                case 3:
                    inputClass += " w-14";
                    break;
                case 4:
                    inputClass += " w-16";
                    break;
                case 5:
                case 6:
                    inputClass += " w-20";
                    break;
                case 7:
                case 8:
                    inputClass += " w-28";
                    break;
            }
            // inputClass += " w-" + d.inputLength
        }

        return (
            <li key={"in-" + d.key} id={"in-" + d.id} className={disabled}>
                <label className="inline-block text-black dark:text-white mt-2 mb-1 mr-2" htmlFor={d.id}>
                    {d.name}:
                </label>
                {d.pre}
                <input
                    className={inputClass}
                    type="number"
                    name={d.id}
                    id={d.id}
                    value={player.get(d.key, true).getValue() === "0" ? "" : toNum(player.get(d.key, true))}
                    onChange={(e) => {
                        const max = playerDataInfo[d.key]["max"];
                        if (!_.isUndefined(max) && Number(e.target.value) > max) {
                            return;
                        }
                        player.set(d.key, e.target.value);
                    }}
                />
            </li>
        );
    } else {
        let dVal: string | ReactNode = "";
        if (d.type == "boolean") {
            dVal = player.get(d.key, true) ? "Yes" : "No";
        } else if (d.type == "number") {
            dVal = pn(player.get(d.key, true), fmt);
        } else {
            dVal = player.get(d.key, true);
        }

        if (d.key == "gameMode") {
            if (player.get(d.key, true) == "0") {
                dVal = "Normal";
            }
            if (player.get(d.key, true) == "1") {
                dVal = "Evil";
            }
            if (player.get(d.key, true) == "2") {
                dVal = "Sadistic";
            }
        }
        if (d.key.startsWith("cardRarity")) {
            dVal = (
                <span className={CardRarityColor[toNum(player.get(d.key, true))]}>
                    {CardRarityText[toNum(player.get(d.key, true))]}
                </span>
            );
        }

        return (
            <li key={d.key} className={disabled}>
                {d.name}: {d.pre}
                {dVal}
            </li>
        );
    }
}

/*
 Takes our data and returns many <ul> depending on data
*/
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function dataToCols(player: Player, dr: any[], input: boolean = false): ReactNode {
    const cols = [];
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    let params: { [k: string]: any } = {};

    dr = _.cloneDeep(dr);
    if (!_.isArray(dr[0])) {
        const extraParams = dr.shift();
        params = { ...params, ...extraParams };
    }

    for (const colNum in dr) {
        const col = dr[colNum];
        let colKey = "";
        for (const d of col) {
            if (d.key.includes("DISABLED")) {
                d.key = d.key.replace("DISABLED", "");
                d.disabled = true;
            }
            colKey += d.key;
        }
        // Handle empty colKeys
        if (colKey == "") {
            colKey = colNum.toString();
        }
        let cc = "inline-block align-top mb-5 ";
        if ("colWidths" in params) {
            cc += params["colWidths"][colNum];
        } else {
            // We can't do dynamic classnames for tailwind =(
            switch (dr.length) {
                case 1:
                    cc += "";
                    break;
                case 2:
                case 4:
                case 8:
                case 10:
                    cc += "w-1/2 ";
                    break;
                case 3:
                case 6:
                    cc += "w-1/3 ";
            }
        }

        cols.push(
            <ul className={cc} key={colKey}>
                {
                    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                    col.map((d: any) => {
                        return dataToList(player, d, input);
                    })
                }
            </ul>
        );
    }
    return cols;
}
