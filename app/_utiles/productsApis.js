const { default: axiosClient } = require("./axiosClient");

const getLatestProducts = (productsCount) =>
  axiosClient.get(
    `/products?sort=createdAt:desc&pagination[limit]=${productsCount}&populate=*`
  );

const getAllProducts = () => axiosClient.get("/products?populate=*");

const getProductById = (id) =>
  axiosClient.get(`/products?filters[id][$eq]=${id}&populate=*`);

const getProductByCategory = (category) =>
  axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);

export default { getLatestProducts, getProductById, getProductByCategory, getAllProducts };
