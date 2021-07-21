# `device`

> 判断浏览器的类型

## Usage

```js
import {
  isMobile,
  isIos,
  isAndroid,
  isChrome,
  isSafari,
  isEdge,
  isFirefox,
  isIPhoneX,
  judgeDevice,
  getAgent,
} from '@tinyfe/device';

// navigator window 都不存在的时候返回 null
// 否则 navigator.userAgent || navigator.vendor || (window as any).opera
getAgent();

// fn: agent => boolean
judgeDevice(fn);
```
