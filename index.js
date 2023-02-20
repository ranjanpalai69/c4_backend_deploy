

const express=require("express");
const cors=require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
const { Authenticate } = require("./middlewares/Authentication.middleware");

require("dotenv").config();





const app=express();


app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.send("Home Page");
})

app.use("/users",userRouter);

app.use(Authenticate); //midleware 
app.use("/posts",postRouter);





app.listen(process.env.PORT,async()=>{
   try {
     await connection;
     console.log("connected to db");
   } catch (error) {
      console.log(error)
   }
   console.log(`server is running at ${process.env.PORT}`)
})



