import './App.css';
import './Login.css';
import axios from "axios";
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const fetchUsers = () =>{
    axios.get("/api/list").then((res) => console.log(res.data));
  };

const user = {
  username:"",
  password:"",
};

const loginUsers = () => {
  axios.post("/api/login", user).then(res => {console.log("res",res.data)
  if(res.data.user){
    navigate("/Dashboard",{ state: res.data.user });
  }else{
    alert(res.data.data)
  }
  });
};


  return (
    <div className="App">
      {/* <button onClick={fetchUsers}>Fetch Users</button> */}
      <br></br>
      <br></br>
      <input className="input"  placeholder="username"
      onChange={(e) => (user.username = e.target.value)}
       />
       <br></br>
       <br></br>
       <input type="password" className="input" placeholder="password"
      onChange={(e) => (user.password = e.target.value)}
       />
       <br></br>
       <br></br>
       <button type="button" class="btn btn-dark" onClick={loginUsers}>Login</button>
       
       <h2>OR</h2>
       <a href="/Registration" class="btn btn-light">sign up</a>

    </div>
  );
}

export default Login;
