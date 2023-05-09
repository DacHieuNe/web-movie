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
  handleOpenModal,
  handleCloseModal,
  handlePushURL,
  handleSignOut,
} from "@/js/utils";
import { handleUploadUserToUI } from "./utils/uploadData";

(async () => {
  await handleAuthen("movie-detail");
  handleUploadUserToUI(".header__name", ".header__email", ".header__role");
  const data = localStorage.getItem("datas");
  if (!data) return;

  handleMouseEvent("mouse");
  handleChangeTheme("#button__theme");
  handleOpenModal("#btn-header-menu", ".modal--secondary");
  handleCloseModal(
    "#btn-modal-reject",
    "#btn-header-menu",
    ".modal--secondary"
  );
  handleCloseModal(".modal__overlay", "#btn-header-menu", ".modal--secondary");
  handleScrollEffect("scroll-top");
  handleScrollTop("#btn-scroll-top");

  const { all: dataAll } = JSON.parse(data);

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
  handleCloseResultSearch("#btn-close-search", ".header__result");
  handleLoadingPage("loader");
  handleSignOut(".btn__signout");
})();
