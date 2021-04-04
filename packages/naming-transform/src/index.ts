// LINK_TO: https://en.wikipedia.org/wiki/Naming_convention_(programming)
import Camel from './style/camel';
import Capital from './style/capital';
import Constant from './style/constant';
import Kebab from './style/kebab';
import Pascal from './style/pascal';
import Snake from './style/snake';
import Underscore from './style/underscore';

const instances = {
  camel: new Camel(),
  capital: new Capital(),
  constant: new Constant(),
  kebab: new Kebab(),
  pascal: new Pascal(),
  snake: new Snake(),
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

export const pascal = (input: string, options: Options = {}) =>
  transform('pascal', input, options);

export const kebab = (input: string, options: Options = {}) =>
  transform('kebab', input, options);

export const constant = (input: string, options: Options = {}) =>
  transform('constant', input, options);

export const snake = (input: string, options: Options = {}) =>
  transform('snake', input, options);

export const underscore = (input: string, options: Options = {}) =>
  transform('underscore', input, options);

export default {
  style,
  camel,
  capital,
  constant,
  kebab,
  pascal,
  snake,
  underscore,
};
