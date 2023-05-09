import {
  handleAuthen,
  handleLoadingPage,
  handleMouseEvent,
  handleChangeTheme,
  handleScrollEffect,
  handleScrollTop,
  handleUploadSearchMovie,
  handleCloseResultSearch,
  handleUploadDetailMovie,
  handleRemoveDataLocalStorage,
  handleToggleActiveAdvance,
  handleUploadListToUI,
  handleUploadUserToUI,
  handleDefaultScroll,
  handleOpenModal,
  handleCloseModal,
  handlePushURL,
  handleSignOut,
} from "@/js/utils";

(async () => {
  await handleAuthen("movie-detail");
  handleUploadUserToUI(".header__name", ".header__email", ".header__role");
  const data = localStorage.getItem("datas");
  if (!data) return;

  handleMouseEvent("mouse");
  handleChangeTheme({
    element: "#button__theme",
    location: "detail",
  });
  handleOpenModal("#btn-header-menu", ".modal--secondary");
  handleCloseModal(
    "#btn-modal-reject",
    "#btn-header-menu",
    ".modal--secondary"
  );
  handleCloseModal(".modal__overlay", "#btn-header-menu", ".modal--secondary");
  handleScrollTop("#btn-scroll-top");

  const {
    all: dataAll,
    storys: dataAnime,
    todays: dataToday,
  } = JSON.parse(data);

  handleUploadListToUI(".manga__wrap", dataAnime, "story");
  handleUploadListToUI(".today__wrap", dataToday, "today");

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
  handleUploadSearchMovie(
    "#btn-search",
    "#input-search",
    ".header__result",
    ".header__noresult",
    ".header__result-list",
    dataAll
  );
  handleUploadDetailMovie();
  handlePushURL("/detail");
  handleRemoveDataLocalStorage(".btn__data");
  handleCloseResultSearch("#btn-close-search", ".header__result");
  handleScrollEffect({
    element: "#scroll-top",
    value: handleDefaultScroll(),
  });
  handleToggleActiveAdvance("#playlist-title-1", "#playlist-title-2");
  handleSignOut(".btn__signout");
  handleLoadingPage("loader");
})();
