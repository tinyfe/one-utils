/**
 * LINK_TO: https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units#%E9%95%BF%E5%BA%A6
 * 绝对长度单位
 *
 * 以下都是绝对长度单位——它们与其他任何东西都没有关系，通常被认为总是相同的大小。
 * 单位	名称	       等价换算
 * cm	 厘米         1cm = 96px/2.54
 * mm	 毫米         1mm = 1/10th of 1cm
 * Q   四分之一毫米   1Q = 1/40th of 1cm
 * in	 英寸	        1in = 2.54cm = 96px
 * pc	 十二点活字    1pc = 1/16th of 1in
 * pt	 点           1pt = 1/72th of 1in
 * px	 像素         1px = 1/96th of 1in
 *
 * 相对长度单位
 * 相对长度单位相对于其他一些东西，比如父元素的字体大小，或者视图端口的大小。使用相对单位的好处是，经过一些仔细的规划，您可以使文本或其他元素的大小与页面上的其他内容相对应。下表列出了web开发中一些最有用的单位
 *
 * 单位	   相对于
 * em	    在 font-size 中使用是相对于父元素的字体大小，在其他属性中使用是相对于自身的字体大小，如 width
 * ex	    字符“x”的高度
 * ch	    数字“0”的宽度
 * rem	  根元素的字体大小
 * lh	    元素的line-height
 * vw	    视窗宽度的1%
 * vh	    视窗高度的1%
 * vmin	  视窗较小尺寸的1%
 * vmax	  视图大尺寸的1%
 */

// https://jex.im/regulex/#!flags=&re=(v%5Bh%7Cw%7Cmin%7Cmax%5D%7Cp%5Bc%7Ct%7Cx%5D%7C%5Bre%7Ce%7Cc%7Cm%5Dm%7C%5Bl%7Cc%5Dh%7C%25%7Cin%7CQ%7Cex)
export const cssUnit = '(v[h|w|min|max]|p[c|t|x]|[re|e|c|m]m|[l|c]h|%|in|Q|ex)';

export const cssUnitRegex = new RegExp(cssUnit);
