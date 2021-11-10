import { ColorHSV, ColorRGB } from '..';
import { getHue } from './hsl';
import { mathMax, mathMin, mathRound, setValueRange } from './utils';

export const baseHues = {
  // name: hug, // color_code color_name luminance(亮度/明度)
  red: 0, //	#FF0000	red	30%
  'orange-red': 15, //	#FF4000	vermilion	orange 45%
  orange: 30, //	#FF8000	orange	59%
  khaki: 45, //	#FFBF00	golden yellow	74%
  yellow: 60, //	#FFFF00	yellow (web color)=lemon yellow	89%
  lime: 75, //	#BFFF00	yellowish green	81%
  olive: 90, //	#80FF00	yellowish green, chartreuse	74%
  'grass-green': 105, //	#40FF00	leaf green 66%
  green: 120, //	#00FF00	green	59%
  'bluish-green': 135, //	#00FF40	cobalt green 62%
  teal: 150, //	#00FF80	emerald green	64%
  'greenish-cyan': 165, //	#00FFBF	turquoise green, bluish green 67%
  cyan: 180, //	#00FFFF	turquoise blue, cyan (web color)	70%
  'bluish-cyan': 195, //	#00BFFF	cerulean blue 55%
  blue: 210, //	#0080FF	azure	41%
  'blue-violet': 225, //	#0040FF	blue, cobalt blue 26%
  violet: 240, //	#0000FF	blue (web color)=ultramarine	11%
  'purple-violet': 255, //	#4000FF	hyacinth 19%
  purple: 270, //	#8000FF	violet	26%
  magenta: 285, //	#BF00FF	purple	purple 34%
  'purple-magenta': 300, //	#FF00FF	magenta (web color)	41%
  crimson: 315, //	#FF00BF	reddish purple	38%
  scarlet: 330, //	#FF0080	ruby red, crimson	36%
  'scarlet-red': 345, //	#FF0040	carmine 33%
};

/**
 * @description rgb to hsv
 * @param r
 * @param g
 * @param b
 */
export function rgbToHsv(r: number, g: number, b: number): ColorHSV {
  r = setValueRange(r, 255);
  g = setValueRange(g, 255);
  b = setValueRange(b, 255);

  const max = mathMax(r, g, b);
  const min = mathMin(r, g, b);

  // const h = getHueFromRGB(r, g, b);
  const h = getHue(r, g, b, max, min);
  const s = max === 0 ? 0 : 1 - min / max;
  const v = max;

  return { h, s, v };
}

/**
 * @description hsv to rgb
 * @param h
 * @param s
 * @param v
 */
export function hsvToRgb(h: number, s: number, v: number): ColorRGB {
  h = mathRound(setValueRange(h, 360) * 6);
  s = setValueRange(s, 100);
  v = setValueRange(v, 100);

  const hi = h % 6;
  const f = h / 6 - hi;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  const r = [v, q, p, p, t, v][hi];
  const g = [t, v, v, q, p, p][hi];
  const b = [p, p, t, v, v, q][hi];

  // let rgb = { r: 0, g: 0, b: 0 };
  // switch (hi) {
  //   case 0:
  //     rgb = { r: v, g: t, b: p };
  //     break;
  //   case 1:
  //     rgb = { r: q, g: v, b: p };
  //     break;
  //   case 2:
  //     rgb = { r: p, g: v, b: t };
  //     break;
  //   case 3:
  //     rgb = { r: p, g: q, b: v };
  //     break;
  //   case 4:
  //     rgb = { r: t, g: p, b: v };
  //     break;
  //   case 5:
  //     rgb = { r: v, g: p, b: q };
  //     break;
  // }

  return {
    r: r * 255,
    g: g * 255,
    b: b * 255,
  };
}
