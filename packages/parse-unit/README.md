# `parse unit`

parses number and unit, eg: '100px' into [100, 'px'], also it include validate css value

## Usage

```js
import parseUnit, { isCssValue } from '@tinyfe/parse-unit';

isCssValue('100px'); // true
parseUnit('100px'); // [100, 'px']
parseUnit('100%'); // [100, '%']
parseUnit('100'); // [100, '']

// CSS unit
parseUnit('auto'); // ['auto', '']
// etc...
```
