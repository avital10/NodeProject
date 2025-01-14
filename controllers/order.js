import { orderModel } from "../models/order.js";
import { userModel } from "../models/user.js";
//שליפת כל ההזמנות 
export const getAllOrders = async (req, res) => {
    try{
        let date = await orderModel.find();
        res.json(date);

    }
    catch (arr) {
        console.log(arr);
        res.status(400).json({ title: "cannot get all orders", massage: err.massage })
    }
};
//הוספת הזמנה
export const addOrder = async (req, res) => {
    let { body } = req;
    if (!body.address || !body.product.length || !body.userId)
       return res.status(404).json({ title: "cannot add order", message: "address,product,userId are require" })
    try {
        let user = await userModel.findById(body.userId);
        if (!user)
            return res.status(404).json({ title: "no such user", message: "no such user in the store" });
        let newOrder = new orderModel(body);
        await newOrder.save();
        res.json(newOrder);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot add this order", message: err.message })
    }
}
//מחיקת הזמנה +רק עם ההזמנה לא יצאה לדרך 
export const deleteOrderById = async (req, res) => {
    let { id } = req.params;
    try {
        let order = await orderModel.getById(id);
        if (!order)
            return res.status(404).json({ title: "cannot find by id", message: "order with such id not found" });
        if (order.isSend == true)
            return res.status(400).json({ title: "cannot delete order gone out", message: "the order has gone out" })
        let data = await orderModel.findByIdAndDelete(id);
        if (!data)
            return res.status(404).json({ title: "cannot delete by id", message: "order with such id not found" });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot delete", message: err.message });
    }
};
//שליפת כל ההזמנות של משתמש מסוים 
export const getByuserId = async (req, res) => {
    try {
        let data = await orderModel.find({ userId: req.params.id });
        if (!data) 
            return res.status(404).json({ title: "cannot find by id", message: "order with such id not found" });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get by id", message: err.message });
    }
};
// עדכון לסטטוס הזמנה שבוצעה ומקבלת קוד הזמנה ומעדכנת את השדה   
export const updateStatusOrder = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await orderModel.findByIdAndUpdate(id,{ IsorderStarted: true },{ new: true });
        if (!data)
            return res.status(404).json({ title: "cannot find by id", message: "order with such id not found" });
        res.json(data)

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot update by id", message: err.message });

    }
};