'use strict';

import TypeOf from '../src';

const typeOf = new TypeOf({});

describe('@tinyfe/name', () => {
  test('test', () => {
    expect(typeOf.type()).toBe('Object');
    expect(typeOf.include(['Array', 'String'])).toBe(true);
  });
});
