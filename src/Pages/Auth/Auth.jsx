import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./auth.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("waiter"); // default role
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth <= 1268) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [isLogin]);

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!/^\d{10}$/.test(mobile)) {
      errors.mobile = "Mobile number must be exactly 10 digits.";
      valid = false;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password) && !isLogin) {
      errors.password = "Password must be at least 6 characters, include a number, uppercase and lowercase.";
      valid = false;
    }

    if (!isLogin && password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    if (!isLogin && !role) {
      errors.role = "Please select a role.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const endpoint = isLogin 
    ? "http://localhost:8080/api/login" 
    : "http://localhost:8080/api/signup";
  
    const payload = isLogin
      ? { email, password }
      : { name, email, mobile, password, role };
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (isLogin) {
          toast.success("Login successful");
  
          // If you want to handle JWT later, here's how:
          // const token = data.token;
          // localStorage.setItem("token", token);
          // const decoded = jwtDecode(token);
          // login({ name: decoded.name, role: decoded.role, mobile: decoded.mobile });
  
          navigate(`/${data.user.role.toLowerCase()}`);
        } else {
          toast.success("Account created! Please log in.");
          setTimeout(() => {
            setIsLogin(true);
          }, 1000);
        }
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Error connecting to server.");
      console.error("Signup/Login Error:", error);
    }
  };

  const handleMobileChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length <= 10) setMobile(input);
  };
  console.log("Rendering Auth component");

  return (
    
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <p className={styles.quote}>
          "Serve with speed, accuracy, and a smile – let tech do the rest."
        </p>
        <p className={styles.founder}>- Restro POS Team</p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>
            <Link to="/" className={styles.title}>
              {isLogin ? "Login" : "Employee Registration"}
            </Link>
          </h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <label>Employee Name</label>
                <input type="text" required value={name} 
                placeholder="Enter Employee name"
                onChange={(e) => setName(e.target.value)} />
                
                <label>Employee Email</label>
                <input type="email" required 
                  placeholder="Enter Employee Email"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </>
            )}

            <label>Employee Phone</label>
              <input type="tel" value={mobile} onChange={handleMobileChange} 
                placeholder="Enter Employee mobile numbers"
                required />
            {errors.mobile && <p className={styles.errorMsg}>{errors.mobile}</p>}

            <label>Password</label>
            <input type="password" 
              placeholder="Enter passsword" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {errors.password && <p className={styles.errorMsg}>{errors.password}</p>}

            {!isLogin && (
              <>
                <label>Confirm Password</label>
                <input type="password"  placeholder="Enter passsword"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                {errors.confirmPassword && <p className={styles.errorMsg}>{errors.confirmPassword}</p>}

                <label>Select Role</label>
                <div className={styles.roleButtons}>
                  {["waiter", "cashier", "admin"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      className={`${styles.roleBtn} ${role === r ? styles.active : ""}`}
                      onClick={() => setRole(r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {errors.role && <p className={styles.errorMsg}>{errors.role}</p>}
              </>
            )}

            {isLogin && (
              <p className={styles.forgotPassword}>
                <a href="/forgot-password">Forgot Password?</a>
              </p>
            )}

            <button className={styles.authBtn}>{isLogin ? "Login" : "Sign Up"}</button>
          </form>

          <p className={styles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className={styles.toggleLink}
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