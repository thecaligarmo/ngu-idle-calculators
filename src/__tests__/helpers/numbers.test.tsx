import {
    bd,
    bigdec_equals,
    bigdec_max,
    bigdec_min,
    bigdec_power,
    bigdec_round,
    dn,
    greaterThan,
    greaterThanOrEqual,
    isOne,
    isZero,
    lessThan,
    lessThanOrEqual,
    pn,
} from "@/helpers/numbers";
import bigDecimal from "js-big-decimal";

describe("Numbers Helper", () => {
    test("Max of Big Decimal", () => {
        const one = bd(1);
        const pi = bd(3.1415926);
        const four = bd(4);
        const minus = bd(-1);
        const max = bigdec_max(one, pi, four, minus);
        expect(max.getValue()).toBe("4");
    });

    test("Min of Big Decimal", () => {
        const one = bd(1);
        const pi = bd(3.1415926);
        const four = bd(4);
        const minus = bd(-1);
        const min = bigdec_min(one, pi, four, minus);
        expect(min.getValue()).toBe("-1");
    });

    test("Max and min failures", () => {
        expect(() => bigdec_max()).toThrow("Max of empty list");
        expect(() => bigdec_min()).toThrow("Min of empty list");
    });

    test("Ensure we get big decimals", () => {
        const one = bd(1);
        const thousand = bd("1e3");
        const decimal = bd("3.1415926535");
        expect(one.getValue()).toBe("1");
        expect(thousand.getValue()).toBe("1000");
        expect(decimal.getValue()).toBe("3.1415926535");
    });

    describe("Rounding of big decimals", () => {
        test("Rounding of big decimals", () => {
            const decimal = bd("3.1415926535");
            expect(decimal.round(2, bigDecimal.RoundingModes.CEILING).getValue()).toBe("3.15");
        });

        test.each([
            [bd(1.3), bd(0.2), bd(1.4)],
            [bd(1.75), bd(0.3), bd(1.8)],
            [bd(22), bd(5), bd(20)],
        ])("Rounding of big decimals - %#", (num, precision, expected) => {
            expect(bigdec_round(num, precision).compareTo(expected)).toBe(0);
        });
    });

    test("Equality of big decimals", () => {
        const numOne = bd(1);
        const numTwo = bd(2);
        const numThree = bd(1);
        expect(bigdec_equals(numOne, numTwo)).toBeFalsy();
        expect(bigdec_equals(numOne, numThree)).toBeTruthy();
    });

    test("Powers of big decimals", () => {
        const numOne = bd(2);
        const numTwo = bd(3);
        const numThree = bd(4);
        expect(bigdec_power(numOne, numTwo).compareTo(bd(8))).toBe(0);
        expect(bigdec_power(numTwo, numThree).compareTo(bd(3 ** 4))).toBe(0);
    });

    test("Big Decimals Is Zero", () => {
        expect(isZero(bd(0))).toBeTruthy();
        expect(isZero(bd(1))).toBeFalsy();
        expect(isZero(bd(-1))).toBeFalsy();
    });

    test("Big Decimals Is One", () => {
        expect(isOne(bd(0))).toBeFalsy();
        expect(isOne(bd(1))).toBeTruthy();
        expect(isOne(bd(-1))).toBeFalsy();
    });

    describe("Inequalities", () => {
        const numOne = bd(1);
        const numTwo = bd(2);
        const numThree = bd(3);
        test("Inequalities - Greater than", () => {
            expect(greaterThan(numOne, numTwo)).toBeFalsy();
            expect(greaterThan(numTwo, numTwo)).toBeFalsy();
            expect(greaterThan(numThree, numTwo)).toBeTruthy();
        });

        test("Inequalities - Greater than or Equal", () => {
            expect(greaterThanOrEqual(numOne, numTwo)).toBeFalsy();
            expect(greaterThanOrEqual(numTwo, numTwo)).toBeTruthy();
            expect(greaterThanOrEqual(numThree, numTwo)).toBeTruthy();
        });

        test("Inequalities - Less than", () => {
            expect(lessThan(numOne, numTwo)).toBeTruthy();
            expect(lessThan(numTwo, numTwo)).toBeFalsy();
            expect(lessThan(numThree, numTwo)).toBeFalsy();
        });

        test("Inequalities - Less than or equal", () => {
            expect(lessThanOrEqual(numOne, numTwo)).toBeTruthy();
            expect(lessThanOrEqual(numTwo, numTwo)).toBeTruthy();
            expect(lessThanOrEqual(numThree, numTwo)).toBeFalsy();
        });
    });

    test("Date numbers", () => {
        const seconds = bd(5);
        const minutes = bd(5 * 60);
        const hours = bd(5 * 60 * 60);
        const days = bd(5 * 24 * 60 * 60);
        expect(dn(bd(-1))).toBe("00:00");
        expect(dn(bd(0))).toBe("00:00");
        expect(dn(seconds)).toBe("00:05");
        expect(dn(minutes)).toBe("05:00");
        expect(dn(hours)).toBe("05:00:00");
        expect(dn(days)).toBe("5:00:00:00");
    });

    test("Pretty numbers - scientific", () => {
        const small = 500;
        const large = bd("12345678901234567890");
        const xlarge = bd("123456789012345678901");
        const decimal = bd("1.2345678901234567890");
        const largeDecimal = bd("1234567890.12345");
        expect(pn(small, "scientific")).toBe("500");
        expect(pn(large, "scientific")).toBe("1.234E+19");
        expect(pn(xlarge, "scientific")).toBe("1.234E+20");
        expect(pn(decimal, "scientific")).toBe("1.23");
        expect(pn(largeDecimal, "scientific")).toBe("1.234E+9");
    });

    test("Pretty numbers - engineering", () => {
        const small = bd(500);
        const large = bd("12345678901234567890");
        const xlarge = bd("123456789012345678901");
        const decimal = bd("1.2345678901234567890");
        const largeDecimal = bd("1234567890.12345");
        expect(pn(small, "engineering")).toBe("500");
        expect(pn(large, "engineering")).toBe("12.345E+18");
        expect(pn(xlarge, "engineering")).toBe("123.456E+18");
        expect(pn(decimal, "engineering")).toBe("1.23");
        expect(pn(largeDecimal, "engineering")).toBe("1.234E+9");
    });

    test("Pretty numbers - suffix", () => {
        const small = bd(500);
        const large = bd("12345678901234567890");
        const xlarge = bd("123456789012345678901");
        const decimal = bd("1.2345678901234567890");
        const largeDecimal = bd("1234567890.12345");
        expect(pn(small, "suffix")).toBe("500");
        expect(pn(large, "suffix")).toBe("12.345 Quintillion");
        expect(pn(xlarge, "suffix")).toBe("123.456 Quintillion");
        expect(pn(decimal, "suffix")).toBe("1.23");
        expect(pn(largeDecimal, "suffix")).toBe("1.234 Billion");
    });
});
