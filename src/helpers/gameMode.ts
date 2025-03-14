import { GameMode } from "@/assets/mode";
import Player from "@/assets/player";
import bigDecimal from "js-big-decimal";
import { bd, bigdec_equals } from "./numbers";

export function getGameMode(data: Player | bigDecimal): number {
    const gameMode = data instanceof bigDecimal ? data : data.get("gameMode");
    if (isEvilMode(gameMode)) {
        return GameMode.EVIL;
    }
    if (isSadMode(gameMode)) {
        return GameMode.SADISTIC;
    }
    return GameMode.NORMAL;
}

export function isNormalMode(gameMode: bigDecimal | number) {
    return bigdec_equals(bd(gameMode), bd(GameMode.NORMAL));
}

export function isEvilMode(gameMode: bigDecimal | number) {
    return bigdec_equals(bd(gameMode), bd(GameMode.EVIL));
}

export function isSadMode(gameMode: bigDecimal | number) {
    return bigdec_equals(bd(gameMode), bd(GameMode.SADISTIC));
}

export function isAtLeastEvilMode(gameMode: bigDecimal | number) {
    return isSadMode(gameMode) || isEvilMode(gameMode);
}
