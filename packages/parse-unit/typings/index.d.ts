export interface Options {
  onlyValue?: boolean;
  onlyUnit?: boolean;
}

export enum KEYWORD {
  'auto',
  'revert',
  'unset',
  'inherit',
  'initial',
  'max-content',
  'min-content',
  'fit-content',
  '-webkit-fill-available',
}

export type RegexMatch = RegExp.match;
