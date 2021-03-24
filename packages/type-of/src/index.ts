class TypeOf<T = any> {
  value;
  $BUILD_IN = [Object, Function, Array, String, Boolean, Number, Symbol, Date, RegExp, Error];

  constructor(value: T) {
    this.value = value;
  }

  $isBuiltIn(_constructor: any): (_constructor: any) => boolean {
    return _constructor => {
      return this.$BUILD_IN.some(item => item === _constructor);
    };
  }

  of(value: any = this.value) {
    if (value === null || value === undefined) {
      return value;
    }

    return value.constructor;
  }

  is(type: string) {
    if (this.of(type) === String) {
      return this.getTypeString(this.value) === type;
    } else {
      return this.of(this.value) === type;
    }
  }

  include(type: string[]) {
    return type.some(_ => this.is(_));
  }

  getTypeString(value: any = this.value): string {
    const type = Object.prototype.toString.call(value).slice(8, -1);

    if (value === null || value === undefined) {
      return type.toLowerCase();
    }

    // constructor type
    const cType = this.of(value);

    if (cType && !this.$isBuiltIn(cType)) {
      return cType.name;
    }

    return type;
  }

  type(): string {
    return this.getTypeString(this.value);
  }
}

export default TypeOf;
