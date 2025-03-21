import React from "react";
import "./Postage.css";

const Postage = () => {
  return (
    <div className="postage-container">
      <h1 className="title">Postage & Shipping Costs</h1>
      <p className="description">
        We offer reliable postage services based on your order amount. Check the details below to see how much you’ll pay for shipping.
      </p>

      <div className="postage-table">
        <table>
          <thead>
            <tr>
              <th>Order Amount</th>
              <th>Postage Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Up to Ksh.200</td>
              <td>Ksh.500.00</td>
            </tr>
            <tr>
              <td>Ksh.200 - Ksh.500</td>
              <td>Ksh.300.50</td>
            </tr>
            <tr>
              <td>Ksh.500 - Ksh.1000</td>
              <td>Ksh.200.00</td>
            </tr>
            <tr>
              <td>Over Ksh.1000</td>
              <td>Free</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="postage-info">
        <h2>Important Information</h2>
        <ul>
          <li>Postage charges apply only to standard delivery.</li>
          <li>Express shipping is available at an additional cost.</li>
          <li>Delivery times may vary based on your location.</li>
          <li>Free shipping applies only to orders over $100.</li>
        </ul>
      </div>
    </div>
  );
};

export default Postage;
