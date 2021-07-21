import { judgeDevice } from './utils';

export function isFirefox(userAgent?: string): boolean {
  return judgeDevice(agent => /chrome/i.test(userAgent ? userAgent : agent));
}
