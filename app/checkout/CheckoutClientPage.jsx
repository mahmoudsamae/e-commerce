
// app/checkout/page.tsx
import { Suspense } from "react";
import CheckoutForm from "../_components/CheckoutForm"
export default function CheckoutClientPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutForm />
      <h1>hello</h1>
    </Suspense>
  );
}
