const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
       
        },
    title:{
            type:String,
            required:true,
            unique:true,

        },
    desc:{
            type:String,
            required:false,

        },
    photo:{
            type:String,
            required:false
        },
    categories:{
            type:Array,
            required:false
        },
   

        
    },{timestamps:true}
);

const postModel = mongoose.model("Post",postSchema )

module.exports = postModel

