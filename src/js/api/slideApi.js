import axiosClient from "./axiosClient";

const slideApi = {
  getAllSlide(token) {
    const url = "/api/slide";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default slideApi;
