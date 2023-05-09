import axiosClient from "./axiosClient";

const allApi = {
  getAll(token) {
    const url = "/api/all";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default allApi;
