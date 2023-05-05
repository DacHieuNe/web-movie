import axiosClient from "./axiosClient";

const movieNewApi = {
  getAll(token) {
    const url = "/api/news";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default movieNewApi;
