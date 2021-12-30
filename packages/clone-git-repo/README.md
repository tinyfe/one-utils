# `clone-git-repo`

> download git repo

## Usage

```js
import { download, downloadPromisify } from '@tinyfe/clone-git-repo';
// sync download the repo from a git repository
download('Rain120/mini-webpack', './clone/' /* execute absolute path */, {
  clone: true,
});

// async download the repo from a git repository
(
  async () => {
    await downloadPromisify('Rain120/mini-webpack', './clone/' /* execute absolute path */, {
      clone: true,
    }).catch(err => {
      console.log(err);
    });
    console.log('done');
  },
)();
```

### Apis

`download(repo: string, dest: string, opts?: OptionTypes, cb?: Fn)`

- repo: string, support `GitHub, gitlab, bitbucket`
  Username/repoName, eg: 'Rain120/mini-webpack'
- dest: string
  download path, eg: './clone'

- opts

  - plugins

    ```ts
    type plugins = (...args: any[]) => [Repository, DownloadUrl];

    type DownloadUrl = string;

    interface Repository {
      type?: string;
      owner?: string;
      name?: string;
      checkout?: string;
    }
    ```

    custom set the repo info and

  - clone: boolean

    clone the repo

- cb
  callback after download git repository
