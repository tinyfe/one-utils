interface Options {
  container: string | HTMLCanvasElement;
  image: string;
  style: Object;
  canvas: Element | null;
  color: string;
  fontSize: number;
  alpha: number;
  rotate: number;
  scale: number;
  startX: number;
  startY: number;
  rows: number;
  cols: number;
  repeat: boolean;
}

const defaultStyle = {
  left: 0,
  right: 0,
  position: 'absolute',
  'pointer-events': 'none',
  overflow: 'hidden',
  'z-index': 100,
};

const defaultOptions = {
  container: '',
  image: '',
  style: defaultStyle,
  color: '#848FA7',
  fontSize: 24,
  alpha: 0.2,
  rotate: 340,
  scale: 1,
  startX: 20,
  startY: 20,
  rows: 10,
  cols: 10,
  repeat: true,
};

export default class WaterMask {
  options: Options;
  ctx: CanvasRenderingContext2D | null;
  canvas: HTMLCanvasElement;

  constructor(options: Options) {
    this.options = this.merge(options);
    this.canvas = this.getCanvasElement(options.container);

    this.ctx = this.canvas!.getContext('2d');

    if (!this.ctx) {
      throw new Error(
        'You Browser does not support canvas, Please upgrade it.',
      );
    }

    this.render();
  }

  render() {
    this.ctx!.globalAlpha = this.options.alpha;
  }

  getCanvasElement(container: string | HTMLCanvasElement): HTMLCanvasElement {
    let canvas;
    if (typeof container === 'string') {
      if (!container.startsWith('#')) {
        container += '#';
      }
      canvas = document.getElementById(container);
    } else {
      canvas = container;
    }

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error(
        `The element of id "${container}" is not a HTMLCanvasElement. Make sure a <canvas id="${container}""> element is present in the document.`,
      );
    }

    return canvas;
  }

  merge(options: Options) {
    return Object.assign(defaultOptions, options);
  }
}
