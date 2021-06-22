const mongoose = require("mongoose");
const productReturnSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    user_order_id:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
},{
    timestamps: true
})

const ProductReturn = mongoose.model("ProductReturn", productReturnSchema);

module.exports = ProductReturn