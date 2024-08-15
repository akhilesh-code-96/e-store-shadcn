import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@mui/material";
import { cartItems } from "./redux/reducers/checkoutReducers/cartReducer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const BuyNowSection = () => {
  const cartProducts = useSelector(cartItems);

  if (cartProducts.length > 0) {
    return (
      <div className="flex items-start md:p-[55px] p-0 mt-2">
        <div className="flex flex-col items-center justify-center w-full border-2 rounded-md">
          <h1 className="p-2 text-lg font-semibold md:text-xl">
            Process to checkout
          </h1>
          <Separator />
          <div className="flex flex-col justify-center p-2">
            {cartProducts.map((item, i) => (
              <p
                key={i}
                className="text-xs md:text-sm text-neutral-400"
              >{`${item.quantity} x ${item.title}`}</p>
            ))}
          </div>
          <Separator />
          <div className="flex justify-center w-full p-5 dark:bg-[#121518]">
            <Link to="/checkout-page">
              <Button variant="contained">Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default BuyNowSection;
