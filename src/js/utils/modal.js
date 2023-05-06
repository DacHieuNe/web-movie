export const handleOpenModal = (selectorButton, selectorModal) => {
  const buttonElement = document.querySelector(selectorButton);
  if (!buttonElement) return;

  const modalElement = document.querySelector(selectorModal);
  if (!modalElement) return;

  buttonElement.addEventListener("click", () => {
    buttonElement.classList.add("active");
    modalElement.classList.add("active");
  });
};
export const handleCloseModal = (
  selectorButtonModal,
  selectorButton,
  selectorModal
) => {
  const buttonModalElement = document.querySelector(selectorButtonModal);
  if (!buttonModalElement) return;

  const buttonElement = document.querySelector(selectorButton);
  if (!buttonElement) return;

  const modalElement = document.querySelector(selectorModal);
  if (!modalElement) return;

  buttonModalElement.addEventListener("click", () => {
    buttonElement.classList.remove("active");
    modalElement.classList.remove("active");
  });
};
