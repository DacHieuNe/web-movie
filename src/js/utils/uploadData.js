import { role } from "./constant";
import { handleInnerHTML } from "./common";

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

export const handleUploadListToUI = (selectorWrap, list, type) => {
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

        handleInnerHTML(
          item,
          ".today__title",
          `${todayTitle.textContent.slice(
            0,
            20
          )}...<br /><h3 class="today__view">${item.dataset.view} lượt xem</h3>`
        );
      });
    }
  }
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

  if (checkAdmin) {
    roleElement.classList.add("header__role--admin");
    nameElement.classList.add("header__name--admin");
    roleElement.textContent = "Admin";
    return;
  }
  let checkMod = role.MOD.some(
    (user) => user.email == email && user.password == password
  );

  if (checkMod) {
    roleElement.classList.add("header__role--mod");
    nameElement.classList.add("header__name--mod");
    roleElement.textContent = "Mod";
    return;
  }
  roleElement.classList.add("header--user");
};
