// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cart from './pages/Cart';
import Settings from './pages/Settings';
import Register from './pages/Register';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';
import SalesReport from './pages/SalesReport';
import InventoryReport from './pages/InventoryReport';
import UserActivityReport from './pages/UserActivityReport';
import FashionPage from './pages/FashionPage';
import Remittance from './pages/Remittance';
import Flights from './pages/Flights';
import News from './pages/News';
import DeliveryInfo from './pages/DeliveryInfo';
import Returns from './pages/Returns';
import Payment from './pages/Payment';
import Wishlist from './pages/Wishlist';
import Cash from './pages/Cash';
import NextDayDelivery from './pages/NextDayDelivery';
import ClickAndCollect from './pages/ClickAndCollect';
import Postage from './pages/Postage';
import ManageProducts from './pages/ManageProducts';
import Facts from './pages/Facts';
import './App.css';

// Protected App Content Component
const ProtectedAppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }

  if (!user) {
    return <Navigate to="/Login" replace />; // Redirect to login if not authenticated
  }

  return (
    <div className="app-container content">
      <Navbar />
      <main className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/fashion" element={<FashionPage />} />
          <Route path="/remittance" element={<Remittance />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/news" element={<News />} />
          <Route path="/deliveryInfo" element={<DeliveryInfo />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cash" element={<Cash />} />
          <Route path="/nextDayDelivery" element={<NextDayDelivery />} />
          <Route path="/clickAndCollect" element={<ClickAndCollect />} />
          <Route path="/postage" element={<Postage />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/salesReport" element={<SalesReport />} />
          <Route path="/inventoryReport" element={<InventoryReport />} />
          <Route path="/userActivityReport" element={<UserActivityReport />} />
          <Route path="/manageProducts" element={<ManageProducts />} />
          <Route path="/facts" element={<Facts />} />
          {/* Catch-all route to redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/Login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* All other routes are protected */}
                <Route path="*" element={<ProtectedAppContent />} />
              </Routes>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;