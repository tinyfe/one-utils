'use strict';

import { downloadPromisify } from '../src';

describe('@tinyfe/download-git-repo', () => {
  jest.setTimeout(2000);

  test('test', () => {
    expect(
      (async () => {
        await downloadPromisify('Rain120/mini-webpack', './clone/', {
          clone: true,
        }).catch(err => {
          console.log(err);
        });
        console.log('done');
      })(),
    ).toBe(undefined);
  });
});
