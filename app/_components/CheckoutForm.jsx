import { useContext, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CartContext } from "../_context/CartProvider";
import { useUser } from "@clerk/nextjs";
import ordersApis from "../_utiles/ordersApis";
import { useSearchParams } from "next/navigation";
import cartApis from "../_utiles/cartApis";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const CheckoutForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    createOrder();
    

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to my payment completion page
        return_url: `http://localhost:3000`,
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      router.push("/thankful");
      toast.success("Payment successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: localStorage.getItem("theme") === "dark" ? "dark" : "light"
      });
    }

    setIsLoading(false);
  };

  const sendEmail = async () => {
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      name: user?.fullName,
      amount: Number(amount),
      products: cart?.data,
    };
    await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const createOrder = () => {
    const productIds = cart?.data?.map((item) => item?.products[0]?.id);
    const data = {
      data: {
        email: user?.primaryEmailAddress?.emailAddress,
        username: user?.fullName,
        amount: Number(amount),
        products: productIds,
      },
    };
    sendEmail();
    ordersApis.createOrder(data).then((res) => {
      if (res) {
        cart?.data?.forEach((item) => {
          cartApis.deleteProductFormCart(item?.documentId);
        });
        setCart([]);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button
          disabled={isLoading || !stripe || !elements}
          type="submit"
          className="w-full bg-primary text-white py-3 cursor-pointer px-6 rounded-lg font-medium hover:bg-hover disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {isLoading ? "Processing..." : "Pay now"}
        </button>
        {errorMessage && (
          <div className="text-red-500 mt-2">{errorMessage}</div>
        )}
      </form>
    </>
  );
};

export default CheckoutForm;
