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
} from "@/js/utils";

(async () => {
  await handleAuthen("movie-detail");

  const data = localStorage.getItem("datas");
  if (!data) return;

  const { all: dataAll } = JSON.parse(data);

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
    dataAll
  );
  handleCloseResultSearch("#btn-close-search", ".header__result");
  handleRemoveDataLocalStorage(".btn__data");
  handleRemoveDataLocalStorage("#option-data");
  handleChangeTheme({
    element: "#button__theme",
    location: "",
  });
  handleCloseResultSearch("#btn-close-search", ".header__result");
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
