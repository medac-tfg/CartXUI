import axios from "axios";

const API_URL = process.env.API_URL;
const CART_ID = process.env.CART_ID;
const CART_TOKEN = process.env.CART_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    // Get the cart ID
    if (CART_ID) {
      // Set the cart ID for the request
      config.headers.cartid = CART_ID;
    }

    // Get the cart access token
    if (CART_TOKEN) {
      // Set the authorization header for the request
      config.headers.Authorization = `Bearer ${CART_TOKEN}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Log out (No access token or invalid access token)
      console.log("Error 401");
    }
    return Promise.reject(error);
  }
);

export default api;
