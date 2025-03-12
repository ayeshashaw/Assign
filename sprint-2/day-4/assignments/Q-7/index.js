const express=require('express');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());
const userModel=require("./models/user.model.js");
const postModel=require("./models/post.model.js");
app.post("/create",async(req,res)=>{
    const user=await userModel.create(req.body);
    res.status(201).json(user);
})

app.post("/addpost",async(req,res)=>{
    const post=await postModel.create(req.body);
    res.status(201).json(post);
});

app.get("/post",async(req,res)=>{
    const post=await postModel.find().populate('author', 'name')
    res.status(200).json(post);
})

mongoose.connect("mongodb://localhost:27017/instagram")
.then(()=>{
    console.log("MongoDb connected");
    const PORT=2100;
    app.listen(PORT,()=>{
        console.log(`Server started at PORT ${PORT}`)
    })
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});