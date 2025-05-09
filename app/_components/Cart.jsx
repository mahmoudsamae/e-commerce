"use client";
import { useContext } from "react";
import { CartContext } from "../_context/CartProvider";
import Link from "next/link";

export default function Cart({ setOpenCart }) {
  const { cart } = useContext(CartContext);

  const  totalAmount = () => {
    let total = 0;
    cart?.data?.forEach(item => {
      total += item?.products[0]?.price;
    })
    return Number(total).toFixed(2);
  }
  return (
    <div
      className="relative z-20"

    >
      <div
        className="fixed  inset-0 bg-gray-500/75 transition-opacity dark:bg-gray-900/75"
        onClick={() => setOpenCart(false)}
      ></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl dark:bg-gray-800">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-lg font-medium text-gray-900 dark:text-gray-300"
                      id="slide-over-title"
                    >
                      Shopping cart
                    </h2>

                    {/* cart close button */}
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        onClick={() => setOpenCart(false)}
                        type="button"
                        className="relative -m-2 p-2 cursor-pointer text-gray-400 hover:text-primary dark:text-gray-300"
                      >
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Close panel</span>
                        <svg
                          className="size-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                        >
                          <path
                            strokeLinecap="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    {/* cart items */}
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200 dark:divide-gray-700"
                      >
                        {cart &&
                          cart?.data?.map((item) => (
                            <li
                              key={item?.id}
                              className="flex py-6"
                            >
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={item?.products[0]?.banner?.url}
                                  alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                  className="size-full object-cover"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white ">
                                    <h3>
                                      {item?.products[0]?.title}
                                    </h3>
                                    <p className="ml-4">
                                      ${item?.products[0]?.price}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {item?.products[0]?.category} {" > "}{" "}
                                    {item?.products[0]?.gender}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {item?.products[0]?.color}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* total amount and wiew cart button */}
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6 dark:border-gray-700">
                  <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-300">
                    <p>Subtotal</p>
                    <p>${totalAmount()}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Link
                    onClick={() => setOpenCart(false)}
                      href="/cart"
                      className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-hover duration-200"
                    >
                      View My Cart
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                      or 
                      <Link
                        href="/"
                        onClick={() => setOpenCart(false)}
                        type="button"
                        className="font-medium text-primary hover:text-hover"
                      >
                        {' '}Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
