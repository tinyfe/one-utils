const phones = [
  {
    value: '10123456775',
    // [phoneRegex, phoneLooseRegex]
    result: [false, false],
  },
  {
    value: '11123456775',
    result: [false, false],
  },
  {
    value: '12345678910',
    result: [false, false],
  },
  {
    value: '13123456775',
    result: [true, true],
  },
  {
    value: '14123456775',
    result: [false, true],
  },
  {
    value: '15123456775',
    result: [true, true],
  },
  {
    value: '16123456775',
    result: [false, true],
  },
  {
    value: '17345678910',
    result: [true, true],
  },
  {
    value: '18123456775',
    result: [true, true],
  },
  {
    value: '19123456775',
    result: [true, true],
  },
];

export default phones;
