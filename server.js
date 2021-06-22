const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const connection = require("./db")
const app = express();
const port = 5000 || process.env.port

mongoose.connect(process.env.MONGO_DATABASE_URL, 
{useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true});

// Controllers
const categoryController = require("./Controllers/category")
const feedbackController = require("./Controllers/feedback")
const productController = require("./Controllers/product")
const productRecieptController = require("./Controllers/productReciept")
const productReturnController = require("./Controllers/productReturn")
const userController = require("./Controllers/user")
const contactUs = require("./Controllers/contact")

app.use('/uploads',express.static("uploads"))
app.use(cors());
app.use(express.json());

 app.use("/categories",categoryController);
 app.use("/feedbacks",feedbackController);
 app.use("/products",productController);
app.use("/orders",productRecieptController);
app.use("/returns",productReturnController);
app.use("/users",userController);
app.use("/contact-us",contactUs)

app.listen(port,()=>{
    console.log('App is running on Port 5000');
})

module.exports = connection
/* 
TODO
1) Social Logins
2) Code Revamp and addition of Helper Functions
*/