import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InventoryReport.css"; // Assuming you have a CSS file for styling

const InventoryReport = () => {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);

  // This would simulate fetching inventory data from an API
  useEffect(() => {
    // Simulated data fetching
    const fetchData = () => {
      const mockData = [
        { id: 1, name: "Elegant Dress", inStock: 10, lowStockThreshold: 5 },
        { id: 2, name: "Luxury Watch", inStock: 3, lowStockThreshold: 2 },
        { id: 3, name: "Casual Shirt", inStock: 20, lowStockThreshold: 10 },
      ];
      setInventoryData(mockData);
    };
    fetchData();
  }, []);

  return (
    <div className="inventory-report-container">
      <h2>Inventory Report</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>In Stock</th>
            <th>Low Stock Threshold</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.inStock}</td>
              <td>{item.lowStockThreshold}</td>
              <td className={item.inStock <= item.lowStockThreshold ? "low-stock" : "normal-stock"}>
                {item.inStock <= item.lowStockThreshold ? "Low Stock" : "Normal Stock"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/adminDashboard')} className="back-btn">Back to Reports</button>
    </div>
  );
};

export default InventoryReport;