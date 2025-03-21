import React from 'react';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1 className="hero-title">Elegance Redefined</h1>
        <p className="hero-subtitle">Explore our latest luxury collection</p>
        <button className="cta-button">Shop Now</button>
      </div>
      <img src="path-to-hero-image.jpg" alt="Luxury Fashion Banner" className="hero-image" />
    </div>
  );
};

export default HeroBanner;