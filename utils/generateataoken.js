//פעולה שמקבלת את היוזר ומחמציאה לו סיסמא 
//לפי איזשהו אלגו

import jwt from "jsonwebtoken";

export default function generateToken(user) {
    const result = jwt.sign({ userId: user._id, role: user.role, userName: user.userName }, process.env.SECRET_KEY, { expiresIn: "1h" });

    return result;

}