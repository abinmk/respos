// routes/authRoutes.js
import express from "express";
import { signup, login, getUsers } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/test", (req, res) => {
  console.log("✅ Test route hit");
  res.send("Test route working");
});

export default router;