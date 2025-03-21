// src/components/Checkout.js
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { cartItems = [], cartTotal = 0, checkout, loading } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    paymentMethod: 'creditCard',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    paymentMethod: '',
    phoneNumber: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  // Log cart data on render and changes
  useEffect(() => {
    console.log('Cart data in Checkout.js:', {
      cartItems,
      cartTotal,
      loading,
      isValidCart: Array.isArray(cartItems) && cartItems.length > 0 && typeof cartTotal === 'number' && !isNaN(cartTotal) && cartTotal > 0,
    });
  }, [cartItems, cartTotal, loading]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    setCheckoutError(null);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip Code is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
    if (formData.paymentMethod === 'mpesa') {
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = 'Phone number is required for M-Pesa';
      } else if (!/^\+254\d{9}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Phone number must be in the format +2547XXXXXXXX';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    setCheckoutError(null);

    // Validate cart data before submission
    console.log('Submitting with cart data:', {
      cartItems,
      cartTotal,
      guestId: localStorage.getItem('guest_id'),
    });

    if (loading) {
      setCheckoutError('Please wait while the cart is loading...');
      setIsProcessing(false);
      return;
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      setCheckoutError('Your cart is empty. Add items to proceed.');
      setIsProcessing(false);
      return;
    }

    if (typeof cartTotal !== 'number' || isNaN(cartTotal) || cartTotal <= 0) {
      setCheckoutError('Invalid total amount. Please check your cart.');
      setIsProcessing(false);
      return;
    }

    // Validate each item in cartItems
    const invalidItems = cartItems.filter(
      (item) =>
        !item.productId ||
        typeof item.quantity !== 'number' ||
        item.quantity < 1 ||
        typeof item.price !== 'number' ||
        item.price < 0
    );
    if (invalidItems.length > 0) {
      console.log('Invalid items in cart:', invalidItems);
      setCheckoutError('Some items in your cart are invalid. Please remove or update them.');
      setIsProcessing(false);
      return;
    }

    const orderDetails = {
      userId: localStorage.getItem('userId') || undefined, // Changed from 'guest' to 'undefined'
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity || 1,
        price: item.price || 0,
      })),
      total: cartTotal,
      fullName: formData.fullName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      zipCode: formData.zipCode,
      paymentMethod: formData.paymentMethod,
      phoneNumber: formData.paymentMethod === 'mpesa' ? formData.phoneNumber : undefined,
    };

    try {
      if (!navigator.onLine) {
        throw new Error('No internet connection detected.');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setCheckoutError('Please log in to proceed with payment.');
        navigate('/clientLogin');
        return;
      }

      console.log('Sending order to backend - Request Payload:', orderDetails);
      const response = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderDetails),
      });

      console.log('Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unable to read server response');
        console.log('Response error text:', errorText);
        throw new Error(`Failed to create order: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Order creation result:', result);

      if (result.order && (result.order.status === 'successful' || result.order.status === 'delivered')) {
        await checkout(orderDetails);
        alert('Order placed successfully!');
        navigate('/orderHistory');
      } else {
        setCheckoutError(
          formData.paymentMethod === 'mpesa'
            ? 'M-Pesa payment is processing. Please complete the payment on your phone.'
            : 'Order processing incomplete. Please try again.'
        );
      }
    } catch (error) {
      console.error('Checkout Error Details:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        status: error.response?.status,
        data: error.response?.data,
      });

      if (error.message.includes('Failed to fetch')) {
        setCheckoutError(
          navigator.onLine
            ? 'Unable to reach the server. Please try again later.'
            : 'No internet connection. Please check your network.'
        );
      } else if (error.message.includes('401')) {
        setCheckoutError('Authentication required. Please log in.');
        navigate('/clientLogin');
      } else if (error.message.includes('400')) {
        try {
          const parsedError = JSON.parse(error.message.split(' - ')[1] || '{}');
          setCheckoutError(`Invalid request: ${parsedError.error || 'Please check your input.'}`);
        } catch (parseError) {
          setCheckoutError('Invalid request: Please check your input.');
        }
      } else {
        setCheckoutError(error.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="checkout-page">
        <p className="loading">Loading checkout...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <p>Your cart is empty. Add some items to proceed to checkout.</p>
        <Link to="/products" className="shop-link">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {checkoutError && <p className="error checkout-error">{checkoutError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="checkout-form">
          <h2>Shipping Information</h2>
          <div className="form-group">
            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleInputChange}
              value={formData.fullName}
              disabled={isProcessing}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={formData.email}
              disabled={isProcessing}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input
              name="address"
              placeholder="Address"
              onChange={handleInputChange}
              value={formData.address}
              disabled={isProcessing}
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          <div className="form-group">
            <input
              name="city"
              placeholder="City"
              onChange={handleInputChange}
              value={formData.city}
              disabled={isProcessing}
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div className="form-group">
            <input
              name="country"
              placeholder="Country"
              onChange={handleInputChange}
              value={formData.country}
              disabled={isProcessing}
            />
            {errors.country && <p className="error">{errors.country}</p>}
          </div>
          <div className="form-group">
            <input
              name="zipCode"
              placeholder="Zip Code"
              onChange={handleInputChange}
              value={formData.zipCode}
              disabled={isProcessing}
            />
            {errors.zipCode && <p className="error">{errors.zipCode}</p>}
          </div>
        </div>
        <div className="payment-options">
          <h2>Payment Method</h2>
          <select
            name="paymentMethod"
            onChange={handleInputChange}
            value={formData.paymentMethod}
            disabled={isProcessing}
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="mpesa">M-Pesa</option>
          </select>
          {errors.paymentMethod && <p className="error">{errors.paymentMethod}</p>}
          {formData.paymentMethod === 'mpesa' && (
            <div className="form-group">
              <input
                name="phoneNumber"
                placeholder="Phone Number (e.g., +254712345678)"
                onChange={handleInputChange}
                value={formData.phoneNumber}
                disabled={isProcessing}
              />
              {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            </div>
          )}
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          {cartItems.map((item, index) => (
            <div key={item.productId || `item-${index}`} className="summary-item">
              <p>
                {item.name} x {item.quantity} - Ksh {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <p className="total">Total: Ksh {cartTotal.toFixed(2)}</p>
        </div>
        <button
          type="submit"
          className={`place-order ${isProcessing ? 'processing' : ''}`}
          disabled={isProcessing}
          aria-label={isProcessing ? 'Processing your order' : 'Place your order'}
        >
          {isProcessing ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            'Place Order'
          )}
        </button>
      </form>
    </div>
  );
};

export default Checkout;