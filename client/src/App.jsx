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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
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
