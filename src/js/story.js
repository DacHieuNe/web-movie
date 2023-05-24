import {
  handleAuthen,
  handleConnectNetwork,
  handleLoadingPage,
  handleSignOut,
  handleRefreshPage,
  handleScrollTop,
  handleOptionMenu,
  handleScrollEffect,
  handleCloseResultSearch,
  handleChangeTheme,
  handleRemoveDataLocalStorage,
  handleDefaultScroll,
  handleUploadSearchMovie,
  handleMouseEvent,
  handleCloseModal,
  handleOpenModal,
  handleUploadUserToUI,
  handleUploadDetailManga,
  getIdAndTypeFromSearchParams,
  handleEmotionAmount,
  handleClickEmotionAmount,
} from "@/js/utils";

(async () => {
  await handleAuthen("movie-detail");

  // Get key datas from local storage
  const data = localStorage.getItem("datas");
  if (!data) return;

  // get list story and list all
  const { "all-story": dataAllStory, "all-movie": dataAllMovie } =
    JSON.parse(data);

  // get item base on id URL
  const { id } = getIdAndTypeFromSearchParams();
  const dataFilter = dataAllStory.find((item) => item.id == id);
  handleUploadDetailManga(dataFilter);

  handleEmotionAmount("#love > span", id, "heart");
  handleClickEmotionAmount("#love", id, "heart");
  handleEmotionAmount("#follower > span", id, "follower");
  handleClickEmotionAmount("#follower", id, "follower");

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
    dataAllStory,
    "story"
  );
  handleCloseResultSearch("#btn-close-search", ".header__result");
  handleRemoveDataLocalStorage(".btn__data");
  handleRemoveDataLocalStorage("#option-data");
  handleChangeTheme({
    element: "#button__theme",
    location: "chap-detail",
  });
  handleCloseResultSearch("#btn-close-search", ".header__result");
  setTimeout(() => {
    handleScrollEffect({
      element: "#circle",
      value: handleDefaultScroll(),
    });
  }, 500);
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
