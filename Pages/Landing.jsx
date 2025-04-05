import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  // Handle Input Changes
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMobileChange = (e) => setMobile(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const navigate = useNavigate(); 

  // Handle Sign-up
  function handleSignup(e) {
    e.preventDefault();
    const userData = { name, role, password, email, mobile };
    console.log(userData);
    navigate(`/${role}`);
  }

  function handleLogin(e) {
    e.preventDefault();
    navigate(`/${role}`);
  }

  return (
    <div className="container">
      {/* Left Section */}
      <div className="left-section">
        <p className="quote">
          "Serve customers the best food with prompt and friendly service in a welcoming
          atmosphere, and they'll keep coming back."
        </p>
        <p className="founder">- Founder of Restro</p>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="form-content">
          <h2 className="title">Employee Registration</h2>
          <form className="form">
            <label>Employee Name</label>
            <input type="text" placeholder="Enter employee name" onChange={handleNameChange} />

            <label>Employee Email</label>
            <input type="email" placeholder="Enter employee email" onChange={handleEmailChange} />

            <label>Employee Phone</label>
            <input type="text" placeholder="Enter employee phone" onChange={handleMobileChange} />

            <label>Password</label>
            <input type="password" placeholder="Enter password" onChange={handlePasswordChange} />

            <label>Choose your role</label>
            <div className="role-buttons">
              {["Waiter", "Cashier", "Admin"].map((r) => (
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

            <button className="signup-btn" onClick={handleSignup}>Sign up</button>
    
          </form>

          <p className="signin-text">
            Already have an account? <a href="#">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
