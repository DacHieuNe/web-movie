import axiosClient from "./axiosClient";

const animeApi = {
  getAll(token) {
    const url = "/api/storys";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
export default animeApi;
