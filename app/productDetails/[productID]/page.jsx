"use client";
import productsApis from "../../_utiles/productsApis";
import React, { use, useEffect, useState } from "react";
import Breadcrumbs from "./components/Breadcrumbs";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import ProductsList from "../../_components/ProductsList";
import Skeleton from "../../_components/Skeleton";

const page = ({ params }) => {
  let { productID } = use(params);
  const [product, setProduct] = useState({});
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getProductById_();
  }, [productID]);

  const getProductById_ = () => {
    productsApis.getProductById(productID).then((data) => {
      setProduct(data?.data?.data[0]);
      getProductByCategory(data?.data?.data[0]);
    });
  };

  const getProductByCategory = (product) => {
    productsApis.getProductByCategory(product?.category).then((data) => {
      setProductList(data?.data);
    });
  };

  return (
    <div className="dark:bg-gray-900">
      <div className="px-0 sm:px-10 dark:bg-gray-800 pt-4">
        <Breadcrumbs productID={productID} />
        {!product ? (
          <Skeleton />
        ) : (
          <div className="flex flex-col md:flex-row py-4 sm:py-6 sm:gap-2 ">
            <ProductImage product={product} />
            <ProductInfo product={product} />
          </div>
        )}
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-900 py-5 sm:px-20 px-4 mb-10">
        <h1 className="text-3xl font-bold my-3 dark:text-gray-300">
          Similar Product
        </h1>
        <ProductsList products={productList} />
      </div>
    </div>
  );
};

export default page;
