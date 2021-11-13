import { NamingAtom, Options } from '../custom.d';
import { baseCase } from '../base-case';
import { lowerCase } from '../utils/lower-case';
import Pascal from './pascal';

// LINK_TO: https://en.wikipedia.org/wiki/Camel_case
class Camel implements NamingAtom {
  test(input: string) {
    return /^[a-z]+(([0-9]|[A-Z])[a-z]*)+$/.test(input);
  }

  transform(input: string, index: number): string {
    if (index === 0) {
      return lowerCase(input);
    }
    const pascal = new Pascal();

    return pascal!.transform(input, index);
  }

  // user name => userName
  camel(input: string, options: Options = {}): string {
    return baseCase(input, {
      delimiter: '',
      transform: this.transform,
      ...options,
    });
  }
}

export default Camel;
