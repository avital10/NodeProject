import { Router } from "express";
import{add,deleteById,getAllproduct,getById,update} from "../controllers/product.js"
import { isUserManager } from "../Middlewares/isUserIn.js";

const router=Router();
router.get("/",getAllproduct);
router.get("/:id",getById);
router.delete("/:id",isUserManager,deleteById);
router.post("/",isUserManager, add);
router.put("/:id",isUserManager,update);

export default router;



