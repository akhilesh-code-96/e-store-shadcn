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
  DrawerContent,
  DrawerDescription,
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
import Carousel_ from "./components/Carousel.jsx";
import { Typography } from "@mui/material";
import { clearFilters } from "./redux/reducers/headerReducer.js";
import SkeletonCard from "./components/SkeletonCard.jsx";
import P_Backdrop from "./components/Backdrop.jsx";

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
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

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
    if (newMinPrice !== null && newMaxPrice !== null && rangeQuery > 1) {
      try {
        dispatch(
          fetchProducts(
            `limit=10&category=${categoryQuery}&range=${rangeQuery}`
          ).finally(() => setLoading(false))
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(fetchProducts(`limit=10&category=${categoryQuery}`)).finally(
        () => setLoading(false)
      );
    }
  }, [categories, dispatch, newRange]);

  // handle clear search
  const clearSearch = () => {
    setOpen(true);
    dispatch(fetchProducts(`limit=10`)).finally(() => setOpen(false));
  };

  const clearFiter = () => {
    dispatch(clearFilters());
  };

  // console.log("category", categories);

  return (
    <div className="min-h-screen pt-[55px] flex flex-col md:flex-row items-center">
      {/* Filters Button for small screens */}
      <div className="flex items-center justify-center w-full py-2 border-b-[1px] md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            {/* <Button variant="outline">Filters</Button> */}
            <div className="w-full text-xl font-semibold text-center rounded-sm">
              Filters
            </div>
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
                        <Checkbox
                          id={category}
                          checked={categories.includes(category)}
                        />
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
                <Separator className="mt-2" />
                <div className="py-2">
                  <Button
                    onClick={clearFiter}
                    variant="destructive"
                    className="mt-2 mb-2 w-[130px] shadow-sm"
                  >
                    Clear Filter
                  </Button>
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
                <Checkbox
                  id={category}
                  checked={categories.includes(category)}
                />
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
              <Typography>₹{newRange > 0 ? newRange : newMinPrice}</Typography>
            </p>
            <p className="py-2 mb-2 text-sm font-light dark:text-neutral-300">
              <Typography component="legend">
                ₹
                {newMaxPrice < 1000
                  ? newMaxPrice
                  : `${Math.floor(newMaxPrice / 1000)}k`}
              </Typography>
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
        <Separator className="mt-2" />
        <div className="py-2">
          <Button
            onClick={clearFiter}
            variant="destructive"
            className="mt-2 mb-2 w-[130px] shadow-sm rounded-sm"
          >
            Clear Filter
          </Button>
        </div>
      </div>

      {/* Product Display Section */}
      {loading ? (
        <div className="relative flex flex-col">
          <Carousel_ />
          <div className="mt-[-120px] grid grid-cols-2 gap-4 sm:gap-0 p-5 md:grid-cols-2 lg:grid-cols-3 z-20">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      ) : products.length > 0 ? (
        <div className="relative flex flex-col">
          <Carousel_ />
          <div className="mt-[-120px] grid grid-cols-2 gap-4 sm:gap-0 p-5 md:grid-cols-2 lg:grid-cols-3 z-20">
            {products.map((product, index) => (
              <Card
                key={index}
                className="flex flex-col justify-between h-auto max-w-xs mt-0 dark:bg-[#1e1e1e] rounded-sm shadow-lg cursor-pointer sm:mt-5 sm:w-11/12"
              >
                <CardHeader className="dark:bg-[#121212]">
                  <Link to={`/${product._id}`}>
                    <CardTitle className="text-sm md:text-base lg:text-xl hover:underline hover:text-blue-300 dark:hover:text-gray-400">
                      {product.title}
                    </CardTitle>
                  </Link>
                  <div className="text-xs font-semibold text-blue-400 md:text-sm lg:text-base dark:text-blue-300">
                    {product.brand}
                  </div>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-[150px] sm:h-[200px] md:h-[250px]">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="object-cover w-full h-full"
                  />
                </CardContent>
                <CardFooter className="bg-[#0f171f] py-4">
                  <div className="flex flex-col items-center justify-between text-lg text-white">
                    <Button
                      onClick={() => handleCartItems(product._id)}
                      className="text-xs text-white bg-[#a578fd] md:text-sm lg:text-base hover:bg-[#af8cf7] rounded-sm shadow-md"
                    >
                      Add to cart
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full min-h-screen">
          {!open && (
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
                404
              </h1>
              <p className="mt-2 text-xl font-semibold text-gray-600 dark:text-gray-400">
                No products found!
              </p>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                Sorry, we couldn't find any products matching your search
                criteria.
              </p>
              <div className="mt-6">
                <Button
                  onClick={clearSearch}
                  className="px-6 py-3 text-lg font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Clear Search
                </Button>
              </div>
            </div>
          )}

          {/* Backdrop */}
          {open && <P_Backdrop />}
        </div>
      )}
    </div>
  );
};

export default Home;
