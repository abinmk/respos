// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { addItem, removeItem ,getTableDetails } = require("../controllers/menuController");

router.post("/additem", addItem);
router.post("/removeItem",removeItem);
router.post("/getTableDetails",getTableDetails)


module.exports = router;