// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-column about">
          <h3 className="footer-title">Prime Shop</h3>
          <p className="footer-description">
            Your premier fashion destination in Kenya, offering curated style and elegance.
          </p>
          <p className="footer-info">
            Prime Shop Ltd | Reg: 12345678
          </p>
          <div className="social-links">
            {[
              { href: "https://www.facebook.com/PrimeShop", icon: "fab fa-facebook-f", label: "Facebook" },
              { href: "https://www.twitter.com/PrimeShop", icon: "fab fa-twitter", label: "Twitter" },
              { href: "https://www.instagram.com/PrimeShop", icon: "fab fa-instagram", label: "Instagram" },
              { href: "https://www.linkedin.com/company/PrimeShop", icon: "fab fa-linkedin-in", label: "LinkedIn" },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className={icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Contact & Hours Section */}
        <div className="footer-column contact">
          <h3 className="footer-title">Contact Us</h3>
          <ul className="footer-list">
            <li>Sarit Center, Westlands, Nairobi, Kenya</li>
            <li>
              Email: <a href="mailto:contact@primeshop.com" className="footer-link">contact@primeshop.com</a>
            </li>
            <li>Phone: +254 794 536 416</li>
            <li>Mobile: +254 103 033 638</li>
          </ul>
          <h3 className="footer-title">Opening Hours</h3>
          <ul className="footer-list">
            <li>Mon - Fri: 9:30 AM - 7:00 PM</li>
            <li>Sat: 9:00 AM - 7:00 PM</li>
            <li>Sun: 11:00 AM - 7:00 PM</li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="footer-column quick-links">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-list">
            {[
              { to: "/facts", text: "FAQs" },
              { to: "/deliveryInfo", text: "Delivery Info" },
              { to: "/returns", text: "Returns & Refunds" },
              { to: "/payment", text: "Payment & Security" },
              { to: "/privacy", text: "Privacy Policy" },
              { to: "/terms", text: "Terms & Conditions" },
            ].map(({ to, text }) => (
              <li key={to}>
                <Link to={to} className="footer-link">{text}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust & Payments Section */}
        <div className="footer-column trust">
          <h3 className="footer-title">Trust & Security</h3>
          <div className="trust-badges">
            <span className="badge ssl">SSL Secured</span>
            <img src="/ssl.jpg" alt="SiteLock" className="badge-image" />
          </div>
          <h3 className="footer-title">We Accept</h3>
          <div className="payment-methods">
            <img src="/paypal.jpg" alt="PayPal" className="payment-icon" />
            <img src="/visa.jpg" alt="Visa" className="payment-icon" />
            <img src="/mastercard.jpg" alt="MasterCard" className="payment-icon" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Prime Shop. All rights reserved. 
          Crafted by <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer" className="footer-link">Your Dev</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;