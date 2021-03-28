// LINK_TO: https://en.wikipedia.org/wiki/Camel_case
class Camel implements NamingAtom {
  test(text: string) {
    return /^[a-z]+(([0-9]|[A-Z])[a-z]*)+$/.test(text);
  }
}

export default Camel;
