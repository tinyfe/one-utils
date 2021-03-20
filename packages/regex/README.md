# `@tinyfe/regex`

> 正则表达式大全, 旨在收集所有通用的正则表达式。

## Usage

```js
- import { testRegex, phoneRegex } from '@tinyfe/regex'

testRegex(phoneRegex, '13456789527'); // true
```

## API

迄今(`2021-03-20`)为止正则表达式的所有方法, 且使用方法保持一致

- `exec`

- `test`

- `match`

- `matchAll`

- `search`

- `replace`

- `replaceAll`

- `split`

## Regex 字符串

### 特殊字符

- `charRegex` 英文特殊字符

```
/[~!@#$%^&*()/\|,.<>?"'();:_+-=\[\]{}\s+]/
```

- `charCNRegex` 中文特殊字符

```
/[`~!@#$^&*()=|{}':;',\\[\\].<>\/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_\s+]/s
```

### color

- `cssUnitRegex` `css值单位`

- `rgbRegex`

- `rgbaRegex`

- `hslRegex`

- `hslaRegex`

- `hsvRegex`

- `hsvaRegex`

- `hex3Regex`

- `hex6Regex`

- `hex4Regex`

- `hex8Regex`

### date

- `dateTimeRegex` `utc`时间格式

```
2021-03-14T15:20:00Z
2021-03-14T15:20:00+08:50
```

- `unixTimeRegex` `unix`时间格式

- `dateRegex` `YYYY-MM-DD`时间格式

- `hourClock12Regex` 12 小时制

- `hourClock24Regex` 24 小时制

### 数字

- `percentileRegex` 百分位

- `thousandsRegex` 千分位

- `tenThousandsRegex` 万分位

### email

- `emailRegex` 邮箱

#### host

- `integerRegex` 整数

- `positiveIntegerRegex` 正整数

- `unPositiveIntegerRegex` 非正整数

- `negativeIntegerRegex` 负整数

- `unNegativeIntegerRegex` 非负整数

- `naturalNumberRegex` 自然数

- `floatRegex` 浮点数

- `positiveFloatRegex` 正浮点数

- `unPositiveFloatRegex` 非正浮点数

- `negativeFloatRegex` 负浮点数

- `unNegativeFloatRegex` 非负浮点数

### 电话(手机, 固话)

- `phoneRegex` 手机号码

- `phoneLooseRegex` 宽松模式手机号码 **(不校验手机号码是否有效)**

- `telephoneRegex` 固话

### 身份证号码(15 位, 18 位)

- `idCardRegex` 15 位 + 18 位

- `idCard15Regex`

- `idCard18Regex`
