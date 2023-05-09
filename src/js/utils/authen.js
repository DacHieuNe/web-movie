import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { authenStatus } from "./constant";
import { handleLoadingPage } from "./common";

export const handleAuthen = async (location) => {
  await onAuthStateChanged(auth, async (user) => {
    if (user && location == "index" && authenStatus.status == "") {
      window.location.assign(
        `/home.html?id=${user.uid}${Math.floor(Math.random() * 10 + 0)}`
      );
    }
    const localUser = localStorage.getItem("users");
    const localData = localStorage.getItem("datas");
    if (location == "main") {
      if (localData) {
        if (user) {
          window.location.assign(
            `/home.html?id=${user.uid}${Math.floor(Math.random() * 10 + 0)}`
          );
        } else {
          window.location.assign("/authen.html");
        }
      }
    }
    if (location == "movie-detail") {
      if (!localData) {
        window.location.assign("/");
      } else if (!user) {
        window.location.assign("/authen.html");
      }
    }
    if (location == "home") {
      // nếu vào trang Home mà không có data thì redirect về lai /
      if (!localData) {
        window.location.assign("/");
      } else if (!user) {
        window.location.assign("/authen.html");
      } else if (user) {
        history.pushState({}, "", "/home");
        // const searchParams = new URLSearchParams(window.location.search);
        // if (!searchParams.has("id")) {
        //   history.pushState(
        //     {},
        //     "",
        //     `/home.html?id=${user.uid}${Math.floor(Math.random() * 10 + 0)}`
        //   );
        // }
        // let valueId = searchParams.get("id");
        // valueId = valueId.slice(0, valueId.length - 1);
        // if (user.uid != valueId) {
        //   history.pushState(
        //     {},
        //     "",
        //     `/home.html?id=${user.uid}${Math.floor(Math.random() * 10 + 0)}`
        //   );
        // window.location.assign(
        //   `/home.html?id=${user.uid}${Math.floor(Math.random() * 10 + 0)}`
        // );
        // }
        // let count = 0;
        // searchParams.forEach((e) => {
        //   count++;
        // });
        // if (count > 1) {
        //   window.location.assign(
        //     `/home.html?id=${user.uid}${Math.floor(Math.random() * 10 + 0)}`
        //   );
        // }
        // if(searchParams )
        // window.location.assign(
        //   `/home.html?id=${user.uid}${Math.floor(Math.random() * 10 + 0)}`
        // );
      }
    }

    if (user && !localUser) {
      // create a reference to doc id in collection users
      const docRef = doc(db, "users", user.uid);
      await new Promise((resolve, reject) => {
        onSnapshot(docRef, (doc) => {
          localStorage.setItem(
            "users",
            JSON.stringify({
              id: doc.id,
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
    handleLoadingPage("loader");
  });
};

export const handleSignOut = (selectorButton) => {
  const buttonListElement = document.querySelectorAll(selectorButton);
  if (!buttonListElement) return;

  buttonListElement.forEach((e) => {
    e.addEventListener("click", async () => {
      if (localStorage.getItem("users")) {
        localStorage.removeItem("users");
      }
      await signOut(auth);
    });
  });
};
