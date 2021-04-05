'use strict';

import {
  style,
  baseCase,
  camel,
  capital,
  constant,
  dot,
  header,
  hyphen,
  kebab,
  param,
  path,
  pascal,
  snake,
  sentence,
  underscore,
  lowerCaseFirst,
  upperCaseFirst,
} from '../src';

describe('@tinyfe/naming-transform', () => {
  test('test style', () => {
    expect(style('userName')).toBe('camel');
    expect(style('USER_NAME')).toBe('constant');
    expect(style('user-name')).toBe('kebab');
    expect(style('UserName')).toBe('pascal');
    expect(style('user_name')).toBe('snake');
    expect(style('user_Name')).toBe('snake');
    expect(style('Username')).toBe('');
    expect(style('My user name is Rain120')).toBe('');
  });

  test('test convert', () => {
    expect(baseCase('my User Name is Rain120')).toBe('my user name is rain120');
    expect(camel('username')).toBe('username');
    expect(camel('user name')).toBe('userName');
    expect(capital('username')).toBe('Username');
    expect(capital('user name')).toBe('User Name');
    expect(constant('user name')).toBe('USER_NAME');
    expect(dot('user name')).toBe('user.name');
    expect(header('user name')).toBe('User-Name');
    expect(header('userName')).toBe('User-Name');
    expect(hyphen('user name')).toBe('user-name');
    expect(hyphen('USER NAME')).toBe('user-name');
    expect(kebab('user name')).toBe('user-name');
    expect(kebab('USER NAME')).toBe('user-name');
    expect(param('user name')).toBe('user-name');
    expect(param('USER NAME')).toBe('user-name');
    expect(path('user name')).toBe('user/name');
    expect(pascal('user Name')).toBe('UserName');
    expect(pascal('user name')).toBe('UserName');
    expect(snake('user name')).toBe('user_name');
    expect(sentence('my User Name is Rain120')).toBe('My user name is rain120');
    expect(underscore('user name')).toBe('user_name');
    expect(lowerCaseFirst('UserName')).toBe('userName');
    expect(upperCaseFirst('username')).toBe('Username');
  });
});
