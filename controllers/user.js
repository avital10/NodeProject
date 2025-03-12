import { userModel, validateUser } from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateataoken.js";


export async function getAllUsers(req, res) {
    try {
        let data = await userModel.find().select('-password');
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get all users", message: err.message });
    }
}


export async function getById(req, res) {
    const { id } = req.params;
    try {
        let data = await userModel.findById(id).select('-password');
        if (!data) {
            return res.status(404).json({ title: "cannot find by id", message: "User with such id not found" });
        }
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get user by id", message: err.message });
    }
}
export async function updatePassword(req, res) {

    let { id } = req.params;
    let body = req.body;
    if (!body.password || body.userName || body.email)
        return res.status(404).json({ title: "only update password", message: "cannot update email userName" })
    try {
        let data = await userModel.findByIdAndUpdate(id, { password: body.password }, { new: true });
        if (!data) return res.status(404).json({ title: "cannot update by id", message: "user with such id not found" });
        res.json(data);
    } catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot update", message: err.message });
    }
}

export const update = async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    if (body.password)
        return res.status(404).json({ title: "cannot update password", message: "cannot update here password" })
    try {
        let data = await userModel.findByIdAndUpdate(id, body, { new: true }).select('-password');
        if (!data) return res.status(404).json({ title: "cannot update by id", message: "user with such id not found" });
        res.json(data);
    } catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot update", message: err.message });
    }
}

export async function add_signUp(req, res) {
    let { body } = req;
    console.log(body);

    if (!body.password || !body.email)
        return res.status(400).json({ title: "cannot add user", message: "password, email are required" });
    //תקינות מjoy 
    let validate = validateUser(req.body);
    if (validate.error)
        return res.status(400).json(validate.error.details[0].message);

    // בדיקת תקינות הסיסמה
    // const passwordRegex = /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    // if (!passwordRegex.test(body.password)) {
    //     return res.status(400).json({
    //         title: "invalid password",
    //         message: "Password must be at least 8 characters long and include one uppercase letter⏮️, one lowercase letter, one number, and one special character."
    //     });
    // }

    //בדיקה על מייל שהוא יחודי
    let exist = await userModel.findOne({ email: body.email });
    if (exist)
        return res.status(409).json({ title: "cannot add user", message: "thid email alrday exist" });



    try {



        // הצפנת הסיסמה לפני שמירת המשתמש
        const hashedPassword = await bcrypt.hash(body.password, 10);


        // שמירה של המשתמש עם הסיסמה המוצפנת
        let newUser = new userModel({ ...body, password: hashedPassword });
        await newUser.save();

        let token = generateToken(newUser);

        res.json({ ...newUser.toObject(), token });
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot add this user", message: err.message });
    }
}

export async function getUserByuserNamePassword_Login(req, res) {
    
    try {
        if (!req.body.password || !req.body.email)
            return res.status(404).json({ title: "miising username or password", message: "missing" });
        let data = await userModel.findOne({ email: req.body.email }).lean();
        if (!data) {
            return res.status(404).json({ title: "no such user", message: "cannot found user with such email" });
        }

        let verifyPassword = await bcrypt.compare(req.body.password, data.password);
        if (!verifyPassword)
            return res.status(404).json({ title: "cannot found user with such deatekies", message: "worng password" });

        let token = generateToken({ ...data });

        let { password, ...other } = data;

        other.token = token;
        console.log(other);
        res.json(other);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot log in user", message: err.message });
    }
}