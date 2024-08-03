// ProductContext.js
import React, { createContext, useState, useContext } from "react";

// Create a Context
const ProductContext = createContext();

// Create a Provider Component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the Product Context
export const useProducts = () => useContext(ProductContext);
