"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import {
  updateProductQuantity,
  updatedProduct,
  updateDeletedCartCount,
} from "./redux/reducers/headerReducer";
import { useSelector, useDispatch } from "react-redux";
import BuyNowSection from "./BuyNowSection";

export default function AddToCart() {
  const dispatch = useDispatch();
  const changedProduct = useSelector(updatedProduct);
  const [colSpan, setColSpan] = useState(4); // Default to mobile colSpan
  // Function to safely load cart products from localStorage
  const loadCartProducts = () => {
    try {
      const storedData = localStorage.getItem("cartProducts");
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Failed to parse cartProducts from localStorage", error);
      return [];
    }
  };

  // Get cart products with error handling
  const cartProducts = loadCartProducts();

  const handleQuantityChange = (id, value) => {
    const productIndex = cartProducts.findIndex((item) => item._id === id);
    if (productIndex === -1) return; // Product not found

    const product = cartProducts[productIndex];

    // Check for quantity constraints
    if (value < 0 && product.quantity <= 1) return; // Prevent decrement below 1
    if (value > 0 && product.quantity >= product.stock) return; // Prevent increment above stock

    // Update quantity in local cartProducts
    const updatedCartProducts = [...cartProducts];
    updatedCartProducts[productIndex].quantity += value;

    // Dispatch action to update product quantity
    dispatch(updateProductQuantity(`id=${id}&value=${value}`));

    // Update local storage
    localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
  };

  useEffect(() => {
    if (Object.keys(changedProduct).length > 0) {
      const productIndex = cartProducts.findIndex(
        (item) => item._id === changedProduct._id
      );
      if (productIndex !== -1) {
        // Create a copy of cartProducts to avoid direct mutation
        const updatedCartProducts = [...cartProducts];
        const product = updatedCartProducts[productIndex];

        // Update the product quantity
        product.quantity = product.stock - changedProduct.stock;

        // Update local storage
        localStorage.setItem(
          "cartProducts",
          JSON.stringify(updatedCartProducts)
        );
      }
    }
  }, [changedProduct, cartProducts]);

  useEffect(() => {
    if (changedProduct) {
      console.log("Product quantity updated:", changedProduct);
    }
  }, [changedProduct]);

  useEffect(() => {
    const updateColSpan = () => {
      setColSpan(window.innerWidth >= 768 ? 4 : 2);
    };

    updateColSpan(); // Call on initial render
    window.addEventListener("resize", updateColSpan); // Listen for resize events

    return () => {
      window.removeEventListener("resize", updateColSpan); // Clean up listener
    };
  }, []);

  const handleDeleteProduct = (id, quantity) => {
    const value = "delete";
    dispatch(
      updateProductQuantity(`id=${id}&value=${value}&quantity=${quantity}`)
    );
    const productIndex = cartProducts.findIndex((item) => item._id === id);
    if (productIndex !== -1) {
      const updatedCartProducts = [...cartProducts];
      updatedCartProducts.splice(productIndex, 1);

      dispatch(updateDeletedCartCount());
      // If the array is empty, set it as an empty array in localStorage
      localStorage.setItem(
        "cartProducts",
        JSON.stringify(updatedCartProducts.length ? updatedCartProducts : [])
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start pt-[70px] p-4">
      <Card className="w-full border-none md:w-3/4">
        <CardHeader>
          <CardTitle className="py-2 text-lg md:text-xl">
            Shopping Cart
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <Table className="relative w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[50px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead className="text-sm sm:text-base">Name</TableHead>
                <TableHead className="text-sm sm:text-base">Qty</TableHead>
                <TableHead className="hidden text-sm md:table-cell sm:text-base">
                  Price
                </TableHead>
                <TableHead className="text-sm sm:text-base">
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            {cartProducts.length > 0 ? (
              <>
                <TableBody>
                  {cartProducts.map((item, i) => (
                    <TableRow key={i} className="text-xs sm:text-sm">
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt="Product image"
                          className="object-cover rounded-md"
                          height="48"
                          src={item.imageUrl}
                          width="48"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.title}
                      </TableCell>
                      <TableCell className="flex items-center mt-2 md:mt-4">
                        <button
                          onClick={() => handleQuantityChange(item._id, -1)}
                          className="flex items-center justify-center w-6 h-6 text-gray-700 bg-gray-300 rounded-full md:w-8 md:h-8"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-sm md:px-4 md:py-2 md:text-base">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item._id, 1)}
                          className="flex items-center justify-center w-6 h-6 text-gray-700 bg-gray-300 rounded-full md:w-8 md:h-8"
                        >
                          +
                        </button>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        ₹{(item.price * 84).toFixed(2)}
                      </TableCell>
                      <TableCell className="relative">
                        <Trash
                          className="absolute top-7 left-5 md:top-9 md:left-7"
                          size={16}
                          onClick={() =>
                            handleDeleteProduct(item._id, item.quantity)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="w-full p-4">
                  <TableRow>
                    <TableCell
                      colSpan={colSpan}
                      className="font-bold text-right"
                    >
                      Subtotal:
                    </TableCell>
                    <TableCell className="font-bold">
                      ₹
                      {cartProducts
                        .reduce((acc, curr) => {
                          return acc + curr.quantity * curr.price * 84;
                        }, 0)
                        .toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan="5"
                    className="py-4 text-sm text-center md:text-base"
                  >
                    <h1 className="text-lg">No Items to display</h1>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>
      <div className="px-4 mt-4 md:w-[500px] w-full md:mt-0 md:ml-4">
        <BuyNowSection />
      </div>
    </div>
  );
}
