import axiosClient from "./axiosClient";

const animeApi = {
  getAll(token) {
    const url = "/api/story";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
export default animeApi;
