declare module '@tinyfe/color-keywords';

type ColorKey = number;

class TypeColor {
  r?: ColorKey;
  g?: ColorKey;
  b?: ColorKey;
  a?: ColorKey;
  h?: ColorKey;
  s?: ColorKey;
  l?: ColorKey;
  v?: ColorKey;
  format?: string;
}

enum ColorType {
  HEX = 'hex',
  RGB = 'rgb',
  RGBA = 'rgba',
  HSL = 'hsl',
  HSLA = 'hsla',
  HSV = 'hsv',
  HSVA = 'hsva',
}
