import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";


function Register() {
const[error,setError] = useState("")
const[isLoarding,setisLoarding] = useState(false)

const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setisLoarding(true);
    setError("")
const formData = new FormData(e.target);

setisLoarding(true)
const username = formData.get("username");
const email = formData.get("email");
const password = formData.get("password");

try{

  const res = await apiRequest.post("/auth/register",{
    username,email,password
  })

  navigate("/login")
}catch(err){
  console.log(err)
  setError(err.response.data.message)
}finally{
  setisLoarding(false);
}

console.log(username,email,password);

  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoarding}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
