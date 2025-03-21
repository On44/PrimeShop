// src/pages/Cart.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const {
    cartItems = [],
    removeFromCart,
    updateCartItem, // Changed from updateQuantity
    fetchCart,
    loading,
    error,
    cartTotal, // Changed from getCartTotal
  } = useCart();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      fetchCart();
      setIsInitialLoad(false);
    }
  }, [fetchCart, isInitialLoad]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateCartItem(productId, newQuantity);
    }
  };

  // Show loading only on initial fetch
  if (loading && isInitialLoad) {
    return (
      <section className="cart">
        <div className="loading">
          <p>Loading cart...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="cart">
        <div className="error">
          <p>{error}</p>
          <Link to="/products" className="shop-link">Continue Shopping</Link>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="cart">
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/products" className="shop-link">Continue Shopping</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart">
      <h1>Your Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.productId} className="cart-item">
              <img
                src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`}
                alt={item.name}
                onError={(e) => (e.target.src = '/images/fallback.jpg')}
              />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="price">Ksh {parseFloat(item.price).toFixed(2)}</p>
                <div className="quantity-control">
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                    disabled={loading}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                    disabled={loading}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.productId)}
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Summary</h2>
          <p>Total Items: {cartItems.length}</p>
          <p>Total Price: Ksh {cartTotal.toFixed(2)}</p>
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;