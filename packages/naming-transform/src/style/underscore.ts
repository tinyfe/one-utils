// LINK_TO: https://en.wikipedia.org/wiki/Snake_case
import Snake from './snake';

class Underscore extends Snake implements NamingAtom {
  underscore(input: string, options: Options = {}): string {
    return this.snake(input, options);
  }
}

export default Underscore;
