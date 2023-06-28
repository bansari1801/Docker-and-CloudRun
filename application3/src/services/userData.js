import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebaseConfig";

export const getUserState = async() => {
  //Reference: https://firebase.google.com/docs/firestore/query-data/get-data [11]
  const querySnapshot = query(collection(db, "state"), where("status", "==", "online"));
  let userStateData = [];
  const data = await getDocs(querySnapshot);
  data.docs.forEach((doc) => {
    userStateData.push(doc.data());
  });
  return userStateData;
}