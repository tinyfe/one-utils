'use strict';

export interface IOptions {
  [key: string]: any;
}

export default function getSomethings(root?: string, options?: IOptions | undefined) {
  console.log(root, options);
}
