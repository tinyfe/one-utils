import { judgeDevice } from './utils';

export function isIos(userAgent?: string): boolean {
  return judgeDevice(agent =>
    /ip(hone|od|ad)/i.test(userAgent ? userAgent : agent),
  );
}
