import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./style.css";

const RegisterPage = () => {
  const [transitionClass, setTransitionClass] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionClass("transition");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`w-full pt-[55px] lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] ${transitionClass}`}
    >
      <div className="flex items-center justify-center py-12 register__box-1">
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
              <Input id="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button>
          </div>
          <div className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
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
