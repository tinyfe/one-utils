import { IFlags, Flags } from 'typings';

export function getRegexInstance(regex: string | RegExp, option: IFlags = {}): RegExp {
  let flags = '';

  Object.keys((key: keyof typeof Flags) => {
    if (option[key]) {
      flags += key;
    }
  });

  return new RegExp(regex, flags);
}

/**
 * @description Executes a search for a match in a string. It returns an array of information or null on a mismatch.
 * @param regex
 * @param value
 * @param option
 * @returns string[] | null
 */
export function exec(
  regex: string | RegExp,
  value: string | undefined,
  option: IFlags = {},
): string[] | null {
  if (!value) {
    return null;
  }

  return getRegexInstance(regex, option).exec(value);
}

/**
 * @description test()	Tests for a match in a string. It returns true or false.
 * @param regex
 * @param value
 * @param option
 * @returns boolean
 */
export function test(
  regex: string | RegExp,
  value: string | undefined,
  option: IFlags = {},
): boolean {
  if (!value) {
    return false;
  }

  return getRegexInstance(regex, option).test(value);
}

/**
 * @description match()	Returns an array containing all of the matches, including capturing groups, or null if no match is found.
 * @param regex
 * @param value
 * @param option
 * @returns string[] | null
 */
export function match(
  regex: string | RegExp,
  value: string | undefined,
  option: IFlags = {},
): string[] | null {
  if (!value) {
    return null;
  }

  return value.match(getRegexInstance(regex, option));
}

/**
 * @description matchAll()	Returns an iterator containing all of the matches, including capturing groups.
 * @param regex
 * @param value
 * @param option
 * @returns IterableIterator<RegExpMatchArray> | undefined
 */
export function matchAll(
  regex: string | RegExp,
  value: string | undefined,
  option: IFlags = {},
): IterableIterator<RegExpMatchArray> | undefined {
  if (!value) {
    return undefined;
  }

  return value.matchAll(getRegexInstance(regex, option));
}

/**
 * @description search()	Tests for a match in a string. It returns the index of the match, or -1 if the search fails.
 * @param regex
 * @param value
 * @param option
 * @returns number
 */
export function search(regex: string | RegExp, value: string, option: IFlags = {}): number {
  return value.search(getRegexInstance(regex, option));
}

/**
 * @description replace()	Executes a search for a match in a string, and replaces the matched substring with a replacement substring.
 * @param regex
 * @param value
 * @param option
 * @returns string
 */
export function replace(
  regex: string | RegExp,
  value: { before: string; after: (substring: string, ...args: any[]) => string },
  option: IFlags & { force?: boolean } = {},
): string {
  const { before, after } = value;

  const { force = false, ...rest } = option;

  return before.replace(force ? regex : getRegexInstance(regex, rest), after);
}

/**
 * @description replaceAll()	Executes a search for all matches in a string, and replaces the matched substrings with a replacement substring.
 * @param regex
 * @param value
 * @param option
 * @returns
 */
export function replaceAll(
  regex: string | RegExp,
  value: { before: string; after: (substring: string, ...args: any[]) => string },
  option: IFlags & { force?: boolean } = {},
): string {
  const { before, after } = value;

  const { force = false, ...rest } = option;

  return before.replaceAll(force ? regex : getRegexInstance(regex, rest), after);
}

/**
 * @description split()	Uses a regular expression or a fixed string to break a string into an array of substrings.
 * @param regex
 * @param value
 * @param option
 * @returns string[]
 */
export function split(regex: string | RegExp, value: string): string[] {
  if (!value) {
    return [];
  }

  return value.split(regex);
}
