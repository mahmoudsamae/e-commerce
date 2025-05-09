"use client";
import React, { useContext, useState } from "react";
import { CartContext } from "../_context/CartProvider";
import cartApis from "../_utiles/cartApis";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
const page = () => {
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useUser();

  const totalAmount = () => {
    let total = 0;
    cart?.data?.forEach((item) => {
      total = total + Number(item?.products[0]?.price);
    });

    return Number(total).toFixed(2);
  };

  const deleteProduct_ = (documentId) => {
    const email = user?.emailAddresses[0]?.emailAddress;
    cartApis
      .deleteProductFormCart(documentId)
      .then(() => {
        if (user) {
          cartApis.getCartProducts(email).then((res) => {
            setCart(res?.data);
          });
        }
        toast.success("Product removed from cart", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme:
            localStorage.getItem("mode") === "dark"
              ? "dark"
              : "light" || "light",
        });
      })
      .catch((err) => console.log(err));
  };

  const deleteAllProduct = () => {
    try {
      cart?.data?.forEach((item) => {
        cartApis.deleteProductFormCart(item?.documentId).then((res) => {
          setCart([]);
        });
      });
      toast.success("All products Deleted", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:
          localStorage.getItem("mode") === "dark" ? "dark" : "light" || "light",
      });
    } catch (error) {
      console.log(error)
    }
  };

  const handleCheckout = () => {
    if (cart?.data?.length > 0) {
      router.push(`/checkout?amount=${totalAmount()}`);
    } else {
      setShowPopup(true);
    }
  };
  return (
    <section className="dark:bg-gray-900 min-h-[calc(100vh-100px)]">
      <ToastContainer />
      {/* when cart is empty */}
      {showPopup && (
        <div className="w-[300px] p-2 h-[200px] absolute top-[50%] left-[50%] gap-4 rounded-4xl translate-y-[-50%] translate-x-[-50%]  bg-gray-900 dark:bg-gray-100  flex flex-col justify-center items-center">
          <h1 className="text-gray-100 dark:text-gray-900 text-[20px] font-bold">
            You have no product yet
          </h1>
          <Link
            href="/shop"
            className="block rounded-sm px-5 py-3 text-sm transition  bg-primary text-white hover:bg-hover"
          >
            Go Shoping
          </Link>
        </div>
      )}
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl w-full text-center font-bold dark:text-gray-300">
            Your Cart
          </h1>
          <div className="mt-5">
            <ul className="space-y-4">
              {cart?.data?.map((item) => (
                <li
                  key={item?.products[0]?.id}
                  className="flex items-center gap-4"
                >
                  <img
                    src={item?.products[0]?.banner?.url}
                    alt="mm"
                    className="size-16 rounded-sm object-cover"
                  />

                  <div>
                    <h3 className="text-sm text-gray-900 dark:text-gray-300">
                      {item?.products[0]?.title}
                    </h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 dark:text-gray-400 ">
                      <dt className="inline">Category: </dt>
                      <dd className="inline">{item?.products[0]?.category}</dd>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <div>
                      <dt className="inline text-gray-900 dark:text-gray-300">
                        Price:{" "}
                      </dt>
                      <dd className="inline text-gray-900 dark:text-gray-300">
                        {item?.products[0]?.price.toFixed(2)}
                      </dd>
                    </div>

                    <button
                      onClick={() => deleteProduct_(item?.documentId)}
                      className="text-gray-600 transition hover:text-primary cursor-pointer dark:text-gray-300"
                    >
                      <span className="sr-only">Remove item</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-start w-full border-t border-gray-100 pt-8">
              <div className="w-screen  space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex justify-between w-full  !text-base font-medium">
                    <dt>Total :</dt>
                    <dd>${Number(totalAmount()).toFixed(2)}</dd>
                  </div>
                </dl>

                <div className="flex justify-end gap-2">
                  {cart?.data?.length > 0 && (
                    <button
                      onClick={() => deleteAllProduct()}
                      className="block rounded-sm px-5 py-3 text-sm transition cursor-pointer bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete All
                    </button>
                  )}
                  <button
                    onClick={() => handleCheckout()}
                    className="block rounded-sm px-5 py-3 text-sm transition cursor-pointer bg-primary text-white hover:bg-hover"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
            <h2 className="text-[12px] font-medium text-gray-400 pb-10 sm:pb-0">
              Note: All your items will be send via Email
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
