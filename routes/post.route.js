const express=require("express");
const { PostModel } = require("../models/post.model");



const postRouter=express.Router();

// get all posts 

postRouter.get("/",async(req,res)=>{
    // res.send("All the posts");
    const{userID}=req.body;
    const{device,device1,device2}=req.query;
    const queryObj={};
    if(userID){
        queryObj.userID=userID;
    }
   
    if(device){
        queryObj.device={$regex:device,$options:"i"}
    }
    let apiResult=PostModel.find(queryObj);
    // if(device1 && device2){
    //   apiResult=PostModel.find({$and:[{$userID:userID},{$device:device1},{$device:device2}]})
    // }
    
    
    try {
        const posts=await apiResult;
        res.send(posts)
    } catch (error) {
        res.send(error)
    }
})


// create post 

postRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    console.log(payload);
    try{
        const post=new PostModel(payload);
        await post.save();
        res.send({
            "msg":"Note Created"
        })
    }catch(err){
        res.send(err.message);
    }
})

// dlete post

postRouter.delete("/delete/:id",async(req,res)=>{
    const postId=req.params.id;
    await PostModel.findByIdAndDelete({_id:postId});
    res.send({
        "msg":`post having id ${postId} has been deleted`
    })
})

// update post

postRouter.patch("/update/:id",async(req,res)=>{
    const postId=req.params.id;
    const payload=req.body;
    await PostModel.findByIdAndUpdate({_id:postId},payload);
    res.send(`Note having id ${postId} updated`);
})


module.exports={postRouter}
