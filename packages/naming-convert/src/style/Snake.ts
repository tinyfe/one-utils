// LINK_TO: https://en.wikipedia.org/wiki/Snake_case

import { lowerCase } from '../utils/lower-case';
import { baseCase } from '../base-case';

class Snake implements NamingAtom {
  test(input: string) {
    return /^[0-9a-z]+(_[0-9a-z]+)+$/.test(input.toLowerCase());
  }

  transform(input: string): string {
    return lowerCase(input);
  }

  snake(input: string, options: Options = {}): string {
    return baseCase(input, {
      delimiter: '_',
      transform: this.transform,
      ...options,
    });
  }
}

export default Snake;
