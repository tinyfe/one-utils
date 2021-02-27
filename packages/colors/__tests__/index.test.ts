'use strict';

import awesomeColor, { isColor, isHex, isRgb, isRgba, isHsl, isHsla, isHsv, isHsva } from '../src';

describe('@tinyfe/colors', () => {
  const rain120 = awesomeColor('#rain120');
  test('#rain120 is not color', () => {
    expect(rain120.isColor()).toBe(false);
  });

  test('#00bfff is color', () => {
    expect(isColor('#00bfff')).toBe(true);
  });

  test('#rain120 is not color', () => {
    expect(isColor('#rain120')).toBe(false);
  });

  test('#00bfff is Hex', () => {
    expect(isHex('#00bfff')).toBe(true);
  });

  test('#rain120 is not Hex', () => {
    expect(isHex('#rain120')).toBe(false);
  });

  test('rgb(0, 191, 255) is Rgb', () => {
    expect(isRgb('rgb(0, 191, 255)')).toBe(true);
  });

  test('#00bfff is not Rgb', () => {
    expect(isRgb('#00bfff')).toBe(false);
  });

  test('rgba(0, 191, 255, 1) is Rgba', () => {
    expect(isRgba('rgba(0, 191, 255, 1)')).toBe(true);
  });

  test('#00bfff is not Rgba', () => {
    expect(isRgba('#00bfff')).toBe(false);
  });

  test('hsl(195, 100%, 50%) is Hsl', () => {
    expect(isHsl('hsl(195, 100%, 50%)')).toBe(true);
  });

  test('#00bfff is Hsl', () => {
    expect(isHsl('#00bfff')).toBe(false);
  });

  test('hsla(195, 100%, 50%, 100%) is Hsl', () => {
    expect(isHsla('hsla(195, 100%, 50%, 100%)')).toBe(true);
  });

  test('#00bfff is not Hsla', () => {
    expect(isHsla('#00bfff')).toBe(false);
  });

  test('hsv(195, 100%, 50%) is Hsv', () => {
    expect(isHsv('hsv(195, 100%, 50%)')).toBe(true);
  });

  test('#00bfff is Hsv', () => {
    expect(isHsv('#00bfff')).toBe(false);
  });

  test('hsva(195, 100%, 50%, 100%) is Hsl', () => {
    expect(isHsva('hsva(195, 100%, 50%, 100%)')).toBe(true);
  });

  test('#00bfff is not Hsva', () => {
    expect(isHsva('#00bfff')).toBe(false);
  });

  const color = awesomeColor('#00bfff');

  test('#00bfff is hex', () => {
    expect(color.isHex()).toBe(true);
  });

  test('#00bfff alpha is 1', () => {
    expect(color.getAlpha()).toBe(1);
  });

  test('#00bfff format is hex', () => {
    expect(color.getFormat()).toBe('hex');
  });

  test('#00bfff color keyword is deepskyblue', () => {
    expect(color.getColorKeyword()).toBe('deepskyblue');
  });

  test('#00bfff toRgbString is rgb(0, 191, 255)', () => {
    expect(color.toRgbString()).toBe('rgb(0, 191, 255)');
  });

  test('#00bfff toPercentageRgbString is rgb(0%, 75%, 100%)', () => {
    expect(color.toPercentageRgbString()).toBe('rgb(0%, 75%, 100%)');
  });

  test('#00bfff toHslString is hsl(195, 100%, 50%)', () => {
    expect(color.toHslString()).toBe('hsl(195, 100%, 50%)');
  });

  test('#00bfff toHsv is {"a": 1, "h": 195.05882352941174, "s": 1, "v": 1}', () => {
    expect(color.toHsv()).toEqual({ a: 1, h: 195.05882352941174, s: 1, v: 1 });
  });

  test('#00bfff toHsvString is hsv(195, 100%, 100%)', () => {
    expect(color.toHsvString()).toBe('hsv(195, 100%, 100%)');
  });

  test('#00bfff is not Dark', () => {
    expect(color.isDark()).toBe(false);
  });

  test('#012345 is Dark', () => {
    expect(awesomeColor('#012345').isDark()).toBe(true);
  });
});
