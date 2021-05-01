import {
  test as testRegex,
  idCardRegex,
  idCard15Regex,
  idCard18Regex,
} from '../src';

const idCard = [
  {
    value: '345678001100234',
    // [idCard15Regex, idCard18Regex, idCardRegex]
    result: [false, false, false],
  },
  {
    value: '345678991100234',
    result: [false, false, false],
  },
  {
    value: '345678001101234',
    result: [true, false, true],
  },
  {
    value: '345678991101234',
    result: [true, false, true],
  },
  {
    value: '345678199911002345',
    result: [false, false, false],
  },
  {
    value: '345678119911002345',
    result: [false, false, false],
  },
  {
    value: '345678199911012345',
    result: [false, true, true],
  },
  {
    value: '34567819991101234x',
    result: [false, true, true],
  },
];

describe('@tinyfe/regex', () => {
  test('test id card', () => {
    idCard.map(item => {
      expect(testRegex(idCard15Regex, item.value)).toBe(item.result[0]);

      expect(testRegex(idCard18Regex, item.value)).toBe(item.result[1]);

      expect(testRegex(idCardRegex, item.value)).toBe(item.result[2]);
    });
  });
});
