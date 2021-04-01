# @tinyfe/classnames

> TODO: description

## Usage

```js
import { prefix, classnames } from '@tinyfe/classnames';

classnames(1, 'info', ['rain120', { FEer: true }], {
  react: true,
  vue: false,
}); // 1 info rain120 FEer react

prefix('RAINY__')(1, 'info', ['rain120', { FEer: true }], {
  react: true,
  vue: false,
}); // RAINY__1 RAINY__info RAINY__rain120 RAINY__FEer RAINY__react
```
