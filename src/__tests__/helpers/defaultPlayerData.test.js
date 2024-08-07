import { getPlayerNumberOptions } from '@/helpers/defaultPlayerData';

test('Player Number Options', () => {
    expect(getPlayerNumberOptions().length).toBeGreaterThan(20)

});