import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// Categories with subcategories
const categories = [
  { id: 1, name: "Men's Fashion", image: "/menn.webp", subcategories: ["Clothing", "Footwear", "Accessories"] },
  { id: 2, name: "Women's Fashion", image: "/womenn.jpg", subcategories: ["Clothing", "Footwear", "Accessories"] },
  { id: 3, name: "Children's Fashion", image: "/children fashion.jpg", subcategories: ["Boys", "Girls", "Unisex"] },
  { id: 4, name: "Wrist Watches", image: "/watch.jpg", subcategories: ["Men's Watches", "Women's Watches", "Unisex Watches", "Smart Watches"] },
];

// Featured products
const featuredProducts = [
];

// Hero carousel slides
const heroSlides = [
  { title: "Welcome to Prime Shop", subtitle: "Discover exclusive fashion deals!", cta: "Shop Now", image: "/hero1.jpg" },
  { title: "New Arrivals", subtitle: "Fresh styles just for you.", cta: "Explore Now", image: "/hero2.jpg" },
  { title: "Seasonal Sale", subtitle: "Up to 50% off select items!", cta: "Grab Deals", image: "/hero3.jpg" },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate hero carousel every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!"); // Placeholder for real subscription logic
  };

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <header className="hero-carousel">
        <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {heroSlides.map((slide, index) => (
            <div key={index} className="carousel-slide">
              <img src={slide.image} alt={slide.title} className="carousel-image" />
              <div className="carousel-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <Link to="/products" className="cta-button">{slide.cta}</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {heroSlides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </header>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">Kshs. {product.price.toFixed(2)}</p>
                <div className="product-actions">
                  <Link to={`/products/${product.id}`} className="view-button">View Details</Link>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="category-section">
        <h2>Explore Categories</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <Link to={`/products?category=${category.name}`}>
                <img src={category.image} alt={category.name} className="category-image" />
                <div className="category-overlay">
                  <h3>{category.name}</h3>
                  <p className="subcategories">{category.subcategories.join(" | ")}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>Special Offer!</h2>
          <p>Get 20% off your first purchase. Use code: <span>WELCOME20</span></p>
          <Link to="/products" className="promo-button">Shop Now</Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <h2>Stay in the Loop</h2>
        <p>Subscribe for exclusive deals and the latest trends.</p>
        <form className="subscribe-form" onSubmit={handleSubscribe}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" className="subscribe-btn">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home;