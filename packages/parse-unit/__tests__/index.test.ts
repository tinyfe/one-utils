'use strict';

import parseUnit, { isCssValue } from '../src';

describe('@tinyfe/parse-unit', () => {
  test('100px is css value', () => {
    expect(isCssValue('100px')).toBe(true);
  });

  test('100 is css value', () => {
    expect(isCssValue('100')).toBe(false);
  });

  test('parse 100px is [100, "px"]', () => {
    expect(parseUnit('100px')).toBe([100, 'px']);
  });

  test('parse 100% is [100, "%"]', () => {
    expect(parseUnit('100%')).toBe([100, '%']);
  });

  test('parse 100 is [100, ""]', () => {
    expect(parseUnit('100')).toBe([100, '']);
  });

  test('parse auto is [auto, ""]', () => {
    expect(parseUnit('auto')).toBe(['auto', '']);
  });
});
