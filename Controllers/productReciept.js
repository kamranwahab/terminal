const router = require("express").Router();
const ProductOrder = require("../models/productReciept")
const Product = require("../models/product")
const User = require("../models/user")
const routes = require("../Routes/routes")
const sql = require("../db")
const authorize = require("./Authorization")

router.route(routes.GET_PRODUCT_RECIEPTS).get(isAdmin,(req,res)=>{
  ProductOrder.find({},(err,orders)=>{
    if(err){
      res.status(400).send("Error ",err)
    }else{
      res.status(200).send(orders)
    }
  })
})

router.route(routes.GET_PRODUCT_RECIEPTS_BY_CUSTOMER).get(isLoggedIn,(req,res)=>{
  let id = req.params.id
  ProductOrder.find({user_id:id},(err,orders)=>{
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

router.route(routes.GET_PRODUCT_RECIEPT).get(isLoggedIn,(req,res)=>{
  let id = req.params.id
  ProductOrder.findById({_id:id},(err,order)=>{
    if(err){
      res.status(400).send("Error ",err)
    }else{
      res.status(200).send(order)
    }
  })
})

router.route(routes.ADD_PRODUCT_RECIEPT).post(isLoggedIn,(req,res)=>{
  let order = {
    user_id:req.body.user_id,
    user_products:req.body.user_products, // IN OBJECT NAME THE FIELDS AS PRODUCT AND QUNATITY
    bill:null,
    status:"CREATED",
  }

  let total = 0
/*
----------------------------------------------STRUCTURE-----------------------------------------
{
    "user_id":"60cdc60afbd135cf051a1873",
    "user_products":[
        {
            "product":{
                "_id":"60ce3304200e1f024a4fb73e",
                 "name" : "Image Product 2",
                 "totalQuantity" : 75,
                 "EcommerceQuantity" : 60,
                 "category_id" : 1,
                 "defaultPrice" : 10000,
                 "discountPrice" : 5000,
                 "image" : "uploads/chat2.jpeg",
                 "availability" : true
                },
                "quantity":1
        }
    ]
}
*/
  order.user_products.map((product)=>{
    total = product.product.defaultPrice * product.quantity
    console.log('po',product.product._id);
      Product.findById({_id:product.product._id},(err,found)=>{
        found.totalQuantity = found.totalQuantity - product.quantity
        found.save().then(()=>{
          console.log('Updated Quantity Successfull');
        }).catch(err => {
          console.log('Error ',err);
        })
      })
  })

  order.bill = total
  const newOrder = new ProductOrder(order)

  newOrder.save().then(()=>{
      res.status(200).send("Order Saved Successfully")
    }).catch(err => {
      res.status(400).send("Error ",err)
    })
})

// router.route(routes.UPDATE_PRODUCT_RECIEPT).put((req,res)=>{
//   let id = req.params.id
//   ProductOrder.findById({_id:id},(err,order)=>{
//       if(err){
//         res.status(400).send("Error ",err)
//       }else{
//         order.user_id = req.body.user_id
//         order.user_address = req.body.user_address,
//         order.user_phone = req.body.user_phone
//         order.status = req.body.status
        
//         order.save().then(()=>{
//           res.status(200).send("Order Updated Successfully")
//         }).catch(err => {
//           res.status(400).send("Error ",err)
//         })
//       }
//     })
// })

router.route(routes.SET_STATUS_TO_DELIVER).put(isAdmin,(req,res)=>{
  let id = req.params.id
  ProductOrder.findById({_id:id},(err,order)=>{
      if(err){
        res.status(400).send("Error ",err)
      }else{
        order.status = "DELIVERED"
        
        order.save().then(()=>{
          res.status(200).send("Order Status Changed To Deliver")
        }).catch(err => {
          res.status(400).send("Error ",err)
        })
      }
    })
})

router.route(routes.SET_STATUS_TO_SHIPPED).put(isAdmin,(req,res)=>{
  let id = req.params.id
  ProductOrder.findById({_id:id},(err,order)=>{
      if(err){
        res.status(400).send("Error ",err)
      }else{
        order.status = "SHIPPED"
        
        order.save().then(()=>{
          res.status(200).send("Order Status Changed To Shipped")
        }).catch(err => {
          res.status(400).send("Error ",err)
        })
      }
    })
})

module.exports = router




