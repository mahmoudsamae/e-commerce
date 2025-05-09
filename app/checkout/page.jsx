"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../_components/CheckoutForm";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="px-5 sm:px-[100px] m-auto pt-10 pb-15 min-h-screen dark:bg-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-xl dark:bg-gray-900">
          <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">Checkout</h2>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
        <div className="mb-5 sm:mb-0 bg-white p-5 rounded-xl dark:bg-gray-900">
          <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">Order Summary</h2>
          {/* Add order summary details here */}
          <div className="mt-6 grow sm:mt-8 lg:mt-0">
            <div className="space-y-4 rounded-lg border border-gray-300 bg-gray-50 p-6 dark:border-gray-400 dark:bg-gray-800">
              <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4 ">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-300">
                    Original price
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-gray-300">
                    ${amount}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-300">
                    Savings
                  </dt>
                  <dd className="text-base font-medium text-green-500 dark:text-gray-300">-$0.00</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">
                    Store Pickup
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-gray-300">
                    $0.00
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">
                    Tax
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-gray-300">
                    $0.00
                  </dd>
                </dl>
              </div>

              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt className="text-base font-bold text-gray-900 dark:text-gray-300">
                  Total
                </dt>
                <dd className="text-base font-bold text-gray-900 dark:text-gray-300">
                  ${amount}
                </dd>
              </dl>
            </div>
            <div className="mt-6 flex items-center justify-center gap-8">
              <img
                className="h-8 w-auto dark:hidden"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                alt=""
              />
              <img
                className="hidden h-8 w-auto dark:flex"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                alt=""
              />
              <img
                className="h-8 w-auto dark:hidden"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                alt=""
              />
              <img
                className="hidden h-8 w-auto dark:flex"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                alt=""
              />
              <img
                className="h-8 w-auto dark:hidden"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                alt=""
              />
              <img
                className="hidden h-8 w-auto dark:flex"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
