// routes/menuRoutes.js
const express = require("express");
const router = express.Router();
const { addItem, removeItem, getTableDetails,clearTable } = require("../controllers/menuController");

router.post("/additem", addItem);
router.post("/removeItem", removeItem);
router.get("/tabledetails/:tableNumber", getTableDetails);
router.delete("/clear/:tableNumber", clearTable);

module.exports = router;