import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-link">Waiter</Link>
      <Link to="/admin" className="nav-link">Admin</Link>
      <Link to="/kitchen" className="nav-link">Kitchen</Link>
      <Link to="/billing" className="nav-link">Billing</Link>
    </nav>
  );
}

export default Navbar;