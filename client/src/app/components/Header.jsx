import { ModeToggle } from "@/components/mode-toggle";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

import { Menu } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { fetchProducts, selectProducts } from "../redux/reducers/headerReducer";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { itemCount } from "../redux/reducers/checkoutReducers/cartReducer";
import {
  getCartProducts,
  resetCart,
} from "../redux/reducers/checkoutReducers/cartReducer";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const cartCount = useSelector(itemCount);
  const user = window.localStorage.getItem("user");
  const userId = window.localStorage.getItem("userId");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (userId) {
      dispatch(getCartProducts(`userId=${userId}`));
    }
  }, [dispatch, userId]);

  React.useEffect(() => {
    const down = (e) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.type === "click") {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Enter") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = async (e) => {
    if (e) {
      const value = e.target.textContent;
      if (value) {
        try {
          dispatch(fetchProducts(`title=${value}`));
          setOpen((open) => !open);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("userId");
    dispatch(resetCart());
    await axios.post("/api/logout");
  };

  React.useEffect(() => {
    handleSearch();
  }, []);

  const handleSearchChange = async (e) => {
    if (e) {
      const value = e.target.value;
      if (value) {
        try {
          dispatch(fetchProducts(`title=${value}`));
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  React.useEffect(() => {
    handleSearchChange();
  }, [products]);

  if (
    location.pathname === "/my-account" ||
    location.pathname === "/add-to-cart"
  ) {
    if (!user) {
      navigate("/login");
    }
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full h-[55px] flex items-center fixed top-0 bottom-0 backdrop-blur-sm backdrop-opacity-100 bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-80 px-4">
      <section
        id="navigation"
        className="relative flex items-center justify-between w-full px-3"
      >
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <img
              src="/e-store-logo.jpg"
              alt="logo"
              className="object-contain w-10 h-7"
            />
            <span className="text-sm ms-2 me-2">E-Store</span>
          </Link>
          {/* Main Header */}
          <div className="hidden space-x-6 lg:flex">
            {[`Hello, ${user || "Guest"}`, "Admin Panel", "Orders"].map(
              (link) => {
                // Determine the path based on the link
                let path;
                if (link.startsWith("Hello")) {
                  path = "/my-account"; // Redirect to the my-account page
                } else if (link === "Orders") {
                  path = "/my-account/orders";
                } else {
                  path = `/${link.toLowerCase().replace(" ", "-")}`;
                }

                return (
                  <Link
                    key={path}
                    to={path}
                    className={`cursor-pointer text-sm font-bold ${
                      isActive(path) ? "text-gray-300" : "text-neutral-500"
                    } hover:text-neutral-200`}
                  >
                    {link}
                  </Link>
                );
              }
            )}
          </div>
        </div>
        {/* Icons and sign in button */}
        <div className="items-center hidden space-x-4 lg:flex">
          <div
            className="flex justify-between cursor-pointer dark:hover:bg-neutral-800 dark:hover:text-gray-50 hover:bg-neutral-200 hover:text-neutral-600 transition ease-in-out w-[250px] h-8 rounded-xl bg-[#3aafaf] bg-opacity-20 font-sans text-sm py-[6px] px-3 text-neutral-400"
            onClick={() => setOpen((prevOpen) => !prevOpen)}
          >
            Search Products...
            <CommandShortcut className="rounded-md px-[5px] py-[1px] w-7 outline-1 dark:bg-neutral-600 bg-neutral-300">
              ⌘k
            </CommandShortcut>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/login">
              {user ? (
                <Button
                  variant="outline"
                  className="hover:underline h-[30px]"
                  onClick={() => handleLogout()}
                >
                  Sign out
                </Button>
              ) : (
                <Button variant="outline" className="hover:underline h-[30px]">
                  Sign in
                </Button>
              )}
            </Link>
            {/* Shopping Cart */}
            <div className="relative inline-block">
              <Link to="/add-to-cart">
                <CiShoppingCart size={24} className="cursor-pointer" />
              </Link>
              {cartCount > 0 && (
                <Badge className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full left-6">
                  {cartCount}
                </Badge>
              )}
            </div>
            <FaXTwitter className="cursor-pointer" />
            <IoLogoGithub className="cursor-pointer" size={19} />
            <span style={{ marginLeft: "2px" }}>
              <ModeToggle />
            </span>
          </div>
        </div>
        {/* Secondary Header */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="mb-2">Menu</SheetTitle>
            </SheetHeader>
            <ul className="flex flex-col space-y-4">
              {[`Hello, ${user || "Guest"}`, "Admin Panel", "Orders"].map(
                (link) => {
                  // Determine the path based on the link
                  let path;
                  if (link.startsWith("Hello")) {
                    path = "/my-account"; // Redirect to the my-account page
                  } else if (link === "Orders") {
                    path = "/my-account/orders";
                  } else {
                    path = `/${link.toLowerCase().replace(" ", "-")}`;
                  }
                  return (
                    <Link
                      key={path}
                      to={path}
                      className="text-neutral-500 hover:text-neutral-200"
                    >
                      {link}
                    </Link>
                  );
                }
              )}
              <div
                className="flex justify-between cursor-pointer dark:hover:bg-neutral-800 dark:hover:text-gray-50 hover:bg-neutral-200 hover:text-neutral-600 transition ease-in-out w-full h-8 rounded-xl bg-[#3aafaf] bg-opacity-20 font-sans text-sm py-[6px] px-3 text-neutral-400"
                onClick={() => setOpen((prevOpen) => !prevOpen)}
              >
                Search Products...
                <CommandShortcut className="rounded-md px-[5px] py-[1px] w-7 outline-1 dark:bg-neutral-600 bg-neutral-300">
                  ⌘k
                </CommandShortcut>
              </div>
              <div className="flex items-center space-x-2">
                <CiShoppingCart className="cursor-pointer" />
                <FaXTwitter className="cursor-pointer" />
                <IoLogoGithub className="cursor-pointer" />
                <ModeToggle />
              </div>
            </ul>
            {/* <SheetClose asChild>
              <Button variant="ghost" className="mt-4 ms-[-10px]">
                Close
              </Button>
            </SheetClose> */}
          </SheetContent>
        </Sheet>
      </section>

      {/* Search Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center p-2 space-x-2 rounded-md">
          <CiSearch size={24} style={{ cursor: "pointer" }} />
          <Input
            placeholder="Type a command or search..."
            onChange={handleSearchChange}
            style={{
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </div>
        <CommandList>
          {products.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          <CommandGroup heading="Suggestions">
            {products.map((product, i) => (
              <div
                key={i}
                onClick={handleSearch}
                className="p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {product.title}
              </div>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default Header;
