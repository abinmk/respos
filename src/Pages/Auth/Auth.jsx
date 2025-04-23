import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css"; // Global CSS file

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("waiter");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits.";
      valid = false;
    }

    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const url = isLogin
      ? "http://localhost:8080/api/login"
      : "http://localhost:8080/api/signup";

    const userData = isLogin
      ? { email, password }
      : { name, email, mobile, password, role };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          toast.success("Login successful!");
          login(data.user);
          navigate(`/${data.user.role}`);
        } else {
          toast.success("Account created! Please log in.");
          setIsLogin(true);
        }
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) setMobile(value);
  };

  return (
    <div className="container">
      <div className="leftSection">
        <p className="quote">
          "Serve with speed, accuracy, and a smile - let tech do the rest."
        </p>
        <p className="founder">- Restro POS Team</p>
      </div>

      <div className="rightSection">
        <div className="form-content">
          <h2 className="title">
            <Link to="/" className="title">
              {isLogin ? "Login" : "Employee Registration"}
            </Link>
          </h2>

          <form onSubmit={handleSubmit} className="form">
            {!isLogin && (
              <>
                <label>Employee Name</label>
                <input
                  type="text"
                  value={name}
                  required
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                />

                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  required
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}

            <label>Phone</label>
            <input
              type="tel"
              value={mobile}
              required
              placeholder="Enter 10-digit phone number"
              onChange={handleMobileChange}
            />
            {errors.mobile && <p className="error">{errors.mobile}</p>}

            <label>Password</label>
            <input
              type="password"
              value={password}
              required
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {!isLogin && (
              <>
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  required
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}

                <label>Select Role</label>
                <div className="roleButtons">
                  {["waiter", "cashier", "admin"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      className={role === r ? "active" : ""}
                      onClick={() => setRole(r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </>
            )}

            {isLogin && (
              <p className="forgotPassword">
                <a href="/forgot-password">Forgot Password?</a>
              </p>
            )}

            <button className="authBtn">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="signinText">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="toggleLink"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
