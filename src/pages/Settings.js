// src/pages/Settings.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    notificationPreferences: { emailNotifications: true, smsNotifications: false },
    preferredPaymentMethod: "mpesa",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // New state for button loading
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!user || user === "guest") {
      navigate("/Login");
      return;
    }

    const fetchSettings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/settings", {
          headers: { "user-id": localStorage.getItem("userId") },
        });
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        setSettings({
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          city: data.city || "",
          country: data.country || "",
          zipCode: data.zipCode || "",
          notificationPreferences: {
            emailNotifications: data.notificationPreferences?.emailNotifications ?? true,
            smsNotifications: data.notificationPreferences?.smsNotifications ?? false,
          },
          preferredPaymentMethod: data.preferredPaymentMethod || "mpesa",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name.startsWith("notificationPreferences.")) {
      const key = name.split(".")[1];
      setSettings((prev) => ({
        ...prev,
        notificationPreferences: { ...prev.notificationPreferences, [key]: checked },
      }));
    } else {
      setSettings((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true); // Disable button during submission

    try {
      const response = await fetch("http://localhost:5000/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "user-id": localStorage.getItem("userId"),
        },
        body: JSON.stringify(settings),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update settings");
      }
      const data = await response.json();
      setSuccess(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false); // Re-enable button
    }
  };

  if (loading) return <div>Loading settings...</div>;
  if (!user) return null;

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <h3>Profile Information</h3>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={settings.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={settings.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={settings.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={settings.country}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={settings.zipCode}
            onChange={handleChange}
          />
        </div>

        <h3>Notification Preferences</h3>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="notificationPreferences.emailNotifications"
              checked={settings.notificationPreferences.emailNotifications}
              onChange={handleChange}
            />
            Email Notifications
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="notificationPreferences.smsNotifications"
              checked={settings.notificationPreferences.smsNotifications}
              onChange={handleChange}
            />
            SMS Notifications
          </label>
        </div>

        <h3>Payment Preferences</h3>
        <div className="form-group">
          <label>Preferred Payment Method</label>
          <select
            name="preferredPaymentMethod"
            value={settings.preferredPaymentMethod}
            onChange={handleChange}
          >
            <option value="mpesa">M-Pesa</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <button
          type="submit"
          className="save-btn"
          disabled={submitting} // Disable during submission
        >
          {submitting ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default Settings;