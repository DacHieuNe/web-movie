import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import userApi from "@/js/api/userApi";
import { paramScroll, formConfig } from "@/js/utils";
import { auth, db } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { role, authenStatus } from "./constant";
import slideApi from "../api/slideApi";
import movieNewApi from "../api/movieNewApi";
import animeApi from "../api/animeApi";
import todayApi from "../api/todayApi";

export const handleSlideButton = (
  selectorSlideButton,
  selectorSlideWrap,
  type
) => {
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
export const handleTextContent = (parent, child, text) => {
  const element = parent.querySelector(child);
  if (!element) return;

  element.innerHTML = text;
};
const handleHookDisable = (parent, selector, mode = "on") => {
  const element = parent.querySelector(selector);
  if (!element) return;

  mode == "on"
    ? element.classList.add("disabled")
    : element.classList.remove("disabled");
};
// let timeAll = null;
// let direction = "right";
// let length = 2;
// let numberScroll = 0;
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
export const handleTimeSlide = () => {
  paramScroll.timeAll = setTimeout(() => {
    handleAutoSlide("slide__wrap");
  }, paramScroll.timeRun);
};
export const handleGetAccessToken = async () => {
  try {
    const dataAccessToken = await userApi.addNewToken();
    return dataAccessToken.access_token;
  } catch (error) {
    console.log("Get access token error");
  }
  return null;
};
export const handleDataSlide = async (token) => {
  try {
    const data = await slideApi.getAllSlide(token);
    return data;
  } catch (error) {
    console.log("Get data slide error");
    console.log("error", error);
  }
  return null;
};
export const handleDataNewMovie = async (token) => {
  try {
    const data = await movieNewApi.getAll(token);
    return data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
export const handleDataAnime = async (token) => {
  try {
    const data = await animeApi.getAll(token);
    return data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

export const handleDataToday = async (token) => {
  try {
    const data = await todayApi.getAll(token);
    return data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const createErrorAndAddError = (element, errorMessage) => {
  const errorElement = document.createElement("h3");
  errorElement.className = "form-error";
  errorElement.textContent = errorMessage;
  removeError(element);
  let parentElement = element.parentElement;
  while (!parentElement.matches(".form-group")) {
    parentElement = parentElement.parentElement;
  }
  parentElement.appendChild(errorElement);
};
const removeError = (element) => {
  let parentElement = element.parentElement;
  while (!parentElement.matches(".form-group")) {
    parentElement = parentElement.parentElement;
  }
  const errorElement = parentElement.lastElementChild;
  if (errorElement.matches(".form-error")) {
    parentElement.removeChild(errorElement);
  }
};
const handleValidationForm = (formElement) => {
  let checkForm = true;
  const userNameElement = formElement.querySelector("input[name=username]");
  if (userNameElement) {
    const userNameValue = userNameElement.value;
    if (userNameValue.length == 0) {
      checkForm = false;
      createErrorAndAddError(userNameElement, "Please enter your user name !");
    } else if (userNameValue.split(" ").length < 2) {
      checkForm = false;
      createErrorAndAddError(userNameElement, "Please enter above two words !");
    } else {
      removeError(userNameElement);
    }
  }

  const emailElement = formElement.querySelector("input[name=email]");
  if (emailElement) {
    const emailValue = emailElement.value;
    if (emailValue.length == 0) {
      checkForm = false;
      createErrorAndAddError(emailElement, "Please enter your email !");
    } else if (!/\w+@{1}\w+(\.{1}[a-z]+)+/g.test(emailValue)) {
      checkForm = false;
      createErrorAndAddError(
        emailElement,
        "Please enter correctly format email !"
      );
    } else {
      removeError(emailElement);
    }
  }

  const passwordElement = formElement.querySelector("input[name=password]");
  if (passwordElement) {
    const passwordValue = passwordElement.value;
    if (passwordValue.length == 0) {
      checkForm = false;
      createErrorAndAddError(passwordElement, "Please enter your password !");
    } else if (
      !/[a-z]/g.test(passwordValue) ||
      !/[A-Z]/g.test(passwordValue) ||
      !/[0-9]/g.test(passwordValue)
    ) {
      checkForm = false;
      createErrorAndAddError(
        passwordElement,
        "Password must fully be lowercase , uppercase and number characters !"
      );
    } else if (passwordValue.length < 6) {
      checkForm = false;
      createErrorAndAddError(
        passwordElement,
        "Password must be greater than or equal six characters !"
      );
    } else {
      removeError(passwordElement);
    }
  }

  const checkboxElement = formElement.querySelector("input[name=checkbox]");
  if (checkboxElement) {
    if (!checkboxElement.checked) {
      checkForm = false;
      createErrorAndAddError(checkboxElement, "Please tick to our terms !");
    } else {
      removeError(checkboxElement);
    }
  }
  return checkForm;
};
const showToastSuccess = (message = "Register success !") => {
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
const showToastError = (message = "Register error !") => {
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
const handleOnChangeForm = (formElement) => {
  const userNameElement = formElement.querySelector("input[name=username]");
  if (userNameElement) {
    userNameElement.addEventListener("input", (e) => {
      const userNameValue = e.target.value;
      if (userNameValue.length == 0) {
        createErrorAndAddError(e.target, "Please enter your user name !");
      } else if (userNameValue.split(" ").length < 2) {
        createErrorAndAddError(e.target, "Please enter above two words !");
      } else {
        removeError(e.target);
      }
    });
  }

  const emailElement = formElement.querySelector("input[name=email]");
  if (emailElement) {
    emailElement.addEventListener("input", (e) => {
      const emailValue = e.target.value;
      if (emailValue.length == 0) {
        createErrorAndAddError(e.target, "Please enter your email !");
      } else if (!/\w+@{1}\w+(\.{1}[a-z]+)+/g.test(emailValue)) {
        createErrorAndAddError(
          e.target,
          "Please enter correctly format email !"
        );
      } else {
        removeError(e.target);
      }
    });
  }

  const passwordElement = formElement.querySelector("input[name=password]");
  if (passwordElement) {
    passwordElement.addEventListener("input", (e) => {
      const passwordValue = e.target.value;
      if (passwordValue.length == 0) {
        createErrorAndAddError(e.target, "Please enter your password !");
      } else if (
        !/[a-z]/g.test(passwordValue) ||
        !/[A-Z]/g.test(passwordValue) ||
        !/[0-9]/g.test(passwordValue)
      ) {
        createErrorAndAddError(
          e.target,
          "Password must fully be lowercase , uppercase and number characters !"
        );
      } else if (passwordValue.length < 6) {
        createErrorAndAddError(
          e.target,
          "Password must be greater than or equal six characters !"
        );
      } else {
        removeError(e.target);
      }
    });
  }

  const checkboxElement = formElement.querySelector("input[name=checkbox]");
  if (checkboxElement) {
    checkboxElement.addEventListener("change", (e) => {
      if (!e.target.checked) {
        createErrorAndAddError(e.target, "Please tick to our terms !");
      } else {
        removeError(e.target);
      }
    });
  }
};
const handleGetValueForm = (formElement) => {
  const value = {};
  const userNameElement = formElement.querySelector("input[name=username]");
  if (userNameElement) {
    const userNameValue = userNameElement.value;
    value.username = userNameValue;
  }
  const emailElement = formElement.querySelector("input[name=email]");
  if (emailElement) {
    const emailValue = emailElement.value;
    value.email = emailValue;
  }

  const passwordElement = formElement.querySelector("input[name=password]");
  if (passwordElement) {
    const passwordValue = passwordElement.value;
    value.password = passwordValue;
  }

  return value;
};
export const handleSignUpForm = async (formElement) => {
  const value = handleGetValueForm(formElement);
  const { username, email, password } = value;

  handleTextContent(
    formElement,
    ".btn",
    `<div class="loading">
      <span class="loading--default loading--primary loading__body"></span>
     </div>`
  );
  handleHookDisable(formElement, ".btn");
  authenStatus.status = "up";
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      showToastSuccess();
      const { user } = userCredential;
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      // create a reference to collection user from cloud firestore db
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        username,
        email,
        password,
      });
    })
    .catch((error) => {
      showToastError("Email already exists on the system");
    });
  handleTextContent(formElement, ".btn", "Register");
  handleHookDisable(formElement, ".btn", "off");
};
export const handleSignInForm = async (formElement) => {
  const value = handleGetValueForm(formElement);
  const { email, password } = value;

  handleTextContent(
    formElement,
    ".btn",
    `<div class="loading">
      <span class="loading--default loading--primary loading__body"></span>
    </div>`
  );
  handleHookDisable(formElement, ".btn");
  authenStatus.status = "in";
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      showToastSuccess("Login success !");
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1);
        }, 3500);
      });
    })
    .catch((error) => {
      showToastError("Invalid email or password !");
    });
  handleTextContent(formElement, ".btn", "Login");
  handleHookDisable(formElement, ".btn", "off");
};

const handleMainForm = (formElement, type) => {
  if (handleValidationForm(formElement)) {
    if (type == "signup") {
      handleSignUpForm(formElement);
    } else {
      handleSignInForm(formElement);
    }
  } else {
    if (type == "signup") {
      showToastError();
    } else {
      showToastError("Login error !");
    }
  }
};
export const handleSubmitForm = (selectorForm, type) => {
  const formElement = document.getElementById(selectorForm);
  if (!formElement) return;

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!formConfig.isSubmit) {
      formConfig.isSubmit = 1;
      handleOnChangeForm(formElement);
    }
    handleMainForm(formElement, type);
  });
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

  console.log("loader");
  window.addEventListener("load", () => {
    console.log("load");
    loaderElement.style.display = "none";
  });
};
export const handleAuthen = async (location) => {
  await onAuthStateChanged(auth, async (user) => {
    console.log("user", user);
    if (user && !localStorage.getItem("users")) {
      // create a reference to doc id in collection users
      const docRef = doc(db, "users", user.uid);
      await new Promise((resolve, reject) => {
        onSnapshot(docRef, (doc) => {
          localStorage.setItem(
            "users",
            JSON.stringify({
              ...doc.data(),
            })
          );
          resolve(1);
        });
      });
    }
    if (user && location == "index") {
      if (authenStatus.status == "in") {
        window.location.assign(
          `/home.html?id=${user.uid}${Math.floor(Math.random() * 10 + 0)}`
        );
      } else {
        setTimeout(() => {
          window.location.assign(
            `/home.html?id=${user.uid}${Math.floor(Math.random() * 10 + 0)}`
          );
        }, 4000);
      }
    }
    if (user && location == "home") {
      const searchParams = new URLSearchParams(window.location.search);
      if (!searchParams.has("id")) {
        window.location.assign(
          `/home.html?id=${user.uid}${Math.floor(Math.random() * 10 + 0)}`
        );
      }
      let valueId = searchParams.get("id");
      valueId = valueId.slice(0, valueId.length - 1);
      if (user.uid != valueId) {
        window.location.assign(
          `/home.html?id=${user.uid}${Math.floor(Math.random() * 10 + 0)}`
        );
      }
      let count = 0;
      searchParams.forEach((e) => {
        count++;
      });
      if (count > 1) {
        window.location.assign(
          `/home.html?id=${user.uid}${Math.floor(Math.random() * 10 + 0)}`
        );
      }
      // if(searchParams )
      // window.location.assign(
      //   `/home.html?id=${user.uid}${Math.floor(Math.random() * 10 + 0)}`
      // );
    }
    if (!user && location == "home") {
      window.location.assign("/authen.html");
    }
  });
};
export const handleUploadUserToUI = (
  selectorName,
  selectorEmail,
  selectorRole
) => {
  const usersValue = JSON.parse(localStorage.getItem("users")) || {
    username: "",
    email: "",
    password: "",
  };

  console.log("value", usersValue);
  let { username, email, password } = usersValue;

  const nameSplit = username.split(" ");
  username = nameSplit[nameSplit.length - 1];
  const nameElement = document.querySelector(selectorName);
  if (!nameElement) return;
  nameElement.textContent = username;

  const emailElement = document.querySelector(selectorEmail);
  if (!emailElement) return;
  emailElement.textContent = email;

  const roleElement = document.querySelector(selectorRole);
  if (!roleElement) return;

  let checkAdmin = role.ADMIN.some(
    (user) => user.email == email && user.password == password
  );

  console.log("checkAdmin", checkAdmin);
  if (checkAdmin) {
    roleElement.classList.add("header__role--admin");
    nameElement.classList.add("header__name--admin");
    roleElement.textContent = "Admin";
    return;
  }
  let checkMod = role.MOD.some(
    (user) => user.email == email && user.password == password
  );
  console.log("checkMod", checkMod);

  if (checkMod) {
    roleElement.classList.add("header__role--mod");
    nameElement.classList.add("header__name--mod");
    roleElement.textContent = "Mod";
    return;
  }
  roleElement.classList.add("header--user");
};
export const handleSignOut = (selectorButton) => {
  const buttonElement = document.getElementById(selectorButton);
  if (!buttonElement) return;

  buttonElement.addEventListener("click", async () => {
    if (localStorage.getItem("users")) {
      localStorage.removeItem("users");
    }
    await signOut(auth);
  });
};
export const handleTogglePassword = (
  selectorEvent,
  selectorOpen,
  selectorClose,
  selectorInput
) => {
  const eventElement = document.querySelector(selectorEvent);
  if (!eventElement) return;

  const openElement = document.querySelector(selectorOpen);
  if (!openElement) return;

  const closeElement = document.querySelector(selectorClose);
  if (!closeElement) return;

  const inputElement = document.querySelector(selectorInput);
  if (!inputElement) return;

  eventElement.addEventListener("click", () => {
    if (openElement.hidden) {
      closeElement.hidden = true;
      openElement.hidden = false;
      inputElement.type = "password";
    } else if (closeElement.hidden) {
      closeElement.hidden = false;
      openElement.hidden = true;
      inputElement.type = "text";
    }
  });
};
const cloneDataSlide = (selectorTemplate, data) => {
  const templateElement = document.querySelector(selectorTemplate);
  if (!templateElement) return;

  const content = templateElement.content;

  const { category, description, name, images } = data;

  const slideItem = content.querySelector(".slide__item").cloneNode(true);
  slideItem.style.backgroundImage = `url(${images})`;

  const slideTag = slideItem.querySelector(".slide__tag");
  if (!slideTag) return;
  slideTag.textContent = category;

  const slideHeading = slideItem.querySelector(".slide__heading");
  if (!slideHeading) return;
  slideHeading.textContent = name;

  const slideDesc = slideItem.querySelector(".slide__desc");
  if (!slideDesc) return;
  slideDesc.textContent = description;

  return slideItem;
};
const cloneDataNewMovie = (selectorTemplate, data) => {
  const templateElement = document.querySelector(selectorTemplate);
  if (!templateElement) return;

  const content = templateElement.content;

  const { name, images, episode, view } = data;

  const movieGrid = content.querySelector(".movie").cloneNode(true);

  const movieItem = movieGrid.querySelector(".movie__box");

  const movieImage = movieItem.querySelector(".movie__image img");
  if (!movieImage) return;
  movieImage.src = images;

  const movieName = movieItem.querySelector(".movie__name");
  if (!movieName) return;
  movieName.textContent = name;

  const movieEpisode = movieItem.querySelector(".movie__episode");
  if (!movieEpisode) return;
  movieEpisode.textContent = `Tập: ${episode}`;

  const movieView = movieItem.querySelector(".movie__view");
  if (!movieView) return;
  movieView.textContent = `View: ${view}`;

  return movieGrid;
};
const cloneDataAnime = (selectorTemplate, data) => {
  const templateElement = document.querySelector(selectorTemplate);
  if (!templateElement) return;

  const content = templateElement.content;

  const { chap, post, title } = data;

  const mangaGrid = content.querySelector(".manga").cloneNode(true);

  const mangaImage = mangaGrid.querySelector(".manga__image img");
  if (!mangaImage) return;
  mangaImage.src = post;

  const mangaTitle = mangaGrid.querySelector(".manga__title");
  if (!mangaTitle) return;
  mangaTitle.textContent = title;

  const mangaChapter = mangaGrid.querySelector(".manga__chapter");
  if (!mangaChapter) return;
  mangaChapter.textContent = chap;

  return mangaGrid;
};
const cloneDataToday = (selectorTemplate, data) => {
  const templateElement = document.querySelector(selectorTemplate);
  if (!templateElement) return;

  const content = templateElement.content;

  const { images, name, view } = data;

  const todayGrid = content.querySelector(".today").cloneNode(true);

  todayGrid.dataset.view = view;
  const todayImage = todayGrid.querySelector(".today__image img");
  if (!todayImage) return;
  todayImage.src = images;

  const todayTitle = todayGrid.querySelector(".today__title");
  if (!todayTitle) return;
  todayTitle.textContent = name;

  return todayGrid;
};
export const handleUploadToUI = (selectorWrap, list, type) => {
  const wrapElement = document.querySelector(selectorWrap);
  if (!wrapElement) return;

  let domList = [];
  list.forEach((item) => {
    let itemList;
    switch (type) {
      case "slide": {
        itemList = cloneDataSlide("#slide-template", item);
        break;
      }
      case "new-movie": {
        itemList = cloneDataNewMovie("#movie-template", item);
        break;
      }
      case "story": {
        itemList = cloneDataAnime("#manga-template", item);
        break;
      }
      case "today": {
        itemList = cloneDataToday("#today-template", item);
        break;
      }
    }
    domList.push(itemList);
    wrapElement.appendChild(itemList);
  });
  switch (type) {
    case "slide": {
      domList.forEach((item) => {
        const slideDesc = item.querySelector(".slide__desc");
        if (!slideDesc) return;

        if (slideDesc.clientHeight > 136) {
          slideDesc.style.maxHeight = "13.6rem";
          slideDesc.style.overflow = "hidden";
          slideDesc.title = slideDesc.textContent;
          slideDesc.textContent = slideDesc.textContent.slice(0, 330);
          slideDesc.textContent += "...";
        }
      });
    }
    case "new-movie": {
      domList.forEach((item) => {
        let movieName = item.querySelector(".movie__name");
        if (!movieName) return;
        if (movieName.textContent.length > 26) {
          movieName.title = movieName.textContent;
          movieName.textContent = movieName.textContent.slice(0, 26) + "...";
        }
      });
    }
    case "today": {
      domList.forEach((item) => {
        const todayTitle = item.querySelector(".today__title");
        if (!todayTitle) return;

        handleTextContent(
          item,
          ".today__title",
          `${todayTitle.textContent.slice(
            0,
            20
          )}...<br /><h3 class="today__view">${item.dataset.view} lượt xem</h3>`
        );
        // todayTitle.textContent = ;
        // todayTitle.textContent += "...";
      });
    }
  }
};
export const handleUploadNewMovieToUI = (selectorWrap, movieList) => {};
export const handleSlideMain = () => {
  handleSlideButton("slide__prev", "slide__wrap", "prev");
  handleSlideButton("slide__next", "slide__wrap", "next");
  handleTimeSlide();
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
  element.addEventListener("click", () => {
    if (document.body.dataset.theme == "light") {
      header.style.backgroundColor = "#070720";
      header.style.color = "#fff";

      footerHeader.style.backgroundColor = "#6452ce";
      footerMain.style.backgroundColor = "#1d2331";
      footerMain.style.color = "#fff";

      document.body.style.backgroundColor = "#0b0c2a";
      document.body.dataset.theme = "dark";
    } else {
      header.style.backgroundColor = "#fff";
      header.style.color = "#000";

      footerHeader.style.backgroundColor = "#21d191";
      footerMain.style.backgroundColor = "#ecf0f3";
      footerMain.style.color = "#000";

      document.body.style.backgroundColor = "#fff";
      document.body.dataset.theme = "light";
    }
  });
};
