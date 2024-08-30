import "./login.scss";
import { Link } from "react-router-dom";

function Login() {
  const[error,setError] = useState("")

const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
const formData = new FormData(e.target);

const username = formData.get("username");
const email = formData.get("email");
const password = formData.get("password");

try{

  const res = await axios.post("http://localhost:8800/api/auth/register",{
    username,email,password
  })

  navigate("/login")
}catch(err){
  console.log(err)
  setError(err.response.data.message)
}

console.log(username,email,password);

  };
  return (
    <div className="login">
      <div className="formContainer">
        <form>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button>Login</button>
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
