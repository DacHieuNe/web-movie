import {
  handleSlideButton,
  handleTimeSlide,
  handleGetAccessToken,
  handleAuthen,
  handleLoadingPage,
  handleUploadUserToUI,
  handleSignOut,
  handleDataSlide,
  handleSlideMain,
  handleUploadToUI,
  handleDataAnime,
  handleDataNewMovie,
  handleDataToday,
  handleChangeTheme,
} from "@/js/utils";
import { paramScroll } from "./utils/constant";

(async () => {
  console.log(1);
  await handleAuthen("home");
  const url = new URL(window.location);
  const { pathname } = url;
  if (pathname != "/") {
    handleLoadingPage("loader");
    handleSignOut("header__btn");
    handleUploadUserToUI(".header__name", ".header__email", ".header__role");
    const token = await handleGetAccessToken();

    // fetch data movie slide
    const dataSlide = await handleDataSlide(token);
    handleUploadToUI(".slide__wrap", dataSlide, "slide");

    // fetch data movie new
    const dataMovieNew = await handleDataNewMovie(token);
    handleUploadToUI(".movie__wrap", dataMovieNew, "new-movie");

    // fetch data anime
    const dataAnime = await handleDataAnime(token);
    handleUploadToUI(".manga__wrap", dataAnime, "story");

    const dataToday = await handleDataToday(token);
    handleUploadToUI(".today__wrap", dataToday, "today");
    paramScroll.length = dataSlide.length;
    handleSlideMain();

    handleChangeTheme("#button__theme", "#2c3e50");
    $(document).ready(function () {
      $(".today__wrap").slick({
        arrows: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
      });
    });
  }
})();
