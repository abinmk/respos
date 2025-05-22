import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation, assuming you're using React Router
import "./Navbar.css"; // Assuming you have a separate CSS file for styling

const Navbar = ({ user, onLogin, onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  const handleLogout = () => {
    setIsLoggedIn(false);
    onLogout(); // Assuming you have an onLogout function passed as props
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>POS Restaurant</h1>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/orders" className="navbar-item">Orders</Link>
        <Link to="/menu" className="navbar-item">Menu</Link>
        <Link to="/report" className="navbar-item">Reports</Link>
      </div>
      <div className="navbar-user">
        {isLoggedIn ? (
          <>
            <span className="username">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <button onClick={onLogin} className="login-btn">Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;