import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useLocation, Outlet } from "react-router-dom";

const AccountPage = () => {
  const user = window.localStorage.getItem("user");
  const location = useLocation();

  const isNestedRoute = location.pathname !== "/my-account";
  return (
    <div className="min-h-screen pt-[55px] flex flex-col items-center">
      {!isNestedRoute && (
        <>
          <section id="content" className="w-full mt-10 lg:w-4/6 md:w-4/6">
            <div className="flex flex-col w-full">
              {/* Header */}
              <div className="flex justify-center w-full md:justify-start">
                <h1 className="text-3xl font-bold">Welcome, {user}</h1>
              </div>
              {/* Details */}
              <div className="grid grid-cols-1 gap-4 p-5 mt-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                <Link to="/my-account/orders">
                  <Card className="w-[320px] h-[120px] cursor-pointer border-neutral-700 dark:bg-black hover:dark:bg-[#080e0b]">
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
                </Link>
                {/* <Link to="/my-account/login-security">
                  <Card className="w-[320px] h-[120px] cursor-pointer border-neutral-700 dark:bg-black hover:dark:bg-[#080e0b]">
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
                </Link> */}
                <Link to="/my-account/addresses">
                  <Card className="w-[320px] h-[120px] cursor-pointer border-neutral-700 dark:bg-black hover:dark:bg-[#080e0b]">
                    <CardHeader>
                      <div className="flex space-x-2">
                        <img
                          src="https://www.vhv.rs/dpng/d/503-5038283_address-location-pin-icon-orange-hd-png-download.png"
                          alt="your-addresses"
                          width="50"
                          height="50"
                          className="self-start"
                        />
                        <div className="flex flex-col">
                          <CardTitle>Your Addresses</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
                <Link to="/my-account/delete-account">
                  <Card className="w-[320px] h-[120px] cursor-pointer border-neutral-700 dark:bg-black hover:dark:bg-[#080e0b]">
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
                            Your data will be permanently removed from our
                            server
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
                {/* <Link to="/my-account/contact-us">
                  <Card className="w-[320px] h-[120px] cursor-pointer border-neutral-700 dark:bg-black hover:dark:bg-[#080e0b] transition-colors duration-30">
                    <CardHeader>
                      <div className="flex space-x-2">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2534/2534200.png"
                          alt="contact-us"
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
                </Link> */}
              </div>
            </div>
          </section>
        </>
      )}
      {isNestedRoute && <Outlet />}
    </div>
  );
};

export default AccountPage;
