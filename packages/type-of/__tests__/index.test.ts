'use strict';

import typeOf, { includes, of, is, getTypeString, $BUILD_IN } from '../src';

const input = typeOf({});

describe('@tinyfe/name', () => {
  test('test typeOf', () => {
    expect(input.type()).toBe('Object');
    expect(input.includes(['Array', 'String'])).toBe(false);
    expect(input.of()).toBe({}.constructor);
    expect(input.is('Object')).toBe(true);
    expect(input.getTypeString()).toBe('Object');
  });

  test('test functions', () => {
    expect(includes(['Array', 'String'], {})).toBe(false);
    expect(of([])).toBe([].constructor);
    expect(is('Object', {})).toBe(true);
    expect(getTypeString([])).toBe('Array');
    expect($BUILD_IN).toEqual([
      Object,
      Function,
      Array,
      String,
      Boolean,
      Number,
      Symbol,
      Date,
      RegExp,
      Error,
    ]);
  });
});
