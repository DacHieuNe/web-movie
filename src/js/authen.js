import {
  handleSubmitForm,
  handlePushURL,
  handleRedirectPage,
  handleMouseEvent,
  handleTogglePassword,
  handleConnectNetwork,
  handleAuthen,
} from "@/js/utils";

(async () => {
  await handleAuthen("index");
  handlePushURL("/sign-up");
  handleRedirectPage(
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
  handleConnectNetwork("#alert-success", "#alert-fail");
})();
