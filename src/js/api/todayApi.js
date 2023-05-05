import axiosClient from "./axiosClient";

const todayApi = {
  getAll(token) {
    const url = "/api/todays";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default todayApi;
