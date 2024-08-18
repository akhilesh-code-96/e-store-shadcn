import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  allAddresses,
  getAddresses,
  deleteAddress,
} from "../redux/reducers/accountReducers/addressReducer";
import { useSelector, useDispatch } from "react-redux";

const Address = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const addresses = useSelector(allAddresses);
  const userId = window.localStorage.getItem("userId");
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  // api call management to fetch all the addresses.
  useEffect(() => {
    const getAllAddresses = async () => {
      try {
        dispatch(getAddresses(`id=${userId}`));
      } catch (error) {
        console.error(error);
      }
    };
    getAllAddresses();
  }, [dispatch, userId, location.pathname, reload]);

  const handleEdit = (id) => {
    navigate("/my-account/addresses/add-address", { state: { addId: id } });
  };

  const handleDelete = (id) => {
    setLoading(true);
    dispatch(deleteAddress(`id=${id}`))
      .then(() => setLoading(false))
      .finally(() => setReload((prev) => !prev));
  };

  const isNested = location.pathname !== "/my-account/addresses";

  return (
    <>
      {!isNested && (
        <div className="flex flex-col items-center w-full p-5 md:items-start">
          <h1 className="p-2 text-xl">Addresses</h1>
          <Separator />
          <div className="grid grid-cols-1 gap-4 p-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <Link to="/my-account/addresses/add-address">
              <div
                className="flex items-center justify-center p-4 border border-dashed rounded-md cursor-pointer hover:bg-neutral-900 transition-colors duration-300 
          w-full h-[300px] max-w-xs sm:max-w-xs md:max-w-sm lg:max-w-md 
          sm:h-[300px] md:h-[370px]"
              >
                <p className="text-sm text-center">Add new address</p>
              </div>
            </Link>
            {addresses.length > 0 &&
              addresses.map((address, i) => (
                <Card className="relative w-full h-auto max-w-xs border-neutral-700 dark:bg-black">
                  <CardHeader>
                    <div className="flex space-x-2">
                      <div className="flex flex-col">
                        <CardTitle className="mb-2">{address.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{address.houseNo}</p>
                    <p>{address.streetAddress}</p>
                    <p>{`${address.city.toUpperCase()}, ${address.state.toUpperCase()}, ${
                      address.pincode
                    }`}</p>
                    <p>{address.country}</p>
                    <p>Phone number: {address.mobileNumber}</p>
                  </CardContent>
                  <CardFooter className="flex space-x-2 ">
                    <div
                      onClick={() => handleEdit(address._id)}
                      className="cursor-pointer hover:underline text-neutral-300"
                    >
                      Edit
                    </div>
                    <div className="h-4">
                      <Separator orientation="vertical" />
                    </div>
                    {!loading ? (
                      <div
                        onClick={() => handleDelete(address._id)}
                        className="cursor-pointer hover:underline text-neutral-300"
                      >
                        Delete
                      </div>
                    ) : (
                      <div className="text-neutral-300">deleting...</div>
                    )}
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      )}
      {isNested && <Outlet />}
    </>
  );
};

export default Address;
