const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err);
  const customError = {
      statusCode: err.statusCode || 500,
      message: err.message || "Something went wrong try again later"
  }
  
  if (err.code && err.code === 11000) {
      customError.statusCode = 400
      customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
  }else if(err.name && err.name === 'CastError'){
      customError.statusCode = 404
      customError.message = `No item found with id : ${err.value}`
  }
  return res.status(customError.statusCode).json({ msg: customError.message })
}

module.exports = errorHandlerMiddleware
