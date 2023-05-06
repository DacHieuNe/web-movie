import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const handleToggleActive = (selector) => {
  const element = document.querySelector(selector);
  if (!element) return;

  element.classList.toggle("active");
};
export const handleInnerHTML = (parent, child, text) => {
  const element = parent.querySelector(child);
  if (!element) return;

  element.innerHTML = text;
};
export const handleHookDisable = (parent, selector, mode = "on") => {
  const element = parent.querySelector(selector);
  if (!element) return;

  mode == "on"
    ? element.classList.add("disabled")
    : element.classList.remove("disabled");
};

export const showToastSuccess = (message = "Register success !") => {
  Toastify({
    text: message,
    duration: 4000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: false,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
      width: "280px",
      height: "60px",
      borderRadius: "10px",
      fontFamily: "SVN-Avobold, sans-serif",
      fontSize: "1.7rem",
      fontWeight: "600",
      background: "#27ce81",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};
export const showToastError = (message = "Register error !") => {
  Toastify({
    text: message,
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: false,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
      width: "280px",
      height: "60px",
      borderRadius: "10px",
      fontFamily: "SVN-Avobold, sans-serif",
      fontSize: "1.7rem",
      fontWeight: "600",
      background: "#d10808",
    },
  }).showToast();
};
export const handlePushURL = (url) => {
  history.pushState({}, "", url);
};
export const handleRedirectURL = (
  parentFirst,
  childFirst,
  parentSecond,
  childSecond
) => {
  const parentFirstElement = document.getElementById(parentFirst);
  if (!parentFirstElement) return;

  const childFirstElement = document.getElementById(childFirst);
  if (!childFirstElement) return;

  const parentSecondElement = document.getElementById(parentSecond);
  if (!parentSecondElement) return;

  const childSecondElement = document.getElementById(childSecond);
  if (!childSecondElement) return;

  childFirstElement.addEventListener("click", (e) => {
    e.preventDefault();
    handlePushURL("/sign-in");
    parentFirstElement.hidden = true;
    parentSecondElement.hidden = false;
  });
  childSecondElement.addEventListener("click", (e) => {
    e.preventDefault();
    handlePushURL("/sign-up");
    parentFirstElement.hidden = false;
    parentSecondElement.hidden = true;
  });
};
export const handleMouseEvent = (selectorMouse) => {
  const mouseElement = document.getElementById(selectorMouse);
  if (!mouseElement) return;

  document.addEventListener("mousemove", (e) => {
    mouseElement.style.left = e.pageX - 30 + "px";
    mouseElement.style.top = e.pageY + "px";
  });
};
export const handleLoadingPage = (selectorLoad) => {
  const loaderElement = document.getElementById(selectorLoad);
  if (!loaderElement) return;

  loaderElement.style.display = "none";
  // window.addEventListener("load", () => {
  //   loaderElement.style.display = "none";
  // });
};

export const handleChangeTheme = (selector) => {
  const element = document.querySelector(selector);
  if (!element) return;

  const header = document.querySelector(".header");
  if (!header) return;

  const footerHeader = document.querySelector(".footer__header");
  if (!footerHeader) return;

  const footerMain = document.querySelector(".footer__main");
  if (!footerMain) return;

  const buttonMenu = document.querySelector(".btn__menu");
  if (!buttonMenu) return;

  element.addEventListener("click", () => {
    if (document.body.dataset.theme == "light") {
      header.style.backgroundColor = "#070720";
      header.style.color = "#fff";

      footerHeader.style.backgroundColor = "#6452ce";
      footerMain.style.backgroundColor = "#1d2331";
      footerMain.style.color = "#fff";

      buttonMenu.style.color = "#fff";

      document.body.style.backgroundColor = "#0b0c2a";
      document.body.dataset.theme = "dark";
    } else {
      header.style.backgroundColor = "#fff";
      header.style.color = "#000";

      footerHeader.style.backgroundColor = "#21d191";
      footerMain.style.backgroundColor = "#ecf0f3";
      footerMain.style.color = "#000";

      buttonMenu.style.color = "#000";

      document.body.style.backgroundColor = "#fff";
      document.body.dataset.theme = "light";
    }
  });
};
export const handleRemoveDataLocalStorage = (selectorButton) => {
  const buttonElement = document.querySelector(selectorButton);
  if (!buttonElement) return;

  buttonElement.addEventListener("click", () => {
    if (localStorage.getItem("datas")) {
      localStorage.removeItem("datas");
    }
  });
};
