const express = require("express");
const app = express();
app.use(express.json());
const port = 4000;
const mongoose = require("mongoose");

const userModel = require("./models/user.js");

mongoose
  .connect("mongodb://localhost:27017/dcs")
  .then(() => console.log("mongo db connected"));

app.get("/api/", (req, res) => res.send("Hello Fullstack!"));

// Get list of all users
app.get("/api/list", async (req, res) => {
  const userList = await userModel.find({}, { username: true });

  if (userList.length === 0) {
    return res.json({ data: "no users in fullstack" });
  }

  return res.json({ data: userList });
});

// Register user
app.post("/api/registration", (req, res) => {
  const {username,name,password,age} =req.body;
  userModel.findOne({username:username},(err,user)=>{
      if(user){
          res.send({message:"user already exist"})
      }else {
          const user = new userModel({username,name,password,age})
          user.save(err=>{
              if(err){
                  res.send(err)
              }else{
                  res.send({message:"sucessfull"})
              }
          })
        }
      })
  
});

// Login user
app.post("/api/login", (req, res) => {

  const { username, password} = req.body;
  userModel.findOne({ username: username}, (err, user) => 
  {
    if(user)
    {
      if(username === user.username &&    password === user.password ) {
        res.send({message:"login sucess",user:user})
      } else {
        
        res.json({ data: "wrong credentials!!" });
      }
    } 
    else {
      return res.json({ data: "User does not exist!!" });
    } 
  });
});

//Delete
app.post("/api/delete", async(req, res) => {
  const uid = req.body.id;
  const deleteUser = await userModel.findOneAndDelete({_id:uid});
  if(deleteUser){
      return res.json({data: "Account deleted successfully"});
  } else {
    return res.json({data: "can't delete"});
  }
  });

//update
app.put("/api/updateuser", async (req, res) => {
  const newUser = req.body;
  const upduser = await userModel.findOneAndUpdate(
    {username:newUser.username},
    {  
      name: newUser.name,
      age:newUser.age,
      password:newUser.password
    },
    {new:true}
  );
  return res.json({ data: "Updated successfully",upduser:upduser });
});


//Search
app.post("/api/search", async(req, res) => {
  const user = req.body;
  const searchuser = await userModel.find(user);
  
    if(searchuser)
    {
      return res.json({data:searchuser});
    }
    else{
      
      return res.json({data:"User does not exist!!"})
    }
})

app.listen(port, () => console.log(`server running on port 4000`));