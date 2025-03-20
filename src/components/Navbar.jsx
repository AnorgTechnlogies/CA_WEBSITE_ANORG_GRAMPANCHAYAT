import React from "react";
// import { Link } from "react-router-dom";
import "../components/Navbar.css";
import logo from "../assets/image/main_logo4.jpg"; // Add a logo image in 'src/assets/'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="CA Logo" className="logo" />
        </div>
  
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    
    </nav>
    
  );
};

export default Navbar;
