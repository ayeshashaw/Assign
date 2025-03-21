const mongoose=require('mongoose');

const profileSchema=new mongoose.Schema({
   bio:String,
   SocialMediaLinks:[String],
   user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true,unique:true}
})

const profileModel=mongoose.model("profile",profileSchema);

module.exports=profileModel