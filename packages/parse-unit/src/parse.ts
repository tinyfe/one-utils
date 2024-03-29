import { Options } from './custom.d';
import { cssUnitRegex } from './unit';

export const KEYWORD = [
  'auto',
  'revert',
  'unset',
  'inherit',
  'initial',
  'max-content',
  'min-content',
  'fit-content',
  '-webkit-fill-available',
];

export function isCssValue(key: string | number): boolean {
  return cssUnitRegex.test(parseUnit(key)[1]);
}

function parseUnit(key: string | number, options: Options = {}) {
  const { onlyValue = false, onlyUnit = false } = options;

  if (typeof key === 'number') {
    if (onlyValue) {
      return key;
    }

    if (onlyUnit) {
      return '';
    }

    return [key, ''];
  }

  let output = [0, ''];

  if (KEYWORD.includes(key)) {
    return [key, ''];
  }

  key = String(key);

  const num = parseFloat(key);
  const unit = (key.match(/[\d.\-\+]*\s*(.*)/) as RegExpMatchArray)[1];
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
