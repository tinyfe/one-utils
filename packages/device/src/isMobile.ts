import { judgeDevice } from './utils';

export function isMobile(userAgent?: string): boolean {
  return judgeDevice(agent =>
    /(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i.test(
      userAgent ? userAgent : agent,
    ),
  );
}
