interface ObserverOptions {
  // 观察目标子节点的变化, 是否有添加或者删除, 默认为 true
  childList: boolean;
  // 观察属性变动, 默认为 true
  attributes: boolean;
  // 观察后代节点, 默认为 true
  subtree: boolean;
  // 特性名称数组, 只观察选定的特性。
  attributeFilter?: string[] | undefined;
  // 是否观察 node.data(文本内容)
  characterData?: boolean;
  // 如果为 true, 则将特性的旧值和新值都传递给回调(参见下文), 否则只传新值(需要 attributes 选项),
  attributeOldValue?: boolean;
  // 如果为 true, 则将 node.data 的旧值和新值都传递给回调(参见下文), 否则只传新值(需要 characterData 选项)。
  characterDataOldValue?: boolean;
}

interface MarkOptions {
  prefix?: string;
  text: string;
  width?: number;
  height?: number;
  color?: string;
  font?: string;
  fontSize?: number;
  alpha?: number;
  rotate?: number;
  scale?: number;
  startX?: number;
  startY?: number;
  rows?: number;
  cols?: number;
  xGap?: number;
  yGap?: number;
  repeat?: boolean;
}

type Options = {
  // debug 输出日志
  debug?: boolean;
  container: string | HTMLElement;
  image: string;
  // monitor 是否监控, true: 不可删除水印; false: 可删水印。默认为 true
  monitor?: boolean;
  // 在指定图片格式为 image/jpeg 或 image/webp的情况下
  // 可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围, 将会使用默认值 0.92。其他参数会被忽略。
  // 默认值是 0.92
  encoderOptions?: number;
  style?: {
    [key: string]: any;
  };
  observer: MutationCallback;
  observerOptions: ObserverOptions;
} & MarkOptions;

const defaultCanvasStyle = {
  width: 100,
  height: 100,
  left: 0,
  top: 0,
  position: 'absolute',
  'pointer-events': 'none',
  overflow: 'hidden',
  'z-index': 100,
};

// 设置了image,默认使用image,否则使用text, 通过 text 内容自动生成 base64
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
  yGap: 100,
};

const defaultObserverOptions = {
  childList: true,
  attributes: true,
  subtree: true,
  attributeFilter: ['style'],
};

const defaultOptions = Object.assign(
  {
    debug: false,
    monitor: true,
    repeat: true,
    container: '',
    encoderOptions: 0.92,
  },
  defaultMarkConfig,
);

function reportError(err: string | undefined) {
  throw new Error(err);
}

const canvasLengthKeyword = ['width', 'height'];

export default class WaterMark {
  options: Options;
  private ctx!: CanvasRenderingContext2D;
  private canvas!: HTMLCanvasElement;
  dom: HTMLElement | null = null;
  observer: MutationObserver | null = null;

  constructor(options: Options) {
    this.options = this.merge(options);

    if (!document) {
      reportError('Your environment does not have document.');
      return;
    }

    let { container } = options;

    if (typeof container === 'string') {
      if (container.startsWith('#')) {
        container = container.slice(1);
      }
      this.dom = document.getElementById(container);
    } else if (!(container instanceof HTMLElement)) {
      this.dom = container;
    } else {
      reportError(
        `The element of the "${container}" is not a HTMLElement or it not the element id. Make sure a <div id="${container}"></div> element is present in the document.`,
      );
      return;
    }

    this.canvas = document.createElement('canvas');

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

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
    const { monitor } = this.options;

    this.draw();
    monitor && this.observerWaterMark();
  }

  private draw() {
    const {
      alpha = 0.2,
      fontSize,
      color = '#848FA7',
      image,
      text,
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
      reportError(
        `The params with image and text must not be null, now images is ${image}, text is ${text}`,
      );
    }
  }

  drawImage(): void {
    const {
      image: url,
      width: w,
      height: h,
      repeat,
      rotate = 340,
      scale = 1,
      startX = 20,
      startY = 20,
      rows = 5,
      cols = 5,
      xGap = 200,
      yGap = 100,
    } = this.options;
    const { width, height } = this.canvas;

    let imageLoadedCount = 0;

    const createImageAndDrawCanvas = (
      width: number,
      height: number,
      loaded: () => void = () => null,
    ) => {
      const image: HTMLImageElement = new Image(w, h);
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
      image.onload = () => {
        this.ctx.save();
        this.ctx.translate(width, height);
        this.ctx.rotate((rotate / 180) * Math.PI);
        this.ctx.scale(scale, scale);
        this.ctx.drawImage(image, -image.width / 2, -image.height / 2);
        this.ctx.restore();
        loaded();
      };
    };

    if (repeat) {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          createImageAndDrawCanvas(
            startX + xGap * row,
            startY + yGap * col,
            () => {
              ++imageLoadedCount;
              this.options.debug &&
                console.log('imageLoadedCount', imageLoadedCount);
              if (imageLoadedCount === rows * cols) {
                this.setWaterMark();
              }
            },
          );
        }
      }
    } else {
      createImageAndDrawCanvas(width / 2, height / 2, () => {
        this.setWaterMark();
      });
    }
  }

  drawFont(): void {
    const {
      color = '#848FA7',
      fontSize,
      font,
      text,
      prefix,
      repeat,
      rotate = 340,
      scale = 1,
      startX = 20,
      startY = 20,
      rows = 5,
      cols = 5,
      xGap = 200,
      yGap = 100,
    } = this.options;
    const { width, height } = this.canvas;
    this.ctx.font = font + ' ' + fontSize + 'px';
    this.ctx.fillStyle = color;

    const canvasDrawing = (
      width: number,
      height: number,
      textAlign: boolean = false,
    ) => {
      this.ctx.save();
      textAlign && (this.ctx.textAlign = 'center');
      this.ctx.translate(width, height);
      this.ctx.rotate((rotate / 180) * Math.PI);
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

  observerWaterMark(dom: HTMLElement | null = this.dom) {
    if (!dom) {
      throw new Error(`The dom value must be a HTMLElement, now is ${dom}`);
    }

    const { observer: observerCallback } = this.options;

    this.observer = new MutationObserver((mutations, observer) => {
      this.setWaterMark();
      observerCallback && observerCallback(mutations, observer);
      console.log('法网恢恢疏而不漏, 你不要乱来哦');
    });

    // 以上述配置开始观察目标节点
    this.observer.observe(dom, this.options.observerOptions);
  }

  disposeObserver() {
    // 之后, 可停止观察
    this.observer!.disconnect();
  }

  setWaterMark(dom: HTMLElement | null = this.dom) {
    if (!dom) {
      reportError(`The dom value must be a HTMLElement, now is ${dom}`);
      return;
    }

    const base64 = this.getImage();

    dom.style['background-image'] = `url(${base64})`;
  }

  removeWaterMark(dom: HTMLElement | null = this.dom) {
    if (!dom) {
      reportError(`The dom value must be a HTMLElement, now is ${dom}`);
      return;
    }

    this.observer!.disconnect();
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

  merge(options: Options) {
    // INFO: merge default mode style
    const style = Object.assign(defaultCanvasStyle, options.style);
    const observerOptions = Object.assign(
      defaultObserverOptions,
      options.observerOptions,
    );

    // INFO: merge default options
    return Object.assign(defaultOptions, options, {
      style,
      observerOptions,
    });
  }
}
