# `@tinyfe/type-of`

> typeof the value.

## Usage

```js
import typeOf, { includes, of, is, getTypeString } from '@tinyfe/type-of';
const type = typeOf({});

// instance
type.type(); // Object
type.includes(['Array', 'String']); // false
type.of(); // {}.constructor
type.is('Object'); // true
type.getTypeString(); // Object

// functions
includes(['Array', 'String'], {}); // false
of([]); // [].constructor
is('Object', {}); // true
getTypeString([]); // Array
```

## Build Type

```js
$BUILD_IN = [
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
```

## APIs

### `typeOf`

实例函数, 实例化成 `type-of` 对象, `input = typeOf(input)`

### `type`

实例调用 `input.type()`

### `includes`

函数式 `includes([type1, type2, xxx], input)`

实例调用 `type.includes([type1, type2, xxx])`

### `of`

函数式 `of(input)`

实例调用 `type.of()`

### `is`

函数式 `is(typeString, input)`

实例调用 `type.is()`

### `getTypeString`

函数式 `getTypeString(input)`

实例调用 `type.getTypeString()`
