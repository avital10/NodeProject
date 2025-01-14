import { Router } from "express";
import { add_signUp, getAllUsers, getById, getUserByuserNamePassword_Login, update,updatePassword } from "../controllers/user.js";

const router = Router();
router.get("/", getAllUsers);
router.get("/:id", getById);
router.post("/", add_signUp);
router.put("/:id", update);
router.put("/password/:id", updatePassword);
router.post("/login", getUserByuserNamePassword_Login);

export default router;

