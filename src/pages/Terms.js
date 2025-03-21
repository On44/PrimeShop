import React from 'react';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-container">
      <h1>Terms of Service</h1>
      <p>Last Updated: [Insert Date]</p>

      <section className="section">
        <h2>1. Acceptance of Terms</h2>
        <p>Welcome to Prime Boutique. By accessing or using our website, you agree to be bound by these Terms of Service ("Terms"), all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
      </section>

      <section className="section">
        <h2>2. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on Prime Boutique's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:</p>
        <ul>
          <li>Modify or copy the materials;</li>
          <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
          <li>Attempt to decompile or reverse engineer any software contained on Prime Boutique's website;</li>
          <li>Remove any copyright or other proprietary notations from the materials; or</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
        </ul>
        <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by Prime Boutique at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</p>
      </section>

      <section className="section">
        <h2>3. Disclaimer</h2>
        <p>The materials on Prime Boutique's website are provided on an 'as is' basis. Prime Boutique makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
      </section>

      <section className="section">
        <h2>4. Limitations</h2>
        <p>In no event shall Prime Boutique or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Prime Boutique's website, even if Prime Boutique or a Prime Boutique authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
      </section>

      <section className="section">
        <h2>5. Accuracy of Materials</h2>
        <p>The materials appearing on Prime Boutique's website could include technical, typographical, or photographic errors. Prime Boutique does not warrant that any of the materials on its website are accurate, complete, or current. Prime Boutique may make changes to the materials contained on its website at any time without notice. However, Prime Boutique does not make any commitment to update the materials.</p>
      </section>

      <section className="section">
        <h2>6. Modifications to Terms of Service</h2>
        <p>Prime Boutique may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.</p>
      </section>

      <section className="section">
        <h2>7. Governing Law</h2>
        <p>These terms and conditions are governed by and construed in accordance with the laws of [Your Country/State] and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
      </section>

      <section className="section">
        <h2>Contact Us</h2>
        <p>If you have any questions about our terms of service, please contact us at:</p>
        <p>Email: terms@primeboutique.com</p>
        <p>Address: 123 Luxury Lane, Elegance City, EC1 4AB</p>
      </section>

    </div>
  );
};

export default Terms;