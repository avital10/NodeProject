import { productModel } from "../models/product.js";

export const getAllproduct=async(req,res)=>{
    try{
        let data=await productModel.find();
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(400).json({title:"cannot get all",message:
            err.message
        })
    }
}

export const getById=async(req,res)=>{
    let {id}=req.params
    try{
        let data=await productModel.findaById(id)
        if(!data)
            return res.status(404).json({title:"cannot find by id",message:"product with such id not found"})
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(400).json({titile:"cannot get byid",message:err.message})
    }
}


export const update =async(req,res)=>{
    let {id}=req.params
    let body=req.body;
    if (!body.price || !body.productName)
        return   res.status(404).json({ title: "cannot update product", message: "name , price are require" })
    try{
        let data=await productModel.findByIdAndUpdate(id,body,{new:true})
        if (!data)
            return res.status(404).json({titile:"cannot update by id",message:"product with such id not found"})
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(400).json({titile:"cannot update",message:err.message})
    }
}

export const deleteById =async(req,res)=>{
    let {id}=req.params
    try{
        let data=await productModel.findByIdAndDelete(id)
        if (!data)
            return res.status(404).json({titile:"cannot delete by id",message:"product with such id not found"})
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(400).json({titile:"cannot delete",message:err.message})
    }
}
export const add = async (req, res) => {
    let { body } = req;
    if (!body.price || !body.productName)
      return  res.status(404).json({ title: "cannot add product", message: "name , price are require" })
    try {
        let newProduct = new productModel(body);
        await newProduct.save();
        res.json(newProduct);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot add this product", message: err.message })
    }
}

