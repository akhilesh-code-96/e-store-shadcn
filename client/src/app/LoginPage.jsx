"use client";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { getCartProducts } from "./redux/reducers/checkoutReducers/cartReducer";
import { useDispatch } from "react-redux";
import "./style.css";

export default function LoginPage() {
  const [transitionClass, setTransitionClass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionClass("transition");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const queryParams = new URLSearchParams(data).toString();
      const response = await axios.get(`/api/login-user?${queryParams}`);
      const user = response.data.user;
      if (user) {
        window.localStorage.setItem("user", user.firstname);
        window.localStorage.setItem("userId", user._id);
        window.localStorage.setItem("role", user.role);
        dispatch(getCartProducts(`userId=${userId}`));
      } else {
        throw new Error("Password or email incorrect. Please try again!");
      }
      navigate("/");
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Password or email incorrect. Please try again!",
      });
      console.error(error);
    }
  };

  return (
    <div
      className={`w-full pt-[55px] lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] ${transitionClass}`}
    >
      <div className="hidden bg-muted lg:block z-[-10] login__box-2">
        <img
          src="https://images.pexels.com/photos/7007174/pexels-photo-7007174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Image"
          width="1920"
          height="1080"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex items-center justify-center py-12 login__box-1">
        <form onSubmit={handleSubmit}>
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="inline-block ml-auto text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-sm text-center">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
