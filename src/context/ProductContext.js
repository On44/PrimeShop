// src/context/ProductContext.js
import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, isAdmin } = useAuth();

  const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api`;

  // Configure axios instance with defaults
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add Authorization header if token exists
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Response interceptor for consistent error handling
    instance.interceptors.response.use(
      response => response,
      error => {
        const message = error.response?.data?.message || error.message;
        return Promise.reject(new Error(message));
      }
    );

    return instance;
  }, [API_URL, token]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/products');
      setProducts(response.data || []);
      return response.data;
    } catch (err) {
      console.error('Fetch products error:', err);
      setError(err.message || 'Failed to fetch products');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const fetchProductById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (err) {
      console.error('Fetch product by ID error:', err);
      setError(err.message || 'Failed to fetch product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const addProduct = useCallback(async (productData, config = {}) => {
    if (!isAdmin) throw new Error('Admin access required');
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/products', productData, {
        ...config,
        headers: { Authorization: `Bearer ${token}`, ...config.headers },
      });
      setProducts(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('Add product error:', err);
      setError(err.message || 'Failed to add product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, isAdmin, token]);

  const updateProduct = useCallback(async (id, updatedData, config = {}) => {
    if (!isAdmin) throw new Error('Admin access required');
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/products/${id}`, updatedData, {
        ...config,
        headers: { Authorization: `Bearer ${token}`, ...config.headers },
      });
      setProducts(prev => 
        prev.map(p => (p._id === id ? { ...p, ...response.data } : p))
      );
      return response.data;
    } catch (err) {
      console.error('Update product error:', err);
      setError(err.message || 'Failed to update product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, isAdmin, token]);

  const deleteProduct = useCallback(async (id, config = {}) => {
    if (!isAdmin) throw new Error('Admin access required');
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/products/${id}`, {
        ...config,
        headers: { Authorization: `Bearer ${token}`, ...config.headers },
      });
      setProducts(prev => prev.filter(p => p._id !== id));
      return true;
    } catch (err) {
      console.error('Delete product error:', err);
      setError(err.message || 'Failed to delete product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, isAdmin, token]);

  const bulkDeleteProducts = useCallback(async (productIds) => {
    if (!isAdmin) throw new Error('Admin access required');
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/products/bulk-delete', { productIds });
      setProducts(prev => prev.filter(p => !productIds.includes(p._id)));
      return response.data;
    } catch (err) {
      console.error('Bulk delete products error:', err);
      setError(err.message || 'Failed to delete products');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, isAdmin]);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const value = useMemo(() => ({
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    bulkDeleteProducts,
  }), [products, loading, error, fetchProducts, fetchProductById, addProduct, updateProduct, deleteProduct, bulkDeleteProducts]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};