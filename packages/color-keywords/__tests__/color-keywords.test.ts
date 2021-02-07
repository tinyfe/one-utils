'use strict';

import namedColor from '../src';

describe('@tinyfe/color-keywords', () => {
  test('aliceblue is #f0f8ff', () => {
    expect(namedColor['aliceblue']).toBe('#f0f8ff');
  });

  test('antiquewhite is #faebd7', () => {
    expect(namedColor['antiquewhite']).toBe('#faebd7');
  });
});
