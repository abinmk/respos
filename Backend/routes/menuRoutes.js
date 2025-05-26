// routes/menuRoutes.js
import express from "express";
import {
  addItem,
  removeItem,
  getTableDetails,
  clearTable,
  addMenuItem,
  getMenuItems,
  checkoutOrder,
  getOrders,
  deleteMenuItem
} from "../controllers/menuController.js";

const router = express.Router();

router.post("/additem", addItem);
router.post("/removeItem", removeItem);
router.get("/tabledetails/:tableNumber", getTableDetails);
router.delete("/clear/:tableNumber", clearTable);

router.post("/menu", addMenuItem);
router.get("/menuItems", getMenuItems);
router.post("/orders", checkoutOrder);
router.get("/getOrders", getOrders);
router.delete("/menu/:id", deleteMenuItem);

export default router;