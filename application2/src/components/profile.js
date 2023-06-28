import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserState } from "../services/firebaseQuery";
export const Profile = () => {

  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("userData") === null || localStorage.getItem("userData") === undefined) {
      navigate("/");
    }
  })
  

  const logout = () => {
    updateUserState();
    localStorage.removeItem("userData");
    navigate("/");
   
  }
  return(
    <div>
      <div> Name : { userData?.name} </div>
      <div> Email : { userData?.email} </div>
      <div> Location : { userData?.location} </div>

      <button type="submit" onClick={logout}>Logout</button>
    </div>
  )
}
