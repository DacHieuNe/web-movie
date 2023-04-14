import {
  handleSubmitForm,
  handlePushURL,
  handleRedirectURL,
  handleMouseEvent,
  handleLoadingPage,
  handleAuthen,
} from "@/js/utils";

(() => {
  handleAuthen("index");
  handleLoadingPage("loader");
  handlePushURL("/sign-up");
  handleRedirectURL(
    "modal__signup",
    "link-signup",
    "modal__signin",
    "link-signin"
  );
  handleMouseEvent("mouse");
  handleSubmitForm("modal__form-signup", "signup");
  handleSubmitForm("modal__form-signin", "signin");
})();
