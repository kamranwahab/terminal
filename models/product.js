// const Product = `CREATE TABLE IF NOT EXISTS product (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255),
//     totalQuantity INT,
//     EcommerceQuantity INT,
//     category_id INT,
//     defaultPrice INT,
//     discountPrice INT,
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    totalQuantity:{
        type:Number,
        required:true
    },
    desc :{
        type:String,
        required:true
       
        
    },
    defaultPrice:{
        type:Number,
        required:true
    },
    image:String,
   
},{
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product