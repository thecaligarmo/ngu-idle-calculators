import { Stat } from "@/assets/stat";
import { nguInfo } from "@/helpers/resourceInfo";
import { expectClose } from "@/helpers/testHelperFunctions";

import earlyEvil from "@/__data__/earlyEvil1";
import earlyEvilTwo from "@/__data__/earlyEvil2";
import earlyNormalTwo from "@/__data__/earlyNormal2";
import earlySad from "@/__data__/earlySad1";
import lateEvil from "@/__data__/lateEvil1";
import lateNormal from "@/__data__/lateNormal";
import midEvil from "@/__data__/midEvil1";
import midEvilTwo from "@/__data__/midEvil2";
import midNormal from "@/__data__/midNormal1";
import midNormalTwo from "@/__data__/midNormal2";
import Player from "@/assets/player";
import { Yggdrasil } from "@/assets/yggdrasil";
import { toNum } from "@/helpers/numbers";
import bigDecimal from "js-big-decimal";

describe("Ygg Page Helper", () => {
    test("Early Normal 2", () => {
        const player = new Player(false, true);
        player.importPlayerData(earlyNormalTwo);
        const ygg: Yggdrasil[] = player.get("yggdrasil");
        const blueHeart: boolean = player.get("blueHeart");
        const seedModifier: bigDecimal = player.get("totalSeedGainBonus");
        const firstHarvest = toNum(player.get("firstHarvestPerk"));

        const fruitYieldData = {
            firstHarvest: firstHarvest,
            blueHeart: blueHeart,
            totalSeedGainBonus: seedModifier,
            yieldModifier: player.get("totalYggdrasilYieldBonus"),
            nguYgg: nguInfo(player, Stat.YGGDRASIL_YIELD),
            baseToughness: player.get("baseAdventureToughness"),
            expBonus: player.get("totalExpBonus"),
            fokSucksPerk: player.get("fruitOfKnowledgeSucks"),
            fokStillSucksPerk: player.get("fruitOfKnowledgeSTILLSucks"),
            apBonus: player.get("totalAPBonus"),
            ppBonus: player.get("totalPPBonus"),
            qpRewardBonus: player.get("totalQuestRewardBonus"),
            mayoSpeed: player.get("totalMayoSpeed"),
        };

        // Gold
        expect(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(47);
        expect(ygg[0].upgradeCost()).toBe(81);
        expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0);

        // PowerA
        expect(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(7);
        expect(ygg[1].upgradeCost()).toBe(90);
        expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Adventure
        expect(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(3);
        expect(ygg[2].upgradeCost()).toBe(100);
        expect(Number(ygg[2].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Pomegranate
        expect(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(11);
        expect(ygg[4].upgradeCost()).toBe(240);
        expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0);
    });

    test("Mid Normal 1", () => {
        const player = new Player(false, true);
        player.importPlayerData(midNormal);
        const ygg: Yggdrasil[] = player.get("yggdrasil");
        const blueHeart: boolean = player.get("blueHeart");
        const seedModifier: bigDecimal = player.get("totalSeedGainBonus");
        const firstHarvest = toNum(player.get("firstHarvestPerk"));

        const fruitYieldData = {
            firstHarvest: firstHarvest,
            blueHeart: blueHeart,
            totalSeedGainBonus: seedModifier,
            yieldModifier: player.get("totalYggdrasilYieldBonus"),
            nguYgg: nguInfo(player, Stat.YGGDRASIL_YIELD),
            baseToughness: player.get("baseAdventureToughness"),
            expBonus: player.get("totalExpBonus"),
            fokSucksPerk: player.get("fruitOfKnowledgeSucks"),
            fokStillSucksPerk: player.get("fruitOfKnowledgeSTILLSucks"),
            apBonus: player.get("totalAPBonus"),
            ppBonus: player.get("totalPPBonus"),
            qpRewardBonus: player.get("totalQuestRewardBonus"),
            mayoSpeed: player.get("totalMayoSpeed"),
        };
        // Gold
        expect(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(73);
        expect(ygg[0].upgradeCost()).toBe(121);
        expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0);

        // PowerA
        expect(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(14);
        expect(ygg[1].upgradeCost()).toBe(160);
        expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Adventure
        expect(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(14);
        expect(ygg[2].upgradeCost()).toBe(900);
        expect(Number(ygg[2].fruitYield(fruitYieldData).getValue())).toBe(77);

        // Knowledge
        expect(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(4);
        expect(ygg[3].upgradeCost()).toBe(360);
        expect(Number(ygg[3].fruitYield(fruitYieldData).getValue())).toBe(18);

        // Pomegranate
        expect(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(393);
        expect(ygg[4].upgradeCost()).toBe(4860);
        expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Luck
        expect(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(7);
        expect(ygg[5].upgradeCost()).toBe(1600);
        expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBe(0.25);
    });

    test("Mid Normal 2", () => {
        const player = new Player(false, true);
        player.importPlayerData(midNormalTwo);
        const ygg: Yggdrasil[] = player.get("yggdrasil");
        const blueHeart: boolean = player.get("blueHeart");
        const seedModifier: bigDecimal = player.get("totalSeedGainBonus");
        const firstHarvest = toNum(player.get("firstHarvestPerk"));

        const fruitYieldData = {
            firstHarvest: firstHarvest,
            blueHeart: blueHeart,
            totalSeedGainBonus: seedModifier,
            yieldModifier: player.get("totalYggdrasilYieldBonus"),
            nguYgg: nguInfo(player, Stat.YGGDRASIL_YIELD),
            baseToughness: player.get("baseAdventureToughness"),
            expBonus: player.get("totalExpBonus"),
            fokSucksPerk: player.get("fruitOfKnowledgeSucks"),
            fokStillSucksPerk: player.get("fruitOfKnowledgeSTILLSucks"),
            apBonus: player.get("totalAPBonus"),
            ppBonus: player.get("totalPPBonus"),
            qpRewardBonus: player.get("totalQuestRewardBonus"),
            mayoSpeed: player.get("totalMayoSpeed"),
        };
        // Seed calculations - Multiply by 1.3 since had already harvested apparently (Except gold/Pom)

        // Gold
        expect(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(3762);
        expect(ygg[0].upgradeCost()).toBe(0);
        expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0);

        // PowerA
        expect(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(383);
        expect(ygg[1].upgradeCost()).toBe(360);
        expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Adventure
        expect(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(192);
        expect(ygg[2].upgradeCost()).toBe(900);
        expect(Number(ygg[2].fruitYield(fruitYieldData).getValue())).toBe(449);

        // Knowledge
        expect(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(1005);
        expect(ygg[3].upgradeCost()).toBe(6760);
        expect(Number(ygg[3].fruitYield(fruitYieldData).getValue())).toBe(2039);

        // Pomegranate
        expect(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(28210);
        expect(ygg[4].upgradeCost()).toBe(0);
        expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Luck
        expect(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(96);
        expect(ygg[5].upgradeCost()).toBe(1600);
        expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBe(1.05);

        // PowerB
        expect(Number(ygg[6].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(48);
        expect(ygg[6].upgradeCost()).toBe(1350);
        expect(Number(ygg[6].fruitYield(fruitYieldData).getValue())).toBeCloseTo(1224.75);

        // Arbitrariness
        expect(Number(ygg[7].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(144);
        expect(ygg[7].upgradeCost()).toBe(1530);
        expect(Number(ygg[7].fruitYield(fruitYieldData).getValue())).toBe(91);
    });

    test("Late Normal", () => {
        const player = new Player(false, true);
        player.importPlayerData(lateNormal);
        const ygg: Yggdrasil[] = player.get("yggdrasil");
        const blueHeart: boolean = player.get("blueHeart");
        const seedModifier: bigDecimal = player.get("totalSeedGainBonus");
        const firstHarvest = toNum(player.get("firstHarvestPerk"));

        const fruitYieldData = {
            firstHarvest: firstHarvest,
            blueHeart: blueHeart,
            totalSeedGainBonus: seedModifier,
            yieldModifier: player.get("totalYggdrasilYieldBonus"),
            nguYgg: nguInfo(player, Stat.YGGDRASIL_YIELD),
            baseToughness: player.get("baseAdventureToughness"),
            expBonus: player.get("totalExpBonus"),
            fokSucksPerk: player.get("fruitOfKnowledgeSucks"),
            fokStillSucksPerk: player.get("fruitOfKnowledgeSTILLSucks"),
            apBonus: player.get("totalAPBonus"),
            ppBonus: player.get("totalPPBonus"),
            qpRewardBonus: player.get("totalQuestRewardBonus"),
            mayoSpeed: player.get("totalMayoSpeed"),
        };
        // Seed calculations - Multiply by 1.3 since had already harvested apparently (Except gold/Pom)

        // Gold
        expect(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(32781);
        expect(ygg[0].upgradeCost()).toBe(0);
        expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0);

        // PowerA
        expect(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(32781);
        expect(ygg[1].upgradeCost()).toBe(0);
        expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Adventure
        expect(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(16391);
        expect(ygg[2].upgradeCost()).toBe(0);
        expect(Number(ygg[2].fruitYield(fruitYieldData).getValue())).toBe(44139);

        // Knowledge
        expect(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(27044);
        expect(ygg[3].upgradeCost()).toBe(0);
        expect(Number(ygg[3].fruitYield(fruitYieldData).getValue())).toBe(4323912);

        // Pomegranate
        expect(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(270436);
        expect(ygg[4].upgradeCost()).toBe(0);
        expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Luck
        expect(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(27044);
        expect(ygg[5].upgradeCost()).toBe(0);
        expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBeCloseTo(189.35);

        // PowerB
        expect(Number(ygg[6].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(16391);
        expect(ygg[6].upgradeCost()).toBe(0);
        expect(Number(ygg[6].fruitYield(fruitYieldData).getValue())).toBeCloseTo(3027008.85);

        // Arbitrariness
        expect(Number(ygg[7].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(81131);
        expect(ygg[7].upgradeCost()).toBe(0);
        expect(Number(ygg[7].fruitYield(fruitYieldData).getValue())).toBe(7612);

        // Numbers
        expect(Number(ygg[8].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(22085);
        expect(ygg[8].upgradeCost()).toBe(45000);
        expect(Number(ygg[8].fruitYield(fruitYieldData).getValue())).toBeCloseTo(4810.22);

        // Rage
        // 1st Harvest doesn't count - So file will show  / 1.5
        expect(Number(ygg[9].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(42399);
        expect(ygg[9].upgradeCost()).toBe(288000);
        expect(Number(ygg[9].fruitYield(fruitYieldData).getValue())).toBe(19152704);
    });

    test("Early Evil 1", () => {
        const player = new Player(false, true);
        player.importPlayerData(earlyEvil);
        const ygg: Yggdrasil[] = player.get("yggdrasil");
        const blueHeart: boolean = player.get("blueHeart");
        const seedModifier: bigDecimal = player.get("totalSeedGainBonus");
        const firstHarvest = toNum(player.get("firstHarvestPerk"));

        const fruitYieldData = {
            firstHarvest: firstHarvest,
            blueHeart: blueHeart,
            totalSeedGainBonus: seedModifier,
            yieldModifier: player.get("totalYggdrasilYieldBonus"),
            nguYgg: nguInfo(player, Stat.YGGDRASIL_YIELD),
            baseToughness: player.get("baseAdventureToughness"),
            expBonus: player.get("totalExpBonus"),
            fokSucksPerk: player.get("fruitOfKnowledgeSucks"),
            fokStillSucksPerk: player.get("fruitOfKnowledgeSTILLSucks"),
            apBonus: player.get("totalAPBonus"),
            ppBonus: player.get("totalPPBonus"),
            qpRewardBonus: player.get("totalQuestRewardBonus"),
            mayoSpeed: player.get("totalMayoSpeed"),
        };
        // Seed calculations - Multiply by 1.3 since had already harvested apparently (Except gold/Pom)

        // Gold
        expect(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(53161);
        expect(ygg[0].upgradeCost()).toBe(0);
        expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0);

        // PowerA
        expect(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(53161);
        expect(ygg[1].upgradeCost()).toBe(0);
        expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Adventure
        expect(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(43858);
        expect(ygg[2].upgradeCost()).toBe(0);
        expectClose(Number(ygg[2].fruitYield(fruitYieldData).getValue()), 164887, 1);

        // Knowledge
        expect(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(43858);
        expect(ygg[3].upgradeCost()).toBe(0);
        expect(Number(ygg[3].fruitYield(fruitYieldData).getValue())).toBe(6896252);

        // Pomegranate
        expectClose(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 438577, 1);
        expect(ygg[4].upgradeCost()).toBe(0);
        expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Luck
        expect(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(43858);
        expect(ygg[5].upgradeCost()).toBe(0);
        expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBeCloseTo(307.05);

        // PowerB
        expect(Number(ygg[6].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(26581);
        expect(ygg[6].upgradeCost()).toBe(0);
        expect(Number(ygg[6].fruitYield(fruitYieldData).getValue())).toBeCloseTo(53805115.65);

        // Arbitrariness
        expectClose(Number(ygg[7].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 131574, 1);
        expect(ygg[7].upgradeCost()).toBe(0);
        expect(Number(ygg[7].fruitYield(fruitYieldData).getValue())).toBe(8130);

        // Numbers
        expect(Number(ygg[8].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(79741);
        expect(ygg[8].upgradeCost()).toBe(0);
        expect(Number(ygg[8].fruitYield(fruitYieldData).getValue())).toBeCloseTo(44938.24);

        // Rage
        expect(Number(ygg[9].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(219287);
        expect(ygg[9].upgradeCost()).toBe(0);
        expectClose(Number(ygg[9].fruitYield(fruitYieldData).getValue()), 260370256, 4);

        // Macguffin A
        expect(Number(ygg[10].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(56765);
        expect(ygg[10].upgradeCost()).toBe(2.535e6);
        expect(Number(ygg[10].fruitYield(fruitYieldData).getValue())).toBe(32);

        // PowerD
        expect(Number(ygg[11].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(9461);
        expect(ygg[11].upgradeCost()).toBe(480000);
        expect(Number(ygg[11].fruitYield(fruitYieldData).getValue())).toBeCloseTo(6.86);

        // Watermelon
        expect(Number(ygg[12].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(364915);
        expect(ygg[12].upgradeCost()).toBe(5e6);
        expect(Number(ygg[12].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Macguffin B
        expect(Number(ygg[13].seedYield(seedModifier, firstHarvest, blueHeart).getValue())).toBe(5407);
        expect(ygg[13].upgradeCost()).toBe(900000);
        expect(Number(ygg[13].fruitYield(fruitYieldData).getValue())).toBe(1);
    });

    test("Early Evil 2", () => {
        const player = new Player(false, true);
        player.importPlayerData(earlyEvilTwo);
        const ygg: Yggdrasil[] = player.get("yggdrasil");
        const blueHeart: boolean = player.get("blueHeart");
        const seedModifier: bigDecimal = player.get("totalSeedGainBonus");
        const firstHarvest = toNum(player.get("firstHarvestPerk"));

        const fruitYieldData = {
            firstHarvest: firstHarvest,
            blueHeart: blueHeart,
            totalSeedGainBonus: seedModifier,
            yieldModifier: player.get("totalYggdrasilYieldBonus"),
            nguYgg: nguInfo(player, Stat.YGGDRASIL_YIELD),
            baseToughness: player.get("baseAdventureToughness"),
            expBonus: player.get("totalExpBonus"),
            fokSucksPerk: player.get("fruitOfKnowledgeSucks"),
            fokStillSucksPerk: player.get("fruitOfKnowledgeSTILLSucks"),
            apBonus: player.get("totalAPBonus"),
            ppBonus: player.get("totalPPBonus"),
            qpRewardBonus: player.get("totalQuestRewardBonus"),
            mayoSpeed: player.get("totalMayoSpeed"),
        };
        // Seed calculations - Multiply by 1.3 since had already harvested apparently (Except gold/Pom)

        // Gold
        expectClose(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 108876, 1);
        expect(ygg[0].upgradeCost()).toBe(0);
        expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0);

        // PowerA
        expectClose(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 108876, 1);
        expect(ygg[1].upgradeCost()).toBe(0);
        expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Adventure
        expectClose(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 54438, 1);
        expect(ygg[2].upgradeCost()).toBe(0);
        expectClose(Number(ygg[2].fruitYield(fruitYieldData).getValue()), 155773, 1);

        // Knowledge
        expectClose(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 89823, 1);
        expect(ygg[3].upgradeCost()).toBe(0);
        expect(Number(ygg[3].fruitYield(fruitYieldData).getValue())).toBe(12531734);

        // Pomegranate
        expectClose(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 544380, 2);
        expect(ygg[4].upgradeCost()).toBe(0);
        expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Luck
        expectClose(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 89823, 1);
        expect(ygg[5].upgradeCost()).toBe(0);
        expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBeCloseTo(405.7, 1);

        // PowerB
        expectClose(Number(ygg[6].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 54438, 1);
        expect(ygg[6].upgradeCost()).toBe(0);
        expect(Number(ygg[6].fruitYield(fruitYieldData).getValue())).toBeCloseTo(155526123.75);

        // Arbitrariness
        expectClose(Number(ygg[7].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 269468, 2);
        expect(ygg[7].upgradeCost()).toBe(0);
        expect(Number(ygg[7].fruitYield(fruitYieldData).getValue())).toBe(8209);

        // Numbers
        expectClose(Number(ygg[8].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 163314, 2);
        expect(ygg[8].upgradeCost()).toBe(0);
        expect(Number(ygg[8].fruitYield(fruitYieldData).getValue())).toBeCloseTo(78548.35);

        // Rage
        expectClose(Number(ygg[9].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 449113, 2);
        expect(ygg[9].upgradeCost()).toBe(0);
        expectClose(Number(ygg[9].fruitYield(fruitYieldData).getValue()), 438570688, 5);

        // Macguffin A
        expectClose(Number(ygg[10].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 116258, 2);
        expect(ygg[10].upgradeCost()).toBe(2.535e6);
        expect(Number(ygg[10].fruitYield(fruitYieldData).getValue())).toBe(32);

        // PowerD
        expectClose(Number(ygg[11].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 19377, 2);
        expect(ygg[11].upgradeCost()).toBe(480000);
        expect(Number(ygg[11].fruitYield(fruitYieldData).getValue())).toBeCloseTo(11.94);

        // Watermelon
        expectClose(Number(ygg[12].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 3516781, 3);
        expect(ygg[12].upgradeCost()).toBe(1.805e7);
        expect(Number(ygg[12].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Macguffin B
        expectClose(Number(ygg[13].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 22145, 2);
        expect(ygg[13].upgradeCost()).toBe(1.6e6);
        expect(Number(ygg[13].fruitYield(fruitYieldData).getValue())).toBe(1);

        // Quirks
        expectClose(Number(ygg[14].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 37300, 2);
        expect(ygg[14].upgradeCost()).toBe(1.6e6);
        expect(Number(ygg[14].fruitYield(fruitYieldData).getValue())).toBe(85);
    });

    test("Mid Evil 1", () => {
        const player = new Player(false, true);
        player.importPlayerData(midEvil);
        const ygg: Yggdrasil[] = player.get("yggdrasil");
        const blueHeart: boolean = player.get("blueHeart");
        const seedModifier: bigDecimal = player.get("totalSeedGainBonus");
        const firstHarvest = toNum(player.get("firstHarvestPerk"));

        const fruitYieldData = {
            firstHarvest: firstHarvest,
            blueHeart: blueHeart,
            totalSeedGainBonus: seedModifier,
            yieldModifier: player.get("totalYggdrasilYieldBonus"),
            nguYgg: nguInfo(player, Stat.YGGDRASIL_YIELD),
            baseToughness: player.get("baseAdventureToughness"),
            expBonus: player.get("totalExpBonus"),
            fokSucksPerk: player.get("fruitOfKnowledgeSucks"),
            fokStillSucksPerk: player.get("fruitOfKnowledgeSTILLSucks"),
            apBonus: player.get("totalAPBonus"),
            ppBonus: player.get("totalPPBonus"),
            qpRewardBonus: player.get("totalQuestRewardBonus"),
            mayoSpeed: player.get("totalMayoSpeed"),
        };
        // Seed calculations - Multiply by 1.3 since had already harvested apparently (Except gold/Pom)

        // Gold
        expectClose(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 38264, 1);
        expect(ygg[0].upgradeCost()).toBe(0);
        // expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0)

        // PowerA
        expectClose(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 76528, 1);
        expect(ygg[1].upgradeCost()).toBe(0);
        expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Adventure
        expectClose(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 63136, 1);
        expect(ygg[2].upgradeCost()).toBe(0);
        expectClose(Number(ygg[2].fruitYield(fruitYieldData).getValue()), 403930, 2);

        // Knowledge
        expectClose(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 63136, 1);
        expect(ygg[3].upgradeCost()).toBe(0);
        expectClose(Number(ygg[3].fruitYield(fruitYieldData).getValue()), 22127056);

        // Pomegranate
        expectClose(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 631352, 2);
        expect(ygg[4].upgradeCost()).toBe(0);
        expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Luck
        expectClose(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 63136, 1);
        expect(ygg[5].upgradeCost()).toBe(0);
        expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBeCloseTo(491.1, 0);

        // PowerB
        expectClose(Number(ygg[6].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 38264, 1);
        expect(ygg[6].upgradeCost()).toBe(0);
        expectClose(Number(ygg[6].fruitYield(fruitYieldData).getValue()), 376659168, 5);

        // Arbitrariness
        expectClose(Number(ygg[7].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 189406, 2);
        expect(ygg[7].upgradeCost()).toBe(0);
        expect(Number(ygg[7].fruitYield(fruitYieldData).getValue())).toBe(8373);

        // Numbers
        expectClose(Number(ygg[8].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 114792, 2);
        expect(ygg[8].upgradeCost()).toBe(0);
        expectClose(Number(ygg[8].fruitYield(fruitYieldData).getValue()), 115530.04, 2);

        // Rage
        expectClose(Number(ygg[9].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 315676, 2);
        expect(ygg[9].upgradeCost()).toBe(0);
        expectClose(Number(ygg[9].fruitYield(fruitYieldData).getValue()), 680726272, 5);

        // Macguffin A
        expectClose(Number(ygg[10].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 378812, 2);
        expect(ygg[10].upgradeCost()).toBe(0);
        expect(Number(ygg[10].fruitYield(fruitYieldData).getValue())).toBe(147);

        // PowerD
        expectClose(Number(ygg[11].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 34049, 2);
        expect(ygg[11].upgradeCost()).toBe(1.47e6);
        expect(Number(ygg[11].fruitYield(fruitYieldData).getValue())).toBeCloseTo(47.43);

        // Watermelon
        expectClose(Number(ygg[12].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 3788111, 3);
        expect(ygg[12].upgradeCost()).toBe(0);
        expect(Number(ygg[12].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Macguffin B
        expectClose(Number(ygg[13].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 51365, 2);
        expect(ygg[13].upgradeCost()).toBe(3.6e6);
        expect(Number(ygg[13].fruitYield(fruitYieldData).getValue())).toBe(3);

        // Quirks
        expectClose(Number(ygg[14].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 89888, 2);
        expect(ygg[14].upgradeCost()).toBe(0);
        expect(Number(ygg[14].fruitYield(fruitYieldData).getValue())).toBe(375);
    });

    test("Mid Evil 2", () => {
        const player = new Player(false, true);
        player.importPlayerData(midEvilTwo);
        const ygg: Yggdrasil[] = player.get("yggdrasil");
        const blueHeart: boolean = player.get("blueHeart");
        const seedModifier: bigDecimal = player.get("totalSeedGainBonus");
        const firstHarvest = toNum(player.get("firstHarvestPerk"));

        const fruitYieldData = {
            firstHarvest: firstHarvest,
            blueHeart: blueHeart,
            totalSeedGainBonus: seedModifier,
            yieldModifier: player.get("totalYggdrasilYieldBonus"),
            nguYgg: nguInfo(player, Stat.YGGDRASIL_YIELD),
            baseToughness: player.get("baseAdventureToughness"),
            expBonus: player.get("totalExpBonus"),
            fokSucksPerk: player.get("fruitOfKnowledgeSucks"),
            fokStillSucksPerk: player.get("fruitOfKnowledgeSTILLSucks"),
            apBonus: player.get("totalAPBonus"),
            ppBonus: player.get("totalPPBonus"),
            qpRewardBonus: player.get("totalQuestRewardBonus"),
            mayoSpeed: player.get("totalMayoSpeed"),
        };

        // Gold
        expectClose(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 72127, 1);
        expect(ygg[0].upgradeCost()).toBe(0);
        // expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0)

        // PowerA
        expectClose(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 144254, 1);
        expect(ygg[1].upgradeCost()).toBe(0);
        expect(Number(ygg[1].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Adventure
        expectClose(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 119010, 1);
        expect(ygg[2].upgradeCost()).toBe(0);
        expectClose(Number(ygg[2].fruitYield(fruitYieldData).getValue()), 772506, 2);

        // Knowledge
        expectClose(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 119010, 1);
        expect(ygg[3].upgradeCost()).toBe(0);
        expectClose(Number(ygg[3].fruitYield(fruitYieldData).getValue()), 1.875e8);

        // Pomegranate
        expectClose(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 721268, 2);
        expect(ygg[4].upgradeCost()).toBe(0);
        expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Luck
        expectClose(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 119010, 1);
        expect(ygg[5].upgradeCost()).toBe(0);
        expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBeCloseTo(763.35, 0);

        // PowerB
        expectClose(Number(ygg[6].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 72127, 1);
        expect(ygg[6].upgradeCost()).toBe(0);
        expectClose(Number(ygg[6].fruitYield(fruitYieldData).getValue()), 1040427172.05);

        // Arbitrariness
        expectClose(Number(ygg[7].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 357028, 2);
        expect(ygg[7].upgradeCost()).toBe(0);
        expect(Number(ygg[7].fruitYield(fruitYieldData).getValue())).toBe(8394);

        // Numbers
        expectClose(Number(ygg[8].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 216381, 2);
        expect(ygg[8].upgradeCost()).toBe(0);
        expectClose(Number(ygg[8].fruitYield(fruitYieldData).getValue()), 212119.47, 2);

        // Rage
        expectClose(Number(ygg[9].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 595046, 2);
        expect(ygg[9].upgradeCost()).toBe(0);
        expectClose(Number(ygg[9].fruitYield(fruitYieldData).getValue()), 8122348544);

        // Macguffin A
        expectClose(Number(ygg[10].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 714055, 2);
        expect(ygg[10].upgradeCost()).toBe(0);
        expect(Number(ygg[10].fruitYield(fruitYieldData).getValue())).toBe(174);

        // PowerD
        expectClose(Number(ygg[11].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 444986, 2);
        expect(ygg[11].upgradeCost()).toBe(1.587e7);
        expectClose(Number(ygg[11].fruitYield(fruitYieldData).getValue()), 812.25);

        // Watermelon
        expectClose(Number(ygg[12].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 4327605, 3);
        expect(ygg[12].upgradeCost()).toBe(0);
        expect(Number(ygg[12].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Macguffin B
        expectClose(Number(ygg[13].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 952074, 2);
        expect(ygg[13].upgradeCost()).toBe(0);
        expect(Number(ygg[13].fruitYield(fruitYieldData).getValue())).toBe(35);

        // Quirks
        expectClose(Number(ygg[14].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 169437, 2);
        expect(ygg[14].upgradeCost()).toBe(0);
        expect(Number(ygg[14].fruitYield(fruitYieldData).getValue())).toBe(911);
    });

    test("Late Evil 1", () => {
        const player = new Player(false, true);
        player.importPlayerData(lateEvil);
        const ygg: Yggdrasil[] = player.get("yggdrasil");
        const blueHeart: boolean = player.get("blueHeart");
        const seedModifier: bigDecimal = player.get("totalSeedGainBonus");
        const firstHarvest = toNum(player.get("firstHarvestPerk"));

        const fruitYieldData = {
            firstHarvest: firstHarvest,
            blueHeart: blueHeart,
            totalSeedGainBonus: seedModifier,
            yieldModifier: player.get("totalYggdrasilYieldBonus"),
            nguYgg: nguInfo(player, Stat.YGGDRASIL_YIELD),
            baseToughness: player.get("baseAdventureToughness"),
            expBonus: player.get("totalExpBonus"),
            fokSucksPerk: player.get("fruitOfKnowledgeSucks"),
            fokStillSucksPerk: player.get("fruitOfKnowledgeSTILLSucks"),
            apBonus: player.get("totalAPBonus"),
            ppBonus: player.get("totalPPBonus"),
            qpRewardBonus: player.get("totalQuestRewardBonus"),
            mayoSpeed: player.get("totalMayoSpeed"),
        };

        // Gold
        expectClose(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 98350, 1);
        expect(ygg[0].upgradeCost()).toBe(0);
        // expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0)

        // PowerA
        expectClose(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 98350, 1);
        expect(ygg[1].upgradeCost()).toBe(0);
        expectClose(Number(ygg[1].fruitYield(fruitYieldData).getValue()), 1.681e8 / 100);

        // Adventure
        expectClose(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 162277, 1);
        expect(ygg[2].upgradeCost()).toBe(0);
        expectClose(Number(ygg[2].fruitYield(fruitYieldData).getValue()), 928534, 2);

        // Knowledge
        expectClose(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 162277, 1);
        expect(ygg[3].upgradeCost()).toBe(0);
        expectClose(Number(ygg[3].fruitYield(fruitYieldData).getValue()), 1.201e8);

        // Pomegranate
        expectClose(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 983494, 2);
        expect(ygg[4].upgradeCost()).toBe(0);
        expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Luck
        expectClose(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 162277, 1);
        expect(ygg[5].upgradeCost()).toBe(0);
        expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBeCloseTo(816.5, 0);

        // PowerB
        expectClose(Number(ygg[6].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 98350, 1);
        expect(ygg[6].upgradeCost()).toBe(0);
        expectClose(Number(ygg[6].fruitYield(fruitYieldData).getValue()), 1500842010.8);

        // Arbitrariness
        expectClose(Number(ygg[7].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 486830, 2);
        expect(ygg[7].upgradeCost()).toBe(0);
        expect(Number(ygg[7].fruitYield(fruitYieldData).getValue())).toBe(8394);

        // Numbers
        expectClose(Number(ygg[8].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 295049, 2);
        expect(ygg[8].upgradeCost()).toBe(0);
        expectClose(Number(ygg[8].fruitYield(fruitYieldData).getValue()), 247681.26, 2);

        // Rage
        expectClose(Number(ygg[9].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 811383, 2);
        expect(ygg[9].upgradeCost()).toBe(0);
        expectClose(Number(ygg[9].fruitYield(fruitYieldData).getValue()), 18820003840);

        // Macguffin A
        expectClose(Number(ygg[10].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 973659, 2);
        expect(ygg[10].upgradeCost()).toBe(0);
        expect(Number(ygg[10].fruitYield(fruitYieldData).getValue())).toBe(168);

        // PowerD
        expectClose(Number(ygg[11].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 688446, 2);
        expect(ygg[11].upgradeCost()).toBe(0);
        expectClose(Number(ygg[11].fruitYield(fruitYieldData).getValue()), 1213.81);

        // Watermelon
        expectClose(Number(ygg[12].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 9736590, 3);
        expect(ygg[12].upgradeCost()).toBe(0);
        expect(Number(ygg[12].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Macguffin B
        expectClose(Number(ygg[13].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 1.298e6);
        expect(ygg[13].upgradeCost()).toBe(0);
        expect(Number(ygg[13].fruitYield(fruitYieldData).getValue())).toBe(34);

        // Quirks
        expectClose(Number(ygg[14].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 231038, 2);
        expect(ygg[14].upgradeCost()).toBe(0);
        expect(Number(ygg[14].fruitYield(fruitYieldData).getValue())).toBe(1240);

        // Angry Mayo
        expect(ygg[15].upgradeCost()).toBe(3.025e7);

        // Sad Mayo
        expect(ygg[16].upgradeCost()).toBe(2.025e7);

        // Moldy Mayo
        expect(ygg[17].upgradeCost()).toBe(2.025e7);

        // Ayy Mayo
        expect(ygg[18].upgradeCost()).toBe(2.5e7);

        // Cinco Mayo
        expect(ygg[19].upgradeCost()).toBe(2.5e7);

        // Pretty Mayo
        expect(ygg[20].upgradeCost()).toBe(2.5e7);
    });

    test("Early Sad 1", () => {
        const player = new Player(false, true);
        player.importPlayerData(earlySad);
        const ygg: Yggdrasil[] = player.get("yggdrasil");
        const blueHeart: boolean = player.get("blueHeart");
        const seedModifier: bigDecimal = player.get("totalSeedGainBonus");
        const firstHarvest = toNum(player.get("firstHarvestPerk"));

        const fruitYieldData = {
            firstHarvest: firstHarvest,
            blueHeart: blueHeart,
            totalSeedGainBonus: seedModifier,
            yieldModifier: player.get("totalYggdrasilYieldBonus"),
            nguYgg: nguInfo(player, Stat.YGGDRASIL_YIELD),
            baseToughness: player.get("baseAdventureToughness"),
            expBonus: player.get("totalExpBonus"),
            fokSucksPerk: player.get("fruitOfKnowledgeSucks"),
            fokStillSucksPerk: player.get("fruitOfKnowledgeSTILLSucks"),
            apBonus: player.get("totalAPBonus"),
            ppBonus: player.get("totalPPBonus"),
            qpRewardBonus: player.get("totalQuestRewardBonus"),
            mayoSpeed: player.get("totalMayoSpeed"),
        };

        // Gold
        expectClose(Number(ygg[0].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 74395, 1);
        expect(ygg[0].upgradeCost()).toBe(0);
        // expect(Number(ygg[0].fruitYield(fruitYieldData).getValue())).toBe(0)

        // PowerA
        expectClose(Number(ygg[1].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 74395, 1);
        expect(ygg[1].upgradeCost()).toBe(0);
        expectClose(Number(ygg[1].fruitYield(fruitYieldData).getValue()), 2.926e8 / 100);

        // Adventure
        expectClose(Number(ygg[2].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 122752, 1);
        expect(ygg[2].upgradeCost()).toBe(0);
        expectClose(Number(ygg[2].fruitYield(fruitYieldData).getValue()), 2.163e6);

        // Knowledge
        expectClose(Number(ygg[3].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 122752, 1);
        expect(ygg[3].upgradeCost()).toBe(0);
        expectClose(Number(ygg[3].fruitYield(fruitYieldData).getValue()), 1.059e9);

        // Pomegranate
        expectClose(Number(ygg[4].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 743948, 2);
        expect(ygg[4].upgradeCost()).toBe(0);
        expect(Number(ygg[4].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Luck
        expectClose(Number(ygg[5].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 122752, 1);
        expect(ygg[5].upgradeCost()).toBe(0);
        expect(Number(ygg[5].fruitYield(fruitYieldData).getValue())).toBeCloseTo(1181.49, 0);

        // PowerB
        expectClose(Number(ygg[6].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 74395, 1);
        expect(ygg[6].upgradeCost()).toBe(0);
        expectClose(Number(ygg[6].fruitYield(fruitYieldData).getValue()), 4111683079.15);

        // Arbitrariness
        expectClose(Number(ygg[7].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 368255, 2);
        expect(ygg[7].upgradeCost()).toBe(0);
        expect(Number(ygg[7].fruitYield(fruitYieldData).getValue())).toBe(8426);

        // Numbers
        expectClose(Number(ygg[8].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 223185, 2);
        expect(ygg[8].upgradeCost()).toBe(0);
        expectClose(Number(ygg[8].fruitYield(fruitYieldData).getValue()), 432853.35, 2);

        // Rage
        expectClose(Number(ygg[9].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 613757, 2);
        expect(ygg[9].upgradeCost()).toBe(0);
        expectClose(Number(ygg[9].fruitYield(fruitYieldData).getValue()), 52860538880);

        // Macguffin A
        expectClose(Number(ygg[10].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 736509, 2);
        expect(ygg[10].upgradeCost()).toBe(0);
        expect(Number(ygg[10].fruitYield(fruitYieldData).getValue())).toBe(161);

        // PowerD
        expectClose(Number(ygg[11].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 520764, 2);
        expect(ygg[11].upgradeCost()).toBe(0);
        expectClose(Number(ygg[11].fruitYield(fruitYieldData).getValue()), 2375.62);

        // Watermelon
        expectClose(Number(ygg[12].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 7365084, 3);
        expect(ygg[12].upgradeCost()).toBe(0);
        expect(Number(ygg[12].fruitYield(fruitYieldData).getValue())).toBe(0);

        // Macguffin B
        expectClose(Number(ygg[13].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 982012);
        expect(ygg[13].upgradeCost()).toBe(0);
        expect(Number(ygg[13].fruitYield(fruitYieldData).getValue())).toBe(33);

        // Quirks
        expectClose(Number(ygg[14].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 174765, 2);
        expect(ygg[14].upgradeCost()).toBe(0);
        expect(Number(ygg[14].fruitYield(fruitYieldData).getValue())).toBe(2236);

        // Angry Mayo
        expectClose(Number(ygg[15].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 119789, 2);
        expect(ygg[15].upgradeCost()).toBe(6.4e7);
        expect(Number(ygg[15].fruitYield(fruitYieldData).getValue())).toBeCloseTo(0.57);

        // Sad Mayo
        expectClose(Number(ygg[16].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 119789, 2);
        expect(ygg[16].upgradeCost()).toBe(6.4e7);
        expect(Number(ygg[16].fruitYield(fruitYieldData).getValue())).toBeCloseTo(0.57, 2);

        // Moldy Mayo
        expectClose(Number(ygg[17].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 119789, 2);
        expect(ygg[17].upgradeCost()).toBe(6.4e7);
        expect(Number(ygg[17].fruitYield(fruitYieldData).getValue())).toBeCloseTo(0.57, 2);

        // Ayy Mayo
        expectClose(Number(ygg[18].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 132398, 2);
        expect(ygg[18].upgradeCost()).toBe(7.225e7);
        expect(Number(ygg[18].fruitYield(fruitYieldData).getValue())).toBeCloseTo(0.61, 2);

        // Cinco Mayo
        expectClose(Number(ygg[19].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 132398, 2);
        expect(ygg[19].upgradeCost()).toBe(7.225e7);
        expect(Number(ygg[19].fruitYield(fruitYieldData).getValue())).toBeCloseTo(0.61, 2);

        // Pretty Mayo
        expectClose(Number(ygg[20].seedYield(seedModifier, firstHarvest, blueHeart).getValue()), 132398, 2);
        expect(ygg[20].upgradeCost()).toBe(7.225e7);
        expect(Number(ygg[20].fruitYield(fruitYieldData).getValue())).toBeCloseTo(0.61, 2);
    });
});
