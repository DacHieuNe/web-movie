import { paramScroll } from "./constant";
const handleAutoSlide = (selectorWrap) => {
  const slideWrapElement = document.getElementById(selectorWrap);
  if (!slideWrapElement) return;

  const slideItemElementList =
    slideWrapElement.querySelectorAll(".slide__item");
  if (!slideItemElementList) return;

  const distance = slideItemElementList[0].offsetWidth;

  if (paramScroll.numberScroll == 0) {
    paramScroll.direction = "right";
  } else if (paramScroll.numberScroll == paramScroll.length) {
    paramScroll.direction = "left";
  }
  if (paramScroll.direction == "left") {
    paramScroll.numberScroll = paramScroll.numberScroll - 1;
    slideWrapElement.scrollLeft -= distance;
  } else if (paramScroll.direction == "right") {
    paramScroll.numberScroll = paramScroll.numberScroll + 1;
    slideWrapElement.scrollLeft += distance;
  }
  handleTimeSlide();
};
const handleTimeSlide = () => {
  paramScroll.timeAll = setTimeout(() => {
    handleAutoSlide("slide__wrap");
  }, paramScroll.timeRun);
};
const handleSlideButton = (selectorSlideButton, selectorSlideWrap, type) => {
  const slideButtonElement = document.getElementById(selectorSlideButton);
  if (!slideButtonElement) return;

  const slideWrapElement = document.getElementById(selectorSlideWrap);
  if (!slideWrapElement) return;

  slideButtonElement.addEventListener("click", () => {
    const slideItemElement = slideWrapElement.querySelector("#slide__item");
    if (!slideItemElement) return;

    if (paramScroll.timeAll) {
      clearTimeout(paramScroll.timeAll);
    }
    const distance = slideItemElement.offsetWidth;

    if (type == "next") {
      if (paramScroll.numberScroll < paramScroll.length) {
        paramScroll.numberScroll++;
      }
      slideWrapElement.scrollLeft += distance;
    } else if (type == "prev") {
      if (paramScroll.numberScroll > 0) {
        paramScroll.numberScroll--;
      }
      slideWrapElement.scrollLeft -= distance;
    }
    handleTimeSlide();
  });
};
export const handleSlideMain = () => {
  handleSlideButton("slide__prev", "slide__wrap", "prev");
  handleSlideButton("slide__next", "slide__wrap", "next");
  handleTimeSlide();
};
