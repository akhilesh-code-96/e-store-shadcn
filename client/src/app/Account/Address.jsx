import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Address = () => {
  return (
    <div className="flex flex-col items-start w-full p-5">
      <h1 className="p-2 text-xl">Addresses</h1>
      <Separator />
      <div className="grid grid-cols-1 gap-4 p-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        <div className="flex h-[300px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm cursor-pointer hover:dark:bg-neutral-900 transition-colors duration-300">
          +
        </div>
        <Card className="w-full h-auto max-w-xs border-neutral-700 dark:bg-black">
          <CardHeader>
            <div className="flex space-x-2">
              <div className="flex flex-col">
                <CardTitle className="mb-2">Akhilesh</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>A-34/b</p>
            <p>Ayodhya nagar gandhi path west lalarpura road</p>
            <p>JAIPUR, RAJASTHAN 302021</p>
            <p>India</p>
            <p>Phone number: 8949846048</p>
          </CardContent>
          <CardFooter className="flex space-x-2">
            <Link className="hover:underline text-neutral-300">Edit</Link>
            <div className="h-4">
              <Separator orientation="vertical" />
            </div>
            <Link className="hover:underline text-neutral-300">Delete</Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Address;
