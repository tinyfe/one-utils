import { isIos } from './isIos';

export function isIPhoneX(userAgent?: string): boolean {
  const ios = isIos(userAgent);
  const { devicePixelRatio, screen } = window;

  const _isIPhoneX =
    ios &&
    devicePixelRatio === 3 &&
    screen?.width === 375 &&
    screen?.height === 812;

  // iPhone XS Max
  const _isIPhoneXSMax =
    ios &&
    devicePixelRatio === 3 &&
    screen?.width === 414 &&
    screen?.height === 896;

  // iPhone XR
  const _isIPhoneXR =
    ios &&
    devicePixelRatio === 2 &&
    screen?.width === 414 &&
    screen?.height === 896;

  return !!(_isIPhoneX || _isIPhoneXSMax || _isIPhoneXR);
}
