import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Login() {
  const [error,setError] = useState("");
  const [isLoarding,setisLoarding] = useState(false);

const navigate = useNavigate();

  /**
   * Handles form submission
   * 
   * Submits login credentials to API and navigates to login page on success
   * 
   * @param {Event} e - Form submission event
   */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoarding(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try{
      const res = await apiRequest.post("/auth/login",{
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/");

    }catch(err){
      console.log(err)
      setError(err.response.data.message);
    }finally{
      setisLoarding(false);
    }

    console.log(username,email,password);

      }; 
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit} >
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled = {isLoarding} >Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
