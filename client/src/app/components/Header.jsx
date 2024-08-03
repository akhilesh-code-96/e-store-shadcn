import { ModeToggle } from "@/components/mode-toggle";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
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
import { Menu } from "lucide-react";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const down = (e) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.type === "click") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full h-[55px] flex items-center fixed top-0 bottom-0 backdrop-blur-sm backdrop-opacity-100  bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-80 px-4">
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
            <span className="ms-2">E-Store</span>
          </Link>

          <div className="hidden space-x-4 md:flex">
            {["My Account", "Admin Panel", "Orders"].map((link) => {
              const path = `/${link.toLowerCase().replace(" ", "-")}`;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`cursor-pointer ${
                    isActive(path) ? "text-gray-300" : "text-neutral-500"
                  } hover:text-neutral-200`}
                >
                  {link}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="items-center hidden space-x-4 md:flex">
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
              <Button variant="outline" className="hover:underline">
                Sign in
              </Button>
            </Link>
            <CiShoppingCart size={24} className="cursor-pointer" />
            <FaXTwitter className="cursor-pointer" />
            <IoLogoGithub className="cursor-pointer" size={19} />
            <span style={{ marginLeft: "2px" }}>
              <ModeToggle />
            </span>
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="mb-2">Menu</SheetTitle>
            </SheetHeader>
            <ul className="flex flex-col space-y-4">
              {["My Account", "Admin Panel", "Orders"].map((link) => {
                const path = `/${link.toLowerCase().replace(" ", "-")}`;
                return (
                  <Link
                    key={path}
                    to={path}
                    className="text-neutral-500 hover:text-neutral-200"
                  >
                    {link}
                  </Link>
                );
              })}
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
            <SheetClose asChild>
              <Button variant="ghost" className="mt-4 ms-[-10px]">
                Close
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </section>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          className="border-none outline-none ring-0 focus:outline-none focus:border-none focus:ring-0"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions"></CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default Header;
