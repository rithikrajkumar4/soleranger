const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

// Register a User
exports.registerUser = catchAsyncErrors( async(req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password
    })
    sendToken(user,201,res);

})


// Login a User
exports.loginUser = catchAsyncErrors(async (req,res,next)=>{
    const{email,password} = req.body;

    //checking if Entered both user and password
    if(!email || !password){
        return next(new ErrorHander("Please Enter Both email and password",400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid email and password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email and password",401));
    }

    sendToken(user,200,res);

});


// Logout Method

exports.logout = catchAsyncErrors(async (req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"Logged Out",
    })
})