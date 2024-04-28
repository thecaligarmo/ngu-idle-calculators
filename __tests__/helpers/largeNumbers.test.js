import {getLargeSuffix} from '@/helpers/largeNumbers'


test('Large Numbers return expected strings', () => {
    expect(getLargeSuffix(0)).toBe("Thousand");
    expect(getLargeSuffix(2)).toBe("Billion");
    expect(getLargeSuffix(1000)).toBe("Millinillion");
});