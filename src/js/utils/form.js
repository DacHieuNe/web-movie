import { auth, db } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  handleInnerHTML,
  handleHookDisable,
  showToastError,
  showToastSuccess,
  handleToggleActive,
} from "./common";
import { formConfig, authenStatus } from "./constant";

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
const handleSignUpForm = async (formElement) => {
  const value = handleGetValueForm(formElement);
  const { username, email, password } = value;

  handleInnerHTML(
    formElement,
    ".btn",
    `<div class="loading">
        <span class="loading--default loading--primary loading__body"></span>
       </div>`
  );
  handleHookDisable(formElement, ".btn");
  handleToggleActive(".overide");
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
  handleToggleActive(".overide");
  handleInnerHTML(formElement, ".btn", "Register");
  handleHookDisable(formElement, ".btn", "off");
};
const handleSignInForm = async (formElement) => {
  const value = handleGetValueForm(formElement);
  const { email, password } = value;

  handleInnerHTML(
    formElement,
    ".btn",
    `<div class="loading">
        <span class="loading--default loading--primary loading__body"></span>
      </div>`
  );
  handleHookDisable(formElement, ".btn");
  handleToggleActive(".overide");
  authenStatus.status = "in";
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      showToastSuccess("Login success !");
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1);
        }, 3800);
      });
    })
    .catch((error) => {
      showToastError("Invalid email or password !");
    });
  handleToggleActive(".overide");
  handleInnerHTML(formElement, ".btn", "Login");
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
