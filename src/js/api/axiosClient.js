import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api-vip.onrender.com",
});

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
