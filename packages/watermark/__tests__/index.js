'use strict';

const defaultCanvasStyle = {
  width: 100,
  height: 100,
  left: 0,
  top: 0,
  position: 'absolute',
  'pointer-events': 'none',
  overflow: 'hidden',
  'z-index': 100
}; // 设置了image,默认使用image,否则使用text, 通过 text 内容自动生成 base64

const defaultMarkConfig = {
  prefix: '',
  text: '',
  image: '',
  color: '#848FA7',
  font: 'Microsoft YaHei',
  fontSize: 24,
  alpha: 0.2,
  rotate: 340,
  scale: 1,
  startX: 20,
  startY: 20,
  rows: 5,
  cols: 5,
  xGap: 200,
  yGap: 100
};
const defaultObserverOptions = {
  childList: true,
  attributes: true,
  subtree: true,
  attributeFilter: ['style']
};
const defaultOptions = Object.assign({
  debug: false,
  monitor: true,
  repeat: true,
  container: '',
  encoderOptions: 0.92
}, defaultMarkConfig);

function reportError(err) {
  throw new Error(err);
}

const canvasLengthKeyword = ['width', 'height'];
class WaterMark {
  constructor(options) {
    this.dom = null;
    this.observer = null;
    this.options = this.merge(options);
    this.canvas = this.getCanvasElement(options.container); // @ts-ignore

    this.ctx = this.canvas.getContext('2d');
    Object.keys(defaultCanvasStyle).forEach(key => {
      const value = defaultCanvasStyle[key];

      if (canvasLengthKeyword.includes(key) && value) {
        this.canvas[key] = value + '';
      } else {
        this.canvas.style[key] = value;
      }
    });
    this.options.debug && console.log(this.options);
    this.render();
  }

  render() {
    const {
      monitor
    } = this.options;
    this.draw();
    monitor && this.observerWaterMark();
  }

  draw() {
    const {
      alpha,
      fontSize,
      color,
      image,
      text
    } = this.options;
    this.ctx.globalAlpha = alpha;
    this.ctx.font = fontSize + 'px';
    this.ctx.fillStyle = color;

    if (image) {
      this.drawImage();
    } else if (text) {
      this.drawFont();
      this.setWaterMark();
    } else {
      reportError(`The params with image and text must not be null, now images is ${image}, text is ${text}`);
    }
  }

  drawImage() {
    const {
      image: url,
      width: w,
      height: h,
      rows,
      cols,
      xGap,
      yGap,
      startX,
      startY,
      scale,
      rotate,
      repeat
    } = this.options;
    const {
      width,
      height
    } = this.canvas;
    let imageLoadedCount = 0;

    const createImageAndDrawCanvas = (width, height, loaded = () => null) => {
      const image = new Image(w, h);
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;

      image.onload = () => {
        this.ctx.save();
        this.ctx.translate(width, height);
        this.ctx.rotate(rotate / 180 * Math.PI);
        this.ctx.scale(scale, scale);
        this.ctx.drawImage(image, -image.width / 2, -image.height / 2);
        this.ctx.restore();
        loaded();
      };
    };

    if (repeat) {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          createImageAndDrawCanvas(startX + xGap * row, startY + yGap * col, () => {
            ++imageLoadedCount;
            this.options.debug && console.log('imageLoadedCount', imageLoadedCount);

            if (imageLoadedCount === rows * cols) {
              this.setWaterMark();
            }
          });
        }
      }
    } else {
      createImageAndDrawCanvas(width / 2, height / 2, () => {
        this.setWaterMark();
      });
    }
  }

  drawFont() {
    const {
      color,
      fontSize,
      font,
      text,
      prefix,
      rows,
      cols,
      xGap,
      yGap,
      startX,
      startY,
      scale,
      rotate,
      repeat
    } = this.options;
    const {
      width,
      height
    } = this.canvas;
    this.ctx.font = font + ' ' + fontSize + 'px';
    this.ctx.fillStyle = color;

    const canvasDrawing = (width, height, textAlign = false) => {
      this.ctx.save();
      textAlign && (this.ctx.textAlign = 'center');
      this.ctx.translate(width, height);
      this.ctx.rotate(rotate / 180 * Math.PI);
      this.ctx.scale(scale, scale);
      this.ctx.fillText((prefix ? prefix : '') + text, 0, 0);
      this.ctx.restore();
    };

    if (repeat) {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          canvasDrawing(startX + xGap * row, startY + yGap * col);
        }
      }
    } else {
      canvasDrawing(width / 2, height / 2, true);
    }
  }

  observerWaterMark(dom = this.dom) {
    if (!dom) {
      throw new Error(`The dom value must be a HTMLElement, now is ${dom}`);
    }

    const {
      observer: observerCallback
    } = this.options;
    this.observer = new MutationObserver((mutations, observer) => {
      this.setWaterMark();
      observerCallback && observerCallback(mutations, observer);
      console.log('法网恢恢疏而不漏, 你不要乱来哦');
    }); // 以上述配置开始观察目标节点

    this.observer.observe(dom, this.options.observerOptions);
  }

  disposeObserver() {
    // 之后, 可停止观察
    this.observer.disconnect();
  }

  setWaterMark(dom = this.dom) {
    if (!dom) {
      reportError(`The dom value must be a HTMLElement, now is ${dom}`);
      return;
    }

    const base64 = this.getImage();
    dom.style['background-image'] = `url(${base64})`;
  }

  removeWaterMark(dom = this.dom) {
    if (!dom) {
      reportError(`The dom value must be a HTMLElement, now is ${dom}`);
      return;
    }

    this.observer.disconnect();
    dom.style['background-image'] = '';
  }
  /**
   * @description 获取图片
   * @param type 图片格式, 默认为 image/png
   * @param encoderOptions 在指定图片格式为 image/jpeg 或 image/webp的情况下, 可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围, 将会使用默认值 0.92。其他参数会被忽略。
   * @returns 包含 data URI 的DOMString。
   */


  getImage(type = 'image/png', encoderOptions = this.options.encoderOptions) {
    return this.canvas.toDataURL(type, encoderOptions);
  }

  getCanvasElement(container) {
    const canvas = document.createElement('canvas');

    if (typeof container === 'string') {
      if (container.startsWith('#')) {
        container = container.slice(1);
      }

      this.dom = document.getElementById(container);
    } else {
      this.dom = container;
    }

    if (!(canvas instanceof HTMLCanvasElement)) {
      reportError(`The element of id "${container}" is not a HTMLCanvasElement. Make sure a <canvas id="${container}""> element is present in the document.`);
    }

    return canvas;
  }

  merge(options) {
    // INFO: merge default mode style
    const style = Object.assign(defaultCanvasStyle, options.style);
    const observerOptions = Object.assign(defaultObserverOptions, options.observerOptions); // INFO: merge default options

    return Object.assign(defaultOptions, options, {
      style,
      observerOptions
    });
  }

}

module.exports = WaterMark;
//# sourceMappingURL=index.js.map
