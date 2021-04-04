import { baseCase } from '../base-case';
import { upperCase } from '../utils/upper-case';

class Constant implements NamingAtom {
  test(input: string) {
    return /^[0-9A-Z]+(_[0-9A-Z]+)+$/.test(input);
  }

  // user name => USER_NAME
  constant(input: string, options: Options = {}): string {
    return baseCase(input, {
      delimiter: '_',
      transform: upperCase,
      ...options,
    });
  }
}

export default Constant;
