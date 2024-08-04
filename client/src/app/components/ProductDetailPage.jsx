import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "../style.css";
import { Separator } from "@/components/ui/separator";
import { Rate } from "antd";
import { FaRupeeSign } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

const ProductDetailPage = () => {
  const [product, setProduct] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`/api/get-products?id=${id}`);
        const data = response.data.products;
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, []);

  console.log(product);

  return (
    <div className="min-h-screen pt-[55px] flex flex-col items-center">
      {product.length > 0 &&
        product.map((prod, i) => (
          <div className="flex flex-col w-full p-10 md:flex-row">
            <div className="w-1/2 p-10">
              <img
                src={prod.imageUrl}
                alt="product image"
                width="500"
                height="500"
                className="object-cover dark:bg-neutral-900 rounded-lg shadow-lg transition border border-gray-700 hover:shadow-xl hover:dark:shadow-[0_4px_30px_-1px_rgba(255,255,255,0.2),_0_2px_4px_-1px_rgba(255,255,255,0.1)]"
              />
            </div>
            <div className="flex flex-col items-start justify-center w-1/2">
              <h1 className="text-3xl font-bold">{prod.title}</h1>
              <Separator className="mt-2" />
              {/* Product Rating */}
              <div className="flex space-x-2">
                <p className="p-1 text-sm font-bold dark:text-neutral-300">
                  {prod.rating}
                </p>
                <Rate
                  disabled
                  allowHalf
                  defaultValue={prod.rating}
                  className="p-1 mt-[-1px] text-sm"
                />
              </div>
              {/* Discounted Pice */}
              <div className="py-2">
                <Badge
                  variant="destructive"
                  className="p-[4px] px-2 text-xs rounded-md"
                >
                  Limited time Deal
                </Badge>
              </div>
              <div className="flex space-x-2">
                <p className="text-2xl font-light text-green-500">
                  {prod.discountPercentage}%
                </p>
                <div className="flex">
                  <FaRupeeSign size={12} />
                  <p className="text-2xl">
                    {(
                      prod.price * 84 -
                      (prod.discountPercentage / 100) * prod.price
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
              {/* Actual Product Price */}
              <div className="flex space-x-1">
                <p className="pl-1 text-xs text-neutral-400">M.R.P:&nbsp;</p>
                <div className="flex items-center space-x-1">
                  <FaRupeeSign size={10} />
                </div>
                <del>
                  <p className="text-xs font-light">{prod.price * 84}</p>
                </del>
              </div>
              <div>
                <Separator className="mt-2" />
                <h3 className="mt-2 text-xl">About this Item</h3>
                <ul className="pt-2 pl-5 text-gray-400 list-disc">
                  {prod.description
                    .split(".")
                    .filter((desc) => desc.trim() !== "")
                    .map((desc, i) => (
                      <li key={i}>{desc.trim() + "."}</li>
                    ))}
                </ul>
              </div>
              <div className="flex flex-col justify-between pt-5 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                <Button variant="outline">Add to cart</Button>
                <Button>Buy now</Button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductDetailPage;
