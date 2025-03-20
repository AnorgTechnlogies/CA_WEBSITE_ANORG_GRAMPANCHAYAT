import React from "react";
import "./footer.css";
// Import icons from a popular icon library (you'll need to install this)
// e.g., npm install react-icons
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>Pitax Pvt. Ltd.</h2>
          <p>
            Your trusted partner for taxation, accounting, and financial
            advisory services. We bring expertise and integrity to every client
            relationship.
          </p>
          <div className="social-icons">
            <a
              href="https://facebook.com/pitaxindia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com/pitaxindia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com/company/pitaxindia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com/pitaxindia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="footer-section services">
          <h3>Our Services</h3>
          <ul>
            <li>
              <a href="#tax-planning">Accounting and Financial Reporting</a>
            </li>
            <li>
              <a href="#gst">Auditing</a>
            </li>
            <li>
              <a href="#audit">Taxation</a>
            </li>
            <li>
              <a href="#advisory">Financial Advisory</a>
            </li>
            <li>
              <a href="#business-registration">Business Registration</a>
            </li>
            <li>
              <a href="#business-registration">GST Services</a>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p>
              <FaEnvelope /> info@pitaxtax.com
            </p>
            <p>
              <FaPhone /> +91 98765 43210
            </p>
            <p>
              <FaMapMarkerAlt /> 123 Financial District, Business Hub, New
              Delhi, India
            </p>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#blog">Tax Blog</a>
            </li>
          </ul>
        </div>
      </div>

      {/* <div className="footer-newsletter">
        <h3>Subscribe to Our Newsletter</h3>
        <p>Stay updated with tax laws, compliance requirements, and financial tips</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </div>
      </div> */}

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} ANORG Technologies Pvt. Ltd. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#disclaimer">Disclaimer</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
