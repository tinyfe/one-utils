# `@tinyfe/install`

> install dependencies into your input path.

## Usage

```js
import { install } from '@tinyfe/install';
import { showUseYarn } from '@tinyfe/share';

install(process.cwd(), ['@tinyfe/git-status']);

install(process.cwd(), ['@tinyfe/git-clone'], {
  useYarn: showUseYarn(),
  isOnline: true,
  devDependencies: ['lodash'],
});
```

## Params

### root

install path

### dependencies

dependencies

### install options

- useYarn

- isOnline

- devDependencies
