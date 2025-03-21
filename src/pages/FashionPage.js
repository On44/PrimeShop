import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./FashionPage.css";

// Sample product data for each category (replace with API calls in production)
const categoryData = {
  "Men's Fashion": {
    subcategories: ["Clothing", "Footwear", "Accessories"],
    products: [
      { id: 1, name: "Men's Casual Shirt", image: "/car.jpg", price: 39.99, subcategory: "Clothing" },
      { id: 2, name: "Leather Sneakers", image: "/Dula.jpg", price: 79.99, subcategory: "Footwear" },
      { id: 3, name: "Leather Belt", image: "/Esdy shoes.jpg", price: 29.99, subcategory: "Accessories" },
    ],
  },
  "Women's Fashion": {
    subcategories: ["Clothing", "Footwear", "Accessories"],
    products: [
      { id: 4, name: "Elegant Dress", image: "/womens-dress.jpg", price: 129.99, subcategory: "Clothing" },
      { id: 5, name: "High Heels", image: "/womens-heels.jpg", price: 89.99, subcategory: "Footwear" },
      { id: 6, name: "Statement Necklace", image: "/womens-necklace.jpg", price: 49.99, subcategory: "Accessories" },
    ],
  },
  "Children's Fashion": {
    subcategories: ["Boys", "Girls", "Unisex"],
    products: [
      { id: 7, name: "Boys T-Shirt", image: "/boys-tshirt.jpg", price: 19.99, subcategory: "Boys" },
      { id: 8, name: "Girls Skirt", image: "/girls-skirt.jpg", price: 24.99, subcategory: "Girls" },
      { id: 9, name: "Unisex Hoodie", image: "/kids-hoodie.jpg", price: 29.99, subcategory: "Unisex" },
    ],
  },
  "Wrist Watches": {
    subcategories: ["Men's Watches", "Women's Watches", "Unisex Watches", "Smart Watches"],
    products: [
      { id: 10, name: "Men's Chronograph", image: "/mens-watch.jpg", price: 199.99, subcategory: "Men's Watches" },
      { id: 11, name: "Women's Gold Watch", image: "/womens-watch.jpg", price: 149.99, subcategory: "Women's Watches" },
      { id: 12, name: "Smart Watch", image: "/smart-watch.jpg", price: 249.99, subcategory: "Smart Watches" },
    ],
  },
};

const FashionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "Men's Fashion"; // Default to Men's Fashion if no category
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [products, setProducts] = useState([]);

  // Simulate fetching products based on category
  useEffect(() => {
    const data = categoryData[category] || { subcategories: [], products: [] };
    setProducts(data.products);
  }, [category]);

  // Filter products by subcategory
  const filteredProducts = selectedSubcategory === "All"
    ? products
    : products.filter((product) => product.subcategory === selectedSubcategory);

  return (
    <div className="fashion-page">
      {/* Header */}
      <header className="category-header">
        <h1>{category}</h1>
        <p>Explore our exclusive {category} collection.</p>
      </header>

      {/* Subcategory Filter */}
      <section className="subcategory-filter">
        <h3>Filter by Subcategory</h3>
        <div className="filter-options">
          <button
            className={selectedSubcategory === "All" ? "active" : ""}
            onClick={() => setSelectedSubcategory("All")}
          >
            All
          </button>
          {categoryData[category]?.subcategories.map((subcat) => (
            <button
              key={subcat}
              className={selectedSubcategory === subcat ? "active" : ""}
              onClick={() => setSelectedSubcategory(subcat)}
            >
              {subcat}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <h2>Products</h2>
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p className="price">Kshs. {product.price.toFixed(2)}</p>
                <button
                  className="view-button"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available in this subcategory.</p>
        )}
      </section>

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default FashionPage;