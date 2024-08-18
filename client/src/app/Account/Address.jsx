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
    dispatch(deleteAddress(`id=${id}`));
    setReload((prev) => !prev);
  };

  const isNested = location.pathname !== "/my-account/addresses";

  return (
    <>
      {!isNested && (
        <div className="flex flex-col items-start w-full p-5">
          <h1 className="p-2 text-xl">Addresses</h1>
          <Separator />
          <div className="grid grid-cols-1 gap-4 p-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <Link to="/my-account/addresses/add-address">
              <div className="flex h-[300px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm cursor-pointer hover:dark:bg-neutral-900 transition-colors duration-300">
                Add new address
              </div>
            </Link>
            {addresses.length > 0 &&
              addresses.map((address, i) => (
                <Card className="w-full h-auto max-w-xs border-neutral-700 dark:bg-black">
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
                  <CardFooter className="flex space-x-2">
                    <div
                      onClick={() => handleEdit(address._id)}
                      className="cursor-pointer hover:underline text-neutral-300"
                    >
                      Edit
                    </div>
                    <div className="h-4">
                      <Separator orientation="vertical" />
                    </div>
                    <div
                      onClick={() => handleDelete(address._id)}
                      className="cursor-pointer hover:underline text-neutral-300"
                    >
                      Delete
                    </div>
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
