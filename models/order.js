import { Schema, model,Types } from "mongoose";
import productchema from "./product.js";


const minimalSchema=Schema({
    product:productchema,
    count:{type:Number,default:0}
})

const orderSchema = Schema({
    date: {type:Date,default:new Date()},
    targetDate:{type:Date,default:new Date()+1},
    address: String,
    userId:{
        type:Types.ObjectId,
        ref:"users"
     },
     product:[minimalSchema],    
    IsorderStarted:{type:Boolean,default:false},
    price:Number,
    finalPrice:Number,

})
export const orderModel = model("order", orderSchema)







