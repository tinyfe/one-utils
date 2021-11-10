import { ColorOptions } from '..';
import Color from './color';

export default function awesomeColor(color: any, options?: ColorOptions) {
  if (color instanceof Color) {
    return color;
  }
  return new Color(color, options);
}

export {
  default as isColor,
  isHex,
  isRgb,
  isRgba,
  isHsl,
  isHsla,
  isHsv,
  isHsva,
} from './valid-color';
export { default as randomColor } from './random-color';
