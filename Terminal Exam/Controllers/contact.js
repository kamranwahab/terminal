const router = require("express").Router();
const routes = require("../Routes/routes")
const sql = require("../db")
const Contact = require("../models/contact-us")
const authorize = require("./Authorization")
const sentEmail = require("../EmailHandler/email")

router.route(routes.CONTACT_US).post((req,res)=>{
    let contactUser = {
        name:req.body.name,
        email:req.body.email,
        message:req.body.message
    }

    const newContact = new Contact(contactUser)

    newContact.save().then(()=>{
        res.status(200).send("Your Message was Recorded By Our Team, we will reply you Soon.")
    }).catch(err => {
        res.status(400).send("Error ",err)
    })
  })

  router.route(routes.GET_CONTACTS).get((req,res)=>{
    Contact.find({},(err,contacts)=>{
        if(err){
            res.status(400).send("Error ",err)
        }else{
            res.status(200).send(contacts)
        }
    })
  })

  router.route(routes.GET_CONTACT).get((req,res)=>{
    let id = req.params.id
    Contact.findOne({_id:id},(err,contact)=>{
        if(err){
            res.status(400).send("Error ",err)
        }else{
            res.status(200).send(contact)
        }
    })
  })

  router.route(routes.REPLY_TO_USER).post((req,res)=>{
      try{
      let name = req.body.name
      let email = req.body.email
      let message = req.body.message
      sentEmail('Contacted Customer Reply',
           process.env.EMAIL_USERNAME,
           email,
           'Customer Support',
           [
             { data: `<html> <h1>Dear ${name}  </h1> <h3>${message}</h3></html>`, alternative: true },
           ]
         )
         res.status(200).send("Email Sent Successfully")
      }catch(err){
        res.status(400).send("Err ",err)
      }
      
  })

  module.exports = router