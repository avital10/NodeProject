import { Router } from "express";
import {updateStatusOrder,getByuserId,deleteOrderById,addOrder,getAllOrders} from "../controllers/order.js";

const router=Router();
router.get("/",getAllOrders);
router.get("/:id",getByuserId);
router.delete("/:id",deleteOrderById);
router.post("/",addOrder);
router.put("/:id",updateStatusOrder);

export default router;