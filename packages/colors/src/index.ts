import { ColorOptions } from 'typings';
import Color from './color';

const awesomeColor = (color: any, options?: ColorOptions) => {
  if (color instanceof Color) {
    return color;
  }

  if (!((this as any) instanceof Color)) {
    return new Color(color, options);
  }
};

export { default as isColor, isHex, isRgb, isRgba, isHsl, isHsla, isHsv, isHsva } from './valid-color';
export { default as randomColor } from './random-color';

export default awesomeColor;
