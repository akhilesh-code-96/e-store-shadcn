import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/reducers/headerReducer";
import { selectProducts } from "./redux/reducers/headerReducer";
import { getAddresses } from "./redux/reducers/accountReducers/addressReducer";
import { allAddresses } from "./redux/reducers/accountReducers/addressReducer";
import { placeOrder } from "./redux/reducers/checkoutReducers/orderReducer"; // Import your placeOrder action
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@mui/material";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cartItems } from "./redux/reducers/checkoutReducers/cartReducer";
import { emptyCart } from "./redux/reducers/checkoutReducers/cartReducer";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getOrders } from "./redux/reducers/checkoutReducers/orderReducer";
import { allOrders } from "./redux/reducers/checkoutReducers/orderReducer";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(selectProducts);
  const orders = useSelector(allOrders);
  const cartProducts = useSelector(cartItems);
  const addresses = useSelector(allAddresses);
  const userId = window.localStorage.getItem("userId");
  const { productId, orderId } = location.state || {};
  const [selectedAddress, setSelectedAddress] = useState("");
  const [payment, setPayment] = useState("cash");
  const [productsToDisplay, setProductsToDisplay] = useState([]);

  // Calculate total amount
  const totalAmount = productsToDisplay
    .reduce(
      (total, prod) =>
        total +
        (prod.price - (prod.price * prod.discountPercentage) / 100) * 84 +
        prod.price * 0.02 * 84 +
        (prod.quantity || 1),
      0
    )
    .toFixed(2);

  // Calculate delivery date (2 days ahead)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const formattedDeliveryDate = deliveryDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  const handleAddressChange = (value) => {
    setSelectedAddress(JSON.stringify(addresses[value.split("-")[1] - 1])); // Use index to find the correct address
  };

  const handlePaymentChange = (value) => {
    setPayment(value);
  };

  const handlePlaceOrder = () => {
    const productIds = JSON.stringify(
      productsToDisplay.map((product) =>
        !productId ? product.productId : product._id
      )
    );
    const quantities = JSON.stringify(
      productsToDisplay.map((product) => product.quantity)
    );

    const queryParams = new URLSearchParams({
      userId,
      productIds,
      quantities,
      amount: totalAmount,
      deliveryDate: formattedDeliveryDate,
      address: selectedAddress,
      paymentMethod: payment,
    }).toString();

    dispatch(placeOrder(queryParams));
    dispatch(emptyCart(`userId=${userId}`));

    // todo // add a order placed ui.
    setTimeout(() => {
      navigate("/my-account/orders");
    }, 2000);
  };

  useEffect(() => {
    if (orders.length > 0) {
      const prods = [];
      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].products.length; j++) {
          prods.push(orders[i].products[j].productId);
        }
      }
      setProductsToDisplay(prods);
    }
  }, [orders]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProducts(`id=${productId}`));
    } else if (orderId) {
      dispatch(getOrders(`id=${orderId}`));
    }
    dispatch(getAddresses(`id=${userId}`));
  }, [dispatch, productId, orderId, userId]);

  useEffect(() => {
    if (productId) {
      setProductsToDisplay(product);
    } else if (orderId) {
      console.log("order id", orderId);
    } else {
      setProductsToDisplay(cartProducts);
    }

    if (addresses.length > 0) {
      setSelectedAddress(JSON.stringify(addresses[0]));
    }
  }, [productId, orderId, product, cartProducts, addresses]);

  console.log("Checkout page orders", orders);
  console.log("Products to display", productsToDisplay);

  return (
    <div className="min-h-screen pt-[55px] p-5 flex flex-col md:flex-row items-start justify-center w-full">
      <div className="w-full px-5 mt-5 md:w-4/6 md:mt-10">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="p-5 bg-neutral-900 rounded-sm border-[1px]"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Delivery Address</AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                defaultValue="address-1"
                onValueChange={handleAddressChange}
              >
                {addresses.length > 0 ? (
                  addresses.map((add, i) => (
                    <div key={i} className="flex items-center mb-2 space-x-2">
                      <RadioGroupItem
                        value={`address-${i + 1}`}
                        id={`r${i + 1}`}
                      />
                      <Label htmlFor={`r${i + 1}`}>
                        {add.houseNo}, {add.streetAddress},{" "}
                        {add.city.toUpperCase()}, {add.state.toUpperCase()},{" "}
                        {add.pincode}, {add.country}
                      </Label>
                    </div>
                  ))
                ) : (
                  <h3 className="font-semibold text-md">
                    Click{" "}
                    <Link to="/my-account/addresses" className="text-blue-500">
                      here
                    </Link>{" "}
                    to add a delivery address
                  </h3>
                )}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Payment Method</AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                defaultValue="cash"
                onValueChange={handlePaymentChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="r1" />
                  <Label htmlFor="r1">Debit/Credit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="r2" />
                  <Label htmlFor="r2">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Order Summary</AccordionTrigger>
            <AccordionContent>
              {productsToDisplay.length > 0 &&
                productsToDisplay.map((prod, i) => (
                  <div
                    key={i}
                    className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2"
                  >
                    <img
                      src={prod.imageUrl}
                      alt="getProducts"
                      className="w-full md:w-[100px] h-auto"
                    />
                    <div>
                      <h3 className="mb-2 text-xl">{prod.title}</h3>
                      <div className="flex space-x-2">
                        <del className="mt-[3px] font-light text-neutral-700">
                          ₹ {(prod.price * 84).toFixed(2)}
                        </del>
                        <p className="text-[18px] font-bold">
                          ₹
                          {(
                            (prod.price -
                              (prod.price * prod.discountPercentage) / 100) *
                            84
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              <Dialog>
                <DialogTrigger>
                  <Button
                    variant="contained"
                    onClick={handlePlaceOrder}
                    sx={{
                      width: {
                        xs: "100%", // Adjust for small screens
                        md: "150px", // Fixed width for medium and larger screens
                      },
                      padding: "8px 16px", // Equivalent to px-4 py-2
                      fontSize: "12px", // Adjust text size to be smaller
                      mt: 2, // Equivalent to mt-4
                      borderRadius: "8px", // Equivalent to rounded-lg
                      marginInlineStart: {
                        xs: 0, // Margin start for small screens
                        md: "16px", // Margin start for medium and larger screens
                      },
                    }}
                  >
                    Place your order
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-3/4 dark:bg-white dark:text-gray-950 sm:w-full">
                  <DialogHeader>
                    <DialogTitle>Congratulations!!</DialogTitle>
                    <DialogDescription className="dark:text-neutral-600">
                      Your order has been placed successfully.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="relative w-full md:w-[300px] h-auto p-4 mt-5 md:mt-10 md:ms-5 border-[1px] rounded-sm shadow-md">
        <h1 className="mb-4 text-2xl">Price Details</h1>
        {productsToDisplay.length > 0 &&
          productsToDisplay.map((prod, i) => (
            <div key={i} className="flex justify-between mb-2">
              <h3>
                Price: ₹{" "}
                {(
                  (prod.price - (prod.price * prod.discountPercentage) / 100) *
                  84
                ).toFixed(2)}
              </h3>
              <h3>Tax: ₹ {(prod.price * 0.02 * 84).toFixed(2)}</h3>
            </div>
          ))}

        <div className="flex justify-between pt-4 mt-4 border-t-2 border-gray-300">
          <h3 className="font-bold">Total Payable Amount</h3>
          <h3 className="font-bold">₹ {totalAmount}</h3>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
