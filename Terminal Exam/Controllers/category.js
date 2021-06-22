const router = require("express").Router();
const routes = require("../Routes/routes")
const sql = require("../db")
const Category = require('../models/category')
const authorize = require("./Authorization")

router.route(routes.GET_ALL_CATEGORIES).get((req,res)=>{
  Category.find({},(err,categories)=>{
    if(err){
      res.status(400).send("Some Error Occured",err)
    }else{
      res.status(200).send(categories)
    }
  })
})

router.route(routes.ADD_CATEGORY).post(isAdmin,(req,res)=>{
  let category = {
    name:req.body.name
  }

  const newCategory = new Category(category)

  newCategory.save().then(()=>{
    res.status(200).send("Category Saved Successfully")
  }).catch(err => {
    res.status(400).send("Category Error ",err)
  })
})

router.route(routes.GET_CATEGORY).get((req,res)=>{
  Category.findById(req.params.id,(err,category)=>{
    if(err){
      res.status(400).send("Category Not Found")
    }else{
      res.status(200).send(category)
    }
  })
})



module.exports = router
