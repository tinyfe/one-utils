// -1 0 1 ...
export const integer = /^-?[1-9]\d*$/;

// 0 1 ...
export const positiveInteger = /^[1-9]\d*$/;

// 0 -1 ...
export const unPositiveInteger = /^-[1-9]\d*|0$/;

// -1 ...
export const negativeInteger = /^-[1-9]\d*$/;

// 0 1 2 ...
export const unNegativeInteger = /^[1-9]\d*|0$/;

// 0 1 ...
export const naturalNumber = /^\d+$/;

// 1.1
export const float = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;

// 1.1
export const positiveFloat = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;

// -0.1 ...
export const unPositiveFloat = /^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$/;

// -1.1
export const negativeFloat = /^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/;

// 0.1 ...
export const unNegativeFloat = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/;
