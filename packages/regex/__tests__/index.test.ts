'use strict';
import { dateTimeRegex, test as testRegex } from '../src';

describe('@tinyfe/regex', () => {
  test('test date', () => {
    expect(testRegex(dateTimeRegex, '2021-03-14')).toBe(false);

    expect(testRegex(dateTimeRegex, '2021-03-14T15:20:00Z')).toBe(true);

    expect(testRegex(dateTimeRegex, '2021-03-14T15:20:00+08:50')).toBe(true);
  });
});
