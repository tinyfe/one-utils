'use strict';

import { install } from '../src';

describe('@tinyfe/name', () => {
  test('test', () => {
    expect(install('.', [], { useYarn: true })).toBe(undefined);
  });
});
