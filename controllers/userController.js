const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//@desc register user
//@route POST /api/users/register
//access public

const register = asyncHandler(async (req , res )=>{

    const {username , email , password}=req.body;

    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error("All data are mandatory.")
    }
    const userAvailable = await User.findOne({ email })

    if(userAvailable)
    {
        res.status(400);
        throw new Error("Email already in use.")
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create(
        {
            username,
            email,
            password:hashedPassword,
        }
    );

    if(user){
        res.status(201).json({_id:user.id , name:user.username })
    }
    else{
        res.status(400);
        throw new Error("Invalid Data .")
    }


    console.log("Registeration Successfull")
})

//@desc login user
//@route POST /api/users/login
//access public

const login = asyncHandler(async(req , res )=>{

    const {email , password}=req.body;

    const user = await User.findOne({email})
    
    if(user && (await bcrypt.compare(password,user.password)) )
    {
        const accessToken = jwt.sign(
        {
            user:{
                username:user.username,
                email:user.email,
                id:user._id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"5m"
        }
        );
        res.json({accessToken});
        
    }
    else{
        res.status(401);
        throw new Error("Invalid Credentials.")
    }
    console.log("Login Successfull")
})

//@desc current user
//@route GET /api/users/current
//access private

const current = asyncHandler(async(req , res )=>{
    res.json(req.user)
})

module.exports={register , login , current}