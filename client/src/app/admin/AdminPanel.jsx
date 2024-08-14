import { Link, Outlet } from "react-router-dom";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import { totalCounts } from "../redux/reducers/checkoutReducers/orderReducer";
import { useSelector } from "react-redux";

// Function to get link class name based on current route
const getLinkClassName = (path, currentPath) =>
  `flex items-center gap-3 px-3 py-2 transition-all rounded-lg ${
    currentPath === path
      ? "bg-muted text-primary"
      : "text-muted-foreground hover:text-primary"
  }`;

export default function AdminPanel() {
  const location = useLocation();
  const count = useSelector(totalCounts);

  console.log(location.pathname);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex flex-col h-full max-h-screen gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="w-6 h-6" />
              <span className="">E-Store</span>
            </Link>
            <Button variant="outline" size="icon" className="w-8 h-8 ml-auto">
              <Bell className="w-4 h-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {[
                { icon: <Home className="w-4 h-4" />, text: "Dashboard" },
                {
                  icon: <ShoppingCart className="w-4 h-4" />,
                  text: "Orders",
                  badge: `${count}`,
                },
                { icon: <Package className="w-4 h-4" />, text: "Products" },
                { icon: <Users className="w-4 h-4" />, text: "Customers" },
                {
                  icon: <LineChart className="w-4 h-4" />,
                  text: "Add Product",
                },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={`${link.text.toLowerCase().replace(" ", "-")}`}
                  className={getLinkClassName(
                    `/admin-panel/${link.text.toLowerCase().replace(" ", "-")}`,
                    location.pathname
                  )}
                >
                  {link.icon}
                  {link.text}
                  {link.badge && (
                    <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="w-6 h-6" />
                  <span className="sr-only">E-Store</span>
                </Link>
                {[
                  { icon: <Home className="w-4 h-4" />, text: "Dashboard" },
                  {
                    icon: <ShoppingCart className="w-4 h-4" />,
                    text: "Orders",
                    badge: `${count}`,
                  },
                  { icon: <Package className="w-4 h-4" />, text: "Products" },
                  { icon: <Users className="w-4 h-4" />, text: "Customers" },
                  {
                    icon: <LineChart className="w-4 h-4" />,
                    text: "Add Product",
                  },
                ].map((link, index) => (
                  <Link
                    key={index}
                    to={`${link.text.toLowerCase().replace(" ", "-")}`}
                    className={getLinkClassName(
                      `/admin-panel/${link.text
                        .toLowerCase()
                        .replace(" ", "-")}`,
                      location.pathname
                    )}
                  >
                    {link.icon}
                    {link.text}
                    {link.badge && (
                      <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
                        {link.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex-1 w-full">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="w-5 h-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
