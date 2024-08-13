/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await axios.post("/api/add-products", data, {
        headers: { "Content-type": "multipart/form-data" },
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full md:w-2/4">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="pb-12 border-b border-gray-900/10">
            <h2 className="text-base font-semibold leading-7">
              Add New Product
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly to all the users.
            </p>

            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 "
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex items-center pl-3 text-gray-500 select-none sm:text-sm"></span>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="xyz"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6"
                >
                  Product Description
                </label>
                <div className="mt-2">
                  <Textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write detailed information about the product.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="product-image"
                  className="block text-sm font-medium leading-6"
                >
                  Product Image
                </label>
                <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="w-12 h-12 mx-auto text-gray-300"
                    />
                    <div className="flex mt-4 text-sm leading-6 text-gray-600">
                      <Label
                        htmlFor="photo"
                        className="relative mt-1 font-semibold text-indigo-600 bg-white rounded-md cursor-pointer dark:bg-[#0a0a0a] focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="photo"
                          name="photo"
                          type="file"
                          className="sr-only"
                        />
                      </Label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-12 border-b">
            <h2 className="text-base font-semibold leading-7">
              Product Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Give all the details down below.
            </p>

            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 "
                >
                  Price
                </Label>
                <div className="mt-2">
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="any"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label
                  htmlFor="discount-percentage"
                  className="block text-sm font-medium leading-6 "
                >
                  Discount Percentage
                </Label>
                <div className="mt-2">
                  <Input
                    id="discountPercentage"
                    name="discountPercentage"
                    type="number"
                    step="any"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <Label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 "
                >
                  Stock
                </Label>
                <div className="mt-2">
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    autoComplete="stock"
                    placeholder="1"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 "
                >
                  Category
                </Label>
                <div className="mt-2">
                  <Select name="category">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>choose one</SelectLabel>
                        <SelectItem value="furniture">furniture</SelectItem>
                        <SelectItem value="beauty">beauty</SelectItem>
                        <SelectItem value="fragrances">fragrances</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="col-span-full">
                <Label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 "
                >
                  Brand
                </Label>
                <div className="mt-2">
                  <Input
                    id="brand"
                    name="brand"
                    type="text"
                    autoComplete="brand"
                    placeholder="Chanel"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <Label
                  htmlFor="rating"
                  className="block text-sm font-medium leading-6 "
                >
                  Rating
                </Label>
                <div className="mt-2">
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    placeholder="5.0"
                    step="any"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mt-6 gap-x-6">
          <Button variant="secondary" type="button">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
