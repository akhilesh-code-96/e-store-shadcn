import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AccountPage = () => {
  const user = window.localStorage.getItem("user");
  return (
    <div className="min-h-screen pt-[55px] flex flex-col p-10 items-center">
      <section id="Header" className="w-4/6 mt-10">
        <div className="flex justify-start">
          <h1 className="text-3xl font-bold">Welcome, {user}</h1>
        </div>
      </section>
      <section id="details" className="mt-5">
        <div className="grid grid-cols-1 gap-4 p-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          <Card className="w-full h-auto max-w-xs cursor-pointer border-neutral-700 dark:bg-black">
            <CardHeader>
              <div className="flex space-x-2">
                <img
                  src="https://img.lovepik.com/png/20231006/simple-cartoon-line-drawing-online-shopping-sale-discount-discount-package_105724_wh1200.png"
                  alt="orders"
                  width="50"
                  height="50"
                  className="self-start"
                />
                <div className="flex flex-col">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription>
                    Track, return or buy things again
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card className="w-full h-auto max-w-xs cursor-pointer border-neutral-700 dark:bg-black">
            <CardHeader>
              <div className="flex space-x-2">
                <img
                  src="https://cdn.icon-icons.com/icons2/1527/PNG/512/shield_106660.png"
                  alt="security"
                  width="50"
                  height="50"
                  className="self-start"
                />
                <div className="flex flex-col">
                  <CardTitle>Login & Security</CardTitle>
                  <CardDescription>
                    Edit login, name and password
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card className="w-full h-auto max-w-xs cursor-pointer border-neutral-700 dark:bg-black">
            <CardHeader>
              <div className="flex space-x-2">
                <img
                  src="https://files.softicons.com/download/toolbar-icons/vista-base-software-icons-2-by-icons-land/ico/DeleteRed.ico"
                  alt="delete-account"
                  width="50"
                  height="50"
                  className="self-start"
                />
                <div className="flex flex-col">
                  <CardTitle>Delete Account</CardTitle>
                  <CardDescription>
                    Your data will be permanently removed from our server
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card className="w-full h-auto max-w-xs cursor-pointer border-neutral-700 dark:bg-black">
            <CardHeader>
              <div className="flex space-x-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2534/2534200.png"
                  alt="delete-account"
                  width="50"
                  height="50"
                  className="self-start"
                />
                <div className="flex flex-col">
                  <CardTitle>Contact Us</CardTitle>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AccountPage;
