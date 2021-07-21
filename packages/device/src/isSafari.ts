import { judgeDevice } from './utils';

export function isSafari(userAgent?: string): boolean {
  return judgeDevice(agent => /safari/i.test(userAgent ? userAgent : agent));
}
