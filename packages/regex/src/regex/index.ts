export { char as charRegex, charCN as charCNRegex } from './char';

export {
  cssUnit as cssUnitRegex,
  rgb as rgbRegex,
  rgba as rgbaRegex,
  hsl as hslRegex,
  hsla as hslaRegex,
  hsv as hsvRegex,
  hsva as hsvaRegex,
  hex3 as hex3Regex,
  hex6 as hex6Regex,
  hex4 as hex4Regex,
  hex8 as hex8Regex,
} from './color';

export {
  dateTime as dateTimeRegex,
  date as dateRegex,
  unixTime as unixTimeRegex,
  hourClock12 as hourClock12Regex,
  hourClock24 as hourClock24Regex,
} from './date';

export {
  percentile as percentileRegex,
  thousands as thousandsRegex,
  tenThousands as tenThousandsRegex,
} from './digit';

export { email as emailRegex } from './email';

export { hostName as hostNameRegex } from './host-name';

export {
  integer as integerRegex,
  positiveInteger as positiveIntegerRegex,
  unPositiveInteger as unPositiveIntegerRegex,
  negativeInteger as negativeIntegerRegex,
  unNegativeInteger as unNegativeIntegerRegex,
  naturalNumber as naturalNumberRegex,
  float as floatRegex,
  positiveFloat as positiveFloatRegex,
  unPositiveFloat as unPositiveFloatRegex,
  negativeFloat as negativeFloatRegex,
  unNegativeFloat as unNegativeFloatRegex,
} from './number';

export {
  phone as phoneRegex,
  phoneLoose as phoneLooseRegex,
  telephone as telephoneRegex,
} from './phone';

export {
  idCard as idCardRegex,
  idCard15 as idCard15Regex,
  idCard18 as idCard18Regex,
} from './id-card';

export { ip as ipRegex, ipv6 as ipv6Regex } from './ip';

export { uri as uriRegex } from './uri';
