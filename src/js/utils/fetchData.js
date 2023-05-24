import userApi from "@/js/api/userApi";
import allStoryApi from "@/js/api/allStoryApi";
import allMovieApi from "@/js/api/allMovieApi";

export const handleGetAccessToken = async () => {
  try {
    const dataAccessToken = await userApi.addNewToken();
    return dataAccessToken.access_token;
  } catch (error) {
    console.log("Get access token error");
  }
  return null;
};
// export const handleDataSlide = async (token) => {
//   try {
//     const data = await slideApi.getAllSlide(token);
//     return data;
//   } catch (error) {
//     console.log("Get data slide error");
//     console.log("error", error);
//   }
//   return null;
// };
// export const handleDataNewMovie = async (token) => {
//   try {
//     const data = await movieNewApi.getAll(token);
//     return data;
//   } catch (error) {
//     console.log("error", error);
//   }
//   return null;
// };
// export const handleDataAnime = async (token) => {
//   try {
//     const data = await animeApi.getAll(token);
//     return data;
//   } catch (error) {
//     console.log("error", error);
//   }
//   return null;
// };
// export const handleDataToday = async (token) => {
//   try {
//     const data = await todayApi.getAll(token);
//     return data;
//   } catch (error) {
//     console.log("error", error);
//   }
//   return null;
// };
export const handleDataAllMovie = async (token) => {
  try {
    const data = await allMovieApi.getAll(token);
    return data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
export const handleDataAllStory = async (token) => {
  try {
    const data = await allStoryApi.getAll(token);
    return data;
  } catch (error) {
    console.log("Get data slide error");
    console.log("error", error);
  }
  return null;
};
