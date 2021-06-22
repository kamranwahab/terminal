const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
    user_id:{
        type:Number,
        required:true
    },
    product_id:{
        type:Number,
        required:true
    },
    feedback:{
        type:String,
        required:true
    }
},{
    timestamps: true
})

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback