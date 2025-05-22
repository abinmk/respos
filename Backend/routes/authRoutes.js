// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { signup, login ,getUsers} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get('/users', getUsers);
router.get("/test", (req, res) => {
    console.log("✅ Test route hit");
    res.send("Test route working");
  });

module.exports = router;