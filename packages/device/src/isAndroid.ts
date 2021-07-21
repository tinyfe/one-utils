import { judgeDevice } from './utils';

export function isAndroid(userAgent?: string): boolean {
  return judgeDevice(agent => /android/i.test(userAgent ? userAgent : agent));
}
