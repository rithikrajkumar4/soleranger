const ErrorHandler = require('../utils/errorhander');

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong MongoDb Id Error (cast Error)
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err  = new ErrorHandler(message,400)
    }

    //mongoose duplicate key error
    if(err.code  === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err  = new ErrorHandler(message,400)
    }

    //Wrong JWT Error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web token is invalid,try again`;
        err  = new ErrorHandler(message,400)
    }

    //Wrong Expire Error
    if(err.name === "TokenExpireError"){
        const message = `Json Web token is Expired ,try again`;
        err  = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        succes:true,
        message:err.message,
        error:err.stack,
    })
}