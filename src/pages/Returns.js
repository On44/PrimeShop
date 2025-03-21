import React from "react";
import { Link } from "react-router-dom";
import "./Returns.css"; // Ensure CSS file name matches

const ReturnsAndRefund = () => {
  return (
    <div className="returns-refund-page content" aria-label="Prime Boutique Returns and Refunds Page">
      {/* No Navbar since it’s only on Home per your request */}
      <main className="returns-refund-content" role="main">
        <header className="returns-header">
          <h1>Returns & Refunds</h1>
          <p>Our policy for hassle-free returns and refunds at Prime Boutique.</p>
        </header>

        <section className="returns-policy">
          <h2>Return Policy</h2>
          <p>
            At Prime Boutique, we want you to be completely satisfied with your purchase. If you’re not, you can return most items within 30 days of receipt for a full refund or exchange. Please review our return policy below:
          </p>
          <ul>
            <li>Items must be unused, in their original packaging, and in the same condition as received.</li>
            <li>Products must include all original tags and documentation.</li>
            <li>Return shipping costs are the responsibility of the customer, unless the item is defective or damaged.</li>
            <li>Customized or personalized items are non-returnable.</li>
          </ul>
        </section>

        <section className="refund-policy">
          <h2>Refund Policy</h2>
          <p>
            Once we receive and inspect your return, we’ll notify you via email about the approval or rejection of your refund. If approved, your refund will be processed within 5-7 business days and credited to your original payment method.
          </p>
          <ul>
            <li>Refunds may take 1-2 billing cycles to appear on your statement, depending on your bank or payment provider.</li>
            <li>Original shipping costs are non-refundable unless the return is due to our error.</li>
            <li>Partial refunds may apply for damaged or incomplete returns.</li>
          </ul>
        </section>

        <section className="returns-process">
          <h2>How to Return an Item</h2>
          <ol>
            <li>Log in to your Prime Boutique account and navigate to the “Order History” section.</li>
            <li>Select the item you wish to return and fill out the return request form.</li>
            <li>Print the provided return label and package your item securely.</li>
            <li>Drop off the package at your nearest postal service or arrange a pickup.</li>
            <li>Track your return using the provided tracking number until it reaches our warehouse.</li>
          </ol>
          <p>
            For assistance, contact us at <a href="mailto:support@primeboutique.com">support@primeboutique.com</a> or call +44 123 4567890.
          </p>
        </section>

        <section className="returns-faq" aria-label="Frequently Asked Questions about Returns and Refunds">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How long do I have to return an item?</h3>
              <p>You have 30 days from the date of receipt to return items for a refund or exchange.</p>
            </div>
            <div className="faq-item">
              <h3>Can I return sale items?</h3>
              <p>Sale items are final sale and non-returnable unless defective. Please check product details before purchasing.</p>
            </div>
            <div className="faq-item">
              <h3>What if my item arrives damaged?</h3>
              <p>Contact us within 48 hours of receipt at <a href="mailto:support@primeboutique.com">support@primeboutique.com</a> with photos, and we’ll arrange a replacement or refund, including return shipping costs.</p>
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

export default ReturnsAndRefund;