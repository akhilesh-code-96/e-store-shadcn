import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./style.css";

export default function LoginPage() {
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
              <Input id="password" type="password" required />
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
      </div>
    </div>
  );
}
