import { Router } from "express";
import{add,deleteById,getAllproduct,getById,update} from "../controllers/product.js"

const router=Router();
router.get("/",getAllproduct);
router.get("/:id",getById);
router.delete("/:id",deleteById);
router.post("/",add);
router.put("/:id",update);

export default router;



