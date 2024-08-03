"use client";

import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MdArrowLeft } from "react-icons/md";
import { MdArrowRight } from "react-icons/md";

import "../style.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const inputRef = useRef([]);

  function formatDate(isoString) {
    const date = new Date(isoString);

    const formattedDate = date.toLocaleDateString("en-CA"); // 'en-CA' for YYYY-MM-DD format
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  }

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setOpenDialog(true);
  };

  const handleDeleteClick = (product) => {
    setCurrentProduct(product);
    setOpenAlertDialog(true);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `/api/get-products?limit=10&page=${page}`
      );
      const data = response.data.products;
      const prods = response.data.total;
      setProducts(data);
      setTotalProducts(prods);
      setTotalPages(Math.ceil(prods / 10));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
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

  const editProduct = async (id, price, stock) => {
    try {
      const response = await axios.put(
        "/api/edit-product",
        { id, price, stock },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      if (response.status === 200) {
        getProducts();
        setOpenDialog(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`/api/delete-product/${id}`);
      if (response.status === 200) {
        getProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Ratings</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Stocks
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products &&
              products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="hidden sm:table-cell">
                    <img
                      alt="Product image"
                      className="object-cover rounded-md aspect-square"
                      height="64"
                      src={`${product.imageUrl}`}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.rating}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {`$${product.price}`}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.stock}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(product.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleEditClick(product)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(product)}
                        >
                          Delete
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
            {page * 10 - 10 + 1}-
            {page === totalPages ? totalProducts : page * 10}
          </strong>{" "}
          of <strong>{totalProducts}</strong> products
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

      {/* Dialog for editing product */}
      {currentProduct && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            {/* Empty trigger to handle dialog close from outside */}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit product</DialogTitle>
              <DialogDescription>
                Make changes to your product here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  defaultValue={currentProduct.price}
                  className="col-span-3"
                  type="number"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock
                </Label>
                <Input
                  id="stock"
                  defaultValue={currentProduct.stock}
                  className="col-span-3"
                  type="number"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => {
                  const id = currentProduct._id;
                  const price = parseFloat(
                    document.getElementById("price").value
                  );
                  const stock = parseInt(
                    document.getElementById("stock").value,
                    10
                  );
                  editProduct(id, price, stock);
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {currentProduct && (
        <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
          <AlertDialogTrigger asChild>
            {/*Empty trigger to active alert*/}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                product and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const id = currentProduct._id;
                  handleDeleteProduct(id);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Card>
  );
}
