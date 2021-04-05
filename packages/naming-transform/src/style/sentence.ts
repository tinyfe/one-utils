import { upperCaseFirst } from '../utils/upper-case-first';
import { lowerCase } from '../utils/lower-case';
import { baseCase } from '../base-case';

class Sentence implements NamingAtom {
  test(input: string) {
    return false;
  }

  transform(input: string, index: number): string {
    const result = lowerCase(input);
    if (index === 0) {
      return upperCaseFirst(result);
    }
    return result;
  }

  sentence(input: string, options: Options = {}): string {
    return baseCase(input, {
      delimiter: ' ',
      transform: this.transform,
      ...options,
    });
  }
}

export default Sentence;
