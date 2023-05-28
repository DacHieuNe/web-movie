import {
  handleUploadUserToUI,
  handleOpenModal,
  handleCloseModal,
  handleMouseEvent,
  handleUploadSearchMovie,
  handleRemoveDataLocalStorage,
  handleChangeTheme,
  handleScrollEffect,
  handleOptionMenu,
  handleClickDocument,
  handleScrollTop,
  handleRefreshPage,
  handleSignOut,
  handleLoadingPage,
  handleConnectNetwork,
  handleDefaultScroll,
  handleUploadFullMovie,
} from "@/js/utils";

(() => {
  const data = localStorage.getItem("datas");
  if (!data) return;

  const { "all-movie": dataAllMovie } = JSON.parse(data);

  handleUploadFullMovie(dataAllMovie);
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
  // handleCloseResultSearch("#btn-close-search", ".header__result");
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
})();
