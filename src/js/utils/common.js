import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import userApi from "@/js/api/userApi";
import { paramScroll, formConfig } from "@/js/utils";
import { auth, db } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

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

    console.log("distance", distance);
    if (type == "next") {
      if (paramScroll.numberScroll < 2) {
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

// let timeAll = null;
// let direction = "right";
// let length = 2;
// let numberScroll = 0;
const handleAutoSlide = (selectorWrap, time) => {
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
    console.log("dataAccesstoken", dataAccessToken);
  } catch (error) {
    console.log("Get access token error");
    return null;
  }
  return null;
};
const createErrorAndAddError = (element, errorMessage) => {
  const errorElement = document.createElement("h3");
  errorElement.className = "form-error";
  errorElement.textContent = errorMessage;
  removeError(element);
  const parentElement = element.parentElement;
  parentElement.appendChild(errorElement);
};
const removeError = (element) => {
  const parentElement = element.parentElement;
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
    duration: 1000,
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
      console.log("error", error);
      showToastError("Email already exists on the system");
    });
};
export const handleSignInForm = async (formElement) => {
  const value = handleGetValueForm(formElement);
  const { email, password } = value;

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showToastSuccess("Login success !");
    })
    .catch((error) => {
      showToastError("Invalid email or password !");
    });
};
const handleMainForm = (formElement, type) => {
  if (handleValidationForm(formElement)) {
    if (type == "signup") {
      handleSignUpForm(formElement);
    } else {
      handleSignInForm(formElement);
    }
  } else {
    showToastError();
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

  window.addEventListener("load", () => {
    loaderElement.style.display = "none";
  });
};
export const handleAuthen = async (location) => {
  await onAuthStateChanged(auth, (user) => {
    if (user && location == "index") {
      setTimeout(() => {
        window.location.assign(
          `/home.html?id=${user.uid}${Math.floor(Math.random() * 10 + 0)}`
        );
      }, 1000);
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
      window.location.assign("/");
    }
  });
};
export const handleUploadUserToUI = (selectorName, selectorEmail) => {
  const nameElement = document.querySelector(selectorName);
  if (!nameElement) return;

  const emailElement = document.querySelector(selectorEmail);
  if (!emailElement) return;
};
