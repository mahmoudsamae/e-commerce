"use client";
import React, { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import productsApis from "../_utiles/productsApis";
import Link from "next/link";

const ProductSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts_();
  }, []);

  const getAllProducts_ = () => {
    productsApis.getLatestProducts(8).then((data) => {
      setProducts(data?.data);
    });
  };
  return (
    <div className="bg-gray-200 dark:bg-gray-900 w-full p-[20px] sm:p-[40px] m-auto mb-2">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-300 mb-4">Latest Products</h1>
      <ProductsList products={products} />
      <div className="flex justify-center mt-6 mb-4">
        <Link 
          href="/shop"
          className="px-6 py-3 mb-7 sm:mb-3 text-sm font-medium text-white bg-primary rounded-md hover:bg-hover transition duration-300 shadow-md hover:shadow-lg"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductSection;
