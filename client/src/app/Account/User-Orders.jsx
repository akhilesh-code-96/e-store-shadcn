import React from "react";
import { allOrders } from "../redux/reducers/checkoutReducers/orderReducer";
import { getOrders } from "../redux/reducers/checkoutReducers/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(allOrders);
  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    dispatch(getOrders(`userId=${userId}`));
  }, [dispatch]);

  useEffect(() => {
    const all_products = [];

    // Collect all product IDs
    orders.forEach((order) => {
      order.products.forEach((prod) => {
        all_products.push(prod.productId);
      });
    });
  });

  return (
    <div className="justify-center w-full md:w-3/5">
      <h1 className="mt-5 text-xl font-bold md:text-2xl">Your Orders</h1>
      <Separator />
      <div className="p-2 space-y-4 md:p-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="p-2 space-y-4 bg-white border rounded-lg shadow-md dark:text-neutral-900 md:p-4"
          >
            <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
              <h2 className="text-sm font-semibold md:text-lg">
                Order #{order._id}
              </h2>
              <p className="text-xs text-gray-600 md:text-sm">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-2">
              {order.products.map((product, prodIndex) => (
                <div
                  key={prodIndex}
                  className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4"
                >
                  <img
                    src={product.productId.imageUrl}
                    alt={product.productId.title}
                    className="w-full md:w-[100px] h-auto"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold md:text-base">
                      {product.productId.title}
                    </h3>
                    <p className="text-xs text-gray-600 md:text-sm">
                      Quantity: {product.quantity}
                    </p>
                    <p className="text-xs text-gray-600 md:text-sm">
                      Price: ₹{(product.productId.price * 84).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start justify-between mt-4 space-y-2 md:space-y-0 md:flex-row md:items-center">
              <p className="text-base font-semibold md:text-lg">
                Total: ₹{order.amount}
              </p>
              <Link to="/checkout-page">
                <button className="px-3 py-2 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600 md:text-base md:px-4 md:py-2">
                  Re-order
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
