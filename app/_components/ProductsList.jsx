import Product from "./Product";
import { motion } from "framer-motion";
const ProductsList = ({ products }) => {
  return (
    <motion.div initial={{opacity: 0, y: 100}} animate={{opacity: 1, y: 0}} transition={{duration: 0.3, delay: 0.3}} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products?.data?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </motion.div>
  );
};

export default ProductsList;
