import  React, {useEffect} from "react";
import {useForm} from 'react-hook-form';
import "../App.css";
import {authenticateUser} from "../services/firebaseQuery";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const { register, handleSubmit, formState: {errors} } = useForm();
  // Reference : https://www.geeksforgeeks.org/reactjs-usenavigate-hook/ [9]
  const navigate = useNavigate();

  //Reference : https://reactjs.org/docs/hooks-effect.html [7]
  useEffect(() => {
    if(localStorage.getItem("userData")){
      navigate("/profile")
    }
  })

  const onSubmit = async(data) => {
    authenticateUser(data).then(res => {
      if(res) {
        navigate('/profile');
      } else {
      alert("Invalid Credentials");
      }
    })
  };

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="container">
      <h1>
        Login Page
      </h1>
      <div className="row">

        <div className="col mb-2">
          <input {...register("email", { required: true , pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} placeholder="Email" />
          {errors.email?.type === 'required' && <span>This field is required</span>}
          {errors.email?.type === 'pattern' && <span>Email format in invalid</span>}
        </div>

        <div className="col mb-2">
          <input {...register("password", { required: true })} placeholder="Password" type="password"/>
          {errors.password?.type === 'required' && <span>This field is required</span>}
        </div>

      </div>
    </div>
    <button type="submit">Login</button>
  </form>
  )
}

