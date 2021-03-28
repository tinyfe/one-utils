// LINK_TO: https://en.wikipedia.org/wiki/Snake_case

class Snake implements NamingAtom {
  test(text: string) {
    return /^[0-9a-z]+(_[0-9a-z]+)+$/.test(text);
  }
}

export default Snake;
