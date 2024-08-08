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
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { useEffect, useCallback } from "react";
import {
  updateProductQuantity,
  updatedProduct,
} from "./redux/reducers/headerReducer";
import { useSelector, useDispatch } from "react-redux";

export default function AddToCart() {
  const dispatch = useDispatch();
  const changedProduct = useSelector(updatedProduct);
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
      // Additional logic here, like updating UI or triggering another action
    }
  }, [changedProduct]);

  return (
    <div className="min-h-screen flex flex-col items-center pt-[70px] p-10">
      <Card className="w-3/4 border-none">
        <CardHeader>
          <CardTitle className="py-2">Shopping Cart</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            {cartProducts.length > 0 ? (
              <TableBody>
                {cartProducts.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt="Product image"
                        className="object-cover rounded-md aspect-square"
                        height="64"
                        src={item.imageUrl}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="flex mt-4">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                        className="flex items-center justify-center w-8 h-8 text-gray-700 bg-gray-300 rounded-full"
                      >
                        -
                      </button>
                      <span className="px-4 py-2">{item.quantity || 1}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, 1)}
                        className="flex items-center justify-center w-8 h-8 text-gray-700 bg-gray-300 rounded-full"
                      >
                        +
                      </button>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      ₹{(item.price * 84).toFixed(2)}
                    </TableCell>
                    <TableCell className="relative">
                      <Trash className="absolute top-9 left-7" size={20} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan="5" className="py-4 text-center">
                    <h1 className="text-xl">No Items to display</h1>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
