import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "../style.css";
import { Separator } from "@/components/ui/separator";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Badge } from "@/components/ui/badge";
import {
  updateCartItemStatus,
  addToCart,
  itemStatus,
} from "../redux/reducers/checkoutReducers/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import P_Backdrop from "./Backdrop";
import { useToast } from "@/components/ui/use-toast";

const ProductDetailPage = () => {
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = window.localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState(false);
  const user = window.localStorage.getItem("user");
  const shouldAdd = useSelector(itemStatus);
  const { toast } = useToast();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (process) {
      if (shouldAdd) {
        dispatch(
          addToCart({
            queryParams: `userId=${userId}&productId=${id}`,
            userId,
          })
        );
        toast({
          description: "Item added to the cart",
        });
      } else {
        toast({
          description: "Item already added",
        });
      }
    }

    // setting the flag as false again.
    setProcess(false);
  }, [shouldAdd, id, userId, navigate, dispatch, process]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(false);
      try {
        const response = await axios.get(
          `${BASE_URL}/api/get-products?id=${id}`
        );
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
      setProcess(true); // setting the flag as true to enable the cart adding mechanism.
      setLoading(true); // to show the loading effect on the buy now button.

      // for updating the status whether the product needs to be added to cart or not.
      dispatch(updateCartItemStatus(productId));

      // will redirect to checkout-page after a certain delay just to show case the processing effect on the buy now since it will redirecting very quickly.
      setTimeout(() => {
        navigate("/checkout-page", { state: { productId: id } });
      }, 100);
    }
  };

  // handle cart item addition
  const handleCartItems = (productId) => {
    if (!user) {
      navigate("/login");
    } else {
      setProcess(true);
      dispatch(updateCartItemStatus(productId));
    }
  };

  return (
    <div className="min-h-screen pt-[55px] flex flex-col items-center">
      {product.length > 0 ? (
        product.map((prod) => (
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
                <Typography component="legend">{prod.rating}</Typography>
                <Rating
                  name="half-rating-read"
                  defaultValue={prod.rating.toFixed(1)}
                  precision={0.5}
                  readOnly
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
                    (prod.discountPercentage / 100) * prod.price * 84
                  ).toFixed(2)}
                </p>
              </div>
              <div className="flex space-x-1">
                <p className="pl-1 text-xs text-neutral-400">M.R.P:&nbsp;</p>
                <del>
                  <p className="text-xs font-light">
                    ₹{(prod.price * 84).toFixed(2)}
                  </p>
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
                  sx={{ textTransform: "none" }}
                  variant="outlined"
                  onClick={() => handleCartItems(prod._id)}
                >
                  Add to cart
                </Button>
                <Button
                  sx={{ textTransform: "none" }}
                  variant="contained"
                  onClick={() => handleBuyNow(prod._id)}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Buy Now"}
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <P_Backdrop />
      )}
    </div>
  );
};

export default ProductDetailPage;
