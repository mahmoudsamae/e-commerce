"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Shirt, ShirtIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { CartContext } from "../_context/CartProvider";
import Cart from "./Cart";
import DarkModeIcon from "./darkModeIcon";
import { usePathname } from "next/navigation";

// links for the header
const links = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Shop",
    path: "/shop",
  },
  {
    id: 3,
    title: "About",
    path: "/about",
  },
  {
    id: 4,
    title: "Contact",
    path: "/contact",
  },
];

// header component
const Header = () => {
  const pathname = usePathname();

  // get cart from cart context
  const { cart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(false);

  // get user
  const { user } = useUser();

  // open menu
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      {!pathname.includes("sign-in") && !pathname.includes("sign-up") && (
        <header className="bg-white dark:bg-gray-900 shadow-md shadow-gray-300 dark:shadow-gray-800 sticky top-0 z-50">
          <div className="mx-auto flex h-15 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* logo */}
            <Link className="flex items-center space-x-2" href="/">
              {/* <Image
                src="/logo.png"
                width={105}
                height={45}
                alt="logo"
                className="w-auto h-10 rounded"
              /> */}
              <ShirtIcon className="text-primary"/>
              <span className="text-2xl font-bold text-primary">Vogue</span>
            </Link>

            {/* navigation */}
            <nav className="hidden md:flex space-x-8">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={link.path}
                  className="text-gray-600 dark:text-gray-300 hover:text-hover transition duration-300 text-sm font-medium"
                >
                  {link.title}
                </Link>
              ))}
            </nav>

            {/* dark mode and cart */}
            <div className="flex items-center space-x-4">
              <DarkModeIcon />
              {user ? (
                <>
                  {/* cart */}
                  <button
                    onClick={() => setOpenCart((prev) => !prev)}
                    className="relative p-2 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-hover transition duration-300"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {cart?.data?.length > 0 ? (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cart?.data?.length}
                      </span>
                    ) : (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        0
                      </span>
                    )}
                  </button>
                  {/* user button */}
                  <UserButton />
                </>
              ) : (
                <div className="space-x-2 hidden sm:flex">
                  {/* login and register buttons for large screens */}
                  <Link
                    href="/sign-in"
                    onClick={() => setISLoggedIn(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-hover transition duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 text-sm font-medium text-primary bg-gray-100 rounded-md hover:bg-gray-200 transition duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
              {/* mobile menu */}
              <div className="md:hidden relative">
                <button
                  onClick={() => setOpenMenu((prev) => !prev)}
                  className="p-2 text-gray-600 cursor-pointer hover:text-hover transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                {/* mobile links */}
                <div
                  className={`md:hidden ${openMenu ? "h-auto  " : "h-0"} transition-[height] duration-300 ease-in-out overflow-hidden w-[100vw] right-[-17] top-13 absolute bg-white dark:bg-gray-800`}
                >
                  <nav className="px-4 pt-2 pb-4 space-y-2">
                    {links.map((link) => (
                      <Link
                        key={link.id}
                        href={link.path}
                        className="block text-center px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-hover"
                        onClick={() => setOpenMenu(false)}
                      >
                        {link.title}
                      </Link>
                    ))}
                    {!user && (
                      <div className="flex flex-col items-center space-y-2">
                        <Link
                          href="/sign-in"
                          onClick={() => setISLoggedIn(true)}
                          className="px-4 py-2 text-sm font-medium w-fit text-white bg-primary rounded-md hover:bg-hover transition duration-300"
                        >
                          Login
                        </Link>
                        <Link
                          href="/sign-up"
                          className="px-4 py-2 text-sm font-medium w-fit text-primary bg-gray-100 rounded-md hover:bg-gray-200 transition duration-300"
                        >
                          Register
                        </Link>
                      </div>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {openCart && <Cart setOpenCart={setOpenCart} />}
        </header>
      )}
    </>
  );
};

export default Header;
