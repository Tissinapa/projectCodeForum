var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt")
const {body, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const User = require("../models/Users")
const Content = require("../models/Contents")


    
// Creates token for checking if user is logged in or not 
// Splits token and takes password part and verifyis it
const validateToken = function(req,res,next){
  const authHeader = req.headers["authorization"]
  let token
  if(authHeader){
      token = authHeader.split(" ")[1]
  }else {
      token = null
  }
  if(token == null) return res.sendStatus(401)
  jwt.verify(token , process.env.SECRET, (err,email)=>{
      if(err)return res.sendStatus(401)
      req.email = email
      next()
  })

}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//gets token
router.get('/private', validateToken, (req, res, next) => {
  
  res.send(req.email.email)
  
});


//Finds a user in the db and if found jwt token is created
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

//Register new user and save to db
router.post("/user/register",body("email").isEmail(),body("password")
  .isStrongPassword()
  .withMessage("Password is not strong enough"),
(req, res, next) =>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    
    return res.send(errors.errors[0].msg)
  }

  User.findOne({email: req.body.email},(err, user) => {
    if(err) {
      throw err;
    };  
    if(user){
      
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
              
            }
          );
        });
      });
    }
  });
});

//Post new content and if topic exists then you can comment on that post
// Also check if user is logged in or not 
router.post('/content', validateToken,(req, res, next) => {

  const filter = {topic: req.body.topic}
  const update = {comment: req.body.comment}

  Content.findOneAndUpdate(filter,{$push: update},{new: true},(err,content) => {
    if(err){
      throw err
    }if(content){
      
      res.send("ok")
    }else {

      if(err) throw err;
      Content.create(
        {
          topic: req.body.topic,
          post: req.body.post
          
        }, 
        (err , ok)=>{
        if(err) throw err;
        
        return res.send("ok")
      })
    }
            

    })
  }) 

//Gets all the posts from database
router.get("/getContent", (req,res,next)=>{
  Content.find((err,data)=>{
    if(err){
      console.log(err)
    }else{
      res.json(data)
    }
  })
 
})

// Get comment based on id in database
// unfortunetly this works only with postman
router.get("/getContent/:id", (req,res,next)=>{
  Content.findOne({_id: req.params.id}, (err,data)=>{
    if(err){
      console.log(err)
    }else{
      res.json(data.comment)
    }
  })
 
})

  


module.exports = router;
