import React from "react";
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
import { useProducts } from "./utils/ProductContext.jsx";

const Home = () => {
  const { products, setProducts } = useProducts();

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get("/api/get-products?limit=9");
        const data = response.data.products;
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
  }, []);

  return (
    <div className="min-h-screen pt-[50px] dark:bg-black flex flex-col items-center">
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
