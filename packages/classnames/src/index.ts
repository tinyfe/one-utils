// LINK_TO: https://github.com/JedWatson/classnames
const hasOwn = {}.hasOwnProperty;

function prefix(name: string = ''): (...args: any[]) => string {
  return (...args: any): string => {
    const classes: string[] = [];

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      if (!arg) {
        continue;
      }

      const argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        if (arg.length) {
          const inner = prefix(name).apply(null, arg);
          inner && classes.push(inner);
        }
      } else if (argType === 'object') {
        if (arg.toString !== Object.prototype.toString) {
          classes.push(arg.toString());
        } else {
          for (const key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
              classes.push(key);
            }
          }
        }
      }
    }

    return classes.map(c => ((c + '').includes(name) ? c : name + c)).join(' ');
  };
}

const classnames = prefix();

export { classnames, prefix };
export default classnames;
