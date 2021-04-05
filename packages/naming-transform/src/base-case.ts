import { lowerCase } from './utils/lower-case';

// Support camel case ("camelCase" -> "camel Case" and "CAMELCase" -> "CAMEL Case").
const DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];

// 删除所有非单词字符
const DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;

export function replace(
  input: string,
  regex: RegExp | RegExp[],
  value: string,
) {
  if (regex instanceof RegExp) {
    return input.replace(regex, value);
  }

  return regex.reduce((input, regex) => input.replace(regex, value), input);
}

export function baseCase(input: string, options: Options = {}): string {
  const {
    // 用于分割成词段的 RegExp
    splitRegexp = DEFAULT_SPLIT_REGEXP,
    // 用于删除无关字符的 RegExp
    stripRegexp = DEFAULT_STRIP_REGEXP,
    // 转换器
    transform = lowerCase,
    // 单词连接符
    delimiter = ' ',
  } = options;

  let result = replace(
    // '\0'的ASCII是0
    replace(input, splitRegexp, '$1\0$2'),
    stripRegexp,
    '\0',
  );

  let start = 0;
  let end = result.length;

  while (result.charAt(start) === '\0') {
    start++;
  }

  while (result.charAt(end - 1) === '\0') {
    end--;
  }

  return result.slice(start, end).split('\0').map(transform).join(delimiter);
}
