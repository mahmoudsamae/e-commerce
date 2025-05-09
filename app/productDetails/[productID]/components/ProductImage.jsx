import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
const ProductImage = ({ product }) => {
  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex w-[80%] m-auto md:w-[50%] lg:w-[40%] rounded-2xl h-[350px] md:h-[370px] flex-col justify-center items-center md:justify-start overflow-hidden relative"
    >
      {product?.banner && (
        <Image
          src={product?.banner?.url}
          alt="prudct-title"
          className="rounded-lg w-full h-full object-cover"
          fill
        />
      )}
    </motion.div>
  );
};

export default ProductImage;
