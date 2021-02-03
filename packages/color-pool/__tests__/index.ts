'use strict';

const pool = require('..');

describe('aliceblue is #f0f8ff', () => {
  test('getSomethings', () => {
    expect(pool['aliceblue']).toBe('#f0f8ff');
  });
});

describe('antiquewhite is #faebd7', () => {
  test('getSomethings', () => {
    expect(pool['antiquewhite']).toBe('#faebd7');
  });
});
