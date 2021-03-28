// LINK_TO: https://en.wikipedia.org/wiki/Letter_case#Special_case_styles

class Kebab implements NamingAtom {
  test(text: string) {
    return /^[0-9a-z]+(-[0-9a-z]+)+$/.test(text);
  }
}

export default Kebab;
