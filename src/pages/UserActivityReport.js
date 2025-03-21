import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserActivityReport.css"; // Assuming you have a CSS file for styling

const UserActivityReport = () => {
  const navigate = useNavigate();
  const [userActivities, setUserActivities] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  // This would simulate fetching user activity data from an API
  useEffect(() => {
    // Simulated data fetching
    const fetchData = () => {
      const mockData = [
        { userId: 1, userName: "John Doe", date: "2024-02-01", action: "Login", details: "Logged in successfully" },
        { userId: 2, userName: "Jane Smith", date: "2024-02-02", action: "Purchase", details: "Bought Elegant Dress" },
        { userId: 1, userName: "John Doe", date: "2024-02-03", action: "Logout", details: "Logged out" },
      ];
      setUserActivities(mockData);
    };
    fetchData();
  }, []);

  const handleDateChange = (event) => {
    setDateRange({
      ...dateRange,
      [event.target.name]: event.target.value
    });
  };

  const handleFilter = () => {
    // Here you would typically make an API call with dateRange to fetch filtered user activities
    console.log("Filtering activities for:", dateRange);
    // Simulate filtering by date range
    const filteredData = userActivities.filter(item => 
      new Date(item.date) >= new Date(dateRange.startDate) 
      && new Date(item.date) <= new Date(dateRange.endDate)
    );
    setUserActivities(filteredData);
  };

  return (
    <div className="user-activity-container">
      <h2>User Activity Report</h2>
      <div className="date-filter">
        <label>
          Start Date:
          <input 
            type="date" 
            name="startDate" 
            value={dateRange.startDate} 
            onChange={handleDateChange}
          />
        </label>
        <label>
          End Date:
          <input 
            type="date" 
            name="endDate" 
            value={dateRange.endDate} 
            onChange={handleDateChange}
          />
        </label>
        <button onClick={handleFilter}>Filter</button>
      </div>
      <table className="user-activity-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Date</th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {userActivities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.userId}</td>
              <td>{activity.userName}</td>
              <td>{activity.date}</td>
              <td>{activity.action}</td>
              <td>{activity.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/adminDashboard')} className="back-btn">Back to Reports</button>
    </div>
  );
};

export default UserActivityReport;