import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, verifyOrder, usersOrder, listOrders, updateOrderStatus, getOrderStatus } from "../controllers/orderController.js";
const orderRouter = express.Router()

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userorders",authMiddleware, usersOrder  )
orderRouter.get("/list", listOrders)
orderRouter.put("/update-status/:orderId", updateOrderStatus)
orderRouter.get("/order-status:/orderId", getOrderStatus)
export default orderRouter;