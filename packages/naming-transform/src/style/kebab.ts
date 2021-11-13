// LINK_TO: https://en.wikipedia.org/wiki/Letter_case#Special_case_styles
import { NamingAtom, Options } from '../custom.d';
import { lowerCase } from '../utils/lower-case';
import { baseCase } from '../base-case';

class Kebab implements NamingAtom {
  test(input: string) {
    return /^[0-9a-z]+(-[0-9a-z]+)+$/.test(input);
  }

  transform(input: string): string {
    return lowerCase(input);
  }

  kebab(input: string, options: Options = {}): string {
    return baseCase(input, {
      delimiter: '-',
      transform: this.transform,
      ...options,
    });
  }
}

export default Kebab;
