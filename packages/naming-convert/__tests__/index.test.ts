'use strict';

import {
  style,
  camel,
  capital,
  constant,
  kebab,
  pascal,
  snake,
  underscore,
} from '../src';

describe('@tinyfe/naming-convert', () => {
  test('test style', () => {
    expect(style('userName')).toBe('camel');
    expect(style('Username')).toBe('capital');
    expect(style('USER_NAME')).toBe('constant');
    expect(style('user-name')).toBe('kebab');
    expect(style('UserName')).toBe('pascal');
    expect(style('user_name')).toBe('snake');
    expect(style('user_Name')).toBe('snake');
  });

  test('test convert', () => {
    expect(camel('username')).toBe('username');
    expect(camel('user name')).toBe('userName');
    expect(capital('username')).toBe('Username');
    expect(capital('user name')).toBe('User Name');
    expect(pascal('user Name')).toBe('UserName');
    expect(pascal('user name')).toBe('UserName');
    expect(constant('userName')).toBe('USER_NAME');
    expect(constant('user name')).toBe('USER_NAME');
    expect(kebab('user name')).toBe('user-name');
    expect(snake('user name')).toBe('user_name');
    expect(underscore('user name')).toBe('user_name');
  });
});
