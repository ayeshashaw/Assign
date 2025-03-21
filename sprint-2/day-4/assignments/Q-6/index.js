const express=require('express');
const mongoose=require('mongoose');


const app=express();
app.use(express.json());
const userModel=require("./models/user.model");
const profileModel=require("./models/profile.model.js")


app.post("/adduser",async(req,res)=>{
    const data= await userModel.create(req.body);
    res.status(201).json(data)
})


app.post("/addprofile",async(req,res)=>{
    const data=await profileModel.create(req.body)
    res.status(201).json(data)
})

app.get("/profiles",async(req,res)=>{
    const profiles = await profileModel.find().populate('user', 'name');
    res.status(200).json(profiles);
})

mongoose.connect("mongodb://localhost:27017/NEM305")
.then(()=>{
    console.log("MongoDb connected");
     

    const PORT=3000;
    app.listen(PORT,()=>{
        console.log(`Server connected to PORT:${PORT}`)
    })
})
.catch(()=>{console.log("MongoDb connection error")})