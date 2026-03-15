import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type:String , required:true , unique:true  },
    email:{type:String , required : true , unique:true , trim:true },
    password:{type:String , required:true , minlength:6 , trim:true}
})


export const UserModel = mongoose.model("Users",UserSchema)
