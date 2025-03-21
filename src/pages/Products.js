import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// Predefined categories
const CATEGORIES = ['all', 'men', 'women', 'children', 'accessories', 'perfumes', 'bags'];

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState('');
  const [wishlistMessage, setWishlistMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    // Filter by search term with safety checks
    if (searchTerm) {
      result = result.filter(product => {
        const name = product.name || '';
        const description = product.description || '';
        return (
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Filter by category with safety check
    if (selectedCategory !== 'all') {
      result = result.filter(product => (product.category || 'uncategorized') === selectedCategory);
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/images/fallback.jpg';
    if (imageUrl.startsWith('/images/')) return imageUrl;
    return `http://localhost:5000${imageUrl}`;
  };

  const handleAddToCart = (product) => {
    const item = {
      id: product._id,
      name: product.name || 'Unnamed Product',
      price: product.price || 0,
      image: product.image_url,
    };
    addToCart(item);
    setCartMessage(`${product.name || 'Item'} added to cart!`);
    setTimeout(() => setCartMessage(''), 3000);
  };

  const handleAddToWishlist = (productId) => {
    addToWishlist(productId);
    const product = products.find(p => p._id === productId) || { name: 'Item' };
    setWishlistMessage(`${product.name} added to wishlist!`);
    setTimeout(() => setWishlistMessage(''), 3000);
  };

  return (
    <section className="products">
      <h1>Our Products</h1>
      
      {/* Search and Filter Section */}
      <div className="products-filter">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {CATEGORIES.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="loading">Loading products...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        <>
          {cartMessage && <p className="success-message">{cartMessage}</p>}
          {wishlistMessage && <p className="success-message">{wishlistMessage}</p>}
          <div className="product-grid">
            {filteredProducts.map(product => (
              <div key={product._id} className="product-card">
                <img
                  src={getImageUrl(product.image_url)}
                  alt={product.name || 'Product Image'}
                  onError={(e) => (e.target.src = '/images/fallback.jpg')}
                />
                <h3>{product.name || 'Unnamed Product'}</h3>
                <p className="price">Ksh {parseFloat(product.price || 0).toFixed(2)}</p>
                <p className="category">Category: {product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : 'Uncategorized'}</p>
                <p className="description">{product.description || 'No description available'}</p>
                <p>Stock: {product.stock || 0}</p>
                <div className="product-actions">
                  <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                  <button className="add-to-wishlist" onClick={() => handleAddToWishlist(product._id)}>
                    <span className="heart-icon">❤️</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Products;