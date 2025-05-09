import Link from 'next/link'
import { CheckCircle2Icon } from 'lucide-react';

export const metadata = {
  title: "E-commerce - Congratulation"
}
const page = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
      <div className="text-center p-4 bg-green-100 rounded-lg w-full min-h-[calc(100vh-100px)] flex flex-col justify-center items-center">
        <CheckCircle2Icon className="w-24 h-24 text-green-600" />
        <h2 className="text-2xl font-bold text-green-700">Thank You!</h2>
        <p className="mt-2">Your payment was successful.</p>
        <Link href="/" className="mt-4 inline-block px-6 py-3 text-sm font-medium text-white bg-primary rounded-md hover:bg-hover transition duration-300 shadow-md hover:shadow-lg">
          Go Shopping
        </Link>
      </div>
    </div>
  );
}

export default page