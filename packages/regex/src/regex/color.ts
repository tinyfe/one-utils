const CSS_NUMBER = '[-+]?\\d*(?:\\d+|\\.\\d+)%?';

// INFO: (x, x, x)
const PERMISSIVE_MATCH3 =
  '[\\s|\\(]+(' + CSS_NUMBER + ')[,|\\s]+(' + CSS_NUMBER + ')[,|\\s]+(' + CSS_NUMBER + ')\\s*\\)?';

// INFO: (x, x, x, x)
const PERMISSIVE_MATCH4 =
  '[\\s|\\(]+(' +
  CSS_NUMBER +
  ')[,|\\s]+(' +
  CSS_NUMBER +
  ')[,|\\s]+(' +
  CSS_NUMBER +
  ')[,|\\s]+(' +
  CSS_NUMBER +
  ')\\s*\\)?';

export const cssUnit = CSS_NUMBER;

export const rgb = `rgb${PERMISSIVE_MATCH3}`;

export const rgba = `rgba${PERMISSIVE_MATCH4}`;

export const hsl = `hsl${PERMISSIVE_MATCH3}`;

export const hsla = `hsla${PERMISSIVE_MATCH4}`;

export const hsv = `hsv${PERMISSIVE_MATCH3}`;

export const hsva = `hsva${PERMISSIVE_MATCH4}`;

export const hex3 = /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;

export const hex6 = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;

export const hex4 = /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;

export const hex8 = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
