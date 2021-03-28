// LINK_TO: https://en.wikipedia.org/wiki/Snake_case
import Snake from './Snake';

class Underscore extends Snake implements NamingAtom {
  test(text: string) {
    return /^([0-9a-zA-Z]|_)+$/.test(text);
  }
}

export default Underscore;
