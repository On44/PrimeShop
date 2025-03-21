import React from "react";
import { Link } from "react-router-dom";

const CashOnDelivery = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Cash on Delivery
          </h1>
          <p className="mt-2 text-blue-100 text-lg">
            Pay conveniently when your order arrives at your doorstep.
          </p>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8">
          {/* How It Works */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              How It Works
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li>
                Place your order and select <strong>Cash on Delivery</strong> during checkout.
              </li>
              <li>
                Receive a confirmation SMS/email with your order details and estimated delivery date.
              </li>
              <li>
                Your package will be shipped to your provided address within the specified timeframe.
              </li>
              <li>
                Pay the delivery agent in cash when your order is delivered.
              </li>
            </ul>
          </section>

          {/* Terms & Conditions */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Terms & Conditions
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li>
                Cash on Delivery is available only in select regions. Check eligibility at checkout.
              </li>
              <li>
                Please prepare the exact amount in cash, as agents may not carry change.
              </li>
              <li>
                Repeated failure to accept delivery may restrict COD options for your account.
              </li>
              <li>
                For assistance, reach out to our{" "}
                <Link to="/contact" className="text-blue-600 hover:underline">
                  Customer Support
                </Link>.
              </li>
            </ul>
          </section>

          {/* Call to Action */}
          <div className="flex justify-center">
            <Link
              to="/checkout"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 text-lg font-medium"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashOnDelivery;