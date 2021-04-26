'use strict';

import watermark from '../src';

const watermark = new watermark();

describe('@tinyfe/watermark', () => {
  test('test', () => {
    expect(watermark).toBe(undefined);
  });
});
