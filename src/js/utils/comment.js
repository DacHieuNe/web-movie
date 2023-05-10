import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Swal from "sweetalert2";
import { db } from "@/firebase/firebaseConfig";
import { setDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { role } from "./constant";

dayjs.extend(relativeTime);

export const cloneDataComment = (selectorTemplate, data, index) => {
  const templateElement = document.querySelector(selectorTemplate);
  if (!templateElement) return;

  const content = templateElement.content;

  const { id, comment, username, image, createdAt, email, password } = data;

  const item = content.querySelector(".playlist__item").cloneNode(true);
  item.dataset.id = id;

  const imageElement = item.querySelector(".playlist__image img");
  if (!imageElement) return;
  imageElement.src = image;

  const nameElement = item.querySelector(".playlist__subtitle");
  if (!nameElement) return;
  nameElement.textContent = username;

  const descElement = item.querySelector(".playlist__desc");
  if (!descElement) return;
  descElement.textContent = comment;

  const trashElement = item.querySelector(".playlist__trash");
  if (!trashElement) return;
  trashElement.dataset.index = index;

  const timeElement = item.querySelector(".playlist__time > span");
  if (!timeElement) return;
  timeElement.textContent = dayjs(createdAt).fromNow();

  const roleElement = item.querySelector(".playlist__role");
  if (!roleElement) return;

  let checkAdmin = role.ADMIN.some(
    (user) => user.email == email && user.password == password
  );

  if (checkAdmin) {
    roleElement.classList.add("playlist__role--admin");
    nameElement.classList.add("playlist__subtitle--admin");
    roleElement.textContent = "Admin";
    item.dataset.role = "Admin";
  }
  let checkMod = role.MOD.some(
    (user) => user.email == email && user.password == password
  );
  if (checkMod) {
    roleElement.classList.add("playlist__role--mod");
    nameElement.classList.add("playlist__subtitle--mod");
    roleElement.textContent = "Mod";
    item.dataset.role = "Mod";
  }
  return item;
};
export const handleUploadCommentUser = (selectorList, postId) => {
  const listElement = document.querySelector(selectorList);
  if (!listElement) return;

  const colRef = doc(db, "posts", postId);
  onSnapshot(colRef, (doc) => {
    listElement.textContent = "";
    const dataUser = doc?.data()?.users || [];
    dataUser.forEach((user, index) => {
      const item = cloneDataComment("#comment-template", user, index);
      listElement.appendChild(item);
    });

    const listItemElement = listElement.querySelectorAll(".playlist__item");
    if (!listItemElement) return;

    if (document.body.dataset.role == "Mod") {
      listItemElement.forEach((item) => {
        if (item.dataset.role == "Admin") {
          const trashElement = item.querySelector(".playlist__trash");
          trashElement.style.display = "none";
        } else if (item.dataset.role == "Mod") {
          if (item.dataset.id != document.body.dataset.id) {
            const trashElement = item.querySelector(".playlist__trash");
            trashElement.style.display = "none";
          }
        }
      });
    } else if (document.body.dataset.role == "User") {
      listItemElement.forEach((item) => {
        if (item.dataset.role == "Admin" || item.dataset.role == "Mod") {
          const trashElement = item.querySelector(".playlist__trash");
          trashElement.style.display = "none";
        } else {
          if (item.dataset.id != document.body.dataset.id) {
            const trashElement = item.querySelector(".playlist__trash");
            trashElement.style.display = "none";
          }
        }
      });
    }
    const listTrashElement = listElement.querySelectorAll(".playlist__trash");
    if (!listTrashElement) return;

    listTrashElement.forEach((item) => {
      item.addEventListener("click", () => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            //   const docRef = doc(db, "posts", postId);
            //   const docData = await getDoc(docRef);
            //   const { users } = docData.data();
            let cloneUsers = [...dataUser];
            cloneUsers = cloneUsers.filter(
              (user, ind) => ind != item.dataset.index
            );
            await updateDoc(colRef, {
              users: cloneUsers,
            });
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      });
    });
  });
};

export const handleCommentUser = async (selector, postId) => {
  const { click, input } = selector;
  const clickElement = document.querySelector(click);
  if (!clickElement) return;

  const inputElement = document.querySelector(input);
  if (!inputElement) return;

  const localUser = localStorage.getItem("users");
  if (!localUser) return;

  const { id: userId } = JSON.parse(localUser);

  const userRef = doc(db, "users", userId);
  const dataUser = await getDoc(userRef);

  clickElement.addEventListener("click", async () => {
    const value = inputElement.value;
    inputElement.value = "";

    const docRef = doc(db, "posts", postId);

    const postData = await getDoc(docRef);

    // const { users } = postData.data();
    const data = postData?.data()?.users || [];

    const date = new Date();
    setDoc(docRef, {
      users: [
        ...data,
        {
          id: dataUser.id,
          image:
            "https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png",
          comment: value,
          createdAt: date.getTime(),
          ...dataUser.data(),
        },
      ],
    });
  });
};
// export const handleRemoveComment = (selectorList, postId) => {
//   const listElement = document.querySelectorAll(selectorList);
//   if (!listElement) return;
// };