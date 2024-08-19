import React, { useEffect, useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./style.css";

const RegisterPage = () => {
  const [transitionClass, setTransitionClass] = useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useLayoutEffect(() => {
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
      await axios.post(`${BASE_URL}/api/register`, data, {
        headers: { "Content-Type": "application/json" },
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`w-full pt-[55px] lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] ${transitionClass}`}
    >
      <div className="flex items-center justify-center py-12 register__box-1">
        <form onSubmit={handleSubmit}>
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Register</h1>
              <p className="text-balance text-muted-foreground">
                Enter your details below to register yourself
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  name="firstname"
                  placeholder="Max"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  name="lastname"
                  placeholder="Robinson"
                  required
                />
              </div>
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
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
              {/* <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button> */}
            </div>
            <div className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="hidden bg-muted lg:block z-[-10] register__box-2">
        <img
          src="https://images.pexels.com/photos/7007174/pexels-photo-7007174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Image"
          width="1920"
          height="1080"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
