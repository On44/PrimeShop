import React from "react";
import { Link } from "react-router-dom";
import "./Flights.css"; // Ensure CSS file name matches

const PromoPage = () => {
  // Sample promotional offers (replace with API data in production)
  const promotions = [
    {
      id: 1,
      title: "Summer Sale – 30% Off Everything!",
      description: "Enjoy 30% off all products from June 1 to June 30, 2025. Shop now for the latest fashion trends!",
      image: "/promo-summer-sale.jpg",
      link: "/products?promo=summer",
    },
    {
      id: 2,
      title: "Watches Deal – Buy One, Get One 50% Off",
      description: "Purchase any wrist watch and get a second at 50% off. Offer valid until July 15, 2025.",
      image: "/promo-watches.jpg",
      link: "/products?promo=watches",
    },
    {
      id: 3,
      title: "Free Shipping on Orders Over £50",
      description: "Get free shipping on all orders above £50. Valid for UK customers until August 1, 2025.",
      image: "/promo-free-shipping.jpg",
      link: "/products?promo=shipping",
    },
  ];

  return (
    <div className="promo-page content" aria-label="Prime Boutique Promotional Offers Page">
      {/* No Navbar since it’s only on Home per your request */}
      <main className="promo-content" role="main">
        <header className="promo-header">
          <h1>Exclusive Promotions</h1>
          <p>Discover unbeatable deals and offers at Prime Boutique. Shop now and save big!</p>
        </header>

        <section className="promo-grid">
          {promotions.map((promo) => (
            <div key={promo.id} className="promo-card">
              <img src={promo.image} alt={promo.title} className="promo-image" />
              <div className="promo-details">
                <h2>{promo.title}</h2>
                <p>{promo.description}</p>
                <Link to={promo.link} className="shop-now-btn" aria-label={`Shop ${promo.title}`}>
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </section>

        <section className="promo-features">
          <h2>Why Shop Our Promotions?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Best Prices</h3>
              <p>Enjoy the lowest prices on premium fashion and accessories with our exclusive deals.</p>
            </div>
            <div className="feature-card">
              <h3>Fast Delivery</h3>
              <p>Get your orders delivered quickly with options like Next Day Delivery and Click & Collect.</p>
            </div>
            <div className="feature-card">
              <h3>Secure Payments</h3>
              <p>Shop with confidence using our secure payment options, including credit cards and mobile wallets.</p>
            </div>
          </div>
        </section>

        <Link to="/" className="back-home-btn" aria-label="Return to Prime Boutique Home Page">
          Back to Home
        </Link>
      </main>
    </div>
  );
};

export default PromoPage;