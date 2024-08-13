"use client";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Toggle from "./components/Toggle.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  fetchProducts,
  selectCategories,
  selectProducts,
  toggleCategory,
  selectRange,
  setRange,
  setInitialMaxPrice,
  setInitialMinPrice,
  minPrice,
  maxPrice,
} from "./redux/reducers/headerReducer.js";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider.jsx";
import { useToast } from "@/components/ui/use-toast.js";
import {
  addToCart,
  updateCartItemStatus,
} from "./redux/reducers/checkoutReducers/cartReducer.js";
import { itemStatus } from "./redux/reducers/checkoutReducers/cartReducer.js";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const [expand, setExpand] = React.useState(true);
  const newRange = useSelector(selectRange);
  const newMinPrice = useSelector(minPrice);
  const newMaxPrice = useSelector(maxPrice);
  const { toast } = useToast();
  const user = localStorage.getItem("user");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const shouldAdd = useSelector(itemStatus);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Handling the change in slider
  const handleValueChange = (newValue) => {
    dispatch(setRange(newValue));
  };

  const handleCartItems = (productId) => {
    if (!user) {
      navigate("/login");
    } else {
      setSelectedProductId(productId);
      dispatch(updateCartItemStatus(productId));
    }
  };

  // Calling minPrice and maxPrice functions for the slider.
  useEffect(() => {
    if (products.length > 0) {
      if (newMinPrice === null) {
        dispatch(setInitialMinPrice(products));
      }
      if (newMaxPrice === null) {
        dispatch(setInitialMaxPrice(products));
      }
    }
  }, [products]);

  // Watch for changes in itemCart state
  useEffect(() => {
    if (selectedProductId !== null) {
      if (shouldAdd) {
        dispatch(
          addToCart(
            {
              queryParams: `userId=${userId}&productId=${selectedProductId}`,
              userId: userId,
            },
            { dispatch }
          )
        );
        toast({
          description: "Item added to cart.",
        });
      } else {
        toast({
          description: "Item already added.",
        });
      }
      // Reset selectedProductId after handling
      setSelectedProductId(null);
    }
  }, [selectedProductId, shouldAdd, dispatch, userId, toast]);

  // Making api calls to fetch the products based on the query.
  useEffect(() => {
    const categoryQuery = categories.join(",");
    const rangeQuery = Math.floor(newRange / 84) + 1;
    console.log("Range", rangeQuery);
    if (newMinPrice !== null && newMaxPrice !== null && rangeQuery > 1) {
      try {
        dispatch(
          fetchProducts(`limit=9&category=${categoryQuery}&range=${rangeQuery}`)
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(fetchProducts(`limit=9&category=${categoryQuery}`));
    }
  }, [categories, dispatch, newRange]);

  return (
    <div className="min-h-screen pt-[50px] dark:bg-black flex flex-col md:flex-row items-center">
      {/* Filters Button for small screens */}
      <div className="flex items-center justify-center w-full py-2 border-2 md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            {/* <Button variant="outline">Filters</Button> */}
            <div className="text-xl font-semibold rounded-sm">Filters</div>
          </DrawerTrigger>
          <DrawerContent>
            <div className="w-full max-w-sm mx-auto">
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>
                  Set your filter preferences.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div onClick={() => setExpand(!expand)}>
                  <Toggle name={"Categories"} />
                </div>
                <div
                  style={{ display: expand ? "block" : "none" }}
                  className="py-2 pl-5"
                >
                  {["beauty", "fragrances", "furniture"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <div onClick={() => dispatch(toggleCategory(category))}>
                        <Checkbox id={category} />
                      </div>
                      <label
                        htmlFor={category}
                        className="text-sm font-medium leading-none cursor-pointer hover:text-primary text-neutral-400 peer-disabled:opacity-70"
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
                <Separator className="mt-2" />
                <div className="py-10 w-[200px]">
                  <h4 className="mb-2 text-md dark:text-neutral-300">
                    Price Range
                  </h4>
                  <div className="flex justify-between">
                    <p className="py-2 mb-2 text-sm font-light dark:text-neutral-300">
                      ₹{newRange > 0 ? newRange : newMinPrice}
                    </p>
                    <p className="py-2 mb-2 text-sm font-light dark:text-neutral-300">
                      ₹
                      {newMaxPrice < 1000
                        ? newMaxPrice
                        : `${Math.floor(newMaxPrice / 1000)}k`}
                    </p>
                  </div>
                  <Slider
                    value={[newRange]}
                    step={100}
                    onValueChange={handleValueChange}
                    min={newMinPrice}
                    max={newMaxPrice}
                  />
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Filter and sorting section for larger screens */}
      <div className="hidden md:w-[300px] md:p-5 md:flex md:flex-col md:sticky md:top-20 md:self-start">
        <div onClick={() => setExpand(!expand)}>
          <Toggle name={"Categories"} />
        </div>
        <div
          style={{ display: expand ? "block" : "none" }}
          className="py-2 pl-5"
        >
          {["beauty", "fragrances", "furniture"].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <div onClick={() => dispatch(toggleCategory(category))}>
                <Checkbox id={category} />
              </div>
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none cursor-pointer hover:text-primary text-neutral-400 peer-disabled:opacity-70"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            </div>
          ))}
        </div>
        <Separator className="mt-2" />
        <div className="py-10 w-[200px]">
          <h4 className="mb-2 text-md dark:text-neutral-300">Price Range</h4>
          <div className="flex justify-between">
            <p className="py-2 mb-2 text-sm font-light dark:text-neutral-300">
              ₹{newRange > 0 ? newRange : newMinPrice}
            </p>
            <p className="py-2 mb-2 text-sm font-light dark:text-neutral-300">
              ₹
              {newMaxPrice < 1000
                ? newMaxPrice
                : `${Math.floor(newMaxPrice / 1000)}k`}
            </p>
          </div>
          <Slider
            value={[newRange]}
            step={100}
            onValueChange={handleValueChange}
            min={newMinPrice}
            max={newMaxPrice}
          />
        </div>
      </div>

      {/* Product Display Section */}
      <div className="grid gap-6 p-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {products &&
          products.map((product, index) => (
            <Card
              key={index}
              className="w-full h-auto max-w-xs bg-white rounded-sm cursor-pointer border-neutral-700 dark:text-gray-900"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Link to={`/${product._id}`}>
                    <CardTitle className="text-sm md:text-base lg:text-xl hover:underline hover:text-blue-300 dark:hover:text-gray-500">
                      {product.title}
                    </CardTitle>
                  </Link>
                </div>
                <div className="text-xs font-semibold text-blue-400 md:text-sm lg:text-base dark:text-blue-300">
                  {product.brand}
                </div>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-[150px] sm:h-[200px] md:h-[250px]">
                <img
                  src={`${product.imageUrl}`}
                  alt="images"
                  className="object-contain w-full h-full bg-gray-300"
                />
              </CardContent>
              <CardFooter>
                <Button
                  variant="destructive"
                  onClick={() => handleCartItems(product._id)}
                  className="text-xs md:text-sm lg:text-base"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Home;
