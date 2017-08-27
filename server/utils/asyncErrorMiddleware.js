/**
 * Pass errors in async route functions
 * to the express error handler
 * @param fn
 */
const asyncErrorMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

module.exports = asyncErrorMiddleware;
