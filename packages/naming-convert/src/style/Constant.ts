class Constant implements NamingAtom {
  test(text: string) {
    return /^[0-9A-Z]+(_[0-9A-Z]+)+$/.test(text);
  }
}

export default Constant;
