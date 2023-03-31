module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => next(err));
};
// const CustomError = require('.')

// module.exports = (fn) => (req, res, next) => {
//   fn(req, res, next).catch((err) => next(new CustomError(err.status, err.message)));
// };
