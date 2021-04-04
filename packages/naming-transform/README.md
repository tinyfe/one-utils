# `@tinyfe/naming-transform`

> Converting to different kind of naming style

## Usage

```
import {} from '@tinyfe/naming-transform';

```

## 命名风格(naming-style)

- **`camelCased` 驼峰式命名**: 单词用首字母大写分割, 首单词首字母小写

e.g. `userName`

- **`PascalCase` 帕斯卡/大驼峰命名**: 单词用首字母大写分割, 首单词首字母大写

e.g. `UserName`

- **`kebab-cased` 短横线命名 / `hyphen-cased` 连字号格式命名**: 单词用 - (中划线) 分割

e.g. `user-name`

- **`snake_cased` 蛇型命名**: 单词间使用 \_ (下划线) 分割, 全小写

如果所有单词都小写, 称之为 `lower snake case (小蛇式)`, 例如`get_user_name`。

如果所有单词都大写, 称之为 `upper snake case (大蛇式)`, 例如`GET_USER_NAME`。

- **`UnderScore_cased` 下划线命名**: 单词间使用 \_ (下划线) 分割, 不区分大小写

e.g. `user_name`

- **`CONSTANT_CASED` 常量命名**: 单词全大写, 用 \_ (下划线) 分割

e.g. `USER_NAME`

### 参考

[Case Styles: Camel, Pascal, Snake, and Kebab Case](https://betterprogramming.pub/string-case-styles-camel-pascal-snake-and-kebab-case-981407998841)

[Letter Case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles)
