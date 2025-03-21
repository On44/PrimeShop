import React from "react";
import "./ClickAndCollect.css";

const ClickAndCollect = () => {
  return (
    <div className="click-collect-container">
      <h1 className="title">Click & Collect</h1>
      <p className="description">
        Order online and pick up your items at your convenience! Our Click & Collect 
        service allows you to shop easily and collect your purchase from a nearby store.
      </p>

      <div className="collection-steps">
        <div className="step">
          <h3>1. Place Your Order</h3>
          <p>Browse and select your items online, then proceed to checkout.</p>
        </div>
        <div className="step">
          <h3>2. Choose Pickup Location</h3>
          <p>Select a nearby collection point or our store for pickup.</p>
        </div>
        <div className="step">
          <h3>3. Receive Notification</h3>
          <p>We’ll notify you when your order is ready for pickup.</p>
        </div>
        <div className="step">
          <h3>4. Collect Your Order</h3>
          <p>Visit the store with your confirmation code and pick up your items.</p>
        </div>
      </div>

      <div className="collection-info">
        <h2>Important Information</h2>
        <ul>
          <li>Orders are ready for collection within 24 hours.</li>
          <li>Ensure you bring a valid ID and order confirmation for pickup.</li>
          <li>No additional charges for Click & Collect service.</li>
          <li>Orders not collected within 7 days will be canceled.</li>
        </ul>
      </div>
    </div>
  );
};

export default ClickAndCollect;
