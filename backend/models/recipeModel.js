const mongoose = require('mongoose');

const recipeShcema=mongoose.Schema({
     title : {
        type:String,
        required:true
    },
     ingredients : {
        type:Array,
        required:true
    },
     instructions : {
        type:String,
        required:true
    },
     time : {
        type:String,
        default:"30 mins"
    },
     coverImage : {
        type:String,
        
    },
    createdby :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

module.exports=mongoose.model('recipe',recipeShcema)