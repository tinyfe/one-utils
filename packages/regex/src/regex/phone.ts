// https://rain120.github.io/study-notes/#/notes/javascript/regular-expression/common-reg-exps?id=_5%e6%89%8b%e6%9c%ba%e5%8f%b7%e7%a0%81
export const phone = /^1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/;

export const phoneLoose = /^1[3-9]\d{9}$/;

export const telephone = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
