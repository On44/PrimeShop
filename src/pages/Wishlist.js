// src/pages/Wishlist.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, fetchWishlist, loading, error } = useWishlist();
  const { cartItems, addToCart, fetchCart } = useCart();
  const [actionError, setActionError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      fetchWishlist();
      fetchCart();
      setIsInitialLoad(false); // Only fetch once on mount
    }
  }, [fetchWishlist, fetchCart, isInitialLoad]);

  // Filter wishlist items to exclude those already in the cart
  const filteredWishlist = wishlistItems.filter(
    (wishlistItem) => !cartItems.some((cartItem) => cartItem.productId === wishlistItem.productId)
  );

  const handleAddToCart = async (item) => {
    try {
      setActionError(null);
      await addToCart({ id: item.productId, name: item.name, price: item.price, image: item.image });
      await removeFromWishlist(item.productId);
      await fetchCart();
      await fetchWishlist();
    } catch (err) {
      console.error('Error adding to cart:', err);
      setActionError('Failed to add item to cart. Please try again.');
    }
  };

  if (loading && isInitialLoad) { // Only show loading on initial fetch
    return (
      <div className="wishlist-page content">
        <h1>Loading Wishlist...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wishlist-page content">
        <h1>Wishlist Error</h1>
        <div className="error">
          {error}
          <button onClick={() => { fetchWishlist(); fetchCart(); }}>Retry</button>
        </div>
      </div>
    );
  }

  if (!filteredWishlist.length) {
    return (
      <div className="wishlist-page content">
        <h1>Your Wishlist is Empty</h1>
        <p>Start adding products to your wishlist from our product pages!</p>
        <Link to="/products" className="shop-now-btn">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page content">
      <header className="wishlist-header">
        <h1>Your Wishlist</h1>
        <p>Items you’ve saved for later.</p>
        <Link to="/products" className="nav-link">Back to Products</Link>
      </header>
      {actionError && <p className="error">{actionError}</p>}
      <section className="wishlist-grid">
        {filteredWishlist.map((item) => (
          <div key={item.productId} className="wishlist-item">
            <img
              src={`http://localhost:5000${item.image}` || 'placeholder.jpg'}
              alt={item.name}
              className="wishlist-image"
            />
            <div className="wishlist-details">
              <h2>{item.name}</h2>
              <p className="price">Kshs. {parseFloat(item.price).toFixed(2)}</p>
              <div className="wishlist-actions">
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
                <button className="remove-btn" onClick={() => removeFromWishlist(item.productId)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
      <Link to="/products" className="back-to-products-btn">Continue Shopping</Link>
    </div>
  );
};

export default Wishlist;