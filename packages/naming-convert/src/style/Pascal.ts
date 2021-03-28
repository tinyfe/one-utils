// LINK_TO: https://en.wikipedia.org/wiki/Camel_case

class Pascal implements NamingAtom {
  test(text: string) {
    return /^[A-Z][0-9a-z]*([A-Z][0-9a-z]*)+$/.test(text);
  }
}

export default Pascal;
