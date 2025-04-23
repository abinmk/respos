// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { addItem, removeItem } = require("../controllers/menuController");

router.post("/additem", addItem);
router.post("/removeItem",removeItem)


module.exports = router;