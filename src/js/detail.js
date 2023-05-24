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
  handleEmotionAmount,
  handleConnectNetwork,
  handleRemoveDataLocalStorage,
  handleClickEmotionAmount,
  handleOptionMenu,
  handleRefreshPage,
  handleUploadListToUI,
  handleUploadUserToUI,
  handleDefaultScroll,
  handleOpenModal,
  handleCloseModal,
  handlePushURL,
  handleSignOut,
  handleCommentUser,
  handleUploadCommentUser,
  handleRedirectPageV2,
  getIdAndArticleFromSearchParams,
  // handleRemoveComment,
} from "@/js/utils";

(async () => {
  await handleAuthen("movie-detail");

  const data = localStorage.getItem("datas");
  if (!data) return;

  const { "all-movie": dataAllMovie } = JSON.parse(data);

  const dataTodays = dataAllMovie.filter((item) => item.article == "todays");
  // handleUploadListToUI(".manga__wrap", dataAnime, "story");
  handleUploadListToUI(".today__wrap", dataTodays, "todays");

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
  const { id, article } = getIdAndArticleFromSearchParams();

  handleUploadDetailMovie(
    {
      id,
      article,
    },
    dataAllMovie
  );
  handleCommentUser(
    {
      click: "#form-comment",
      input: "#input-comment",
    },
    id
  );
  handleUploadCommentUser(".playlist__list", id);
  handleEmotionAmount("#live-love", id, "heart");
  handleClickEmotionAmount(".live__emotion--primary", id, "heart");
  handleEmotionAmount("#live-follower", id, "follower");
  handleClickEmotionAmount(".live__emotion--secondary", id, "follower");
  // handlePushURL("/detail");
  handleRedirectPageV2(
    "#playlist-page-1",
    "#playlist-title-1",
    "#playlist-page-2",
    "#playlist-title-2"
  );

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
  handleCloseModal(".modal__overlay", "#btn-header-menu", ".modal--secondary");
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
  handleScrollTop("#option-top");
  handleRefreshPage("#option-home");
  handleSignOut(".btn__signout");
  handleLoadingPage("loader");
  handleConnectNetwork("#alert-success", "#alert-fail");
})();
