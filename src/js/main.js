import {
  handleDataToday,
  handleDataAnime,
  handleGetAccessToken,
  handleDataSlide,
  handleDataNewMovie,
  handleDataAll,
  handleAuthen,
  handlePushURL,
  handleMouseEvent,
  handleConnectNetwork,
  handleRedirectFacebookV1,
} from "@/js/utils";

(async () => {
  handlePushURL("/");
  handleMouseEvent("mouse");
  handleConnectNetwork("#alert-success", "#alert-fail");
  handleRedirectFacebookV1(
    ".link__button",
    "https://www.facebook.com/DacHieuNe.Hihi1/"
  );
  await handleAuthen("main");
  const token = await handleGetAccessToken();

  // fetch data movie slide
  const dataSlide = await handleDataSlide(token);

  // fetch data movie new
  const dataMovieNew = await handleDataNewMovie(token);

  // fetch data anime
  const dataAnime = await handleDataAnime(token);

  const dataToday = await handleDataToday(token);

  const dataAll = await handleDataAll(token);

  localStorage.setItem(
    "datas",
    JSON.stringify({
      all: dataAll,
      slides: dataSlide,
      news: dataMovieNew,
      storys: dataAnime,
      todays: dataToday,
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
