import { MAIN_API } from "../env";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { clearDataInStorage } from "../redux/Counter";

function userSignUp(data) {
  return axios.post(`${MAIN_API}users`, data);
}
function loginUser(data) {
  return axios.post(`${MAIN_API}auth`, data);
}
function isLoggedIn() {
  const data = localStorage.getItem("_token");
  if (data) {
    return true;
  }
  return false;
}
function getToken() {
  return localStorage.getItem("_token");
}
function getUser() {
  try {
    return jwt_decode(localStorage.getItem("_token"));
  } catch (ex) {
    return null;
  }
}
function isAdmin() {
  return !getUser() ? false : getUser().isAdmin;
}
function doLogout() {
  localStorage.removeItem("_token");
  //localStorage.removeItem("userdetails");
  clearDataInStorage();
  window.location = "/";
}

export {
  userSignUp,
  loginUser,
  isLoggedIn,
  getToken,
  isAdmin,
  getUser,
  doLogout
};
