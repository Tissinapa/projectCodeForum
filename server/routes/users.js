var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const {body, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const User = require("../models/Users")
const Content = require("../models/Contents")
const passport  = require("passport-jwt")
const validateToken = require("../auth/validation.js")
    
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/private', validateToken, (req, res, next) => {
  
  res.send(req.email.email)
  
});

//Login
router.post('/user/login', body("email").trim(),body("password").trim(),
(req, res, next) => {
  User.findOne({email: req.body.email},(err, user)=>{
    if(err){
      throw err
    }
    if(!user){
      return res.json({message:"Invalid credentials"})
    } else {

      bcrypt.compare(req.body.password, user.password,(err,match)=>{
        if(err){
          throw err       
        }if(match){
          console.log("mätsi")
          const tokenPayload = {
            id: user._id,
            email: user.email
          }
          jwt.sign(
            tokenPayload,
            process.env.SECRET,
            {
              expiresIn: 12000  
            },
            (err, token)=>{
              if(err) throw err;
               return res.send({success: true,token: token})
               
            }
          )
        }else{
          return res.json({message:"Invalid credentials"})
        }
      })
    }

  })

});

//Register /user/register
router.post("/user/register",body("email").isEmail(),body("password")
  .isStrongPassword()
  .withMessage("Password is not strong enough"),
(req, res, next) =>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    //console.log(errors.errors[0].msg)
    return res.send(errors.errors[0].msg)
  }

  User.findOne({email: req.body.email},(err, user) => {
    if(err) {
      throw err;
    };  
    if(user){
      //res.status(403).send("Email already in use");
      return res.send("Email already in use");
    }else {
      bcrypt.genSalt(10,(err, salt)=>{
        bcrypt.hash(req.body.password, salt, (err, hash)=>{
          if(err) throw err;
          User.create(
            {
              email: req.body.email,
              password: hash
            },(err,ok)=>{
              if(err) throw err;
              return res.send("ok")
              //return res.redirect("login.html")
            }
          );
        });
      });
    }
  });
});

//Post content
router.post('/content', validateToken,(req, res, next) => {
  const filter = {topic: req.body.topic}
  const update = {comment: req.body.comment}

  Content.findOneAndUpdate(filter,{$push: update},{new: true},(err,content) => {
    if(err){
      throw err
    }if(content){
      
      res.send("ok")
    }else {
      //console.log(user.post)
      //console.log("topic" + req.body.topic +" post "+req.body.post)
      if(err) throw err;
      Content.create(
        {
          topic: req.body.topic,
          post: req.body.post
          //comment: req.body.comment
        }, 
        (err , ok)=>{
        if(err) throw err;
          
          //console.log(ok._id)
        return res.send("ok")
      })
    }
            

    })
  }) 
    

  


module.exports = router;
