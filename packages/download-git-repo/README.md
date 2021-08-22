# `download-git-repo`

> download git repo

## Usage

```js
import { downloadPromisify } from '@tinyfe/download-git-repo';

(async () => {
  await downloadPromisify('Rain120/mini-webpack', './clone/', {
    clone: true,
  }).catch(err => {
    console.log(err);
  });
  console.log('done');
})();
```
