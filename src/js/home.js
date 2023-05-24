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
  handleConnectNetwork,
  handleScrollEffect,
  handleScrollTop,
  handleRefreshPage,
  handleDefaultScroll,
  handleRedirectURLMovie,
  handleOptionMenu,
  handlePushURL,
  paramScroll,
  handleRemoveDataLocalStorage,
  handleClickDocument,
} from "@/js/utils";

(async () => {
  await handleAuthen("home");
  const url = new URL(window.location);
  const { pathname } = url;
  if (pathname != "/") {
    const data = localStorage.getItem("datas");
    if (!data) return;

    const { "all-movie": dataAllMovie, "all-story": dataAllStory } =
      JSON.parse(data);

    const dataNews = dataAllMovie.filter((item) => item.article == "news");
    const dataSlides = dataAllMovie.filter((item) => item.article == "slides");
    const dataTodays = dataAllMovie.filter((item) => item.article == "todays");
    const dataStorys = dataAllStory.filter((item) => item.article == "storys");

    handleUploadListToUI(".slide__wrap", dataSlides, "slides");
    handleUploadListToUI(".movie__wrap", dataNews, "news");
    handleUploadListToUI(".today__wrap", dataTodays, "todays");
    handleUploadListToUI(".manga__wrap", dataStorys, "storys");

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
    paramScroll.length = dataSlides.length;
    handleSlideMain();

    handleRedirectURLMovie(".movie__wrap", "movie");
    handleRedirectURLMovie(".today__wrap", "today");
    handleRedirectURLMovie(".slide__wrap", "slide");
    handleRedirectURLMovie(".manga__wrap", "story");

    // Share code between pages
    setTimeout(() => {
      handleUploadUserToUI(".header__name", ".header__email", ".header__role");
      const skeletonList = document.querySelectorAll(".loading-skeleton");
      if (!skeletonList) return;
      skeletonList.forEach((item) => {
        item.classList.add("active");
      });
    }, 2200);
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
    handleMouseEvent("mouse");
    handleUploadSearchMovie(
      "#btn-search",
      "#input-search",
      ".header__result",
      ".header__noresult",
      ".header__result-list",
      dataAllMovie
    );
    handleCloseResultSearch("#btn-close-search", ".header__result");
    handleRemoveDataLocalStorage(".btn__data");
    handleRemoveDataLocalStorage("#option-data");
    handleChangeTheme({
      element: "#button__theme",
      location: "",
    });
    handleScrollEffect({
      element: "#circle",
      value: handleDefaultScroll(),
    });
    handleOptionMenu({
      click: "#option-click",
      top: {
        selector: "#option-top",
        class: "active",
      },
      home: {
        selector: "#option-home",
        class: "active",
      },
      data: {
        selector: "#option-data",
        class: "active",
      },
      effect: {
        selector: ".menu",
        class: "active",
      },
    });
    handleClickDocument("detail");
    handleScrollTop("#option-top");
    handleRefreshPage("#option-home");
    handleSignOut(".btn__signout");
    handleLoadingPage("loader");
    handleConnectNetwork("#alert-success", "#alert-fail");
  }
})();
