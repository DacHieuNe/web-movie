import axiosClient from "./axiosClient";

const allStoryApi = {
  getAll(token) {
    const url = "/api/all-story";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default allStoryApi;
