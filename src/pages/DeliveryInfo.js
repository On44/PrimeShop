// src/pages/DeliveryInfo.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DeliveryInfo.css";

const deliveryOptions = [
  {
    title: "Standard Delivery",
    cost: "Ksh 200",
    time: "1-2 business days",
    details: "Available for all orders within Nairobi.",
  },
  {
    title: "Regional Delivery",
    cost: "Ksh 350",
    time: "3-5 business days",
    details: "Covers areas outside Nairobi within Kenya.",
  },
  {
    title: "Click & Collect",
    cost: "Free",
    time: "Available within 2-3 business days",
    details: "Pick up at our Sarit Center store in Westlands, Nairobi.",
  },
  {
    title: "International Delivery",
    cost: "Starts at Ksh 1,500",
    time: "7-14 business days",
    details: "Available to select countries (e.g., US, UK, EU). Contact us for details.",
  },
];

const shippingDetails = [
  {
    title: "Order Processing",
    description: "Orders are processed within 1-2 business days. You’ll receive a tracking number via email once shipped.",
  },
  {
    title: "Free Shipping",
    description: "Free standard shipping on orders over Ksh 5,000 within Kenya, applied automatically at checkout.",
  },
  {
    title: "Tracking Your Order",
    description: "Monitor your delivery status via the tracking link in your email or your <Link to='/orderHistory' className='inline-link'>Order History</Link> page.",
  },
];

const faqs = [
  {
    question: "What if I’m not available to receive my delivery?",
    answer: "Our couriers will leave your package with a neighbor or at a nearby pickup point. You can also reschedule via the tracking link.",
  },
  {
    question: "Can I change my delivery address after ordering?",
    answer: "Yes, contact us within 12 hours at <a href='mailto:support@primeshop.com' className='inline-link'>support@primeshop.com</a> to update your address.",
  },
  {
    question: "Do you deliver on weekends?",
    answer: "Yes, regional deliveries may include Saturdays. Standard delivery within Nairobi is Monday–Friday only.",
  },
];

const DeliveryInfo = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="delivery-info-page content" aria-label="Prime Shop Delivery Information Page">
      <main className="delivery-info-content" role="main">
        <header className="delivery-header">
          <h1>Delivery Information</h1>
          <p>Learn how Prime Shop delivers your fashion essentials across Kenya and beyond.</p>
          <Link to="/cart" className="track-order-btn">Track Your Order</Link>
        </header>

        {/* Delivery Options */}
        <section className="delivery-options">
          <h2>Our Delivery Options</h2>
          <div className="option-grid">
            {deliveryOptions.map((option, index) => (
              <div key={index} className="option-card">
                <h3>{option.title}</h3>
                <p>
                  <strong>Cost:</strong> {option.cost}<br />
                  <strong>Delivery Time:</strong> {option.time}<br />
                  {option.details}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping Details */}
        <section className="shipping-details">
          <h2>Shipping Details</h2>
          <div className="details-grid">
            {shippingDetails.map((detail, index) => (
              <div key={index} className="detail-card">
                <h3>{detail.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: detail.description }} />
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="delivery-faq" aria-label="Frequently Asked Questions about Delivery">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${activeFAQ === index ? "active" : ""}`}
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span className="faq-toggle">{activeFAQ === index ? "−" : "+"}</span>
                </button>
                <div className={`faq-answer ${activeFAQ === index ? "open" : ""}`}>
                  <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <Link to="/" className="back-home-btn" aria-label="Return to Prime Shop Home Page">
          Back to Home
        </Link>
      </main>
    </div>
  );
};

export default DeliveryInfo;