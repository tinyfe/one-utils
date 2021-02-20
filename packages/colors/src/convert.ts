import { ColorRGB, ColorType, IAnyObject, TypeColor } from 'typings';
import namedColor from '@tinyfe/color-keywords';
import {
  convertHexToDecimal,
  convertToPercentage,
  mathMax,
  mathMin,
  parseIntFromHex,
  setAlpha,
  setValueRange,
} from './utils';
import { isValidCSSUnit, matchPattern } from './valid-color';
import { hsvToRgb } from './hsv';
import { hslToRgb } from './hsl';
import { rgbToRgb } from './rgb';
// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff0000dd" or "ff0000dd"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//

export function parseToRgb(color: TypeColor) {
  let rgb = { r: 0, g: 0, b: 0 };
  let a = 1;
  let s: string | number = 0;
  let v: string | number = 0;
  let l: string | number = 0;
  let ok = false;
  let format: ColorType = 'name';

  if (typeof color === 'string') {
    color = parseStringToRgb(color) as any;
  }

  if (typeof color === 'object') {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = /%$/.test(color.r.toString()) ? 'prgb' : 'rgb';
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, color.s, color.v);
      ok = true;
      format = 'hsv';
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, color.s, color.l);
      ok = true;
      format = 'hsl';
    }

    if (color.hasOwnProperty('a')) {
      a = color.a!;
    }
  }

  a = setAlpha(a);

  return {
    ok,
    format: color.format || format,
    r: mathMin(255, mathMax(rgb.r, 0)),
    g: mathMin(255, mathMax(rgb.g, 0)),
    b: mathMin(255, mathMax(rgb.b, 0)),
    a,
  };
}

export function parseStringToRgb(color: string) {
  color = color.trim().toLowerCase();
  let isColorNamed = false;

  if ((namedColor as any)[color]) {
    color = (namedColor as any)[color];
    isColorNamed = true;
  } else if (color === 'transparent') {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: 'name',
    };
  }

  let match;

  if ((match = matchPattern.rgb.exec(color))) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
    };
  }
  if ((match = matchPattern.rgba.exec(color))) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: match[4],
    };
  }
  if ((match = matchPattern.hsl.exec(color))) {
    return {
      h: match[1],
      s: match[2],
      l: match[3],
    };
  }
  if ((match = matchPattern.hsla.exec(color))) {
    return {
      h: match[1],
      s: match[2],
      l: match[3],
      a: match[4],
    };
  }
  if ((match = matchPattern.hsv.exec(color))) {
    return {
      h: match[1],
      s: match[2],
      v: match[3],
    };
  }
  if ((match = matchPattern.hsva.exec(color))) {
    return {
      h: match[1],
      s: match[2],
      v: match[3],
      a: match[4],
    };
  }
  if ((match = matchPattern.hex8.exec(color))) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: isColorNamed ? 'name' : 'hex8',
    };
  }
  if ((match = matchPattern.hex6.exec(color))) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: isColorNamed ? 'name' : 'hex',
    };
  }
  if ((match = matchPattern.hex4.exec(color))) {
    return {
      r: parseIntFromHex(match[1] + '' + match[1]),
      g: parseIntFromHex(match[2] + '' + match[2]),
      b: parseIntFromHex(match[3] + '' + match[3]),
      a: convertHexToDecimal(match[4] + '' + match[4]),
      format: isColorNamed ? 'name' : 'hex8',
    };
  }
  if ((match = matchPattern.hex3.exec(color))) {
    return {
      r: parseIntFromHex(match[1] + '' + match[1]),
      g: parseIntFromHex(match[2] + '' + match[2]),
      b: parseIntFromHex(match[3] + '' + match[3]),
      format: isColorNamed ? 'name' : 'hex',
    };
  }

  return false;
}

export { namedColor };

export function flip(obj: IAnyObject): IAnyObject {
  const flipped: IAnyObject = {};

  Object.keys(obj).forEach(key => {
    flipped[obj[key]] = key;
  });

  return flipped;
}
