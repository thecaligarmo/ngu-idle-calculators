import { AttackStat, Enemy, ENEMY_TYPE, Titans } from "@/assets/enemy";
import { bd, toNum } from "@/helpers/numbers";

describe("Enemy Asset", () => {
    const att1 = new AttackStat(1, bd(1), bd(1), bd(1), bd(1));
    const att2 = new AttackStat(1, bd(2), bd(2), bd(2), bd(2));
    const att3 = new AttackStat(1, bd(3001), bd(2501), bd(1), bd(1));
    const att4 = new AttackStat(1, bd(9.1e31), bd(3.1e31), bd(6.1e29), bd(1));
    test("Attack Stat", () => {
        expect(att1.isWeaker(att2)).toBeTruthy();
        expect(att2.isWeaker(att1)).toBeFalsy();
        expect(toNum(att1.oneHitPower())).toBe(7 / 4);
    });
    const ene1 = new Enemy(0, "test", "Test", ENEMY_TYPE.NORMAL, att1, false);
    // const ene2 = new Enemy(0, "test", "Test", ENEMY_TYPE.NORMAL, att2, true);
    test("Enemy", () => {
        expect(ene1.attackRate()).toBe(att1.attackRate);
        expect(ene1.power()).toBe(att1.power);
        expect(ene1.toughness()).toBe(att1.toughness);
        expect(ene1.regen()).toBe(att1.regen);
        expect(ene1.hp()).toBe(att1.hp);
        expect(toNum(ene1.oneHitPower())).toBe(toNum(att1.oneHitPower()));
        expect(toNum(ene1.numHitsToKill(bd(1)))).toBe(2);
        expect(toNum(ene1.numHitsToKill(bd(2)))).toBe(1);
    });

    test("Titan 1", () => {
        const titan1 = Titans.GORDON_RAMSEY;
        expect(titan1.getFullName()).toBe("Gordon Ramsay Bolton");
        expect(titan1.getFullKey()).toBe("gordonRamsayBolton");
        expect(titan1.canAutoKill(att1)).toBeFalsy();
        expect(titan1.canAutoKill(att3)).toBeTruthy();
        expect(toNum(titan1.getAP())).toBe(0.1);
        expect(toNum(titan1.getEXP())).toBe(0.35);
        expect(toNum(titan1.getPP())).toBe(0);
        expect(toNum(titan1.getQP([]))).toBe(0);
        expect(titan1.getQPWishNum()).toBe(0);
        expect(toNum(titan1.getRespawnTime(0))).toBe(1);
    });
    test("Titan 2", () => {
        const titan2 = Titans.ROCK_LOBSTER;
        expect(titan2.getFullName(2)).toBe("Rock Lobster v3");
        expect(titan2.getFullKey(2)).toBe("rockLobsterv3");
        expect(titan2.canAutoKill(att1, 2)).toBeFalsy();
        expect(titan2.canAutoKill(att1, 2, 7)).toBeTruthy();
        expect(titan2.canAutoKill(att4, 1)).toBeTruthy();
        expect(titan2.canAutoKill(att4, 1, 1)).toBeTruthy();
        expect(toNum(titan2.getAP())).toBe(0);
        expect(toNum(titan2.getEXP())).toBe(60);
        expect(toNum(titan2.getPP())).toBe(7000);
        expect(toNum(titan2.getQP([]))).toBe(0);
        expect(titan2.getQPWishNum()).toBe(187);
        expect(toNum(titan2.getRespawnTime(0))).toBe(7);
        expect(toNum(titan2.getRespawnTime(20))).toBe(2);
    });
});
