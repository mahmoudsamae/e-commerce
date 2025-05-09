"use client";
import { createContext, useEffect, useState } from "react";
import cartApis from "../_utiles/cartApis";
import { useUser } from "@clerk/nextjs";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const email = user.emailAddresses[0]?.emailAddress;
      if (email) {
        getCartProducts_(email);
      }
    }
  }, [isLoaded, isSignedIn]);

  const getCartProducts_ = (email) => {
    cartApis.getCartProducts(email).then((res) => setCart(res.data));
  };

  const addToCart_ = (data) => {
    const email = user?.emailAddresses[0]?.emailAddress;
    cartApis.addToCart(data).then(() => {
      if (email) {
        getCartProducts_(email);
      }
    });
  };
  return (
    <CartContext.Provider value={{ cart, addToCart_, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
