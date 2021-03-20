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

export default idCard;
