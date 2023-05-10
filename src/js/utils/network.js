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
