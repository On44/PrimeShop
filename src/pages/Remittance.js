import React from "react";
import { Link } from "react-router-dom";
import "./Remittance.css";

const Remittance = () => {
  return (
    <div className="remittance-page">
      <main className="remittance-content">
        <header className="remittance-header">
          <h1>Remittance Information</h1>
          <p>Secure and fast money transfer services for your needs.</p>
        </header>

        <section className="remittance-info">
          <div className="info-card">
            <h2>Why Choose Our Remittance Services?</h2>
            <p>
              At Prime Boutique, we offer reliable remittance services to help you send money
              internationally with ease. Our services are fast, secure, and affordable, ensuring
              your funds reach your loved ones or business partners quickly.
            </p>
            <ul>
              <li>Low transaction fees starting at £2.99</li>
              <li>24/7 customer support</li>
              <li>Multiple payment options (bank transfer, credit card, mobile money)</li>
              <li>Real-time tracking of your transactions</li>
            </ul>
          </div>

          <div className="info-card">
            <h2>How It Works</h2>
            <ol>
              <li>Register or log in to your Prime Boutique account.</li>
              <li>Choose the recipient country and enter their details.</li>
              <li>Select your preferred payment method and amount.</li>
              <li>Confirm and send—your transaction will be processed instantly!</li>
            </ol>
            <Link to="/contact" className="contact-link">Contact us for more details</Link>
          </div>

          <div className="info-card">
            <h2>Payment Options</h2>
            <p>We support a variety of secure payment methods for your convenience:</p>
            <ul>
              <li><strong>Bank Transfer:</strong> Direct transfers from your bank account.</li>
              <li><strong>Credit/Debit Card:</strong> Visa, Mastercard, and more.</li>
              <li><strong>Mobile Money:</strong> MPESA, PayPal, and other mobile wallets.</li>
            </ul>
          </div>
        </section>

        <section className="remittance-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>How long does a transfer take?</h3>
            <p>Most transfers are completed within 1-2 business days, with some instant options available.</p>
          </div>
          <div className="faq-item">
            <h3>Is there a fee for remittances?</h3>
            <p>Yes, fees start at £2.99, depending on the amount and destination. Check our rates for details.</p>
          </div>
          <div className="faq-item">
            <h3>Is my transaction secure?</h3>
            <p>Absolutely. We use bank-level encryption and comply with international security standards.</p>
          </div>
        </section>

        <Link to="/" className="back-home-btn">Back to Home</Link>
      </main>
    </div>
  );
};

export default Remittance;