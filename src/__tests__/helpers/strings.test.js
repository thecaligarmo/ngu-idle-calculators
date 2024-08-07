import { camelToTitle } from '@/helpers/strings';

test('Camel to Title', () => {
    expect(camelToTitle('totalPower')).toBe('Total Power')
    expect(camelToTitle('totalNGUPower')).toBe('Total NGU Power')
    expect(camelToTitle('totalPPPower')).toBe('Total PP Power')
    expect(camelToTitle('totalPower%')).toBe('Total Power (%)')

});