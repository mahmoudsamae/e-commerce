import * as React from "react";

const EmailTemplate = ({ fullName, amount, products }) => {
  return (
    <section className="my-[16px] justify-center items-center">
      <div className="mt-[32px] text-center flex flex-col gap-4 justify-center items-center">

        {products?.map((item) => (
          <h1 className="text-[36px] font-semibold leading-[40px] tracking-[0.4px] text-gray-900">
            {item?.products[0]?.title}
          </h1>
        ))}
        <p className="mt-[8px] text-[16px] leading-[24px] text-gray-500">
          Thank you for your purchase! Your order includes high-quality items
          carefully selected from our collection. We're confident you'll love
          these products that combine style, functionality and exceptional
          craftsmanship.
        </p>
        <h2 className="text-[16px] font-semibold leading-[24px] text-gray-900">
          ${amount}
        </h2>
        <h2 className="text-[16px] font-semibold leading-[24px] text-gray-900">
          {fullName}
        </h2>
      </div>
    </section>
  );
};

export default EmailTemplate;
