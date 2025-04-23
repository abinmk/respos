const User = require("../models/User");
exports.signup = async (req, res) => {
    const { name, email, mobile, password, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(409).json({ message: "User already exists" });
  
      const user = new User({ name, email, mobile, password, role });
      await user.save();
  
      res.status(201).json({ message: "Signup successful" });
    } catch (err) {
      console.error("❌ Signup error:", err);
      res.status(500).json({ message: "Something went wrong", error: err.message });
    }
  };

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
  
};



// Define schema once (you can move this to a separate file and import it)
