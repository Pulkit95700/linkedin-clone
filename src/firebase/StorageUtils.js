import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import { doc, setDoc} from "firebase/firestore";

const getSnap = async (uuid) => {

  const q = query(collection(db, "users"), where("uuid", "==", uuid));
  const querySnapshot = await getDocs(q);

  return querySnapshot;
};

const addUserData = async (data) => {

  const usersRef = doc(db, "users", `${data.uid}`);

  const docRef = await setDoc(usersRef, {
    Email: data.email,
    Name: data.userName,
    photoURL: data.photoURL,
    uid: data.uid,
  });

  return docRef;
};

export { getSnap, addUserData};
