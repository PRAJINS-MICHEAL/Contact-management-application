const mongoose = require("mongoose")

const userModel = mongoose.Schema(
    {
        username:{
            type:String,
            required:[true , "Please enter your Username"]
        },
        email:{
            type:String,
            required:[true , "Please enter your Email address"],
            unique:[true , "Email Adderss already taken"]
        },
        password:{
            type:String,
            required:[true , "Enter your password"]
        }
    },
    {
        timestamps:true
    }
);

module.exports=mongoose.model("User",userModel);