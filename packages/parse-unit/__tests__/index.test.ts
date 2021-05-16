'use strict';

import parseUnit, { isCssValue } from '../src';
import { cssUnitRegex } from '../src/unit';

describe('@tinyfe/parse-unit', () => {
  test('100% is css value', () => {
    expect(isCssValue('100%')).toEqual(true);
  });

  test('100px is css value', () => {
    expect(isCssValue('100px')).toEqual(true);
  });

  test('100 is css value', () => {
    expect(isCssValue('100')).toEqual(false);
  });

  test('parse 100px is [100, "px"]', () => {
    expect(parseUnit('100px')).toEqual([100, 'px']);
  });

  test('parse 100% is [100, "%"]', () => {
    expect(parseUnit('100%')).toEqual([100, '%']);
    expect(parseUnit('100%', { onlyValue: true })).toEqual(100);
    expect(parseUnit('100%', { onlyUnit: true })).toEqual('%');
  });

  test('parse 100 is [100, ""]', () => {
    expect(parseUnit('100')).toEqual([100, '']);
    expect(parseUnit('100', { onlyValue: true })).toEqual(100);
    expect(parseUnit('100', { onlyUnit: true })).toEqual('');
  });

  test('parse auto is [auto, ""]', () => {
    expect(parseUnit('auto')).toEqual(['auto', '']);
  });
});

describe('@tinyfe/parse-unit', () => {
  // cssUnit = (v[h|w|min|max]|p[c|t|x]|[re|e|c|m]m|[l|c]h|%|in|Q|ex)
  [
    'vh',
    'vw',
    'vmin',
    'vmax',
    'pc',
    'pt',
    'px',
    'rem',
    'em',
    'cm',
    'mm',
    'lh',
    'ch',
    '%',
    'in',
    'Q',
    'ex',
  ].map((unit, index) => {
    const msg = `test No.${index} cssUnit: ${unit}`;
    test(msg, () => {
      expect(cssUnitRegex.test(unit)).toBe(true);
    });
  });
});
