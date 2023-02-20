

const jwt=require("jsonwebtoken");


const Authenticate=(req,res,next)=>{
    const token=req.headers.authorization;
    // console.log(token);
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                console.log(decoded)
                req.body.userID=decoded.userId;
                next();
            }else{
                res.send({"msg":"User is not verified"});
            }
        })
    }else{
        res.send({"msg":"Please Login First"});
    }
}

module.exports={Authenticate};