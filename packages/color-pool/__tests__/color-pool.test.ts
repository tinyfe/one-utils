'use strict';

import { colorPool } from '../src';

describe('@tinyfe/color-pool', () => {
  test('aliceblue is #f0f8ff', () => {
    expect(colorPool['aliceblue']).toBe('#f0f8ff');
  });

  test('antiquewhite is #faebd7', () => {
    expect(colorPool['antiquewhite']).toBe('#faebd7');
  });
});
