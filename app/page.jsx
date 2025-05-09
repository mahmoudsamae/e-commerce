import Hero from "./_components/Hero";
import ProductSection from "./_components/ProductSection";

export const metadata = {
  title: "E-commerce  - Home",
  icons: {
    icon: "/titleIcon.svg", // or use .png or multiple sizes if needed
  },
};
export default function Home() {
  return (
    <div >
      <Hero />
      <ProductSection />
    </div>
  );
}
