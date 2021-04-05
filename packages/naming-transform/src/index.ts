// LINK_TO: https://en.wikipedia.org/wiki/Naming_convention_(programming)
import Camel from './style/camel';
import Capital from './style/capital';
import Constant from './style/constant';
import Kebab from './style/kebab';
import Pascal from './style/pascal';
import Snake from './style/snake';
import Sentence from './style/sentence';
import Underscore from './style/underscore';
import { baseCase } from './base-case';

export * from './base-case';
export * from './utils/lower-case';
export * from './utils/lower-case-first';
export * from './utils/upper-case';
export * from './utils/upper-case-first';

const instances = {
  camel: new Camel(),
  capital: new Capital(),
  constant: new Constant(),
  kebab: new Kebab(),
  pascal: new Pascal(),
  snake: new Snake(),
  sentence: new Sentence(),
  underscore: new Underscore(),
};

export const style = (input: string) => {
  for (let [key, instance] of Object.entries(instances)) {
    if (instance!.test(input)) {
      return key;
    }
  }

  return '';
};

function transform(target: string, input: string, options: Options): string {
  const instance = instances[target];
  if (!target || !instance) {
    return '';
  }

  return instance[target](input, options);
}

export const camel = (input: string, options: Options = {}) =>
  transform('camel', input, options);

export const capital = (input: string, options: Options = {}) =>
  transform('capital', input, options);

export const constant = (input: string, options: Options = {}) =>
  transform('constant', input, options);

export const kebab = (input: string, options: Options = {}) =>
  transform('kebab', input, options);

export const pascal = (input: string, options: Options = {}) =>
  transform('pascal', input, options);

export const snake = (input: string, options: Options = {}) =>
  transform('snake', input, options);

export const sentence = (input: string, options: Options = {}) =>
  transform('sentence', input, options);

export const dot = (input: string, options: Options = { delimiter: '.' }) =>
  baseCase(input, options);

export const path = (input: string, options: Options = { delimiter: '/' }) =>
  kebab(input, options);

export const header = (input: string, options: Options = { delimiter: '-' }) =>
  capital(input, options);

export const hyphen = kebab;
export const param = kebab;
export const underscore = snake;
