function prefix(name: string = ''): (...args: any[]) => string {
  return (...args: any): string => {
    const hasOwn = {}.hasOwnProperty;

    const classes: string[] = [];

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      const argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
        classes.push(name + arg);
      } else if (Array.isArray(arg)) {
        if (arg.length) {
          const inner = classnames.apply(null, arg);
          inner && classes.push(name + inner);
        }
      } else if (argType === 'object') {
        if (arg.toString !== Object.prototype.toString) {
          classes.push(name + arg.toString());
        } else {
          for (const key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
              classes.push(name + key);
            }
          }
        }
      }
    }

    return classes.join(' ');
  };
}

const classnames = prefix();

export { classnames, prefix };
export default classnames;
