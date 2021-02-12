interface Patterns {
  [key: string]: RegExp;
}

/**
 * // LINK_TO: https://www.w3.org/TR/css3-values/#integers
 * 整数值用<integer>表示。
 * 从字面上看，整数是一个或多个十进制数字0到9，并且对应于CSS语法模块[CSS3SYN]中<number-token>产生的子集。
 * 整数的第一位数字可以紧跟在-或+后，以表示该整数的符号。
 */
// const CSS_INTEGER = '[-+]?\\d+%?';

// INFO: (-+)9527
// const CSS_FLOAT = '[-+]?\\d*.\\d+%?';

// (-+)?9527(%)?, (-+)?0.9527(%)?
// const CSS_NUMBER = '`(?:${CSS_INTEGER})|(?:${CSS_FLOAT})`';
const CSS_NUMBER = '[-+]?\\d*(?:\\d+|\\.\\d+)%?';

// INFO: (x, x, x)
const PERMISSIVE_MATCH3 =
  '[\\s|\\(]+(' + CSS_NUMBER + ')[,|\\s]+(' + CSS_NUMBER + ')[,|\\s]+(' + CSS_NUMBER + ')\\s*\\)?';

// INFO: (x, x, x, x)
const PERMISSIVE_MATCH4 =
  '[\\s|\\(]+(' +
  CSS_NUMBER +
  ')[,|\\s]+(' +
  CSS_NUMBER +
  ')[,|\\s]+(' +
  CSS_NUMBER +
  ')[,|\\s]+(' +
  CSS_NUMBER +
  ')\\s*\\)?';

export const matchPattern: Patterns = {
  // LINK_TO: https://www.w3.org/TR/css3-values/#numbers
  CSS_UNIT: new RegExp(CSS_NUMBER),
  rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
  rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
  hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
  hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
  hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
  hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
  hex3: /^[\dA-F]{3}$/i,
  hex4: /^[\dA-F]{4}$/i,
  hex6: /^[\dA-F]{6}$/i,
  hex8: /^[\dA-F]{8}$/i,
};

export function isHex(color: string) {
  return matchPattern[`hex${color.length}`].test(color);
}

// LINK_TO: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb_colors

export function isRgb(color: string) {
  return matchPattern.rgb.test(color);
}

export function isRgba(color: string) {
  return matchPattern.rgba.test(color);
}

// LINK_TO: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl_colors

export function isHsl(color: string) {
  return matchPattern.hsl.test(color);
}

export function isHsla(color: string) {
  return matchPattern.hsla.test(color);
}

export function isHsv(color: string) {
  return matchPattern.hsv.test(color);
}

export function isHsva(color: string) {
  return matchPattern.hsva.test(color);
}

export default function isColor(color: string) {
  return (
    isHex(color) || isRgb(color) || isRgba(color) || isHsl(color) || isHsla(color) || isHsv(color) || isHsva(color)
  );
}

export function isValidCSSUnit(unit: string | number) {
  return !!matchPattern.CSS_UNIT.exec(unit.toString());
}
