import {collection, query, getDocs, where, addDoc, setDoc, doc, Timestamp} from 'firebase/firestore'
import db from "../firebaseConfig";

export const updateUserState = async() => {
  const data = JSON.parse(localStorage.getItem("userData"));

  const response = query(collection(db, "state"), where("id", "==", data.id));
  const docData = await getDocs(response);

  //Reference : https://softauthor.com/firebase-cloud-firestore-update-document-data/ [8]
  if(docData.docs.length > 0) {
    const userData = docData.docs[0].data();
    const docRef = doc(db,"state",docData.docs[0].id);

    const updatedData = {
      ...userData,
      status:"offline"
    }
  
    setDoc(docRef,updatedData).then(docRef => {
      alert("Logged Out Successfully")
    }).catch(error => {
      alert(error)
    })
  }
}

export const authenticateUser = async(userData)  => {
  try{
    // Reference : https://blog.logrocket.com/build-crud-application-react-firebase-web-sdk-v9/ [4]
    const response = query(collection(db, "registration data"), where("email", "==", userData.email), where("password","==",userData.password));
    const docData = await getDocs(response);

    if(docData.docs.length > 0 ) {
      let userData = {
        ...docData.docs[0].data(),
        id: docData.docs[0].id
      }
      const userStateResponse = query(collection(db, "state"), where("id", "==", userData.id));
      const userStateData = await getDocs(userStateResponse);
      if(userStateData.docs.length > 0){
        const docRef = doc(db,"state",userStateData.docs[0].id);
    
        const updatedData = {
          ...userStateData.docs[0].data(),
          status:"online",
          timestamp: Timestamp.now().toDate(),
        }
      
        setDoc(docRef,updatedData);

      } else {
        try {
          await addDoc(collection(db, 'state'), {
           status:'online',
           timestamp: Timestamp.now().toDate().toString(),
           userName:userData.name,
           userEmail: userData.email,
           id: userData.id
          })
        } catch (err) {
          alert(err)
          return false;
        }
      }
     
      localStorage.setItem("userData",JSON.stringify(userData));

      return true;
    }
    return false;
  }
  catch(err) {
    alert(err)
    return false;
  }
}