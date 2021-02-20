# `@tinyfe/colors`

> TODO: description

## Usage

### 方法

```js
import { isColor, isHex, isRgb, isRgba, isHsl, isHsla, isHsv, isHsva } from '@tinyfe/colors';

isColor('#00bfff'); // true

isColor('#rain120'); // false

isHex('#00bfff'); // true

isRgb('rgb(0, 191, 255)'); // true

isRgba('rgba(0, 191, 255, 1)'); // true

isHsl('hsl(195, 100%, 50%)'); // true

isHsla('hsla(195, 100%, 50%, 100%)'); // true

isHsv('hsv(195, 100%, 50%)'); // true

isHsva('hsva(195, 100%, 50%, 100%)'); // true
```

### 实例方法

```js
import awesomeColor from '@tinyfe/colors';

const color = awesomeColor('#00bfff');

color.isHex(); // true

color.getAlpha(); // 1

color.getFormat(); // hex

color.getColorKeyword(); // deepskyblue

color.toRgbString(); // rgb(0, 191, 255)

color.toPercentageRgbString(); // rgb(0%, 75%, 100%)

color.toHslString(); // hsl(195, 100%, 50%)

color.toHsv(); // { a: 1, h: 195.05882352941174, s: 1, v: 1 }

color.toHsvString(); // hsv(195, 100%, 100%)

awesomeColor('#012345').isDark(); // true
```

## Color Convert Algorithm

### RGB to HSL

我们知道 `HSL` 颜色三元素如下:

- 色相(`Hue`): 色彩的基本属性, 单位是角度([deg](https://developer.mozilla.org/zh-CN/docs/Web/CSS/angle)), 取值范围是 **[0°, 360°]**。关于更多色相角度 [Here](#常见的色相角度)

  $$h = \operatorname{atan} 2(\sqrt{3} \cdot(g - b), 2 \cdot r - g - b)$$

  ```ts
  function getHue(r: number, g: number, b: number): number {
    const deg = Math.round((Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180) / Math.PI);

    const angel = deg >= 0 ? deg : 360 + deg;
    return angel;
  }
  ```

  $$
    h=\left\{\begin{array}{ll}
    0^{\circ} & \text { if } \max =\min \\
    60^{\circ} \times \frac{g-b}{\max -\min }+0^{\circ}, & \text { if } \max =r \text { and } g \geq b \\
    60^{\circ} \times \frac{g-b}{\max -\min }+360^{\circ}, & \text { if } \max =r \text { and } g<b \\
    60^{\circ} \times \frac{b-r}{\max -\min }+120^{\circ}, & \text { if } \max =g \\
    60^{\circ} \times \frac{r-g}{\max -\min }+240^{\circ}, & \text { if } \max =b
    \end{array}\right.
  $$

- 饱和度(`Saturation`): 指色彩的纯度，越高色彩越纯，低则逐渐变灰，取值范围是 **[0, 100%]**。

  $$
    s=\left\{\begin{array}{ll}
    0 & \text { if } l=0 \text { or } \max =\min \\
    \frac{\max -\min }{\max +\min }=\frac{\max -\min }{2 l}, & \text { if } 0<l \leq \frac{1}{2} \\
    \frac{\max -\min }{2-(\max +\min )}=\frac{\max -\min }{2-2 l}, & \text { if } l>\frac{1}{2}
    \end{array}\right.
  $$

- 亮度(`Lightness`): 色彩的明暗程度，值越高，月白，直到变成白色，反之变成黑色。该值优先级最高，可以直接影响前两者。取值范围是 **[0, 100%]**。

  $$L = \frac{1}{2}(max + min)$$

**Note: `max` 是 `RGB` 值的最大值，`min` 是最小值**

### HSV to RGB

给定 `HSL` 空间中的 `(h, s, l)` 值定义的一个颜色，带有 `h` 在指示色相角度的值域 `[0°, 360°]` 中，分别表示饱和度和亮度的 `s` 和 `l` 在值域 `[0, 1]` 中，相应在 RGB 空间中的 (r, g, b) 三原色，带有分别对应于红色、绿色和蓝色的 r, g 和 b 也在值域 [0, 1] 中，它们可计算为：

首先，如果 `s = 0`，则结果的颜色是非彩色的、或灰色的。在这个特殊情况，r, g 和 b 都等于 l。注意 `h` 的值在这种情况下是未定义的。

当 `s ≠ 0` 的时候，可以使用下列过程

$$
\begin{aligned}
&q=\left\{\begin{array}{ll}
l \times(1+s), & \text { if } l<\frac{1}{2} \\
l+s-(l \times s), & \text { if } l \geq \frac{1}{2}
\end{array}\right.\\
&p=2 \times l-q\\
&h_{k}=\frac{h}{360}(h \text { 规范化到值域 }[0,1) \text { 内 })\\
&t_{R}=h_{k}+\frac{1}{3}\\
&t_{G}=h_{k}\\
&t_{B}=h_{k}-\frac{1}{3}\\
&\text { if } t_{C}<0 \rightarrow t_{C}=t_{C}+1.0 \text { for each } C \in\{R, G, B\}\\
&\text { if } t_{C}>1 \rightarrow t_{C}=t_{C}-1.0 \quad \text { for each } C \in\{R, G, B\}
\end{aligned}
$$

对于每个颜色向量 `Color = (ColorR, ColorG, ColorB) = (r, g, b)`,

$$
\begin{array}{l}
\text { Color }_{C}=\left\{\begin{array}{ll}
p+\left((q-p) \times 6 \times t_{C}\right), & \text { if } t_{C}<\frac{1}{6} \\
q, & \text { if } \frac{1}{6} \leq t_{C}<\frac{1}{2} \\
p+\left((q-p) \times 6 \times\left(\frac{2}{3}-t_{C}\right)\right), & \text { if } \frac{1}{2} \leq t_{C}<\frac{2}{3} \\
p, & \text { otherwise }
\end{array}\right. \\
\text { for each } C \in\{R, G, B\}
\end{array}
$$

### RGB to HSV

我们知道 `HSL` 颜色三元素如下:

- 色相(`Hue`): 色彩的基本属性, 单位是角度([deg](https://developer.mozilla.org/zh-CN/docs/Web/CSS/angle)), 取值范围是 **[0°, 360°]**。关于更多色相角度 [Here](#常见的色相角度)

  $$
    h=\left\{\begin{array}{ll}
    0^{\circ} & \text { if } \max =\min \\
    60^{\circ} \times \frac{g-b}{\max -\min }+0^{\circ}, & \text { if } \max =r \text { and } g \geq b \\
    60^{\circ} \times \frac{g-b}{\max -\min }+360^{\circ}, & \text { if } \max =r \text { and } g<b \\
    60^{\circ} \times \frac{b-r}{\max -\min }+120^{\circ}, & \text { if } \max =g \\
    60^{\circ} \times \frac{r-g}{\max -\min }+240^{\circ}, & \text { if } \max =b
    \end{array}\right.
  $$

- 饱和度(`Saturation`): 指色彩的纯度，越高色彩越纯，低则逐渐变灰，取值范围是 **[0, 100%]**。

  $$
    s=\left\{\begin{array}{ll}
      0, & \text { if } \max =0 \\
      \frac{\max -\min }{\max }=1-\frac{\min }{\max }, & \text { otherwise }
      \end{array}\right.
  $$

- 亮度(`Value`): 取值范围是 **[0, 100%]**。

  $$
    v= max
  $$

### HSV to RGB

给定在 `HSV` 中 `(h, s, v)` 值定义的一个颜色，带有如上的 `h`, 和分别表示饱和度和明度的 `s` 和 `v` 变化于 0 到 1 之间，在 `RGB` 空间中对应的 `(r, g, b)`三原色可以计算为 (`R, G, B` 变化于 0 到 1 之间):

$$
\begin{array}{l}
h_{i} \equiv\left[\frac{h}{60}\right\rfloor \quad(\bmod 6) \\
f=\frac{h}{60}-h_{i} \\
p=v \times(1-s) \\
q=v \times(1-f \times s) \\
t=v \times(1-(1-f) \times s)
\end{array}
$$

对于每个颜色向量 (r, g, b) .

$$
(r, g, b)=\left\{\begin{array}{ll}
(v, t, p), & \text { if } h_{i}=0 \\
(q, v, p), & \text { if } h_{i}=1 \\
(p, v, t), & \text { if } h_{i}=2 \\
(p, q, v), & \text { if } h_{i}=3 \\
(t, p, v), & \text { if } h_{i}=4 \\
(v, p, q), & \text { if } h_{i}=5
\end{array}\right.
$$

### 常见的色相角度

```ts
export const baseHues = {
  // name: hug, // color_code color_name luminance(亮度/明度)
  red: 0, //	#FF0000	red	30%
  'orange-red': 15, //	#FF4000	vermilion	orange 45%
  orange: 30, //	#FF8000	orange	59%
  khaki: 45, //	#FFBF00	golden yellow	74%
  yellow: 60, //	#FFFF00	yellow (web color)=lemon yellow	89%
  lime: 75, //	#BFFF00	yellowish green	81%
  olive: 90, //	#80FF00	yellowish green, chartreuse	74%
  'grass-green': 105, //	#40FF00	leaf green 66%
  green: 120, //	#00FF00	green	59%
  'bluish-green': 135, //	#00FF40	cobalt green 62%
  teal: 150, //	#00FF80	emerald green	64%
  'greenish-cyan': 165, //	#00FFBF	turquoise green, bluish green 67%
  cyan: 180, //	#00FFFF	turquoise blue, cyan (web color)	70%
  'bluish-cyan': 195, //	#00BFFF	cerulean blue 55%
  blue: 210, //	#0080FF	azure	41%
  'blue-violet': 225, //	#0040FF	blue, cobalt blue 26%
  violet: 240, //	#0000FF	blue (web color)=ultramarine	11%
  'purple-violet': 255, //	#4000FF	hyacinth 19%
  purple: 270, //	#8000FF	violet	26%
  magenta: 285, //	#BF00FF	purple	purple 34%
  'purple-magenta': 300, //	#FF00FF	magenta (web color)	41%
  crimson: 315, //	#FF00BF	reddish purple	38%
  scarlet: 330, //	#FF0080	ruby red, crimson	36%
  'scarlet-red': 345, //	#FF0040	carmine 33%
};
```

## 参考资料

### HSL HSV

- [wiki(zh) - HSL 和 HSV 色彩空间](https://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4#%E4%BB%8ERGB%E5%88%B0HSL%E6%88%96HSV%E7%9A%84%E8%BD%AC%E6%8D%A2)
- [wiki(en) - HSL and HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)

### Hue(色相)

- [css-color: typedef-named-hue](http://dev.w3.org/csswg/css-color/#typedef-named-hue)

- [wiki(zh) - 色相](https://zh.wikipedia.org/zh-cn/%E8%89%B2%E7%9B%B8)

- [wiki(en) - Hue](https://en.wikipedia.org/wiki/Hue)
