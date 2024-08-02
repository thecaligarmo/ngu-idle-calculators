import {bigdec_max, bigdec_min, pn, bd, dn} from '@/helpers/numbers'
import bigDecimal from 'js-big-decimal';

test('Max of Big Decimal', () => {
    var one = bd(1)
    var pi = bd(3.1415926)
    var four = bd(4)
    var minus = bd(-1)
    var max = bigdec_max(one, pi, four, minus)
    expect(max.getValue()).toBe("4");
});

test('Min of Big Decimal', () => {
    var one = bd(1)
    var pi = bd(3.1415926)
    var four = bd(4)
    var minus = bd(-1)
    var min = bigdec_min(one, pi, four, minus)
    expect(min.getValue()).toBe("-1");
});

test('Max and min failures', () => {
    expect(() => bigdec_max()).toThrow('Max of empty list');
    expect(() => bigdec_min()).toThrow('Min of empty list');
});


test('Ensure we get big decimals', () => {
    var one = bd(1)
    var thousand = bd('1e3')
    var decimal = bd('3.1415926535')
    expect(one.getValue()).toBe("1");
    expect(thousand.getValue()).toBe("1000");
    expect(decimal.getValue()).toBe("3.1415926535");
});


test('Rounding of big decimals', () => {
    var decimal = bd('3.1415926535')
    expect(decimal.round(2, bigDecimal.RoundingModes.CEILING).getValue()).toBe("3.15");
});

test('Date numbers', () => {
    var seconds = bd(5)
    var minutes = bd(5 * 60)
    var hours = bd(5 * 60 * 60)
    var days = bd(5 * 24 * 60 * 60)
    expect(dn()).toBe("00:00")
    expect(dn(seconds)).toBe("00:05")
    expect(dn(minutes)).toBe("05:00")
    expect(dn(hours)).toBe("05:00:00")
    expect(dn(days)).toBe("5:00:00:00")
});

test('Pretty numbers - scientific', () => {
    var small = bd(500)
    var large = bd('12345678901234567890')
    var xlarge = bd('123456789012345678901')
    var decimal = bd('1.2345678901234567890')
    var largeDecimal = bd('1234567890.12345')
    expect(pn(small, 'scientific')).toBe("500");
    expect(pn(large, 'scientific')).toBe("1.234E+19");
    expect(pn(xlarge, 'scientific')).toBe("1.234E+20");
    expect(pn(decimal, 'scientific')).toBe("1.23");
    expect(pn(largeDecimal, 'scientific')).toBe("1.234E+9");
});

test('Pretty numbers - engineering', () => {
    var small = bd(500)
    var large = bd('12345678901234567890')
    var xlarge = bd('123456789012345678901')
    var decimal = bd('1.2345678901234567890')
    var largeDecimal = bd('1234567890.12345')
    expect(pn(small, 'engineering')).toBe("500");
    expect(pn(large, 'engineering')).toBe("12.345E+18");
    expect(pn(xlarge, 'engineering')).toBe("123.456E+18");
    expect(pn(decimal, 'engineering')).toBe("1.23");
    expect(pn(largeDecimal, 'engineering')).toBe("1.234E+9");
});

test('Pretty numbers - suffix', () => {
    var small = bd(500)
    var large = bd('12345678901234567890')
    var xlarge = bd('123456789012345678901')
    var decimal = bd('1.2345678901234567890')
    var largeDecimal = bd('1234567890.12345')
    expect(pn(small, 'suffix')).toBe("500");
    expect(pn(large, 'suffix')).toBe("12.345 Quintillion");
    expect(pn(xlarge, 'suffix')).toBe("123.456 Quintillion");
    expect(pn(decimal, 'suffix')).toBe("1.23");
    expect(pn(largeDecimal, 'suffix')).toBe("1.234 Billion");
});