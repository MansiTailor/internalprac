import './App.css';
import axios from "axios";
import Login from './Login';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from './Registration';
import  Dashboard  from './Dashboard';

function App() {
  const fetchUsers = () =>{
    axios.get("/api/list").then((res) => console.log(res.data));
  };

const user = {
  username:"",
  password:"",
  name:"",
  age:0,
};

const registerUsers = () => {
  axios.post("/api/registration", user).then(res => console.log(res.data));
};


  return (
    <div className="App">
        <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                        </BrowserRouter>
     
    </div>
  );
}

export default App;
