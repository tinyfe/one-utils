'use strict';

import * as platform from '../src';

const userAgentList = [
  [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    [
      {
        key: 'Android',
        value: false,
      },
      {
        key: 'Safari',
        value: true,
      },
      {
        key: 'Ios',
        value: true,
      },
    ],
  ],
  [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.16 Safari/537.36 Edg/80.0.361.9',
    [],
  ],
];

describe('@tinyfe/platform', () => {
  test('test', () => {
    userAgentList.forEach(userAgent => {
      const [agent, testList] = userAgent;

      (testList || ([] as any)).forEach(_ => {
        const { key, value } = _;
        const cb = platform['is' + key];

        cb && expect(cb(agent)).toEqual(value);
      });
    });
  });
});
