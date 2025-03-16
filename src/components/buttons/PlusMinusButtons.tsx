import Player from "@/assets/player";
import { playerDataInfo } from "@/assets/playerData";
import { toNum } from "@/helpers/numbers";
import _ from "lodash";

export function PlusMinusButtons({
    player,
    keyName,
    onStart,
    onFinish,
}: {
    player: Player;
    keyName: string;
    onStart?: (inc: boolean) => void;
    onFinish?: (inc: boolean) => void;
}) {
    if (keyName in playerDataInfo) {
        return (
            <>
                <button
                    className="rounded-md border-2 border-pink-500 text-pink-500 px-1 ml-2"
                    onClick={() => {
                        if (!_.isUndefined(onStart)) {
                            onStart(false);
                        }
                        const curVal = toNum(player.get(keyName));
                        player.set(keyName, (curVal - 1).toString());
                        if (!_.isUndefined(onFinish)) {
                            onFinish(false);
                        }
                    }}
                >
                    -
                </button>
                <button
                    className="rounded-md border-2 border-pink-500 text-pink-500 px-1 ml-2"
                    onClick={() => {
                        if (!_.isUndefined(onStart)) {
                            onStart(true);
                        }
                        const curVal = toNum(player.get(keyName));
                        player.set(keyName, (curVal + 1).toString());
                        if (!_.isUndefined(onFinish)) {
                            onFinish(true);
                        }
                    }}
                >
                    +
                </button>
            </>
        );
    }
    return null;
}
