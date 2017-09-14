const jwt = require('jsonwebtoken');

/**
 * Tests if a token is valid
 * returns success with decoded token if true
 * @param authorization
 * @returns {*}
 */
const isValidToken = (authorization) => {
  if (!authorization) {
    return false;
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    if (decoded) {
      return {
        success: true,
        ...decoded
      };
    }
  } catch (e) {
    return {
      success: false,
      error: e
    };
  }

  return false;
};

module.exports = isValidToken;
