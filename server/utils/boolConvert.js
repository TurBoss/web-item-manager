/**
  * Convert bool to a string 1 or 0
  * for inserting into db
  * @param bool
 */
const boolConvert = (bool) => {
  if (bool === undefined) {
    return false;
  }

  return bool ? '1' : '0';
};

module.exports = boolConvert;
