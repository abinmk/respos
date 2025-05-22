
// routes/menuRoutes.js
const express = require("express");
const router = express.Router();
const { addItem, removeItem, getTableDetails,clearTable,
    addMenuItem, getMenuItems ,checkoutOrder,getOrders,deleteMenuItem} = require("../controllers/menuController");

router.post("/additem", addItem);
router.post("/removeItem", removeItem);
router.get("/tabledetails/:tableNumber", getTableDetails);
router.delete("/clear/:tableNumber", clearTable);

router.post('/menu', addMenuItem);
router.get('/menuItems', getMenuItems);
router.post('/orders', checkoutOrder);
router.get('/getOrders', getOrders);
router.delete('/menu/:id', deleteMenuItem);

module.exports = router;