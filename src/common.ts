import { randomUUID } from 'crypto';
export const timeticksTohour = (ticks: number) => {
  const seconds = ticks / 100;
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds / 3600 - hour) * 60);
  const second = seconds % 60;

  return hour + ':' + pad2(minute) + ':' + pad2(second);
};

export const pad2 = (number: number) => {
  const num: string = '0' + number;
  return num.substring(num.length - 2);
};

export function uuid() {
  return randomUUID().replace(/-/g, '');
}

export function timesInterval(times: number, ms: number, cb) {
  let init = 0;
  cb();
  const timer = setInterval(() => {
    init++;
    cb();
    console.log('init', init);
    if (init === times - 1) {
      clearInterval(timer);
    }
  }, ms);
}

export function objBuffer2String(obj: object) {
  if (isObj(obj)) {
    Object.keys(obj).forEach(k => {
      if (isObj(obj[k])) {
        Object.keys(obj[k]).forEach(v => {
          if (Buffer.isBuffer(obj[k][v])) {
            obj[k][v] = obj[k][v].toString();
          }
        });
      }
    });
  }
  return obj;
}

export function isObj(obj: object) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
