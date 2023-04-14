import {
  handleSlideButton,
  handleTimeSlide,
  handleGetAccessToken,
  handleAuthen,
  handleLoadingPage,
  handleUploadUserToUI,
} from "@/js/utils";
import { auth } from "@/firebase/firebaseConfig";

(async () => {
  await handleAuthen("home");
  const url = new URL(window.location);
  const { pathname } = url;
  if (pathname != "/") {
    handleLoadingPage("loader");
    handleUploadUserToUI(".header__name", ".header__email");
    const data = await handleGetAccessToken();
    handleSlideButton("slide__prev", "slide__wrap", "prev");
    handleSlideButton("slide__next", "slide__wrap", "next");
    handleTimeSlide(3000);
  }
})();
