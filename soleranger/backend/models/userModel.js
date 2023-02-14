const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
     
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name cannot exceeds 30 characters"],
        minLength:[4,"Name must have 4 or more characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password should be more than 8 characters"],
        select:false
    },
    //can cause error
    // phonenumber:{
    //     type:String,
    //     required:true,
    //     validate:[validator.isMobilePhone,"Please Enter a valid Phone no."]

    // },
    address:{
        type:String,
        // required:true,
        default:"Not Entered"
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});


userSchema.pre("save",async function(next){
    
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);

})

//JWT Token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,

    })
}

// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User",userSchema);