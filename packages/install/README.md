# `@tinyfe/install`

> install dependencies into your input path.

## Usage

```js
import { install, showUseYarn } from '@tinyfe/install';

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
