import './App.css';
import axios from "axios";
import {useNavigate,useLocation} from "react-router-dom";
import { useState } from 'react';
function Registration() {
 
  const { state } = useLocation();
  const [user,setUser] =useState( {
    username:"" || state?.username,
    name:"" || state?.name,
    age:0 || state?.age,
  });
  console.log("state",state)
    const navigate = useNavigate();

    const handleChange = e =>{
      const {name,value} = e.target
      setUser({
      ...user,//spread operator 
      [name]:value
  
      })
  
      }


  const fetchUsers = () =>{
    axios.get("/api/list").then((res) => console.log(res.data));
  };



const registerUsers = () => {
  const {name, username, password,age} = user
  debugger
  {state?.username ?
    axios.put("/api/updateuser", user).then(res => 
      {
          console.log("res",res.data);
  
          if(res.data.message === "user already exist"){
            alert(res.data.message)
          }else{
            navigate('/Dashboard' ,{state:user});
  
          }
          
  
      })
    :
    axios.post("/api/registration", user).then(res => 
      {
        console.log(res)
  
          if(res.data.message === "user already exist"){
            alert(res.data.message)
          }else{
            navigate('/');
  
          }
          
  
      })}
  
   
}


  return (
    <div className="App">
      {/* <button onClick={fetchUsers}>Fetch Users</button> */}
      <br></br>
      <input className="input" placeholder="username"
      name="username"
      value={user.username}
      onChange={handleChange}
       />
       <br></br>
       <br></br>
       <input type="password" className="input" placeholder="password"
       name="password"
      onChange={handleChange}
       />
       <br></br>
       <br></br>
       <input className="input" placeholder="name"
       name="name"
       value={user.name}
       onChange={handleChange}
       />
       <br></br>
       <br></br>
       <input className="input" placeholder="age"
       name="age"
       value={user.age}
       onChange={handleChange}
       />
       <br></br>
       <br></br>
      
      <button type="button" class="btn btn-dark" onClick={() =>registerUsers()}>Register Users</button>
    </div>
  );
}


export default Registration;
