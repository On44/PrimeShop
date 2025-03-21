import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './OrderHistory.css';

const OrderHistory = ({ isAdmin = false, userId }) => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const itemsPerPage = 5;

    // Fetch orders from backend
    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const endpoint = isAdmin ? '/api/admin/orders' : `/api/orders/${userId}`;
            const response = await fetch(endpoint, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [isAdmin, userId]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // Pagination logic
    const displayedOrders = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return orders.slice(start, end);
    }, [orders, currentPage]);

    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
    }, []);

    // Admin status update function
    const updateOrderStatus = async (orderId, newStatus) => {
        if (!isAdmin) return;

        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchOrders(); // Refresh orders after update
            }
        } catch (err) {
            setError('Failed to update order status');
        }
    };

    const paginationControls = useMemo(() => (
        <div className="pagination">
            <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1 || isLoading}
            >
                Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages || isLoading}
            >
                Next
            </button>
        </div>
    ), [currentPage, handlePageChange, totalPages, isLoading]);

    if (isLoading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;
    if (orders.length === 0) return <p>No orders found.</p>;

    return (
        <div className="order-history-page">
            <h1>{isAdmin ? 'All Orders (Admin)' : 'Order History'}</h1>
            <div className="order-list">
                {displayedOrders.map(order => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <h2>Order #{order.id}</h2>
                            <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
                            {isAdmin && <p>User ID: {order.userId}</p>}
                            {isAdmin ? (
                                <select
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                    className="status-dropdown"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            ) : (
                                <p>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
                            )}
                        </div>
                        <div className="order-details">
                            <div className="order-items">
                                <h3>Items:</h3>
                                {order.items.map(item => (
                                    <div key={item.id} className="item">
                                        <img src={item.image} alt={item.name} className="item-image" loading="lazy" />
                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: Kshs.{item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="order-summary">
                                <p><strong>Total Amount:</strong> Kshs.{order.total.toFixed(2)}</p>
                                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {paginationControls}
        </div>
    );
};

export default OrderHistory;