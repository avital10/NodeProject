import { Schema,model } from "mongoose";

const productchema=Schema({
    productName:String,
    description:String,
    creationDate:{ type: Date, default: new Date() },
    picture:String,
    price:Number,
    category: String,
    ingredient: [String]
})
export default {productchema}
export const productModel=model("product",productchema)
