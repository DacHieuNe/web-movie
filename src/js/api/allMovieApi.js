import axiosClient from "./axiosClient";

const allMovieApi = {
  getAll(token) {
    const url = "/api/all-movie";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default allMovieApi;
