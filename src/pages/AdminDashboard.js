import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

// Predefined categories
const CATEGORIES = ['men', 'women', 'children', 'accessories', 'perfumes', 'bags', 'uncategorized'];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [contacts, setContacts] = useState([]); // New state for contact messages
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    price: '', 
    stock: '', 
    description: '', 
    category: 'uncategorized'
  });
  const [newImage, setNewImage] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingImage, setEditingImage] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editingContact, setEditingContact] = useState(null); // State for editing contact
  const [replyMessage, setReplyMessage] = useState(''); // State for reply message
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [formError, setFormError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search
  const [filterStatus, setFilterStatus] = useState('all'); // State for status filter
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [contactsPerPage] = useState(5); // Number of contacts per page

  // Fetch functions
  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        const updatedProducts = res.data.map(product => ({
          ...product,
          category: CATEGORIES.includes(product.category) ? product.category : 'uncategorized',
        }));
        setProducts(updatedProducts);
      })
      .catch(err => console.error('Error fetching products:', err));
  };

  const fetchOrders = () => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Error fetching orders:', err));
  };

  const fetchCustomers = () => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setCustomers(res.data))
      .catch(err => console.error('Error fetching customers:', err));
  };

  const fetchContacts = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    axios.get('http://localhost:5000/api/contact', {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: 100, skip: 0 } // Fetch more initially for pagination
    })
      .then(res => setContacts(res.data))
      .catch(err => console.error('Error fetching contacts:', err));
  };

  const fetchData = useCallback(() => {
    if (activeTab === 'products') fetchProducts();
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'customers') fetchCustomers();
    if (activeTab === 'contact') fetchContacts();
    if (activeTab === 'dashboard') {
      fetchProducts();
      fetchOrders();
      fetchCustomers();
      fetchContacts();
    }
  }, [activeTab]);

  // Real-time updates with polling
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      if (activeTab === 'contact' || activeTab === 'dashboard') {
        fetchContacts();
      }
    }, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [fetchData, activeTab]);

  const validateForm = () => {
    if (!newProduct.name.trim()) return 'Product name is required';
    if (!newProduct.price || newProduct.price <= 0) return 'Price must be a positive number';
    if (!newProduct.stock || newProduct.stock < 0) return 'Stock must be a non-negative number';
    if (!CATEGORIES.includes(newProduct.category)) return 'Please select a valid category';
    return '';
  };

  const validateContactForm = () => {
    if (!editingContact.subject.trim()) return 'Subject is required';
    if (!editingContact.name.trim()) return 'Name is required';
    if (!editingContact.email.trim()) return 'Email is required';
    if (!editingContact.message.trim()) return 'Message is required';
    if (!editingContact.status) return 'Status is required';
    return '';
  };

  const handleAddProduct = () => {
    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }
    setFormError('');
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('stock', newProduct.stock);
    formData.append('description', newProduct.description);
    formData.append('category', newProduct.category);
    if (newImage) formData.append('image', newImage);

    axios.post('http://localhost:5000/api/products', formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => {
        setProducts([...products, res.data]);
        setNewProduct({ name: '', price: '', stock: '', description: '', category: 'uncategorized' });
        setNewImage(null);
        setShowAddProductForm(false);
      })
      .catch(err => {
        console.error('Error adding product:', err);
        setFormError('Failed to add product. Please try again.');
      });
  };

  const handleUpdateProduct = () => {
    const formData = new FormData();
    formData.append('name', editingProduct.name);
    formData.append('price', editingProduct.price);
    formData.append('stock', editingProduct.stock);
    formData.append('description', editingProduct.description);
    formData.append('category', editingProduct.category);
    if (editingImage) formData.append('image', editingImage);

    axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => {
        setProducts(products.map(p => (p._id === res.data._id ? res.data : p)));
        setEditingProduct(null);
        setEditingImage(null);
      })
      .catch(err => console.error('Error updating product:', err));
  };

  const handleDeleteProduct = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => setProducts(products.filter(p => p._id !== id)))
      .catch(err => console.error('Error deleting product:', err));
  };

  const handleUpdateOrder = () => {
    axios.put(`http://localhost:5000/api/orders/${editingOrder._id}`, { status: editingOrder.status }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => {
        setOrders(orders.map(o => (o._id === res.data._id ? res.data : o)));
        setEditingOrder(null);
      })
      .catch(err => console.error('Error updating order:', err));
  };

  const handleDeleteOrder = (id) => {
    axios.delete(`http://localhost:5000/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => setOrders(orders.filter(o => o._id !== id)))
      .catch(err => console.error('Error deleting order:', err));
  };

  const handleUpdateCustomer = () => {
    axios.put(`http://localhost:5000/api/users/${editingCustomer._id}`, {
      name: editingCustomer.name,
      email: editingCustomer.email,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => {
        setCustomers(customers.map(c => (c._id === res.data._id ? res.data : c)));
        setEditingCustomer(null);
      })
      .catch(err => console.error('Error updating customer:', err));
  };

  const handleDeleteCustomer = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => setCustomers(customers.filter(c => c._id !== id)))
      .catch(err => console.error('Error deleting customer:', err));
  };

  const handleUpdateContact = () => {
    const error = validateContactForm();
    if (error) {
      setFormError(error);
      return;
    }
    const { subject, name, email, message, status } = editingContact;
    axios.put(`http://localhost:5000/api/contact/${editingContact._id}`, { subject, name, email, message, status }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => {
        setContacts(contacts.map(c => (c._id === res.data._id ? res.data : c)));
        setEditingContact(null);
        setFormError('');
      })
      .catch(err => {
        console.error('Error updating contact:', err);
        setFormError('Failed to update contact. Please try again.');
      });
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      axios.delete(`http://localhost:5000/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(() => setContacts(contacts.filter(c => c._id !== id)))
        .catch(err => console.error('Error deleting contact:', err));
    }
  };

  const handleSendReply = (contact) => {
    if (!replyMessage.trim()) {
      setFormError('Reply message cannot be empty');
      return;
    }
    // Simulate sending an email reply (replace with actual email API if available)
    axios.post('http://localhost:5000/api/contact/reply', {
      email: contact.email,
      subject: `Re: ${contact.subject}`,
      message: replyMessage,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => {
        // Update status to "responded"
        axios.put(`http://localhost:5000/api/contact/${contact._id}`, { status: 'responded' }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
          .then(res => {
            setContacts(contacts.map(c => (c._id === res.data._id ? res.data : c)));
            setReplyMessage('');
            setFormError('');
            alert('Reply sent successfully!');
          })
          .catch(err => {
            console.error('Error updating status:', err);
            setFormError('Failed to update status after reply.');
          });
      })
      .catch(err => {
        console.error('Error sending reply:', err);
        setFormError('Failed to send reply. Please try again.');
      });
  };

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        const totalSales = orders.reduce((sum, order) => sum + (order.status === 'delivered' ? order.total : 0), 0);
        const pendingOrders = orders.filter(o => o.status === 'pending').length;
        const unreadContacts = contacts.filter(c => c.status === 'unread').length;
        return (
          <div className="dashboard-content">
            <h2>Dashboard Overview</h2>
            <div className="stats">
              <div className="stat-card">
                <h3>Total Sales</h3>
                <p>Ksh {totalSales.toFixed(2)}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Orders</h3>
                <p>{pendingOrders}</p>
              </div>
              <div className="stat-card">
                <h3>Total Products</h3>
                <p>{products.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Customers</h3>
                <p>{customers.length}</p>
              </div>
              <div className="stat-card">
                <h3>Unread Messages</h3>
                <p>{unreadContacts}</p>
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div>
            <button 
              className="add-product-toggle" 
              onClick={() => setShowAddProductForm(!showAddProductForm)}
            >
              {showAddProductForm ? 'Hide Add Product Form' : 'Add Product'}
            </button>
            {showAddProductForm && (
              <div className="add-product-form">
                <h2>Add New Product</h2>
                {formError && <p className="error-message">{formError}</p>}
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={newProduct.name} 
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} 
                />
                <input 
                  type="number" 
                  placeholder="Price (Ksh)" 
                  value={newProduct.price} 
                  onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} 
                />
                <input 
                  type="number" 
                  placeholder="Stock" 
                  value={newProduct.stock} 
                  onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} 
                />
                <textarea 
                  placeholder="Description (max 500 characters)" 
                  value={newProduct.description} 
                  onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} 
                  maxLength={500}
                  rows={4}
                />
                <select
                  value={newProduct.category}
                  onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="category-select"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => setNewImage(e.target.files[0])} 
                />
                <button onClick={handleAddProduct}>Add Product</button>
              </div>
            )}
            <h2>Manage Products</h2>
            <div className="product-list">
              {products.map(product => {
                const isInvalidCategory = !CATEGORIES.includes(product.category);
                return (
                  <div key={product._id} className="product-card">
                    {editingProduct && editingProduct._id === product._id ? (
                      <>
                        <input 
                          value={editingProduct.name} 
                          onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} 
                        />
                        <input 
                          type="number" 
                          value={editingProduct.price} 
                          onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })} 
                        />
                        <input 
                          type="number" 
                          value={editingProduct.stock} 
                          onChange={e => setEditingProduct({ ...editingProduct, stock: e.target.value })} 
                        />
                        <textarea 
                          value={editingProduct.description} 
                          onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} 
                          maxLength={500}
                          rows={4}
                        />
                        <select
                          value={editingProduct.category}
                          onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          className="category-select"
                        >
                          {CATEGORIES.map(category => (
                            <option key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                          ))}
                        </select>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={e => setEditingImage(e.target.files[0])} 
                        />
                        <button className="save" onClick={handleUpdateProduct}>Save</button>
                        <button className="cancel" onClick={() => setEditingProduct(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <div className="product-id">{product._id}</div>
                        <img src={`http://localhost:5000${product.image_url}`} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>Ksh {parseFloat(product.price).toFixed(2)}</p>
                        <p className="description">{product.description}</p>
                        <p className={isInvalidCategory ? "invalid-category" : "category"}>
                          Category: {product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : 'Uncategorized'}
                          {isInvalidCategory && <span className="category-warning"> (Invalid - Please Update)</span>}
                        </p>
                        <p>Stock: {product.stock}</p>
                        <button className="edit" onClick={() => setEditingProduct(product)}>Edit</button>
                        <button className="delete" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'orders':
        return (
          <div>
            <h2>Manage Orders</h2>
            <div className="order-list">
              {orders.map(order => (
                <div key={order._id} className="order-card">
                  {editingOrder && editingOrder._id === order._id ? (
                    <>
                      <p>Order ID: {order._id}</p>
                      <p>Total: Ksh {order.total.toFixed(2)}</p>
                      <select
                        value={editingOrder.status}
                        onChange={e => setEditingOrder({ ...editingOrder, status: e.target.value })}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="canceled">Canceled</option>
                      </select>
                      <button className="save" onClick={handleUpdateOrder}>Save</button>
                      <button className="cancel" onClick={() => setEditingOrder(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <p>Order ID: {order._id}</p>
                      <p>Total: Ksh {order.total.toFixed(2)}</p>
                      <p>Status: {order.status}</p>
                      <p>Customer: {order.userId === "guest" ? order.fullName || 'Guest' : (order.userId?.name || order.fullName || 'N/A')}</p>
                      <p>Address: {order.address || 'N/A'}</p>
                      <button className="edit" onClick={() => setEditingOrder(order)}>Edit Status</button>
                      <button className="delete" onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'customers':
        return (
          <div>
            <h2>Manage Customers</h2>
            <div className="customer-list">
              {customers.map(customer => (
                <div key={customer._id} className="customer-card">
                  {editingCustomer && editingCustomer._id === customer._id ? (
                    <>
                      <input
                        value={editingCustomer.name}
                        onChange={e => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                      />
                      <input
                        value={editingCustomer.email}
                        onChange={e => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                      />
                      <button className="save" onClick={handleUpdateCustomer}>Save</button>
                      <button className="cancel" onClick={() => setEditingCustomer(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <p>Name: {customer.name}</p>
                      <p>Email: {customer.email}</p>
                      <button className="edit" onClick={() => setEditingCustomer(customer)}>Edit</button>
                      <button className="delete" onClick={() => handleDeleteCustomer(customer._id)}>Delete</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div>
            <h2>Manage Contact Messages</h2>
            <div className="contact-controls">
              <input
                type="text"
                placeholder="Search by subject, name, email, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="status-filter"
              >
                <option value="all">All Statuses</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
              </select>
            </div>
            <div className="contact-list">
              {currentContacts.length > 0 ? (
                currentContacts.map(contact => (
                  <div key={contact._id} className={`contact-card ${contact.status === 'unread' ? 'unread' : ''}`}>
                    {editingContact && editingContact._id === contact._id ? (
                      <>
                        {formError && <p className="error-message">{formError}</p>}
                        <p>Subject: 
                          <input
                            value={editingContact.subject}
                            onChange={e => setEditingContact({ ...editingContact, subject: e.target.value })}
                          />
                        </p>
                        <p>Name: 
                          <input
                            value={editingContact.name}
                            onChange={e => setEditingContact({ ...editingContact, name: e.target.value })}
                          />
                        </p>
                        <p>Email: 
                          <input
                            value={editingContact.email}
                            onChange={e => setEditingContact({ ...editingContact, email: e.target.value })}
                          />
                        </p>
                        <p>Message: 
                          <textarea
                            value={editingContact.message}
                            onChange={e => setEditingContact({ ...editingContact, message: e.target.value })}
                            rows={4}
                          />
                        </p>
                        <p>Status: 
                          <select
                            value={editingContact.status}
                            onChange={e => setEditingContact({ ...editingContact, status: e.target.value })}
                          >
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="responded">Responded</option>
                          </select>
                        </p>
                        <p>Timestamp: {new Date(contact.createdAt).toLocaleString()}</p>
                        <button className="save" onClick={handleUpdateContact}>Save</button>
                        <button className="cancel" onClick={() => { setEditingContact(null); setFormError(''); }}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <p><strong>Subject:</strong> {contact.subject}</p>
                        <p><strong>Name:</strong> {contact.name}</p>
                        <p><strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                        <p><strong>Message:</strong> {contact.message}</p>
                        <p><strong>Status:</strong> <span className={contact.status}>{contact.status}</span></p>
                        <p><strong>Timestamp:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
                        <div className="reply-section">
                          <textarea
                            placeholder="Type your reply here..."
                            value={replyMessage}
                            onChange={e => setReplyMessage(e.target.value)}
                            rows={3}
                            className="reply-input"
                          />
                          <button className="reply" onClick={() => handleSendReply(contact)}>Send Reply</button>
                        </div>
                        <button className="edit" onClick={() => setEditingContact(contact)}>Edit</button>
                        <button className="delete" onClick={() => handleDeleteContact(contact._id)}>Delete</button>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p>No contact messages found.</p>
              )}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? 'active' : ''}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h1>Admin Panel</h1>
        <ul>
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</li>
          <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</li>
          <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</li>
          <li className={activeTab === 'customers' ? 'active' : ''} onClick={() => setActiveTab('customers')}>Customers</li>
          <li className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}>Contact</li> {/* Added Contact tab */}
        </ul>
      </div>
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminDashboard;