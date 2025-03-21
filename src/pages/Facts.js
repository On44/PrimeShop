// src/pages/FAQs.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Facts.css";

const faqs = [
  {
    question: "What is Prime Shop?",
    answer:
      "Prime Shop is your premier online fashion destination in Kenya, offering a curated selection of clothing, footwear, accessories, and wristwatches for men, women, and children.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Browse our <Link to='/products' className='faq-link'>Products</Link> page, select your items, and click 'Add to Cart.' When ready, go to your <Link to='/cart' className='faq-link'>Cart</Link> and proceed to checkout to complete your order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept PayPal, Visa, and MasterCard. All transactions are SSL-secured for your safety.",
  },
  {
    question: "How much is shipping, and how long does it take?",
    answer:
      "Shipping within Nairobi costs Ksh 200 and takes 1-2 business days. Outside Nairobi, it’s Ksh 350 and takes 3-5 business days. Free shipping applies to orders over Ksh 5,000. See our <Link to='/deliveryInfo' className='faq-link'>Delivery Info</Link> page for more details.",
  },
  {
    question: "Can I return or exchange an item?",
    answer:
      "Yes, we offer returns and exchanges within 14 days of delivery if items are unused and in original packaging. Visit our <Link to='/returns' className='faq-link'>Returns & Refunds</Link> page for the full policy.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order ships, you’ll receive a tracking number via email. Log into your account on the <Link to='/orderHistory' className='faq-link'>Order History</Link> page to check the status.",
  },
  {
    question: "Do you offer discounts or promotions?",
    answer:
      "Yes! Check our <Link to='/' className='faq-link'>Home</Link> page for current offers, like 20% off your first order with code WELCOME20.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "Reach us at <a href='mailto:contact@primeshop.com' className='faq-link'>contact@primeshop.com</a> or call +254 794 536 416. We’re available Mon-Fri, 9:30 AM - 7:00 PM.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Orders can be modified or canceled within 1 hour of placement. Contact us immediately at <a href='mailto:contact@primeshop.com' className='faq-link'>contact@primeshop.com</a>.",
  },
  {
    question: "How do I create or manage my account?",
    answer:
      "Sign up or log in via the <Link to='/register' className='faq-link'>Register</Link> or <Link to='/clientLogin' className='faq-link'>Login</Link> pages. Manage your details in the <Link to='/settings' className='faq-link'>Settings</Link> section.",
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faqs-page">
      <h1>Frequently Asked Questions</h1>
      <p className="intro">
        Find answers to common questions about shopping with Prime Shop. Can’t find what you need?{" "}
        <Link to="/contact" className="faq-link">Contact us</Link>.
      </p>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="faq-toggle">{activeIndex === index ? "−" : "+"}</span>
            </button>
            <div className={`faq-answer ${activeIndex === index ? "open" : ""}`}>
              <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;