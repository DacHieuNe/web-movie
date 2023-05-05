import {
  handleSubmitForm,
  handlePushURL,
  handleRedirectURL,
  handleMouseEvent,
  handleLoadingPage,
  handleTogglePassword,
  handleAuthen,
} from "@/js/utils";

(() => {
  console.log("cc");
  handleAuthen("index");
  handleLoadingPage("loader");
  handlePushURL("/sign-up");
  handleRedirectURL(
    "modal__signup",
    "link-signup",
    "modal__signin",
    "link-signin"
  );
  handleTogglePassword(
    "#form-icon-1",
    "#eye-open-1",
    "#eye-close-1",
    "#password-1"
  );
  handleTogglePassword(
    "#form-icon-2",
    "#eye-open-2",
    "#eye-close-2",
    "#password-2"
  );
  handleMouseEvent("mouse");
  handleSubmitForm("modal__form-signup", "signup");
  handleSubmitForm("modal__form-signin", "signin");
})();
