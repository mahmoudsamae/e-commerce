import Link from "next/link";
import React from "react";

const Breadcrumbs = ({ productID }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex justify-center sm:block sm:justify-start"
    >
      <ol className="flex overflow-hidden rounded border-gray-300 bg-white dark:bg-gray-800 text-sm text-gray-700">
        <li>
          <Link
            href="/"
            className="block h-10 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 px-4 leading-10 transition-colors hover:text-gray-900 dark:hover:text-primary"
          >
            Home
          </Link>
        </li>

        <li className="relative flex items-center dark:text-gray-300">
          <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 dark:bg-gray-900 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>

          <a
            href="#"
            className="block h-10 pr-4 pl-6 leading-10 transition-colors hover:text-gray-900 dark:hover:text-primary"
          >
            Product Details
          </a>
        </li>
        <li className="relative flex items-center dark:text-gray-300">
          <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 dark:bg-gray-800 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>

          <a
            href="#"
            className="block h-10 bg-gray-100 dark:bg-gray-900 px-5 leading-10 transition-colors hover:text-gray-900 dark:hover:text-primary"
          >
            {productID}
          </a>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
