import React from 'react';
import './App.css';
import axios from "axios";
import {useNavigate,useLocation} from "react-router-dom";


 const Dashboard = (props) => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const deleteUsers = () => {
      axios.post("/api/delete", {id: state._id}).then(res => {alert(res.data.data)
        navigate("/Dashboard")}
      );
       
    }

    const upduser = {
        username:"",
        name: "",
        age: "",
      };


    const updateuser = (item) => {
        console.log("item",item);
        // axios.put("/api/updateuser", upduser).then((res) =>  (res.data.upduser));
        // alert("Profile Updated Successfully")
        //  console.log(upduser);
         navigate('/Registration',{state:item})
    }

    console.log("state",state);
    return (
        <div>
            <table class="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">UserName</th>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
    </tr>
  </thead>
  
  <tbody>
  {state ?
    <tr>
      <th scope="row">1</th>
      <td>{state?.username}</td>
      <td>{state?.name}</td>
      <td>{state?.age}</td>
      <td><button type="button" class="btn btn-danger" onClick={deleteUsers}>Delete</button></td>
      <td><button type="button" class="btn btn-info" onClick={() => updateuser(state)}>Update</button></td>
    </tr>:
    <tr>
      <th scope="row">Data Not Found</th>
      </tr>
  }

  </tbody>
</table>
        </div>
    )
}

export default Dashboard;
