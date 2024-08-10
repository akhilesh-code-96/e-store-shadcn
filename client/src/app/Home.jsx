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
import { MdFavoriteBorder } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Toggle from "./components/Toggle.jsx";
import { useSelector, useDispatch } from "react-redux";
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
} from "./redux/reducers/cartReducer.js";
import { itemStatus } from "./redux/reducers/cartReducer.js";

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

  const handleCartItems = (userId, productId) => {
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
        dispatch(addToCart(`userId=${userId}&productId=${selectedProductId}`));
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
    <div className="min-h-screen pt-[50px] dark:bg-black flex flex-col md:flex-row items-start md:items-center">
      {/* Filter and sorting section */}
      <div className="w-full md:w-[300px] p-5 flex flex-col md:sticky md:top-20 md:self-start">
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
        {/* Price Range */}
        <div className="py-10 w-[200px]">
          <h4 className="mb-2 text-md dark:text-neutral-300">Price Range</h4>
          {/* Slider */}
          <div className="flex justify-between">
            <p className="py-2 mb-2 text-sm font-light dark:text-neutral-300">
              ₹{newRange > 0 ? newRange : newMinPrice}
            </p>
            <p className="py-2 mb-2 text-sm font-light dark:text-neutral-300">
              ₹{newMaxPrice}
            </p>
          </div>
          {/* Price range Selector */}
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
      <div className="flex self-start h-screen">
        <Separator orientation="vertical" className="w-[1px] h-screen" />
      </div>
      <div className="grid grid-cols-1 gap-2 p-5 ms-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {products &&
          products.map((product, index) => (
            <Card
              key={index}
              className="w-full h-auto max-w-xs cursor-pointer border-neutral-700 dark:bg-black"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Link to={`/${product._id}`}>
                    <CardTitle className="hover:underline hover:text-blue-300">
                      {product.title}
                    </CardTitle>
                  </Link>
                  <MdFavoriteBorder />
                </div>
                <div>{product.brand}</div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={`${product.imageUrl}`}
                  alt="images"
                  className="object-contain w-full h-auto"
                />
              </CardContent>
              <CardFooter>
                {/* Add to cart button */}
                <Button
                  variant="outline"
                  onClick={() => handleCartItems(userId, product._id)}
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
