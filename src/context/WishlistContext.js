import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const WishlistContext = createContext();
const GUEST_ID_KEY = 'guest_id';
const API_URL = 'http://localhost:5000/api/wishlist';

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate or retrieve guestId
  const guestId = localStorage.getItem(GUEST_ID_KEY) || Math.random().toString(36).substring(2);
  if (!localStorage.getItem(GUEST_ID_KEY)) {
    localStorage.setItem(GUEST_ID_KEY, guestId);
  }

  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, { params: { guestId } });
      console.log('Fetch wishlist response:', response.data);
      setWishlistItems(response.data || []);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch wishlist';
      setError(errorMessage);
      console.error('Fetch wishlist error:', {
        message: errorMessage,
        status: err.response?.status,
        data: err.response?.data,
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  }, [guestId]); // guestId is stable after initial render

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = useCallback(async (productId) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Adding to wishlist:', { productId, guestId });
      const response = await axios.post(API_URL, { productId, guestId });
      setWishlistItems(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add to wishlist';
      setError(errorMessage);
      console.error('Add to wishlist error:', {
        message: errorMessage,
        status: err.response?.status,
        data: err.response?.data,
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  }, [guestId]);

  const removeFromWishlist = useCallback(async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${API_URL}/${productId}`, { data: { guestId } });
      setWishlistItems(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to remove from wishlist';
      setError(errorMessage);
      console.error('Remove from wishlist error:', {
        message: errorMessage,
        status: err.response?.status,
        data: err.response?.data,
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  }, [guestId]);

  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some((item) => item.productId === productId);
  }, [wishlistItems]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        fetchWishlist,
        loading,
        error,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};