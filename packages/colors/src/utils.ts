// INFO: use more than 3 times
export const mathMin = Math.min;
export const mathMax = Math.max;
export const mathRound = Math.round;

/**
 * @description set alpha [0, 1], default 1
 * @param a alpha
 */
export function setAlpha(a: number | string) {
  if (typeof a === 'string') {
    a = parseFloat(a);
  }

  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }

  return a;
}

export function isOnePointZero(n: string | number): boolean {
  return typeof n == 'string' && n.includes('.') && parseFloat(n) === 1;
}

export function isPercentage(n: string | number) {
  return typeof n === 'string' && n.includes('%');
}

export function convertToPercentage(value: number) {
  if (+value <= 1) {
    value = +value * 100; // + '%';
  }

  return value;
}

export function parseIntFromHex(value: string) {
  return parseInt(value, 16);
}

// Converts a hex value to a decimal
export function convertHexToDecimal(hex: string) {
  return parseIntFromHex(hex) / 255;
}

// Converts a decimal to a hex value
export function convertDecimalToHex(decimal: string) {
  return mathRound(parseFloat(decimal) * 255).toString(16);
}

export function setValueRange(value: number | string, max: number) {
  if (isOnePointZero(value)) {
    value = '100%';
  }

  const percent = isPercentage(value);
  value = mathMin(max as number, mathMax(0, parseFloat(value.toString())));

  if (percent) {
    value = parseInt((value * max).toString(), 10) / 100;
  }

  if (Math.abs(value - max) < 10e-6) {
    return 1;
  }

  return (value % max) / parseFloat(max.toString());
}
