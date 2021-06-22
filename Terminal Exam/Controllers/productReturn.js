const router = require("express").Router();
const ProductReturn = require("../models/productReturn")
const ProductOrder = require("../models/productReciept")
const Product = require("../models/product")
const routes = require("../Routes/routes")
const sql = require("../db")
const authorize = require("./Authorization");
const User = require("../models/user");

router.route(routes.GET_PRODUCT_RETURNS).get(isLoggedIn,(req,res)=>{
  ProductReturn.find({},(err,returns)=>{
    if(err){
      res.status(400).send("Error ",err)
    }else{
      res.status(200).send(returns)
    }
  })
})

router.route(routes.GET_PRODUCT_RETURNS_BY_CUSTOMER).get(isLoggedIn,(req,res)=>{
  let id = req.params.id
  ProductReturn.find({user_id:id},(err,orders)=>{
    if(err){
      res.status(400).send("Error ",err)
    }else{
      User.findById({_id:id},(err,found)=>{
        if(found){
          res.status(200).send(orders)
        }else{
          res.status(401).send("Login with your Registered Email")
        }
      })
      
    }
  })
})

router.route(routes.GET_PRODUCT_RETURN).get(isLoggedIn,(req,res)=>{
  let id = req.params.id
  ProductReturn.findById({_id:id},(err,Return)=>{
    if(err){
      res.status(400).send("Error ",err)
    }else{
      console.log('Return',Return);
      ProductOrder.findById({_id:Return.user_order_id},(err2,found)=>{
        if(!err){
          if(found){
            res.status(200).send({returnProduct:Return,Order:found})
          }
        }
      })
      
    }
  })
})

router.route(routes.ADD_PRODUCT_RETURN).post(isLoggedIn,(req,res)=>{
  let id = req.params.order_id
  let order = {
    user_id:req.body.user_id,
    user_order_id:id,
    status:"CREATED",
  }

  const newReturn = new ProductReturn(order)
  ProductOrder.findById({_id:id},(err,Return)=>{
    if(err){
      res.status(400).send("Error ",err)
    }else{
      Return.user_products.map((product)=>{
        Product.findById({_id:product.product._id},(err,found)=>{
          found.totalQuantity = found.totalQuantity + product.quantity
          found.save().then(()=>{
            console.log('Updated Quantity Successfull');
          }).catch(err => {
            console.log('Error ',err);
          })
        })
    })
      Return.status = "REJECTED"
      Return.isReturned = true
      
      Return.save().then(()=>{
        console.log("Order Status Changed to REJECTED")
      }).catch(err => {
        console.log("Error ",err)
      })
    }
  })

  newReturn.save().then(()=>{
    res.status(200).send("Order Return Created Successfully")
  }).catch(err => {
    res.status(400).send("Error ",err)
  })
})
module.exports = router