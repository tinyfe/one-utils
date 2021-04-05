import { lowerCase } from '../utils/lower-case';
import { upperCaseFirst } from '../utils/upper-case-first';
import { baseCase } from '../base-case';

class Capital implements NamingAtom {
  test(input: string) {
    return false;
  }

  transform(input: string): string {
    return upperCaseFirst(lowerCase(input));
  }

  capital(input: string, options: Options = {}): string {
    return baseCase(input, {
      delimiter: ' ',
      transform: this.transform,
      ...options,
    });
  }
}

export default Capital;
