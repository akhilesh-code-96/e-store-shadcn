import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cartItems } from "./redux/reducers/checkoutReducers/cartReducer";
import { useSelector } from "react-redux";

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
                className="text-xs md:text-sm"
              >{`${item.quantity} x ${item.title}`}</p>
            ))}
          </div>
          <Separator />
          <div className="p-5">
            <Button className="text-xs font-bold w-30 md:text-xs h-7 md:w-30">
              Go to checkout page
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default BuyNowSection;
