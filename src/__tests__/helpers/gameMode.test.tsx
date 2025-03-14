import earlyEvil from "@/__data__/earlyEvil1";
import earlyEvilTwo from "@/__data__/earlyEvil2";
import earlyNormal from "@/__data__/earlyNormal1";
import earlyNormalTwo from "@/__data__/earlyNormal2";
import earlySad from "@/__data__/earlySad1";
import evilReturnToNormal from "@/__data__/evilReturnToNormal";
import lateEvil from "@/__data__/lateEvil1";
import lateNormal from "@/__data__/lateNormal";
import midEvil from "@/__data__/midEvil1";
import midEvilTwo from "@/__data__/midEvil2";
import midNormal from "@/__data__/midNormal1";
import midNormalTwo from "@/__data__/midNormal2";
import Player from "@/assets/player";
import { getGameMode, isAtLeastEvilMode, isEvilMode, isNormalMode, isSadMode } from "@/helpers/gameMode";

const earlyNormalPlayer = new Player(false, true);
earlyNormalPlayer.importPlayerData(earlyNormal);
const earlyNormalTwoPlayer = new Player(false, true);
earlyNormalTwoPlayer.importPlayerData(earlyNormalTwo);
const midNormalPlayer = new Player(false, true);
midNormalPlayer.importPlayerData(midNormal);
const midNormalTwoPlayer = new Player(false, true);
midNormalTwoPlayer.importPlayerData(midNormalTwo);
const lateNormalPlayer = new Player(false, true);
lateNormalPlayer.importPlayerData(lateNormal);

const earlyEvilPlayer = new Player(false, true);
earlyEvilPlayer.importPlayerData(earlyEvil);
const evilReturnToNormalPlayer = new Player(false, true);
evilReturnToNormalPlayer.importPlayerData(evilReturnToNormal);
const earlyEvilTwoPlayer = new Player(false, true);
earlyEvilTwoPlayer.importPlayerData(earlyEvilTwo);
const midEvilPlayer = new Player(false, true);
midEvilPlayer.importPlayerData(midEvil);
const midEvilTwoPlayer = new Player(false, true);
midEvilTwoPlayer.importPlayerData(midEvilTwo);
const lateEvilPlayer = new Player(false, true);
lateEvilPlayer.importPlayerData(lateEvil);

const earlySadPlayer = new Player(false, true);
earlySadPlayer.importPlayerData(earlySad);

describe("GameMode Helper", () => {
    const cases: [string, Player, boolean[]][] = [
        ["Early Normal 1", earlyNormalPlayer, [true, false, false, false]],
        ["Late Normal", lateNormalPlayer, [true, false, false, false]],
        ["Early Evil 1", earlyEvilPlayer, [false, true, true, false]],
        ["Evil Return to Normal", evilReturnToNormalPlayer, [true, false, false, false]],
        ["Late Evil 1", lateEvilPlayer, [false, true, true, false]],
        ["Early Sad 1", earlySadPlayer, [false, false, true, true]],
    ];
    test.each(cases)("Game Mode - %s", (_name, player, expectedValues) => {
        let gameMode = getGameMode(player.get("gameMode"));
        expect(isNormalMode(gameMode)).toBe(expectedValues[0]);
        expect(isEvilMode(gameMode)).toBe(expectedValues[1]);
        expect(isAtLeastEvilMode(gameMode)).toBe(expectedValues[2]);
        expect(isSadMode(gameMode)).toBe(expectedValues[3]);
    });

    const cases2: [string, Player, boolean[]][] = [
        ["Early Normal 1", earlyNormalPlayer, [false, false, false, false, false, false, false, false, false, false]],
        ["Early Normal 2", earlyNormalTwoPlayer, [true, true, false, false, false, false, false, false, false, false]],
        ["Mid Normal 1", midNormalPlayer, [true, true, true, true, true, false, false, false, false, false]],
        ["Mid Normal 2", midNormalTwoPlayer, [true, true, true, true, true, true, false, false, false, false]],
        ["Late Normal", lateNormalPlayer, [true, true, true, true, true, true, false, false, false, false]],
        ["Early Evil 1", earlyEvilPlayer, [true, true, true, true, true, true, false, false, false, false]],
        [
            "Evil Return to Normal",
            evilReturnToNormalPlayer,
            [true, true, true, true, true, true, true, false, false, false],
        ],
        ["Early Evil 2", earlyEvilTwoPlayer, [true, true, true, true, true, true, true, false, false, false]],
        ["Mid Evil 1", midEvilPlayer, [true, true, true, true, true, true, true, true, false, false]],
        ["Mid Evil 2", midEvilTwoPlayer, [true, true, true, true, true, true, true, true, false, false]],
        ["Late Evil 1", lateEvilPlayer, [true, true, true, true, true, true, true, true, true, false]],
        ["Early Sad 1", earlySadPlayer, [true, true, true, true, true, true, true, true, true, false]],
    ];
    test.each(cases2)("%s - Wandoos Unlocked", (_name, player, expectedValues) => {
        expect(player.wandoosUnlocked()).toBe(expectedValues[0]);
    });
    test.each(cases2)("%s - Yggdrasil Unlocked", (_name, player, expectedValues) => {
        expect(player.yggUnlocked()).toBe(expectedValues[1]);
    });
    test.each(cases2)("%s - Diggers Unlocked", (_name, player, expectedValues) => {
        expect(player.diggersUnlocked()).toBe(expectedValues[2]);
    });
    test.each(cases2)("%s - Beards Unlocked", (_name, player, expectedValues) => {
        expect(player.beardsUnlocked()).toBe(expectedValues[3]);
    });
    test.each(cases2)("%s - MacGuffin Unlocked", (_name, player, expectedValues) => {
        expect(player.macguffinUnlocked()).toBe(expectedValues[4]);
    });
    test.each(cases2)("%s - Quests Unlocked", (_name, player, expectedValues) => {
        expect(player.questsUnlocked()).toBe(expectedValues[5]);
    });
    test.each(cases2)("%s - Hacks Unlocked", (_name, player, expectedValues) => {
        expect(player.hacksUnlocked()).toBe(expectedValues[6]);
    });
    test.each(cases2)("%s - Wishes Unlocked", (_name, player, expectedValues) => {
        expect(player.wishesUnlocked()).toBe(expectedValues[7]);
    });
    test.each(cases2)("%s - Cards Unlocked", (_name, player, expectedValues) => {
        expect(player.cardsUnlocked()).toBe(expectedValues[8]);
    });
    test.each(cases2)("%s - Cooking Unlocked", (_name, player, expectedValues) => {
        expect(player.cookingUnlocked()).toBe(expectedValues[9]);
    });
});
