export const $BUILD_IN = [
  Object,
  Function,
  Array,
  String,
  Boolean,
  Number,
  Symbol,
  Date,
  RegExp,
  Error,
];

function $isBuiltIn(_constructor: any): (_constructor: any) => boolean {
  return _constructor => {
    return $BUILD_IN.some(item => item === _constructor);
  };
}

/**
 * @description get value constructor
 * @param value
 * @returns
 */
export function of(value: any) {
  if (value === null || value === undefined) {
    return value;
  }

  return value.constructor;
}

export function getTypeString(value: any): string {
  const type = Object.prototype.toString.call(value).slice(8, -1);

  if (value === null || value === undefined) {
    return type.toLowerCase();
  }

  // constructor type
  const cType = of(value);

  if (cType && !$isBuiltIn(cType)) {
    return cType.name;
  }

  return type;
}

export function is(type: string, value: any) {
  if (of(type) === String) {
    return getTypeString(value) === type;
  } else {
    return of(value) === type;
  }
}

export function includes(type: string[], value: any) {
  return type.some(_ => is(_, value));
}

export class TypeOf<T = any> {
  value;
  $BUILD_IN = $BUILD_IN;

  constructor(value: T) {
    this.value = value;
  }

  $isBuiltIn(_constructor: any): (_constructor: any) => boolean {
    return $isBuiltIn(_constructor);
  }

  type(): string {
    return getTypeString(this.value);
  }

  of() {
    return of(this.value);
  }

  is(type: string) {
    return is(type, this.value);
  }

  includes(type: string[]) {
    return includes(type, this.value);
  }

  getTypeString() {
    return getTypeString(this.value);
  }
}

const typeOf = (value: any) => new TypeOf(value);

export default typeOf;
