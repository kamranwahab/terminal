const router = require("express").Router();
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const routes = require("../Routes/routes")
const sql = require("../db")
const authorize = require("./Authorization")
const email = require("../EmailHandler/email.js")
const User = require("../models/user")




router.route(routes.GET_ALL_USERS).get(isAdmin,(req,res)=>{
  User.find({},(err,users)=>{
    if(err){
      res.status(400).send("Error ",err)
    }else{
      res.status(200).send(users)
    }
  })
})

router.get(routes.GET_USER_PROFILE,isLoggedIn,(req,res)=>{
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    req.userData = decoded;
    return res.status(200).send(req.userData)
  } catch (err) {
    return res.status(401).send({
      msg: 'Your session is not valid!'
    });
  }
  })


router.route(routes.GET_USER).get(isAdmin,(req,res)=>{
  let id = req.params.id
  User.findById({_id:id},(err,user)=>{
    if(err){
      res.status(400).send("Error ",err)
    }else{
      res.status(200).send(user)
    }
  })
})

router.route(routes.REGISTER_USER).post(async (req,res)=>{
  let users;
  
      User.findOne({email:req.body.email},(err,user)=>{
        if(!err){
          if(user){
            res.status(400).send("User with thi email already exists")
          }else{
            User.find({},(err,users)=>{
              if(!err) {
                bcrypt.hash(req.body.password,10,(error,hash)=>{
                  let user2 = {
                    name:req.body.name,
                    email:req.body.email,
                    password:hash,
                    gender:req.body.gender,
                    type:users.length == 0 ? 'Admin' : 'User',
                   
                  }
    
                  const newUser = new User(user2)
                  newUser.save().then(()=>{
                  email('Registration Success',
                    process.env.EMAIL_USERNAME,
                    req.body.email,
                    'Registration Success',
                    [
                      { data: '<html> <h1>Thanks for </h1> <h3>Signing to Our Ecommerce Application</h3></html>', alternative: true },
                    ]
                    )
                    res.status(200).json("User Registered Successfully");
                  }).catch(err => {
                    res.status(400).json("Error ",err);
                  })   
                })
              }
            })
            
          }
        }
      })
  })
})

router.route(routes.LOGIN_USER).post(async (req,res)=>{

  User.findOne({email:req.body.email},(err,user)=>{
    if(err){
      res.status(400).send("Error ",err)
    }else{
      if(user){
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
          if(!err){
            if(!result){
              res.status(400).json("Invalid Password")
              return
            }
            else{
              let token = jwt.sign({id:user.id,name:user.name,type:user.type},process.env.JWT_SECRET,{ expiresIn: '24h' })
              console.log("Login successfull",token);
              res.status(200).json(token) 
            }
          }
        })
      }
      else{
        res.status(400).json("User With this Email Does not Exist")
      }
    }
  })
})



router.delete(routes.DELETE_USER,isAdmin,(req,res)=>{
  let id = req.params.id
    User.findByIdAndDelete({_id:id},(err,product)=>{
      if(err){
        res.status(400).send("Error ",err)
      }else{
        res.status(200).send("User Deleted Successfully")
      }
    })
 })

 module.exports = router

 