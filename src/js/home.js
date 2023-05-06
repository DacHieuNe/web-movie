import {
  handleAuthen,
  handleLoadingPage,
  handleUploadUserToUI,
  handleSignOut,
  handleSlideMain,
  handleUploadListToUI,
  handleChangeTheme,
  handleOpenModal,
  handleCloseModal,
  handleMouseEvent,
  paramScroll,
} from "@/js/utils";
// import { paramScroll } from "./utils/constant";

(async () => {
  await handleAuthen("home");
  const url = new URL(window.location);
  const { pathname } = url;
  if (pathname != "/") {
    // handleLoadingPage("loader");
    handleUploadUserToUI(".header__name", ".header__email", ".header__role");

    // fetch data movie slide

    const data = localStorage.getItem("datas");
    if (!data) return;

    const {
      slide: dataSlide,
      new: dataMovieNew,
      anime: dataAnime,
      today: dataToday,
    } = JSON.parse(data);
    handleUploadListToUI(".slide__wrap", dataSlide, "slide");
    handleUploadListToUI(".movie__wrap", dataMovieNew, "new-movie");
    handleUploadListToUI(".manga__wrap", dataAnime, "story");
    handleUploadListToUI(".today__wrap", dataToday, "today");

    paramScroll.length = dataSlide.length;
    handleSlideMain();

    $(document).ready(function () {
      $(".today__wrap").slick({
        arrows: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
        ],
      });
    });
    handleMouseEvent("mouse");
    handleChangeTheme("#button__theme", "#2c3e50");
    handleOpenModal("#btn-header-menu", ".modal--secondary");
    handleCloseModal(
      "#btn-modal-reject",
      "#btn-header-menu",
      ".modal--secondary"
    );
    handleCloseModal(
      ".modal__overlay",
      "#btn-header-menu",
      ".modal--secondary"
    );
    handleSignOut(".btn__signout");
    handleLoadingPage("loader");
  }
})();
