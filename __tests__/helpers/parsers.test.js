import {parseObj, parseNum} from '@/helpers/parsers'
import bigDecimal from 'js-big-decimal';

test('Parseing of Objects', () => {
    var state = {
        'string': ['{}'],
        'number': [0],
        'object': [{}],
    }
    expect(parseObj(state, 'string')).toStrictEqual({})
    expect(parseObj(state, 'number')).toStrictEqual({})
    expect(parseObj(state, 'object')).toStrictEqual({})
});


test('Parseing of Numbers', () => {
    var bd = new bigDecimal('0');
    var state = {
        'bd': [bd],
        'number': [0],
        'string': ['0'],
    }
    expect(parseNum(state, 'bd')).toStrictEqual(bd)
    expect(parseNum(state, 'number')).toStrictEqual(bd)
    expect(parseNum(state, 'string')).toStrictEqual(bd)
});