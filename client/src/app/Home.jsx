import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Toggle from "./components/Toggle.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectCategories,
  selectProducts,
  toggleCategory,
} from "./redux/reducers/headerReducer.js";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const [expand, setExpand] = React.useState(false);

  useEffect(() => {
    const categoryQuery = categories.join(",");
    try {
      dispatch(fetchProducts(`limit=9&category=${categoryQuery}`));
    } catch (error) {
      console.error(error);
    }
  }, [categories, dispatch]);

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
