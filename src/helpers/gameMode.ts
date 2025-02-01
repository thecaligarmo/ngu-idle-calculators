import bigDecimal from "js-big-decimal"
import { Titan, Titans } from "@/assets/enemy"
import { GameMode } from "@/assets/mode"
import Player from "@/assets/player"
import { bd, bigdec_equals, toNum } from "./numbers"

export function getGameMode(data : Player | bigDecimal) : number{
    var gameMode = (data instanceof bigDecimal) ? data : data.get('gameMode') 
    if(isEvilMode(gameMode)) {
        return GameMode.EVIL
    }
    if(isSadMode(gameMode)) {
        return GameMode.SADISTIC
    }
    return GameMode.NORMAL
}

export function isNormalMode(gameMode : bigDecimal | number) {
    return bigdec_equals(bd(gameMode), bd(GameMode.NORMAL))
}

export function isEvilMode(gameMode : bigDecimal | number) {
    return bigdec_equals(bd(gameMode), bd(GameMode.EVIL))
}

export function isSadMode(gameMode : bigDecimal | number) {
    return bigdec_equals(bd(gameMode), bd(GameMode.SADISTIC))
}

export function isAtLeastEvilMode(gameMode : bigDecimal | number) {
    return isSadMode(gameMode) || isEvilMode(gameMode)
}

export function titanKilled(curTitan: Titan | number | bigDecimal, testTitan : Titan | number | bigDecimal) : boolean {
    if(curTitan instanceof Titan) {
        curTitan = curTitan.id
    }
    if(testTitan instanceof Titan) {
        testTitan = testTitan.id
    }

    return toNum(curTitan) >= toNum(testTitan)
}

/* Checks if certain things are unlocked */
export function beardsUnlocked(curTitan: Titan | number | bigDecimal) : boolean {
    return titanKilled(curTitan, Titans.UUG)
}
export function cardsUnlocked(curTitan: Titan | number | bigDecimal) : boolean {
    return titanKilled(curTitan, Titans.EXILE)
}
export function cookingUnlocked(curTitan: Titan | number | bigDecimal) : boolean {
    return titanKilled(curTitan, Titans.IT_HUNGERS)
}
export function diggersUnlocked(curTitan: Titan | number | bigDecimal) : boolean {
    return titanKilled(curTitan, Titans.JAKE)
}
export function hacksUnlocked(curTitan: Titan | number | bigDecimal) : boolean {
    return titanKilled(curTitan, Titans.NERD)
}
export function macguffinUnlocked(curTitan: Titan | number | bigDecimal) : boolean {
    return titanKilled(curTitan, Titans.WALDERP)
}
export function questsUnlocked(curTitan: Titan | number | bigDecimal) : boolean {
    return titanKilled(curTitan, Titans.BEAST)
}
export function wandoosUnlocked(curTitan: Titan | number | bigDecimal) : boolean {
    return titanKilled(curTitan, Titans.GORDON_RAMSEY)
}
export function wishesUnlocked(curTitan: Titan | number | bigDecimal) : boolean {
    return titanKilled(curTitan, Titans.GODMOTHER)
}
export function yggUnlocked(curTitan: Titan | number | bigDecimal) : boolean {
    return titanKilled(curTitan, Titans.GRAND_TREE)
}