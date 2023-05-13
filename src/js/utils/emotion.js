import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import Swal from "sweetalert2";

export const handleEmotionAmount = (selector, postId, type) => {
  const element = document.querySelector(selector);
  if (!element) return;

  const docRef = doc(db, "posts", postId);
  onSnapshot(docRef, async (doc) => {
    let datas = null;
    if (type == "heart") {
      datas = doc?.data()?.hearts || [];
    } else if (type == "follower") {
      datas = doc?.data()?.followers || [];
    }
    element.textContent = datas.length;
  });
};
export const handleClickEmotionAmount = async (selector, id, type) => {
  const element = document.querySelector(selector);
  if (!element) return;

  const localUser = localStorage.getItem("users");
  if (!localUser) return;

  const { id: userId } = JSON.parse(localUser);

  const userRef = doc(db, "users", userId);
  const dataUser = await getDoc(userRef);

  element.addEventListener("click", async () => {
    const docRef = doc(db, "posts", id);
    const docData = await getDoc(docRef);
    let datas = null;
    if (type == "heart") {
      datas = docData.data()?.hearts || [];
    } else if (type == "follower") {
      datas = docData.data()?.followers || [];
    }

    const pos = datas.findIndex((item) => item.id == dataUser.id);
    if (pos != -1) {
      datas = datas.filter((item, index) => pos != index);
      if (type == "heart") {
        await setDoc(docRef, {
          ...docData.data(),
          hearts: [...datas],
        });
        Swal.fire({
          icon: "error",
          title: "Hủy thả tim thành công",
          customClass: {
            popup: "swal-custom",
          },
        });
      } else if (type == "follower") {
        await setDoc(docRef, {
          ...docData.data(),
          followers: [...datas],
        });
        Swal.fire({
          icon: "error",
          title: "Hủy theo dõi thành công",
          customClass: {
            popup: "swal-custom",
          },
        });
      }
    } else {
      if (type == "heart") {
        await setDoc(docRef, {
          ...docData.data(),
          hearts: [
            ...datas,
            {
              id: dataUser.id,
              ...dataUser.data(),
            },
          ],
        });
        Swal.fire({
          icon: "success",
          title: "Thả tim thành công",
          customClass: {
            popup: "swal-custom",
          },
        });
      } else if (type == "follower") {
        await setDoc(docRef, {
          ...docData.data(),
          followers: [
            ...datas,
            {
              id: dataUser.id,
              ...dataUser.data(),
            },
          ],
        });
        Swal.fire({
          icon: "success",
          title: "Theo dõi thành công",
          customClass: {
            popup: "swal-custom",
          },
        });
      }
    }
  });
};
