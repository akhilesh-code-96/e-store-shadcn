"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartItems } from "./redux/reducers/checkoutReducers/cartReducer";
import {
  getCartProducts,
  updateProductQantity,
  deleteCartProduct,
} from "./redux/reducers/checkoutReducers/cartReducer";
import BuyNowSection from "./BuyNowSection";

export default function AddToCart() {
  const dispatch = useDispatch();
  const cartProducts = useSelector(cartItems);
  const [colSpan, setColSpan] = useState(4); // Default to mobile colSpan
  const userId = window.localStorage.getItem("userId");
  const [checkDelete, setCheckDelete] = useState(false);

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

  useEffect(() => {
    dispatch(getCartProducts(`userId=${userId}`));
  }, [dispatch, checkDelete]);

  const handleQuantityChange = (productId, value) => {
    dispatch(
      updateProductQantity(
        `userId=${userId}&productId=${productId}&value=${value}`
      )
    );
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteCartProduct(`productId=${productId}`));
    setCheckDelete((prev) => !prev);
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
          <Table className="relative w-full border-[1px]">
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
                          onClick={() =>
                            handleQuantityChange(item.productId, -1)
                          }
                          className="flex items-center justify-center w-6 h-6 text-gray-700 bg-gray-300 rounded-full md:w-8 md:h-8"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-sm md:px-4 md:py-2 md:text-base">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.productId, 1)
                          }
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
                          className="absolute cursor-pointer top-7 left-5 md:top-9 md:left-7"
                          size={16}
                          onClick={() => handleDeleteProduct(item._id)}
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
