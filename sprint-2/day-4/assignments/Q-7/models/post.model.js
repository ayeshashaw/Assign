const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    title:{type:String, required:true, minlength:3},
content:{type:String, required:true},
author: {type:mongoose.Schema.Types.ObjectId,required:true,ref:"user"},
createdAt: {type:Date, default:Date.now}
})

const postModel=mongoose.model("post",postSchema);

module.exports=postModel;