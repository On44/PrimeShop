import React from "react";
import "./NextDayDelivery.css";

const NextDayDelivery = () => {
  return (
    <div className="next-day-delivery-container">
      <h1 className="title">Next Day Delivery</h1>
      <p className="description">
        Get your orders delivered to your doorstep within 24 hours! Our Next Day
        Delivery service ensures you receive your items as quickly as possible.
      </p>

      <div className="delivery-steps">
        <div className="step">
          <h3>1. Place Your Order</h3>
          <p>Ensure your order is placed before 3 PM for next-day delivery.</p>
        </div>
        <div className="step">
          <h3>2. Confirm Payment</h3>
          <p>Choose a payment method and complete your transaction.</p>
        </div>
        <div className="step">
          <h3>3. Get Your Order</h3>
          <p>Your package will be delivered to your provided address the next day.</p>
        </div>
      </div>

      <div className="delivery-info">
        <h2>Important Information</h2>
        <ul>
          <li>Available only for selected locations.</li>
          <li>Orders placed after 3 PM will be delivered the day after tomorrow.</li>
          <li>Additional shipping fees may apply based on your location.</li>
          <li>Ensure your contact details and address are accurate to avoid delays.</li>
        </ul>
      </div>
    </div>
  );
};

export default NextDayDelivery;
