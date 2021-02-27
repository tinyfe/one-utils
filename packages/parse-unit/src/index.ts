import { KEYWORD, Options, RegexMatch } from 'typings';
import { cssUnitRegex } from './unit';

export function isCssValue(key: string): boolean {
  return cssUnitRegex.test(parseUnit(key)[1]);
}

function parseUnit(key: string, options: Options = {}) {
  const { onlyValue = false, onlyUnit = false } = options;
  let output = [0, ''];

  if (KEYWORD[key]) {
    return ['', key];
  }

  key = String(key);

  const num = parseFloat(key);
  const unit = (key.match(/[\d.\-\+]*\s*(.*)/) as RegexMatch)[1];
  output = [num, unit];

  if (onlyValue) {
    return num;
  }

  if (onlyUnit) {
    return unit;
  }

  return output;
}

export default parseUnit;
