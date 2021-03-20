'use strict';

import {
  dateTimeRegex,
  test as testRegex,
  phoneRegex,
  phoneLooseRegex,
  idCardRegex,
  idCard15Regex,
  idCard18Regex,
} from '../src';

import phones from './phone';
import idCard from './id-card';

describe('@tinyfe/regex', () => {
  test('test date', () => {
    expect(testRegex(dateTimeRegex, '2021-03-14')).toBe(false);

    expect(testRegex(dateTimeRegex, '2021-03-14T15:20:00Z')).toBe(true);

    expect(testRegex(dateTimeRegex, '2021-03-14T15:20:00+08:50')).toBe(true);
  });

  test('test phone', () => {
    phones.map(item => {
      expect(testRegex(phoneRegex, item.value)).toBe(item.result[0]);

      expect(testRegex(phoneLooseRegex, item.value)).toBe(item.result[1]);
    });
  });

  test('test id card', () => {
    idCard.map(item => {
      expect(testRegex(idCard15Regex, item.value)).toBe(item.result[0]);

      expect(testRegex(idCard18Regex, item.value)).toBe(item.result[1]);

      expect(testRegex(idCardRegex, item.value)).toBe(item.result[2]);
    });
  });
});
