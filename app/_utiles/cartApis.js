const { default: axiosClient } = require("./axiosClient");

const addToCart = (payload) => axiosClient.post("/carts", payload);

const getCartProducts = (email) =>
  axiosClient.get(
    `/carts?populate[products][populate]=banner&filters[email][$eq]=${email}`
  );

const deleteProductFormCart = (documentId) => {
  return axiosClient.delete(`/carts/${documentId}`);
};



export default {
  addToCart,
  getCartProducts,
  deleteProductFormCart,
};
