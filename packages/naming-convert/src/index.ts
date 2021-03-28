// LINK_TO: https://en.wikipedia.org/wiki/Naming_convention_(programming)
import Camel from './style/Camel';
import Constant from './style/Constant';
import Kebab from './style/Kebab';
import Pascal from './style/Pascal';
import Snake from './style/Snake';
import Underscore from './style/Underscore';

const instances = {
  camel: new Camel(),
  constant: new Constant(),
  kebab: new Kebab(),
  pascal: new Pascal(),
  snake: new Snake(),
  underscore: new Underscore(),
};

export const style = (text: string) => {
  for (let [key, instance] of Object.entries(instances)) {
    if (instance.test(text)) {
      return key;
    }
  }

  return '';
};

export default {
  style,
};
