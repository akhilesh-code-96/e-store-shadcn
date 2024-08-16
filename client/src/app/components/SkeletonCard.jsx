import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Skeleton from "@mui/material/Skeleton";

const SkeletonCard = () => {
  return (
    <Card className="flex flex-col justify-between h-auto max-w-xs mt-0 dark:bg-[#1e1e1e] rounded-sm shadow-lg sm:mt-5 sm:w-11/12">
      <CardHeader className="dark:bg-[#121212]">
        <Skeleton variant="text" width="75%" height={30} />
        <Skeleton variant="text" width="25%" height={20} />
      </CardHeader>
      <CardContent className="flex justify-center items-center h-[150px] sm:h-[200px] md:h-[250px]">
        <Skeleton variant="rectangular" width={210} height={118} />
      </CardContent>
      <CardFooter className="bg-[#0f171f] py-4">
        <Skeleton variant="text" width="100%" height={30} />
      </CardFooter>
    </Card>
  );
};

export default SkeletonCard;
