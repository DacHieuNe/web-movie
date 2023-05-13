import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

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
    handlePushURL("/sign-in");
    parentFirstElement.hidden = false;
    parentSecondElement.hidden = true;
  });
};
export const handleRedirectPageV2 = (
  parentFirst,
  childFirst,
  parentSecond,
  childSecond,
  type = "normal"
) => {
  const parentFirstElement = document.querySelector(parentFirst);
  if (!parentFirstElement) return;

  const childFirstElement = document.querySelector(childFirst);
  if (!childFirstElement) return;

  const parentSecondElement = document.querySelector(parentSecond);
  if (!parentSecondElement) return;

  const childSecondElement = document.querySelector(childSecond);
  if (!childSecondElement) return;

  childFirstElement.addEventListener("click", (e) => {
    e.preventDefault();
    if (type == "normal") {
      childFirstElement.classList.add("active");
      childSecondElement.classList.remove("active");
      parentFirstElement.style.display = "flex";
      parentSecondElement.style.display = "none";
    }
  });
  childSecondElement.addEventListener("click", (e) => {
    e.preventDefault();
    if (type == "normal") {
      childFirstElement.classList.remove("active");
      childSecondElement.classList.add("active");
      parentFirstElement.style.display = "none";
      parentSecondElement.style.display = "block";
    }
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

        if(window.innerWidth < 992) {
          const liveEmotionList = document.querySelectorAll(".live__emotion");
          if(!liveEmotionList) return;
          liveEmotionList.forEach(emotion => {
            emotion.style.setProperty("--text", "#fff");
          })
        }
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
      
        if(window.innerWidth < 992) {
          const liveEmotionList = document.querySelectorAll(".live__emotion");
          if(!liveEmotionList) return;
          liveEmotionList.forEach(emotion => {
            emotion.style.setProperty("--text", "#000");
          })
        }
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
export const handleCloseResultSearch = (selectorClick, selectorResult) => {
  const clickElement = document.querySelector(selectorClick);
  if (!clickElement) return;

  const resultElement = document.querySelector(selectorResult);
  if (!resultElement) return;

  clickElement.addEventListener("click", () => {
    resultElement.classList.remove("active--primary");
  });
};

export const handleRedirectURLMovie = (selector, type) => {
  const element = document.querySelector(selector);
  if (!element) return;

  element.addEventListener("click", (e) => {
    if (type == "movie" && !e.target.matches(".movie")) return;
    if (type == "today" && !e.target.matches(".today")) return;
    if (type == "slide" && !e.target.matches(".btn__slide")) return;

    window.location.assign(
      `/detail.html?type=${e.target.dataset.type}&id=${e.target.dataset.id}`
    );
  });
};

// export const handleHideNode = (selectorClick, selectorHide) => {
//   const element = document.querySelector(selector);
//   if (!element) return;

//   element.addEventListener("click", () => {
//     handleToggleActive(selectorHide);
//   });
// };
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
