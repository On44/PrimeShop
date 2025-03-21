import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    // Fetch user data from API or local storage (example data used here)
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+1234567890'
    };
    setUser(userData);
  }, []);

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
    </div>
  );
};

export default Profile;
