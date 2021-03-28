'use strict';

import { style } from '../src';

describe('@tinyfe/naming-convert', () => {
  test('test style', () => {
    expect(style('userName')).toBe('camel');
    expect(style('USER_NAME')).toBe('constant');
    expect(style('user-name')).toBe('kebab');
    expect(style('UserName')).toBe('pascal');
    expect(style('user_name')).toBe('snake');
    expect(style('user_Name')).toBe('underscore');
  });
});
