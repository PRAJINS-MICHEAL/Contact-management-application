const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateTokenhandler = asyncHandler(async (req,res,next)=>{
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization

    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token=authHeader.split(" ")[1];

        if(!token)
        {
            res.status(401);
            throw new Error("Unauthorised or Token not available .")
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded) =>{
            if(err)
            {
                res.status(401);
                throw new Error("User is not authorized.")
            }
            else
            {
                console.log(decoded)
                req.user=decoded.user
                next();
            }
        });


    }
});

module.exports=validateTokenhandler;