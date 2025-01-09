const globalErrorHandler = (err, req, res, next) => {
    //Status
    //message
    //stack
    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status : "failed";
    const statusCode = err.statusCode ? err.statusCode : 500;
  
    res.status(statusCode).json({
      status,
      message,
      stack,
    });
  
    next(err);
  };
  
  //Not Found
  const notFoundError = (req, res, next) => {
  const err = new Error(`Cant find ${req.originalUrl} on the server`)
  
      next(err);
  }
  
  module.exports = {globalErrorHandler, notFoundError};
  