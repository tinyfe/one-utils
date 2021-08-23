'use strict';

import { downloadPromisify } from '../src';

describe('@tinyfe/download-git-repo', () => {
  jest.setTimeout(2000);

  test('test', () => {
    (async () => {
      await downloadPromisify(
        'Rain120/mini-webpack',
        './packages/download-git-repo/__tests__/clone/',
        {
          clone: true,
        },
      ).catch(err => {
        console.log(err);
      });
    })();
  });
});
