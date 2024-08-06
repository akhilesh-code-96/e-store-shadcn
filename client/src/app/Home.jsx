import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import axios from "axios";
import { MdFavoriteBorder } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Toggle from "./components/Toggle.jsx";
import { useSelector, useDispatch } from "react-redux";
import { actions, headerSelector } from "./redux/reducers/headerReducer.js";

const Home = () => {
  const products = useSelector(headerSelector);
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const [category, setCategory] = useState([]);

  async function getProducts() {
    const categories = category.join(",");
    try {
      const response = await axios.get(
        `/api/get-products?limit=9&category=${categories}`
      );
      const data = response.data.products;
      dispatch(actions.setProducts(data));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, [category]);

  console.log(category);

  return (
    <div className="min-h-screen pt-[50px] dark:bg-black flex flex-col md:flex-row items-start md:items-center">
      {/* Filter and sorting section */}
      <div className="w-full md:w-[300px] p-5 flex flex-col md:sticky md:top-20 md:self-start">
        <div onClick={() => setExpand(!expand)}>
          <Toggle name={"Category"} />
        </div>
        <div
          style={{ display: expand ? "block" : "none" }}
          className="py-2 pl-5"
        >
          <div className="flex items-center space-x-2">
            <div
              onClick={() =>
                setCategory((prev) => {
                  // Check if "beauty" is already in the array
                  if (prev.includes("beauty")) {
                    // If it is, remove it
                    return prev.filter((item) => item !== "beauty");
                  } else {
                    // If it is not, add it
                    return [...prev, "beauty"];
                  }
                })
              }
            >
              <Checkbox id="beauty" />
            </div>
            <label
              htmlFor="beauty"
              className="text-sm font-medium leading-none cursor-pointer hover:text-primary text-neutral-400 peer-disabled:opacity-70"
            >
              Beauty
            </label>
          </div>
          <div className="flex items-center py-2 space-x-2">
            <div
              onClick={() =>
                setCategory((prev) => {
                  // Check if "fragrances" is already in the array
                  if (prev.includes("fragrances")) {
                    // If it is, remove it
                    return prev.filter((item) => item !== "fragrances");
                  } else {
                    // If it is not, add it
                    return [...prev, "fragrances"];
                  }
                })
              }
            >
              <Checkbox id="fragrances" />
            </div>
            <label
              htmlFor="fragrances"
              className="text-sm font-medium leading-none cursor-pointer hover:text-primary text-neutral-400 peer-disabled:opacity-70"
            >
              Fragrances
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <div
              onClick={() =>
                setCategory((prev) => {
                  // Check if "fruniture" is already in the array
                  if (prev.includes("furniture")) {
                    // If it is, remove it
                    return prev.filter((item) => item !== "furniture");
                  } else {
                    // If it is not, add it
                    return [...prev, "furniture"];
                  }
                })
              }
            >
              <Checkbox id="furniture" />
            </div>
            <label
              htmlFor="furniture"
              className="text-sm font-medium leading-none cursor-pointer hover:text-primary text-neutral-400 peer-disabled:opacity-70"
            >
              Furniture
            </label>
          </div>
        </div>
        <div className="py-10 w-[200px]">
          <Slider defaultValue={[33]} max={100} step={1} />
        </div>
      </div>
      {/* Product Display Section */}
      <div className="grid grid-cols-1 gap-4 p-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
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
              <CardFooter className="flex justify-between">
                <Button variant="outline">Add to Cart</Button>
                <Button>Buy Now</Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Home;
