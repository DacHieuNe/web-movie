import axiosClient from "./axiosClient";

const userApi = {
  addNewToken() {
    const url = "/auth/login";
    return axiosClient.post(url, {
      email: "admin",
      password: "hieudz",
    });
  },
};

export default userApi;
