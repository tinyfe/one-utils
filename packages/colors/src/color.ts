// LINK_TO: https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value
import isColor, { isHex, isRgb, isRgba, isHsl, isHsla, isHsv, isHsva } from './valid-color';
import { flip, namedColor, parseToRgb } from './convert';
import randomColor from './random-color';
import { ColorKey, ColorOptions, ColorRGB, ColorType, HexOptions, IAnyObject, IColor } from 'typings';
import { mathRound, setAlpha, setValueRange } from './utils';
import { rgbToHsv } from './hsv';
import { rgbToHsl } from './hsl';
import { rgbaToHex, rgbToHex } from './hex';

export default class Color implements IColor {
  color: any;
  originColor: string;
  options: ColorOptions;
  r: ColorKey;
  g: ColorKey;
  b: ColorKey;
  a: ColorKey;
  hexNames: IAnyObject;
  _alpha: number;
  _format: ColorType;

  constructor(color: any, options?: ColorOptions) {
    this.color = color;
    this.originColor = color;
    this.options = options || {};

    const rgb: IColor & { format: ColorType } = parseToRgb(color);

    this.r = rgb.r;
    this.g = rgb.g;
    this.b = rgb.b;
    this.a = rgb?.a || 1;
    this.hexNames = flip(namedColor);
    this._alpha = mathRound(this.a * 100) / 100;
    this._format = options?.format || rgb.format;

    return this;
  }

  isColor(): boolean {
    return isColor(this.color);
  }

  isHex(): boolean {
    return isHex(this.color);
  }

  toHex(options: HexOptions = { short: false }) {
    return rgbToHex(this.r, this.g, this.b, options);
  }

  toHexString(options: HexOptions = { short: false }) {
    return '#' + this.toHex(options);
  }

  toHex8(options: HexOptions = { short: false }) {
    return rgbaToHex(this.r, this.g, this.b, this.a, options);
  }

  toHex8String(options: HexOptions = { short: false }) {
    return '#' + this.toHex8(options);
  }

  isRgb(): boolean {
    return isRgb(this.color);
  }

  toRgb(): ColorRGB {
    return { r: this.r, g: this.g, b: this.b, a: this.a };
  }

  toRgbString(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  toPercentageRgb() {
    return {
      r: `${mathRound(setValueRange(this.r, 255) * 100)}%`,
      g: `${mathRound(setValueRange(this.g, 255) * 100)}%`,
      b: `${mathRound(setValueRange(this.b, 255) * 100)}%`,
    };
  }

  toPercentageRgbString(): string {
    const { r, g, b } = this.toPercentageRgb();

    return this.a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${this._alpha})`;
  }

  isRgba(): boolean {
    return isRgba(this.color);
  }

  isHsl(): boolean {
    return isHsl(this.color);
  }

  isHsla(): boolean {
    return isHsla(this.color);
  }

  toHsl() {
    const hsl = rgbToHsl(this.r, this.g, this.b);

    return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
  }

  toHslString() {
    const hsl = rgbToHsl(this.r, this.g, this.b);
    const h = mathRound(hsl.h * 360);
    const s = mathRound(hsl.s * 100);
    const l = mathRound(hsl.l * 100);

    return this.a === 1 ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${this._alpha})`;
  }

  isHsv(): boolean {
    return isHsv(this.color);
  }

  isHsva(): boolean {
    return isHsva(this.color);
  }

  toHsv() {
    const hsv = rgbToHsv(this.r, this.g, this.b);

    return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
  }

  toHsvString() {
    const hsv = rgbToHsv(this.r, this.g, this.b);
    const h = mathRound(hsv.h * 360);
    const s = mathRound(hsv.s * 100);
    const v = mathRound(hsv.v * 100);

    return this.a === 1 ? `hsv(${h}, ${s}%, ${v}%)` : `hsva(${h}, ${s}%, ${v}%, ${this._alpha})`;
  }

  randomColor(): string {
    return randomColor();
  }

  getFormat() {
    return this._format;
  }

  getAlpha() {
    return this.a;
  }

  setAlpha(a: number) {
    this.a = setAlpha(a);
    this._alpha = mathRound(this.a * 100) / 100;
    return this;
  }

  getHexNames() {
    return this.hexNames;
  }

  getColorKeyword() {
    // transparent: 'rgba(0, 0, 0, 0)'
    if (this.a === 0) {
      return 'transparent';
    }

    if (this.a === 1) {
      return this.hexNames[this.toHexString()] || '';
    }

    return '';
  }

  getBrightness() {
    // http://www.w3.org/TR/AERT#color-contrast
    // 色彩亮度由以下公式决定(Color brightness is determined by the following formula):
    // ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
    const { r, g, b } = this.toRgb();
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  isDark() {
    return this.getBrightness() < 128;
  }
}
