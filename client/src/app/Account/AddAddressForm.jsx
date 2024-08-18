import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  getAddresses,
  updateAddress,
} from "../redux/reducers/accountReducers/addressReducer";
import { allAddresses } from "../redux/reducers/accountReducers/addressReducer";

const AddAddressForm = () => {
  const userId = window.localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const address = useSelector(allAddresses);
  const { addId } = location.state || "";

  React.useEffect(() => {
    if (addId) {
      dispatch(getAddresses(`addId=${addId}`));
    }
  }, [addId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const queryParams = `id=${userId}`;

      if (addId) {
        // If address exists, update the existing address
        dispatch(
          updateAddress({ queryParams: `id=${addId}&userId=${userId}`, data })
        );
      } else {
        dispatch(addAddress({ queryParams, data }));
      }
      navigate("/my-account/addresses");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-3/4 pt-5 sm:w-2/4">
      <h2 className="text-3xl font-semibold leading-7">
        {addId ? "Edit address" : "Add a new address"}
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Use a permanent address where you can receive your orders.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium leading-6"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="fullName"
                name="fullName"
                type="text"
                defaultValue={address?.name || ""}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-950"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium leading-6"
            >
              Mobile Number
            </label>
            <div className="mt-2">
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="number"
                defaultValue={address?.mobileNumber || ""}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-950"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6"
            >
              Country
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="country"
                defaultValue={address?.country || "India"}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 dark:text-gray-950"
              >
                <option>India</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="houseNo"
              className="block text-sm font-medium leading-6"
            >
              Flat, House no., Building, Company, Apartment
            </label>
            <div className="mt-2">
              <input
                id="houseNo"
                name="houseNo"
                type="text"
                defaultValue={address?.houseNo || ""}
                autoComplete="houseNo"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-950"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="streetAddress"
              className="block text-sm font-medium leading-6"
            >
              Street address
            </label>
            <div className="mt-2">
              <input
                id="streetAddress"
                name="streetAddress"
                type="text"
                defaultValue={address?.streetAddress || ""}
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-950"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6"
            >
              City
            </label>
            <div className="mt-2">
              <input
                id="city"
                name="city"
                type="text"
                defaultValue={address?.city || ""}
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-950"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="state"
              className="block text-sm font-medium leading-6"
            >
              State / Province
            </label>
            <div className="mt-2">
              <input
                id="state"
                name="state"
                type="text"
                defaultValue={address?.state || ""}
                autoComplete="address-level1"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-950"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="pincode"
              className="block text-sm font-medium leading-6"
            >
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
                id="pincode"
                name="pincode"
                type="number"
                defaultValue={address?.pincode || ""}
                autoComplete="pincode"
                placeholder="6 digits [0-9] PIN code"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading- dark:text-gray-950"
              />
            </div>
          </div>
        </div>
        <Button variant="outline" className="mt-4 mb-3" type="submit">
          {addId ? "Update address" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default AddAddressForm;
