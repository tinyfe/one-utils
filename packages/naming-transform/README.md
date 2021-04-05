# `@tinyfe/naming-transform`

> 转换为不同类型的命名风格

## Usage

```js
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
} from '@tinyfe/naming-transform';

style('userName'); // camel
style('USER_NAME'); // constant
style('user-name'); // kebab
style('UserName'); // pascal
style('user_name'); // snake
style('user_Name'); // snake
style('Username'); // ''
style('My user name is Rain120'); // ''

baseCase('my user name is rain120'); // my user name is rain120
camel('username'); // username
camel('user name'); // userName

capital('username'); // Username
capital('user name'); // User Name

constant('user name'); // USER_NAME

dot('user name'); // user.name

header('user name'); // User-Name
header('userName'); // User-Name

hyphen('user name'); // user-name
hyphen('USER NAME'); // user-name
kebab('user name'); // user-name
kebab('USER NAME'); // user-name

param('user name'); // user-name
param('USER NAME'); // user-name

path('user name'); // user/name

pascal('user Name'); // UserName
pascal('user name'); // UserName

snake('user name'); // user_name

sentence('my User Name is Rain120'); // My user name is rain120

underscore('user name'); // user_name

lowerCaseFirst('UserName'); // userName
upperCaseFirst('username'); // Username
```

## 命名风格(naming-style)

`camelCased` 驼峰式命名

> 单词用首字母大写分割, 首单词首字母小写

```js
camel('user name'); // userName
```

`PascalCase` 帕斯卡/大驼峰命名

> 单词用首字母大写分割, 首单词首字母大写

```js
pascal('user name'); // UserName
```

`kebab-cased` 短横线命名(又称烤串命名) / `hyphen-cased` 连字号格式命名

> 单词用 - (中划线) 分割

```js
hyphen('user name'); // user-name
kebab('user name'); // user-name
```

`snake_cased` 蛇型命名

> 单词间使用 \_ (下划线) 分割, 全小写
> 如果所有单词都小写, 称之为 `lower snake case (小蛇式)`, 例如`get_user_name`。
> 如果所有单词都大写, 称之为 `upper snake case (大蛇式)`, 例如`GET_USER_NAME`。

```js
snake('user name'); // user_name
```

`UnderScore_cased` 下划线命名

> 单词间使用 \_ (下划线) 分割, 不区分大小写

```js
underscore('user name'); // user_name
```

`CONSTANT_CASED` 常量命名

> 单词全大写, 用 \_ (下划线) 分割

```js
constant('user name'); // USER_NAME
```

`capital.cased`

> 转换成首字母大写的字符串

```js
capital('user name'); // User Name
```

`dot.cased`

> 转换成用 `.` 分隔的字母小写的字符串

```js
dot('user name'); // user.name
```

`header.cased`

> 转换为用 `-` 分隔的首字母大写的字符串

```js
header('user name'); // User.Name
```

`param.cased`

> 转换成用 `-` 分隔的字母小写的字符串

```js
param('user name'); // user-name
```

`path.cased`

> 转换成用 `/` 分隔的字母小写的字符串

```js
path('user name'); // user/name
```

`sentence.cased`

> 转换成用 **空格** 分隔的首大写，其他字母都小写的字符串

```js
sentence('my User Name is Rain120'); // My user name is rain120
```

`base.cased`

> 转换成用 **空格** 分隔的小写字母

```js
baseCase('my User Name is Rain120'); // my user name is rain120
```

### Utils

`lowerCaseFirst`

> 首字母小写

```js
lowerCaseFirst('RAIN120'); // rAIN120
```

`upperCaseFirst`

> 首字母大写

```js
upperCaseFirst('rain120'); // Rain120
```

### 参考

[Case Styles: Camel, Pascal, Snake, and Kebab Case](https://betterprogramming.pub/string-case-styles-camel-pascal-snake-and-kebab-case-981407998841)

[Letter Case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles)

[change-case](https://github.com/blakeembrey/change-case)
