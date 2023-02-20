const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const { UserModel } = require("../models/user.model");



const userRouter=express.Router();

// user register


userRouter.post("/register",async(req,res)=>{
    const{name,email,gender,password,age,city}=req.body;
    
    const findUser=await UserModel.findOne({email});
    if(findUser){
        
        res.send({
            "msg":"User already exist, please login"
        })
    
    }

    try {
        bcrypt.hash(password,10,(err,hash)=>{
            if(err){
                console.log(err);
                res.send(err.message);
            }
            else{
                const user= new UserModel({name,email,gender,age,city,password:hash});
                user.save();
                res.send({
                    "msg":"A new User registered"
                })
            }
        })
    } catch (error) {
        res.send(error.message);
    }
})

// user login

userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user=await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:user[0]._id},"masai");
                    res.send({
                        "msg":"Login Success",
                        "token":token});
                }
                else{
                    res.send({"msg":"Wrong Credentials"});
                }
            })
        }else{
            res.send({"msg":"Wrong Credentials"});
        }
    } catch (error) {
        res.send({"msg":"Wrong Credentials"});
    }
})



module.exports={userRouter}