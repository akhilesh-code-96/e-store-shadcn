import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "../style.css";
import { Separator } from "@/components/ui/separator";
import { Rate } from "antd";
import { Badge } from "@/components/ui/badge";
import {
  updateCartItemStatus,
  addToCart,
  itemStatus,
} from "../redux/reducers/checkoutReducers/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";

const ProductDetailPage = () => {
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = window.localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);

  const shouldAdd = useSelector(itemStatus);

  useEffect(() => {
    if (shouldAdd) {
      dispatch(
        addToCart({
          queryParams: `userId=${userId}&productId=${id}`,
          userId,
        })
      ).then(() => {
        navigate("/checkout-page", { state: { productId: id } });
      });
    }
  }, [shouldAdd, id, userId, navigate, dispatch]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/get-products?id=${id}`);
        setProduct(response.data.products);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuyNow = (productId) => {
    if (!userId) {
      navigate("/login");
      return;
    } else {
      navigate("/checkout-page", { state: { productId: id } });
    }
    dispatch(updateCartItemStatus(productId));
  };

  console.log("Should Add", shouldAdd);
  return (
    <div className="min-h-screen pt-[55px] flex flex-col items-center">
      {product.map((prod) => (
        <div key={prod._id} className="flex flex-col w-full p-10 md:flex-row">
          <div className="w-full p-10 md:w-1/2">
            <img
              src={prod.imageUrl}
              alt="product"
              className="object-cover transition border border-gray-700 rounded-lg shadow-lg dark:bg-neutral-900 hover:shadow-xl"
              width="500"
              height="500"
            />
          </div>
          <div className="flex flex-col items-start justify-center w-full md:w-1/2">
            <h1 className="text-3xl font-bold">{prod.title}</h1>
            <Separator className="mt-2" />
            <div className="flex space-x-2">
              <p className="p-1 text-sm font-bold dark:text-neutral-300">
                {prod.rating}
              </p>
              <Rate
                disabled
                allowHalf
                defaultValue={prod.rating}
                className="p-1 text-sm"
              />
            </div>
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
              <p className="text-2xl">
                ₹
                {(
                  prod.price * 84 -
                  (prod.discountPercentage / 100) * prod.price
                ).toFixed(2)}
              </p>
            </div>
            <div className="flex space-x-1">
              <p className="pl-1 text-xs text-neutral-400">M.R.P:&nbsp;</p>
              <del>
                <p className="text-xs font-light">₹{prod.price * 84}</p>
              </del>
            </div>
            <Separator className="mt-2" />
            <h3 className="mt-2 text-xl">About this Item</h3>
            <ul className="pt-2 pl-5 text-gray-400 list-disc">
              {prod.description
                .split(".")
                .filter(Boolean)
                .map((desc, i) => (
                  <li key={i}>{desc.trim()}.</li>
                ))}
            </ul>
            <div className="flex flex-row justify-between pt-5 space-x-2">
              <Button
                variant="outline"
                onClick={() => handleCartItems(prod._id)}
              >
                Add to cart
              </Button>
              <Button onClick={() => handleBuyNow(prod._id)} disabled={loading}>
                {loading ? "processing..." : "Buy Now"}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetailPage;
