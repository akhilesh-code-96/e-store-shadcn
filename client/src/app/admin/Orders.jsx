"use client";

import { Badge } from "@/components/ui/badge";
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
import { getOrders } from "../redux/reducers/checkoutReducers/orderReducer";
import {
  allOrders,
  totalCounts,
  allPages,
} from "../redux/reducers/checkoutReducers/orderReducer";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowLeft } from "react-icons/md";
import { MdArrowRight } from "react-icons/md";
import "../style.css";

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector(allOrders);
  const totalPages = useSelector(allPages);
  const totalCount = useSelector(totalCounts);
  const [page, setPage] = useState(1);
  const inputRef = useRef([]);

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

  useEffect(() => {
    dispatch(getOrders(`page=${page}`));
  }, [page]);

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, i) => (
              <TableRow>
                <TableCell>
                  <div className="font-medium">{`${order.userId.firstname} ${order.userId.lastname}`}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {order.userId.email}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">Sale</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Fulfilled
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">₹{order.amount}</TableCell>
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
}
