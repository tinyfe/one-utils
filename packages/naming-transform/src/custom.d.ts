export interface NamingAtom {
  test?(input: string): boolean;
  transform?(input: string, index: number): string;
}

export interface Options {
  splitRegexp?: RegExp | RegExp[];
  stripRegexp?: RegExp | RegExp[];
  delimiter?: string;
  transform?: (part: string, index: number, parts: string[]) => string;
}
