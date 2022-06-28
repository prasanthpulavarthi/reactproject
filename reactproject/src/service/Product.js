import { getToken } from "./Auth";
import axios from "axios";
import { MAIN_API } from "../env";

function addProduct(state) {
    return axios.post(`${MAIN_API}products`, state, {
      headers: { "x-auth-token": getToken() },
    });
  }
  function getProducts() {
    return axios.get(`${MAIN_API}products`);
  }
  function deleteProduct(id) {
    return axios.delete(`${MAIN_API}products/${id}`);
  }
  function getProductsbyId(id) {
    return axios.get(`${MAIN_API}products/${id}`);
  }
  function searchProducts(ser) {
    return axios.get(`${MAIN_API}products/${ser}`);
  }

  export {
    addProduct,
    getProducts,
    getProductsbyId,
    deleteProduct,
    searchProducts
  };
  