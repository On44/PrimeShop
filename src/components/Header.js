import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Prime Boutique</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Shop</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {user ? (
            <li><Link to="/profile">Profile</Link></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
          <li>
            <Link to="/cart" className="cart-link">
              Cart ({cart.items.length})
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
