import { boostRecyclying } from '@/helpers/calculators'

var playerStatesOne = {
    'boostRecyclyingPurchase': [5],
    'challenges': [{}]
}

test('Test if initializing', () => {
    expect(boostRecyclying(playerStatesOne).getValue()).toBe('500')
})