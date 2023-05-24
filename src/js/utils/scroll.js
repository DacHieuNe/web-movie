import { circumference } from "./constant";

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
    // if (window.innerWidth < 576) {
    //   percent = (document.documentElement.scrollTop * 100) / 7017;
    // } else if (window.innerWidth < 768) {
    //   percent = (document.documentElement.scrollTop * 100) / 2771;
    // } else if (window.innerWidth < 992) {
    //   percent = (document.documentElement.scrollTop * 100) / 2319;
    // }

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
export const handleDefaultScroll = () => {
  window.scrollTo(0, 40000);
  const height = document.documentElement.scrollTop;
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 500);
  return height;
};
