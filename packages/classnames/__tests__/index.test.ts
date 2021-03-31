'use strict';

import { prefix, classnames } from '../src';

describe('@tinyfe/classnames', () => {
  test('test', () => {
    expect(
      classnames(1, 'info', ['rain120', { FEer: true }], {
        react: true,
        vue: false,
      }),
    ).toBe('1 info rain120 FEer react');

    expect(
      prefix('RAINY__')(1, 'info', ['rain120', { FEer: true }], {
        react: true,
        vue: false,
      }),
    ).toBe('RAINY__1 RAINY__info RAINY__rain120 RAINY__FEer RAINY__react');
  });
});
