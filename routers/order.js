import { Router } from "express";
import {updateStatusOrder,getByuserId,deleteOrderById,addOrder,getAllOrders} from "../controllers/order.js";
import { isUserIn,isUserManager } from "../Middlewares/isUserIn.js";


const router=Router();
router.get("/",isUserManager,getAllOrders);
router.get("/:id",isUserIn,getByuserId);
router.delete("/:id",isUserManager,deleteOrderById);
router.post("/",isUserIn, addOrder);
router.put("/:id",isUserManager,updateStatusOrder);

export default router;