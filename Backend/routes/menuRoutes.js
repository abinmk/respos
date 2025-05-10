// routes/menuRoutes.js
const express = require("express");
const router = express.Router();
const { addItem, removeItem, getTableDetails } = require("../controllers/menuController");

router.post("/additem", addItem);
router.post("/removeItem", removeItem);
router.get("/tabledetails/:tableNumber", getTableDetails);

module.exports = router;