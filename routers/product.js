import { Router } from "express";
import{add,deleteById,getAllproduct,getById,update} from "../controllers/product.js"
import { isUserManager } from "../Middlewares/isUserIn.js";

const router=Router();
router.get("/",getAllproduct);
router.get("/:id",getById);
router.delete("/:id",deleteById);
router.post("/",isUserManager, add);
router.put("/:id",update);

export default router;



