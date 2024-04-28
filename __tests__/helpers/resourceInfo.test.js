import {achievementAPBonus} from '@/helpers/resourceInfo'

test('Achievement info', () => {
    expect(achievementAPBonus({'achievements': [{}]}).getValue()).toBe('100')
});