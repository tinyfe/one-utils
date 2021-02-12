// LINK_TO(EN): https://en.wikipedia.org/wiki/HSL_and_HSV
// LINK_TO(CN): https://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4
// HSV
// 色相 (Hue): 色彩的基本属性
// 饱和度 (Saturation): 指色彩的纯度，越高色彩越纯，低则逐渐变灰，取0-100%的数值。
// 亮度 (Value): 取0-100%的数值

/**
 * Base hues
 * LINK_TO: http://dev.w3.org/csswg/css-color/#typedef-named-hue
 * LINK_TO: https://en.wikipedia.org/wiki/Hue
 * LINK_TO: https://zh.wikipedia.org/zh-cn/%E8%89%B2%E7%9B%B8
 */
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
