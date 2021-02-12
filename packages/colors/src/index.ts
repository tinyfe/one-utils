// LINK_TO: https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value
import isColor, { isHex, isRgb, isRgba, isHsl, isHsla, isHsv, isHsva } from './valid-color';
import { parseToRgb } from './convert';
import randomColor from './random-color';

interface RGBOptions extends RGBColor {
  format?: TypeFormat;
}

interface ColorOptions {
  format?: TypeFormat;
}

export class Color implements RGBOptions {
  color: any;
  originColor: string;
  options: ColorOptions;
  _alpha: number;
  r: TypeFormat;
  g: TypeFormat;
  b: TypeFormat;
  a: TypeFormat;
  _format: TypeFormat;

  constructor(color: any, options?: ColorOptions) {
    this.color = color;
    this.originColor = color;
    this.options = options || {};

    const rgb: RGBOptions = parseToRgb(color);

    this.r = rgb?.r;
    this.g = rgb?.g;
    this.b = rgb?.b;
    this.a = rgb?.a || 1;
    this._alpha = Math.round(this.a * 100) / 100;
    this._format = options?.format || rgb?.format;

    return this;
  }

  isColor(): boolean {
    return isColor(this.color);
  }

  isHex(): boolean {
    return isHex(this.color);
  }

  isRgb(): boolean {
    return isRgb(this.color);
  }

  toRgb(): RGBColor {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a,
    };
  }

  toRgbString(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  isRgba(): boolean {
    return isRgba(this.color);
  }

  isHsl(): boolean {
    return isHsl(this.color);
  }

  isHsla(): boolean {
    return isHsla(this.color);
  }

  isHsv(): boolean {
    return isHsv(this.color);
  }

  isHsva(): boolean {
    return isHsva(this.color);
  }

  randomColor(): string {
    return randomColor();
  }
}

const awesomeColor = (color: any, options?: ColorOptions) => {
  if (color instanceof Color) {
    return color;
  }

  if (!((this as any) instanceof Color)) {
    return new Color(color, options);
  }
};

export { isColor, isHex, isRgb, isRgba, isHsl, isHsla, isHsv, isHsva, randomColor };

export default awesomeColor;
