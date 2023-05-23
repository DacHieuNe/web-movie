import {
  handleGetAccessToken,
  handleDataAllMovie,
  handleDataAllStory,
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

  // get token
  const token = await handleGetAccessToken();
  // get data all story
  const dataAllStory = await handleDataAllStory(token);
  // get data all movie
  const dataAllMovie = await handleDataAllMovie(token);

  localStorage.setItem(
    "datas",
    JSON.stringify({
      "all-movie": dataAllMovie,
      "all-story": dataAllStory,
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
