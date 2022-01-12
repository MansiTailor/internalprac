const mongoose = require("mongoose");

const usrSchema = mongoose.Schema({
    username: String,
    password: String,
    name: String,
    age: Number,
});

const userModel = mongoose.model("emp",usrSchema,"emp");

module.exports = userModel;