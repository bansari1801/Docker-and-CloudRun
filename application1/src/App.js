import * as React from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import db from "./firebaseConfig";
import {collection, addDoc, query, where, getDocs} from 'firebase/firestore'

export default function App() {
  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      location: '',
    }
  });

  // Reference : https://blog.logrocket.com/build-crud-application-react-firebase-web-sdk-v9/ [3]
  const onSubmit = async(data) => {
    try {
      const q = query(collection(db, "registration data"),where("email", "==", data.email));
      const doc = await getDocs(q);

      if(doc.docs.length === 0){
        await addDoc(collection(db, "registration data"), {
          ...data
        })
        alert("User Register Successfully!")
      }
      else{
        alert("User is already registered with this email. Please try with another email.")
      }
    } catch (err) {
      alert(err)
    }
  };

  //Reference : https://react-hook-form.com/get-started#Applyvalidation [5]
  return (
    <div className="App">
      <h1>Registration Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="row">
            
            <div className="col mb-2">
              <input {...register("name", { required: true , minLength: 2  })} placeholder="Name" />
              {errors.name?.type === 'required' && <span>This field is required</span>}
              {errors.name?.type === 'minLength' && <span>Minimum length of 2 is required</span>}
            </div>

            <div className="col mb-2">
              <input {...register("email", { required: true , pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} placeholder="Email" />
              {errors.email?.type === 'required' && <span>This field is required</span>}
              {errors.email?.type === 'pattern' && <span>Email format in invalid</span>}
            </div>

            <div className="col mb-2">
              <input {...register("password", { required: true })} placeholder="Password" type="password"/>
              {errors.password?.type === 'required' && <span>This field is required</span>}
            </div>

            <div className="col mb-2">
              <input {...register("location", { required: true })} placeholder="Location" />
              {errors.location?.type === 'required' && <span>This field is required</span>}
            </div>

          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
    
  );
}