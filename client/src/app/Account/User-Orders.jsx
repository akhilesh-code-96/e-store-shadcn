import React from "react";
import {
  allOrders,
  totalCounts,
  allPages,
} from "../redux/reducers/checkoutReducers/orderReducer";
import { getOrders } from "../redux/reducers/checkoutReducers/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowLeft } from "react-icons/md";
import { MdArrowRight } from "react-icons/md";
import "../style.css";

const UserOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(allOrders);
  const totalPages = useSelector(allPages);
  const totalCount = useSelector(totalCounts);
  const [page, setPage] = useState(1);
  const userId = window.localStorage.getItem("userId");
  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current.forEach((ref, index) => {
      if (index === page - 1) {
        ref.classList.add("text-primary");
        ref.classList.remove("text-muted-foreground");
      } else {
        ref.classList.remove("text-primary");
        ref.classList.add("text-muted-foreground");
      }
    });
  }, [page]);

  useEffect(() => {
    dispatch(getOrders(`userId=${userId}&page=${page}`));
  }, [dispatch, page]);

  useEffect(() => {
    const all_products = [];

    // Collect all product IDs
    orders.forEach((order) => {
      order.products.forEach((prod) => {
        all_products.push(prod.productId);
      });
    });
  });

  const selectPageHandler = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  const handleReoder = (id) => {
    navigate("/checkout-page", { state: { productId: id } });
  };

  // console.log(orders);

  return (
    <div className="justify-center w-full md:w-3/5">
      {orders.length > 0 ? (
        <div>
          <h1 className="px-4 mt-5 text-xl font-bold md:px-0 md:text-2xl">
            Your Orders
          </h1>
          <Separator />
          <div className="p-6 space-y-4 md:p-4">
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
                        <Link to={`/${product.productId._id}`}>
                          <h3 className="text-sm font-semibold cursor-pointer md:text-base hover:text-blue-500 hover:underline">
                            {product.productId.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-600 md:text-sm">
                          Quantity: {product.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-start justify-between mt-4 space-y-2 md:space-y-0 md:flex-row md:items-center">
                  <p className="text-base font-semibold md:text-lg">
                    Total: ₹{order.amount}
                  </p>
                  {order.products.map((product, i) => (
                    <button
                      key={i}
                      onClick={() => handleReoder(product.productId._id)}
                      className="px-3 py-2 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600 md:text-base md:px-4 md:py-2"
                    >
                      Re-order
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="relative flex mb-5">
            <div className="text-xs text-muted-foreground sm:ms-0 ms-5">
              Showing{" "}
              <strong>
                {page * 10 - 10 + 1}-
                {page === totalPages ? totalCount : page * 10}
              </strong>{" "}
              of <strong>{totalCount}</strong> products
            </div>
            <div className="absolute bottom-0 flex space-x-2 sm:right-1 right-10">
              <span
                className={page > 1 ? "cursor-pointer" : "pagination__disabled"}
                onClick={() => selectPageHandler(page - 1)}
              >
                <MdArrowLeft />
              </span>
              {[...Array(totalPages)].map((_, i) => (
                <span
                  key={i}
                  className="text-xs font-bold cursor-pointer text-muted-foreground hover:text-primary"
                  ref={(el) => (inputRef.current[i] = el)}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </span>
              ))}
              {
                <span
                  className={
                    page < totalPages
                      ? "cursor-pointer"
                      : "pagination__disabled"
                  }
                  onClick={() => selectPageHandler(page + 1)}
                >
                  <MdArrowRight />
                </span>
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <h1 className="mt-5 text-2xl font-bold">No orders to display</h1>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
