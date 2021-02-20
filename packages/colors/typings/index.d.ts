export type ColorKey = number;

export interface IAnyObject {
  [key: string]: string;
}
export interface ColorRGB {
  r: ColorKey;
  g: ColorKey;
  b: ColorKey;
  a?: ColorKey;
}
export interface ColorHSL {
  h: ColorKey;
  s: ColorKey;
  l: ColorKey;
  a?: ColorKey;
}
export interface ColorHSV {
  h: ColorKey;
  s: ColorKey;
  v: ColorKey;
  a?: ColorKey;
}

export interface TypeColor extends ColorRGB, ColorHSL, ColorHSV {
  format?: ColorType;
}

export enum ColorTypeEnum {
  'name',
  'hex',
  'hex8',
  'hex6',
  'hex4',
  'hex3',
  'prgb',
  'rgb',
  'rgba',
  'hsl',
  'hsla',
  'hsv',
  'hsva',
}

export type ColorType = keyof typeof ColorTypeEnum;

export interface HexOptions {
  short?: boolean;
}

export interface IColor extends ColorRGB {
  format?: ColorType;
}

export interface ColorOptions {
  format?: ColorType;
}
