import React, { useState } from "react";
import "./User.css";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function User() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); 

  const handleToggle = () => {
    setShowPopup(!showPopup);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <div className="user-bar">
      <div className="user-info" onClick={handleToggle}>
        <FaUserCircle className="user-icon" />
        <span className="user-name">John Doe</span>
      </div>

      {showPopup && (
        <div className="user-popup">
          <div className="popup-item" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
}