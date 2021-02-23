import { ColorHSL, ColorRGB } from 'typings';
import { mathMax, mathMin, mathRound, setValueRange } from './utils';

/**
 * @description { r: 255, g: 255, b: 255 } => {h: 0, s: 0, l: 1} =>  (real h = h * 360, s/l = s/l * 100%)
 * @param r
 * @param g
 * @param b
 * @return {h, s, l}
 */
export function rgbToHsl(r: number, g: number, b: number): ColorHSL {
  r = setValueRange(r, 255);
  g = setValueRange(g, 255);
  b = setValueRange(b, 255);

  const max = mathMax(r, g, b);
  const min = mathMin(r, g, b);

  const l = (max + min) / 2;
  const s = getSaturation(max, min, l);
  // const h = getHueFromRGB(r, g, b);
  const h = getHue(r, g, b, max, min);

  return { h, s, l };
}

/**
 *
 * @param max
 * @param min
 * @param lightness
 * @param delta max - min
 */
export function getSaturation(max: number, min: number, lightness?: number): number {
  lightness = lightness || (max + min) / 2;
  const delta = max - min;
  let s = 0;
  if (max !== min) {
    s = lightness > 0.5 ? delta / (2 - delta) : delta / (max + min);
  }
  return s;
}

/**
 * @description { r: 255, g: 255, b: 255 } => { h: 0 } (real h = h * 360)
 * @param r
 * @param g
 * @param b
 * @return hue value
 */
export function getHueFromRGB(r: number, g: number, b: number): number {
  const deg = mathRound((Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180) / Math.PI);

  const angel = deg >= 0 ? deg : 360 + (deg | 0);
  return angel / 360;
}

/**
 * @description 将 rgb 转换成 h { r: 255, g: 255, b: 255 } => { h: 0 } (real h = h * 360)
 * @param max r, g, b 最大值
 * @param min r, g, b 最小值
 * @param delta 最大值 - 最小值的差值
 * @param rgb
 * @return [0, 1], 通过[0, 1] * 360 -> [0°, 360°]
 */
export function getHue(r: number, g: number, b: number, max: number, min: number): number {
  const delta = max - min;
  let h = 0;
  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? /* 360° */ 6 : 0) /* 0° */;
        break;
      case g:
        h = (b - r) / delta + 2; // 120°
        break;
      case b:
        h = (r - g) / delta + 4; // 240°
        break;
    }
    h /= 6;
  }

  return h;
}

/**
 * @description { h: 0, s: 0, l: 1 } => { r: 255, g: 255, b: 255 }
 * @link https://drafts.csswg.org/css-color/#hsl-to-rgb
 * @param hue
 * @param sat
 * @param light
 */
export function hslToRgb(hue: number, sat: number, light: number): ColorRGB {
  let t2 = light <= 0.5 ? light * (sat + 1) : light + sat - light * sat;
  let t1 = light * 2 - t2;
  return {
    r: hueToRgb(t1, t2, hue + 2),
    g: hueToRgb(t1, t2, hue),
    b: hueToRgb(t1, t2, hue - 2),
  };
}

/**
 * @description { h: 0, s: 0, l: 1 } => { r: 255, g: 255, b: 255 }
 * @param t1
 * @param t2
 * @param hue
 */
export function hueToRgb(t1: number, t2: number, hue: number): number {
  if (hue < 0) {
    hue += 6;
  }
  if (hue >= 6) {
    hue -= 6;
  }

  if (hue < 1) {
    return (t2 - t1) * hue + t1;
  } else if (hue < 3) {
    return t2;
  } else if (hue < 4) {
    return (t2 - t1) * (4 - hue) + t1;
  } else {
    return t1;
  }
}
