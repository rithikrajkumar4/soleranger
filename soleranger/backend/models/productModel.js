const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter The Price"],
        maxLength:[9,"Price Can exceeds 9 characters"],
    },
    images:[{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    }],
    stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLength:[4,"max 9999"],
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
    

})

module.exports = mongoose.model("Product",productSchema);