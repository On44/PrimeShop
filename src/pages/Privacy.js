import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p>Last Updated: [Insert Date]</p>

      <section className="section">
        <h2>Introduction</h2>
        <p>Welcome to Prime Boutique. We value your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
      </section>

      <section className="section">
        <h2>1. Information We Collect</h2>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul>
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
          <li><strong>Financial Data</strong> includes payment card details.</li>
          <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
          <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
          <li><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
        </ul>
      </section>

      <section className="section">
        <h2>2. How We Use Your Information</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul>
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal or regulatory obligation.</li>
        </ul>
      </section>

      <section className="section">
        <h2>3. Your Data Protection Rights</h2>
        <p>Under data protection laws, you have rights including:</p>
        <ul>
          <li>Your right of access - You have the right to ask us for copies of your personal information.</li>
          <li>Your right to rectification - You have the right to ask us to rectify information you think is inaccurate. You also have the right to ask us to complete information you think is incomplete.</li>
          <li>Your right to erasure - You have the right to ask us to erase your personal information in certain circumstances.</li>
          <li>Your right to restriction of processing - You have the right to ask us to restrict the processing of your information in certain circumstances.</li>
          <li>Your right to object to processing - You have the right to object to the processing of your personal data in certain circumstances.</li>
          <li>Your right to data portability - You have the right to ask that we transfer the information you gave us to another organisation, or to you, in certain circumstances.</li>
        </ul>
      </section>

      <section className="section">
        <h2>4. Changes to This Privacy Policy</h2>
        <p>We keep our privacy policy under regular review. This version was last updated on [Insert Date]. It’s important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during your relationship with us.</p>
      </section>

      <section className="section">
        <h2>Contact Us</h2>
        <p>If you have any questions about our privacy policy or your data protection rights, please contact us at:</p>
        <p>Email: privacy@primeboutique.com</p>
        <p>Address: 123 Luxury Lane, Elegance City, EC1 4AB</p>
      </section>

    </div>
  );
};

export default Privacy;