// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags
export interface IFlags {
  // RegExp.prototype.global
  g?: boolean; //	Global search.
  // RegExp.prototype.ignoreCase
  i?: boolean; //	Case-insensitive search.
  // RegExp.prototype.multiline
  m?: boolean; //	Multi-line search.
  // RegExp.prototype.dotAll
  s?: boolean; //	Allows . to match newline characters.
  // RegExp.prototype.unicode
  u?: boolean; //	"unicode"; treat a pattern as a sequence of unicode code points.
  // RegExp.prototype.sticky
  y?: boolean; //	Perform a "sticky" search that matches starting at the current position in the target string. See sticky.
}

export enum Flags {
  g,
  i,
  m,
  s,
  u,
  y,
}
