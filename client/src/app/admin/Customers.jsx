import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsers,
  totalCounts,
  totalPage,
} from "../redux/reducers/userReducer/userReducers";
import { getUsers } from "../redux/reducers/userReducer/userReducers";
import { MdArrowLeft } from "react-icons/md";
import { MdArrowRight } from "react-icons/md";

const Customers = () => {
  const users = useSelector(allUsers);
  const totalPages = useSelector(totalPage);
  const totalCount = useSelector(totalCounts);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const inputRef = useRef([]);

  useEffect(() => {
    dispatch(getUsers(`page=${page}`));
  }, [page]);

  useEffect(() => {
    inputRef.current.forEach((ref, index) => {
      if (index === page - 1) {
        ref.classList.add("text-primary");
        ref.classList.remove("text-muted-foreground");
      } else {
        ref.classList.remove("text-primary");
        ref.classList.add("text-muted-foreground");
      }
    });
  }, [page]);

  const selectPageHandler = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  console.log("User", users);

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Customers</CardTitle>
        <CardDescription>All users of this store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, i) => (
              <TableRow>
                <TableCell>
                  <div className="font-medium">{`${user.firstname} ${user.lastname}`}</div>
                  {/* <div className="hidden text-sm text-muted-foreground md:inline">
                    {user.email}
                  </div> */}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {user.email}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Active
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="w-4 h-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                      // onClick={() => handleEditClick(product)}
                      >
                        Activate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                      // onClick={() => handleDeleteClick(product)}
                      >
                        Suspend
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing{" "}
          <strong>
            {page * 10 - 10 + 1}-{page === totalPages ? totalCount : page * 10}
          </strong>{" "}
          of <strong>{totalCount}</strong> products
        </div>
        <div className="absolute flex space-x-2 right-16">
          <span
            className={page > 1 ? "cursor-pointer" : "pagination__disabled"}
            onClick={() => selectPageHandler(page - 1)}
          >
            <MdArrowLeft />
          </span>
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              className="text-xs font-bold cursor-pointer text-muted-foreground hover:text-primary"
              ref={(el) => (inputRef.current[i] = el)}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          {
            <span
              className={
                page < totalPages ? "cursor-pointer" : "pagination__disabled"
              }
              onClick={() => selectPageHandler(page + 1)}
            >
              <MdArrowRight />
            </span>
          }
        </div>
      </CardFooter>
    </Card>
  );
};

export default Customers;
