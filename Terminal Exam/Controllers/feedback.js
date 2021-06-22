const router = require("express").Router();
const Feedback = require("../models/feedback")
const routes = require("../Routes/routes")
const sql = require("../db")
const authorize = require("./Authorization")

router.route(routes.GET_ALL_FEEDBACK).get((req,res)=>{
  Feedback.find({},(err,feedbacks)=>{
    if(err){
      res.status(400).send("Error ",err)
    }else{
      res.status(200).send(feedbacks)
    }
  })
})

router.route(routes.ADD_USER_FEEDBACK).post(isLoggedIn,(req,res)=>{
  let feedback = {
    user_id:req.body.user_id,
    product_id:req.body.product_id,
    feedback:req.body.feedback
  }

  const newFeedback = new Feedback(feedback)

  newFeedback.save().then(()=>{
    res.status(200).send("Feedback Saved Successfully")
  }).catch(err => {
    res.status(400).send("Error ",err)
  })
})

router.route(routes.UPDATE_FEEDBACK).put(isLoggedIn,(req,res)=>{
  let id = req.params.id
  Feedback.findById({_id:id},(err,feedback)=>{
    if(err){
      res.status(400).send("Error ",err)
    }else{
      feedback.user_id = req.body.user_id
      feedback.product_id = req.body.product_id,
      feedback.feedback = req.body.feedback
      feedback.save().then(()=>{
        res.status(200).send("Feedback Updated Successfully")
      }).catch(err => {
        res.status(400).send("Error ",err)
      })
    }
  })
})

router.route(routes.DELETE_FEEDBACK).delete(isLoggedIn,(req,res)=>{
   let id = req.params.id
  Feedback.findByIdAndDelete({_id:id},(err,feedback)=>{
    if(err){
      res.status(400).send("Error ",err)
    }else{
      res.status(200).send("Feedback Deleted Successfully")
    }
  })
})


 module.exports = router
