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
  handleUploadSearchMovie,
  handleCloseResultSearch,
  handleScrollEffect,
  handleScrollTop,
  handleDefaultScroll,
  handleRedirectURLMovie,
  handlePushURL,
  paramScroll,
  handleRemoveDataLocalStorage,
} from "@/js/utils";

(async () => {
  await handleAuthen("home");
  const url = new URL(window.location);
  const { pathname } = url;
  if (pathname != "/") {
    // handleLoadingPage("loader");
    setTimeout(() => {
      handleUploadUserToUI(".header__name", ".header__email", ".header__role");
    }, 2200);
    // handleUploadUserToUI(".header__name", ".header__email", ".header__role");
    // fetch data movie slide

    const data = localStorage.getItem("datas");
    if (!data) return;

    const swiper = new Swiper(".today__container", {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 12,
      allowTouchMove: true,
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        576: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        768: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        992: {
          slidesPerView: 6,
          slidesPerGroup: 6,
        },
      },
    });
    const {
      all: dataAll,
      slides: dataSlide,
      news: dataMovieNew,
      storys: dataAnime,
      todays: dataToday,
    } = JSON.parse(data);
    handleUploadListToUI(".slide__wrap", dataSlide, "slide");
    handleUploadListToUI(".movie__wrap", dataMovieNew, "new-movie");
    handleUploadListToUI(".manga__wrap", dataAnime, "story");
    handleUploadListToUI(".today__wrap", dataToday, "today");

    paramScroll.length = dataSlide.length;
    handleSlideMain();

    handleMouseEvent("mouse");
    handleChangeTheme({
      element: "#button__theme",
      location: "",
    });
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
    handleRemoveDataLocalStorage(".btn__data");
    handleScrollTop("#btn-scroll-top");
    handleUploadSearchMovie(
      "#btn-search",
      "#input-search",
      ".header__result",
      ".header__noresult",
      ".header__result-list",
      dataAll
    );
    handleCloseResultSearch("#btn-close-search", ".header__result");
    handleRedirectURLMovie(".movie__wrap");
    handleScrollEffect({
      element: "#scroll-top",
      value: handleDefaultScroll(),
    });
    handleSignOut(".btn__signout");
    handleLoadingPage("loader");
  }
})();
