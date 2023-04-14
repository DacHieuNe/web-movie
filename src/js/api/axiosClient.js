import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api-vip.onrender.com",
});

export default axiosClient;
