// src/context/CartContext.js
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate or retrieve guestId
  const generateGuestId = () => {
    const id = Math.random().toString(36).substring(2, 11);
    localStorage.setItem('guest_id', id);
    return id;
  };
  const guestId = localStorage.getItem('guest_id') || generateGuestId();

  // Fetch cart from server with retry logic
  const fetchCart = useCallback(async (retryCount = 2) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching cart for guestId:', guestId);
      const response = await axios.get('http://localhost:5000/api/cart', {
        params: { guestId },
      });
      console.log('Fetched cart data:', response.data);
      setCartItems(response.data.items || []);
      setCartTotal(response.data.total || 0);
      if (!response.data.items || response.data.items.length === 0) {
        setError('Your cart is empty. Add items to proceed.');
      }
    } catch (err) {
      console.error('Error fetching cart:', err.response?.data || err.message);
      if (retryCount > 0) {
        console.log(`Retrying fetch (attempt ${3 - retryCount} of 2)...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return fetchCart(retryCount - 1);
      }
      setError('Failed to load cart. Please try again.');
      setCartItems([]);
      setCartTotal(0);
    } finally {
      setLoading(false);
    }
  }, [guestId]);

  // Fetch cart on mount with retry
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Add item to cart
  const addToCart = useCallback(
    async (product) => {
      setLoading(true);
      setError(null);
      const dataToSend = {
        productId: product.id,
        quantity: 1,
        guestId,
      };
      try {
        console.log('Adding to cart:', dataToSend);
        const response = await axios.post('http://localhost:5000/api/cart', dataToSend);
        console.log('Updated cart after adding:', response.data);
        setCartItems(response.data.items || []);
        setCartTotal(response.data.total || 0);
      } catch (err) {
        console.error('Error adding to cart:', err.response?.data || err.message);
        setError('Failed to add item to cart. Product may no longer be available.');
      } finally {
        setLoading(false);
      }
    },
    [guestId]
  );

  // Update item quantity in cart
  const updateCartItem = useCallback(
    async (productId, quantity) => {
      setLoading(true);
      setError(null);
      try {
        console.log('Updating cart item:', { productId, quantity, guestId });
        const response = await axios.put(`http://localhost:5000/api/cart/${productId}`, {
          quantity,
          guestId,
        });
        console.log('Updated cart after update:', response.data);
        setCartItems(response.data.items || []);
        setCartTotal(response.data.total || 0);
      } catch (err) {
        console.error('Error updating cart:', err.response?.data || err.message);
        setError('Failed to update cart item.');
      } finally {
        setLoading(false);
      }
    },
    [guestId]
  );

  // Remove item from cart
  const removeFromCart = useCallback(
    async (productId) => {
      setLoading(true);
      setError(null);
      try {
        console.log('Removing from cart:', { productId, guestId });
        const response = await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
          data: { guestId },
        });
        console.log('Updated cart after removal:', response.data);
        setCartItems(response.data.items || []);
        setCartTotal(response.data.total || 0);
      } catch (err) {
        console.error('Error removing from cart:', err.response?.data || err.message);
        setError('Failed to remove item from cart.');
      } finally {
        setLoading(false);
      }
    },
    [guestId]
  );

  // Clear cart
  const clearCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Clearing cart for guestId:', guestId);
      await axios.delete('http://localhost:5000/api/cart', { data: { guestId } });
      console.log('Cart cleared successfully');
      setCartItems([]);
      setCartTotal(0);
    } catch (err) {
      console.error('Error clearing cart:', err.response?.data || err.message);
      setError('Failed to clear cart.');
    } finally {
      setLoading(false);
    }
  }, [guestId]);

  // Fetch order history
  const fetchOrderHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching order history for guestId:', guestId);
      const response = await axios.get('http://localhost:5000/api/orders', {
        params: { guestId },
      });
      console.log('Fetched order history:', response.data);
      setOrderHistory(response.data || []);
    } catch (err) {
      console.error('Error fetching order history:', err.response?.data || err.message);
      setError('Failed to load order history.');
    } finally {
      setLoading(false);
    }
  }, [guestId]);

  // Add checkout function
  const checkout = useCallback(async (orderDetails) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Initiating checkout with orderDetails:', orderDetails);
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/orders/create', {
        ...orderDetails,
        guestId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.data) {
        throw new Error('Failed to place order');
      }

      console.log('Checkout successful, order created:', response.data);
      await clearCart();
      setOrderHistory((prev) => [...prev, response.data.order]);
      return response.data;
    } catch (err) {
      console.error('Checkout error:', err.response?.data || err.message);
      setError('Failed to complete checkout. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [guestId, clearCart]);

  const value = {
    cartItems,
    cartTotal,
    orderHistory,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
    fetchOrderHistory,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};