import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { circumference } from "./constant";

export const handleToggleActive = (selector, className = "active") => {
  const element = document.querySelector(selector);
  if (!element) return;

  element.classList.toggle(className);
};
export const handleToggleActiveAdvance = (selectorFirst, selectorTwo) => {
  const firstElement = document.querySelector(selectorFirst);
  if (!firstElement) return;

  const secondElement = document.querySelector(selectorTwo);
  if (!secondElement) return;

  firstElement.addEventListener("click", () => {
    firstElement.classList.add("active");
    secondElement.classList.remove("active");
  });
  secondElement.addEventListener("click", () => {
    secondElement.classList.add("active");
    firstElement.classList.remove("active");
  });
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
export const handleRedirectPage = (
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

export const handleChangeTheme = (type) => {
  const element = document.querySelector(type.element);
  if (!element) return;

  const header = document.querySelector(".header");
  if (!header) return;

  const footerHeader = document.querySelector(".footer__header");
  if (!footerHeader) return;

  const footerMain = document.querySelector(".footer__main");
  if (!footerMain) return;

  const buttonMenu = document.querySelector(".btn__menu");
  if (!buttonMenu) return;

  const resultElement = document.querySelector(".header__result");
  if (!resultElement) return;

  element.addEventListener("click", () => {
    if (document.body.dataset.theme == "light") {
      header.style.backgroundColor = "#070720";
      header.style.color = "#fff";

      footerHeader.style.backgroundColor = "#6452ce";
      footerMain.style.backgroundColor = "#1d2331";
      footerMain.style.color = "#fff";

      buttonMenu.style.color = "#fff";

      resultElement.style.setProperty("--bg-color", "#000");
      resultElement.style.setProperty("--color", "#fff");

      document.body.style.backgroundColor = "#0b0c2a";
      document.body.dataset.theme = "dark";
      if (type.location == "detail") {
        const playlistElement = document.querySelector(".playlist");
        if (!playlistElement) return;
        playlistElement.style.setProperty("--text", "#fff");

        const infoElement = document.querySelector(".info");
        if (!infoElement) return;
        infoElement.style.setProperty("--text", "#fff");

        const liveElement = document.querySelector(".live");
        if (!liveElement) return;
        liveElement.style.setProperty("--text", "#fff");
      }
    } else {
      header.style.backgroundColor = "#fff";
      header.style.color = "#000";

      footerHeader.style.backgroundColor = "#21d191";
      footerMain.style.backgroundColor = "#ecf0f3";
      footerMain.style.color = "#000";

      buttonMenu.style.color = "#000";

      resultElement.style.setProperty("--bg-color", "#fff");
      resultElement.style.setProperty("--color", "#000");

      document.body.style.backgroundColor = "#fff";
      document.body.dataset.theme = "light";
      if (type.location == "detail") {
        const playlistElement = document.querySelector(".playlist");
        if (!playlistElement) return;
        playlistElement.style.setProperty("--text", "#000");

        const infoElement = document.querySelector(".info");
        if (!infoElement) return;
        infoElement.style.setProperty("--text", "#000");

        const liveElement = document.querySelector(".live");
        if (!liveElement) return;
        liveElement.style.setProperty("--text", "#000");
      }
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

export const handleScrollEffect = (type) => {
  window.addEventListener("scroll", () => {
    // switch (type.location) {
    //   case "home": {
    //     if (type.style == "scroll-top") {
    //       let percent = (document.documentElement.scrollTop * 100) / type.value;
    //       if (window.innerWidth < 576) {
    //         percent = (document.documentElement.scrollTop * 100) / 7017;
    //       } else if (window.innerWidth < 768) {
    //         percent = (document.documentElement.scrollTop * 100) / 2771;
    //       } else if (window.innerWidth < 992) {
    //         percent = (document.documentElement.scrollTop * 100) / 2319;
    //       }

    //       const element = document.getElementById(type.style);
    //       if (!element) return;

    //       const effectElement = document.querySelector(".action__top-effect");
    //       if (!effectElement) return;

    //       element.style.strokeDashoffset =
    //         circumference - (percent / 100) * circumference;

    //       // 152.088
    //       effectElement.style.setProperty(
    //         "--rotate",
    //         360 -
    //           ((circumference - (percent / 100) * circumference) * 360) / 157 +
    //           "deg"
    //       );
    //     }
    //     break;
    //   }
    //   case "detail": {
    //     console.log("alo");
    //     if (type.style == "scroll-top") {
    //       let percent = (document.documentElement.scrollTop * 100) / 1517;
    //       if (window.innerWidth < 576) {
    //         percent = (document.documentElement.scrollTop * 100) / 7017;
    //       } else if (window.innerWidth < 768) {
    //         percent = (document.documentElement.scrollTop * 100) / 2771;
    //       } else if (window.innerWidth < 992) {
    //         percent = (document.documentElement.scrollTop * 100) / 2319;
    //       }

    //       const element = document.getElementById(type.style);
    //       if (!element) return;

    //       const effectElement = document.querySelector(".action__top-effect");
    //       if (!effectElement) return;

    //       element.style.strokeDashoffset =
    //         circumference - (percent / 100) * circumference;

    //       // 152.088
    //       effectElement.style.setProperty(
    //         "--rotate",
    //         360 -
    //           ((circumference - (percent / 100) * circumference) * 360) / 157 +
    //           "deg"
    //       );
    //     }
    //     break;
    //   }
    //   default: {
    //     break;
    //   }
    // }
    let percent = (document.documentElement.scrollTop * 100) / type.value;
    if (window.innerWidth < 576) {
      percent = (document.documentElement.scrollTop * 100) / 7017;
    } else if (window.innerWidth < 768) {
      percent = (document.documentElement.scrollTop * 100) / 2771;
    } else if (window.innerWidth < 992) {
      percent = (document.documentElement.scrollTop * 100) / 2319;
    }

    const element = document.querySelector(type.element);
    if (!element) return;

    const effectElement = document.querySelector(".action__top-effect");
    if (!effectElement) return;

    element.style.strokeDashoffset =
      circumference - (percent / 100) * circumference;

    // 152.088
    effectElement.style.setProperty(
      "--rotate",
      360 -
        ((circumference - (percent / 100) * circumference) * 360) / 157 +
        "deg"
    );
  });
};

export const handleScrollTop = (selector) => {
  const element = document.querySelector(selector);
  if (!element) return;

  element.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

export const handleCloseResultSearch = (selectorClick, selectorResult) => {
  const clickElement = document.querySelector(selectorClick);
  if (!clickElement) return;

  const resultElement = document.querySelector(selectorResult);
  if (!resultElement) return;

  clickElement.addEventListener("click", () => {
    resultElement.classList.remove("active--primary");
  });
};

export const handleRedirectURLMovie = (selector) => {
  const element = document.querySelector(selector);
  if (!element) return;

  element.addEventListener("click", (e) => {
    if (!e.target.matches(".movie")) return;

    window.location.assign(
      `/detail.html?type=${e.target.dataset.type}&id=${e.target.dataset.id}`
    );
  });
};

export const handleDefaultScroll = () => {
  window.scrollTo(0, 10000);
  const height = document.documentElement.scrollTop;
  window.scrollTo(0, 0);
  return height;
};

// export const handleHideNode = (selectorClick, selectorHide) => {
//   const element = document.querySelector(selector);
//   if (!element) return;

//   element.addEventListener("click", () => {
//     handleToggleActive(selectorHide);
//   });
// };
export const handleConnectNetwork = (selectorSuccess, selectorFail) => {
  const successElement = document.querySelector(selectorSuccess);
  if (!successElement) return;

  const xSuccessElement = successElement.querySelector(".alert-x");
  if (!xSuccessElement) return;

  const failElement = document.querySelector(selectorFail);
  if (!failElement) return;

  const xFailElement = failElement.querySelector(".alert-x");
  if (!xFailElement) return;

  xSuccessElement.addEventListener("click", () => {
    successElement.classList.remove("active");
  });
  xFailElement.addEventListener("click", () => {
    failElement.classList.remove("active");
  });
  window.addEventListener("offline", () => {
    failElement.classList.add("active");
    successElement.classList.remove("active");
    setTimeout(() => {
      xFailElement.click();
    }, 4000);
  });
  window.addEventListener("online", () => {
    successElement.classList.add("active");
    failElement.classList.remove("active");
    setTimeout(() => {
      xSuccessElement.click();
    }, 4000);
  });
};
export const handleOptionMenu = (selector) => {
  const { click, top, home, effect } = selector;
  const clickElement = document.querySelector(click);
  if (!clickElement) return;

  const topElement = document.querySelector(top.selector);
  if (!topElement) return;

  const homeElement = document.querySelector(home.selector);
  if (!homeElement) return;

  const effectElement = document.querySelector(effect.selector);
  if (!effectElement) return;
  clickElement.addEventListener("click", () => {
    topElement.classList.toggle(top.class);
    homeElement.classList.toggle(home.class);
    effectElement.classList.toggle(effect.class);
  });
};
export const handleRefreshPage = (selectorClick) => {
  const clickElement = document.querySelector(selectorClick);
  if (!clickElement) return;

  clickElement.addEventListener("click", () => {
    window.location.assign("/home.html");
  });
};
