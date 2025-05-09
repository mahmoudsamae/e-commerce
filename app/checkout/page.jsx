import CheckoutClientWrapper from "./CheckoutClientWapper"

export default function CheckoutPage({ searchParams }) {
  const amount = searchParams.amount;

  return <CheckoutClientWrapper amount={amount} />;
}
