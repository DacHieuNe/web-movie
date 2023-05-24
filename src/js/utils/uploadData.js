import { role } from "./constant";
import { handleInnerHTML } from "./common";

const cloneResultMovie = (selectorTemplate, data) => {
  const templateElement = document.querySelector(selectorTemplate);
  if (!templateElement) return;

  const content = templateElement.content;

  const { id, name, view, images, type } = data;

  const item = content.querySelector(".result").cloneNode(true);
  item.dataset.id = id;
  item.dataset.article = type;

  const imageElement = item.querySelector(".result__img > img");
  if (!imageElement) return;
  imageElement.src = images;

  const viewElement = item.querySelector(".result__info > span");
  if (!viewElement) return;
  viewElement.textContent = `${view} lượt xem`;

  const nameElement = item.querySelector(".result__info > h4");
  if (!nameElement) return;
  nameElement.textContent = name;
  if (nameElement.textContent.length > 24) {
    nameElement.title = nameElement.textContent;
    nameElement.textContent = nameElement.textContent.slice(0, 24) + "...";
  }

  return item;
};
const cloneDataSlide = (selectorTemplate, data) => {
  const templateElement = document.querySelector(selectorTemplate);
  if (!templateElement) return;

  const content = templateElement.content;

  const { id, category, description, name, images } = data;

  const slideItem = content.querySelector(".slide__item").cloneNode(true);
  slideItem.style.backgroundImage = `url(${images})`;

  const slideTag = slideItem.querySelector(".slide__tag");
  if (!slideTag) return;

  const slideTagParent = slideTag.parentElement;
  if (!slideTagParent) return;

  category.forEach((item, index) => {
    if (index == 0) {
      slideTag.textContent = item;
    } else {
      const cloneNode = slideTag.cloneNode(true);
      cloneNode.textContent = item;
      slideTagParent.insertBefore(cloneNode, slideTagParent.children[index]);
    }
  });

  const slideHeading = slideItem.querySelector(".slide__heading");
  if (!slideHeading) return;
  slideHeading.textContent = name;

  const slideDesc = slideItem.querySelector(".slide__desc");
  if (!slideDesc) return;
  slideDesc.textContent = description;

  const slideButton = slideItem.querySelector(".btn__slide");
  if (!slideButton) return;
  slideButton.dataset.id = id;

  return slideItem;
};
const cloneDataNewMovie = (selectorTemplate, data) => {
  const templateElement = document.querySelector(selectorTemplate);
  if (!templateElement) return;

  const content = templateElement.content;

  const { id, name, images, episode, view, type } = data;

  const movieGrid = content.querySelector(".movie").cloneNode(true);
  movieGrid.dataset.id = id;
  movieGrid.dataset.type = type;

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

  const { id, chap, post, title } = data;

  const mangaGrid = content.querySelector(".manga").cloneNode(true);
  mangaGrid.dataset.id = id;

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

  const { id, images, name, view } = data;

  const todayGrid = content.querySelector(".today").cloneNode(true);
  todayGrid.dataset.id = id;

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

  let caseSpecial = null;
  let caseNumber = 0;
  if (type == "todays") {
    caseSpecial = wrapElement.querySelectorAll(".swiper-slide");
  }

  let domList = [];
  list.forEach((item) => {
    let itemList;
    switch (type) {
      case "slides": {
        itemList = cloneDataSlide("#slide-template", item);
        break;
      }
      case "news": {
        itemList = cloneDataNewMovie("#movie-template", item);
        break;
      }
      case "storys": {
        itemList = cloneDataAnime("#manga-template", item);
        break;
      }
      case "todays": {
        itemList = cloneDataToday("#today-template", item);
        break;
      }
    }
    domList.push(itemList);
    if (type == "todays") {
      caseSpecial[caseNumber].appendChild(itemList);
      caseNumber++;
    } else {
      wrapElement.appendChild(itemList);
    }
  });
  switch (type) {
    case "slides": {
      domList.forEach((item) => {
        const slideDesc = item.querySelector(".slide__desc");
        if (!slideDesc) return;

        if (window.innerWidth > 767) {
          if (slideDesc.textContent.length > 330) {
            slideDesc.title = slideDesc.textContent;
            slideDesc.textContent = slideDesc.textContent.slice(0, 330) + "...";
          }
        }
        if (window.innerWidth > 575 && window.innerWidth < 768) {
          if (slideDesc.textContent.length > 114) {
            slideDesc.title = slideDesc.textContent;
            slideDesc.textContent = slideDesc.textContent.slice(0, 114) + "...";
          }
        }
        if (window.innerWidth < 576) {
          if (slideDesc.textContent.length > 80) {
            slideDesc.title = slideDesc.textContent;
            slideDesc.textContent = slideDesc.textContent.slice(0, 80) + "...";
          }
        }
      });
    }
    case "news": {
      domList.forEach((item) => {
        let movieName = item.querySelector(".movie__name");
        if (!movieName) return;
        if (window.innerWidth > 575) {
          if (movieName.textContent.length > 20) {
            movieName.title = movieName.textContent;
            movieName.textContent = movieName.textContent.slice(0, 20) + "...";
          }
        } else {
          if (movieName.textContent.length > 50) {
            movieName.title = movieName.textContent;
            movieName.textContent = movieName.textContent.slice(0, 50) + "...";
          }
        }
      });
    }
    case "storys": {
      domList.forEach((item) => {
        const storyName = item.querySelector(".manga__title");
        if (!storyName) return;

        storyName.title = storyName.textContent;
        if (window.innerWidth < 576) {
          if (storyName.textContent.length > 60) {
            storyName.title = storyName.textContent;
            storyName.textContent = storyName.textContent.slice(0, 60) + "...";
          }
        } else {
          if (storyName.textContent.length > 22) {
            storyName.title = storyName.textContent;
            storyName.textContent = storyName.textContent.slice(0, 22) + "...";
          }
        }
      });
    }
    case "todays": {
      domList.forEach((item) => {
        const todayTitle = item.querySelector(".today__title");
        if (!todayTitle) return;

        todayTitle.MOD;
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

  let { id, username, email, password } = usersValue;

  document.body.dataset.id = id;
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
    document.body.dataset.role = "Admin";
    return;
  }
  let checkMod = role.MOD.some(
    (user) => user.email == email && user.password == password
  );

  if (checkMod) {
    roleElement.classList.add("header__role--mod");
    nameElement.classList.add("header__name--mod");
    roleElement.textContent = "Mod";
    document.body.dataset.role = "Mod";
    return;
  }
  roleElement.classList.add("header--user");
  document.body.dataset.role = "User";
};
export const handleUploadSearchMovie = (
  selectorSearch,
  selectorInput,
  selectorResult,
  selectorNoresult,
  selectorResultList,
  list
) => {
  const searchElement = document.querySelector(selectorSearch);
  if (!searchElement) return;

  const inputElement = document.querySelector(selectorInput);
  if (!inputElement) return;

  searchElement.addEventListener("click", () => {
    const searchValue = inputElement.value;

    inputElement.value = "";
    const data = list.filter(
      (item) =>
        (item.episode == 1 || item.episode == "Tập dài") &&
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const resultElement = document.querySelector(selectorResult);
    if (!resultElement) return;
    resultElement.classList.remove("active--secondary");
    resultElement.classList.add("active--primary");

    const resultInformElement = resultElement.querySelector(selectorNoresult);
    if (!resultInformElement) return;
    resultInformElement.classList.remove("active");
    resultInformElement.textContent = "";

    const resultListElement = resultElement.querySelector(selectorResultList);
    if (!resultListElement) return;
    resultListElement.textContent = "";

    if (!searchValue) {
      resultInformElement.classList.add("active");
      resultInformElement.textContent = "Nhập tên anime để tìm kiếm.";
      return;
    }

    if (data.length > 0) {
      data.forEach((item) => {
        let tampItem = item;
        if (item.episode == 1) {
          tampItem.name = tampItem.split(" TẬP")[0];
        }
        const itemNew = cloneResultMovie("#result-template", tampItem);
        resultListElement.appendChild(itemNew);
      });
      if (resultElement.offsetHeight > 540) {
        resultElement.classList.add("active--secondary");
      }
    } else {
      resultInformElement.classList.add("active");
      resultInformElement.textContent = "Không có kết quả tìm kiếm phù hợp.";
    }
  });
};

export const handleUploadDetailMovie = (data, dataAll) => {
  const { id, article } = data;

  const localData = JSON.parse(localStorage.getItem("datas"));
  if (!localData) return;

  const { "all-movie": dataAllMovie } = localData;
  const dataMain = dataAllMovie.find(
    (item) => item.article == article && item.id == id
  );
  // switch (type) {
  //   case "all": {
  //     const { all } = localData;
  //     dataTemp = all;
  //     break;
  //   }
  //   case "news": {
  //     const { news } = localData;
  //     dataTemp = news;
  //     break;
  //   }
  //   case "slides": {
  //     const { slides } = localData;
  //     dataTemp = slides;
  //     break;
  //   }
  //   case "todays": {
  //     const { todays } = localData;
  //     dataTemp = todays;
  //     break;
  //   }
  //   default:
  //     break;
  // }
  // const dataMain = dataTemp.find((item) => item.id == id);

  const {
    episode,
    youtubeID,
    name,
    view,
    images,
    type: dataType,
    description,
    tag,
    category,
  } = dataMain;
  // handleUploadRelateMovie(id, dataType, dataAll);

  const filterRelateMovie = dataAllMovie.filter(
    (item) => item.id != id && item.type == dataType
  );
  const relateElement = document.querySelector(".playlist__relate");
  if (!relateElement) return;

  filterRelateMovie.forEach((item) => {
    const cloneData = cloneResultMovie("#result-template", {
      id: item.id,
      name: item.title,
      view: item.view,
      images: item.images,
    });
    relateElement.appendChild(cloneData);
  });

  const relateListElement = relateElement.querySelectorAll(".result");
  if (!relateListElement) return;

  relateListElement.forEach((item) => {
    item.addEventListener("click", () => {
      window.location.assign(
        `/detail.html?article=${item.dataset.article}&id=${item.dataset.id}`
      );
    });
  });
  const totalEpisode = document.querySelector(".playlist__total");
  if (!totalEpisode) return;
  totalEpisode.textContent = filterRelateMovie.length + 1;

  const liveElement = document.querySelector(".live");
  if (!liveElement) return;

  const iframeElement = liveElement.querySelector("iframe");
  if (!iframeElement) return;
  iframeElement.src = `https://www.youtube.com/embed/${youtubeID}?rel=0&autoplay=1`;

  const liveTitleElement = liveElement.querySelector(".live__title");
  if (!liveTitleElement) return;
  liveTitleElement.textContent = name;

  const liveViewElement = liveElement.querySelector(".live__view");
  if (!liveViewElement) return;
  liveViewElement.textContent = `${view} lượt xem`;

  // const liveLoveElement = liveElement.querySelector("#live-love");
  // if (!liveLoveElement) return;
  // liveLoveElement.textContent = love;

  // const liveFollowerElement = liveElement.querySelector("#live-follower");
  // if (!liveFollowerElement) return;
  // liveFollowerElement.textContent = follower;

  const infoElement = document.querySelector(".info");
  if (!infoElement) return;

  const infoImageElement = infoElement.querySelector(".info__img img");
  if (!infoImageElement) return;
  infoImageElement.src = images;

  const infoDescElement = infoElement.querySelector(".info__desc");
  if (!infoDescElement) return;
  infoDescElement.textContent = description;

  const infoTagList = infoElement.querySelectorAll(".info__tag");
  if (!infoTagList) return;
  infoTagList.forEach((item, index) => {
    if (!tag[index]) {
      item.remove();
      return;
    }
    item.textContent = tag[index] || "";
  });

  const episodeElement = document.querySelector("#episode");
  if (!episodeElement) return;
  episodeElement.textContent = episode;

  const infoCategoryList = infoElement.querySelectorAll(".info__category");
  if (!infoCategoryList) return;
  infoCategoryList.forEach((item, index) => {
    if (!category[index]) {
      item.remove();
      return;
    }
    item.textContent = category[index];
  });
};

export const handleUploadDetailManga = (data) => {
  const imgTemplate = document.createElement("img");
  imgTemplate.alt = "image";

  const {
    chap,
    chapter,
    author,
    description,
    name,
    post,
    status,
    title,
    view,
    tag,
  } = data;

  const subNameElement = document.querySelector("#subname");
  if (!subNameElement) return;
  subNameElement.textContent = name;

  const subChapElement = document.querySelector("#subchap");
  if (!subChapElement) return;
  subChapElement.textContent = chap;

  const postElement = document.querySelector("#post");
  if (!postElement) return;
  postElement.src = post;

  const titleElement = document.querySelector(".story-detail__title");
  if (!titleElement) return;
  titleElement.textContent = title;

  const tagElement = document.querySelector(".story-detail__tag");
  if (!tagElement) return;
  tagElement.textContent = tag;

  const authorElement = document.querySelector("#author");
  if (!authorElement) return;
  authorElement.textContent = author;

  const statusElement = document.querySelector("#status");
  if (!statusElement) return;
  statusElement.textContent = status;

  const viewElement = document.querySelector("#view");
  if (!viewElement) return;
  viewElement.textContent = view;

  const descElement = document.querySelector(".story-detail__desc");
  if (!descElement) return;
  descElement.textContent = description;

  const chapElement = document.querySelector(".chap");
  if (!chapElement) return;
  chapter.forEach((item) => {
    const imgElement = imgTemplate.cloneNode(true);
    imgElement.src = item;
    chapElement.appendChild(imgElement);
    console.log(1);
  });
};
