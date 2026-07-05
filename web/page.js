const express = require('express')
const page = express()
const path = require('path');



page.get("/",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","index.html"))
})
page.get("/signin",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","SignIn","signin.html"))
})
page.get("/signup",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","SignUp","signup.html"))
})
page.get("/forgetpassword",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","ForgetPassword","forget.html"))
})

/*
page.get("/signup",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","SignUp","signup.html"))
})
page.get("/signup",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","SignUp","signup.html"))
})
page.get("/signup",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","SignUp","signup.html"))
})
page.get("/signup",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","SignUp","signup.html"))
})
page.get("/signup",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","SignUp","signup.html"))
})
page.get("/signup",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","SignUp","signup.html"))
})
page.get("/signup",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","SignUp","signup.html"))
})
page.get("/signup",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","SignUp","signup.html"))
})
page.get("/signup",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","SignUp","signup.html"))
})
page.get("/signup",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","SignUp","signup.html"))
})
page.get("/signup",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","SignUp","signup.html"))
})
page.get("/signup",(req,res) =>{
  res.sendFile(path.join(__dirname,"UI","SignUp","signup.html"))
})


*/


module.exports = page