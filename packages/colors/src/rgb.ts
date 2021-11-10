import { ColorRGB } from '..';
import { setValueRange } from './utils';

export function rgbToRgb(r: number, g: number, b: number): ColorRGB {
  return {
    r: setValueRange(r, 255) * 255,
    g: setValueRange(g, 255) * 255,
    b: setValueRange(b, 255) * 255,
  };
}
