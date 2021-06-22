const mongoose = require("mongoose");

const productOrderSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    user_products:{
        type:[Object],
        required:true
    },
    isReturned:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        required:true
    },
    bill:{
        type:Number,
        required:true
    }
},{
    timestamps: true
})

const ProductOrder = mongoose.model("ProductOrder", productOrderSchema);

module.exports = ProductOrder