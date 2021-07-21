import { judgeDevice } from './utils';

export function isChrome(userAgent?: string): boolean {
  return judgeDevice(agent => /chrome/i.test(userAgent ? userAgent : agent));
}
