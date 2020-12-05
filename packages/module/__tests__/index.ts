'use strict';

const getSomethings = require('..');

describe('module', () => {
  test('getSomethings', () => {
    expect(getSomethings()).toBe(undefined);
  });
});
