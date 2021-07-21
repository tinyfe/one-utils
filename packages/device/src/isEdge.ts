import { judgeDevice } from './utils';

export function isEdge(userAgent?: string): boolean {
  return judgeDevice(agent => /Edge/i.test(userAgent ? userAgent : agent));
}
