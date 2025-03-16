import earlySad from "@/__data__/earlySad1";
import { Hack } from "@/assets/hacks";
import Player from "@/assets/player";
import { expectClose } from "@/helpers/testHelperFunctions";
const earlySadPlayer = new Player(false, true);
earlySadPlayer.importPlayerData(earlySad);

describe("Hack Asset", () => {
    describe("Early Sad", () => {
        const hacks: Hack[] = earlySadPlayer.get("hacks");
        const res3cap = earlySadPlayer.get("totalRes3Cap");
        const res3power = earlySadPlayer.get("totalRes3Power");
        const hackSpeed = earlySadPlayer.get("totalHackSpeed");

        // console.log(res3cap, res3power, hackSpeed);

        const statValues = [
            319058000, 2097.52, 2716.89, 11257.8, 3472.05, 2070.85, 2070.85, 5558, 465.01, 214.55, 265.98, 237908.68,
            460.32, 4448.73, 150.56,
        ];
        const lvlsPerMile = [8, 50, 50, 40, 20, 30, 30, 45, 45, 45, 75, 35, 22, 100, 50];
        const milestoneReached = [426, 75, 65, 84, 157, 107, 107, 67, 72, 63, 41, 74, 129, 30, 43];
        const timeToNextLevel = [
            60 * 1 + 42,
            53 * 60 + 43,
            60 * 1 + 54,
            4 * 60 + 39,
            60 + 34,
            6 * 60 + 55,
            6 * 60 + 55,
            2 * 60 + 51,
            35 * 60 + 18,
            3 * 60 + 19,
            46 * 60 + 29,
            60 + 50,
            34 * 60 + 1,
            4 * 60 * 60 + 42 * 60 + 18,
            6 * 60 + 8,
        ];
        test.each(hacks)("Hack %#", (hack) => {
            expectClose(hack.getStatValue(), statValues[hack.id]);

            expect(hack.levelsPerMilestone()).toBe(lvlsPerMile[hack.id]);
            expect(hack.getMilestone()).toBe(milestoneReached[hack.id]);
            expect(hack.getNextMilestoneLvl()).toBe((milestoneReached[hack.id] + 1) * lvlsPerMile[hack.id]);
            expect(hack.getLevelFromVal(statValues[hack.id])).toBe(hack.level);
            expect(hack.getMilestoneLevel()).toBe(lvlsPerMile[hack.id] * milestoneReached[hack.id]);
            if (hack.id == 13 || hack.id == 11) {
                expect(hack.getPreviousMilestoneLvl()).toBe(milestoneReached[hack.id] * lvlsPerMile[hack.id]);
            } else {
                expect(hack.getPreviousMilestoneLvl()).toBe((milestoneReached[hack.id] - 1) * lvlsPerMile[hack.id]);
            }

            expectClose(
                hack.getTimeBetweenLevels(res3cap, res3power, hackSpeed, hack.level + 1),
                timeToNextLevel[hack.id]
            );

            if (hack.id == 13) {
                statValues[hack.id] = 4362.35;
            }
            expectClose(hack.getStatAtMilestone(milestoneReached[hack.id]), statValues[hack.id]);
        });

        test("Hack Strings", () => {
            expect(hacks[0].getMilestoneReductionName()).toBe("hackMilestoneReductionStat");
            expect(hacks[1].getMilestoneExtraName()).toBe("hackMilestoneExtraAdventure");
            expect(hacks[2].getTargetName()).toBe("hackTimeMachineTarget");
        });

        // getMilestoneBonus

        // getMaxLevelHackDay(res3cap, res3pow, hackspeed)

        test("Hack Max", () => {
            expect(hacks[3].getMaxTimeHackDay()).toBe(2340);
        });
    });
});
