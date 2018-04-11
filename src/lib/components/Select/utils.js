const TYPE_TIMEOUT = 600;
let timer;
let keys = [];

/**
 * Determines if, based on input, we should "search" the options for the given character
 * @param  {Number} key     keyCode
 * @return {Boolean}
 */
export const shouldSearch = key => {
  const isLetter = key >= 65 && key <= 90;
  const isNumber = key >= 48 && key <= 57;
  return isLetter || isNumber;
};

/**
 * Searches options for matches based on characters typed ("starts-with" style searching)
 * @param  {String} key     the typed character
 * @param  {Array} options  the array of options in the given select
 * @return {Number}         the index of the item that should be "activated" based on input
 */
export const search = (key, options) => {
  clearTimeout(timer);
  timer = setTimeout(() => keys = [], TYPE_TIMEOUT);

  keys.push(key);
  const toFind = keys.join('');

  return options.findIndex(({ label, disabled }) => {
    return !disabled && label.substr(0, toFind.length).toLowerCase() === toFind;
  });
};
