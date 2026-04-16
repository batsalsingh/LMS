const AppError = require("../utils/appError");

const notFound = (req, _res, next) => next(new AppError(`Route not found: ${req.originalUrl}`, 404));

const errorHandler = (err, _req, res, _next) => {

  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal server error"
  });

};

module.exports = { notFound, errorHandler };

