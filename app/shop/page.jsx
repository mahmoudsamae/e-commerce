"use client"
import React, { useEffect, useState } from 'react'
import ProductsList from '../_components/ProductsList'
import productsApis from '../_utiles/productsApis';

const categories = [
  {
    id: 1,
    name: "All",
    value: "all",
  },
  {
    id: 2,
    name: "Clothes",
    value: "clothes",
  },
  {
    id: 3,
    name: "Jewelry",
    value: "jewelry",
  },
  {
    id: 4,
    name: "Accessories",
    value: "accessories",
  },
];

const page = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    getAllProducts_()
  }, [category]);


  const getAllProducts_ = () => {
    if (category === "all") {
      productsApis.getAllProducts().then(data => setProducts(data?.data));
    }else {
      productsApis.getProductByCategory(category).then(data => setProducts(data?.data));
    }
  }
  return (
    <div className="bg-gray-200 w-full min-h-[calc(100vh-100px)] px-[20px] sm:px-[40px] pb-[40px] m-auto mb-[30px] dark:bg-gray-900">
      <div className='flex justify-center items-center gap-2'>
        {categories?.map(item => (
          <button key={item?.id} className={`p-2 w-[100px] cursor-pointer my-5 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ${category === item?.value ? "bg-primary text-white dark:bg-primary" : "bg-white dark:bg-gray-800"}`} onClick={() => setCategory(item?.value)}>{item?.name}</button>
        ))}

      </div>
      <ProductsList products={products} />
    </div>
  )
}

export default page