import React from "react";
import { Link } from "react-router-dom";
import "./Payment.css"; // Ensure CSS file name matches

const Payment = () => {
  return (
    <div className="payment-security-page content" aria-label="Prime Boutique Payment and Security Policy Page">
      {/* No Navbar since it’s only on Home per your request */}
      <main className="payment-security-content" role="main">
        <header className="payment-header">
          <h1>Payment & Security Policy</h1>
          <p>Learn about our secure payment methods and privacy protection at Prime Boutique.</p>
        </header>

        <section className="payment-methods">
          <h2>Payment Methods</h2>
          <p>
            We accept a variety of secure payment options to make your shopping experience seamless. You can pay using:
          </p>
          <ul>
            <li><strong>Credit/Debit Cards:</strong> Visa, Mastercard, American Express, and Discover.</li>
            <li><strong>PayPal:</strong> Fast and secure payments with your PayPal account.</li>
            <li><strong>Mobile Wallets:</strong> Apple Pay, Google Pay, and MPESA for UK customers.</li>
            <li><strong>Bank Transfer:</strong> Direct bank transfers for larger orders (contact us for details).</li>
          </ul>
          <p>
            All transactions are processed instantly, and you’ll receive a confirmation email after payment.
          </p>
        </section>

        <section className="security-measures">
          <h2>Security Measures</h2>
          <p>
            At Prime Boutique, we prioritize your security and privacy. Our security measures include:
          </p>
          <ul>
            <li><strong>SSL Encryption:</strong> All data transmitted on our site is protected by 256-bit SSL encryption.</li>
            <li><strong>SiteLock Security:</strong> We use SiteLock to monitor and protect against threats, ensuring a safe shopping environment.</li>
            <li><strong>EU GDPR Compliance:</strong> We adhere to EU General Data Protection Regulation standards for data privacy.</li>
            <li><strong>PCI DSS Compliance:</strong> Our payment systems comply with Payment Card Industry Data Security Standards.</li>
          </ul>
          <p>
            Your personal and financial information is never shared with third parties without your consent, except as required by law.
          </p>
        </section>

        <section className="privacy-policy">
          <h2>Privacy Policy Highlights</h2>
          <p>
            We are committed to protecting your privacy. Key points of our privacy policy include:
          </p>
          <ul>
            <li>We collect only necessary information (e.g., name, address, payment details) to process your orders.</li>
            <li>Your data is stored securely and used solely for order fulfillment, customer service, and marketing (with opt-in consent).</li>
            <li>You can opt out of marketing communications at any time via your account settings or unsubscribe links.</li>
            <li>Read our full <Link to="/privacy" className="privacy-link">Privacy Policy</Link> for more details.</li>
          </ul>
        </section>

        <section className="payment-faq" aria-label="Frequently Asked Questions about Payment and Security">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Is my payment information safe?</h3>
              <p>Yes, all payments are processed securely with SSL encryption and PCI DSS compliance. We never store full credit card details.</p>
            </div>
            <div className="faq-item">
              <h3>Can I pay with multiple methods for one order?</h3>
              <p>Currently, we accept only one payment method per order. Contact us if you need special arrangements.</p>
            </div>
            <div className="faq-item">
              <h3>What if a payment fails?</h3>
              <p>You’ll receive an error message with instructions to retry or contact support at <a href="mailto:support@primeboutique.com">support@primeboutique.com</a>.</p>
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

export default Payment;