import { AlignLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
const Product = ({ product }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Link
        href={`/productDetails/${product?.id}`}
        className="rounded-lg p-4 shadow bg-white dark:bg-gray-800 flex flex-col items-center hover:shadow-primary hover:-translate-y-2 transition duration-200"
      >
        <Image
          alt="product-image"
          src={`${product?.banner?.url}`}
          // fill
          width={150}
          height={50}
          className="rounded-md object-cover h-full lg:h-[210px] w-[230px]"
        />

        <div className="mt-5 w-full flex justify-between items-end">
          <div>
            <h2 className="font-medium line-clamp-1 dark:text-gray-300">
              {product?.title}
            </h2>
            <div className="flex items-center gap-1">
              <AlignLeft className="text-gray-400 w-4 h-4" />
              <h2 className="text-[14px] text-gray-400">
                {product?.category.toUpperCase()}
              </h2>
            </div>
          </div>

          <h2 className="text-[16px] text-gray-500 dark:text-gray-300 font-medium">
            ${product?.price}
          </h2>
        </div>
      </Link>
    </motion.div>
  );
};

export default Product;
