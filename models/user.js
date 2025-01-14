import { Schema, model } from "mongoose";
const userSchema = Schema({
    userName: String,
    password: String,
    email: String,
    role:{type:String,default:"user"},
    date:{type:Date,default:new Date()},

})
export const userModel = model("user", userSchema)
