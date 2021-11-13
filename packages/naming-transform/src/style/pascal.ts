// LINK_TO: https://en.wikipedia.org/wiki/Camel_case
import { NamingAtom, Options } from '../custom.d';
import { baseCase } from '../base-case';
import { lowerCase } from '../utils/lower-case';
import { upperCase } from '../utils/upper-case';

class Pascal implements NamingAtom {
  test(input: string) {
    return /^[A-Z][0-9a-z]*([A-Z][0-9a-z]*)+$/.test(input);
  }

  transform(input: string, index: number): string {
    const firstChar = input.charAt(0);
    const lowerChars = lowerCase(input.substr(1));

    if (index > 0 && firstChar >= '0' && firstChar <= '9') {
      return `_${firstChar}${lowerChars}}`;
    }

    return `${upperCase(firstChar)}${lowerChars}`;
  }

  // user name => UserName
  pascal(input: string, options: Options = {}): string {
    return baseCase(input, {
      delimiter: '',
      transform: this.transform,
      ...options,
    });
  }
}

export default Pascal;
