import { HexOptions } from '..';
import { convertDecimalToHex, mathRound } from './utils';

/**
 * @description rgb(255, 255, 255) => #ffffff => short #fff
 * @param r
 * @param g
 * @param b
 * @param options short 3, full 6, default false
 * @return hex string
 */
export function rgbToHex(
  r: number,
  g: number,
  b: number,
  options: HexOptions,
): string {
  const { short = false } = options;
  const hex = [
    mathRound(r).toString(16).padStart(2, '0'),
    mathRound(g).toString(16).padStart(2, '0'),
    mathRound(b).toString(16).padStart(2, '0'),
  ];

  if (short) {
    let canBeShort = true;
    for (const h of hex) {
      if (h.charAt(0) !== h.charAt(1)) {
        canBeShort = false;
        break;
      }
    }

    if (canBeShort) {
      return hex.map(h => h.charAt(0)).join('');
    }
  }

  return hex.join('');
}

/**
 * @description (255, 0 , 255, 1) => '#ff00ffff' => short #f0ff
 * @param r
 * @param g
 * @param b
 * @param a alpha
 * @param options short 4, full 8, default false
 * @return hexa string
 */
export function rgbaToHex(
  r: number,
  g: number,
  b: number,
  a: number,
  options: HexOptions,
): string {
  const { short = false } = options;
  const hex = [
    mathRound(r).toString(16).padStart(2, '0'),
    mathRound(g).toString(16).padStart(2, '0'),
    mathRound(b).toString(16).padStart(2, '0'),
    convertDecimalToHex(a.toString()).padStart(2, '0'),
  ];

  if (short) {
    let canBeShort = true;
    for (const h of hex) {
      // INFO: FA can not be convert.
      if (h.charAt(0) !== h.charAt(1)) {
        canBeShort = false;
        break;
      }
    }

    if (canBeShort) {
      return hex.map(h => h.charAt(0)).join('');
    }
  }

  return hex.join('');
}

/**
 * @description (255, 0 , 255, 1) => '#ff00ffff' A R G B
 * @link https://en.wikipedia.org/wiki/RGBA_color_model
 * @param r
 * @param g
 * @param b
 * @param a
 * @return hexa string
 */
export function rgbaToArgbHex(
  r: number,
  g: number,
  b: number,
  a: number,
): string {
  const hex = [
    convertDecimalToHex(a.toString()).padStart(2, '0'),
    mathRound(r).toString(16).padStart(2, '0'),
    mathRound(g).toString(16).padStart(2, '0'),
    mathRound(b).toString(16).padStart(2, '0'),
  ];

  return hex.join('');
}
