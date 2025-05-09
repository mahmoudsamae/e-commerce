const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL;

const axiosClient = axios.create({
  baseURL: apiURL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});
export default axiosClient;