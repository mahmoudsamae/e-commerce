"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
const Footer = () => {
  const pathname = usePathname();

  return (
    <>
      {!pathname.includes("sign-in") && !pathname.includes("sign-up") && (
        <footer className="fixed bottom-0 bg-white w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)] dark:shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.1)] dark:bg-gray-900">
          <div className="relative mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
            <ul className=" flex justify-start gap-2 md:gap-8 lg:mt-0 lg:gap-8">
              {links?.map((link) => (
                <li key={link.id}>
                  <Link
                    className="text-gray-700 text-[12px] sm:text-[14px] transition hover:text-gray-700/75 dark:text-gray-300 dark:hover:text-white/75"
                    href={link.path}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            <p className=" text-right text-[10px] sm:text-sm text-gray-500 lg:text-right dark:text-gray-400">
              Copyright &copy; 2022. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
