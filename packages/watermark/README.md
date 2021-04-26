# `@tinyfe/watermark`

> TODO: description

## Usage

```js
import watermark from '@tinyfe/watermark';

// TODO: DEMONSTRATE API
```

## APIs 设计

### 自动水印实现

通过创建 `canvas` 绘制水印, 并转换成 `base64`, 然后添加到外部传入的 `dom` 上, 并通过 [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 提供监视用户对 `DOM` 树所做更改的能力来自动补全删除的水印。(Note: [MutationObserver 兼容性](https://caniuse.com/?search=MutationObserver))

### 外部水印

通过外部传入的 `image` 来实现自动补全删除的水印。
