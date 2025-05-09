"use client";
import { CartContext } from "../../../_context/CartProvider";
import { useUser } from "@clerk/nextjs";
import { BadgeCheck, BadgeX } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const ProductInfo = ({ product }) => {
  const { user } = useUser();
  const navigate = useRouter();
  const { addToCart_ } = useContext(CartContext);

  const handelAddToCart = () => {
    if (!user) {
      navigate.push("/sign-in");
    } else {
      const data = {
        data: {
          username: user.fullName,
          email: user?.primaryEmailAddress.emailAddress,
          products: [product?.documentId],
        },
      };
      addToCart_(data);
      toast.success("Product added to cart", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem("mode") === "dark" ? "dark" : "light"
      });
    }
  };
  return (
    <motion.div
      initial={{ x: 800 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="px-5 sm:px-10 py-5 sm:py-0 flex flex-col justify-center items-center sm:items-start w-[80%] m-auto md:w-[50%] lg:w-[60%]"
    >
      <h1 className="font-bold md:text-3xl text-[30px] dark:text-gray-300 text-center sm:text-left">
        {product?.title}
      </h1>
      <p className="text-gray-400 text-[15px] font-medium capitalize dark:text-gray-300">
        {product?.category} {" > "} {product?.gender}
      </p>
      <p className="text-[14px] my-2 dark:text-gray-400 text-center sm:text-left">
        {product?.description}
      </p>
      <div className="flex items-center gap-2">
        {product?.instandDelivery ? (
          <BadgeCheck
            className={`w-4 ${
              product?.instandDelivery ? "text-green-500" : "text-red-500"
            }`}
          />
        ) : (
          <BadgeX className="w-4 text-red-600" />
        )}
        <p className="text-[12px] text-gray-400 font-medium">
          Eligible For Instant Delivery
        </p>
      </div>
      <h1 className="text-primary font-medium text-4xl my-1.5">
        ${Number(product?.price).toFixed(2)}
      </h1>
      <button
        onClick={() => handelAddToCart()}
        className="bg-primary text-white text-[18px] rounded-[4px] px-2 py-1 cursor-pointer"
      >
        Add To Cart
      </button>
      <ToastContainer />
    </motion.div>
  );
};

export default ProductInfo;
