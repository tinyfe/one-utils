# `parse unit`

parses number and unit, eg: '100px' into [100, 'px'], also it include validate css value

## Usage

```js
import parseUnit, { isCssValue } from '@tinyfe/parse-unit';

// judge the css value
isCssValue('100px'); // true

// parse unit by the value
parseUnit('100px'); // [100, 'px']
parseUnit('100%'); // [100, '%']
parseUnit('100'); // [100, '']

// CSS unit
parseUnit('auto'); // ['auto', '']
parseUnit('revert'); // ['revert', '']
parseUnit('unset'); // ['unset', '']
parseUnit('inherit'); // ['inherit', '']
parseUnit('initial'); // ['initial', '']
parseUnit('max-content'); // ['max-content', '']
parseUnit('min-content'); // ['min-content', '']
parseUnit('fit-content'); // ['fit-content', '']
parseUnit('-webkit-fill-available'); // ['-webkit-fill-available', '']
// etc...
```
