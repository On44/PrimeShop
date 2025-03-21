import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SalesReport.css"; // Assuming you have a CSS file for styling

const SalesReport = () => {
  const navigate = useNavigate();
  const [salesData, setSalesData] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  // This would simulate fetching sales data from an API
  useEffect(() => {
    // Simulated data fetching
    const fetchData = () => {
      const mockData = [
        { date: "2024-02-01", product: "Elegant Dress", quantity: 2, total: 259.98 },
        { date: "2024-02-02", product: "Luxury Watch", quantity: 1, total: 299.99 },
        { date: "2024-02-03", product: "Elegant Dress", quantity: 3, total: 389.97 },
      ];
      setSalesData(mockData);
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
    // Here you would typically make an API call with dateRange to fetch filtered sales data
    console.log("Filtering sales for:", dateRange);
    // Simulate filtering by date range
    const filteredData = salesData.filter(item => 
      new Date(item.date) >= new Date(dateRange.startDate) 
      && new Date(item.date) <= new Date(dateRange.endDate)
    );
    setSalesData(filteredData);
  };

  return (
    <div className="sales-report-container">
      <h2>Sales Report</h2>
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
      <table className="sales-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Quantity Sold</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.product}</td>
              <td>{item.quantity}</td>
              <td>Kshs. {item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/adminDashboard')} className="back-btn">Back to Reports</button>
    </div>
  );
};

export default SalesReport;