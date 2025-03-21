// src/components/Navbar.js
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import io from "socket.io-client";
import "./Navbar.css";

const Navbar = () => {
  const { cartItems = [] } = useCart();
  const { wishlistItems = [] } = useWishlist();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); // Array for multiple notifications
  const navbarRef = useRef(null);

  const itemCount = Array.isArray(cartItems)
    ? cartItems.reduce((count, item) => count + (item.quantity || 0), 0)
    : 0;
  const wishlistCount = Array.isArray(wishlistItems) ? wishlistItems.length : 0;

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      reconnection: true, // Auto-reconnect if disconnected
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => console.log("Connected to Socket.IO server"));
    socket.on("connect_error", (err) => console.error("Socket.IO connection error:", err));

    socket.on("newOrder", (order) => {
      if (user && user.role === "admin") {
        const newNotification = {
          id: order.id,
          message: `New Order #${order.id}: Ksh. ${order.total}`,
          timestamp: new Date().toLocaleTimeString(),
        };
        setNotifications((prev) => [...prev, newNotification]);

        // Play a notification sound
        const audio = new Audio("/notification.mp3"); // Add a sound file in public folder
        audio.play().catch((err) => console.error("Audio play error:", err));

        // Auto-dismiss after 5 seconds (optional, can be manual)
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== order.id));
        }, 5000);
      }
    });

    return () => {
      socket.disconnect();
      console.log("Disconnected from Socket.IO server");
    };
  }, [user]);

  const toggleMenu = () => setIsOpen(!isOpen);


  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const phoneNumber = "+254794536415";

  return (
    <nav className="navbar" ref={navbarRef}>
      {notifications.length > 0 && (
        <div className="notification-container">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification">
              <span>{notification.message}</span>
              <span className="timestamp"> ({notification.timestamp})</span>
              <button
                className="dismiss-btn"
                onClick={() => dismissNotification(notification.id)}
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <div className={`navbar-nav ${isOpen ? "open" : ""}`}>
        <Link to="/" className="navbar-brand">
          <h1>
            <b>
              <i>PRIME SHOP</i>
            </b>
          </h1>
        </Link>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <div className="nav-content">
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Shop</Link>
            <Link to="/remittance" className="nav-link">Remittance</Link>
            <Link to="/news" className="nav-link">News</Link>
          </div>
          <div className="nav-actions">
            <Link to="/wishlist" className="nav-icon">
              <span role="img" aria-label="Wishlist">❤️</span>
              <span className="count">{wishlistCount}</span>
            </Link>
            <Link to="/cart" className="nav-icon">
              <span role="img" aria-label="Cart">🛒</span>
              <span className="count">{itemCount}</span>
            </Link>
            {user ? (
              <div className="user-actions">
                
              </div>
            ) : (
              <div className="auth-actions">
                
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="navbar-top">
        <div className="navbar-top-left">
          <Link to="/about" className="top-link">About Us</Link>
          <Link to="/contact" className="top-link">Contact</Link>
        </div>
        <div className="navbar-top-right">
          <p className="contact-info">Customer Care: +254 794 536 415</p>
          <div className="contact-icons">
            <a href={`tel:${phoneNumber}`} className="contact-icon call-icon" aria-label="Call Customer Care">
              📞
            </a>
            <a
              href={`https://wa.me/${phoneNumber}`}
              className="contact-icon whatsapp-icon"
              aria-label="Message on WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬
            </a>
          </div>
        </div>
        <div className="auth-section">
          {user ? (
            <>
              <Link to="/login" className="auth-link">My Account</Link>
              <Link to="/orderHistory" className="auth-link">Order History</Link>
            </>
          ) : (
            <>
              <Link to="/Login" className="auth-link">Login</Link>
              <Link to="/register" className="auth-link">Register</Link>
            </>
          )}
        </div>
      </div>
      <div className="navbar-delivery">
        <Link to="/clickAndCollect" className="delivery-option">Click & Collect</Link>
        <Link to="/cash" className="delivery-option">Cash on Delivery</Link>
        <Link to="/nextDayDelivery" className="delivery-option">Next Day Delivery</Link>
        <Link to="/postage" className="delivery-option">Postage From Ksh.300.99</Link>
      </div>
    </nav>
  );
};

export default Navbar;