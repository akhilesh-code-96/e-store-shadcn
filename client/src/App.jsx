import { ThemeProvider } from "./components/theme-provider";
import Header from "./app/components/Header";
import Home from "./app/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminPanel from "./app/admin/AdminPanel";
import AddProducts from "./app/admin/AddProducts";
import Products from "./app/admin/Products";
import Orders from "./app/admin/Orders";
import Customers from "./app/admin/Customers";
import Dashboard from "./app/admin/Dashboard";
import LoginPage from "./app/LoginPage";
import RegisterPage from "./app/RegisterPage";
import AccountPage from "./app/Account/AccountPage";
import ProductDetailPage from "./app/components/ProductDetailPage";
import AddToCart from "./app/AddToCart";
import CheckoutPage from "./app/CheckoutPage";
import { Toaster } from "./components/ui/toaster";
import Address from "./app/Account/Address";
import LoginSecurity from "./app/Account/Login-Security";
import DeleteAccount from "./app/Account/DeleteAccount";
import UserOrders from "./app/Account/User-Orders";
import ContactUs from "./app/Account/ContactUs";

function AppContent() {
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin-panel")) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [location]);

  return (
    <>
      {visible && <Header />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ProductDetailPage />} />
        <Route path="/add-to-cart" element={<AddToCart />} />
        <Route path="/checkout-page" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-account" element={<AccountPage />}>
          <Route path="/my-account/addresses" element={<Address />} />
          <Route
            path="/my-account/login-security"
            element={<LoginSecurity />}
          />
          <Route
            path="/my-account/delete-account"
            element={<DeleteAccount />}
          />
          <Route path="/my-account/orders" element={<UserOrders />} />
          <Route path="/my-account/contact-us" element={<ContactUs />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-panel" element={<AdminPanel />}>
          <Route path="/admin-panel/add-product" element={<AddProducts />} />
          <Route path="/admin-panel/products" element={<Products />} />
          <Route path="/admin-panel/orders" element={<Orders />} />
          <Route path="/admin-panel/customers" element={<Customers />} />
          <Route path="/admin-panel" element={<Dashboard />} />
          <Route path="/admin-panel/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
