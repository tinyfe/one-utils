import { Device } from './typings';

export function getAgent() {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return null;
  }

  return navigator.userAgent || navigator.vendor || (window as any).opera;
}

export function judgeDevice(device: Device) {
  const agent = getAgent();

  if (!agent) {
    return false;
  }

  return (ua => device(ua))(agent);
}
