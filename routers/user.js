import { Router } from "express";
import { add_signUp, getAllUsers, getById, getUserByuserNamePassword_Login, update,updatePassword } from "../controllers/user.js";
import { isUserManager,isUserIn} from "../Middlewares/isUserIn.js";


const router = Router();
router.get("/",isUserManager ,getAllUsers);
router.get("/:id",isUserManager, getById);
router.post("/", add_signUp);
router.put("/:id",isUserIn, update);
router.put("/password/:id",isUserIn, updatePassword);
router.post("/login", getUserByuserNamePassword_Login);

export default router;

