'use strict';

import TypeOf from '../src';

const typeOf = new TypeOf({});

describe('@tinyfe/name', () => {
  test('test', () => {
    expect(typeOf.type()).toBe('Object');
    expect(typeOf.include(['Array', 'String'])).toBe(false);
    expect(typeOf.of()).toBe({}.constructor);
    expect(typeOf.of([])).toBe([].constructor);
    expect(typeOf.is('Object')).toBe(true);
    expect(typeOf.getTypeString()).toBe('Object');
    expect(typeOf.getTypeString([])).toBe('Array');
  });
});
