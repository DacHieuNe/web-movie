import {
  handleDataToday,
  handleDataAnime,
  handleGetAccessToken,
  handleDataSlide,
  handleDataNewMovie,
  handleAuthen,
  handlePushURL,
  handleMouseEvent,
} from "@/js/utils";

(async () => {
  handlePushURL("/");
  handleMouseEvent("mouse");
  await handleAuthen("main");
  const token = await handleGetAccessToken();

  // fetch data movie slide
  const dataSlide = await handleDataSlide(token);

  // fetch data movie new
  const dataMovieNew = await handleDataNewMovie(token);

  // fetch data anime
  const dataAnime = await handleDataAnime(token);

  const dataToday = await handleDataToday(token);

  localStorage.setItem(
    "datas",
    JSON.stringify({
      slide: dataSlide,
      new: dataMovieNew,
      anime: dataAnime,
      today: dataToday,
    })
  );
  const localUser = localStorage.getItem("users");

  if (localUser) {
    window.location.assign(
      `/home.html?id=${JSON.parse(localUser).id}${Math.floor(
        Math.random() * 10 + 0
      )}`
    );
  } else {
    window.location.assign("/authen.html");
  }
})();
