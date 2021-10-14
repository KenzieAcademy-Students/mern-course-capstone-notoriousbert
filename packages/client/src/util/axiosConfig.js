import axios from "axios";
import { toast } from "react-toastify";

const getUserToken = () => {
  const savedUser = JSON.parse(localStorage.getItem("MernAppUser"));
  return savedUser ? savedUser.token : "";
};

// configure axios instance
const instance = axios.create({

  // url: "api/",
  // baseURL: `http://localhost:3000/api/`,
  baseURL: `https://kibbles-and-ritz.herokuapp.com/api`,
});


instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.common["Authorization"] = getUserToken();

instance.interceptors.request.use(
  function (config) {
    const token = getUserToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export const setAuthToken = (token) => {
  if (token) {
    //applying token
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    //deleting the token from header
    delete instance.defaults.headers.common["Authorization"];
  }
};

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      toast.error("Unauthorized");
    }
    if (error.response.status === 500) {
      toast.error("500 Server Error");
    }
    return Promise.reject(error);
  }
);

export default instance;
